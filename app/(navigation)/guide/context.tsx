/**
 * Centralized Knowledge Base for Guide AI Assistant
 * This file contains all the content that the AI assistant can reference
 * to answer user queries about CID/SR card applications
 */

export interface GuideContent {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
  relatedTopics?: string[];
}

export const guideKnowledgeBase: GuideContent[] = [
  // CID MINOR (15-17 Years) - Eligibility
  {
    id: "cid-minor-eligibility",
    category: "CID Minor",
    title: "Eligibility for CID/SR Card (15-17 years)",
    content:
      "Yes, if you are Bhutanese citizen/special resident registered in the Bhutan Civil Registration System and have completed 15 years of age.",
    keywords: [
      "eligible",
      "eligibility",
      "15 years",
      "16 years",
      "17 years",
      "minor",
      "age requirement",
    ],
    relatedTopics: ["cid-minor-documents", "cid-minor-application"],
  },
  {
    id: "cid-minor-documents",
    category: "CID Minor",
    title: "Required Documents for CID/SR Card (15-17 years)",
    content: `The required documents are:
1. Duly completed CID/Special Resident Card application form No. BCRS-CID/SRC-01
2. One recent passport size photograph (in national dress and white background)
3. One legal stamp
4. Original Health card/MCH book used during the initial registration in the BCRS
OR Original Citizenship Kasho for those registered through Naturalization

Important: In the absence of the Original Health card/MCH book or the Original Citizenship Kasho, the signature of Gup/Thromde Representative/Thromde Tshogpa on the form needs to be obtained and submitted.`,
    keywords: [
      "documents",
      "requirements",
      "MCH book",
      "health card",
      "kasho",
      "photograph",
      "stamp",
      "form",
    ],
    relatedTopics: ["cid-minor-form", "cid-minor-process"],
  },
  {
    id: "cid-minor-form",
    category: "CID Minor",
    title: "Application Form for Minors",
    content:
      "BCRS-CID/SRC-01 (Aged 15-17 years). Hard copy available from service center/access points.",
    keywords: [
      "form",
      "application form",
      "BCRS-CID/SRC-01",
      "download",
      "where to get",
    ],
    relatedTopics: ["cid-minor-documents"],
  },
  {
    id: "cid-minor-process",
    category: "CID Minor",
    title: "Application Process for Minors",
    content: `Process depends on your situation:

If you have original MCH/Health Card:
Step 1: Bring the original MCH/Health Card
Step 2: A passport size photograph (in national dress and white background) and one legal stamp
Step 3: Fill up the CID/SR application form. Note you will need to get a signature from either your parents or head of household (HoH)

If you have lost/misplaced your original MCH/Health Card:
Step 1: A passport size photograph (in national dress and white background) and one legal stamp
Step 2: Fill up the CID/SR application form. Note you will need to get a signature from either your parents or head of household (HoH)
Step 3: Obtain the signature of the concerned Gup/Thromde Representative/Thromde Tshogpa on the duly filled CID/SR application form

If you are a naturalized citizen:
Step 1: The Citizenship Kasho
Step 2: A passport size photograph (in national dress) and one legal stamp
Step 3: Fill up the CID/SR application form. Note you will need to get signatures from either your parents or head of household (HoH)

Main Process:
1. Visit the nearest Civil Registration & Census Office and submit documents to CRCO
2. Application will be reviewed and verified
3. Make payment of Nu. 100 at revenue counter and get receipt
4. CRCO will update details into system and capture biometrics
5. SMS alert with Application Number will be sent
6. Application will be verified and approved
7. Printer operator will process printing of CID/SR cards`,
    keywords: [
      "process",
      "steps",
      "how to apply",
      "procedure",
      "biometrics",
      "payment",
    ],
    relatedTopics: ["cid-minor-service-centers", "cid-minor-collection"],
  },
  {
    id: "cid-minor-service-centers",
    category: "CID Minor",
    title: "Service Centers Available",
    content: `You can avail the service at:
1. Department of Civil Registration and Census, Head Office, Thimphu
2. Any of the twenty Dzongkhag Civil Registration and Census Offices
3. Any of the four Thromde Civil Registration and Census Offices`,
    keywords: [
      "service center",
      "office",
      "location",
      "where to apply",
      "Thimphu",
      "Dzongkhag",
    ],
    relatedTopics: ["cid-minor-thimphu-offices"],
  },
  {
    id: "cid-minor-thimphu-offices",
    category: "CID Minor",
    title: "Service Centers in Thimphu",
    content: `DCRC Head Office: Chhophel lam, Kawajangsa, Above golf course
Dzongkhag CRC Office: Thimphu Dzongkhag Administration, Chogyel lam, Near Changlimithang ground, Phone: 02-321934
Thromde CRC Office: Gongzin lam, Near 8 11 convenience store, Phone: 02-332429`,
    keywords: [
      "Thimphu",
      "office location",
      "address",
      "phone number",
      "contact",
    ],
    relatedTopics: ["cid-minor-service-centers"],
  },
  {
    id: "cid-minor-collection",
    category: "CID Minor",
    title: "Card Collection for Minors",
    content: `Department of Civil Registration and Census, Head Office, Thimphu: Collect from counter number 7 in the DCRC head office, two days after submission and biometrics capture.

Dzongkhag Civil Registration and Census Offices: You will be contacted by concerned Dzongkhag officials, who collect cards from the DCRC Head Office on a monthly basis.

Thromde Civil Registration and Census Offices: You will be contacted by concerned Thromde officials, who collect cards from the DCRC Head Office on a monthly basis.`,
    keywords: [
      "collection",
      "pickup",
      "when ready",
      "collect card",
      "delivery",
    ],
    relatedTopics: ["cid-minor-track-status"],
  },
  {
    id: "cid-minor-track-status",
    category: "CID Minor",
    title: "Track Application Status",
    content:
      "You can track your application status from the G2C Citizen Service Portal VIEW STATUS with the application ID number that was provided to you at the time of processing your application. Contact help desk of DCRC Head office or respective service center, if you have forgotten your application number.",
    keywords: [
      "track",
      "status",
      "application number",
      "check status",
      "G2C portal",
    ],
    relatedTopics: ["cid-minor-collection"],
  },
  {
    id: "cid-minor-fees-time",
    category: "CID Minor",
    title: "Processing Time and Fees for Minors",
    content:
      "Processing Time: 2 Days for completion and card printing. Card Validity: 10 Years from date of issuance. Card Fee: Nu. 100 payable in cash at revenue counter.",
    keywords: [
      "fee",
      "cost",
      "price",
      "processing time",
      "how long",
      "validity",
      "100",
    ],
    relatedTopics: ["cid-minor-process"],
  },

  // CID ADULT (18+ Years) - Similar structure
  {
    id: "cid-adult-eligibility",
    category: "CID Adult",
    title: "Eligibility for CID/SR Card (18+ years)",
    content:
      "Yes, if you are Bhutanese citizen/special resident registered in the Bhutan Civil Registration System and have completed 18 years of age.",
    keywords: [
      "eligible",
      "eligibility",
      "18 years",
      "adult",
      "age requirement",
    ],
    relatedTopics: ["cid-adult-documents", "cid-adult-application"],
  },
  {
    id: "cid-adult-documents",
    category: "CID Adult",
    title: "Required Documents for CID/SR Card (18+ years)",
    content: `The required documents are:
1. Duly completed CID/Special Resident Card application form No. BCRS-CID/SRC-02
2. One recent passport size photograph (in national dress and white background)
3. One legal stamp
4. Original Health card/MCH book used during the initial registration in the BCRS
OR Original Citizenship Kasho for those registered through Naturalization

Important: In the absence of the Original Health card/MCH book or the Original Citizenship Kasho, the signature of Gup/Thromde Representative/Thromde Tshogpa on the form needs to be obtained and submitted.`,
    keywords: [
      "documents",
      "requirements",
      "MCH book",
      "health card",
      "kasho",
      "photograph",
      "stamp",
      "form",
      "adult",
    ],
    relatedTopics: ["cid-adult-form", "cid-adult-process"],
  },
  {
    id: "cid-adult-form",
    category: "CID Adult",
    title: "Application Form for Adults",
    content:
      "BCRS-CID/SRC-02 (Aged 18 years and above). Hard copy available from service center/access points.",
    keywords: [
      "form",
      "application form",
      "BCRS-CID/SRC-02",
      "download",
      "where to get",
      "adult",
    ],
    relatedTopics: ["cid-adult-documents"],
  },
  {
    id: "cid-adult-process",
    category: "CID Adult",
    title: "Application Process for Adults",
    content: `Process depends on your situation:

If you have original MCH/Health Card:
Step 1: Bring the original MCH/Health Card
Step 2: A passport size photograph (in national dress and white background) and one legal stamp
Step 3: Fill up the CID/SR application form

If you have lost/misplaced your original MCH/Health Card:
Step 1: A passport size photograph (in national dress and white background) and one legal stamp
Step 2: Fill up the CID/SR application form
Step 3: Obtain the signature of the concerned Gup/Thromde Representative/Thromde Tshogpa on the duly filled CID/SR application form

If you are a naturalized citizen:
Step 1: The Citizenship Kasho
Step 2: A passport size photograph (in national dress) and one legal stamp
Step 3: Fill up the CID/SR application form

Main Process:
1. Visit the nearest Civil Registration & Census Office and submit documents to CRCO
2. Application will be reviewed and verified
3. Make payment of Nu. 100 at revenue counter and get receipt
4. CRCO will update details into system and capture biometrics
5. SMS alert with Application Number will be sent
6. Application will be verified and approved
7. Printer operator will process printing of CID/SR cards`,
    keywords: [
      "process",
      "steps",
      "how to apply",
      "procedure",
      "biometrics",
      "payment",
      "adult",
    ],
    relatedTopics: ["cid-adult-service-centers", "cid-adult-collection"],
  },
  {
    id: "cid-adult-fees-time",
    category: "CID Adult",
    title: "Processing Time and Fees for Adults",
    content:
      "Processing Time: 2 Days for completion and card printing. Card Validity: 10 Years from date of issuance. Card Fee: Nu. 100 payable in cash at revenue counter.",
    keywords: [
      "fee",
      "cost",
      "price",
      "processing time",
      "how long",
      "validity",
      "100",
      "adult",
    ],
    relatedTopics: ["cid-adult-process"],
  },

  // GENERAL INFORMATION
  {
    id: "general-accessibility",
    category: "General",
    title: "Accessibility & Amenities",
    content:
      "The Department of Civil Registration and Census has designated priority counters for persons living with disability. There is a wheelchair ramp built at the entrance of the office building. Mobile Service available at Dzongkhag & Thromde Civil Registration and Census Offices.",
    keywords: [
      "disability",
      "wheelchair",
      "accessibility",
      "mobile service",
      "priority counter",
    ],
    relatedTopics: [],
  },
  {
    id: "general-feedback",
    category: "General",
    title: "Feedback and Grievances",
    content:
      "You can provide feedback, suggestions and grievances through: ServE Tool (open feedback), Eakasel, or Toll free number.",
    keywords: [
      "feedback",
      "complaint",
      "grievance",
      "suggestion",
      "serve tool",
      "eakasel",
    ],
    relatedTopics: [],
  },
  {
    id: "general-additional-info",
    category: "General",
    title: "Additional Information Sources",
    content:
      "You can access additional information from: Dzongkhag CRC office, Brochures and pamphlets available in the service counters, Information available in the DCRC/Dzongkhag/Thromde websites.",
    keywords: ["information", "help", "resources", "website", "brochure"],
    relatedTopics: [],
  },
  {
    id: "general-parental-consent",
    category: "General",
    title: "Parental Consent for Minors",
    content:
      "For applicants aged 15-17 years, parental consent is required. Either parents or head of household (HoH) must sign the application form.",
    keywords: [
      "parental consent",
      "parent signature",
      "minor",
      "HoH",
      "head of household",
    ],
    relatedTopics: ["cid-minor-process"],
  },
];

