# Client Portal Demo - Usage Guide

## 🎯 Overview
This is a fully functional demo version of the Census Client Portal that runs **completely offline** with dummy data. Perfect for training, demonstrations, and testing without requiring backend services.

---

## 🚀 Quick Start

### 1. Start the Development Server
```bash
cd client-portal-demo
pnpm dev
```

The app will run on: **http://localhost:3000**

### 2. Login Credentials
```
Email:    demo@census.gov.bt
Password: demo123
CID:      11234567890
```

---

## 📋 Available Services

### 1️⃣ Birth Registration (7 Steps)
**Navigation:** Dashboard → "Register Birth" or `/birth-registration`

**Steps:**
1. **Applicant Details** - Who is applying (Father/Mother/HOH/Guardian/Operator)
2. **Child Details** - Newborn information (name, DOB, birth location)
3. **Parents Details** - Father and mother information
4. **Guarantor Details** - Only shown if both parents deceased
5. **Household** - Register child with household
6. **Attachments** - Upload supporting documents (optional if ePIS registered)
7. **Review & Submit** - Final review and submission

**Sample CIDs for Testing:**
- **Father CID:** 11105001234 (Kinley Dorji)
- **Mother CID:** 11105002345 (Pema Choden)
- **Guarantor CID:** 11105003456 (Sonam Tshering)

---

### 2️⃣ Death Registration (6 Steps)
**Navigation:** Dashboard → "Register Death" or `/death-registration`

**Steps:**
1. **Applicant Details** - Who is applying (Family/Operator)
2. **Deceased Personal Details** - Name, DOB, gender
3. **Deceased Address Details** - Last known address
4. **Death Details** - Date, time, cause, place of death
5. **Attachments** - Death certificate and supporting documents
6. **Review & Submit** - Final review and submission

**Sample CID for Testing:**
- **Deceased CID:** 11305004567 (Tashi Namgyal Wangchuk)

---

### 3️⃣ CID Issuance (4 Steps)
**Navigation:** Dashboard → "Apply for CID" or `/cid-issuance`

**Steps:**
1. **Applicant Details** - Who is applying (Self/Parent/Operator)
2. **Recipient Details** - Who will receive the CID
3. **Biometric Uploads** - Passport photo upload
4. **Review & Submit** - Final review and payment

**Sample CID for Testing:**
- **Child/Dependent CID:** 11405005678 (Sonam Yangden)

---

## 📊 Dummy Data Display

Each form displays **sample data above the stepper** for the current step:

```
┌────────────────────────────────────────────────────┐
│ 📋 Sample Data to Use                              │
│ Step 1: Applicant Details                          │
│                                                     │
│ Applicant CID: 11234567890                         │
│ Contact Number: +975 17123456                      │
│ Email: demo@census.gov.bt                          │
│ Applicant Type: FATHER                             │
│ Born in Bhutan: Yes                                │
│ Registered in ePIS: Yes                            │
└────────────────────────────────────────────────────┘
```

This guide helps you fill out forms correctly with valid test data.

---

## 🗂️ Comprehensive Test Data

### Locations (Dzongkhags & Gewogs)
```
Thimphu
  ├── Chang Gewog
  │   ├── Motithang
  │   ├── Dechencholing
  │   └── Zilukha
  └── Mewang Gewog
      ├── Kabesa
      └── Hejo

Paro
  ├── Doteng Gewog
  │   ├── Bondey
  │   └── Woochu
  └── Tsento Gewog
      ├── Drugyal
      └── Shaba
```

### Citizens Database
| CID | Name | Role | Contact |
|-----|------|------|---------|
| 11234567890 | Demo User | Main User/Operator | 17123456 |
| 11105001234 | Kinley Dorji | Father | 17234567 |
| 11105002345 | Pema Choden | Mother | 17345678 |
| 11105003456 | Sonam Tshering | Guarantor | 17456789 |
| 11305004567 | Tashi Namgyal Wangchuk | Deceased | 17567890 |
| 11405005678 | Sonam Yangden | Child/Dependent | 17678901 |

