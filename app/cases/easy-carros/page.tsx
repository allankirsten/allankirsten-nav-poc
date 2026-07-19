import { CasePage } from "@/components/CasePage";
import { getCaseContent, getCaseNavigation } from "@/lib/caseContent";

export default function EasyCarrosCase() {
  return <CasePage content={getCaseContent("easy-carros")} nav={getCaseNavigation("easy-carros")} />;
}
