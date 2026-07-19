import { CasePage } from "@/components/CasePage";
import { getCaseContent, getCaseNavigation } from "@/lib/caseContent";

export default function RemessaCase() {
  return <CasePage content={getCaseContent("remessa-online")} nav={getCaseNavigation("remessa-online")} />;
}
