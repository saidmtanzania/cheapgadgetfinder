import { redirect } from "next/navigation";

export default function ArticlesLegacyRedirect() {
  redirect("/admin/articles");
}
