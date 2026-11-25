# Claims to review (doctor and lawyer sign-off)

Two parts:

1. **Old wording that was removed or rewritten.** Listed so you can see what changed and confirm you agree. None of it goes on the new site as written.
2. **New wording that still makes a statement about health, qualifications or products.** Cautious by design, but each line needs approval before launch.

Sources are paths inside the old `public_html/pages/`. Quotes are shortened.

## 1. Old wording removed

| # | Old wording (shortened) | Where | Why it's a risk | New approach |
|---|---|---|---|---|
| 1 | "…success in **permanently curing** cervical and lumbar spondylosis patients" | `about-us/main-sections/about-t1.php`, `about-t2.php` | Absolute cure claim about named conditions | Removed. Doctor's bio says only role and (to be confirmed) years of experience |
| 2 | "Ayurvedic treatment in TamilNadu offers a highly effective **cure to all kinds of diseases**" | `offerings/main.php` (diabetes section) | Cure-all claim | Removed. Diabetes tab is "supportive only, continue your medicines" |
| 3 | "…available for almost all kinds of diseases that are otherwise **too complex or incurable**" (spinal problems, diabetes, allergies, infertility, arthritis) | `offerings/main.php` | Implies cure for incurable conditions | Removed |
| 4 | "Ayurveda **can cure** long-term skin diseases and chronic conditions such as dermatitis and eczema" | `home/treatment.php` (skin card) | Cure claim | "Traditional skin care approaches… chosen after a consultation" |
| 5 | "herbal medicines will be suggested, **to cure** the imbalance and the disease" | `ayurveda/main.php`, `home/long__about.php`, `about-us/main-sections/left-side.php` | Cure claim | "Suggest diet, lifestyle, therapies or herbal preparations suited to you" |
| 6 | "thousands of satisfied customers have been **treated and cured**" | `home/long__about.php` | Cure claim and unverifiable numbers | Removed |
| 7 | "…**will not have any side effects** on the body" | `home/long__about.php` | Safety guarantee | Removed. Panchakarma and Varma pages carry explicit "not suitable for everyone" cautions |
| 8 | "…the medicines have **no side effects** and can generally be taken along with any other medicines" | `offerings/main.php` | Safety guarantee and interaction claim; can cause real harm | Removed. Replaced with "continue medicines prescribed by your doctor" |
| 9 | "work on the **root cause**… **way better and more effective** than allopathic and other systems" | `offerings/main.php` | Comparative efficacy claim | Removed |
| 10 | "The treatment will not only **cure** the ailment but also will be beneficial for your body" | `home/long__about.php` | Cure claim | Removed |
| 11 | "Completely purifies the body", "Riddance of toxins", "Boosts Immunity", "Reducing weight", "Speeding up the metabolism" (Panchakarma benefits list) | `home/long__about.php` | Specific physiological benefit claims | Replaced with "traditionally used to support relaxation and wellbeing" |
| 12 | "Strengthen your immune system… reverse the negative effects of stress… slowing the aging process" | `panchakarma/main.php` | Immunity and anti-ageing claims | Removed |
| 13 | **Clevira tablets**: "used to treat and prevent viral infections… Coronavirus… **approved by the Ministry of AYUSH**… safe for liver and kidney disease… **no side effects**, suitable for all ages", with dosage | `narmadha-herbal/main.php`, `nhp.json`, poster `gallery/27.webp` | Unapproved COVID treatment claim, regulatory-approval claim, safety claim, dosing | **Product not published.** Image and text excluded. Decide with doctor and lawyer whether it can be sold at all |
| 14 | Narmadha Soap: "in **7 days** acne, dark spots, rashes, dry skin… go away" (Tamil) | `nhp.json` | Time-bound cure claim | "Herbal bathing soap… ask the doctor whether it suits your skin" |
| 15 | Narmadha Pain Care Oil: long Tamil text on knee pain causes and relief | `nhp.json` | Therapeutic claim | Neutral external-use description |
| 16 | Product ads: "Cures dry skin, allergy, rashes & all skin problems" (soap), "Relieves body pains & joint pains / Cures hair damage" (oil) | posters `gallery/18, 23` and others | Cure claim baked into image | Posters excluded; see products below |
| 17 | NABH badge | `assets/images/nabh.png` | Implies accreditation | Not used. Show only if the hospital holds current NABH accreditation and can show the certificate |
| 18 | "**Accreditation**" heading | `home/about.php` (disabled in the old home page) | Same as above | Not used |
| 19 | "one of the **leading** ayurvedic hospitals", "**trusted**", "one of the **best** places in the world" | `offerings/main.php`, `home/long__about.php`, `<meta description>` | Unsubstantiated superlatives | Removed from copy and meta descriptions |
| 20 | "Ayurveda recognizes 20 types of diabetes… all of them highly dangerous…" and scare lists of complications | `offerings/main.php` | Alarming medical statements, uncited | Shortened to a neutral supportive-care line |
| 21 | Therapy descriptions mentioning self-induced vomiting ("drinking lots of warm water… irritate the uvula using their fingers") | `offerings/main.php` (Vamana) | **Unsafe self-treatment instruction** | Removed; Vamana is described only as a supervised procedure |
| 22 | Panchakarma page: "We are taking every effort to ensure the safety of our patients and staff **during this time**" | `panchakarma/main.php` | Stale COVID-era notice | Removed |
| 23 | "Stroke… prompt treatment is crucial. Early action can reduce brain damage" | `home/treatment.php` | Medical statement; fine in itself but misleading under a "treatment" heading | Kept the safety message, moved to an emergency note: "call 108 first" |
| 24 | Disease lists tied to Panchakarma steps ("highly beneficial for haemorrhoids, jaundice, psoriasis, migraine, hemiplegia…") | `offerings/main.php` | Condition-specific benefit claims | Removed |
| 25 | "Sri Dhanvanthri Ayurbeda" (typo) and "Tamilnadu is considered the hub of Ayurvedic treatment" | `home/long__about.php` | Unsupported claim | Removed |

