"use client";

import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Card } from "@/app/components/ui/card";
import {
  MapPin,
  Users,
  AlertCircle,
  Loader2,
  CreditCard,
  Calendar,
  Info,
} from "lucide-react";
import { CIDIssuanceData } from "@/lib/validations/cid-issuance.schema";
import CitizensDetailService from "@/lib/services/citizen_main_registry_service/citizens-detail/citizens-detail";
import CIDCardsService from "@/lib/services/citizen_main_registry_service/cid-cards/cid-cards";
import PaymentServiceTypesService, {
  PaymentServiceType,
} from "@/lib/services/common-service/payment-service-types/payment-service-types";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface Step3RecipientDetailsProps {
  data: Partial<CIDIssuanceData>;
  updateData: (data: Partial<CIDIssuanceData>) => void;
  errors: Record<string, string>;
}

export default function Step3RecipientDetails({
  data,
  updateData,
  errors,
}: Step3RecipientDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [citizenData, setCitizenData] = useState<any>(null);
  const [cidIssuanceType, setCidIssuanceType] = useState<any>(null);
  const [paymentTypes, setPaymentTypes] = useState<PaymentServiceType[]>([]);
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState<
    string | undefined
  >(data.payment_type_id);

  // Check if selected application type is replacement
  const isReplacement = data.application_type
    ?.toLowerCase()
    .includes("replacement");

  // Fetch citizen data when component mounts
  useEffect(() => {
    const fetchCitizenData = async () => {
      if (data.cid_no) {
        setIsLoading(true);
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 800));

          // Determine scenario based on CID
          let citizenResponse: any;
          let issuanceTypeResponse: any;
          let message = "";

          if (data.cid_no === "11234567890") {
            // Mother - No CID card found (New application)
            // But fetch basic citizen registry data
            citizenResponse = {
              citizen_details: {
                first_name: "Pema",
                middle_name: "Deki",
                last_name: "Wangmo",
                date_of_birth: "1990-05-12",
                gender: "female",
              },
            };
            issuanceTypeResponse = {
              type: "New",
              can_apply: true,
              message:
                "No CID card found in system. Fetching citizen registry data for new CID application.",
            };
            message = "No CID card found - New application";
            toast.info(issuanceTypeResponse.message);
          } else if (data.cid_no === "11105001234") {
            // Father - CID validity expired (Replacement)
            citizenResponse = {
              citizen_details: {
                first_name: "Karma",
                middle_name: "Tenzin",
                last_name: "Dorji",
                date_of_birth: "1985-08-15",
                gender: "male",
              },
            };
            issuanceTypeResponse = {
              type: "Replacement",
              can_apply: true,
              message:
                "CID validity is not within 6 months. Replacement card required.",
              cid_card: {
                issue_date: "2016-01-15",
                expiry_date: "2026-01-15", // Expired
              },
            };
            message = "CID validity expired - Replacement required";
            toast.warning(issuanceTypeResponse.message);
          } else {
            // Default scenario for other CIDs
            citizenResponse = {
              citizen_details: {
                first_name: "Sonam",
                middle_name: "",
                last_name: "Yangden",
                date_of_birth: "2010-03-20",
                gender: "female",
              },
            };
            issuanceTypeResponse = {
              type: "New",
              can_apply: true,
            };
          }

          // Dummy payment types with correct amounts
          const paymentTypesResponse = {
            data: [
              {
                id: "1",
                name: "New CID (Age 16+)",
                amount: 100,
                currency: "Nu.",
                service_type: "New",
                payment_type: "New",
              },
              {
                id: "2",
                name: "CID Renewal",
                amount: 50,
                currency: "Nu.",
                service_type: "Renewal",
                payment_type: "Renewal",
              },
              {
                id: "3",
                name: "CID Replacement - Lost",
                amount: 300,
                currency: "Nu.",
                service_type: "Replacement",
                payment_type: "Replacement",
              },
              {
                id: "4",
                name: "CID Replacement - Damaged",
                amount: 300,
                currency: "Nu.",
                service_type: "Replacement",
                payment_type: "Replacement",
              },
            ],
          };

          setCitizenData(citizenResponse);
          setCidIssuanceType(issuanceTypeResponse);
          setPaymentTypes(paymentTypesResponse.data);

          // Update form data with citizen details (if available)
          if (citizenResponse?.citizen_details) {
            const updates: Partial<CIDIssuanceData> = {
              first_name: citizenResponse.citizen_details.first_name,
              middle_name: citizenResponse.citizen_details.middle_name || "",
              last_name: citizenResponse.citizen_details.last_name,
              date_of_birth: citizenResponse.citizen_details.date_of_birth,
              recipientName:
                `${citizenResponse.citizen_details.first_name} ${citizenResponse.citizen_details.middle_name || ""} ${citizenResponse.citizen_details.last_name}`.trim(),
              recipientDOB: citizenResponse.citizen_details.date_of_birth,
            };
            updateData(updates);
          }

          // Auto-select matching payment type based on CID issuance type
          if (
            issuanceTypeResponse?.type &&
            paymentTypesResponse.data.length > 0
          ) {
            const matchingPaymentType = paymentTypesResponse.data.find(
              (pt) =>
                pt.payment_type.toUpperCase() ===
                issuanceTypeResponse.type.toUpperCase(),
            );

            if (matchingPaymentType) {
              setSelectedPaymentTypeId(matchingPaymentType.id);
              updateData({
                payment_type_id: matchingPaymentType.id,
                application_type: matchingPaymentType.payment_type,
              });
            }
          }

          console.log("Citizen data fetched:", citizenResponse);
          console.log("CID Issuance Type:", issuanceTypeResponse);
          console.log("Payment Types:", paymentTypesResponse);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch citizen details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCitizenData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.cid_no]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="size-12 animate-spin text-primary mx-auto" />
          <p className="text-sm text-gray-600 font-medium">
            Loading citizen details...
          </p>
        </div>
      </div>
    );
  }

  if (!citizenData) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <AlertCircle className="size-12 text-gray-400 mx-auto" />
          <p className="text-sm text-gray-600 font-medium">
            No citizen data found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Demo Info Card */}
      <div className="bg-purple-50 rounded-xl border border-purple-200 p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">
              Demo Data Displayed
            </h4>
            {data.cid_no === "11234567890" ? (
              <div className="space-y-1 text-xs text-purple-800">
                <p>
                  <strong>Scenario:</strong> New CID Application (No existing
                  CID card)
                </p>
                <p>
                  <strong>Data Source:</strong> Citizen Registry
                </p>
                <p>
                  <strong>Recipient:</strong> Pema Deki Wangmo (Female, born
                  1990-05-12)
                </p>
                <p>
                  <strong>Payment:</strong> Nu. 100 for new CID
                </p>
              </div>
            ) : data.cid_no === "11105001234" ? (
              <div className="space-y-1 text-xs text-purple-800">
                <p>
                  <strong>Scenario:</strong> CID Replacement (Validity expired)
                </p>
                <p>
                  <strong>Data Source:</strong> Existing CID Card System
                </p>
                <p>
                  <strong>Recipient:</strong> Karma Tenzin Dorji (Male, born
                  1985-08-15)
                </p>
                <p>
                  <strong>Payment:</strong> Nu. 300 for replacement
                </p>
              </div>
            ) : (
              <p className="text-xs text-purple-800">
                Default citizen data displayed
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CID Issuance Type Information */}
      {cidIssuanceType && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <Info className="size-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-semibold leading-relaxed">
                {cidIssuanceType.message}
              </p>
            </div>
          </div>

          {cidIssuanceType.cid_card && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-4 border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="size-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      Issue Date
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(
                        cidIssuanceType.cid_card.issue_date,
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="size-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      Expiry Date
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(
                        cidIssuanceType.cid_card.expiry_date,
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Type of Application */}
      <div className="space-y-4">
        <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
          Type of Application <span className="text-destructive">*</span>
        </Label>
        <Select
          value={selectedPaymentTypeId || ""}
          onValueChange={(val) => {
            setSelectedPaymentTypeId(val);
            const selectedType = paymentTypes.find((pt) => pt.id === val);
            if (selectedType) {
              updateData({
                payment_type_id: selectedType.id,
                application_type: selectedType.payment_type,
              });
            }
          }}
        >
          <SelectTrigger className="h-11 rounded-lg">
            <SelectValue placeholder="Select type of application" />
          </SelectTrigger>
          <SelectContent>
            {paymentTypes.map((paymentType) => (
              <SelectItem key={paymentType.id} value={paymentType.id}>
                {paymentType.payment_type} - {paymentType.currency}{" "}
                {paymentType.amount}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.payment_type_id && (
          <p className="text-destructive text-[11px] font-semibold pl-0.5">
            {errors.payment_type_id}
          </p>
        )}
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <h4 className="text-lg font-bold text-gray-900">
            Recipient Personal Details
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">
              CID Number
            </Label>
            <Input
              value={data.cid_no || ""}
              disabled
              className="bg-gray-50 font-bold border-gray-200 h-11 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">
              First Name
            </Label>
            <Input
              value={data.first_name || ""}
              disabled
              className="bg-gray-50 font-bold border-gray-200 h-11 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">
              Middle Name
            </Label>
            <Input
              value={data.middle_name || ""}
              disabled
              className="bg-gray-50 font-bold border-gray-200 h-11 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">
              Last Name
            </Label>
            <Input
              value={data.last_name || ""}
              disabled
              className="bg-gray-50 font-bold border-gray-200 h-11 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">
              Date of Birth
            </Label>
            <Input
              value={data.date_of_birth || ""}
              disabled
              className="bg-gray-50 font-bold border-gray-200 h-11 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">
              Gender
            </Label>
            <Input
              value={citizenData?.citizen_details?.gender || ""}
              disabled
              className="bg-gray-50 font-bold border-gray-200 h-11 rounded-lg"
            />
          </div>
        </div>

        {isReplacement && (
          <div className="space-y-4 pt-2">
            <Label className="text-sm font-bold text-gray-700">
              Reason for Replacement <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              onValueChange={(val) =>
                updateData({
                  replacementReason:
                    val as CIDIssuanceData["replacementReason"],
                })
              }
              defaultValue={data.replacementReason}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {["Lost", "Damaged", "Stolen", "Other"].map((reason) => (
                <div key={reason}>
                  <RadioGroupItem
                    value={reason}
                    id={reason}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={reason}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-100 bg-white hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer font-bold text-gray-600 peer-data-[state=checked]:text-primary"
                  >
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.replacementReason && (
              <p className="text-red-500 text-xs font-bold">
                {errors.replacementReason}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Household Information */}
      {citizenData?.household_information && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <h4 className="text-lg font-bold text-gray-900">
              Household Information
            </h4>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-auto">
              Verified by DCRC
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 border-gray-100 bg-gray-50/30 space-y-4">
              <h5 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> Household Details
              </h5>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Household Number
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {citizenData.household_information.household_no || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    House Number
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {citizenData.household_information.house_no || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Tharm Number
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {citizenData.household_information.tharm_no || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Nationality
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {citizenData.household_information.nationality || "N/A"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-gray-100 bg-gray-50/30 space-y-4">
              <h5 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Users className="size-4 text-primary" /> Additional Information
              </h5>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Head of Household CID
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {citizenData.household_information.hoh_cid_no || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Blood Group
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {citizenData.citizen_details.blood_group || "N/A"}
                  </p>
                </div>
                {citizenData.citizen_details.name_in_dzongkha && (
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      Name in Dzongkha
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {citizenData.citizen_details.name_in_dzongkha}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
        <AlertCircle className="size-5 text-orange-600 mt-0.5 shrink-0" />
        <p className="text-xs text-orange-800 leading-relaxed font-medium">
          If any of the above information is incorrect, please contact your
          nearest DCRC office for data rectification before proceeding with CID
          issuance.
        </p>
      </div>
    </div>
  );
}
