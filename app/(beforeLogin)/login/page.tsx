import LoginForm from "@/components/pages/beforeLogin/login/LoginForm";
import {Metadata} from "next";
export const metadata: Metadata = {
  title: "로그인 | 댕스쿨",
};
export default function Page() {
  return <LoginForm />;
}
