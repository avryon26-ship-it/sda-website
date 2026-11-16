// Image manifest. `src` is relative to the old site's assets/ folder (read-only).
// status: include | pending-confirmation | stock-unverified | provisional-product
//   include              – clinic's own photo, safe to use (still subject to patient-consent note)
//   pending-confirmation – identity or use must be confirmed by the owner before use
//   stock-unverified     – looks like stock photography; licence unknown, do not publish until confirmed
//   provisional-product  – old marketing creative with text baked in; replace with a clean packshot
export const MAX_W = 1600;
export const MAX_KB = 250;

export const manifest = [
  // ---- people ------------------------------------------------------------
  { src: 'faculties/rounded/1.webp', out: 'doctors/s-rajkapoor.webp', maxW: 800, alpha: true, status: 'include', cat: 'people',
    en: 'Portrait of S. Rajkapoor, Managing Director of Sri Dhanvanthri Ayurveda', ta: 'ஸ்ரீ தன்வந்திரி ஆயுர்வேதாவின் நிர்வாக இயக்குநர் எஸ். ராஜ்கபூரின் உருவப்படம்' },
  { src: 'faculties/rounded/2.webp', out: 'doctors/mrs-r-shanthi.webp', maxW: 800, alpha: true, status: 'include', cat: 'people',
    en: 'Portrait of Mrs. R. Shanthi, Proprietor of Sri Dhanvanthri Ayurveda', ta: 'ஸ்ரீ தன்வந்திரி ஆயுர்வேதாவின் உரிமையாளர் திருமதி ஆர். சாந்தி அவர்களின் உருவப்படம்' },
  { src: 'other/about-us-robinson-2.jpg', out: 'doctors/robinson-candidate-hilltop.webp', status: 'pending-confirmation', cat: 'people',
    note: 'Is this Guru Brahmashree A.M. Robinson? Also used by the old site as the yoga page photo.',
    en: 'Elderly yoga practitioner seated in meditation on a rock with hills behind', ta: 'மலைப்பின்னணியில் பாறையில் தியான நிலையில் அமர்ந்துள்ள முதிய யோகா பயிற்சியாளர்' },
  { src: 'about-us/robinson.webp', out: 'doctors/robinson-candidate-group.webp', status: 'pending-confirmation', cat: 'people',
    note: 'Group photo of five men in white; which one is Guru Brahmashree A.M. Robinson? Old photo, 600x400 only.',
    en: 'Group of men in white dhotis standing together, an older photograph', ta: 'வெள்ளை ஆடையில் நிற்கும் ஆண்கள் குழு, பழைய புகைப்படம்' },

  // ---- clinic photographs (own photos) -----------------------------------
  { src: 'gallery/1.webp', out: 'clinic/managing-director-at-desk.webp', status: 'include', cat: 'clinic',
    en: 'Managing Director writing at his desk surrounded by herbal medicines', ta: 'மூலிகை மருந்துகளுக்கு நடுவே மேசையில் எழுதிக்கொண்டிருக்கும் நிர்வாக இயக்குநர்' },
  { src: 'gallery/2.webp', out: 'clinic/team-green-uniform-pharmacy.webp', status: 'include', cat: 'clinic', note: 'Staff faces visible: confirm staff consent.',
    en: 'Clinic team in green uniforms standing in front of the herbal pharmacy', ta: 'மூலிகை மருந்தகத்தின் முன் பச்சை சீருடையில் நிற்கும் குழுவினர்' },
  { src: 'gallery/3.webp', out: 'clinic/team-at-shopfront.webp', status: 'include', cat: 'clinic', note: 'Staff faces visible: confirm staff consent.',
    en: 'Team standing at the green shopfront of Sri Dhanvanthri Siddha Ayurveda Herbal Remedies', ta: 'ஸ்ரீ தன்வந்திரி சித்த ஆயுர்வேத மூலிகை மருந்தகத்தின் முன் குழுவினர்' },
  { src: 'gallery/4.webp', out: 'clinic/team-in-reception.webp', status: 'include', cat: 'clinic', note: 'Staff faces visible: confirm staff consent.',
    en: 'Clinic team in the reception area with framed awards on the wall', ta: 'சுவரில் விருதுகளுடன் வரவேற்பறையில் குழுவினர்' },
  { src: 'gallery/5.webp', out: 'clinic/therapists-in-white-coats.webp', status: 'include', cat: 'clinic', note: 'Staff faces visible: confirm staff consent.',
    en: 'Group of therapists in white coats smiling at the camera', ta: 'வெள்ளை கோட் அணிந்த சிகிச்சையாளர்கள் குழு' },
  { src: 'gallery/6.webp', out: 'clinic/therapists-preparing-herbs.webp', status: 'include', cat: 'clinic', note: 'Staff faces visible: confirm staff consent.',
    en: 'Therapists standing around a stone grinder preparing fresh herbs', ta: 'கல் உரலில் மூலிகைகளை அரைத்துத் தயாரிக்கும் சிகிச்சையாளர்கள்' },
  { src: 'gallery/7.webp', out: 'clinic/therapists-grinding-herbs.webp', status: 'include', cat: 'clinic', note: 'Staff faces visible: confirm staff consent.',
    en: 'Women therapists grinding medicinal leaves on a stone', ta: 'கல்லில் மூலிகை இலைகளை அரைக்கும் பெண் சிகிச்சையாளர்கள்' },
  { src: 'gallery/12.webp', out: 'clinic/managing-director-portrait.webp', status: 'include', cat: 'clinic',
    en: 'Managing Director seated in front of an illustrated Dhanvanthri backdrop', ta: 'தன்வந்திரி ஓவியப் பின்னணியின் முன் அமர்ந்துள்ள நிர்வாக இயக்குநர்' },
  { src: 'gallery/13.webp', out: 'clinic/shoulder-therapy-session.webp', status: 'include', cat: 'clinic', note: 'Real patient (back only). Confirm patient consent.',
    en: 'Therapist treating a patient’s shoulder and back', ta: 'நோயாளியின் தோள்பட்டை மற்றும் முதுகில் சிகிச்சை அளிக்கும் சிகிச்சையாளர்' },
  { src: 'gallery/14.webp', out: 'clinic/lamp-and-flower-altar.webp', status: 'include', cat: 'clinic',
    en: 'Traditional brass lamp and marigold garlands on a wooden table', ta: 'மர மேசையில் பாரம்பரிய குத்துவிளக்கும் மலர் மாலைகளும்' },
  { src: 'gallery/15.webp', out: 'clinic/body-therapy-session.webp', status: 'include', cat: 'clinic', note: 'Real patient (face not visible). Confirm patient consent.',
    en: 'Patient lying down during a traditional body therapy session', ta: 'பாரம்பரிய உடல் சிகிச்சையின்போது படுத்திருக்கும் நோயாளி' },
  { src: 'gallery/16.webp', out: 'clinic/lamp-and-flower-altar-2.webp', status: 'include', cat: 'clinic',
    en: 'Brass lamp, flowers and a framed deity picture on a table', ta: 'மேசையில் குத்துவிளக்கு, மலர்கள் மற்றும் தெய்வப் படம்' },
  { src: 'gallery/17.webp', out: 'clinic/managing-director-in-pharmacy.webp', status: 'include', cat: 'clinic',
    en: 'Managing Director holding a bar of herbal soap inside the pharmacy', ta: 'மருந்தகத்தினுள் மூலிகை சோப்பைக் காட்டும் நிர்வாக இயக்குநர்' },
  { src: 'other/panchakarma.jpg', out: 'clinic/potli-therapy-session.webp', status: 'include', cat: 'clinic', note: 'Real patient (back only). Confirm patient consent.',
    en: 'Therapist applying herbal potli to a patient during a Panchakarma session', ta: 'பஞ்சகர்மா சிகிச்சையில் மூலிகைக் கிழி வைத்து சிகிச்சை அளிக்கும் சிகிச்சையாளர்' },
  { src: 'other/varmatherapy.jpg', out: 'clinic/varma-therapy-session.webp', status: 'include', cat: 'clinic', note: 'Real patient. Confirm patient consent.',
    en: 'Varma therapy session in progress in the clinic', ta: 'மருத்துவமனையில் நடைபெறும் வர்ம சிகிச்சை' },
  { src: 'other/yoga-meditation.jpg', out: 'clinic/yoga-meditation-hilltop.webp', status: 'pending-confirmation', cat: 'clinic', note: 'Same person as the Robinson candidate photo; confirm identity and permission.',
    en: 'Yoga practitioner meditating on a rock with hills behind', ta: 'மலைப்பின்னணியில் பாறையில் தியானம் செய்யும் யோகா பயிற்சியாளர்' },
  { src: 'slider/New-edited/1.jpg', out: 'brand/dhanvanthri-illustration-banner.webp', status: 'include', cat: 'brand',
    en: 'Illustration of Lord Dhanvanthri and the sages of Ayurveda on a green background', ta: 'பச்சை பின்னணியில் தன்வந்திரி பகவான் மற்றும் ஆயுர்வேத முனிவர்களின் ஓவியம்' },

  // ---- brand --------------------------------------------------------------
  { src: 'logo/logo.png', out: 'brand/logo.webp', alpha: true, maxW: 800, status: 'include', cat: 'brand', en: 'Sri Dhanvanthri Ayurveda logo', ta: 'ஸ்ரீ தன்வந்திரி ஆயுர்வேதா சின்னம்' },

  // ---- stock-looking images (licence unknown) -----------------------------
  { src: 'slider/New-edited/2.jpg', out: 'stock-unverified/herbs-brass-pots-banner.webp', status: 'stock-unverified', cat: 'stock', en: 'Brass pots and bowls of herbs and spices', ta: 'பித்தளைப் பாத்திரங்களும் மூலிகை, மசாலாக்களும்' },
  { src: 'slider/New-edited/3.jpg', out: 'stock-unverified/spices-and-herbs-banner.webp', status: 'stock-unverified', cat: 'stock', en: 'Colourful spices and fresh herbs on a wooden table', ta: 'மரமேசையில் வண்ண மசாலாக்களும் மூலிகைகளும்' },
  { src: 'slider/New-edited/4.jpg', out: 'stock-unverified/herbs-brass-pots-banner-2.webp', status: 'stock-unverified', cat: 'stock', en: 'Brass pots and herbs, soft green background', ta: 'பித்தளைப் பாத்திரங்களும் மூலிகைகளும்' },
  { src: 'slider/New-edited/6.jpg', out: 'stock-unverified/orchid-stones-bamboo-banner.webp', status: 'stock-unverified', cat: 'stock', en: 'Orchid, stones and a candle beside bamboo', ta: 'மூங்கில் அருகே ஆர்க்கிட் மலர், கற்கள் மற்றும் மெழுகுவர்த்தி' },
  { src: 'banners/young-man-spa-treatment-recreation-rest-relaxation-massage-hygh-angle-view.webp', out: 'stock-unverified/back-massage-spa.webp', status: 'stock-unverified', cat: 'stock', en: 'Back massage with herbal pouches and oils', ta: 'மூலிகை கிழிகளுடன் முதுகு மசாஜ்' },
  { src: 'banners/close-up-physiotherapist-massaging-patient.webp', out: 'stock-unverified/physiotherapy-knee.webp', status: 'stock-unverified', cat: 'stock', en: 'Physiotherapist treating a patient’s knee', ta: 'நோயாளியின் முழங்காலுக்கு பிசியோதெரபி சிகிச்சை' },
  { src: 'banners/close-up-box-with-ripe-vegetables.webp', out: 'stock-unverified/organic-vegetable-crate.webp', status: 'stock-unverified', cat: 'stock', en: 'Crate of fresh organic vegetables', ta: 'புதிய இயற்கை காய்கறிகள் நிறைந்த பெட்டி' },
  { src: 'offerings/ayurveda-0.jpg', out: 'stock-unverified/shirodhara.webp', status: 'stock-unverified', cat: 'stock', en: 'Shirodhara: warm oil poured on the forehead', ta: 'சிரோதாரா: நெற்றியில் வெதுவெதுப்பான எண்ணெய் ஊற்றும் சிகிச்சை' },
  { src: 'offerings/imageuploadscovered20200612imageuploadscovered20200612imageuploadscovered20200612500jpgjpgjpg.jpg', out: 'stock-unverified/herbal-potli-back-massage.webp', status: 'stock-unverified', cat: 'stock', en: 'Woman receiving a back massage with herbal pouches', ta: 'மூலிகைக் கிழிகளுடன் முதுகு மசாஜ் பெறும் பெண்' },
  { src: 'gallery/29.webp', out: 'stock-unverified/herbs-on-brass-plate.webp', status: 'stock-unverified', cat: 'stock', en: 'Dried medicinal roots and barks on a brass plate', ta: 'பித்தளைத் தட்டில் உலர்ந்த மூலிகை வேர்கள், பட்டைகள்' },
  { src: 'gallery/30.webp', out: 'stock-unverified/spices-and-roots.webp', status: 'stock-unverified', cat: 'stock', en: 'Assorted spices, roots and a clay pot', ta: 'பல்வேறு மசாலாக்கள், வேர்கள் மற்றும் மண்பானை' },
  { src: 'gallery/31.webp', out: 'stock-unverified/herbal-powder-and-scoop.webp', status: 'stock-unverified', cat: 'stock', en: 'Herbal powder in a wooden bowl with scoop', ta: 'மரக்கிண்ணத்தில் மூலிகைப் பொடியும் கரண்டியும்' },
  { src: 'gallery/33.webp', out: 'stock-unverified/herbal-potli-pair.webp', status: 'stock-unverified', cat: 'stock', en: 'Two herbal potli pouches', ta: 'இரண்டு மூலிகைக் கிழிகள்' },
  { src: 'gallery/35.webp', out: 'stock-unverified/grains-and-spices-plate.webp', status: 'stock-unverified', cat: 'stock', en: 'Plate of lentils, grains and spices', ta: 'பருப்பு, தானியம் மற்றும் மசாலாக்கள் அடங்கிய தட்டு' },
  { src: 'gallery/37.webp', out: 'stock-unverified/potli-massage-hands.webp', status: 'stock-unverified', cat: 'stock', en: 'Hands applying herbal potli on the back', ta: 'முதுகில் மூலிகைக் கிழி வைக்கும் கைகள்' },

  // ---- product images (old marketing creatives, text baked in) ------------
  { src: 'gallery/38.webp', out: 'products/narmadha-bathing-soap.webp', status: 'include', cat: 'product', en: 'Narmadha Ayurvedic bathing soap pack', ta: 'நர்மதா ஆயுர்வேத குளியல் சோப்பு' },
  { src: 'other/narmadha-knee-pain-oil.webp', out: 'products/narmadha-pain-care-oil.webp', status: 'provisional-product', cat: 'product', en: 'Narmadha Pain Care Oil bottle', ta: 'நர்மதா வலி நிவாரண எண்ணெய் புட்டி' },
  { src: 'other/narmadha-palpodi.webp', out: 'products/narmadha-pal-podi.webp', status: 'provisional-product', cat: 'product', en: 'Narmadha herbal tooth powder jars', ta: 'நர்மதா பல் பொடி ஜாடிகள்' },
  { src: 'other/narmadha-sundavathal-sooranam.webp', out: 'products/narmadha-sundavathal-sooranam.webp', status: 'provisional-product', cat: 'product', en: 'Narmadha Sundavathal Sooranam jar', ta: 'நர்மதா சுண்டவத்தல் சூரணம் ஜாடி' },
  { src: 'other/narmatha-kesha-raksha-oil.webp', out: 'products/narmadha-kesha-raksha-oil.webp', status: 'provisional-product', cat: 'product', en: 'Narmadha Kesha Raksha hair oil bottle', ta: 'நர்மதா கேசரக்சா தலை எண்ணெய் புட்டி' },
  { src: 'other/narmadha-omma-watter.webp', out: 'products/narmadha-omma-water.webp', status: 'provisional-product', cat: 'product', en: 'Narmadha Omam Water bottle', ta: 'நர்மதா ஓமவாட்டர் புட்டி' },
  { src: 'other/narmadha-thakasa-sooranam.webp', out: 'products/narmadha-thakasa-sooranam.webp', status: 'provisional-product', cat: 'product', en: 'Narmadha Thakasa Sooranam jar', ta: 'நர்மதா தாகச பொடி சூரணம் ஜாடி' },
  { src: 'other/narmadha-seerana-sanjeevi-sooranam.webp', out: 'products/narmadha-seerana-sanjeevi-sooranam.webp', status: 'provisional-product', cat: 'product', en: 'Narmadha Seerana Sanjeevi Sooranam jar', ta: 'நர்மதா சீரண சஞ்சீவி சூரணம் ஜாடி' },
  { src: 'other/narmadha-ular-athipalam.webp', out: 'products/narmadha-dried-fig.webp', status: 'provisional-product', cat: 'product', en: 'Bowl of dried figs (Ular Athipalam)', ta: 'உலர் அத்திப்பழம்' },
];

