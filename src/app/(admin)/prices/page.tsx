import { redirect } from "next/navigation";

export default function PricesLegacyRedirect() {
  redirect("/admin/prices");
}
