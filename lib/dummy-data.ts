// Dummy User Credentials for Demo
export const DUMMY_USER = {
  email: "demo@census.gov.bt",
  password: "demo123",
  cidNo: "11234567890",
  fullName: "Demo User",
  token: "demo-token-12345",
};

// Father User for Approval Flow
export const DUMMY_FATHER_USER = {
  email: "father@test.bt",
  password: "father123",
  cidNo: "11105001234",
  fullName: "Father Demo User",
  token: "demo-token-father",
};

// Birth Registration Dummy Data
export const BIRTH_REGISTRATION_DUMMY_DATA = {
  step1: {
    stepTitle: "Step 1: Applicant Details",
    sampleData: {
      "Applicant CID": "11234567890",
      "Contact Number": "+975 17123456",
      Email: "demo@census.gov.bt",
      "Applicant Type": "MOTHER",
      "Born in Bhutan": "Yes",
      "Registered in ePIS": "No",
      "Marriage Certificate Valid": "Yes",
    },
  },
  step2: {
    stepTitle: "Step 2: Child Details",
    sampleData: {
      "Mother's CID (for ePIS)": "11234567890 (Use your login CID)",
      "First Name": "Tenzin",
      "Middle Name": "Dorji",
      "Last Name": "Wangchuk",
      "Date of Birth": "2026-01-15",
      "Time of Birth": "09:30",
      "Birth Weight": "3200 grams",
      Gender: "Male",
      Dzongkhag: "Thimphu",
      Gewog: "Chang Gewog",
      Chiwog: "Chiwog 1",
      Village: "Motithang",
    },
    note: "Not registered in ePIS - manual location entry required. If ePIS registered, use mother's CID (your logged-in CID: 11234567890)",
  },
  step3: {
    stepTitle: "Step 3: Parents Details",
    sampleData: {
      "Father CID": "11105001234",
      "Father Name": "Kinley Dorji",
      "Father Contact": "+975 17234567",
      "Father Alive": "Yes",
      "Mother CID": "11234567890",
      "Mother Name": "Demo User (Logged in)",
      "Mother Contact": "+975 17123456",
      "Mother Alive": "Yes",
    },
    note: "Applicant is the MOTHER - use your logged-in CID (11234567890)",
  },
  step4: {
    stepTitle: "Step 4: Guarantor Details (Conditional)",
    sampleData: {
      "Guarantor CID": "11105003456",
      "Guarantor Name": "Sonam Tshering",
      "Guarantor Contact": "+975 17456789",
      Relationship: "Uncle",
    },
    note: "Only required if both parents are deceased",
  },
  step5: {
    stepTitle: "Step 5: Household",
    sampleData: {
      "Register With": "Mother",
      "Household Number": "HH-11234",
      "Thram Number": "T-112",
      "Head of Household": "Demo User (Mother)",
      Address: "Motithang, Chang Gewog, Thimphu",
    },
    note: "Select 'Mother' to register with your household (logged-in user)",
  },
  step6: {
    stepTitle: "Step 6: Attachments",
    sampleData: {
      "Birth Certificate": "Optional (ePIS registered)",
      "Marriage Certificate": "MC-2025-1234",
      "Medical Records": "Optional",
      "Max File Size": "5MB per file",
      "Allowed Formats": "PDF, JPG, PNG, SVG",
    },
    note: "Attachments are optional if registered in ePIS",
  },
  step7: {
    stepTitle: "Step 7: Review & Submit",
    sampleData: {
      "Application Type": "Birth Registration",
      Applicant: "Kinley Dorji (11105001234)",
      "Child Name": "Tenzin Dorji Wang",
      "Date of Birth": "2026-01-15",
      Status: "Ready to Submit",
    },
    note: "Please review all information before submitting",
  },
};

