import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Award,
} from "lucide-react";

const leadershipSections = [
  {
    title: "Office of Director",
    id: "commissioner",
    leaders: [
      {
        name: "Dasho Pem Tshering",
        designation: "Director General",
        role: "Strategic vision and institutional leadership of DCRC.",
        expertise: [
          "Public Administration",
          "Policy Development",
          "Governance",
        ],
        contact: {
          email: "dg@census.gov.bt",
          phone: "+975-2-322123",
          office: "Directorate Block",
        },
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
      },
      {
        name: "Mr. Jigme Wang",
        designation: "Chief Planning Officer",
        role: "Masterminding institutional development and Five-Year Plans.",
        expertise: ["Planning", "Budgeting", "Project Management"],
        contact: {
          email: "jigme.w@census.gov.bt",
          phone: "+975-2-322124",
          office: "Directorate, Suite 201",
        },
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      },
    ],
    staff: [
      {
        sl: 1,
        name: "Thinley Wangchuk",
        designation: "Director",
        fixedLine: "326839",
        pabx: "301",
      },
      {
        sl: 2,
        name: "Sonam Choden",
        designation: "PA to Director",
        fixedLine: "324563",
        pabx: "305",
      },
      {
        sl: 3,
        name: "Karma Tshering Wangchuk",
        designation: "Sr. Dispatcher",
        fixedLine: "-",
        pabx: "-",
      },
      {
        sl: 4,
        name: "Tshewang Namgyel",
        designation: "Driver",
        fixedLine: "-",
        pabx: "-",
      },
      {
        sl: 5,
        name: "Kinley Dorji",
        designation: "Driver",
        fixedLine: "-",
        pabx: "-",
      },
      {
        sl: 6,
        name: "Tshering Zangmo",
        designation: "GSP",
        fixedLine: "-",
        pabx: "-",
      },
    ],
  },
  {
    title: "Demographic & Information Division (DID)",
    id: "did",
    leaders: [
      {
        name: "Mr. Tashi Namgay",
        designation: "Head, DID",
        role: "Management of population database and ICT systems.",
        expertise: ["Data Management", "ICT Systems", "Statistics"],
        contact: {
          email: "tashi.n@census.gov.bt",
          phone: "+975-2-324567",
          office: "2nd Floor, Block B",
        },
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
      },
    ],
    staff: [
      {
        sl: 1,
        name: "Pema Letho",
        designation: "Chief Civil Reg & Census Officer, Division Head",
        fixedLine: "328771",
        pabx: "205",
      },
      {
        sl: 2,
        name: "Dophu",
        designation: "Dy. Chief ICTO",
        fixedLine: "326893",
        pabx: "206",
      },
      {
        sl: 3,
        name: "Jambay Chozom",
        designation: "Asst. Civil Reg. & Census Officer",
        fixedLine: " ",
        pabx: "214",
      },
      {
        sl: 4,
        name: "Lam Rinzin",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: "322520",
        pabx: "116",
      },
      {
        sl: 5,
        name: "Thinley Choden",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: " ",
        pabx: "111",
      },
      {
        sl: 6,
        name: "Kinley Pelden",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: " ",
        pabx: "112",
      },
      {
        sl: 7,
        name: "Tshering Lham",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: " ",
        pabx: "–",
      },
      {
        sl: 8,
        name: "Sonam Phuntsho",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: " ",
        pabx: "–",
      },
    ],
  },
  {
    title: "Citizen Service Division (CSD)",
    id: "csd",
    leaders: [
      {
        name: "Ms. Dolma Choden",
        designation: "Head, CSD",
        role: "Oversight of citizenship services and record management.",
        expertise: ["Citizen Services", "Public Relations", "Archiving"],
        contact: {
          email: "dolma.c@census.gov.bt",
          phone: "+975-2-324568",
          office: "Ground Floor, Service Wing",
        },
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
      },
    ],
    staff: [
      {
        sl: 1,
        name: "Dorji Rinchen",
        designation:
          "Dy.Chief Civil Reg & Census Officer, (Offtg. Division Head)",
        fixedLine: "327006",
        pabx: "212",
      },
      {
        sl: 2,
        name: "Karma Chhoezang",
        designation: "Dy. Chief Civil Reg. & Census Officer",
        fixedLine: "–",
        pabx: "211",
      },
      {
        sl: 3,
        name: "Kelzang Wangmo",
        designation: "Asst. Civil Reg. & Census Officer",
        fixedLine: "–",
        pabx: "114",
      },
      {
        sl: 4,
        name: "Tshering Wangmo",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: "-",
        pabx: "116",
      },
      {
        sl: 5,
        name: "Rinchen Wangmo",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: "-",
        pabx: "214",
      },
      {
        sl: 6,
        name: "Tshering Chezom",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: "-",
        pabx: "203",
      },
      {
        sl: 7,
        name: "Wangdi Dema",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: "336490",
        pabx: "203",
      },
      {
        sl: 8,
        name: "Karma Choden",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: "–",
        pabx: "107",
      },
      {
        sl: 9,
        name: "Phurba",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: "-",
        pabx: "203",
      },
      {
        sl: 10,
        name: "Karma Lhadon",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: "-",
        pabx: "203",
      },
      {
        sl: 11,
        name: "Karma Lhaden",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: "-",
        pabx: "105",
      },
      {
        sl: 12,
        name: "Tenzin Wangda",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: "336490",
        pabx: "203",
      },
      {
        sl: 13,
        name: "Sonam Choden",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: "–",
        pabx: "203",
      },
      {
        sl: 14,
        name: "Tshewang Lhadon",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: "–",
        pabx: "203",
      },
    ],
  },
  {
    title: "Civil Registration & Investigation Division (CRID)",
    id: "crid",
    leaders: [
      {
        name: "Mr. Sangay Wangdi",
        designation: "Head, CRID",
        role: "Leading census appeal cases and research initiatives.",
        expertise: ["Investigation", "CRVS", "Policy Research"],
        contact: {
          email: "sangay.w@census.gov.bt",
          phone: "+975-2-324569",
          office: "1st Floor, HQ",
        },
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      },
    ],
    staff: [
      {
        sl: 1,
        name: "Tshewang Rinzin",
        designation: "Chief Civil Reg & Census Officer",
        fixedLine: "328633",
        pabx: "202",
      },
      {
        sl: 2,
        name: "Kuenzang Gyeltshen",
        designation: "Dy.Chief Civil Reg & Census Officer",
        fixedLine: "–",
        pabx: "–",
      },
      {
        sl: 3,
        name: "Sonam Choden",
        designation: "Dy. Civil Reg. & Census Officer",
        fixedLine: "328633",
        pabx: "206",
      },
      {
        sl: 4,
        name: "Tenzin Wangmo",
        designation: "Civil Reg. & Census Officer",
        fixedLine: "–",
        pabx: "–",
      },
      {
        sl: 5,
        name: "Sonam Dema",
        designation: "Asst. Civil Reg. & Census Officer",
        fixedLine: "–",
        pabx: "–",
      },
      {
        sl: 6,
        name: "Yeshi Wangmo",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: " ",
        pabx: "112",
      },
      {
        sl: 7,
        name: "Yangkee",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: " 325577",
        pabx: "203",
      },
      {
        sl: 8,
        name: "Choten Wangchuk",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: " 325577",
        pabx: "203",
      },
      {
        sl: 9,
        name: "Dolma Yangzom",
        designation: "Sr. Civil Reg. & Census Asst.",
        fixedLine: " ",
        pabx: "104",
      },
      {
        sl: 10,
        name: "Tenzin Dorji",
        designation: "Civil Reg. & Census Asst./Procurement",
        fixedLine: " ",
        pabx: "303",
      },
      {
        sl: 11,
        name: "Kuenzang Dorji",
        designation: "Civil Reg. & Census Asst.",
        fixedLine: "328182",
        pabx: "109",
      },
    ],
  },
];

