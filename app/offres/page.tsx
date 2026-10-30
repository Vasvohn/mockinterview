import type { Metadata } from "next";
import { Offers } from "@/components/offres/Offers";
import { MarketingShell } from "@/components/shell/MarketingShell";

export const metadata: Metadata = {
  title: "Offres",
};

export default function OffersPage() {
  return (
    <MarketingShell>
      <Offers />
    </MarketingShell>
  );
}
