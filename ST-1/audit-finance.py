import argparse
import json
import re
from decimal import Decimal, getcontext
from pathlib import Path

getcontext().prec = 50
D = Decimal
parser = argparse.ArgumentParser(description='Independently audit Fred finance JSON arithmetic and Markdown table rounding.')
parser.add_argument('--finance', type=Path, required=True, help='Path to finance JSON input.')
parser.add_argument('--report', type=Path, required=True, help='Path to Fred Markdown finance report input.')
args = parser.parse_args()
data = json.loads(args.finance.read_text(), parse_float=D)
payments = data['player_payment_schedule']
assert len(payments) == 20
assert [payment['t'] for payment in payments] == list(range(1, 21))
assert [payment['year'] for payment in payments] == list(range(2024, 2044))
assert all(payment['player_payment_usd'] == (2000000 if payment['t'] <= 10 else 68000000) for payment in payments)
assert sum(payment['player_payment_usd'] for payment in payments) == 700000000

checks = 0
maximum_error = D(0)
calculations = []
for sensitivity in data['present_value_sensitivities']:
    rate = sensitivity['discount_rate']
    annuity = sum((1 + rate) ** (-t) for t in range(1, 11))
    early = sum(D(payment['player_payment_usd']) / (1 + rate) ** payment['t'] for payment in payments[:10])
    deferred = sum(D(payment['player_payment_usd']) / (1 + rate) ** payment['t'] for payment in payments[10:])
    total = early + deferred
    for key, value in [
        ('service_period_player_payment_pv_usd', early),
        ('deferred_payment_pv_usd', deferred),
        ('total_player_payment_pv_usd', total),
        ('ten_year_annuity_factor', annuity),
        ('salary_only_equivalent_annual_contribution_usd', total / annuity),
    ]:
        error = abs(value - sensitivity[key])
        maximum_error = max(maximum_error, error)
        assert error < D('0.00001'), (key, error)
        checks += 1
    calculations.append([rate, early, deferred, total, total / annuity])

sensitivity = data['present_value_sensitivities'][1]
assert sensitivity['discount_rate'] == D('.05')
annuity = sensitivity['ten_year_annuity_factor']
pv = sensitivity['total_player_payment_pv_usd']
annual_hurdle = sensitivity['salary_only_equivalent_annual_contribution_usd']
for case in data['sponsorship_sensitivity']['cases']:
    annual = D(case['hypothetical_annual_gross_receipts_usd']) * case['attribution_fraction'] * case['retained_net_contribution_margin'] - D(case['incremental_fixed_cost_usd'])
    for key, value in [
        ('annual_attributable_contribution_usd', annual),
        ('contribution_pv_at_5pct_usd', annual * annuity),
        ('contribution_less_salary_payment_pv_usd', annual * annuity - pv),
        ('salary_only_gross_revenue_hurdle_usd_per_year', annual_hurdle / (case['attribution_fraction'] * case['retained_net_contribution_margin'])),
    ]:
        error = abs(value - case[key])
        maximum_error = max(maximum_error, error)
        assert error < D('0.00001'), (key, error)
        checks += 1
assert checks == 51

assert 'player endorsement income' in data['valuation']['excludes']
assert data['endorsement_classification']['player_endorsement_income_counted_as_club_revenue'] is False
assert data['endorsement_classification']['us_only_amount'] is None
assert data['cbt']['is_cash_tax_bill'] is False
assert data['cbt']['is_signing_date_dcf'] is False

markdown = args.report.read_text()
rows = [line for line in markdown.splitlines() if line.startswith('| ') and re.match(r'^\| \d', line)]
assert len(rows) == 12
rounded_cells = 0
for row, values in zip(rows[:3], calculations):
    cells = [cell.strip() for cell in row.split('|')[1:-1]]
    for shown, value in zip(cells[1:], values[1:]):
        assert abs(D(shown) - value / D(1000000)) <= D('0.0005')
        rounded_cells += 1
for row, case in zip(rows[3:], data['sponsorship_sensitivity']['cases']):
    cells = [cell.strip() for cell in row.split('|')[1:-1]]
    keys = ['annual_attributable_contribution_usd', 'contribution_pv_at_5pct_usd', 'contribution_less_salary_payment_pv_usd', 'salary_only_gross_revenue_hurdle_usd_per_year']
    for shown, key in zip(cells[2:], keys):
        tolerance = D('0.005') if key == 'annual_attributable_contribution_usd' else D('0.0005')
        assert abs(D(shown) - D(case[key]) / D(1000000)) <= tolerance
        rounded_cells += 1
assert rounded_cells == 48
assert D(5000000) / D('.25') == D(20000000)
assert D(5000000) / D(40) == D(125000)

print(f'PASS: 20 payment indexes, years, amounts and $700m total; {checks} JSON arithmetic comparisons; {rounded_cells} Markdown monetary cells; ledger exclusions and CBT flags; advertiser $5m/25% and $5m/$40.')
print('Maximum JSON recomputation error in USD or dimensionless annuity factor:', maximum_error)
for rate, early, deferred, total, annual in calculations:
    print('Rate', rate, 'PV USD', round(total, 3), 'annual hurdle USD', round(annual, 3))
print('At 5% $100m receipts, 100% attribution, 40% margin: balance USD', data['sponsorship_sensitivity']['cases'][7]['contribution_less_salary_payment_pv_usd'])
