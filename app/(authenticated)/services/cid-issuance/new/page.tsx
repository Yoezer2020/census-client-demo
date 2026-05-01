"use client";

import CIDIssuanceForm from "@/app/components/forms/cid-issuance/CIDIssuanceForm";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";

export default function CIDIssuancePage() {
  return (
    <ServicePageLayout serviceId="cid-issuance">
      <div className="bg-gray-50 flex flex-col">
        <CIDIssuanceForm isPage={true} />
      </div>
    </ServicePageLayout>
  );
}
