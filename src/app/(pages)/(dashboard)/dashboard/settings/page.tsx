import getUserAndRole from "@/utils/getUserAndRole";
import React from "react";
import SettingsScreen from "../../_screens/settings";

export default async function SettingsPage() {
  const { user } = await getUserAndRole();

  if (!user) return null;
  return <SettingsScreen user={user} />;
}