// Death Registration Dummy Data
export const DEATH_REGISTRATION_DUMMY_DATA = {
  step1: {
    stepTitle: "Step 1: Applicant Details",
    sampleData: {
      "Applicant CID": "11234567890",
      "Contact Number": "+975 17123456",
      Email: "demo@census.gov.bt",
      "Applicant Type": "FAMILY",
      "Relationship to Deceased": "Son",
      "EPIS ID": "Optional",
    },
  },
  step2: {
    stepTitle: "Step 2: Deceased Personal Details",
    sampleData: {
      "Deceased CID": "11305004567",
      "First Name": "Tashi",
      "Middle Name": "Namgyal",
      "Last Name": "Wangchuk",
      "Date of Birth": "1950-06-15",
      Gender: "Male",
      "Age at Death": "75 years",
    },
  },
  step3: {
    stepTitle: "Step 3: Deceased Address Details",
    sampleData: {
      Country: "Bhutan",
      Dzongkhag: "Thimphu",
      Gewog: "Chang Gewog",
      Village: "Dechencholing",
      "Household Number": "HH-11305",
      "House Number": "205",
    },
  },
  step4: {
    stepTitle: "Step 4: Death Details",
    sampleData: {
      "Date of Death": "2026-04-28",
      "Time of Death": "14:30",
      "Place of Death": "JDWNRH Hospital",
      Dzongkhag: "Thimphu",
      Gewog: "Chang Gewog",
      Village: "Motithang",
      "Cause of Death": "Natural causes - Cardiac arrest",
      "Health Registered": "Yes",
    },
  },
  step5: {
    stepTitle: "Step 5: Attachments",
    sampleData: {
      "Death Certificate": "Required (if not health registered)",
      "Supporting Documents": "Medical records, Police report",
      "Max File Size": "5MB per file",
      "Allowed Formats": "PDF, JPG, PNG",
    },
    note: "Death certificate required if not registered in health system",
  },
  step6: {
    stepTitle: "Step 6: Review & Submit",
    sampleData: {
      "Application Type": "Death Registration",
      Applicant: "Demo User (11234567890)",
      "Deceased Name": "Tashi Namgyal Wangchuk",
      "Date of Death": "2026-04-28",
      Status: "Ready to Submit",
    },
    note: "Please review all information before submitting",
  },
};

// CID Issuance Dummy Data
export const CID_ISSUANCE_DUMMY_DATA = {
  step1: {
    stepTitle: "Step 1: Applicant Details",
    sampleData: {
      "Applicant CID": "11234567890",
      "Applicant Name": "Demo User",
      "Application Type": "New",
      "Applying For": "Self",
      "Phone Number": "+975 17123456",
      Email: "demo@census.gov.bt",
    },
  },
  step2: {
    stepTitle: "Step 2: Recipient Details",
    sampleData: {
      "Recipient CID": "11234567890",
      "Full Name": "Demo User",
      "Date of Birth": "2008-06-15",
      Gender: "Male",
      Age: "18 years",
      "Application Type": "New",
      "Payment Amount": "100 BTN",
    },
  },
  step3: {
    stepTitle: "Step 3: Biometric Uploads",
    sampleData: {
      "Photo Requirements": "Passport-style photo",
      Background: "White background",
      Expression: "Neutral expression, clear face",
      "File Size": "Max 2MB",
      Format: "JPG or PNG",
      "Application Reason": "First Time Issuance",
      "Collection Point": "Thimphu Dzongkhag",
    },
    note: "Upload a clear passport-style photo for your CID",
  },
  step4: {
    stepTitle: "Step 4: Review & Submit",
    sampleData: {
      "Application Type": "CID Issuance",
      Applicant: "Demo User (11234567890)",
      Recipient: "Demo User",
      "Collection Point": "Thimphu Dzongkhag",
      "Payment Amount": "100 BTN",
      "Estimated Completion": "7 working days",
    },
    note: "Please review all information before submitting. Payment will be processed after submission.",
  },
};

// Helper functions for simulating API responses
export const simulateApiDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const simulateSuccessResponse = (data: any) => ({
  success: true,
  data,
  message: "Operation completed successfully",
});

export const simulateErrorResponse = (message: string) => ({
  success: false,
  error: message,
});

// ============================================
// DROPDOWN DATA FOR FORMS
// ============================================

// Countries
export const DUMMY_COUNTRIES = [
  { id: "1", name: "Bhutan" },
  { id: "2", name: "India" },
  { id: "3", name: "Nepal" },
  { id: "4", name: "Thailand" },
  { id: "5", name: "Bangladesh" },
];

// Cities (for births outside Bhutan)
export const DUMMY_CITIES = [
  { id: "1", name: "Thimphu City", country_id: "1" },
  { id: "2", name: "Phuentsholing", country_id: "1" },
  { id: "3", name: "New Delhi", country_id: "2" },
  { id: "4", name: "Kolkata", country_id: "2" },
  { id: "5", name: "Kathmandu", country_id: "3" },
];

