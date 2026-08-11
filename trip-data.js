/* ===========================================================================
   TRIP DATA — this is the ONLY file you need to edit.
   Everything on the website is generated from what's below.
   Rules: keep the quotes and commas exactly where they are, just change text.
   Anything you leave as "" (empty) simply won't show up on the site.
   =========================================================================== */

const TRIP = {

  /* ---- 1. The basics ---------------------------------------------------- */
  title: "Our Family Trip",
  subtitle: "Placeholder — send Aditya the real details",
  startDate: "2026-09-12",        // always YYYY-MM-DD
  endDate: "2026-09-19",
  homeCity: "Bengaluru",

  travellers: [
    { id: "papa",   name: "Papa",   emoji: "👨" },
    { id: "mummy",  name: "Mummy",  emoji: "👩" },
    { id: "aditya", name: "Aditya", emoji: "🧑" }
  ],

  /* ---- 2. Day by day ----------------------------------------------------
     One block per day. `items` are shown in order, top to bottom.
     type: "travel" | "stay" | "activity" | "food" | "note"
     ---------------------------------------------------------------------- */
  days: [
    {
      date: "2026-09-12",
      city: "Bengaluru → Delhi",
      headline: "Fly out in the morning",
      items: [
        { time: "05:30", type: "note",     title: "Leave home",            detail: "Cab booked for 5:30 AM. Keep IDs in the front pocket of the bag." },
        { time: "08:10", type: "travel",   title: "Flight 6E-2134 to Delhi", detail: "Terminal 1, Gate to be checked on arrival. Lands 11:00 AM." },
        { time: "13:00", type: "stay",     title: "Check in at Hotel Placeholder", detail: "Rooms 402 and 403." },
        { time: "18:00", type: "activity", title: "Evening walk at India Gate", detail: "Easy, lots of places to sit." },
        { time: "20:00", type: "food",     title: "Dinner near hotel",     detail: "Pure veg place, 5 min walk." }
      ]
    },
    {
      date: "2026-09-13",
      city: "Delhi",
      headline: "Sightseeing day",
      items: [
        { time: "09:00", type: "food",     title: "Breakfast at hotel",    detail: "Included in the booking." },
        { time: "10:30", type: "activity", title: "Placeholder monument",  detail: "Tickets already booked, no queue needed." },
        { time: "16:00", type: "activity", title: "Rest at hotel",         detail: "Nothing planned, take it easy." }
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
      from: "Bengaluru (BLR) · Terminal 1",
      to: "Delhi (DEL) · Terminal 2",
      depart: "08:10",
      arrive: "11:00",
      confirmation: "PNR ABC123",
      seats: "Papa 12A · Mummy 12B · Aditya 12C",
      notes: "Reach the airport by 6:10 AM. Web check-in done."
    },
    {
      type: "train",
      label: "12951 · Rajdhani Express",
      date: "2026-09-18",
      from: "New Delhi (NDLS)",
      to: "Mumbai Central (BCT)",
      depart: "16:25",
      arrive: "08:35 next day",
      confirmation: "PNR 4567891230",
      seats: "Coach A1, Berths 21 / 22 / 23",
      notes: "Dinner is served on board."
    }
  ],

  /* ---- 4. Where we stay -------------------------------------------------- */
  stays: [
    {
      name: "Hotel Placeholder",
      city: "Delhi",
      checkIn: "2026-09-12",
      checkOut: "2026-09-18",
      address: "12 Placeholder Road, Connaught Place, New Delhi 110001",
      phone: "+911140000000",
      mapUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
      confirmation: "Booking #PLACEHOLDER",
      notes: "Breakfast included. Rooms 402 and 403, same floor."
    }
  ],

  /* ---- 5. What's in whose bag -------------------------------------------
     `owner` must match one of the traveller ids above, or use "shared".
     ---------------------------------------------------------------------- */
  bags: [
    {
      owner: "papa",
      bag: "Large black suitcase",
      contents: [
        "5 shirts, 3 trousers, 1 sweater",
        "BP tablets and daily medicines — 10 days",
        "Reading glasses (spare pair)",
        "Charger and power bank"
      ]
    },
    {
      owner: "mummy",
      bag: "Red trolley bag",
      contents: [
        "6 sets of clothes",
        "Shawl and umbrella",
        "Medicines and Volini spray",
        "Dry snacks for the train"
      ]
    },
    {
      owner: "shared",
      bag: "Blue backpack (hand luggage)",
      contents: [
        "All tickets and ID cards",
        "First aid kit, ORS, Digene",
        "Water bottles",
        "Phone chargers and a multi-plug"
      ]
    }
  ],

  /* ---- 6. Checklist before leaving --------------------------------------
     These tick boxes are saved on each person's own phone.
     ---------------------------------------------------------------------- */
  checklist: [
    {
      group: "Before we leave",
      items: [
        "Aadhaar / ID cards in the backpack",
        "Print-outs of tickets and hotel booking",
        "Cash withdrawn",
        "Medicines for the whole trip",
        "Switch off geyser, gas and main lights",
        "Give the house keys to the neighbour",
        "Charge phones and power bank fully"
      ]
    },
    {
      group: "Every morning",
      items: [
        "Room key and phone",
        "Water bottle filled",
        "Medicines taken",
        "Wallet and ID"
      ]
    }
  ],

  /* ---- 7. Important numbers ---------------------------------------------- */
  contacts: [
    { label: "Aditya",           phone: "+919999999999" },
    { label: "Hotel reception",  phone: "+911140000000" },
    { label: "Emergency (India)", phone: "112" }
  ],

  /* ---- 8. Anything else worth knowing ------------------------------------ */
  notes: [
    "Wi-Fi password at the hotel is on the back of the room key card.",
    "Delhi will be around 30°C in the day and cool at night — carry a light shawl.",
    "If anyone gets separated, meet back at the hotel reception."
  ]
};
