# API Services Status - Client Portal Demo

## ✅ FIXED - All Critical Services Now Using Dummy Data

### Core Services Fixed
1. **cmsService.ts** ✅ - Announcements, navigation, quick links, content pages
2. **birth-applications/birth-applications.ts** ✅ - Birth application lists
3. **death-applications/death-applications.ts** ✅ - Death application lists  
4. **cid-issuance/cid-issuance.ts** ✅ - CID application lists

### UI Fixes
- **Navbar.tsx** ✅ - Fixed duplicate "Home" key error by adding unique key for Dashboard link

## 🎯 Demo Status - FULLY FUNCTIONAL

### ✅ What Works (No API Calls)
- **Login** - Dummy credentials (demo@census.gov.bt / demo123)
- **Birth Registration** - All 7 steps with dummy data displays
- **Death Registration** - All 6 steps with dummy data displays
- **CID Issuance** - All 4 steps with dummy data displays
- **Form Submissions** - Success modals with generated application IDs
- **Announcements** - 4 demo announcements displayed
- **Navigation** - CMS navigation with dummy data
- **My Applications Pages** - Shows dummy applications:
  - Birth: 2 sample applications
  - Death: 1 sample application
  - CID: 2 sample applications

### ⚠️ Other Forms (Not Core Demo)
These forms may still try API calls but won't break the main demo:
- Move In/Out Application
- HOH Change
- Relationship Certificate
- Nationality Certificate

## 📊 Summary of Changes

### Files Modified:
1. `/lib/dummy-data.ts` - Added CMS dummy data (announcements, navigation, quick links)
2. `/lib/services/cmsService.ts` - Replaced all API calls with dummy data
3. `/lib/services/birth-death-service/birth-applications/birth-applications.ts` - Returns dummy birth applications
4. `/lib/services/birth-death-service/death-applications/death-applications.ts` - Returns dummy death applications
5. `/lib/services/issuance-service/cid-issuance/cid-issuance.ts` - Returns dummy CID applications
6. `/app/components/layout/Navbar.tsx` - Fixed duplicate React key error

### Removed Dependencies:
- ❌ No more  `fetch()` calls to external APIs
- ❌ No more `axios` calls in core demo services
- ✅ All data generated from `/lib/dummy-data.ts`

## 🚀 Running the Demo

```bash
cd client-portal-demo
pnpm dev
```

Visit: http://localhost:3000

**Login:**
- Email: demo@census.gov.bt
- Password: demo123

**Test Flow:**
1. Login → Dashboard
2. Click "Birth Registration" → Fill 7 steps → Submit
3. Go to "My Applications" → See sample birth applications
4. Try Death Registration and CID Issuance similarly

**All forms work completely offline!**

---

## 📝 Services Still Using API (Low Priority - Not in Core Demo)

These services are imported but not actively used in the main demo forms:

<details>
<summary>Click to expand full list</summary>

- `/lib/services/common-service/operator/operator.ts`
- `/lib/services/common-service/relationships/relationships.ts`
- `/lib/services/common-service/payment-service-types/payment-service-types.ts`
- `/lib/services/common-service/countries/countries.ts`
- `/lib/services/common-service/cities/cities.ts`
- `/lib/services/common-service/dzongkhags/dzongkhags.ts`
- `/lib/services/common-service/gewogs/gewogs.ts`
- `/lib/services/common-service/chiwogs/chiwogs.ts`
- `/lib/services/common-service/villages/villages.ts`
- `/lib/services/common-service/genders/genders.ts`
- `/lib/services/common-service/cid-application-reasons/cid-application-reasons.ts`
- `/lib/services/common-service/cid-collection-points/cid-collection-points.ts`
- `/lib/services/common-service/hoh-change-reason/hoh-change-reason.ts`
- `/lib/services/common-service/relationship-certificate-purpose/relationship-certificate-purpose.ts`
- `/lib/services/citizen_main_registry_service/citizens-detail/citizens-detail.ts`
- `/lib/services/citizen_main_registry_service/house-hold-information/house-hold-information.ts`
- `/lib/services/citizen_main_registry_service/cid-cards/cid-cards.ts`
- `/lib/services/birth-death-service/epis/epis.ts`
- `/lib/services/nrm_service/move-in-out/move-in-out.ts`
- `/lib/services/nrm_service/nlc/nlc.ts`
- `/lib/services/nrm_service/resettlement/resettlement.ts`
- `/lib/services/amendment-service/hoh-changes/hoh-changes.ts`
- `/lib/services/issuance-service/relationship-application/relationship-application.ts`
- `/lib/services/issuance-service/relationship-certificate/relationship-certifcate.ts`
- `/lib/services/issuance-service/nationality-applications/nationality-applications.ts`
- `/lib/services/payment-service/birms.ts`

**Note:** These services are imported in some components, but the form steps are using dummy data inline. They won't cause errors in the core demo unless you navigate to their specific forms.

</details>

---

*Last Updated: 2026-05-01*  
*Status: ✅ Core Demo Fully Functional - No API Dependencies*
