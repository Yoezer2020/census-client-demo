"use client";

import DeathRegistrationForm from "@/app/components/forms/death-registration/DeathRegistrationForm";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";

export default function DeathRegistrationPage() {
  return (
    <>
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
        input,
        textarea,
        select {
          max-width: 100%;
        }
      `}</style>
      <ServicePageLayout serviceId="death-registration">
        <DeathRegistrationForm isPage={true} />
      </ServicePageLayout>
    </>
  );
}