export default function Leadership() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1]">
              Who <span className="text-primary italic">Is</span> Who
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-medium px-4">
              A comprehensive directory of the dedicated leadership and
              professional staff powering the Department of Civil Registration &
              Census.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-16 sm:space-y-24 lg:space-y-32">
        {leadershipSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 sm:scroll-mt-32 space-y-6 sm:space-y-10"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <h2 className="text-base sm:text-2xl lg:text-3xl font-black uppercase tracking-normal sm:tracking-widest text-black leading-tight">
                {section.title}
              </h2>
              <div className="h-0.5 sm:h-1 flex-grow bg-primary rounded-full hidden sm:block" />
            </div>

            {/* Unified Staff Table */}
            {section.staff && (
              <div className="relative group/table">
                <div className="overflow-hidden rounded-2xl sm:rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                  <div className="overflow-x-auto scrollbar-hide md:scrollbar-default">
                    <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-0">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 sm:px-6 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary border-b border-gray-100 w-16">
                            Sl #
                          </th>
                          <th className="px-4 sm:px-6 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary border-b border-gray-100 min-w-[150px]">
                            Name
                          </th>
                          <th className="px-4 sm:px-6 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary border-b border-gray-100 min-w-[200px]">
                            Designation
                          </th>
                          <th className="px-4 sm:px-6 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary border-b border-gray-100 text-center w-32">
                            Fixed Line
                          </th>
                          <th className="px-4 sm:px-6 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary border-b border-gray-100 text-center w-32">
                            PABX No.
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {section.staff.map((member) => (
                          <tr
                            key={member.sl}
                            className="group/row hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-bold text-gray-700">
                              {member.sl}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-[13px] sm:text-sm font-black text-gray-900 group-hover/row:text-black transition-colors">
                              {member.name}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-xs font-semibold text-gray-700 leading-snug">
                              {member.designation}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-xs font-mono font-bold text-center text-gray-700">
                              {member.fixedLine}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-xs font-mono font-bold text-center text-gray-700 bg-gray-50/30">
                              {member.pabx}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Scroll Hint */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden opacity-50" />
              </div>
            )}
          </section>
        ))}

        {/* Call to Action */}
        <section className="relative p-10 lg:p-20 bg-gray-900 rounded-[3rem] overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px] transform translate-x-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight uppercase tracking-tighter">
                Explore the Full <br />
                <span className="text-primary italic">Staff Directory</span>
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                Looking for specific personnel? Access our comprehensive
                organizational registry to find officials and regional managers
                across 20 Dzongkhags.
              </p>
            </div>
            <button className="flex-shrink-0 px-10 py-5 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-primary-dark hover:scale-105 transition-all shadow-xl shadow-primary/20">
              Launch Staff Registry
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
