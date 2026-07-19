import { CasePage } from "@/components/CasePage";
import { getCaseContent, getCaseNavigation } from "@/lib/caseContent";

export default function XerpayCase() {
  return <CasePage content={getCaseContent("xerpay")} nav={getCaseNavigation("xerpay")} />;
}
