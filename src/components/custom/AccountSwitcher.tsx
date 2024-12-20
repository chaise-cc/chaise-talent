/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function AccountSwitcher({
  accounts,
  activeRole,
}: {
  accounts: string[];
  activeRole: string;
}) {
  const [currentRole, setCurrentRole] = useState(activeRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSwitch = async (newRole: string) => {
    if (newRole === currentRole) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/switchrole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newRole }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to switch role");
      }

      setCurrentRole(newRole);
      window.location.href = `/dashboard`; // Redirect to the new dashboard
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // todo: display switching until new role is set
  const accountToSwitch = accounts.find((ac) => ac !== activeRole);

  if (!accountToSwitch) return;
  return (
    <div className="">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex flex-wrap gap-4">
        <Button
          variant={"outline"}
          size={"sm"}
          className="font-mono font-bold !leading-none !py-0 bg-main-color-100 border border-main-color-500"
          onClick={() => handleRoleSwitch(accountToSwitch)}
        >
          {loading && accountToSwitch !== currentRole ? (
            "Switching..."
          ) : (
            <>
              Switch to{" "}
              {accountToSwitch.charAt(0).toUpperCase() +
                accountToSwitch.slice(1)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
