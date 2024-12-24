/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface AccountSwitcherProps {
  activeRole?: string;
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({ activeRole }) => {
  const [currentRole, setCurrentRole] = useState(activeRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname(); // To track current route

  const accounts = ["talent", "client"];

  const handleRoleSwitch = async (newRole: string) => {
    if (newRole === currentRole) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/switchrole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRole }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to switch role");
      }

      setCurrentRole(newRole);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false); // Stop loading if there's an error
    }
  };

  // Stop loading once the route changes
  useEffect(() => {
    setLoading(false);
  }, [pathname]); // React to changes in the current pathname

  const accountToSwitch = accounts.find((account) => account !== currentRole);

  if (!accountToSwitch) return null;

  return (
    <div>
      {error && (
        <p className="text-red-500 font-sora" role="alert">
          {error}
        </p>
      )}

      <Button
        variant="outline"
        size="sm"
        className="flex items-center justify-center text-sm font-medium py-2.5 gap-2 rounded-xl leading-none  px-4 bg-main-color-50 border border-main-color-500"
        onClick={() => handleRoleSwitch(accountToSwitch)}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader2 size={13} className="animate-spin" />
            <span className="leading-none">Switching...</span>
          </>
        ) : (
          <>
            {accountToSwitch === "client" ? (
              <>
                <span className="leading-none">Switch to hire</span>
              </>
            ) : (
              <>
                <span className="leading-none">Switch to sell</span>
              </>
            )}
          </>
        )}
      </Button>
    </div>
  );
};

export default AccountSwitcher;
