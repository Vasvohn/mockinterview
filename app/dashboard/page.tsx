import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { MarketingShell } from "@/components/shell/MarketingShell";

export const metadata: Metadata = {
  title: "Sessions",
};

export default function DashboardPage() {
  return (
    <MarketingShell>
      <Dashboard />
    </MarketingShell>
  );
}
