"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Download,
  FileText,
  Search,
  X,
  Baby,
  UserMinus,
  Globe,
  Users,
  CheckCircle,
} from "lucide-react";
import { availableServices } from "@/app/constants/services";
import { ASSETS } from "@/lib/constants/assets";
import BirthRegistrationForm from "./birth-registration/BirthRegistrationForm";
import NDILoginModal from "../auth/NDILoginModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Image from "next/image";
import { useSessionContext } from "@/app/context/SessionContext";

interface QuickLinksProps {
  isAuthenticated?: boolean;
  onAuthRequired?: (serviceName: string) => void;
}

export default function QuickLinks({
  isAuthenticated = false,
  onAuthRequired,
}: QuickLinksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBirthFormOpen, setIsBirthFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const { session } = useSessionContext();

  // Log session data whenever component mounts or updates
  console.log("QuickLinks - Session:", {
    isAuthenticated,
    userName: session?.user?.fullName,
    userEmail: session?.user?.email,
  });

  const handleLinkClick = (e: React.MouseEvent, service: any) => {
    if (!isAuthenticated && onAuthRequired) {
      e.preventDefault();
      onAuthRequired(service.title);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableServices.map((service) => (
          <Link
            key={service.id}
            href={service.link}
            onClick={(e) => handleLinkClick(e, service)}
            className="group block h-full"
          >
            <Card className="flex flex-col p-0 gap-0 h-full overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-100">
              {/* Image Section */}
              <div
                className="relative w-full shrink-0 overflow-hidden"
                style={{ height: "220px" }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Service Icon - top left circle */}
                <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 gap-2 px-6 pt-5 pb-6">
                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 text-center group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Dorji Divider */}
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <img
                    src={ASSETS.icons.dorji}
                    alt="Dorji"
                    className="h-5 w-auto object-contain opacity-60"
                  />
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>

                {/* Proceed Button */}
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1.5 border border-primary text-primary text-sm font-semibold px-5 py-1.5 rounded-md group-hover:bg-primary/5 transition-all duration-200">
                    Proceed
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200 border border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Select Application Form
              </h3>
              <p className="text-gray-500 mt-2">
                Please choose the specific form you wish to access
              </p>
            </div>

            <div className="grid gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfKEVdbZitpONB_0i704FW9MQLwEzIeO4TcK1xY2yma_BKNIg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-secondary/30 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="p-3 bg-white text-secondary rounded-xl group-hover:scale-110 transition-transform shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-900 group-hover:text-black transition-colors">
                    Household Information
                  </div>
                  <div className="text-sm text-gray-500">
                    Update household details
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href="https://forms.gle/kqoMDoWSHuktMwq58"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-secondary/30 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="p-3 bg-white text-secondary rounded-xl group-hover:scale-110 transition-transform shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-900 group-hover:text-black transition-colors">
                    Update Marital Status
                  </div>
                  <div className="text-sm text-gray-500">
                    Change marital status records
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            <p className="text-xs text-center text-gray-400 mt-6">
              External links to Google Forms
            </p>
          </div>
        </div>
      )}

      {/* Birth Registration Form Modal */}
      <BirthRegistrationForm
        isOpen={isBirthFormOpen}
        onClose={() => setIsBirthFormOpen(false)}
      />

      {/* Birth Registration Form Modal */}
      <BirthRegistrationForm
        isOpen={isBirthFormOpen}
        onClose={() => setIsBirthFormOpen(false)}
      />
    </>
  );
}
