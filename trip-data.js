/* ===========================================================================
   TRIP DATA — this is the ONLY file you need to edit.
   Everything on the website is generated from what's below.

   TWO LANGUAGES
   Anywhere you see text, you can write it in one of two ways:

     "Leave home"                                  <- shows the same in both languages
     { en: "Leave home", hi: "घर से निकलना" }      <- shows Hindi when Hindi is on

   Start with plain English everywhere. Add the { en: ..., hi: ... } form only
   for the lines Mummy and Papa will actually read. Nothing breaks if a line
   has no Hindi — it just falls back to English.

   Rules: keep the quotes and commas where they are. Dates are always YYYY-MM-DD.
   Anything left as "" simply doesn't appear on the site.
   =========================================================================== */

const TRIP = {

  /* ---- 0. Passcode -------------------------------------------------------
     A shared code everyone types once to open the site. Keeps out strangers
     who stumble on the link. It is NOT real security — see README.
     Set to "" to remove the passcode screen entirely.
     ---------------------------------------------------------------------- */
  passcode: "1234",

  /* ---- 1. The basics ---------------------------------------------------- */
  title:    { en: "Our Family Trip", hi: "हमारी फैमिली ट्रिप" },
  subtitle: { en: "Placeholder — send Aditya the real details",
              hi: "अभी सिर्फ़ नमूना — असली जानकारी आनी बाकी है" },
  startDate: "2026-09-12",
  endDate:   "2026-09-19",

  travellers: [
    { id: "papa",   name: { en: "Papa",   hi: "पापा"   }, emoji: "👨" },
    { id: "mummy",  name: { en: "Mummy",  hi: "मम्मी"  }, emoji: "👩" },
    { id: "aditya", name: { en: "Aditya", hi: "आदित्य" }, emoji: "🧑" }
  ],

  /* ---- 2. Day by day ----------------------------------------------------
     One block per day. `items` show in order, top to bottom.
     type: "travel" | "stay" | "activity" | "food" | "note"
     ---------------------------------------------------------------------- */
  days: [
    {
      date: "2026-09-12",
      city:     { en: "Bengaluru → Delhi", hi: "बेंगलुरु → दिल्ली" },
      headline: { en: "Fly out in the morning", hi: "सुबह की फ़्लाइट" },
      items: [
        { time: "05:30", type: "note",
          title:  { en: "Leave home", hi: "घर से निकलना" },
          detail: { en: "Cab booked for 5:30 AM. Keep IDs in the front pocket of the bag.",
                    hi: "सुबह 5:30 की कैब बुक है। पहचान पत्र बैग की आगे वाली जेब में रखें।" } },
        { time: "08:10", type: "travel",
          title:  { en: "Flight 6E-2134 to Delhi", hi: "दिल्ली की फ़्लाइट 6E-2134" },
          detail: { en: "Terminal 1. Lands at 11:00 AM.", hi: "टर्मिनल 1। सुबह 11:00 बजे पहुँचेंगे।" } },
        { time: "13:00", type: "stay",
          title:  { en: "Check in at Hotel Placeholder", hi: "होटल में चेक-इन" },
          detail: { en: "Rooms 402 and 403.", hi: "कमरा नंबर 402 और 403।" } },
        { time: "18:00", type: "activity",
          title:  { en: "Evening walk at India Gate", hi: "शाम को इंडिया गेट" },
          detail: { en: "Easy, lots of places to sit.", hi: "आराम से, बैठने की जगह बहुत है।" } },
        { time: "20:00", type: "food",
          title:  { en: "Dinner near hotel", hi: "होटल के पास खाना" },
          detail: { en: "Pure veg place, 5 min walk.", hi: "शुद्ध शाकाहारी, 5 मिनट पैदल।" } }
      ]
    },
    {
      date: "2026-09-13",
      city:     { en: "Delhi", hi: "दिल्ली" },
      headline: { en: "Sightseeing day", hi: "घूमने का दिन" },
      items: [
        { time: "09:00", type: "food",
          title:  { en: "Breakfast at hotel", hi: "होटल में नाश्ता" },
          detail: { en: "Included in the booking.", hi: "बुकिंग में शामिल है।" } },
        { time: "10:30", type: "activity",
          title:  { en: "Placeholder monument", hi: "घूमने की जगह" },
          detail: { en: "Tickets already booked, no queue needed.", hi: "टिकट पहले से बुक हैं, लाइन में नहीं लगना है।" } },
        { time: "16:00", type: "activity",
          title:  { en: "Rest at hotel", hi: "होटल में आराम" },
          detail: { en: "Nothing planned, take it easy.", hi: "कुछ तय नहीं है, आराम कीजिए।" } }
      ]
    }
    // ... add one block like this per day
  ],

  /* ---- 3. Flights and trains -------------------------------------------- */
  travel: [
    {
      type: "flight",                       // "flight" | "train" | "bus" | "cab"
      label: "6E-2134 · IndiGo",
      date: "2026-09-12",
      from:  { en: "Bengaluru (BLR) · T1", hi: "बेंगलुरु (BLR) · T1" },
      to:    { en: "Delhi (DEL) · T2",     hi: "दिल्ली (DEL) · T2" },
      depart: "08:10",
      arrive: "11:00",
      confirmation: "ABC123",
      seats: { en: "Papa 12A · Mummy 12B · Aditya 12C", hi: "पापा 12A · मम्मी 12B · आदित्य 12C" },
      notes: { en: "Reach the airport by 6:10 AM. Web check-in done.",
               hi: "सुबह 6:10 तक एयरपोर्ट पहुँचना है। चेक-इन हो चुका है।" }
    },
    {
      type: "train",
      label: "12951 · Rajdhani Express",
      date: "2026-09-18",
      from: { en: "New Delhi (NDLS)",  hi: "नई दिल्ली (NDLS)" },
      to:   { en: "Mumbai Central (BCT)", hi: "मुंबई सेंट्रल (BCT)" },
      depart: "16:25",
      arrive: { en: "08:35 next day", hi: "अगले दिन 08:35" },
      confirmation: "4567891230",
      seats: { en: "Coach A1, Berths 21 / 22 / 23", hi: "कोच A1, बर्थ 21 / 22 / 23" },
      notes: { en: "Dinner is served on board.", hi: "खाना ट्रेन में ही मिलेगा।" }
    }
  ],

  /* ---- 4. Where we stay -------------------------------------------------- */
  stays: [
    {
      name: { en: "Hotel Placeholder", hi: "होटल (नाम आना बाकी)" },
      city: { en: "Delhi", hi: "दिल्ली" },
      checkIn:  "2026-09-12",
      checkOut: "2026-09-18",
      address: "12 Placeholder Road, Connaught Place, New Delhi 110001",
      phone: "+911140000000",
      mapUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
      confirmation: "PLACEHOLDER",
      notes: { en: "Breakfast included. Rooms 402 and 403, same floor.",
               hi: "नाश्ता शामिल है। कमरा 402 और 403, एक ही मंज़िल पर।" }
    }
  ],

  /* ---- 5. What's in whose bag -------------------------------------------
     `owner` must match a traveller id above, or use "shared".
     ---------------------------------------------------------------------- */
  bags: [
    {
      owner: "papa",
      bag: { en: "Large black suitcase", hi: "बड़ी काली सूटकेस" },
      contents: [
        { en: "5 shirts, 3 trousers, 1 sweater", hi: "5 शर्ट, 3 पैंट, 1 स्वेटर" },
        { en: "BP tablets and daily medicines — 10 days", hi: "बीपी की गोलियाँ और रोज़ की दवाइयाँ — 10 दिन की" },
        { en: "Reading glasses (spare pair)", hi: "पढ़ने का चश्मा (एक extra)" },
        { en: "Charger and power bank", hi: "चार्जर और पावर बैंक" }
      ]
    },
    {
      owner: "mummy",
      bag: { en: "Red trolley bag", hi: "लाल ट्रॉली बैग" },
      contents: [
        { en: "6 sets of clothes", hi: "6 जोड़ी कपड़े" },
        { en: "Shawl and umbrella", hi: "शॉल और छाता" },
        { en: "Medicines and Volini spray", hi: "दवाइयाँ और वोलिनी स्प्रे" },
        { en: "Dry snacks for the train", hi: "ट्रेन के लिए नाश्ता" }
      ]
    },
    {
      owner: "shared",
      bag: { en: "Blue backpack (hand luggage)", hi: "नीला बैकपैक (हाथ का सामान)" },
      contents: [
        { en: "All tickets and ID cards", hi: "सारे टिकट और पहचान पत्र" },
        { en: "First aid kit, ORS, Digene", hi: "फर्स्ट-एड, ओआरएस, डाइजीन" },
        { en: "Water bottles", hi: "पानी की बोतलें" },
        { en: "Phone chargers and a multi-plug", hi: "फ़ोन चार्जर और मल्टी-प्लग" }
      ]
    }
  ],

  /* ---- 6. Checklist ------------------------------------------------------
     Tick boxes are saved on each person's own phone.
     ---------------------------------------------------------------------- */
  checklist: [
    {
      group: { en: "Before we leave", hi: "निकलने से पहले" },
      items: [
        { en: "Aadhaar / ID cards in the backpack", hi: "आधार / पहचान पत्र बैग में" },
        { en: "Print-outs of tickets and hotel booking", hi: "टिकट और होटल बुकिंग के प्रिंट" },
        { en: "Cash withdrawn", hi: "नकद पैसे निकाल लिए" },
        { en: "Medicines for the whole trip", hi: "पूरी यात्रा की दवाइयाँ" },
        { en: "Switch off geyser, gas and main lights", hi: "गीज़र, गैस और लाइट बंद" },
        { en: "House keys given to the neighbour", hi: "घर की चाबी पड़ोसी को दी" },
        { en: "Phones and power bank fully charged", hi: "फ़ोन और पावर बैंक पूरा चार्ज" }
      ]
    },
    {
      group: { en: "Every morning", hi: "हर सुबह" },
      items: [
        { en: "Room key and phone", hi: "कमरे की चाबी और फ़ोन" },
        { en: "Water bottle filled", hi: "पानी की बोतल भरी" },
        { en: "Medicines taken", hi: "दवाई ली" },
        { en: "Wallet and ID", hi: "पर्स और पहचान पत्र" }
      ]
    }
  ],

  /* ---- 7. Important numbers ---------------------------------------------- */
  contacts: [
    { label: { en: "Aditya",           hi: "आदित्य"        }, phone: "+919999999999" },
    { label: { en: "Hotel reception",  hi: "होटल रिसेप्शन" }, phone: "+911140000000" },
    { label: { en: "Emergency",        hi: "आपातकाल"      }, phone: "112" }
  ],

  /* ---- 8. Anything else worth knowing ------------------------------------ */
  notes: [
    { en: "The hotel Wi-Fi password is on the back of the room key card.",
      hi: "होटल का वाई-फाई पासवर्ड चाबी वाले कार्ड के पीछे लिखा है।" },
    { en: "Delhi will be about 30°C in the day and cool at night — carry a light shawl.",
      hi: "दिल्ली में दिन में लगभग 30°C और रात में ठंडक — हल्की शॉल रखें।" },
    { en: "If anyone gets separated, meet back at the hotel reception.",
      hi: "अगर कोई बिछड़ जाए तो होटल रिसेप्शन पर मिलें।" }
  ]
};
