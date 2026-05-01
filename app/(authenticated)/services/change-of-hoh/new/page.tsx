"use client";

import { useState } from "react";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import ChangeOfHoHForm from "@/app/components/forms/change-of-hoh/ChangeOfHoHForm";
import HouseholdInfoForm from "@/app/components/forms/household-info/HouseholdInfoForm";

const TABS = [
  { id: "change-hoh", label: "Change of Head of Household" },
  // { id: "household-info", label: "Household Information" },
];

export default function ChangeOfHoHPage() {
  const [activeTab, setActiveTab] = useState<"change-hoh" | "household-info">(
    "change-hoh",
  );

  return (
    <ServicePageLayout serviceId="change-of-hoh">
      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl mb-4 mx-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id as "change-hoh" | "household-info")
            }
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "change-hoh" && <ChangeOfHoHForm isPage={true} />}
      {activeTab === "household-info" && <HouseholdInfoForm isPage={true} />}
    </ServicePageLayout>
  );
}
