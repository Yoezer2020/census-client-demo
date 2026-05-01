import {
  FileCheck,
  Download,
  Clock,
  CheckCircle,
  Info,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function ApplicationGuide() {
  const steps = [
    {
      title: "Review Eligibility",
      desc: "Check if you meet the specific criteria for the service (e.g., age, residency status).",
    },
    {
      title: "Prepare Documents",
      desc: "Scan and prepare all required supporting documents as listed in the criteria section.",
    },
    {
      title: "Submit Online",
      desc: "Fill out the digital application form on our secure portal and upload documents.",
    },
    {
      title: "Acknowledgement",
      desc: "Receive a unique Application ID for tracking your status in real-time.",
    },
    {
      title: "Verification",
      desc: "Our staff will verify your submission. You may be contacted for additional info.",
    },
    {
      title: "Completion",
      desc: "Collect your document or receive notification of successful registration.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-gray-900">
          Application Guide
        </h1>
        <p className="mt-6 text-xl text-secondary font-medium">
          Follow our interactive guide to ensure a smooth application process
          for all census services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Step-by-Step Flow */}
        <div className="lg:col-span-2 space-y-16 text-gray-900">
          <section id="workflow">
            <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-4 mb-10 text-gray-900">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              The Application Workflow
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="group relative p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <span className="absolute -top-4 -left-4 h-12 w-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </span>
                  <h3 className="text-xl font-black mb-3 pt-2">{step.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-900 rounded-[3.5rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex-1 space-y-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Need Expert <br /> Personal Assistance?
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-medium">
                Our dedicated helpdesk is ready to assist you with complex
                applications or technical difficulties.
              </p>
              <Link
                href="/contact"
                className="inline-block px-12 py-5 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl text-sm"
              >
                Connect with Support
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/30 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                alt="Guide"
                className="w-64 h-64 object-cover rounded-[3rem] border-4 border-white/20 relative z-10"
              />
            </div>
          </section>
        </div>

        {/* Sidebar: Documents & Eligibility */}
        <div className="space-y-8">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <FileCheck className="h-5 w-5 text-green-500" /> Eligibility
              Criteria
            </h3>
            <ul className="space-y-4">
              {[
                "Must be a citizen or legal resident.",
                "Valid existing documents (if available).",
                "Minimum age of 18 for solo applications.",
                "Guardian details for minors.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-secondary"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900">
              <Download className="h-5 w-5 text-secondary" /> Downloadable Forms
            </h3>
            <div className="space-y-3">
              {[
                { name: "New Census Form (A1)", size: "1.2 MB" },
                { name: "ID Card Renewal Form", size: "850 KB" },
                { name: "Transfer Request Form", size: "450 KB" },
                { name: "Marriage Certificate Reg", size: "980 KB" },
              ].map((form) => (
                <button
                  key={form.name}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="text-left">
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">
                      {form.name}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                      {form.size}
                    </p>
                  </div>
                  <Download className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-secondary/5 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 text-secondary font-bold mb-2">
              <Info className="h-4 w-4" /> Important Notice
            </div>
            <p className="text-xs text-secondary/70 leading-relaxed">
              Standard processing time for most applications is 5-7 working
              days. Urgent requests may incur additional fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