// Dzongkhags
export const DUMMY_DZONGKHAGS = [
  { id: "1", name: "Thimphu" },
  { id: "2", name: "Paro" },
  { id: "3", name: "Punakha" },
  { id: "4", name: "Bumthang" },
  { id: "5", name: "Chhukha" },
  { id: "6", name: "Samtse" },
  { id: "7", name: "Trashigang" },
  { id: "8", name: "Mongar" },
];

// Gewogs (with dzongkhag_id reference)
export const DUMMY_GEWOGS = [
  // Thimphu Gewogs
  { id: "1", name: "Chang Gewog", dzongkhag_id: "1" },
  { id: "2", name: "Mewang Gewog", dzongkhag_id: "1" },
  { id: "3", name: "Kawang Gewog", dzongkhag_id: "1" },
  // Paro Gewogs
  { id: "4", name: "Doteng Gewog", dzongkhag_id: "2" },
  { id: "5", name: "Tsento Gewog", dzongkhag_id: "2" },
  { id: "6", name: "Lungnyi Gewog", dzongkhag_id: "2" },
  // Punakha Gewogs
  { id: "7", name: "Guma Gewog", dzongkhag_id: "3" },
  { id: "8", name: "Toedwang Gewog", dzongkhag_id: "3" },
  // Bumthang Gewogs
  { id: "9", name: "Chhoekhor Gewog", dzongkhag_id: "4" },
  { id: "10", name: "Tang Gewog", dzongkhag_id: "4" },
];

// Chiwogs (optional, with gewog_id reference)
export const DUMMY_CHIWOGS = [
  { id: "1", name: "Chiwog 1", gewog_id: "1" },
  { id: "2", name: "Chiwog 2", gewog_id: "1" },
  { id: "3", name: "Chiwog 3", gewog_id: "2" },
  { id: "4", name: "Chiwog 4", gewog_id: "2" },
];

// Villages (with gewog_id reference)
export const DUMMY_VILLAGES = [
  // Chang Gewog villages
  { id: "1", name: "Motithang", gewog_id: "1" },
  { id: "2", name: "Dechencholing", gewog_id: "1" },
  { id: "3", name: "Zilukha", gewog_id: "1" },
  // Mewang Gewog villages
  { id: "4", name: "Kabesa", gewog_id: "2" },
  { id: "5", name: "Hejo", gewog_id: "2" },
  // Doteng Gewog villages
  { id: "6", name: "Bondey", gewog_id: "4" },
  { id: "7", name: "Woochu", gewog_id: "4" },
  // Tsento Gewog villages
  { id: "8", name: "Drugyal", gewog_id: "5" },
  { id: "9", name: "Shaba", gewog_id: "5" },
];

// Genders
export const DUMMY_GENDERS = [
  { id: "1", name: "Male", value: "male" },
  { id: "2", name: "Female", value: "female" },
  { id: "3", name: "Other", value: "other" },
];

// Relationships (for Guarantor)
export const DUMMY_RELATIONSHIPS = [
  { id: "1", name: "Uncle" },
  { id: "2", name: "Aunt" },
  { id: "3", name: "Grandfather" },
  { id: "4", name: "Grandmother" },
  { id: "5", name: "Legal Guardian" },
  { id: "6", name: "Other Family Member" },
  { id: "7", name: "Sibling" },
  { id: "8", name: "Cousin" },
];

// CID Application Reasons
export const DUMMY_CID_APPLICATION_REASONS = [
  { id: "1", name: "First Time Issuance", reasons_id: "uuid-reason-1" },
  { id: "2", name: "Lost", reasons_id: "uuid-reason-2" },
  { id: "3", name: "Damaged", reasons_id: "uuid-reason-3" },
  { id: "4", name: "Stolen", reasons_id: "uuid-reason-4" },
  { id: "5", name: "Renewal", reasons_id: "uuid-reason-5" },
];

// CID Collection Points
export const DUMMY_CID_COLLECTION_POINTS = [
  { id: "1", name: "Thimphu Dzongkhag", place_of_collection: "uuid-place-1" },
  { id: "2", name: "Paro Dzongkhag", place_of_collection: "uuid-place-2" },
  { id: "3", name: "Thimphu Thromde", place_of_collection: "uuid-place-3" },
  {
    id: "4",
    name: "Phuentsholing Thromde",
    place_of_collection: "uuid-place-4",
  },
  { id: "5", name: "DoCSS HQ", place_of_collection: "uuid-place-5" },
];

