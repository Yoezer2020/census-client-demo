"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ExternalLink, X } from "lucide-react";

import { availableServices } from "@/app/constants/services";
import Link from "next/link";
import { ASSETS } from "@/lib/constants/assets";
import { useSessionContext } from "@/app/context/SessionContext";

interface WebLinksButtonProps {
  isAuthenticated?: boolean;
  onAuthRequired?: (serviceName: string) => void;
}

export default function WebLinksButton({
  isAuthenticated = false,
  onAuthRequired,
}: WebLinksButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { session } = useSessionContext();

  // Log session data whenever component mounts or updates
  console.log("WebLinksButton - Session:", {
    isAuthenticated,
    userName: session?.user?.name,
    userEmail: session?.user?.email,
  });

  const handleLinkClick = (e: React.MouseEvent, service: any) => {
    if (!isAuthenticated && onAuthRequired) {
      e.preventDefault();
      setIsModalOpen(false);
      onAuthRequired(service.title);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 sm:px-8 sm:py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group text-sm sm:text-base"
      >
        Avail Services{" "}
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 border border-gray-100">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                {/* <div className="w-16 h-16 bg-primary text-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8" />
                </div> */}
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img
                    src={ASSETS.icons.left}
                    alt=""
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Civil Registration Services
                  </h3>
                  <img
                    src={ASSETS.icons.right}
                    alt=""
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                </div>
                <p className="text-gray-500 mt-2">
                  Access digital registration services and official forms
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Internal Services */}
                {availableServices.map((service) => (
                  <Link
                    key={service.id}
                    href={service.link}
                    onClick={(e) => handleLinkClick(e, service)}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-primary/30 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base text-gray-900 group-hover:text-primary transition-colors">
                        {service.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {service.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
                  </Link>
                ))}
              </div>

              <p className="text-xs text-center text-gray-400 mt-6">
                All services are verified and secure
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
