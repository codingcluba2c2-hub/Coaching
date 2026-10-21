import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";

describe("Formatting and calculation utilities", () => {
  it("formats currency correctly into INR", () => {
    const formatted = formatCurrency(145000);
    expect(formatted).toContain("1,45,000");
  });

  it("formats date into legible string", () => {
    const formatted = formatDate("2024-10-15");
    expect(formatted).toContain("15");
    expect(formatted).toContain("Oct");
    expect(formatted).toContain("2024");
  });

  it("formats percentages accurately", () => {
    expect(formatPercent(94.2)).toBe("94%");
    expect(formatPercent(78.8)).toBe("79%");
  });
});