// Payment Service Types (for CID)
export const DUMMY_PAYMENT_SERVICE_TYPES = [
  {
    id: "1",
    name: "New CID Issuance",
    amount: 100,
    payment_type_id: "uuid-payment-1",
  },
  {
    id: "2",
    name: "CID Renewal",
    amount: 50,
    payment_type_id: "uuid-payment-2",
  },
  {
    id: "3",
    name: "CID Replacement - Lost",
    amount: 100,
    payment_type_id: "uuid-payment-3",
  },
  {
    id: "4",
    name: "CID Replacement - Damaged",
    amount: 100,
    payment_type_id: "uuid-payment-4",
  },
];

// ============================================
// CITIZEN LOOKUP DATA (for parent/guarantor CID lookup)
// ============================================

export const DUMMY_CITIZENS: Record<string, any> = {
  "11234567890": {
    cid_no: "11234567890",
    first_name: "Demo",
    middle_name: "",
    last_name: "User",
    date_of_birth: "1990-01-01",
    gender: "male",
    contact_no: "17123456",
    email: "demo@census.gov.bt",
    household_no: "HH-11234",
    tharm_no: "T-001",
    current_address: "Motithang, Chang Gewog, Thimphu",
    dzongkhag_id: "1",
    gewog_id: "1",
    village_id: "1",
  },
  "11105001234": {
    cid_no: "11105001234",
    first_name: "Kinley",
    middle_name: "",
    last_name: "Dorji",
    date_of_birth: "1985-03-15",
    gender: "male",
    contact_no: "17234567",
    email: "kinley.dorji@example.bt",
    household_no: "HH-11105",
    tharm_no: "T-111",
    current_address: "Motithang, Chang Gewog, Thimphu",
    dzongkhag_id: "1",
    gewog_id: "1",
    village_id: "1",
  },
  "11105002345": {
    cid_no: "11105002345",
    first_name: "Pema",
    middle_name: "",
    last_name: "Choden",
    date_of_birth: "1987-07-20",
    gender: "female",
    contact_no: "17345678",
    email: "pema.choden@example.bt",
    household_no: "HH-11105-F",
    tharm_no: "T-111-F",
    current_address: "Dechencholing, Chang Gewog, Thimphu",
    dzongkhag_id: "1",
    gewog_id: "1",
    village_id: "2",
  },
  "11105003456": {
    cid_no: "11105003456",
    first_name: "Sonam",
    middle_name: "",
    last_name: "Tshering",
    date_of_birth: "1982-11-10",
    gender: "male",
    contact_no: "17456789",
    email: "sonam.tshering@example.bt",
    household_no: "HH-11105-G",
    tharm_no: "T-112",
    current_address: "Zilukha, Chang Gewog, Thimphu",
    dzongkhag_id: "1",
    gewog_id: "1",
    village_id: "3",
  },
  "11305004567": {
    cid_no: "11305004567",
    first_name: "Tashi",
    middle_name: "Namgyal",
    last_name: "Wangchuk",
    date_of_birth: "1950-06-15",
    gender: "male",
    contact_no: "17567890",
    email: "",
    household_no: "HH-11305",
    tharm_no: "T-305",
    current_address: "Dechencholing, Chang Gewog, Thimphu",
    dzongkhag_id: "1",
    gewog_id: "1",
    village_id: "2",
  },
  "11405005678": {
    cid_no: "11405005678",
    first_name: "Sonam",
    middle_name: "",
    last_name: "Yangden",
    date_of_birth: "2010-03-20",
    gender: "female",
    contact_no: "17678901",
    email: "sonam.yangden@example.bt",
    household_no: "HH-11405",
    tharm_no: "T-405",
    current_address: "Kabesa, Mewang Gewog, Thimphu",
    dzongkhag_id: "1",
    gewog_id: "2",
    village_id: "4",
  },
};

// ============================================
// HOUSEHOLD DATA (for household lookup)
// ============================================

