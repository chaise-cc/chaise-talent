"use client";

import { useRouter } from "next/navigation";
import React from "react";
import TopNavigation from "../../_components/talent/top-navigation";
import ActionButton from "@/components/custom/ActionButton";

export default function ServicesPage() {
  const router = useRouter();

  return (
    <div>
      <TopNavigation
        pageTitle="Services"
        pageCrumbs={[
          { text: "Home", link: "/" },
          { text: "Services", link: "/services" },
        ]}
        action={
          <ActionButton
            onclick={() => router.push("/dashboard/services/new")}
            label="Add a service"
          />
        }
      />
      ServicesPage
    </div>
  );
}
