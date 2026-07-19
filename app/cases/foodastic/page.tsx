import { CasePage } from "@/components/CasePage";
import { getCaseContent, getCaseNavigation } from "@/lib/caseContent";

export default function FoodasticCase() {
  return <CasePage content={getCaseContent("foodastic")} nav={getCaseNavigation("foodastic")} />;
}
