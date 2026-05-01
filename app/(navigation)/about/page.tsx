import { History, Target, Shield, Map, LayoutGrid, Check } from "lucide-react";

export default function About() {
  function CheckIcon() {
    return (
      <div className="flex justify-center">
        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
          <Check className="h-3.5 w-3.5 text-green-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          About the Census Office
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
          The Census Office is the apex body responsible for maintaining the
          national citizen registry and providing vital statistics for informed
          national planning.
        </p>
      </section>

      {/* History Section */}
      <section id="background" className="space-y-8 sm:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Genesis and Mandate
            </h2>
            <div className="space-y-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              <p>
                The genesis of the Department of Civil Registration and Census
                lies in the setting up of the Department of Registration in
                September, 1974. The mandate of this office was to register
                foreigners working and visiting Bhutan and to create a
                comprehensive registry of the population in Bhutan.
              </p>
              <p>
                In the decades that followed, the Department underwent numerous
                changes, both in terms of functions as well as nomenclature. In
                1987 it was renamed as the Department of Immigration and Census
                and in 1990 it was merged under the Home Secretariat and renamed
                the Registration Division.
              </p>
              <p>
                Thereafter, in 2004, in consideration of the importance of the
                mandate of the Registration Division, it was bifurcated into two
                separate Departments, namely the Department of Immigration and
                Department of Civil Registration & Census.
              </p>
              <p>
                Currently, the Department’s core functions are issuing
                Citizenship Identity Cards and conducting census as per the
                provisions contained in the Citizenship Acts and Census Handbook
                of 1993.
              </p>
            </div>
          </div>

          <div className="glass rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 border-white/10 shadow-xl overflow-hidden">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" /> Chronology of
              Evolution
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-2 font-black uppercase tracking-wider text-[10px] text-primary">
                      Sl#
                    </th>
                    <th className="py-4 px-2 font-black uppercase tracking-wider text-[10px] text-primary">
                      Name of Office
                    </th>
                    <th className="py-4 px-2 font-black uppercase tracking-wider text-[10px] text-primary">
                      Year
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      sl: 1,
                      name: "Foreigners Registration Office",
                      year: "September 1974",
                    },
                    {
                      sl: 2,
                      name: "Renamed as Registration Department",
                      year: "1976",
                    },
                    {
                      sl: 3,
                      name: "Renamed as Department of Immigration and Census",
                      year: "1987",
                    },
                    {
                      sl: 4,
                      name: "Merged under Home Secretariat and renamed as Registration Division",
                      year: "1990",
                    },
                    {
                      sl: 5,
                      name: "Upgraded as Department of Registration",
                      year: "2002",
                    },
                    {
                      sl: 6,
                      name: "Bifurcated into: Dept. of Civil Registration & Census and Dept. of Immigration",
                      year: "19th May 2004",
                    },
                  ].map((row) => (
                    <tr
                      key={row.sl}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-2 font-bold text-gray-500">
                        {row.sl}
                      </td>
                      <td className="py-4 px-2 font-medium text-gray-900">
                        {row.name}
                      </td>
                      <td className="py-4 px-2 text-gray-700 font-medium">
                        {row.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section id="vision" className="space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Vision */}
          <div className="p-6 sm:p-12 bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl flex flex-col justify-center relative overflow-hidden group border border-gray-100">
            <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-10 scale-125 sm:scale-150 group-hover:rotate-12 transition-transform duration-700 text-secondary">
              <Target className="h-32 w-32 sm:h-48 sm:w-48" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-xl lg:text-4xl font-black mb-4 sm:mb-8 uppercase tracking-tighter text-black leading-none">
                Vision
              </h3>
              <p className="text-gray-700 mb-4 sm:mb-8 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                "To become an efficient and effective organization to maintain
                demographic records and deliver the highest standard of civil
                registration and census related services."
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="p-6 sm:p-12 glass rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-xl relative group">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-8 uppercase tracking-tighter text-black leading-none">
              Mission
            </h3>
            <p className="text-gray-700 font-bold mb-4 sm:mb-8 text-base sm:text-lg">
              In order to fulfill the above vision, the Department is mandated
              to:
            </p>
            <ul className="space-y-4 sm:space-y-6">
              {[
                "Develop and maintain accurate and complete information on population and demography.",
                "Develop comprehensive Civil Registration and Vital Statistics System.",
                "Enhance the security and authentication features of Citizenship Card, Special Resident Card and other breeder documents.",
                "Ensure professional service delivery through optimal use of Information Communication and Technology.",
                "Provide timely, relevant and reliable demographic statistics to competent authority for evidence based policy and decision making.",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 sm:gap-4 text-gray-700 leading-relaxed group/item"
                >
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary transition-colors mt-0.5 shadow-sm">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/30 group-hover/item:bg-white transition-colors"></div>
                  </div>
                  <span className="text-sm sm:text-base font-medium group-hover/item:text-gray-900 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="p-12 bg-gray-50/50 rounded-[3.5rem] border border-gray-100 shadow-inner">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-[0.2em] text-black mb-4">
              Core Values
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto font-medium text-lg">
              Guided by principles to promote professionalism and client
              satisfactory services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Integrity",
                desc: "Uphold the interest of the Department and public above personal interest while performing duty.",
              },
              {
                name: "Professionalism",
                desc: "Recruit and deploy competent employees to provide professional services at all times.",
              },
              {
                name: "Adaptability",
                desc: "Respond to change with positive attitude and willingness to learn in changing work environments.",
              },
              {
                name: "Team Work",
                desc: "Build and promote cohesive and affirmative inter-personal relationships among the employees.",
              },
              {
                name: "Client Focus",
                name_full: "Client Satisfactory Services",
                desc: "Create enabling environment for efficient delivery, and respond to the needs of the clients.",
              },
              {
                name: "Timeliness",
                desc: "Display punctuality and provide timely services to all citizens.",
              },
            ].map((value) => (
              <div
                key={value.name}
                className="p-10 rounded-[2.5rem] bg-white border border-transparent shadow-sm hover:shadow-xl hover:border-primary/10 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="h-1.5 w-12 bg-primary rounded-full mb-6 group-hover:bg-primary group-hover:w-20 transition-all duration-500"></div>
                <h4 className="text-xl font-black text-gray-900 mb-4 tracking-tight">
                  {value.name_full || value.name}
                </h4>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Functions */}
      <section id="functions" className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Core Functions & Services
          </h2>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            The following services are available from the Department,
            Dzongkhag/Thromde/Drungkhag Civil Registration and Census Offices
            and Community Centers.
          </p>
        </div>

        <div className="glass rounded-[3rem] p-8 border-white/10 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-6 px-4 font-black uppercase tracking-wider text-[10px] text-primary">
                    Sl #
                  </th>
                  <th className="py-6 px-4 font-black uppercase tracking-wider text-[10px] text-primary w-1/3">
                    Services
                  </th>
                  <th className="py-6 px-4 font-black uppercase tracking-wider text-[10px] text-primary text-center">
                    Mode
                  </th>
                  <th className="py-6 px-4 font-black uppercase tracking-wider text-[10px] text-primary text-center">
                    Department
                  </th>
                  <th className="py-6 px-4 font-black uppercase tracking-wider text-[10px] text-primary text-center">
                    Dzongkhag/Thromde
                  </th>
                  <th className="py-6 px-4 font-black uppercase tracking-wider text-[10px] text-primary text-center">
                    Drungkhag [1]
                  </th>
                  <th className="py-6 px-4 font-black uppercase tracking-wider text-[10px] text-primary text-center">
                    Community Center
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    id: 1,
                    svc: "Registration of Birth",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                    drung: true,
                    cc: true,
                  },
                  {
                    id: 2,
                    svc: "Issuance of New Citizenship/Special Resident Card",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                  },
                  {
                    id: 3,
                    svc: "Lost/Replacement Citizenship/Special Resident Card",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                  },
                  {
                    id: 4,
                    svc: "Name Change & Correction of Date of Birth",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                  },
                  {
                    id: 5,
                    svc: "Issuance of Nationality Certificate",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                  },
                  {
                    id: 6,
                    svc: "Issuance of Household Information",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                    drung: true,
                    cc: true,
                  },
                  {
                    id: 7,
                    svc: "Processing of Census Transfer",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                    drung: true,
                    cc: true,
                  },
                  {
                    id: 8,
                    svc: "Updating Individual Information of Citizen/SRC Holder",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                    drung: true,
                  },
                  {
                    id: 9,
                    svc: "Updating Head of Household",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                    drung: true,
                  },
                  {
                    id: 10,
                    svc: "Updating Spouse Information",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                    drung: true,
                  },
                  {
                    id: 11,
                    svc: "Issuance of Individual Information",
                    mode: "Online",
                    dept: true,
                  },
                  {
                    id: 12,
                    svc: "Verify Credential for Security Clearance",
                    mode: "Online",
                    dept: true,
                  },
                  {
                    id: 13,
                    svc: "Updating of Regularization and Naturalization",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                  },
                  {
                    id: 14,
                    svc: "Updating of Adoption Cases",
                    mode: "Online",
                    dept: true,
                  },
                  {
                    id: 15,
                    svc: "Registration of Death",
                    mode: "Online",
                    dept: true,
                    dzo: true,
                    drung: true,
                    cc: true,
                  },
                  {
                    id: 16,
                    svc: "Issuance of Relationship Certificate",
                    mode: "Offline",
                    dept: true,
                  },
                  {
                    id: 17,
                    svc: "Annual Census Program of Dzongkhags and Thromdes",
                    mode: "Offline",
                    dzo: true,
                    drung: true,
                  },
                ].map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-secondary/5 transition-colors group"
                  >
                    <td className="py-4 px-4 font-bold text-gray-400 group-hover:text-primary transition-colors">
                      {s.id}
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {s.svc}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          s.mode === "Online"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {s.mode}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {s.dept && <CheckIcon />}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {s.dzo && <CheckIcon />}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {s.drung && <CheckIcon />}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {s.cc && <CheckIcon />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-primary mr-2">[1]</span>
              Drungkhag Services are available only in Phuentsholing, Umling
              (Gelephu), Trashicholing (Sipsu) and Lhamiozingkha Drungkhags.
            </p>
          </div>
        </div>
      </section>

      {/* Way Forward */}
      <section
        id="future"
        className="bg-primary/1 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 overflow-hidden relative border border-primary/10"
      >
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-8 flex items-center gap-3">
            <div className="h-1.5 sm:h-2 w-10 sm:w-16 bg-primary rounded-full"></div>
            Way Forward
          </h2>
          <div className="space-y-6 sm:space-y-8 text-secondary text-base sm:text-lg leading-relaxed">
            <p className="font-semibold text-gray-900">
              The DCRC in 2003 initiated the computerisation of citizen’s
              records and simultaneously started the development of Bhutan Civil
              Registration System (BCRS) with the automated citizenship identity
              card personalisation and issuance system. The BCRS has all the
              necessary security features in the place to address earlier
              concerns. With this system, the DCRC centrally managed the entire
              civil registration and monitor the issuance of citizenship
              identity cards.
            </p>

            <div className="space-y-3 sm:space-y-4 mt-8 sm:mt-12 bg-white/50 p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/20 shadow-sm">
              {[
                "Initiate appointment system for identified services",
                "Initiate levying of fees for identified DCRC services and revision of fees for CID/Special Resident Card",
                "Online access of Household Information/Family Register to Gewogs",
                "Submit proposal on HR requirement to the Ministry",
                "Review and carry out research to improve existing service delivery",
                "Development of Case Information System",
                "Publish Civil Registration and Census Bi-lingual terminology",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 sm:gap-4 items-start group/item"
                >
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/30 mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                  <span className="text-base sm:text-lg font-medium text-gray-700 group-hover/item:text-primary transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Map className="absolute top-1/2 right-10 -translate-y-1/2 h-64 w-64 lg:h-80 lg:w-80 text-secondary/5 hidden xl:block" />
      </section>

      {/* Detailed Organogram */}
      <section
        id="organogram"
        className="space-y-6 sm:space-y-10 py-6 sm:py-10"
      >
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-2 sm:mb-4">
            Organogram
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-medium italic">
            Department of Civil Registration and Census
          </p>
        </div>

        <div className="w-full overflow-x-auto pb-10">
          <div className="min-w-[900px] flex flex-col items-center space-y-0 scale-[0.9] origin-top lg:scale-100">
            {/* Top Level: Director General */}
            <div className="relative flex flex-col items-center">
              <div className="bg-[#e67e22] text-white px-8 py-4 rounded-lg shadow-xl font-black text-lg border-2 border-orange-600/20 uppercase tracking-widest text-center min-w-[250px]">
                Director/Director General
              </div>

              {/* Vertical line to level 2 */}
              <div className="h-10 w-0.5 bg-gray-400 relative">
                {/* Personal Assistant node off to the right */}
                <div className="absolute top-1/2 left-0 w-16 h-0.5 bg-gray-400"></div>
                <div className="absolute top-1/2 left-16 -translate-y-1/2 bg-[#f1c40f] text-black px-3 py-1.5 rounded-md shadow-md font-bold text-[10px] uppercase tracking-tight whitespace-nowrap border-white/30 border">
                  Personal Assistant & Messenger
                </div>
              </div>

              {/* Connector for Divisions */}
              <div className="w-[66.7%] border-t-2 border-gray-400 flex relative">
                {/* Pool Staff node dashed line */}
                <div className="absolute -top-0.5 left-full w-10 border-t-2 border-dashed border-gray-400"></div>
                <div className="absolute -top-3 left-[calc(100%+40px)] bg-[#f1c40f] text-black px-3 py-1.5 rounded-md shadow-md font-bold text-[10px] uppercase tracking-tight border-white/30 border whitespace-nowrap">
                  Pool Staff
                </div>
              </div>

              {/* Division Level Grid */}
              <div className="grid grid-cols-3 w-full pt-0 gap-4">
                {/* Vertical lines for each division */}
                <div className="flex flex-col items-center">
                  <div className="h-6 w-0.5 bg-gray-400"></div>
                  <div className="bg-[#7fb344] text-white px-4 py-3 rounded-xl shadow-lg font-black text-xs uppercase text-center w-56 border-2 border-green-600/20 leading-tight">
                    Citizen Services Division
                  </div>
                  {/* Vertical line to sections */}
                  <div className="h-6 w-0.5 bg-gray-400"></div>
                  <div className="w-[66.7%] border-t-2 border-gray-400 flex justify-between">
                    <span className="h-4 w-0.5 bg-gray-400 -translate-x-0.5"></span>
                    <span className="h-4 w-0.5 bg-gray-400"></span>
                    <span className="h-4 w-0.5 bg-gray-400 translate-x-0.5"></span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 w-full">
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Citizen Services Section
                    </div>
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Census Investigation Section
                    </div>
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Record Section
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-6 w-0.5 bg-gray-400"></div>
                  <div className="bg-[#7fb344] text-white px-4 py-3 rounded-xl shadow-lg font-black text-xs uppercase text-center w-56 border-2 border-green-600/20 leading-tight">
                    Demography & Information Division
                  </div>
                  {/* Vertical line to sections */}
                  <div className="h-6 w-0.5 bg-gray-400"></div>
                  <div className="w-[66.7%] border-t-2 border-gray-400 flex justify-between">
                    <span className="h-4 w-0.5 bg-gray-400 -translate-x-0.5"></span>
                    <span className="h-4 w-0.5 bg-gray-400"></span>
                    <span className="h-4 w-0.5 bg-gray-400 translate-x-0.5"></span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 w-full">
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Database and BCRS Management Section
                    </div>
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Individual Information Update Section
                    </div>
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Card Printing Section
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-6 w-0.5 bg-gray-400"></div>
                  <div className="bg-[#7fb344] text-white px-4 py-3 rounded-xl shadow-lg font-black text-xs uppercase text-center w-56 border-2 border-green-600/20 leading-tight">
                    Population Census Division
                  </div>
                  {/* Vertical line to sections */}
                  <div className="h-6 w-0.5 bg-gray-400"></div>
                  <div className="w-[66.7%] border-t-2 border-gray-400 flex justify-between">
                    <span className="h-4 w-0.5 bg-gray-400 -translate-x-0.5"></span>
                    <span className="h-4 w-0.5 bg-gray-400"></span>
                    <span className="h-4 w-0.5 bg-gray-400 translate-x-0.5"></span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 w-full">
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Census Coordination Section
                    </div>
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Census Appeal and Investigation Section
                    </div>
                    <div className="bg-[#9ec9ff] p-2 rounded-lg text-[9px] font-black uppercase text-center flex items-center justify-center h-16 shadow-sm border border-blue-200">
                      Research and Development Section
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Office Hierarchy */}
              <div className="w-full flex flex-col items-center mt-6">
                <div className="h-8 w-0.5 bg-gray-400"></div>
                <div className="bg-[#3b5998] text-white px-8 py-3 font-black uppercase tracking-widest text-base w-[60%] text-center shadow-lg border-2 border-blue-900/30">
                  Dzongkhag/Thromde/Drungkhag CRC Office
                </div>
                <div className="h-6 w-0.5 bg-gray-400"></div>
                <div className="bg-[#e67e22] text-white px-8 py-3 font-black uppercase tracking-tight text-sm w-[50%] text-center shadow-md rounded-sm border-2 border-orange-700/20">
                  Dzongdag / Executive Secretary / Drungpa
                </div>
                <div className="h-6 w-0.5 bg-gray-400"></div>
                <div className="w-[66.7%] border-t-2 border-gray-400 flex justify-between">
                  <span className="h-8 w-0.5 bg-gray-400"></span>
                  <span className="h-8 w-0.5 bg-gray-400"></span>
                  <span className="h-8 w-0.5 bg-gray-400"></span>
                </div>
                <div className="grid grid-cols-3 gap-4 w-[90%]">
                  <div className="bg-gray-100 p-4 rounded-lg text-[10px] font-black uppercase text-center border-2 border-red-900/10 shadow-sm text-gray-800 leading-tight">
                    Dzongkhag Civil Registration and Census Office
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg text-[10px] font-black uppercase text-center border-2 border-red-900/10 shadow-sm text-gray-800 leading-tight">
                    Thromde Civil Registration and Census Office
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg text-[10px] font-black uppercase text-center border-2 border-red-900/10 shadow-sm text-gray-800 leading-tight">
                    Drungkhag Civil Registration and Census Office
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
