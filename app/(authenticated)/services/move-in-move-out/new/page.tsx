"use client";

import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";
import MoveInMoveOutForm from "@/app/components/forms/move-in-move-out/MoveInMoveOutForm";

export default function MoveInMoveOutPage() {
  return (
    <ServicePageLayout serviceId="move-in-move-out">
      <MoveInMoveOutForm isPage={true} />
    </ServicePageLayout>
  );
}
