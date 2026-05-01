"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { UserCircle, MapPin } from "lucide-react";
import { HouseholdInfoData } from "@/lib/validations/change-of-hoh.schema";

interface HI2ApplicantDetailsProps {
  data: Partial<HouseholdInfoData>;
  updateData: (data: Partial<HouseholdInfoData>) => void;
  errors: Record<string, string>;
}

// Mock NDI profiles removed — data comes from real NDI session
const FALLBACK_PROFILE = {
  name: "",
  cid: "",
  village: "",
  gewog: "",
  dzongkhag: "",
};

export default function HI2ApplicantDetails({
  data,
  updateData,
}: HI2ApplicantDetailsProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    // Primary: cidNo and fullName are properly typed in types/next-auth.d.ts
    let cid = session?.user?.cidNo || "";
    let name = session?.user?.fullName || session?.user?.name || "";
    // Location fields are not in the session — read from localStorage ndi_user if present
    let village = (session?.user as any)?.village || "";
    let gewog = (session?.user as any)?.gewog || "";
    let dzongkhag = (session?.user as any)?.dzongkhag || "";

    // Fallback: localStorage ndi_user
    if (!cid) {
      try {
        const raw = localStorage.getItem("ndi_user");
        if (raw) {
          const parsed = JSON.parse(raw);
          cid = parsed.cidNo || parsed.cid || "";
          name = name || parsed.fullName || parsed.name || "";
          village = village || parsed.village || parsed.permanentVillage || "";
          gewog = gewog || parsed.gewog || parsed.permanentGewog || "";
          dzongkhag =
            dzongkhag || parsed.dzongkhag || parsed.permanentDzongkhag || "";
        }
      } catch {
        /* silent */
      }
    }

    if (cid && cid !== data.cid_of_applicant) {
      updateData({
        cid_of_applicant: cid,
        applicant_name: name,
        village,
        gewog,
        dzongkhag,
      });
    }
  }, [status, session]);

  const displayCid = session?.user?.cidNo || data.cid_of_applicant || "";
  const displayName =
    session?.user?.fullName || session?.user?.name || data.applicant_name || "";
  const isVerified = !!displayCid;

  const readOnlyInput = (
    id: string,
    label: string,
    value?: string,
    note?: string,
  ) => (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="text-xs text-gray-500 uppercase tracking-wide font-semibold"
      >
        {label}
      </Label>
      <Input
        id={id}
        value={value ?? ""}
        readOnly
        placeholder={
          status === "loading" ? "Fetching from NDI…" : "Not detected"
        }
        className="bg-gray-50 text-gray-700 cursor-not-allowed rounded-xl border-gray-200 font-medium"
      />
      {note && <p className="text-xs text-gray-400">{note}</p>}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UserCircle className="size-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Applicant Details</h3>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Your information is fetched directly from your NDI session.
        </p>
      </div>

      {/* NDI Identity Card */}
      <Card className="bg-white border-gray-100">
        <div className="py-2 px-2 sm:px-3 flex items-center gap-2 sm:gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <UserCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 flex items-center gap-6 min-w-0">
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Logged in as
              </p>
              <h4 className="text-sm font-bold text-gray-900 truncate uppercase">
                {displayName ||
                  (status === "loading" ? "Loading…" : "Not detected")}
              </h4>
            </div>
            <div className="h-8 w-px bg-gray-100 hidden sm:block" />
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                Identity Number
              </p>
              <p className="text-sm text-gray-900 font-bold truncate uppercase font-mono">
                {displayCid ||
                  (status === "loading" ? "Loading…" : "Not detected")}
              </p>
            </div>
          </div>
          {isVerified && (
            <div className="px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-bold uppercase shrink-0 shadow-lg shadow-green-500/20">
              Verified
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {readOnlyInput(
          "hi-cid",
          "CID of Applicant",
          displayCid,
          "Fetched from your NDI session",
        )}
        {readOnlyInput("hi-name", "Full Name", displayName)}
      </div>

      <Card className="p-5 border-blue-100 bg-blue-50/20 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="size-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">
            Registered Address
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {readOnlyInput("hi-village", "Village", data.village)}
          {readOnlyInput("hi-gewog", "Gewog", data.gewog)}
          {readOnlyInput("hi-dzongkhag", "Dzongkhag", data.dzongkhag)}
        </div>
        <p className="text-xs text-gray-400">
          Address details sourced from the civil registry via your NDI profile
        </p>
      </Card>
    </div>
  );
}
