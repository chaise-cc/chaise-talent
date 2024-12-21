import Link from "next/link";
import {
  Breadcrumb as ShadcnBreadcrumbs,
  BreadcrumbItem as ShadcnBreadcrumbsItem,
} from "@/components/ui/breadcrumb"; // Adjust this import based on your actual path
import React from "react";

export interface BreadcrumbItem {
  text: string;
  link: string;
}

interface BreadCrumbProps {
  items: BreadcrumbItem[];
}

const BreadcrumbsComponent = ({ items }: BreadCrumbProps) => {
  return (
    <nav aria-label="Breadcrumb">
      <ShadcnBreadcrumbs className="flex items-center space-x-2 opacity-70">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-500">•</span>}
            {index === items.length - 1 ? (
              <ShadcnBreadcrumbsItem className="md:text-base truncate text-sm font-medium text-main-color-600">
                {item.text}
              </ShadcnBreadcrumbsItem>
            ) : (
              <ShadcnBreadcrumbsItem className="md:text-base truncate text-sm font-light text-gray-500">
                <Link href={item.link} passHref>
                  {item.text}
                </Link>
              </ShadcnBreadcrumbsItem>
            )}
          </React.Fragment>
        ))}
      </ShadcnBreadcrumbs>
    </nav>
  );
};

export default BreadcrumbsComponent;
