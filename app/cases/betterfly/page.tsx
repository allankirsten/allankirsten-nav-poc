import { CasePage } from "@/components/CasePage";
import { getCaseContent, getCaseNavigation } from "@/lib/caseContent";

export default function BetterflyCase() {
  return <CasePage content={getCaseContent("betterfly")} nav={getCaseNavigation("betterfly")} />;
}
