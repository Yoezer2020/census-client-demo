"use client";

import { Info } from "lucide-react";

interface InformationBoxProps {
  title?: string;
  items: string[];
}

export default function InformationBox({
  title = "Important Information",
  items,
}: InformationBoxProps) {
  return (
    <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-blue-200">
      <div className="flex items-start gap-2 sm:gap-3">
        <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="font-bold text-gray-900 text-base sm:text-lg mb-2 sm:mb-3">
            {title}
          </h2>
          <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 sm:space-y-2 list-disc list-inside">
            {items.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
