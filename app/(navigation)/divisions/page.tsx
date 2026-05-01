import {
  Briefcase,
  Users,
  Phone,
  Mail,
  Building,
  LayoutGrid,
  CheckCircle2,
  Server,
  UserCog,
  Printer,
  FileText,
  Search,
  ShieldCheck,
  FolderOpen,
} from "lucide-react";

const divisions = [
  {
    id: "did",
    name: "Demography & Information Division (DID)",
    short: "DID",
    head: "Mr. Tashi Namgay",
    email: "tashi.n@census.gov.bt",
    phone: "+975-2-324567",
    mandates: [
      "Manage population database & generate population data/statistics.",
      "Maintain daily backup of database and ensure safekeeping of the backups.",
      "Update individual information in the BCRS.",
      "Print CID/SR cards.",
      "Maintain stock of printing equipment and cards materials.",
      "Manage the functioning of BCRS at Department/Dzongkhag/Thromde/Drungkhag.",
      "Provide training on BCRS and other Systems.",
      "Provide technical and hardware support.",
      "Enhance system and ensure security aspects of the BCRS and other system.",
      "Keep abreast of the emerging information and communication technologies.",
      "Assist the Department to formulate and implement plans and programs.",
    ],
    sections: [
      {
        id: "2.3.1",
        title: "Database and BCRS Management Section",
        icon: <Server className="h-5 w-5" />,
        points: [
          "Manage population Database.",
          "Generate population data/statistics.",
          "Furnish population figures, rates, and ratios, etc.",
          "Maintain daily backup of database and ensure to store in three different locations.",
          "Coordinate the distribution of ICTT equipment to Dzongkhag/Thromde/Drungkhag CRC office.",
          "Monitor the security aspects of the BCRS and other database.",
          "Supervise the overall management of BCRS at Department/Dzongkhag/Thromde/Drungkhag.",
          "Conduct training on the management of the BCRS and other Systems.",
          "Provide both technical and hardware support.",
          "Continuously explore system enhancement and security aspects of the existing database.",
          "Assist the Division in all matters.",
        ],
      },
      {
        id: "2.3.2",
        title: "Individual Information Up-dation Section",
        icon: <UserCog className="h-5 w-5" />,
        points: [
          "Verify, process, and update/correction of individual information in the BCRS.",
          "Ensure all vital registrations are timely updated in the BCRS.",
          "Issuance of Individual Information to RBP.",
          "Maintain report on the Individual Information up-dation.",
          "Assist the Division in all matters.",
        ],
      },
      {
        id: "2.3.3",
        title: "Card Printing Section",
        icon: <Printer className="h-5 w-5" />,
        points: [
          "Print CID and SR Cards.",
          "Maintain proper log for CID/SR printers.",
          "Maintain records of the CID/SR card materials.",
          "Maintain stock of all the printing materials and equipment.",
          "Maintain list of printed CID/SR Cards.",
          "Submit annual CID/SR card materials requirement.",
          "Ensure maintenance of printers.",
          "Assist the Division in all matters.",
        ],
      },
    ],
  },
  {
    id: "csd",
    name: "Citizen Service Division (CSD)",
    short: "CSD",
    head: "Ms. Dolma Choden",
    email: "dolma.c@census.gov.bt",
    phone: "+975-2-324568",
    mandates: [
      "Process and issue Citizenship Card and Special Resident Card.",
      "Issue Certificates and Household Information.",
      "Carry out investigations on fraud and resettlement transfer cases.",
      "Maintain and safeguard civil registration and census records.",
      "Assist the Department to formulate and implement plans and programs.",
      "Maintain revenue reports of Department and Dzongkhag/Thromde CRC office.",
    ],
    sections: [
      {
        id: "2.2.1",
        title: "Citizenship Services Section",
        icon: <Users className="h-5 w-5" />,
        description:
          "This section under CSD will be responsible for providing the following services to the public:",
        subunits: [
          {
            title: "Card Processing Unit",
            points: [
              "Verify and process CID/SR Cards.",
              "Process name change and correction of date of birth for those processing CID/SR Card.",
              "Ensure application forms for CID/SR Card are compiled and handed over to the Record Section for archiving.",
              "Submit report on CID/SR Card.",
              "Assist the Division in all matters.",
            ],
          },
          {
            title: "Security Clearance Certificate Unit",
            points: [
              "Verify credentials of all Citizens and SR Card holders for SCC.",
              "Coordinate security clearance issues with the Department of Law and Order and the Royal Bhutan Police (RBP).",
              "Submit report on Security Clearance Certificate.",
              "Assist the Division in all matters.",
            ],
          },
          {
            title: "Services Unit",
            points: [
              "Issuance of CID/SR Card.",
              "Issuance of Nationality Certificate.",
              "Issuance of Household Information.",
              "Process Census Transfer for resettlement cases.",
              "Issuance of Relationship Certificate.",
              "Issuance of One- and Same-Person Certificate.",
              "Verify and process application forms relating to the issuance of nationality and other travel documents.",
              "Ensure service application forms are compiled and handed over to the Record Section for archiving.",
              "Submit report on services delivered.",
              "Assist the Division in all matters.",
            ],
          },
        ],
      },
      {
        id: "2.2.2",
        title: "Record Section",
        icon: <FolderOpen className="h-5 w-5" />,
        points: [
          "Develop catalogue and archive records for each service.",
          "Furnish Citizenship/SR records and information.",
          "Digitalize documents for modern accessibility.",
          "Safeguard records and keep proper track of the movement of the family registers and other documents from the record room.",
          "Ensure unauthorized person does not have access to the record room.",
          "Assist the Division in all matters.",
        ],
      },
      {
        id: "2.2.3",
        title: "Census Investigation Section",
        icon: <Search className="h-5 w-5" />,
        points: [
          "Carry out investigation on fraud and deceptive cases.",
          "Investigate resettlement Census Transfer cases.",
          "Submit detailed investigative reports.",
          "Maintain and safeguard investigative records.",
          "Assist the Division in all matters.",
        ],
      },
    ],
  },
  {
    id: "crid",
    name: "Civil Registration & Investigation Division (CRID)",
    short: "CRID",
    head: "Mr. Sangay Wangdi",
    email: "sangay.w@census.gov.bt",
    phone: "+975-2-324569",
    mandates: [
      "Verify and process census appeal cases, adoption and dual citizenship cases.",
      "Maintain record of Citizenship Kasho.",
      "Coordinate the conduct of Annual Census.",
      "Issue Route Permit.",
      "Conduct demography and population related studies.",
      "Manage and work towards improvement of the CRVS system of the country.",
      "Finalize report on census appeal and other census matters.",
      "Coordinate the conduct of capacity building.",
      "Assist the Department to formulate and implement plans and programs.",
    ],
    sections: [
      {
        id: "2.4.1",
        title: "Census Coordination Section",
        icon: <Users className="h-5 w-5" />,
        subunits: [
          {
            title: "General Coordination",
            points: [
              "Review Annual Census Guidelines for Dzongkhag/Thromde/Drungkhag CRC Office.",
              "Collect and compile Annual Census Reports.",
              "Generate report/statistics of the Annual Census.",
              "Coordinate field visits during Annual Census Programme.",
              "Coordinate and prepare the Department’s annual budget in line with APA.",
              "Formulate plans and programmes, including APA and Five Year Plan.",
              "Submit progress reports (quarterly, half-yearly, annual) to the Ministry.",
              "Formulate and implement disaster management plans.",
              "Maintain accounts on finance and Creche centre activities (interim).",
              "Execute follow-ups on verifications, confirmations, and investigations.",
            ],
          },
          {
            title: "Regularization Unit",
            points: [
              "Verify, compile and prepare profile on Dropout cases.",
              "Verify, compile and prepare profile on Single Parent cases.",
              "Verify, compile and prepare profile on Adoption cases.",
              "Coordinate to update naturalized and regularized citizens in the BCRS.",
              "Maintain and generate reports on all cases.",
              "Issue Route Permit.",
              "Ensure systematic archiving of case documents after regularization.",
              "Assist the Division in all matters.",
            ],
          },
          {
            title: "Kasho Unit",
            points: [
              "Maintain an up-to-date record of all Citizenship Kashos.",
              "Archive and digitize all Citizenship Kashos and approved Ministry documents.",
              "Verify and update Citizenship Kashos in CIS.",
              "Maintain and generate reports on all Citizenship Kashos.",
              "Assist the division in all matters.",
            ],
          },
        ],
      },
      {
        id: "2.4.2",
        title: "Census Appeal and Investigation Section",
        icon: <Search className="h-5 w-5" />,
        subunits: [
          {
            title: "General Section Duties",
            points: [
              "Develop comprehensive census case guidelines for Dzongkhag/Thromde/Drungkhag CRCO.",
              "Maintain records of approved, not recommended, or pending cases.",
              "Identify cases to be handed over to the Department of Immigration (DoI).",
              "Assist the Division in all matters.",
            ],
          },
          {
            title: "Census Appeal Unit",
            points: [
              "Verify, compile and prepare profile on appeal cases.",
              "Update appeal cases in CIS.",
              "Ensure systematic archiving after approval or closure.",
              "Manage case file security against unauthorized access.",
              "Issue Route Permit.",
              "Assist the division in all matters.",
            ],
          },
          {
            title: "Investigation Unit",
            points: [
              "Carry out investigation on Dual Citizenship cases.",
              "Investigate fraud and deceptive cases pertaining to census appeal.",
              "Carry out investigation on marriage cases (Post 1985).",
              "Compile and prepare profiles for all investigated categories.",
              "Follow up on dual citizenship cases with DoI.",
              "Assist the Division in all matters.",
            ],
          },
        ],
      },
      {
        id: "2.4.3",
        title: "Research and Development Section",
        icon: <Search className="h-5 w-5" />,
        points: [
          "Conduct demography and population related studies.",
          "Manage and work towards the improvement of CRVS system of the country.",
          "Analyse and interpret demographic data.",
          "Conduct case studies as per requirements.",
          "Prepare research training materials and tools.",
          "Conduct orientation for new employees.",
          "Submit policy implementation recommendations based on research findings.",
          "Review civil registration and census policies, regulations and protocols.",
          "Explore institutional linkages and professional networks.",
          "Coordinate the conduct of capacity building.",
          "Publication of research papers.",
          "Facilitate review of forms and propose timely intervention.",
          "Maintain all research documents and files.",
          "Assist the Division in all matters.",
        ],
      },
    ],
  },
];