// Specific exclusion reasons. Anything not in the manifest and not matched here gets a directory-level reason.
export const POSTER_REASON = 'Marketing poster/ad with text baked into the image (health claims and phone numbers can’t be edited); recreate without claims';
export const excludedByPath = {
  'gallery/27.webp': 'Clevira COVID / “approved by Ministry of AYUSH” ad: claim not to be reused',
  'gallery/18.webp': 'Soap ad: baked-in text “Cures dry skin, allergy, rashes & all skin problems”',
  'gallery/23.webp': 'Product ad: baked-in text “Relieves body pains & joint pains / Cures hair damage”',
  'gallery/25.webp': 'Pain-oil ad with knee-pain illustration and relief claims in the text',
  'gallery/26.webp': 'Hair-oil ad with claim text and a stock model',
  'gallery/1.mp4': '17 MB video: needs compression and a poster frame; deferred to the media phase',
  'images/nabh.png': 'NABH badge: must not appear unless the hospital holds current NABH accreditation (add to claims review)',
  'other/clevira.jpg': 'Clevira product (COVID / AYUSH claims): not published pending doctor and lawyer review',
  'other/new/clevira.jpg': 'Duplicate of other/clevira.jpg',
  'about-us/wish.webp': 'Unidentified people (a child and an elder at a waterfall); no context or consent',
  'about-us/rajkapoor-about-us-banner.jpeg': 'Low-resolution banner with deity artwork; the same portrait is available as the cleaner doctors/s-rajkapoor.webp',
  'banners/human-heart-design.webp': 'Generic anatomical stock graphic; implies cardiac treatment claims',
  'banners/human-heart-design.jpg': 'Generic anatomical stock graphic; implies cardiac treatment claims',
  'banners/dna-unfocused-background.jpg': 'Generic DNA stock graphic; off-brand',
  'banners/organic-cannabis-product-arrangement.webp': 'Shows cannabis leaves: wrong association for an Ayurvedic hospital',
  'other/skin.jpg': 'Generic anatomical stock graphic implying treatment claims',
  'other/stroke.jpg': 'Generic anatomical stock graphic implying treatment claims',
  'other/PCOD.jpg': 'Generic anatomical stock graphic implying treatment claims',
  'other/mnd.jpg': 'Generic anatomical stock graphic implying treatment claims',
  'other/Health & Beauty.jpg': 'Generic icon, not clinic imagery',
  'other/health-and-beauty.jpg': 'Generic icon, not clinic imagery',
  'offerings/chelation-therapy.jpg': 'Chelation therapy is commented out on the old site; blood-cell stock image',
  'offerings/ayurveda-1.jpg': 'Infographic with baked-in claims (“Removes bad toxins”, “Balances hormones”)',
  'offerings/imageuploadscovered20200612imageuploadscovered20200612imageuploadscovered20200612imageuploadscovered20200612imageuploadscovered20200612imageuploadscovered20200612500jpgjpgjpgjpgjpgjpg.jpg': 'Cartoon fertility illustration; implies treatment claims',
};
