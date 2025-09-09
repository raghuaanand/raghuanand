import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import WriteEditor from "@/components/write-editor";

export const metadata = {
  title: "Write",
  description: "Create a new blog post",
};

export default async function WritePage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/write")}`);
  }

  return <WriteEditor />;
}