export default function Divisions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 space-y-16 lg:space-y-32">
      {/* Header */}
      <section className="text-center max-w-4xl mx-auto space-y-4 lg:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] lg:text-xs font-black uppercase tracking-widest">
          DCRC Structure
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
          Our Divisions
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-medium px-4">
          Specialized units working in synergy for efficient, secure, and
          effective civil registration and census service delivery to the
          citizens of Bhutan.
        </p>
      </section>

      {/* Division Navigation Cards - Quick Index */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {divisions.map((div) => (
          <a
            key={div.id}
            href={`#${div.id}`}
            className="group relative p-6 lg:p-8 bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-primary/5 rounded-full -mr-12 -mt-12 lg:-mr-16 lg:-mt-16 transition-transform group-hover:scale-150 duration-700" /> */}
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-black text-black mb-1 lg:mb-2 group-hover:text-primary transition-colors">
                {div.short}
              </h3>
              <p className="text-[10px] lg:text-xs font-black text-gray-500 uppercase tracking-widest leading-relaxed mb-3 lg:mb-4">
                {div.name.split("(")[0]}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] lg:text-xs group-hover:gap-4 transition-all uppercase tracking-widest">
                View Details <Briefcase className="h-3 w-3" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Detailed Divisions List */}
      <div className="space-y-24 lg:space-y-40">
        {divisions.map((div) => (
          <section
            key={div.id}
            id={div.id}
            className="scroll-mt-24 lg:scroll-mt-32 space-y-10 lg:space-y-16"
          >
            {/* Division Banner Section */}
            <div className="relative group">
              <div className="absolute -inset-x-4 lg:-inset-x-6 -inset-y-3 lg:-inset-y-4 bg-gray-50/50 rounded-[2rem] lg:rounded-[3rem] transition-all duration-500 opacity-0 lg:group-hover:opacity-100" />
              <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
                <div className="space-y-3 lg:space-y-4 max-w-3xl">
                  <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                    <div className="h-1 w-8 lg:h-1.5 lg:w-12 bg-primary rounded-full" />
                    <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] lg:tracking-[0.3em]">
                      {div.short} Division Profile
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 uppercase tracking-tighter leading-[1.1] lg:leading-[0.9]">
                    {div.name}
                  </h2>
                </div>

                {/* Division Head Quick Card */}
                <div className="flex items-center gap-4 lg:gap-6 p-4 lg:p-4 lg:pr-8 bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 shadow-xl self-start group/card relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                  <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-xl lg:rounded-2xl bg-primary flex items-center justify-center text-white font-black text-lg lg:text-xl shadow-lg relative z-10 transform lg:rotate-3">
                    {div.head
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-sm lg:text-base font-black text-gray-900 leading-tight mb-0.5 lg:mb-1">
                      {div.head}
                    </h4>
                    <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-secondary mb-1 lg:mb-2 opacity-80">
                      Division Head
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] lg:text-xs font-bold text-secondary">
                        <Mail className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-primary" />{" "}
                        {div.email.split("@")[0]}...
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] lg:text-xs font-bold text-secondary">
                        <Phone className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-primary" />{" "}
                        {div.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Mandates */}
              <div className="lg:col-span-4 space-y-6 lg:space-y-8 lg:sticky lg:top-32">
                <div className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 shadow-2xl relative overflow-hidden group/mandate">
                  <div className="absolute top-0 right-0 p-6 lg:p-10 opacity-5 group-hover/mandate:opacity-10 transition-all duration-700 group-hover/mandate:rotate-12 group-hover/mandate:scale-110">
                    <Briefcase className="h-24 w-24 lg:h-40 lg:w-40 text-primary" />
                  </div>
                  <div className="relative z-10 space-y-6 lg:space-y-8">
                    <h3 className="text-xl lg:text-2xl font-black uppercase tracking-widest flex items-center gap-2 lg:gap-3">
                      <LayoutGrid className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />{" "}
                      Mandates
                    </h3>
                    <ul className="space-y-4 lg:space-y-6">
                      {div.mandates.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-4 lg:gap-5 text-black leading-relaxed group/item"
                        >
                          <div className="h-5 w-5 lg:h-6 lg:w-6 rounded-lg lg:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary transition-all duration-300 mt-0.5 shadow-sm">
                            <CheckCircle2 className="h-3 w-3 lg:h-3.5 lg:w-3.5 text-primary group-hover/item:text-white transition-colors" />
                          </div>
                          <span className="text-sm lg:text-base font-medium group-hover/item:text-gray-900 transition-colors leading-[1.6]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Sections */}
              <div className="lg:col-span-8 space-y-8 lg:space-y-10">
                {div.sections.length > 0 ? (
                  <>
                    <div className="flex items-center justify-center gap-4 lg:gap-8 px-2 lg:px-4">
                      <img
                        src="/left.svg"
                        alt=""
                        className="h-6 w-auto opacity-80"
                      />
                      <p className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] lg:tracking-[0.4em] text-gray-700 whitespace-nowrap">
                        Functional Sections
                      </p>
                      <img
                        src="/right.svg"
                        alt=""
                        className="h-6 w-auto opacity-80"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:gap-8">
                      {div.sections.map((section: any) => (
                        <div
                          key={section.id}
                          className="p-6 sm:p-8 lg:p-10 bg-gray-50/50 rounded-[2rem] lg:rounded-[3rem] border border-gray-100 hover:border-primary/20 lg:hover:bg-white shadow-sm lg:hover:shadow-2xl transition-all duration-500 group/section"
                        >
                          <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8 pb-4 lg:pb-6 border-b border-gray-100">
                            <div className="p-3 lg:p-4 bg-primary rounded-xl lg:rounded-2xl shadow-sm text-secondary group-hover/section:bg-secondary group-hover/section:text-white transition-all duration-300">
                              {section.icon}
                            </div>
                            <h4 className="text-lg lg:text-2xl font-black tracking-tight text-gray-900 line-clamp-2">
                              {section.title}
                            </h4>
                          </div>

                          {section.description && (
                            <p className="text-xs lg:text-sm text-gray-700 font-bold mb-6 lg:mb-8 px-4 lg:px-6 border-l-4 border-primary/20 leading-relaxed italic">
                              {section.description}
                            </p>
                          )}

                          {section.subunits ? (
                            <div className="space-y-10 lg:space-y-12">
                              {section.subunits.map(
                                (unit: any, uIdx: number) => (
                                  <div
                                    key={uIdx}
                                    className="relative pl-6 lg:pl-8"
                                  >
                                    <div className="absolute left-2.5 lg:left-3 top-0 bottom-0 w-px bg-gray-200" />
                                    <div className="absolute left-0 top-0 h-5 w-5 lg:h-6 lg:w-6 rounded-full bg-primary/10 flex items-center justify-center text-[9px] lg:text-[10px] font-black text-primary border-[3px] lg:border-4 border-white translate-x-px lg:translate-x-0.5">
                                      {uIdx + 1}
                                    </div>
                                    <h5 className="text-base lg:text-lg font-black text-gray-900 uppercase tracking-tight mb-4 lg:mb-6">
                                      {unit.title}
                                    </h5>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-3 lg:gap-y-4">
                                      {unit.points.map(
                                        (point: string, pIdx: number) => (
                                          <li
                                            key={pIdx}
                                            className="flex gap-2.5 lg:gap-3 text-[13px] lg:text-sm text-gray-700 font-semibold lg:hover:text-gray-900 transition-colors leading-relaxed"
                                          >
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-1.5 lg:mt-2 flex-shrink-0" />
                                            {point}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-3 lg:gap-y-4 px-2 lg:px-6">
                              {section.points.map((point: any, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex gap-2.5 lg:gap-3 text-[13px] lg:text-sm text-gray-700 font-bold lg:hover:text-gray-900 transition-colors leading-relaxed"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-1.5 lg:mt-2 flex-shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] lg:min-h-[400px] bg-gray-50 rounded-[2rem] lg:rounded-[3rem] border-2 border-dashed border-gray-200 space-y-4 lg:space-y-6">
                    <div className="h-16 w-16 lg:h-20 lg:w-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-50">
                      <LayoutGrid className="h-6 w-6 lg:h-8 lg:w-8 text-primary opacity-20" />
                    </div>
                    <div className="text-center space-y-1 lg:space-y-2">
                      <p className="text-[10px] lg:text-sm text-secondary font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] opacity-40">
                        Documentation Pending
                      </p>
                      <p className="text-[10px] lg:text-xs text-secondary font-bold opacity-30 italic">
                        Detailed functional sections are being finalized.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
