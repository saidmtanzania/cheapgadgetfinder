import { requireAdminSession } from "@/lib/auth";
import { getVisitorSnapshot } from "@/lib/visitor-analytics";

export async function GET() {
  try {
    await requireAdminSession();
    const snapshot = await getVisitorSnapshot();
    return Response.json(snapshot);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
