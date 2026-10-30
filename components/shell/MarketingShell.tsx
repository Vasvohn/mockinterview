import type { ReactNode } from "react";
import { AppHeader } from "@/components/shell/AppHeader";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main id="contenu">{children}</main>
    </>
  );
}