### Household Data
| Household No | HOH | Location |
|--------------|-----|----------|
| HH-11234 | Demo User | Motithang, Thimphu |
| HH-11105 | Kinley Dorji | Motithang, Thimphu |
| HH-11305 | Tashi N. Wangchuk | Dechencholing, Thimphu |

---

## ✨ Key Features

### 1. **No Backend Required**
- All API calls replaced with dummy data
- Forms work completely offline
- Instant responses (simulated delays for realism)

### 2. **Full Form Validation**
- All original Zod validation schemas preserved
- Field-level error messages
- Required field enforcement
- Conditional logic (e.g., guarantor step visibility)

### 3. **Realistic UX**
- Loading states and animations
- Toast notifications
- Success/error messages
- Progress tracking with steppers

### 4. **Location Autocomplete**
- Dzongkhags, Gewogs, Villages
- Parent-child relationships (e.g., gewogs filtered by dzongkhag)
- Search functionality

### 5. **CID Lookup Simulation**
- Parent CID lookup returns dummy citizen data
- Household information retrieval
- ePIS birth verification

---

## 🎨 Visual Indicators

### Stepper States
- **Gray** - Not started
- **Black** - Current step
- **Green** - Completed

### Dummy Data Panel Colors
- **Blue** - Information display
- Uses accent colors for visibility
- Collapsible/always visible above stepper

---

## 📝 Form Submission Flow

### What Happens When You Submit:

1. **Validation**
   - All required fields checked
   - Format validation (CID, contact numbers, dates)
   - Conditional rules enforced

2. **Simulated Processing**
   - 1-1.5 second delay (mimics API call)
   - Loading state shown

3. **Success Response**
   - Application ID generated (e.g., `BR-2026-1234`, `DR-2026-5678`, `CID-2026-9012`)
   - Success modal displayed
   - Options to:
     - View summary
     - Submit another application
     - Return to dashboard

4. **Demo Data Generated**
   ```typescript
   {
     "success": true,
     "application_id": "BR-2026-1234",
     "message": "Birth registration submitted successfully",
     "status": "PENDING",
     "submitted_at": "2026-05-01T10:30:00Z"
   }
   ```

---

## 🔧 Technical Details

### File Structure
```
client-portal-demo/
├── lib/
│   └── dummy-data.ts              # All dummy data definitions
├── app/
│   └── components/
│       └── forms/
│           ├── DummyDataDisplay.tsx    # Reusable display component
│           ├── birth-registration/
│           │   ├── BirthRegistrationForm.tsx
│           │   └── steps/
│           ├── death-registration/
│           │   ├── DeathRegistrationForm.tsx
│           │   └── steps/
│           └── cid-issuance/
│               ├── CIDIssuanceForm.tsx
│               └── steps/
```

### Dummy Data Constants

All dummy data is centralized in `/lib/dummy-data.ts`:

```typescript
// User credentials
DUMMY_USER

// Form display data
BIRTH_REGISTRATION_DUMMY_DATA
DEATH_REGISTRATION_DUMMY_DATA
CID_ISSUANCE_DUMMY_DATA

// Dropdown data
DUMMY_COUNTRIES
DUMMY_CITIES
DUMMY_DZONGKHAGS
DUMMY_GEWOGS
DUMMY_VILLAGES
DUMMY_GENDERS
DUMMY_RELATIONSHIPS

// CID specific
DUMMY_CID_APPLICATION_REASONS
DUMMY_CID_COLLECTION_POINTS
DUMMY_PAYMENT_SERVICE_TYPES

// Lookup data
DUMMY_CITIZENS (Record<CID, CitizenData>)
DUMMY_HOUSEHOLDS (Record<HH_NO, HouseholdData>)
DUMMY_EPIS_BIRTH_DATA
DUMMY_OPERATORS (Array of authorized operator CIDs)
```

### Helper Functions
```typescript
simulateApiDelay(ms: number)        // Simulate network delay
simulateSuccessResponse(data: any)  // Mock success response
simulateErrorResponse(message: string) // Mock error response
```

---

## 🎓 Training Scenarios

