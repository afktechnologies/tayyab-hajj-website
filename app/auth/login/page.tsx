import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { MdOutlineSecurity } from "react-icons/md";
import LoginForm from "@/components/layout/Admin/Login/LoginForm";

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    return redirect("/admin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E5E5E5]">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-[#171717] mr-2">Tayyab Hajj Admin Panel Login</h3>
        <MdOutlineSecurity className="text-3xl text-[#5000C9]" />
      </div>
      <div className="w-full max-w-md p-8 bg-[#FAFAFA] rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}