export const DUMMY_HOUSEHOLDS: Record<string, any> = {
  "HH-11234": {
    household_no: "HH-11234",
    tharm_no: "T-001",
    hoh_cid: "11234567890",
    hoh_name: "Demo User",
    dzongkhag: "Thimphu",
    dzongkhag_id: "1",
    gewog: "Chang Gewog",
    gewog_id: "1",
    village: "Motithang",
    village_id: "1",
    house_no: "101",
    current_address: "House #101, Motithang, Chang Gewog, Thimphu",
  },
  "HH-11105": {
    household_no: "HH-11105",
    tharm_no: "T-111",
    hoh_cid: "11105001234",
    hoh_name: "Kinley Dorji",
    dzongkhag: "Thimphu",
    dzongkhag_id: "1",
    gewog: "Chang Gewog",
    gewog_id: "1",
    village: "Motithang",
    village_id: "1",
    house_no: "205",
    current_address: "House #205, Motithang, Chang Gewog, Thimphu",
  },
  "HH-11305": {
    household_no: "HH-11305",
    tharm_no: "T-305",
    hoh_cid: "11305004567",
    hoh_name: "Tashi Namgyal Wangchuk",
    dzongkhag: "Thimphu",
    dzongkhag_id: "1",
    gewog: "Chang Gewog",
    gewog_id: "1",
    village: "Dechencholing",
    village_id: "2",
    house_no: "205",
    current_address: "House #205, Dechencholing, Chang Gewog, Thimphu",
  },
};

// ============================================
// ePIS DATA (for birth verification)
// ============================================

export const DUMMY_EPIS_BIRTH_DATA = {
  "EPIS-2026-001": {
    epis_id: "EPIS-2026-001",
    mother_cid: "11105002345",
    date_of_birth: "2026-01-15",
    time_of_birth: "09:30",
    weight: "3.2",
    birth_facility: "JDWNRH Hospital",
    dzongkhag_id: "1",
    gewog_id: "1",
    village_id: "1",
    registered: true,
  },
};

// ============================================
// OPERATOR VERIFICATION DATA
// ============================================

export const DUMMY_OPERATORS: string[] = [
  "11234567890", // Demo user is an operator
];

// ============================================
// CMS DATA (for announcements, navigation, quick links)
// ============================================

export const DUMMY_ANNOUNCEMENTS = [
  {
    id: "1",
    headline: "Welcome to Census Client Portal Demo",
    message:
      "This is a fully functional demo version running offline with dummy data. Perfect for training and demonstrations!",
    image_url: null,
    image_name: null,
    category_id: "1",
    category: {
      id: "1",
      name: "System Announcements",
      slug: "system-announcements",
    },
    status: "active" as const,
    created_by_id: "admin",
    created_by_name: "System Administrator",
    createdAt: "2026-05-01T00:00:00Z",
    updatedAt: "2026-05-01T00:00:00Z",
  },
  {
    id: "2",
    headline: "Birth Registration Service Available",
    message:
      "Register newborns easily through our online portal. Complete the 7-step process with all required documents.",
    image_url: null,
    image_name: null,
    category_id: "2",
    category: {
      id: "2",
      name: "Services",
      slug: "services",
    },
    status: "active" as const,
    created_by_id: "admin",
    created_by_name: "System Administrator",
    createdAt: "2026-04-15T00:00:00Z",
    updatedAt: "2026-04-15T00:00:00Z",
  },
  {
    id: "3",
    headline: "Death Registration Now Online",
    message:
      "Report deaths and complete registration formalities online. Our streamlined 6-step process makes it easy.",
    image_url: null,
    image_name: null,
    category_id: "2",
    category: {
      id: "2",
      name: "Services",
      slug: "services",
    },
    status: "active" as const,
    created_by_id: "admin",
    created_by_name: "System Administrator",
    createdAt: "2026-04-10T00:00:00Z",
    updatedAt: "2026-04-10T00:00:00Z",
  },
  {
    id: "4",
    headline: "CID Issuance Service",
    message:
      "Apply for new CID, renewal, or replacement online. Choose your collection point and track your application status.",
    image_url: null,
    image_name: null,
    category_id: "2",
    category: {
      id: "2",
      name: "Services",
      slug: "services",
    },
    status: "active" as const,
    created_by_id: "admin",
    created_by_name: "System Administrator",
    createdAt: "2026-04-05T00:00:00Z",
    updatedAt: "2026-04-05T00:00:00Z",
  },
];

