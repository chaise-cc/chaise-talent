import React from "react";
import Accordion from "@/components/custom/Accordion";
import { understanding_content_management } from "@/data/courses/understanding-content-management";
import MainLayout from "../../(website)/_components/mainLayout";

export default function BlogHome() {
  return (
    <MainLayout>
      <section className="container">
        <Accordion contentList={understanding_content_management} />
      </section>
    </MainLayout>
  );
}
