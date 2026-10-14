# Fred finance appendix

Evidence retrieval date: October 13, 2026. All money is USD. Calculations are illustrative and reproducible from [finance.json](finance.json).

## Original-decision payment DCF

Valuation date is December 31, 2023. Year 1 ends December 31, 2024; year 20 ends December 31, 2043. This models an original-decision perspective with year-end timing, not the exact signing date or actual contractual intra-year payment dates. All cash flows and discount rates are nominal, before tax. Rates are analyst assumptions, not estimates of the club cost of capital.

Reported contract terms and accounting remain distinct: $700m nominal; $2m annually 2024–33; $68m annually 2034–43; roughly $46m annual CBT payroll charge. [MLB1](https://www.mlb.com/news/shohei-ohtani-dodgers-deal-deferrals-explained)

Formula in millions: PV(r) = sum(t=1..10, 2/(1+r)^t) + sum(t=11..20, 68/(1+r)^t).

| Discount assumption | Early payment PV, $m | Deferred payment PV, $m | Total payment PV, $m | Equivalent annual salary-only contribution in years 1–10, $m |
| --- | ---: | ---: | ---: | ---: |
| 3% | 17.060 | 431.614 | 448.675 | 52.598 |
| 5% | 15.443 | 322.352 | 337.796 | 43.746 |
| 7% | 14.047 | 242.789 | 256.837 | 36.568 |

The equivalent annual amount divides the payment PV by the ten-year annuity factor at the same rate. It is a modeled salary-only hurdle, not a club annual accounting expense. The schedule totals $20m plus $680m, or $700m. The JSON stores each of the twenty payments.

## CBT, funding and the rate discrepancy

The CBA defines the CBT imputed rate as the annual federal mid-term rate for October preceding the first contract year; relevant deferrals are discounted to their attributed seasons. [CBA1, Article XXIII](https://www.mlbplayers.com/_files/ugd/4d23dc_d6dfc2344d2042de973e37de62484da5.pdf) IRS October 2023 Table 1 lists 4.43% annual mid-term AFR. [IRS1](https://www.irs.gov/pub/irs-drop/rr-23-18.pdf) This primary chain supports 4.43%; AP’s later 4.33% conflicts with it. [AP23](https://apnews.com/article/shohei-otani-dodgers-3fe44e39efc42674f75b5233cc01b149), [AP24](https://apnews.com/article/largest-mlb-contracts-c979a30e05e576011a9c172719eda040)

Keep the official reported CBT charge at approximately $46m annually. We have no signed contract or official contract-specific worksheet to validate exact dollar conventions. A CBT payroll charge is not the cash tax bill. It does not discount every payment back to one signing-period date. Simple ten-year discounting at 4.43% also does not exactly reproduce AP’s precise reported total, so the appendix makes no exact-dollar reconciliation claim.

Article XVI requires present-value funding by the second July 1 after the earning season and continuous maintenance of outstanding-payment PV. It specifies 5% annually, with a conditional amendment mechanism. Thus the 2024 earning season implies a July 1, 2026 deadline. Actual funding records and amendments are unavailable. [CBA1, Article XVI](https://www.mlbplayers.com/_files/ugd/4d23dc_d6dfc2344d2042de973e37de62484da5.pdf)

Inference: $2m of annual player cash payments is not the full club economic burden or discretionary liquidity cost. Keep funding allocation separate from compensation expense. Counting reserve allocations and later player payments as two costs would double count. A full liquidity model needs actual reserve balances, returns, top-ups and withdrawals.

## Hypothetical gross receipts to contribution

This table assumes $100m of annual club gross sponsorship receipts for ten years, no growth, and year-end collection. Every attribution fraction and margin is hypothetical. No announcement supplied a verified $100m fee. Retained margin incorporates assumed delivery costs, commissions and revenue sharing, before salary, incremental CBT cash tax, capital spending and separately excluded costs. Incremental fixed cost is set to zero solely to show the arithmetic.

Annual contribution = gross club receipts × attributable fraction × retained contribution margin − incremental fixed costs.

| Assumed attribution | Assumed retained margin | Annual contribution, $m | Ten-year contribution PV at 5%, $m | Contribution PV less salary-payment PV, $m | Salary-only required gross receipts per year, $m |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 25% | 20% | 5.00 | 38.609 | -299.187 | 874.922 |
| 25% | 40% | 10.00 | 77.217 | -260.578 | 437.461 |
| 25% | 60% | 15.00 | 115.826 | -221.970 | 291.641 |
| 50% | 20% | 10.00 | 77.217 | -260.578 | 437.461 |
| 50% | 40% | 20.00 | 154.435 | -183.361 | 218.731 |
| 50% | 60% | 30.00 | 231.652 | -106.144 | 145.820 |
| 100% | 20% | 20.00 | 154.435 | -183.361 | 218.731 |
| 100% | 40% | 40.00 | 308.869 | -28.926 | 109.365 |
| 100% | 60% | 60.00 | 463.304 | 125.508 | 72.910 |

The rightmost column is the $43.746m equivalent annual salary-payment hurdle divided by attribution and retained margin. A positive balance in this simplified table establishes only a hypothetical salary-payment surplus under those assumptions. It does not establish actual contract breakeven or the club’s return. The nine cases are sensitivities, not forecasts.

A full club valuation compares attributable club contribution and avoided alternative roster costs with player compensation, marginal CBT cash tax, other incremental operating costs, capital spending and working capital. Model sports performance in contribution or avoided roster cost once; do not count both a theoretical player valuation and the same monetized win revenue. Do not add athlete endorsements to club receipts. The counterfactual, attribution fractions and actual cash flows remain unresolved.

## Revenue evidence rules

A primary sponsor announcement can verify an agreement without verifying its price. ANA’s release confirms a multiyear Dodgers partnership and stadium/TV signage; it discloses no fee or isolated Ohtani attribution. [ANA1](https://www.anahd.co.jp/group/en/pr/202404/20240402.html)

Use separate records for agreement existence, disclosed contractual amount, cash receipt, earned revenue and third-party income estimate. No verified athlete endorsement dollar amount was obtained here. Any global off-field estimate requires its source, period, scope and components; it cannot establish U.S.-only endorsement receipts. Unknown is not zero. Advertiser contribution is a separate model after rights fees, production and media spending.

## Current outlook and decision limits

A current valuation as of October 13, 2026 would exclude paid amounts, discount remaining obligations from the current date, update expected contribution and model remaining alternatives. It cannot reuse the original-decision PV as today’s remaining liability. Prescribed payroll measures do not change merely because this illustrative DCF uses a different discount rate. No current liability or current official payroll value is computed here.

The evidence does not prove “best deal ever,” actual net breakeven, ledger error or grounds for a real firing. No ledger was supplied. Greg is a fictional exercise character.

## Math audit

Completed: twenty payments sum to $700m; direct discounted sums match independent high-precision Decimal calculations and closed-form annuity calculations within $0.00001; PV falls as the discount rate rises.

Remaining: peer review units, signs, year indexing and deck rounding; obtain exact contractual dates for precise valuation; reconcile funding reserves before liquidity claims; obtain attributable retained receipts, alternative roster costs, marginal CBT tax and other incremental costs before a club investment conclusion.

Ownership: Mara checks rights and records unresolved terms; Fred audits attribution and finance; Nico supplies dated performance and availability context; Maren preserves sources and qualifications in the decks.

## Source IDs

- [MLB1](https://www.mlb.com/news/shohei-ohtani-dodgers-deal-deferrals-explained), league reporting. Unnamed source for full payment terms; approximate CBT.
- [CBA1](https://www.mlbplayers.com/_files/ugd/4d23dc_d6dfc2344d2042de973e37de62484da5.pdf), MLBPA primary agreement. Article XVI printed pp.89-90; Article XXIII definitions printed p.116 and E(6) pp.136-137
- [IRS1](https://www.irs.gov/pub/irs-drop/rr-23-18.pdf), government primary. Rev. Rul. 2023-18 Table 1, October 2023 annual mid-term AFR
- [ANA1](https://www.anahd.co.jp/group/en/pr/202404/20240402.html), sponsor primary announcement. Partnership existence; no disclosed fee or isolated Ohtani attribution.
- [AP23](https://apnews.com/article/shohei-otani-dodgers-3fe44e39efc42674f75b5233cc01b149), secondary contract reporting. 4.43% report; not signed contract or official calculation.
- [AP24](https://apnews.com/article/largest-mlb-contracts-c979a30e05e576011a9c172719eda040), secondary reporting supplied by Nico. 4.33% report conflicts with prescribed primary rate.