## 2. New wording to approve

### Qualifications and people
| Where | Wording | Question |
|---|---|---|
| About, `doctors` | S. Rajkapoor, **Managing Director**, "18 years of experience" | Old site says 18 years in one place and "over 20" in another. Which is right, and 18 years of what? Also confirm whether to show "Brahmashree", "Traditional Ayurveda Vaidhyar" or "founder of Sri Dhanvanthri Herbal Research Trust" |
| About, `doctors` | Mrs. R. Shanthi, **Proprietor** | Confirm title |
| About, `doctors` | Guru Brahmashree A.M. Robinson: "50 years of experience in Varma, Panchakarma and meditation" | Older text uses present tense, newer text says he **"was"** a renowned practitioner. **Is he living?** Which photograph is him? Page is unpublished until confirmed |
| Everywhere | No "Dr.", no BAMS/MD, no `Physician` schema | Add only with registration numbers and certificates. Use Person + jobTitle until then |
| Home / About | "a panel of experienced doctors" (old) | Not used; no claim about a panel |

### Therapy and condition wording
| Where | Wording | Risk |
|---|---|---|
| Panchakarma | "traditionally used to support relaxation and a sense of wellbeing" | Soft benefit claim |
| Panchakarma | Vamana, Virechana, Vasti, Nasya, Raktamokshana descriptions ("traditionally associated with balancing Kapha/Pitta/Vata") | Doctor to confirm accuracy; Raktamokshana is a procedure you may not offer |
| Panchakarma | "not suitable for everyone… pregnant, very weak…" | Doctor to extend the contraindication list |
| Varma | "traditionally used to support comfort and mobility" | Soft benefit claim |
| Treatments page | 11 condition cards, e.g. "Rheumatoid arthritis: diet, yoga and herbal approaches traditionally used to support comfort and mobility; your rheumatologist's advice should continue" | Naming conditions at all implies treatment. Doctor and lawyer to decide which conditions may be named |
| Treatments, stroke | "recovery support after the emergency phase has been treated in hospital" | Confirm the clinic actually offers this |
| Treatments, MND | "supportive and rehabilitative care… alongside specialist neurological care" | Sensitive condition; consider removing |
| Offerings / Diabetes | "supportive only. Continue your medicines" | Doctor to confirm scope |
| Offerings / Fertility | "supportive care alongside modern medical evaluation; we do not promise outcomes" | Sensitive; confirm |
| Offerings / Post-pregnancy | "may include oil massage and warm herbal preparations" | Confirm with doctor (postnatal safety) |
| Offerings / Weight management | "Results vary…" | Fine; confirm therapy list |
| Ayurveda page | Doshas, eight branches of Ayurveda | General education; lawyer to approve disclaimers |
| Site-wide | Disclaimer: "does not replace advice from a qualified doctor… call 108" | Lawyer to approve final wording |

### Products (9)
| Product | Concern |
|---|---|
| All | No ingredients, dosage, net quantity, licence number or manufacturer details exist on the old site. Each product has a `factsNeeded` list in `content.en.json`. For ayurvedic products, Indian regulation expects licence details and ingredient labelling, so confirm this with your lawyer |
| Kesha Raksha Oil, Pain Care Oil, Omam Water, Sooranam range | Old ads promise relief of specific symptoms (hair fall, knee pain, stomach ache, etc.). New copy says only "traditional preparation, ask the doctor" |
| Product images | 8 of 9 are **old ads with claim text baked in** (Tamil and English). They are marked provisional; replace with clean packshots before launch |
| "Narmadha" vs "Narmatha" | Packaging says "Narmatha"; your URL says "narmadha". Confirm the registered brand spelling |
| Dried fig | Sold as a food; confirm FSSAI labelling |

