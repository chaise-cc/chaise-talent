/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

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

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Switch Account</h2>
      <p className="text-sm text-gray-600 mb-6">
        You are currently signed in as: <strong>{currentRole}</strong>
      </p>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex flex-wrap gap-4">
        {accounts.map((role) => (
          <button
            key={role}
            className={`px-4 py-2 rounded-md ${
              role === currentRole
                ? "bg-blue-500 text-white cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            disabled={loading || role === currentRole} // Disable button for current role or when loading
            onClick={() => handleRoleSwitch(role)}
          >
            {loading && role !== currentRole
              ? "Switching..."
              : role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
