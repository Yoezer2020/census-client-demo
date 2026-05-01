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
      <div className="text-center py-8 sm:py-12 px-4 sm:px-6 shadow-sm border border-slate-100 rounded-2xl sm:rounded-3xl bg-white">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Verification Complete
        </h3>
        <p className="text-sm sm:text-base text-slate-500 font-medium max-w-md mx-auto mb-6 sm:mb-8 px-2">
          You have no more pending {registrationLabel.toLowerCase()}{" "}
          applications to verify. You can now proceed to start a new
          registration.
        </p>
        <Button
          onClick={onProceed}
          className="w-full sm:w-auto px-6 sm:px-8 h-11 sm:h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
        >
          Start New Registration
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-3xl bg-slate-50/30">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 sm:mb-4 border border-slate-100">
          <MainIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
        </div>
        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 text-center px-2">
          Applying for another {subjectLabel}?
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mb-4 sm:mb-6 text-center px-2">
          You can skip the verification and start a new registration anytime.
        </p>
        <Button
          onClick={onProceed}
          className="w-full sm:w-auto px-8 sm:px-10 h-11 sm:h-12 bg-white hover:bg-slate-50 text-primary border-2 border-primary/20 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
        >
          Skip and Start New
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {viewingApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-0 max-w-2xl w-full max-h-[95vh] sm:max-h-none overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="bg-slate-900 p-4 sm:p-6 text-white flex justify-between items-start sticky top-0 z-10">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="p-2 sm:p-3 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-md shrink-0">
                  <MainIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-2xl text-white font-bold truncate">
                    Review Details
                  </h3>
                  <p className="text-xs sm:text-sm text-white font-medium truncate">
                    Verify the {subjectLabel}'s information
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingApp(null)}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors shrink-0 ml-2"
              >
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Full Name
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 break-words">
                      {viewingApp.first_name} {viewingApp.middle_name}{" "}
                      {viewingApp.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      {isBirth ? "Date of Birth" : "Date of Death"}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900">
                      {viewingApp.date_of_birth}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Gender
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 capitalize">
                      {viewingApp.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Applicant CID
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 break-all">
                      {viewingApp.applicant_cid}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex gap-2 sm:gap-3 mb-6 sm:mb-8">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800 font-medium leading-relaxed">
                  By confirming, you agree that the information provided is
                  accurate and you authorize the{" "}
                  {registrationLabel.toLowerCase()} of this {subjectLabel} under
                  your responsibility.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    onVerify(viewingApp.id, "REJECTED");
                    setViewingApp(null);
                  }}
                  className="flex-1 h-11 sm:h-12 rounded-xl border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 hover:border-red-200 transition-all text-sm sm:text-base order-2 sm:order-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Information
                </Button>
                <Button
                  onClick={() => {
                    onVerify(viewingApp.id, "VERIFIED");
                    setViewingApp(null);
                  }}
                  className="flex-1 h-11 sm:h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:opacity-90 transition-all text-sm sm:text-base order-1 sm:order-2"
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
