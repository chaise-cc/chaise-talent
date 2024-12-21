import { redirect } from "next/navigation";

export function handleRoleRedirection(activeRole: string) {
  if (activeRole === "talent") {
    return redirect("/dashboard");
  }
  if (activeRole === "client") {
    return redirect("/panel");
  }
}