### Wider team photos (About page)
Nine staff portraits that were on the old About page are shown with first names only: Santhosima, Lakshmi Meera, Keerthiga, Thayammal S, Parameswari, Rajesh TR, M. Manikandan, Muthaiah, M. Muthu Selvi. No titles and no "Dr." (the old page used "Dr." for some). Two further names on the old page (Suganthi Manju, T. Kanna Devi, P. Shanthi) have no usable photo file. Confirm each person's consent, spelling and role.

### Elite capsule range (7 products, added from the owner's new product posters)
Respicare, Hiruthayaraksha, Memocare, Pureskin, Kesharaksha, Rheuma Care, Men-O. Only the **bottle** is cropped from each poster. The posters themselves are NOT used because they carry claims that need approval before they go anywhere: "boosts immunity", "relieves sciatica", "maintains healthy blood pressure", "supports healthy testosterone levels", "clinically proven herbs", "no side effects", "100% safe", "reduces hair fall", and similar. The site lists only the herb names printed on each pack, and says "talk to the doctor first".
- Confirm the herb lists are exact, and give quantities per capsule.
- Hiruthayaraksha lists Sarpgandha (Rauwolfia), which has real drug effects. The doctor should write the cautions (blood pressure medicines, pregnancy).
- Licence number, batch, expiry, price and dosage are missing. "Ayurvedic Proprietary Medicine" implies a manufacturing licence; confirm it before sale.
- Manufacturer on the posters is "Sri Dhanvanthri Siddha Ayurveda Herbal Remedies", Anna Stadium Road, Karungulam, Tirunelveli 627356. Confirm this is the same business as the hospital and whether to show that address.
- The bottle photos are small (about 350 px wide). A proper packshot would look sharper.

### Social proof
| Where | Concern |
|---|---|
| Home | Placeholder only. Use testimonials only with written consent, no outcome claims |
| Gallery | Staff group photos and 3 photos of patients being treated (faces hidden or turned away). Confirm staff and patient consent |
| Yoga photo | Has a "REDMI NOTE 8 PRO AI QUAD CAMERA" watermark; use the cropped version or a new photo |

### Stock photography (licence)
15 images of herbs, spas, vegetables and physiotherapy look like stock photos (listed in `content/photo-sources.md` under HOLD). If they were downloaded from a free or paid library, check the licence allows commercial use or buy replacements. Do not publish until confirmed.

## 3. Factual statements on the new pages (confirm each is true)

| Where | Statement | Why it needs confirming |
|---|---|---|
| Home, hero button and closing line | "Free consultation on WhatsApp" | Is the first consultation actually free? If not, change to "Consult on WhatsApp" |
| Home, story 1 | "Some days that conversation is the whole visit." | Is this true of your practice? |
| Home, story 2 | "You may see our therapists grinding fresh leaves on a stone in the courtyard." | Based on the photographs; confirm it still happens |
| Home, story 2 | "Our own pharmacy prepares the Narmadha range." | Confirm Narmadha products are made by you (not only sold by you) |
| Home, story 3 | "planned for one person at a time, and explained before they begin" | Confirm this describes how therapies are run |
| Home, story 4 | "If something is not right for you, we will say so." | A promise in the doctor's voice; confirm |
| Home, people | S. Rajkapoor "is usually the first voice you will hear when you call." | Confirm who answers the phones |
| Home, gallery | Photo captions and "patient images are shown with consent" | Consent must exist before the images go live |
| Footer | Address, three phone numbers, Facebook link, Google Maps search link | Confirm all are current. Opening hours are a labelled placeholder |
| Panchakarma page | Five actions and what each is "traditionally associated with"; contraindication note | Doctor to confirm accuracy and extend the caution list |
| Whole site | `noindex` is on while this is staging | Must be switched off at launch (see launch checklist) |

## 4. Wording from the consultation-cart work (not written by the design pass): confirm each
| Where | Statement | Why it needs confirming |
|---|---|---|
| Talk-to-the-doctor sheet | "Free call back. No payment, no app." | Is the call free? |
| Home hero and closing line | "Free consultation on WhatsApp" (your brief's wording) | Same question |
| Cart, product pages, how-it-works | "He calls you... then you collect from the pharmacy" | Confirm the real process: who calls, in what time, and that products may be collected without a visit |
| Home hero | "Ayurveda, Siddha and Varma care" | Confirm Siddha is offered (the shopfront says Siddha) |
| Doctor desk demo data | Seeded demo requests contain invented patient names, ailments and medicines (all marked demo) | Delete before launch; never leave invented medical data on a live system |
| Doctor desk | Stores patient name, phone, age, concern and medicines in `web/data/requests.json` | Personal health data: needs a lawful basis, a privacy notice, backups and a real database before launch |
