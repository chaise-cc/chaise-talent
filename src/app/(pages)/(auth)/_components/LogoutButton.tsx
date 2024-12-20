"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/auth/login"); // Redirect to login page
      } else {
        console.error("Logout failed:", await response.json());
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Logout request failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      className={`btn ${isLoggingOut ? "btn-disabled" : "btn-primary"}`}
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Logging Out..." : "Log Out"}
    </button>
  );
};

export default LogoutButton;
