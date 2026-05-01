"use client";

import { useState } from "react";
import { Search, MapPin, Phone, Mail, LayoutGrid, List } from "lucide-react";

const BhutanGateIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="gray"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2v2" />
    <path d="M9 6l3-2 3 2H9z" fill="black" fillOpacity="0.2" />
    <path d="M6 10l6-3 6 3H6z" fill="black" fillOpacity="0.1" />
    <path d="M3 14l9-4 9 4H3z" fill="black" fillOpacity="0.05" />
    <path d="M8 14v8" />
    <path d="M16 14v8" />
    <path d="M4 14v8" strokeOpacity="0.5" />
    <path d="M19 14v8" strokeOpacity="0.5" />
    <path d="M4 17h14" strokeOpacity="0.3" />
    <path d="M8 19h8" />
  </svg>
);

const dzongkhagOffices = [
  {
    sl: 1,
    name: "Sonam Norbu",
    location: "Bumthang",
    phone: "03-631947",
    email: "snorbu@bumthang.gov.bt",
  },
  {
    sl: 2,
    name: "Yedar",
    location: "Chukha",
    phone: "08-478818",
    email: "yedar@chhukha.gov.bt",
  },
  {
    sl: 3,
    name: "Tenzin Choden",
    location: "Dagana",
    phone: "06-481151",
    email: "tchoden@dagana.gov.bt",
  },
  {
    sl: 4,
    name: "Kinzang",
    location: "Gasa",
    phone: "02-688036",
    email: "kinzang@gasa.gov.bt",
  },
  {
    sl: 5,
    name: "Naku Dukpa",
    location: "Haa",
    phone: "08-375306",
    email: "ndrukpa@haa.gov.bt",
  },
  {
    sl: 6,
    name: "Cheki Dorji",
    location: "Lhuentse",
    phone: "04-545219",
    email: "chokidorjeebhutan2014@gmail.com",
  },
  {
    sl: 7,
    name: "Phuntsho Dorji",
    location: "Mongar",
    phone: "04-641610",
    email: "phuntshodorji@mongar.gov.bt",
  },
  {
    sl: 8,
    name: "Dechen Wangdi",
    location: "Paro",
    phone: "08-272210",
    email: "dwangdi@paro.gov.bt",
  },
  {
    sl: 9,
    name: "Karma Jamtsho",
    location: "Pemagatshel",
    phone: "07-471135",
    email: "kjamtsho@pemagatshel.gov.bt",
  },
  {
    sl: 10,
    name: "Sonam Jamtsho",
    location: "Punakha",
    phone: "02-584532",
    email: "sonamj@punakha.gov.bt",
  },
  {
    sl: 11,
    name: "Sonam Dorji",
    location: "Samdrupjongkhar",
    phone: "07-251563",
    email: "sonamdorji@samdrupjongkhar.gov.bt",
  },
  {
    sl: 12,
    name: "Tashi Dema",
    location: "Samtse",
    phone: "05-365620",
    email: "tdema@samtse.gov.bt",
  },
  {
    sl: 13,
    name: "Tenzin Choida",
    location: "Sarpang",
    phone: "06-365102",
    email: "tchoida@sarpang.gov.bt",
  },
  {
    sl: 14,
    name: "Pema Choki",
    location: "Thimphu",
    phone: "02-321934",
    email: "pchoki@thimphu.gov.bt",
  },
  {
    sl: 15,
    name: "Dendup Tshering",
    location: "Trashigang",
    phone: "04-521215",
    email: "dtshering@sjthromde.gov.bt",
  },
  {
    sl: 16,
    name: "Karma Choden",
    location: "Trashiyangtse",
    phone: "04-781121",
    email: "kchoden@trashiyangtse.gov.bt",
  },
  {
    sl: 17,
    name: "Sangay Lhamo",
    location: "Trongsa",
    phone: "03-521251",
    email: "sangaylhamo@trongsa.gov.bt",
  },
  {
    sl: 18,
    name: "Khandu Om",
    location: "Tsirang",
    phone: "06-471778",
    email: "khandom2022@gmail.com",
  },
  {
    sl: 19,
    name: "Dechen Wangdi",
    location: "Wangduephodrang",
    phone: "17560598 / 17699190",
    email: "dechenw@wangduephodrang.gov.bt",
  },
  {
    sl: 20,
    name: "Pema Rinzin",
    location: "Zhemgang",
    phone: "03-741166",
    email: "prinzin@zhemgang.gov.bt",
  },
];

const thromdeOffices = [
  {
    sl: 1,
    name: "Dema",
    office: "Gelephu Thromde",
    phone: "06-250548",
    email: "demalovebobo@gmail.com",
  },
  {
    sl: 2,
    name: "Karma Galey",
    office: "Phuentsholing Thromde",
    phone: "05-252643",
    email: "kgalay@pcc.bt",
  },
  {
    sl: 3,
    name: "Tshering Pelden",
    office: "Samdrup Jongkhar Thromde",
    phone: "07-251305",
    email: "tpelden@sjthromde.gov.bt",
  },
  {
    sl: 4,
    name: "Dechen Pelden",
    office: "Thimphu Thromde",
    phone: "02-332429",
    email: "dpelden@thimphucity.gov.bt",
  },
];