/**
 * Search function to find relevant content based on user query
 * Uses keyword matching and relevance scoring
 */
export function searchKnowledgeBase(query: string): GuideContent[] {
  const lowercaseQuery = query.toLowerCase();
  const queryWords = lowercaseQuery.split(/\s+/);

  // Score each content item based on relevance
  const scoredContent = guideKnowledgeBase.map((item) => {
    let score = 0;

    // Check title match (highest weight)
    if (item.title.toLowerCase().includes(lowercaseQuery)) {
      score += 10;
    }

    // Check keyword matches
    item.keywords.forEach((keyword) => {
      if (lowercaseQuery.includes(keyword.toLowerCase())) {
        score += 5;
      }
    });

    // Check individual word matches in keywords
    queryWords.forEach((word) => {
      if (word.length > 2) {
        // Ignore short words
        item.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(word)) {
            score += 2;
          }
        });
      }
    });

    // Check content match (lower weight)
    if (item.content.toLowerCase().includes(lowercaseQuery)) {
      score += 3;
    }

    return { ...item, score };
  });

  // Filter and sort by score
  return scoredContent
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Return top 3 results
}

/**
 * Get content by category
 */
export function getContentByCategory(category: string): GuideContent[] {
  return guideKnowledgeBase.filter((item) => item.category === category);
}

/**
 * Get related topics
 */
export function getRelatedContent(contentId: string): GuideContent[] {
  const content = guideKnowledgeBase.find((item) => item.id === contentId);
  if (!content || !content.relatedTopics) return [];

  return content.relatedTopics
    .map((id) => guideKnowledgeBase.find((item) => item.id === id))
    .filter((item): item is GuideContent => item !== undefined);
}

/**
 * Common questions and their suggested searches
 */
export const commonQuestions = [
  { question: "Am I eligible to apply?", search: "eligibility" },
  { question: "What documents do I need?", search: "required documents" },
  { question: "How do I apply?", search: "application process" },
  { question: "Where can I apply?", search: "service centers" },
  { question: "How much does it cost?", search: "fees" },
  { question: "How long does it take?", search: "processing time" },
  { question: "How do I track my application?", search: "track status" },
  { question: "Where do I collect my card?", search: "collection" },
];
