"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  User,
  Bot,
  RefreshCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ASSETS } from "@/lib/constants/assets";
import { useSessionContext } from "@/app/context/SessionContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SERVICES = [
  "Birth Registration",
  "New CID/SR card",
  "Move-In Move-Out (Census Transfer)",
  "Name Change & Age Correction",
  "Death Registration",
  "Household Information",
  "Replacement of CID/SR card",
  "Update of Information",
  "Nationality Certificate",
  "Update Spouse Details",
  "Change of HoH",
  "Update of Present Address",
  "Relationship Certificate",
  "CID/SR Card Replacement",
  "CID/SR Card Renewal",
  "CID/SR Card Lost",
];

const LOCATIONS = [
  "DCRC Head Office",
  "Dzongkhag CRC Office",
  "Thromde CRC Office",
  "Community Service Center",
];

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  type?: "text" | "options" | "rating" | "yesno" | "textarea";
  options?: string[];
};

export default function ContactSection() {
  const { session } = useSessionContext();
  const [submitted, setSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Log session data
  console.log("ContactSection - Session:", {
    userName: session?.user?.fullName,
    userEmail: session?.user?.email,
  });

  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    category: "",
    location: "",
    staffFriendliness: "",
    serviceHappiness: "",
    onlineAwareness: "",
    onlineAvailed: "",
    message: "",
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 50); // Small delay to ensure DOM is updated
  }, [messages, isTyping]);

  // Conversation Logic
  const steps = [
    {
      question:
        "Kuzuzangpo La! Welcome to DCRC Feedback Bot. To start, could you please provide your Phone Number?",
      field: "phoneNumber",
      type: "tel",
      placeholder: "e.g. 17XXXXXX",
    },
    {
      question: "Thank you! What is your Email Address?",
      field: "email",
      type: "email",
      placeholder: "email@example.com",
    },
    {
      question: "Which service did you avail from us?",
      field: "category",
      type: "options",
      options: SERVICES,
    },
    {
      question: "Where did you avail this service?",
      field: "location",
      type: "options",
      options: LOCATIONS,
    },
    {
      question:
        "On a scale of 1 to 5, how approachable and friendly was our staff?",
      field: "staffFriendliness",
      type: "rating",
    },
    {
      question:
        "And how happy are you overall with the services provided by DCRC?",
      field: "serviceHappiness",
      type: "rating",
    },
    {
      question:
        "Are you aware of our online appointment system for CID/SR cards and Relationship Certificates?",
      field: "onlineAwareness",
      type: "yesno",
    },
    {
      question: "Did you avail any of our services online?",
      field: "onlineAvailed",
      type: "yesno",
    },
    {
      question:
        "Finally, please provide your valuable/candid feedback on the service delivered.",
      field: "message",
      type: "textarea",
      placeholder: "Type your feedback here...",
    },
  ];

  // Initialize first message
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(steps[0].question);
    }
  }, []);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Math.random().toString(), sender: "bot", text },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleUserInput = (value: string) => {
    const currentStepData = steps[currentStep];

    // Validation Logic
    if (currentStepData.field === "phoneNumber") {
      const phoneRegex = /^[17|77|16]\d{7}$/;
      if (!phoneRegex.test(value.trim())) {
        addBotMessage(
          "Please enter a valid 8-digit phone number (e.g. 17XXXXXX or 77XXXXXX).",
        );
        return;
      }
    }

    if (currentStepData.field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        addBotMessage(
          "That doesn't look like a valid email address. Could you please double check?",
        );
        return;
      }
    }

    // Add user message to UI
    setMessages((prev) => [
      ...prev,
      { id: Math.random().toString(), sender: "user", text: value },
    ]);

    // Update data state
    const field = currentStepData.field as keyof typeof formData;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Move to next step or submit
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      addBotMessage(steps[nextStep].question);
      setInputValue("");
    } else {
      // Final submission
      setIsTyping(true);
      setTimeout(() => {
        setSubmitted(true);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStep(0);
    setSubmitted(false);
    setFormData({
      phoneNumber: "",
      email: "",
      category: "",
      location: "",
      staffFriendliness: "",
      serviceHappiness: "",
      onlineAwareness: "",
      onlineAvailed: "",
      message: "",
    });
    setInputValue("");
    setTimeout(() => addBotMessage(steps[0].question), 500);
  };

  return (
    <section id="contact" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact info - taking 4 cols */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-secondary/5 rounded-3xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-black ">
              Office Details
            </h2>
            <div className="space-y-3">
              {[
                {
                  icon: MapPin,
                  title: "Headquarters",
                  text: "Department of Civil Registration & Census\nMinistry of Home and Cultural Affairs",
                },
                {
                  icon: Phone,
                  title: "Contact",
                  text: "(+975) 2-330846 (Information Desk)",
                },
                {
                  icon: Mail,
                  title: "Official Email",
                  text: "info@census.gov.bt",
                },
                {
                  icon: Clock,
                  title: "Office Hours",
                  text: "Mon - Fri: 9:00 AM - 5:00 PM",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <p className="text-sm text-black whitespace-pre-line leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden relative group hidden lg:block shadow-lg border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=Department+of+Civil+Registration+and+Census,+Kawajangsa,+Chophel+Lam,+Thimphu&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Chat Interface - taking 8 cols */}
        <div id="feedback" className="lg:col-span-8">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col h-[677px] overflow-hidden">
            {/* Chat Header */}
            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img
                    src={ASSETS.images.chatBot}
                    alt="Bot Avatar"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">
                    DCRC Feedback Bot
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
                      Active Now
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="p-2 text-secondary hover:text-primary transition-colors bg-white rounded-xl shadow-sm"
                title="Restart Chat"
              >
                <RefreshCcw className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-hide scroll-smooth"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "flex items-end gap-3",
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row",
                    )}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 overflow-hidden flex-shrink-0 mb-1 flex items-center justify-center",
                        msg.sender === "bot"
                          ? ""
                          : "bg-gray-200 shadow-sm border border-gray-100 rounded-full",
                      )}
                    >
                      {msg.sender === "bot" ? (
                        <img
                          src={ASSETS.images.chatBot}
                          alt="Bot"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-600">
                          <User size={18} />
                        </div>
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[85%] px-5 py-3.5 rounded-[1.5rem] text-sm font-medium shadow-sm leading-relaxed",
                        msg.sender === "bot"
                          ? "bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100"
                          : "bg-primary text-white rounded-br-none",
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-10 w-10 overflow-hidden flex-shrink-0 mb-1 flex items-center justify-center">
                    <img
                      src={ASSETS.images.chatBot}
                      alt="Typing..."
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-secondary/40 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-secondary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-secondary/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </motion.div>
              )}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-4"
                >
                  <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-2">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                    Success!
                  </h3>
                  <p className="text-secondary text-sm max-w-xs mx-auto font-medium">
                    Your feedback has been successfully submitted. We appreciate
                    your time!
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                  >
                    Submit another response
                  </button>
                </motion.div>
              )}
              <div className="h-4" /> {/* Padding at bottom */}
            </div>

            {/* Chat Input */}
            {!submitted && !isTyping && (
              <div className="p-6 sm:p-8 bg-gray-50/50 border-t border-gray-100">
                <AnimatePresence mode="wait">
                  {/* Dynamic Inputs based on step type */}
                  {steps[currentStep].type === "options" ? (
                    <motion.div
                      key="options"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap gap-2"
                    >
                      {steps[currentStep].options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleUserInput(opt)}
                          className="px-4 py-2.5 bg-white text-xs font-bold rounded-xl border-2 border-transparent hover:border-primary hover:text-primary transition-all shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  ) : steps[currentStep].type === "rating" ? (
                    <motion.div
                      key="rating"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            onClick={() => handleUserInput(num.toString())}
                            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl font-black text-secondary hover:bg-primary hover:text-white transition-all shadow-sm"
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between px-2 text-[9px] font-black uppercase tracking-[0.15em] text-secondary/60">
                        <span>Strongly Disagree</span>
                        <span>Strongly Agree</span>
                      </div>
                    </motion.div>
                  ) : steps[currentStep].type === "yesno" ? (
                    <motion.div
                      key="yesno"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4"
                    >
                      {["Yes", "No"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleUserInput(opt)}
                          className="flex-1 py-4 bg-white text-sm font-black rounded-2xl border-2 border-transparent hover:border-primary hover:text-primary transition-all shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  ) : steps[currentStep].type === "textarea" ? (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <textarea
                        rows={2}
                        className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-gray-100 focus:border-primary outline-none transition-all text-sm font-medium resize-none shadow-sm"
                        placeholder={steps[currentStep].placeholder}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (inputValue.trim()) handleUserInput(inputValue);
                          }
                        }}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <button
                        disabled={!inputValue.trim()}
                        onClick={() => handleUserInput(inputValue)}
                        className="w-full py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20"
                      >
                        <Send size={18} /> SEND FEEDBACK
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <input
                        type={steps[currentStep].type}
                        className="w-full px-6 py-5 pr-16 rounded-2xl bg-white border-2 border-gray-100 focus:border-primary outline-none transition-all text-sm font-black tracking-tight shadow-sm"
                        placeholder={steps[currentStep].placeholder}
                        value={inputValue}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && inputValue.trim())
                            handleUserInput(inputValue);
                        }}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <button
                        disabled={!inputValue.trim()}
                        onClick={() => handleUserInput(inputValue)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50 transition-all"
                      >
                        <Send size={20} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="mt-4 text-[9px] text-center text-gray-700 font-bold uppercase tracking-[0.2em]">
                  Real-time Secure Feedback Processing
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
