import { CasePage } from "@/components/CasePage";
import { getCaseContent, getCaseNavigation } from "@/lib/caseContent";

export default function BipaCase() {
  return <CasePage content={getCaseContent("bipa")} nav={getCaseNavigation("bipa")} />;
}
