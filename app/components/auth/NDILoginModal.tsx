"use client";

import { useState, useEffect, useRef } from "react";
import { X, Play, Phone, Mail, QrCode as QrIcon, Loader2 } from "lucide-react";
import QRCode from "qrcode";

interface NDILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  deepLinkURL?: string;
  proofRequestURL?: string;
  threadId?: string;
  isLoading?: boolean;
  onRefreshQRCode?: () => void;
  onLoginSuccess?: (data: any) => void;
  onLoginError?: (error: string) => void;
}

export default function NDILoginModal({
  isOpen,
  onClose,
  // serviceName = "Service", // Unused in new design but kept for compat
  deepLinkURL = process.env.NEXT_PUBLIC_NDI_DEFAULT_DEEP_LINK,
  proofRequestURL = process.env.NEXT_PUBLIC_NDI_DEFAULT_PROOF_REQUEST_URL,
  threadId,
  isLoading = false,
  onRefreshQRCode,
  onLoginSuccess,
  onLoginError,
}: NDILoginModalProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState<"qr" | "mfa" | "success">("qr");
  const [isQRExpired, setIsQRExpired] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [verificationStatus, setVerificationStatus] =
    useState<string>("pending");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Waiting for verification...",
  );
  const [generatedQRCode, setGeneratedQRCode] = useState<string>("");
  const [qrGenerating, setQrGenerating] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Create refs for callbacks and state to avoid SSE connection restarts
  const onLoginSuccessRef = useRef(onLoginSuccess);
  const onLoginErrorRef = useRef(onLoginError);
  const onCloseRef = useRef(onClose);
  const statusRef = useRef(verificationStatus);

  // Keep refs in sync
  useEffect(() => {
    onLoginSuccessRef.current = onLoginSuccess;
  }, [onLoginSuccess]);

  useEffect(() => {
    onLoginErrorRef.current = onLoginError;
  }, [onLoginError]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    statusRef.current = verificationStatus;
  }, [verificationStatus]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  // Generate QR code from proof request URL (web URL) - NOT deep link
  // The QR code should contain the web URL that the NDI wallet can process
  // The deep link is ONLY for mobile button clicks
  useEffect(() => {
    if (!isOpen || verificationStatus === "verified") {
      return;
    }

    // Use proofRequestURL (web URL) for QR code generation
    // Only fallback to deepLinkURL if proofRequestURL is not provided (for backward compatibility)
    const urlForQR = proofRequestURL || deepLinkURL;

    if (!urlForQR) {
      console.warn("No URL provided for QR code generation");
      return;
    }

    const generateQR = async () => {
      setQrGenerating(true);
      try {
        console.log("Generating QR code for URL:", urlForQR);
        console.log(
          "URL type:",
          proofRequestURL ? "proofRequestURL (web)" : "deepLinkURL (fallback)",
        );

        const qrDataUrl = await QRCode.toDataURL(urlForQR, {
          width: 400, // Higher resolution for better scanning
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
          errorCorrectionLevel: "M", // Medium correction level for better performance
        });
        setGeneratedQRCode(qrDataUrl);
        console.log("QR code generated successfully");
      } catch (error) {
        console.error("Failed to generate QR code:", error);
        if (onLoginError) {
          onLoginError("Failed to generate QR code");
        }
      } finally {
        setQrGenerating(false);
      }
    };

    generateQR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proofRequestURL, deepLinkURL, isOpen, verificationStatus]);

  // Listen to SSE stream for verification status
  useEffect(() => {
    if (!isOpen || !threadId) {
      return;
    }

    // Prevent multiple connections
    if (eventSourceRef.current) {
      console.log("SSE connection already exists, closing old connection");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    console.log("Connecting to SSE stream for threadId:", threadId);
    setVerificationStatus("pending");
    setStatusMessage("Waiting for verification...");

    let eventSource: EventSource | null = null;

    try {
      eventSource = new EventSource(`/api/auth/ndi/stream/${threadId}`);
      eventSourceRef.current = eventSource;
    } catch (error) {
      console.error("Failed to create SSE connection:", error);
      setVerificationStatus("error");
      setStatusMessage("Failed to establish connection. Please try again.");
      onLoginErrorRef.current?.("Connection failed");
      return;
    }

    eventSource.onmessage = async (event) => {
      try {
        // Skip keepalive messages
        if (event.data.trim() === "" || event.data.startsWith(":")) {
          console.log("SSE keepalive");
          return;
        }

        console.log("Raw SSE data:", event.data);
        const data = JSON.parse(event.data);
        console.log("SSE message parsed:", data);

        if (data.status === "verified" && data.loginData) {
          setVerificationStatus("verified");
          setStatusMessage("Verification successful! Logging in...");

          // Close SSE connection immediately upon success
          if (eventSourceRef.current) {
            console.log("Closing SSE connection after verification success");
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }

          // Call success callback - let parent handle routing
          console.log("Login successful via NDI");

          // Close modal first
          onCloseRef.current();

          // Call success callback after a short delay to ensure modal closes smoothly
          setTimeout(() => {
            onLoginSuccessRef.current?.(data.loginData);
          }, 300);
        } else if (data.status === "failed") {
          setVerificationStatus("failed");
          setStatusMessage(
            data.error || "Verification failed. Please try again.",
          );
          onLoginErrorRef.current?.(data.error || "Verification failed");
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
        } else if (data.status === "rejected") {
          setVerificationStatus("rejected");
          setStatusMessage("Verification was rejected.");
          onLoginErrorRef.current?.("Verification rejected by user");
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
        } else if (data.status === "timeout") {
          setVerificationStatus("timeout");
          setStatusMessage("Verification timed out. Please try again.");
          setIsQRExpired(true);
          onLoginErrorRef.current?.("Verification timeout");
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
        }
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    eventSource.onerror = (error) => {
      const currentStatus = statusRef.current;
      const readyState = eventSource.readyState;

      console.log("SSE connection state change:", {
        readyState,
        currentStatus,
        url: eventSource.url,
      });

      if (readyState === 2 && currentStatus === "pending") {
        console.error("SSE connection failed during pending state");
        setVerificationStatus("error");
        setStatusMessage("Connection error. Please try again.");
        onLoginErrorRef.current?.("Connection error");
      } else if (readyState === 0) {
        console.log("🔄 SSE reconnecting...");
      } else if (currentStatus !== "pending") {
        console.log("SSE connection closed after successful verification");
      }
    };

    return () => {
      if (eventSourceRef.current) {
        console.log("Closing SSE connection");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [isOpen, threadId]);

  // Reset expired state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsQRExpired(false);
    }
  }, [isOpen]);

  // Font styles are assumed to be handled globally or via Tailwind (e.g., font-sans mapped to Inter)
  // Required Color Codes:
  // Background: #F8F8F8
  // Highlight/Green: #5AC994
  // Instruction/Gray: #A1A0A0

  if (!isOpen) return null;

  const handleOpenApp = () => {
    if (!deepLinkURL) {
      console.warn("Deep link URL not available");
      return;
    }

    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);

    const playStoreUrl =
      "https://play.google.com/store/search?q=bhutan%20ndi&c=apps&hl=en_IN&gl=US";
    const appStoreUrl = "https://apps.apple.com/in/app/bhutan-ndi/id1645493166";

    // Try to open the app with the deep link
    window.location.href = deepLinkURL;

    // Fallback to store after a short delay
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        if (isAndroid) {
          window.open(playStoreUrl, "_blank");
        } else if (isIOS) {
          window.open(appStoreUrl, "_blank");
        }
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      <div
        className="relative rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col items-center"
        style={{
          backgroundColor: "#F8F8F8",
          maxWidth: "590px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content Wrapper */}
        <div className="p-8 w-full flex flex-col items-center text-center space-y-[30px]">
          {/* Header */}
          <div>
            <h2 className="text-[18px] font-semibold text-gray-800">
              <span className="md:hidden">Login with </span>
              <span className="hidden md:inline">Scan with </span>
              <span style={{ color: "#5AC994" }}>Bhutan NDI</span> Wallet
            </h2>
          </div>

          {/* Mobile Deeplink Button - Visible ONLY on Mobile */}
          {isMobile && (
            <div className="md:hidden w-full flex flex-col items-center space-y-[30px]">
              <button
                onClick={handleOpenApp}
                disabled={isLoading || !deepLinkURL}
                className="flex items-center justify-center w-[300px] h-[50px] rounded-lg shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#5AC994",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "Open Bhutan NDI Wallet"
                )}
              </button>

              <div className="flex items-center w-full justify-center gap-4">
                <div className="h-[1px] bg-gray-300 w-24"></div>
                <span className="text-gray-400 font-medium">OR</span>
                <div className="h-[1px] bg-gray-300 w-24"></div>
              </div>
            </div>
          )}

          {/* QR Code Section */}
          <div className="relative">
            <div
              className="p-2 bg-white rounded-xl border-2"
              style={{ borderColor: "#5AC994" }}
            >
              <div className="w-[180px] h-[180px] bg-white flex items-center justify-center relative">
                {isLoading || qrGenerating ? (
                  <div className="flex flex-col items-center justify-center">
                    <Loader2
                      className="mb-2 h-8 w-8 animate-spin"
                      style={{ color: "#5AC994" }}
                    />
                    <p className="text-xs font-medium text-gray-600">
                      Generating QR Code...
                    </p>
                  </div>
                ) : isQRExpired ? (
                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-2 text-xs font-medium text-gray-600">
                      QR Code Expired
                    </p>
                    {onRefreshQRCode && (
                      <button
                        onClick={onRefreshQRCode}
                        className="rounded-full px-4 py-1.5 text-xs font-medium text-white transition-all"
                        style={{ backgroundColor: "#5AC994" }}
                      >
                        Refresh
                      </button>
                    )}
                  </div>
                ) : generatedQRCode ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={generatedQRCode}
                      alt="NDI QR Code"
                      className="w-full h-full object-contain"
                    />
                    {/* Center Logo Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white p-1 rounded-full shadow-sm">
                        <img
                          src="/assets/icons/ndi.svg"
                          alt="NDI"
                          className="w-8 h-8"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center text-gray-400">
                    <QrIcon size={48} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verification Status */}
          {verificationStatus !== "pending" && (
            <div
              className={`w-full rounded-lg p-3 text-center text-sm font-medium ${
                verificationStatus === "verified"
                  ? "bg-green-50 text-green-700"
                  : verificationStatus === "failed" ||
                      verificationStatus === "rejected" ||
                      verificationStatus === "timeout" ||
                      verificationStatus === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-blue-50 text-blue-700"
              }`}
            >
              {statusMessage}
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-2">
            <p className="text-[16px]" style={{ color: "#A1A0A0" }}>
              1. Open Bhutan NDI Wallet on your phone
            </p>
            <p className="text-[16px] text-center" style={{ color: "#A1A0A0" }}>
              2. Tap the Scan button
              <span className="inline-flex items-center justify-center bg-[#5AC994] text-white rounded-full w-6 h-6 mx-1 align-middle pb-0.5">
                <QrIcon size={14} />
              </span>
              located on the menu bar and scan the QR code
            </p>
          </div>

          {/* Watch Video Guide Button */}
          <a
            href="https://www.youtube.com/@bhutanndi" // Fallback to main channel as per spec
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border-2 transition-colors hover:bg-green-50"
            style={{
              width: "200px",
              height: "40px",
              borderColor: "#5AC994",
              color: "#5AC994",
              fontWeight: 500,
              fontSize: "16px",
            }}
          >
            Watch video guide
            <Play size={16} fill="#5AC994" />
          </a>

          {/* Download CTA */}
          <div className="space-y-2">
            <p className="text-[16px]" style={{ color: "#A1A0A0" }}>
              Don't have the Bhutan NDI Wallet?{" "}
              <span
                className="font-bold cursor-pointer hover:underline"
                style={{ color: "#5AC994" }}
              >
                Download Now!
              </span>
            </p>
            <div className="flex justify-center gap-4">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/search?q=bhutan%20ndi&c=apps&hl=en_IN&gl=US"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 border border-gray-700 hover:opacity-80 transition-opacity"
              >
                <div className="w-5 h-5 grid place-items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[10px] leading-tight text-gray-300">
                    GET IT ON
                  </div>
                  <div className="text-[14px] font-semibold leading-tight">
                    Google Play
                  </div>
                </div>
              </a>

              {/* App Store */}
              <a
                href="https://apps.apple.com/in/app/bhutan-ndi/id1645493166"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 border border-gray-700 hover:opacity-80 transition-opacity"
              >
                <div className="w-5 h-5 grid place-items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full"
                  >
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.04,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[10px] leading-tight text-gray-300">
                    Download on the
                  </div>
                  <div className="text-[14px] font-semibold leading-tight">
                    App Store
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-2 pb-2">
            <h4
              className="text-[16px] font-medium"
              style={{ color: "#5AC994" }}
            >
              Get Support
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[14px] font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} color="#5AC994" />
                <span>ndifeedback@dhi.bt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} color="#5AC994" />
                <span>1199</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
