import type { Metadata } from "next";
import { LiveSession } from "@/components/live/LiveSession";

export const metadata: Metadata = {
  title: "Session",
  description: "Copilote discret pendant l'échange.",
};

export default function LiveSessionPage() {
  return <LiveSession />;
}
