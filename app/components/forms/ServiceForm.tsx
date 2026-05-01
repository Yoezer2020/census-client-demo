"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ASSETS } from "@/lib/constants/assets";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "date" | "email" | "tel" | "select" | "textarea" | "file";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  maxLength?: number;
  helpText?: string;
  colSpan?: 1 | 2;
  condition?: (formData: any) => boolean;
}

export interface FormSection {
  title: string;
  fields: FormField[];
  condition?: (formData: any) => boolean;
}

interface ServiceFormProps {
  formNumber: string;
  title: string;
  sections: FormSection[];
  formData: Record<string, any>;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  informationBox?: React.ReactNode;
  additionalContent?: React.ReactNode;
  /** When true, removes the outer page wrapper (background + padding).
   *  Use this when ServicePageLayout is already providing the wrapper. */
  embedded?: boolean;
}

export default function ServiceForm({
  formNumber,
  title,
  sections,
  formData,
  onInputChange,
  onFileChange,
  onSubmit,
  informationBox,
  additionalContent,
  embedded = false,
}: ServiceFormProps) {
  const inner = (
    <div className="max-w-4xl mx-auto">
      {!embedded && (
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-primary transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          Back to Dashboard
        </Link>
      )}

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-4 sm:p-5 md:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <img
              src="/assets/logos/left.png"
              alt="Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
            <div className="text-center flex-1 px-2 sm:px-4">
              <div className="text-xs font-semibold text-gray-600 mb-0.5 sm:mb-1">
                Form No.
              </div>
              <div className="text-sm sm:text-base md:text-lg font-bold text-primary">
                {formNumber}
              </div>
            </div>
            <img
              src={ASSETS.logos.right}
              alt="Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              Ministry of Home Affairs
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-2 sm:mb-3">
              Department of Civil Registration & Census
            </p>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-primary">
              {title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6 lg:p-8">
          {/* Information Box */}
          {informationBox && (
            <div className="mb-6 sm:mb-8">{informationBox}</div>
          )}

          {/* Additional Content (e.g., CID type selection) */}
          {additionalContent && (
            <div className="mb-6 sm:mb-8">{additionalContent}</div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
            {sections.map((section, sectionIndex) => {
              // Check if section should be displayed based on condition
              if (section.condition && !section.condition(formData)) {
                return null;
              }

              return (
                <div key={sectionIndex}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      {sectionIndex + 1}.
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {section.fields.map((field, fieldIndex) => {
                      // Check if field should be displayed based on condition
                      if (field.condition && !field.condition(formData)) {
                        return null;
                      }

                      const colSpanClass =
                        field.colSpan === 2 ? "sm:col-span-2" : "";

                      return (
                        <div key={fieldIndex} className={colSpanClass}>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={onInputChange}
                              required={field.required}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="">
                                {field.placeholder || "Select an option"}
                              </option>
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "textarea" ? (
                            <textarea
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={onInputChange}
                              required={field.required}
                              placeholder={field.placeholder}
                              rows={4}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            />
                          ) : field.type === "file" ? (
                            <>
                              <input
                                type="file"
                                name={field.name}
                                onChange={onFileChange}
                                required={field.required}
                                accept={field.accept}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10"
                              />
                              {field.helpText && (
                                <p className="text-xs text-gray-600 mt-1.5 sm:mt-2">
                                  {field.helpText}
                                </p>
                              )}
                            </>
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={onInputChange}
                              required={field.required}
                              placeholder={field.placeholder}
                              maxLength={field.maxLength}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                                field.maxLength ? "font-mono" : ""
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Submit Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link
                href="/dashboard"
                className="flex-1 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 bg-white text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-50 transition-all text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-white rounded-lg sm:rounded-xl font-semibold hover:bg-primary/90 active:scale-95 sm:hover:scale-105 transition-all shadow-lg shadow-primary/25"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return inner;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-4 sm:py-6 md:py-8">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">{inner}</div>
    </div>
  );
}
