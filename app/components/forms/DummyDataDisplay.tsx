"use client";

import { Info } from "lucide-react";

interface DummyDataDisplayProps {
  stepTitle: string;
  sampleData: Record<string, string>;
  note?: string;
  colorScheme?: "blue" | "green" | "purple" | "amber";
}

export default function DummyDataDisplay({
  stepTitle,
  sampleData,
  note,
  colorScheme = "blue",
}: DummyDataDisplayProps) {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900",
      iconBg: "bg-green-100",
      iconText: "text-green-600",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-900",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-900",
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
    },
  };

  const scheme = colors[colorScheme];

  return (
    <div
      className={`${scheme.bg} rounded-lg border ${scheme.border} p-4 sm:p-6 mb-6`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className={`${scheme.iconBg} rounded-full p-2 flex-shrink-0`}>
          <Info className={`w-5 h-5 ${scheme.iconText}`} />
        </div>
        <div>
          <h3 className={`font-semibold ${scheme.text} text-sm sm:text-base`}>
            📋 Sample Data to Use
          </h3>
          <p className={`text-xs sm:text-sm ${scheme.text} opacity-80 mt-1`}>
            {stepTitle}
          </p>
          {note && (
            <p className={`text-xs ${scheme.text} opacity-70 mt-2 italic`}>
              {note}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(sampleData).map(([key, value]) => (
            <div key={key} className="text-sm">
              <span className="font-medium text-gray-700">
                {key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                :
              </span>
              <span className="ml-2 text-gray-900 font-mono text-xs">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