const drungkhagOffices = [
  {
    sl: 1,
    name: "Thinley",
    office: "Tashichholing Dungkhag",
    phone: "17658097",
    email: "thinley@samtse.gov.bt",
  },
  {
    sl: 2,
    name: "Tashi Wangdi",
    office: "Panbang Drungkhag",
    phone: "–",
    email: "twangdi@zhemgang.gov.bt",
  },
  {
    sl: 3,
    name: "Thinley Dorji",
    office: "Nganglam Drungkhag",
    phone: "–",
    email: "thinleydorji@pemagatshel.gov.bt",
  },
];

type Category = "dzongkhag" | "thromde" | "drungkhag";

export default function RegionalOffices() {
  const [activeTab, setActiveTab] = useState<Category>("dzongkhag");
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = (data: any[]) => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.location &&
          item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.office &&
          item.office.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "thromde":
        return filterData(thromdeOffices);
      case "drungkhag":
        return filterData(drungkhagOffices);
      default:
        return filterData(dzongkhagOffices);
    }
  };

  const filteredOffices = getActiveData();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-15 overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-xl sm:text-6xl lg:text-6xl font-black uppercase tracking-tight text-black leading-tight">
              Location <span className="text-primary italic">&</span> Offices
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-medium">
              A detailed contact directory for all Dzongkhag, Thromde, and
              Drungkhag civil registration and census offices across the
              Kingdom.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-12">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 bg-gray-50 p-4 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm">
          {/* Tabs */}
          <div className="flex w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <div className="flex flex-nowrap lg:flex-wrap gap-2 p-1.5 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-inner min-w-max lg:min-w-0">
              {(["dzongkhag", "thromde", "drungkhag"] as Category[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                        : "text-black hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {tab === "dzongkhag"
                      ? "Dzongkhag"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search in ${activeTab}...`}
              className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-gray-100 bg-white focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm font-medium text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "dzongkhag" ? (
          /* Dzongkhag Cards View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredOffices.map((office) => (
              <div
                key={office.sl}
                className="group relative bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Sl Badge */}
                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                  {office.sl}
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                      <BhutanGateIcon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-black transition-colors">
                        {office.location}
                      </h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-700 font-bold">
                        Office Head
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 space-y-4">
                    {/* Focal Person */}
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <List className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {office.name}
                      </span>
                    </div>

                    {/* Phone */}
                    <a
                      href={`tel:${office.phone}`}
                      className="flex items-center gap-3 group/link hover:text-primary transition-colors"
                    >
                      <div className="h-6 w-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover/link:bg-primary/10 group-hover/link:text-primary transition-all">
                        <Phone className="h-3 w-3" />
                      </div>
                      <span className="text-xs font-mono font-bold">
                        {office.phone}
                      </span>
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:${office.email}`}
                      className="flex items-center gap-3 group/link hover:text-primary transition-colors"
                    >
                      <div className="h-6 w-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover/link:bg-primary/10 group-hover/link:text-primary transition-all">
                        <Mail className="h-3 w-3" />
                      </div>
                      <span className="text-[11px] font-bold truncate max-w-[150px]">
                        {office.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Thromde & Drungkhag Table View */
          <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-widest text-secondary border-b border-gray-100">
                      Sl #
                    </th>
                    <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-widest text-secondary border-b border-gray-100">
                      Officer Name
                    </th>
                    <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-widest text-secondary border-b border-gray-100">
                      Office Unit
                    </th>
                    <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-widest text-secondary border-b border-gray-100 text-center">
                      Contact #
                    </th>
                    <th className="px-4 sm:px-8 py-4 sm:py-6 text-[10px] font-black uppercase tracking-widest text-secondary border-b border-gray-100 text-center">
                      Email Address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredOffices.map((office) => (
                    <tr
                      key={office.sl}
                      className="group hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 sm:px-8 py-4 sm:py-6 text-sm font-bold text-secondary">
                        {office.sl}
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <span className="text-sm sm:text-base font-black text-gray-900 group-hover:text-black transition-colors">
                          {office.name}
                        </span>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <div className="flex items-center gap-2">
                          {/* <BhutanGateIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary/40" /> */}
                          <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
                            {office.office}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6 text-xs sm:text-sm font-mono font-bold text-center text-gray-600 whitespace-nowrap">
                        {office.phone}
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6 text-xs sm:text-sm font-bold text-center text-gray-600 bg-gray-50/30 whitespace-nowrap">
                        {office.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredOffices.length === 0 && (
          <div className="py-32 text-center space-y-4 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/5 text-primary">
              <Search className="h-10 w-10" />
            </div>
            <p className="text-xl font-black text-gray-900 uppercase tracking-widest">
              No results found
            </p>
            <p className="text-secondary font-medium">
              Try adjusting your search or switching categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
