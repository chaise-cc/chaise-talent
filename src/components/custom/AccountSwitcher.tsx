/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface AccountSwitcherProps {
  accounts: string[];
  activeRole: string;
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  accounts,
  activeRole,
}) => {
  const [currentRole, setCurrentRole] = useState(activeRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname(); // To track current route

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
      // router.push(`/dashboard`); // Navigate to the new role's dashboard
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
        <p className="text-red-500 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          size="sm"
          className="font-mono flex items-center font-bold rounded-full !leading-none !py-1 px-4 bg-main-color-50 border border-main-color-500"
          onClick={() => handleRoleSwitch(accountToSwitch)}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="loader mr-2"></span> {/* Optional loader */}
              <Loader2 size={10} className="animate-spin" /> Switching ...
            </>
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
};

export default AccountSwitcher;
