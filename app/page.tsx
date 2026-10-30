import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { MarketingShell } from "@/components/shell/MarketingShell";

export const metadata: Metadata = {
  title: {
    absolute: "MockInterview — Copilote d'entretien",
  },
};

export default function Page() {
  return (
    <MarketingShell>
      <HomePage />
    </MarketingShell>
  );
}
