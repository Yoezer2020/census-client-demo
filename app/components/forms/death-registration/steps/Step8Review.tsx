"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { DeathRegistrationData } from "@/lib/validations/death-registration.schema";

interface Step8ReviewProps {
  data: Partial<DeathRegistrationData>;
  updateData: (data: Partial<DeathRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step8Review({
  data,
  updateData,
  errors,
}: Step8ReviewProps) {
  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-muted-foreground mb-1 sm:mb-0">
        {label}:
      </span>
      <span className="text-sm font-medium text-right">{value || "N/A"}</span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Review & Submit
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Please review all information before submitting
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          Please review all information carefully before submitting. You can go
          back to any step to make changes.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">
            Applicant Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <InfoRow
            label="Applicant CID"
            value={data.applicant_cid || data.applicantCID || ""}
          />
          <InfoRow
            label="Applicant Contact No"
            value={data.applicant_contact_no || ""}
          />
          <InfoRow
            label="Applicant Type"
            value={
              data.applicant_is === "FAMILY"
                ? "Family Member"
                : data.applicant_is === "OPERATOR"
                  ? "Operator"
                  : "N/A"
            }
          />
          <InfoRow
            label="Registered in ePIS"
            value={
              data.is_health_registered === true
                ? "Yes"
                : data.is_health_registered === false
                  ? "No (Fetched from Citizen Registry)"
                  : "N/A"
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">
            Deceased Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <InfoRow
            label="Deceased CID"
            value={data.deceased_cid || data.deceasedCID || ""}
          />
          <InfoRow
            label="Full Name"
            value={[data.first_name, data.middle_name, data.last_name]
              .filter(Boolean)
              .join(" ")}
          />
          <InfoRow label="Date of Birth" value={data.date_of_birth || ""} />
          <InfoRow
            label="Gender"
            value={
              data.gender === "male"
                ? "Male"
                : data.gender === "female"
                  ? "Female"
                  : data.gender === "other"
                    ? "Other"
                    : data.gender || "N/A"
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">
            Deceased Permanent Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {data.dzongkhag_id && (
            <InfoRow
              label="Dzongkhag"
              value={
                data.dzongkhag_id === "1"
                  ? "Thimphu"
                  : data.dzongkhag_id === "2"
                    ? "Paro"
                    : data.dzongkhag_id === "3"
                      ? "Punakha"
                      : data.dzongkhag_id === "4"
                        ? "Bumthang"
                        : data.dzongkhag_id
              }
            />
          )}
          {data.gewog_id && (
            <InfoRow
              label="Gewog"
              value={
                data.gewog_id === "1"
                  ? "Chang Gewog"
                  : data.gewog_id === "2"
                    ? "Motithang Gewog"
                    : data.gewog_id === "3"
                      ? "Doteng Gewog"
                      : data.gewog_id === "4"
                        ? "Lobesa Gewog"
                        : data.gewog_id
              }
            />
          )}
          {data.chiwog_id && (
            <InfoRow
              label="Chiwog"
              value={
                data.chiwog_id === "1"
                  ? "Chiwog 1"
                  : data.chiwog_id === "2"
                    ? "Chiwog 2"
                    : data.chiwog_id
              }
            />
          )}
          {data.village_id && (
            <InfoRow
              label="Village"
              value={
                data.village_id === "1"
                  ? "Motithang"
                  : data.village_id === "2"
                    ? "Dechencholing"
                    : data.village_id === "3"
                      ? "Satsam"
                      : data.village_id === "4"
                        ? "Bondey"
                        : data.village_id
              }
            />
          )}
          <InfoRow label="Household No" value={data.house_hold_no || ""} />
          <InfoRow label="House No" value={data.house_no || ""} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">
            Death Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <InfoRow label="Date of Death" value={data.date_of_death || ""} />
            <InfoRow label="Time of Death" value={data.time_of_death || ""} />
            <InfoRow label="Place of Death" value={data.place_of_death || ""} />
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              Cause of Death:
            </p>
            <p className="text-sm font-medium bg-gray-50 p-3 rounded-lg">
              {data.cause_of_death || "N/A"}
            </p>
          </div>

          {/* Death Location (if provided) */}
          {(data.country_of_death_id ||
            data.dzongkhag_of_death_id ||
            data.gewog_of_death_id ||
            data.chiwog_of_death_id ||
            data.village_of_death_id ||
            data.city_id) && (
            <div className="pt-2 border-t">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Death Location Details:
              </p>
              <div className="space-y-1">
                {data.country_of_death_id && (
                  <InfoRow
                    label="Country"
                    value={
                      data.country_of_death_id === "1"
                        ? "Bhutan"
                        : data.country_of_death_id === "2"
                          ? "India"
                          : data.country_of_death_id === "3"
                            ? "Nepal"
                            : data.country_of_death_id
                    }
                  />
                )}
                {data.city_id && (
                  <InfoRow
                    label="City"
                    value={
                      data.city_id === "1"
                        ? "Thimphu City"
                        : data.city_id === "2"
                          ? "Phuentsholing"
                          : data.city_id === "3"
                            ? "Paro"
                            : data.city_id
                    }
                  />
                )}
                {data.dzongkhag_of_death_id && (
                  <InfoRow
                    label="Dzongkhag"
                    value={
                      data.dzongkhag_of_death_id === "1"
                        ? "Thimphu"
                        : data.dzongkhag_of_death_id === "2"
                          ? "Paro"
                          : data.dzongkhag_of_death_id === "3"
                            ? "Punakha"
                            : data.dzongkhag_of_death_id === "4"
                              ? "Bumthang"
                              : data.dzongkhag_of_death_id
                    }
                  />
                )}
                {data.gewog_of_death_id && (
                  <InfoRow
                    label="Gewog"
                    value={
                      data.gewog_of_death_id === "1"
                        ? "Chang Gewog"
                        : data.gewog_of_death_id === "2"
                          ? "Motithang Gewog"
                          : data.gewog_of_death_id === "3"
                            ? "Doteng Gewog"
                            : data.gewog_of_death_id === "4"
                              ? "Lobesa Gewog"
                              : data.gewog_of_death_id
                    }
                  />
                )}
                {data.chiwog_of_death_id && (
                  <InfoRow
                    label="Chiwog"
                    value={
                      data.chiwog_of_death_id === "1"
                        ? "Chiwog 1"
                        : data.chiwog_of_death_id === "2"
                          ? "Chiwog 2"
                          : data.chiwog_of_death_id
                    }
                  />
                )}
                {data.village_of_death_id && (
                  <InfoRow
                    label="Village"
                    value={
                      data.village_of_death_id === "1"
                        ? "Motithang"
                        : data.village_of_death_id === "2"
                          ? "Dechencholing"
                          : data.village_of_death_id === "3"
                            ? "Satsam"
                            : data.village_of_death_id === "4"
                              ? "Bondey"
                              : data.village_of_death_id
                    }
                  />
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Attachments</CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <div className="space-y-3">
            {data.deathCertificateUrl && (
              <div className="overflow-hidden">
                <p className="text-sm text-muted-foreground mb-1">
                  Certificate URL:
                </p>
                <p className="text-sm font-medium break-words bg-gray-50 p-3 rounded-lg overflow-hidden">
                  {data.deathCertificateUrl}
                </p>
              </div>
            )}
            {data.certificate && data.certificate.length > 0 ? (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Uploaded Files ({data.certificate.length}):
                </p>
                <ul className="space-y-2">
                  {data.certificate.map((file: any, index: number) => (
                    <li
                      key={index}
                      className="text-sm font-medium bg-gray-50 p-3 rounded-lg flex items-center justify-between gap-2 min-w-0 overflow-hidden"
                    >
                      <span className="truncate min-w-0">
                        {file.name || `File ${index + 1}`}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                        {file.size ? `${(file.size / 1024).toFixed(2)} KB` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No files uploaded
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 cursor-pointer group shadow-sm active:scale-[0.98]">
        <Checkbox
          id="disclaimer"
          checked={!!data.disclaimerAgreed}
          onCheckedChange={(checked) => {
            updateData({
              disclaimerAgreed: checked === true ? true : (undefined as any),
            });
          }}
          className="size-5"
        />
        <Label
          htmlFor="disclaimer"
          className="text-sm font-normal text-gray-900 cursor-pointer select-none flex-1"
        >
          I have read and understood the terms and conditions. I certify that
          all information I will provide is true and accurate to the best of my
          knowledge.
        </Label>
      </div>

      {errors.disclaimerAgreed && (
        <p className="text-destructive text-sm font-bold text-center bg-destructive/10 p-3 rounded-xl animate-in zoom-in duration-300">
          {errors.disclaimerAgreed}
        </p>
      )}

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm font-medium text-center leading-relaxed">
            By submitting this form, I certify that the information provided is
            true and accurate to the best of my knowledge.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
