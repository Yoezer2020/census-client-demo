"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Hash,
  Baby,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  UserX,
  Heart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

interface PendingApplication {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  applicant_cid: string;
  status: string;
}

interface VerificationStepProps {
  type: "birth" | "death";
  applications: PendingApplication[];
  onVerify: (id: string, status: string) => void;
  onProceed: () => void;
}

export default function VerificationStep({
  type,
  applications,
  onVerify,
  onProceed,
}: VerificationStepProps) {
  const [viewingApp, setViewingApp] = useState<PendingApplication | null>(null);

  const isBirth = type === "birth";
  const MainIcon = isBirth ? Baby : UserX;
  const registrationLabel = isBirth
    ? "Birth Registration"
    : "Death Registration";
  const subjectLabel = isBirth ? "child" : "deceased";
  const actionLabel = isBirth ? "parent" : "next of kin";

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 px-4 shadow-sm border border-slate-100 rounded-3xl bg-white">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Verification Complete
        </h3>
        <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
          You have no more pending {registrationLabel.toLowerCase()}{" "}
          applications to verify. You can now proceed to start a new
          registration.
        </p>
        <Button
          onClick={onProceed}
          className="px-8 h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center gap-2 mx-auto"
        >
          Start New Registration
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-slate-100">
          <MainIcon className="w-6 h-6 text-slate-400" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-1">
          Applying for another {subjectLabel}?
        </h4>
        <p className="text-sm text-slate-500 font-medium mb-6">
          You can skip the verification and start a new registration anytime.
        </p>
        <Button
          onClick={onProceed}
          className="px-10 h-12 bg-white hover:bg-slate-50 text-primary border-2 border-primary/20 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
        >
          Skip and Start New
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {viewingApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-0 max-w-2xl w-full shadow-2xl relative animate-in zoom-in-95 duration-200 border border-slate-100 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <MainIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl text-white font-bold">
                    Review Details
                  </h3>
                  <p className="text-white font-medium">
                    Verify the {subjectLabel}'s information
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingApp(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Full Name
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {viewingApp.first_name} {viewingApp.middle_name}{" "}
                      {viewingApp.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      {isBirth ? "Date of Birth" : "Date of Death"}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {viewingApp.date_of_birth}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Gender
                    </p>
                    <p className="text-lg font-bold text-slate-900 capitalize">
                      {viewingApp.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Applicant CID
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {viewingApp.applicant_cid}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 flex gap-3 mb-8">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800 font-medium leading-relaxed">
                  By confirming, you agree that the information provided is
                  accurate and you authorize the{" "}
                  {registrationLabel.toLowerCase()} of this {subjectLabel} under
                  your responsibility.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    onVerify(viewingApp.id, "REJECTED");
                    setViewingApp(null);
                  }}
                  className="flex-1 h-12 rounded-xl border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 hover:border-red-200 transition-all"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Information
                </Button>
                <Button
                  onClick={() => {
                    onVerify(viewingApp.id, "VERIFIED");
                    setViewingApp(null);
                  }}
                  className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
