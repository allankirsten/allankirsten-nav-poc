import { CasePage } from "@/components/CasePage";
import { getCaseContent } from "@/lib/caseContent";

export default function BipaCase() {
  return <CasePage content={getCaseContent("bipa")} />;
}
