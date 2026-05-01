"use client";
import { useState } from "react";
import ServiceForm, { FormSection } from "@/app/components/forms/ServiceForm";
import InformationBox from "@/app/components/forms/InformationBox";
import ServicePageLayout from "@/app/components/layouts/ServicePageLayout";

export default function NaturalizationRegularizationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    currentNationality: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
    fatherName: "",
    fatherNationality: "",
    motherName: "",
    motherNationality: "",
    spouseName: "",
    spouseCID: "",
    marriageDate: "",
    currentAddress: "",
    residenceYears: "",
    occupation: "",
    employer: "",
    phoneNumber: "",
    email: "",
    languageProficiency: "",
    bhutaneseHistory: "",
    criminalRecord: "",
    reasonForApplication: "",
    birthCertificate: null as File | null,
    passport: null as File | null,
    residenceProof: null as File | null,
    photograph: null as File | null,
    marriageCertificate: null as File | null,
    clearanceCertificate: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0])
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Naturalization application submitted:", formData);
    alert(
      "Naturalization application submitted successfully! You will be contacted for further processing.",
    );
  };

  const sections: FormSection[] = [
    {
      title: "Personal Information",
      fields: [
        {
          name: "fullName",
          label: "Full Name",
          type: "text",
          required: true,
          placeholder: "Enter your full name",
          colSpan: 2,
        },
        {
          name: "currentNationality",
          label: "Current Nationality",
          type: "text",
          required: true,
          placeholder: "Enter current nationality",
        },
        {
          name: "dateOfBirth",
          label: "Date of Birth",
          type: "date",
          required: true,
        },
        {
          name: "placeOfBirth",
          label: "Place of Birth",
          type: "text",
          required: true,
          placeholder: "City, Country",
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          required: true,
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      title: "Parents Information",
      fields: [
        {
          name: "fatherName",
          label: "Father's Name",
          type: "text",
          required: true,
          placeholder: "Enter father's name",
        },
        {
          name: "fatherNationality",
          label: "Father's Nationality",
          type: "text",
          required: true,
          placeholder: "Enter nationality",
        },
        {
          name: "motherName",
          label: "Mother's Name",
          type: "text",
          required: true,
          placeholder: "Enter mother's name",
        },
        {
          name: "motherNationality",
          label: "Mother's Nationality",
          type: "text",
          required: true,
          placeholder: "Enter nationality",
        },
      ],
    },
    {
      title: "Spouse Information (if applicable)",
      fields: [
        {
          name: "spouseName",
          label: "Spouse's Name",
          type: "text",
          placeholder: "Enter spouse's name",
        },
        {
          name: "spouseCID",
          label: "Spouse's CID (if Bhutanese)",
          type: "text",
          placeholder: "00000000000",
          maxLength: 11,
        },
        { name: "marriageDate", label: "Date of Marriage", type: "date" },
      ],
    },
    {
      title: "Residence and Employment",
      fields: [
        {
          name: "currentAddress",
          label: "Current Address in Bhutan",
          type: "textarea",
          required: true,
          placeholder: "Enter complete address",
          colSpan: 2,
        },
        {
          name: "residenceYears",
          label: "Years of Continuous Residence in Bhutan",
          type: "text",
          required: true,
          placeholder: "Enter number of years",
        },
        {
          name: "occupation",
          label: "Current Occupation",
          type: "text",
          required: true,
          placeholder: "Enter your occupation",
        },
        {
          name: "employer",
          label: "Employer Name",
          type: "text",
          placeholder: "Enter employer name",
          colSpan: 2,
        },
      ],
    },
    {
      title: "Contact Information",
      fields: [
        {
          name: "phoneNumber",
          label: "Phone Number",
          type: "tel",
          required: true,
          placeholder: "17123456",
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          required: true,
          placeholder: "your.email@example.com",
        },
      ],
    },
    {
      title: "Additional Information",
      fields: [
        {
          name: "languageProficiency",
          label: "Dzongkha Language Proficiency",
          type: "select",
          required: true,
          options: [
            { value: "fluent", label: "Fluent" },
            { value: "intermediate", label: "Intermediate" },
            { value: "basic", label: "Basic" },
            { value: "none", label: "None" },
          ],
        },
        {
          name: "bhutaneseHistory",
          label: "Knowledge of Bhutanese History and Culture",
          type: "select",
          required: true,
          options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "fair", label: "Fair" },
            { value: "limited", label: "Limited" },
          ],
        },
        {
          name: "criminalRecord",
          label: "Any Criminal Record?",
          type: "select",
          required: true,
          options: [
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ],
        },
        {
          name: "reasonForApplication",
          label: "Reason for Naturalization Application",
          type: "textarea",
          required: true,
          placeholder: "Explain your reason for seeking Bhutanese citizenship",
          colSpan: 2,
        },
      ],
    },
    {
      title: "Required Documents",
      fields: [
        {
          name: "birthCertificate",
          label: "Birth Certificate",
          type: "file",
          required: true,
          accept: ".pdf,.jpg,.jpeg,.png",
          helpText: "Original birth certificate (PDF, JPG, PNG - Max 5MB)",
        },
        {
          name: "passport",
          label: "Passport Copy",
          type: "file",
          required: true,
          accept: ".pdf,.jpg,.jpeg,.png",
          helpText: "Copy of current passport (PDF, JPG, PNG - Max 5MB)",
        },
        {
          name: "residenceProof",
          label: "Proof of Residence",
          type: "file",
          required: true,
          accept: ".pdf,.jpg,.jpeg,.png",
          helpText:
            "Documents proving continuous residence in Bhutan (PDF, JPG, PNG - Max 5MB)",
        },
        {
          name: "photograph",
          label: "Recent Photograph",
          type: "file",
          required: true,
          accept: ".jpg,.jpeg,.png",
          helpText:
            "Passport-sized photo with white background (JPG, PNG - Max 2MB)",
        },
        {
          name: "marriageCertificate",
          label: "Marriage Certificate (if applicable)",
          type: "file",
          accept: ".pdf,.jpg,.jpeg,.png",
          helpText:
            "Marriage certificate if married to Bhutanese citizen (PDF, JPG, PNG - Max 5MB)",
        },
        {
          name: "clearanceCertificate",
          label: "Police Clearance Certificate",
          type: "file",
          required: true,
          accept: ".pdf,.jpg,.jpeg,.png",
          helpText:
            "From country of origin and Bhutan (PDF, JPG, PNG - Max 5MB)",
        },
      ],
    },
  ];

  const informationItems = [
    "<strong>Eligibility:</strong> Must have resided continuously in Bhutan for at least 15 years",
    "<strong>Age Requirement:</strong> Applicant must be at least 21 years old",
    "<strong>Language:</strong> Basic proficiency in Dzongkha required",
    "<strong>Good Character:</strong> No criminal record and good moral character",
    "<strong>Processing Time:</strong> 6-12 months (subject to verification and approval)",
    "<strong>Interview:</strong> In-person interview with immigration officials required",
    "<strong>Oath:</strong> Oath of allegiance to Kingdom of Bhutan required upon approval",
  ];

  return (
    <ServicePageLayout serviceId="naturalization">
      <ServiceForm
        formNumber="BCRS-NR-01"
        title="Naturalization and Regularization Application"
        sections={sections}
        formData={formData}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        informationBox={<InformationBox items={informationItems} />}
        embedded
      />
    </ServicePageLayout>
  );
}
