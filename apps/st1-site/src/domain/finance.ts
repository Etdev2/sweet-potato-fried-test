import { z } from "zod";
import type { Parsed } from "./deck";

// Only the parts of ST-1/finance.json the site draws. The model holds more.
const financeSchema = z
  .object({
    currency: z.string().min(1),
    valuation: z.object({ date: z.string().min(1) }),
    nominal_contract: z.object({
      total_usd: z.number().positive(),
      service_period_paid_usd: z.number().nonnegative(),
      deferred_paid_usd: z.number().nonnegative(),
    }),
    player_payment_schedule: z
      .array(z.object({ year: z.number().int(), player_payment_usd: z.number().nonnegative() }))
      .min(1),
    present_value_sensitivities: z
      .array(z.object({ discount_rate: z.number().positive(), total_player_payment_pv_usd: z.number().positive() }))
      .min(1),
    sponsorship_sensitivity: z.object({
      cases: z
        .array(
          z.object({
            attribution_fraction: z.number(),
            retained_net_contribution_margin: z.number(),
            annual_attributable_contribution_usd: z.number().nonnegative(),
          }),
        )
        .min(1),
    }),
  })
  .superRefine((finance, context) => {
    const scheduled = finance.player_payment_schedule.reduce((sum, row) => sum + row.player_payment_usd, 0);
    if (scheduled !== finance.nominal_contract.total_usd) {
      context.addIssue({
        code: "custom",
        message: `The payment schedule sums to ${String(scheduled)}, not the nominal total ${String(finance.nominal_contract.total_usd)}.`,
      });
    }
  });
export type Finance = z.infer<typeof financeSchema>;

/** Turns the contents of ST-1/finance.json into the typed model, or lists what is wrong with it. */
export function parseFinance(input: unknown): Parsed<Finance> {
  const result = financeSchema.safeParse(input);
  if (result.success) {
    return { ok: true, value: result.data };
  }
  return {
    ok: false,
    problems: result.error.issues.map((issue) => {
      const where = issue.path.map(String).join(".");
      return where === "" ? issue.message : `${where}: ${issue.message}`;
    }),
  };
}

/** The modeled present value of the player payments at one discount rate, in USD. */
export function presentValueAt(finance: Finance, rate: number): number | null {
  const row = finance.present_value_sensitivities.find((candidate) => candidate.discount_rate === rate);
  return row === undefined ? null : row.total_player_payment_pv_usd;
}