export const DUMMY_NAVIGATION = [
  // Note: "Home" is automatically prepended by NavbarServer via STATIC_PREFIX
  // Do not include "Home" here to avoid duplicate keys
  {
    id: "2",
    label: "Services",
    url: "/services",
    icon: "services",
    order: 2,
    message: null,
    status: "active" as const,
    created_by_id: "admin",
    created_by_name: "System Administrator",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    contentPages: [],
  },
  {
    id: "3",
    label: "About",
    url: "/about",
    icon: "info",
    order: 3,
    message: null,
    status: "active" as const,
    created_by_id: "admin",
    created_by_name: "System Administrator",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    contentPages: [],
  },
];

export const DUMMY_QUICK_LINK_CATEGORIES = [
  {
    id: "1",
    name: "Vital Registration",
    name_dzo: "གལ་ཆེན་ཐོ་བཀོད།",
    description: "Birth, Death, and Marriage Registration Services",
    slug: "vital-registration",
    is_active: true,
    order: 1,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Identity Services",
    name_dzo: "ངོ་བོ་ཞབས་ཏོག",
    description: "CID and Identity Document Services",
    slug: "identity-services",
    is_active: true,
    order: 2,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Information",
    name_dzo: "བརྡ་དོན།",
    description: "Guides, FAQs, and Help Resources",
    slug: "information",
    is_active: true,
    order: 3,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

export const DUMMY_QUICK_LINKS = [
  {
    id: "1",
    title: "Birth Registration",
    description: "Register a newborn child",
    url: "/birth-registration",
    content_page_id: null,
    contentPage: null,
    category_id: "1",
    category: DUMMY_QUICK_LINK_CATEGORIES[0],
    type: "internal",
    order: 1,
    is_active: true,
    opens_in_new_tab: false,
    icon: "baby",
    created_at: "2026-01-01T00:00:00Z",
    created_by_name: "System Administrator",
  },
  {
    id: "2",
    title: "Death Registration",
    description: "Register a death",
    url: "/death-registration",
    content_page_id: null,
    contentPage: null,
    category_id: "1",
    category: DUMMY_QUICK_LINK_CATEGORIES[0],
    type: "internal",
    order: 2,
    is_active: true,
    opens_in_new_tab: false,
    icon: "cross",
    created_at: "2026-01-01T00:00:00Z",
    created_by_name: "System Administrator",
  },
  {
    id: "3",
    title: "CID Issuance",
    description: "Apply for CID card",
    url: "/cid-issuance",
    content_page_id: null,
    contentPage: null,
    category_id: "2",
    category: DUMMY_QUICK_LINK_CATEGORIES[1],
    type: "internal",
    order: 1,
    is_active: true,
    opens_in_new_tab: false,
    icon: "id-card",
    created_at: "2026-01-01T00:00:00Z",
    created_by_name: "System Administrator",
  },
  {
    id: "4",
    title: "User Guide",
    description: "How to use the portal",
    url: "/guide",
    content_page_id: null,
    contentPage: null,
    category_id: "3",
    category: DUMMY_QUICK_LINK_CATEGORIES[2],
    type: "internal",
    order: 1,
    is_active: true,
    opens_in_new_tab: false,
    icon: "book",
    created_at: "2026-01-01T00:00:00Z",
    created_by_name: "System Administrator",
  },
  {
    id: "5",
    title: "FAQ",
    description: "Frequently asked questions",
    url: "/faq",
    content_page_id: null,
    contentPage: null,
    category_id: "3",
    category: DUMMY_QUICK_LINK_CATEGORIES[2],
    type: "internal",
    order: 2,
    is_active: true,
    opens_in_new_tab: false,
    icon: "help",
    created_at: "2026-01-01T00:00:00Z",
    created_by_name: "System Administrator",
  },
];

export const DUMMY_CONTENT_PAGES = [
  {
    id: "1",
    cms_navigation_id: "2",
    slug: "about",
    title: "About Census Portal",
    body: "<h1>Welcome to Census Portal Demo</h1><p>This is a demonstration version of the Census Client Portal.</p>",
    featured_image_id: null,
    status: "published" as const,
    updated_by_id: "admin",
    updated_by_name: "System Administrator",
    order: 1,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    navigation: {
      id: "2",
      label: "About",
    },
    featuredImage: null,
  },
];
