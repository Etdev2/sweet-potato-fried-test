# Mara Cedar finance QA

Audited October 13, 2026 against ../finance.json and ../financial-report.md. I ran an independent Python Decimal recomputation at 50-digit precision, rather than relying on Fred's reported checks. No source research was repeated.

## Actual checks

- Twenty payments have consecutive year indexes 1 through 20 and calendar years 2024 through 2043. The first ten are $2 million each; the next ten are $68 million each. Total is $700 million, comprising $20 million plus $680 million.
- All 51 stored arithmetic results pass recomputation within $0.00001, or that tolerance in the dimensionless annuity factor. Maximum difference was approximately $0.000000264. I checked early and deferred PV, total PV, ten-year annuity factors, equivalent annual contribution, and all nine sponsorship sensitivity cases.
- All 48 monetary cells in the Markdown tables match the JSON at their displayed rounding precision. PV at 3%, 5%, and 7% is respectively $448.675 million, $337.796 million, and $256.837 million. PV falls as the rate rises.
- The 5% annual salary-only hurdle is $43.746 million. At hypothetical $100 million annual gross receipts, full attribution and 40% retained margin, annual contribution is $40 million; its ten-year PV is $308.869 million; the balance against salary-payment PV is negative $28.926 million. Gross receipts do not equal retained contribution.
- Gross-receipt hurdles have units USD per year. At 25% attribution and 20% margin, $43.746 million divided by 0.25 and 0.20 gives $874.922 million per year. Annual contribution and gross receipts are annual flows; PV and contribution-minus-payment balances are valuation-date amounts.
- JSON excludes player endorsement income, keeps U.S.-only earnings null, and labels the CBT charge as neither a cash tax bill nor signing-date DCF.
- Advertiser arithmetic passes: $5 million / 25% = $20 million incremental net sales; $5 million / $40 contribution per incremental order = 125,000 orders. Margin sensitivities of 20% and 40% imply $25 million and $12.5 million net sales. These inputs are invented assumptions, not disclosed fees.

## Why the DCF differs from CBT

Fred's DCF discounts all modeled year-end payments to December 31, 2023 at assumed rates. Its ten-year annual equivalent uses an annuity factor. CBT follows a prescribed payroll method that attributes relevant deferred compensation to service seasons and uses the prescribed historical rate. The approximate $46 million CBT annual charge is a different measure. It need not equal an analyst's annualized DCF, and neither measure is a cash tax bill. Actual contractual dates differ from year-end timing. The exact official worksheet remains unavailable; this audit verifies the model arithmetic and labels, not the official contract-specific computation.

## Repair and limits

No numeric repair is needed. Use this terminology clarification in the decks: advertiser contribution is incremental net sales minus variable costs before campaign costs; advertiser campaign profit subtracts rights, production, media, and other campaign costs once. Net sales already deduct discounts and refunds. The margin then deducts fulfillment, product, payment, return-processing, and other variable costs; do not subtract refunded sales twice.

Fred's retained margin definition is adequate but is not final club net profit. The salary-only table excludes other stated club costs and benefits. Funding reserve deposits and later player payments must not become duplicate compensation costs. The audit supplies no missing attribution, fee, current rights term, reserve record, or actual return. Deck rounding remains subject to review when final slides exist.