### Scenario 1: Standard Birth Registration
1. Login with demo credentials
2. Navigate to Birth Registration
3. Follow sample data for Step 1 (Father applying)
4. Use Father CID: 11105001234 (auto-fills from applicant)
5. Use Mother CID: 11105002345
6. Select "Father" household registration
7. Submit successfully

### Scenario 2: Birth with Guarantor (Orphan)
1. Start birth registration
2. Step 3: Mark both parents as "Deceased"
3. Step 4 (Guarantor) will automatically appear
4. Use Guarantor CID: 11105003456
5. Select relationship: "Uncle"
6. Continue to submission

### Scenario 3: Death Registration
1. Navigate to Death Registration
2. Use Applicant as "FAMILY"
3. Enter Deceased CID: 11305004567
4. Automatically loads deceased personal details
5. Fill death details (date, time, cause)
6. Submit successfully

### Scenario 4: CID Issuance for Child
1. Navigate to CID Issuance
2. Select "Applying For: Parent"
3. Enter Child CID: 11405005678
4. Select "New CID" application type
5. Upload passport photo (any image file)
6. Select collection point: "Thimphu Dzongkhag"
7. Submit and receive payment reference

---

## ⚙️ Customization

### Adding New Test CIDs
Edit `/lib/dummy-data.ts`:

```typescript
export const DUMMY_CITIZENS: Record<string, any> = {
  // Add new citizen
  "10123456789": {
    cid_no: "10123456789",
    first_name: "New",
    last_name: "Citizen",
    // ... other fields
  },
};
```

### Modifying Sample Data Display
Edit step data in `/lib/dummy-data.ts`:

```typescript
export const BIRTH_REGISTRATION_DUMMY_DATA = {
  step1: {
    stepTitle: "Step 1: Custom Title",
    sampleData: {
      "Field Name": "Sample Value",
      // ... more fields
    },
    note: "Optional note to display", // Optional
  },
};
```

### Changing Form Behavior
- **Validation:** Edit schemas in `/lib/validations/`
- **Steps:** Modify step files in `app/components/forms/[service]/steps/`
- **Submission:** Edit main form files (e.g., `BirthRegistrationForm.tsx`)

---

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -- -p 3001
```

### Issue: Form Not Displaying Sample Data
- Verify dummy data exists for the current step number
- Check console for errors
- Ensure step indexing matches (starts at 0 vs 1)

### Issue: Validation Errors
- Use exact CID format: 11 digits
- Contact numbers: 8 digits starting with 1 or 7
- Dates must be valid and follow format requirements
- Check the sample data display for correct values

### Issue: Dropdowns Not Populating
- Check that dummy data arrays are properly imported
- Verify parent-child relationships (e.g., gewog_id matching dzongkhag_id)
- Look for console errors in browser DevTools

---

## 📚 Related Documentation

- **Implementation Plan:** `DUMMY_DEMO_IMPLEMENTATION_PLAN.md`
- **Main README:** `README.md`
- **API Integration (Original):** Check `client-portal` directory

---

## 🎯 Success Criteria Checklist

- ✅ No API calls - All forms work offline
- ✅ No next-auth dependency - Custom localStorage auth
- ✅ No NDI authentication - Simple email/password
- ✅ All validations work - Zod schemas enforced
- ✅ Conditional logic works - Steps show/hide correctly
- ✅ Forms can complete - Submit generates success response
- ✅ Sample data visible - Dummy data displays guide users
- ✅ Same UI/UX - Looks identical to production
- ✅ All three services - Birth, Death, CID fully functional

---

## 📞 Support

For questions or issues with the demo:
1. Check this guide first
2. Review `DUMMY_DEMO_IMPLEMENTATION_PLAN.md` for technical details
3. Check the console for error messages
4. Verify dummy data in `/lib/dummy-data.ts`

---

## 🎉 Happy Demoing!

The client-portal-demo is ready for:
- **Training** - Teach new users the application process
- **Demos** - Show stakeholders the system functionality
- **Testing** - Verify form logic and validation
- **Development** - Work on UI/UX without backend dependency

**Note:** This is a demo version. For production use, refer to the main `client-portal` directory with full backend integration.
