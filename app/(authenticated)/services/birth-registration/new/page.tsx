"use client";

import BirthRegistrationForm from "@/app/components/forms/birth-registration/BirthRegistrationForm";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";

export default function NewBirthRegistrationPage() {
  return (
    <ServicePageLayout serviceId="birth-registration">
      <BirthRegistrationForm isPage={true} skipVerification={true} />
    </ServicePageLayout>
  );
}
