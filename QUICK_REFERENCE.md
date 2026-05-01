# 🎴 Quick Reference Card - Test Data

## 🔐 Login
```
Email:    demo@census.gov.bt
Password: demo123
CID:      11234567890
```

## 👥 Test CIDs

| CID | Name | Use For |
|-----|------|---------|
| **11234567890** | Demo User | Main applicant (your login) |
| **11105001234** | Kinley Dorji | Father in birth registration |
| **11105002345** | Pema Choden | Mother in birth registration |
| **11105003456** | Sonam Tshering | Guarantor (if parents deceased) |
| **11305004567** | Tashi N. Wangchuk | Deceased person (death registration) |
| **11405005678** | Sonam Yangden | Child/dependent (CID issuance) |

## 📱 Contact Numbers
- Use format: `17XXXXXX` or `77XXXXXX`
- Examples: `17123456`, `17234567`, `17345678`

## 📍 Locations

### Thimphu
- **Dzongkhag:** Thimphu
- **Gewog:** Chang Gewog
- **Village:** Motithang

### Paro
- **Dzongkhag:** Paro
- **Gewog:** Doteng Gewog
- **Village:** Bondey

## 🏠 Households

| HH Number | HOH CID | Location |
|-----------|---------|----------|
| HH-11234 | 11234567890 | Motithang, Thimphu |
| HH-11105 | 11105001234 | Motithang, Thimphu |
| HH-11305 | 11305004567 | Dechencholing, Thimphu |

## 🆔 ePIS IDs
- **EPIS-2026-001** - Birth verification (Mother: 11105002345)

## 🎯 Quick Form Fill

### Birth Registration
```
Step 1: Applicant Details
- Applicant CID: 11234567890 (auto-filled)
- Contact: 17123456
- Applicant Type: FATHER
- Born in Bhutan: Yes
- ePIS Registered: Yes
- MC Valid: Yes

Step 2: Child Details
- First Name: Tenzin
- Middle Name: Dorji
- Last Name: Wang
- DOB: 2026-01-15
- Time: 09:30
- Weight: 3.2
- Gender: Male
- Dzongkhag: Thimphu
- Gewog: Chang Gewog
- Village: Motithang
- ePIS ID: EPIS-2026-001

Step 3: Parents Details
- Father CID: 11105001234
- Father Contact: 17234567
- Father Alive: Yes
- Mother CID: 11105002345
- Mother Contact: 17345678
- Mother Alive: Yes

Step 5: Household
- Register With: Father
- (Auto-fills HH-11105)
```

### Death Registration
```
Step 1: Applicant Details
- Applicant CID: 11234567890 (auto-filled)
- Contact: 17123456
- Applicant Type: FAMILY
- Relationship: Son

Step 2: Deceased Personal
- Deceased CID: 11305004567
- First Name: Tashi
- Middle Name: Namgyal
- Last Name: Wangchuk
- DOB: 1950-06-15
- Gender: Male

Step 3: Deceased Address
- Dzongkhag: Thimphu
- Gewog: Chang Gewog
- Village: Dechencholing
- HH Number: HH-11305
- House Number: 205

Step 4: Death Details
- Date of Death: 2026-04-28
- Time: 14:30
- Place: JDWNRH Hospital
- Dzongkhag: Thimphu
- Gewog: Chang Gewog
- Cause: Natural causes - Cardiac arrest
- Health Registered: Yes
```

### CID Issuance
```
Step 1: Applicant Details
- Applicant CID: 11234567890 (auto-filled)
- Application Type: New
- Applying For: Self
- Phone: 17123456

Step 2: Recipient Details
- Recipient CID: 11234567890
- (Auto-loads citizen data)
- Application Type: New CID Issuance

Step 3: Biometric Uploads
- Upload passport photo (any JPG/PNG)
- Reason: First Time Issuance
- Collection Point: Thimphu Dzongkhag
```

## 🔄 Application ID Format
- Birth: `BR-2026-XXXX`
- Death: `DR-2026-XXXX`
- CID: `CID-2026-XXXX`

## ⚡ Quick Tips
- Sample data appears above stepper for each step
- All forms autosave as you navigate steps
- CID format: Exactly 11 digits
- Contact format: 8 digits (starts with 1 or 7)
- Dates: Use YYYY-MM-DD format
- File uploads: Max 5MB (2MB for CID photo)

## 🎨 Stepper Colors
- **Gray** = Not started
- **Black** = Current step
- **Green** = Completed ✓

---

**Print this card or keep it handy during demos!** 📌
