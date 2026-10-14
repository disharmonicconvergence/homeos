export interface Asset {
  id: string;
  name: string;
  category: "HVAC" | "Water & Plumbing" | "Electrical" | "Kitchen" | "Safety & Utility";
  room: string;
  brand: string;
  model: string;
  serialNumber?: string;
  purchaseDate: string;
  warrantyStatus: "Active" | "Expiring Soon" | "Expired";
  warrantyExpiry: string;
  condition: "Good" | "Needs Attention" | "Critical" | "Monitored";
  lastServiced: string;
  nextServiceDue: string;
  documents: { title: string; type: "Invoice" | "Warranty" | "Manual"; size: string }[];
  serviceHistory: { date: string; provider: string; description: string; cost: string }[];
  associatedFindingIds?: string[];
  notes?: string;
  thumbnail: string;
}

export interface Finding {
  id: string;
  title: string;
  category: "Plumbing" | "Electrical" | "Appliances" | "Moisture & Seepage" | "Fixtures & Carpentry";
  room: string;
  severity: "critical" | "high" | "medium" | "low";
  confidence: "Observed Defect" | "Suspected Concern" | "Routine Observation";
  dateDetected: string;
  inspectionType: "Home X-Ray" | "Pre-Commit Inspection";
  status: "open" | "scheduled" | "resolved" | "monitoring";
  summary: string;
  evidence: {
    description: string;
    metrics?: string;
    photoLabel: string;
    photoUrl: string;
  };
  implications: string;
  recommendedAction: string;
  estimatedCost: string;
  linkedAssetId?: string;
  linkedProviderCategory: string;
  resolutionNotes?: string;
  resolvedDate?: string;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  assetId?: string;
  assetName: string;
  category: string;
  priority: "critical" | "high" | "medium" | "low";
  dueDate: string;
  status: "pending" | "scheduled" | "completed";
  estimatedCost: string;
  recurringFrequency?: string;
  scheduledProvider?: string;
  completedDate?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: "Plumbing" | "Water Purifier" | "Electrical" | "HVAC" | "Pest Control" | "Carpentry";
  rating: number;
  reviewCount: number;
  serviceAreas: string[];
  verifiedBadges: string[];
  hourlyOrBaseRate: string;
  responseTime: string;
  description: string;
  specialties: string[];
  phone: string;
  shopImage: string;
  avatar: string;
  gigTitle: string;
  sellerLevel: string;
  startingPrice: number;
  ordersCompleted: number;
  badgeLabel?: string;
}

export interface PropertyInspection {
  id: string;
  propertyAddress: string;
  propertyType: string;
  areaSqFt: number;
  clientType: "Buyer" | "Renter";
  inspectionDate: string;
  inspectorName: string;
  overallHealthScore: number;
  summary: string;
  findings: Finding[];
  rentalBaselineItems?: {
    id: string;
    area: string;
    description: string;
    statusOnMoveIn: string;
    photoUrl: string;
    responsibilityNote: string;
  }[];
  questionsToRaise: {
    target: "Landlord" | "Seller" | "Society / Builder" | "Specialist";
    question: string;
    reason: string;
    urgency: "High" | "Medium";
  }[];
  limitations: string[];
}

export const initialHomeData = {
  profile: {
    id: "home-blr-01",
    name: "Apartment 502, Orchid Woods",
    address: "Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103",
    type: "3 BHK Apartment",
    carpetArea: "1,680 sq. ft.",
    yearBuilt: 2021,
    occupancyType: "Owner Occupied",
    residents: "Aditya & Priya Sharma",
    healthScore: 84,
    healthStatus: "Good Condition with 2 Active Action Items",
    lastInspectionDate: "04 Oct 2026",
    inspectionId: "HX-2026-BLR-0419",
    inspector: "Rajesh Varma (Certified HomeOS Building Assessor #204)",
  },
  assets: [
    {
      id: "ast-01",
      name: "Kent Grand Plus RO Water Purifier",
      category: "Kitchen" as const,
      room: "Kitchen (Under-cabinet sink area)",
      brand: "Kent",
      model: "Grand+ Mineral RO (8L Tank)",
      serialNumber: "KT-RO-2022-88219",
      purchaseDate: "15 Jul 2022",
      warrantyStatus: "Expired" as const,
      warrantyExpiry: "14 Jul 2023",
      condition: "Needs Attention" as const,
      lastServiced: "12 Aug 2025 (14 months ago)",
      nextServiceDue: "Overdue (Recommended Oct 2026)",
      documents: [
        { title: "Invoice_Croma_Jul2022.pdf", type: "Invoice", size: "1.2 MB" },
        { title: "Kent_Warranty_Card.pdf", type: "Warranty", size: "850 KB" },
        { title: "Kent_Grand_User_Manual.pdf", type: "Manual", size: "2.4 MB" },
      ],
      serviceHistory: [
        { date: "12 Aug 2025", provider: "AquaPure Solutions", description: "Replaced inline carbon and sediment filter cartridge", cost: "₹1,850" },
        { date: "10 Jul 2024", provider: "Authorized Kent Service", description: "Annual maintenance service & TDS membrane sanitization", cost: "₹2,200" },
      ],
      associatedFindingIds: ["fnd-02"],
      notes: "TDS input 410 ppm, output 68 ppm. Flow rate dropped to 7.5L/hr. Replacement of pre-filter candle and carbon filter required immediately.",
      thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "ast-02",
      name: "Daikin 1.5 Ton 5-Star Inverter AC",
      category: "HVAC" as const,
      room: "Master Bedroom",
      brand: "Daikin",
      model: "FTKM50TV 5-Star Neo Inverter",
      serialNumber: "DKN-INV-50-9931",
      purchaseDate: "20 Mar 2023",
      warrantyStatus: "Active" as const,
      warrantyExpiry: "19 Mar 2028 (Compressor 10-Yr)",
      condition: "Good" as const,
      lastServiced: "18 Apr 2026",
      nextServiceDue: "18 Nov 2026 (Pre-winter deep clean)",
      documents: [
        { title: "Daikin_Tax_Invoice.pdf", type: "Invoice", size: "1.4 MB" },
        { title: "Daikin_10Yr_Compressor_Warranty.pdf", type: "Warranty", size: "920 KB" },
      ],
      serviceHistory: [
        { date: "18 Apr 2026", provider: "CoolBreeze HVAC", description: "Jet pump foam wash, drain pipe clearance, refrigerant pressure check (135 PSI)", cost: "₹1,200" },
        { date: "02 May 2025", provider: "CoolBreeze HVAC", description: "Summer pre-season routine servicing", cost: "₹950" },
      ],
      thumbnail: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "ast-03",
      name: "AO Smith 25L Vertical Storage Geyser",
      category: "Water & Plumbing" as const,
      room: "Master Bathroom",
      brand: "AO Smith",
      model: "HSE-SHS-025 Blue Diamond Glass Lined",
      serialNumber: "AOS-25-77102",
      purchaseDate: "10 Oct 2021",
      warrantyStatus: "Active" as const,
      warrantyExpiry: "09 Oct 2028 (Inner Tank)",
      condition: "Monitored" as const,
      lastServiced: "15 Oct 2024",
      nextServiceDue: "15 Dec 2026 (Anode rod check)",
      documents: [
        { title: "AO_Smith_Invoice_2021.pdf", type: "Invoice", size: "1.1 MB" },
        { title: "Inner_Tank_Warranty.pdf", type: "Warranty", size: "640 KB" },
      ],
      serviceHistory: [
        { date: "15 Oct 2024", provider: "CleanFlow Plumbing", description: "Inspected sacrificial magnesium anode and de-scaled heating element", cost: "₹1,100" },
      ],
      notes: "Earthing connection verified at 0.8 Ohms during Home X-Ray. Operational safety valve functioning properly.",
      thumbnail: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "ast-04",
      name: "Schneider Electric MCB Distribution Board",
      category: "Electrical" as const,
      room: "Foyer / Main Utility Enclosure",
      brand: "Schneider Electric",
      model: "Acti9 12-Way Double Door DB with 40A 30mA RCCB",
      purchaseDate: "15 Jan 2021",
      warrantyStatus: "Active" as const,
      warrantyExpiry: "14 Jan 2031",
      condition: "Good" as const,
      lastServiced: "04 Oct 2026 (During Home X-Ray)",
      nextServiceDue: "04 Oct 2027",
      documents: [
        { title: "Schneider_DB_Layout_Diagram.pdf", type: "Manual", size: "3.1 MB" },
      ],
      serviceHistory: [
        { date: "04 Oct 2026", provider: "HomeOS Assessor", description: "Trip-tested 30mA RCCB test button (28ms response), thermal scan of busbar connections", cost: "Included in X-Ray" },
      ],
      notes: "Dual supply inverter line switch and surge arrester fully operational. No thermal hotspots detected.",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "ast-05",
      name: "Bosch Serie 6 7kg Front Load Washer",
      category: "Kitchen" as const,
      room: "Kitchen Utility Balcony",
      brand: "Bosch",
      model: "WAJ28262IN EcoSilence Drive",
      serialNumber: "BSH-FL-70-1120",
      purchaseDate: "12 Nov 2022",
      warrantyStatus: "Active" as const,
      warrantyExpiry: "11 Nov 2032 (Motor)",
      condition: "Good" as const,
      lastServiced: "15 Sep 2026",
      nextServiceDue: "15 Mar 2027",
      documents: [
        { title: "Bosch_Washer_Invoice.pdf", type: "Invoice", size: "1.3 MB" },
      ],
      serviceHistory: [
        { date: "15 Sep 2026", provider: "Self / Homeowner", description: "Descaled drum using Bosch manufacturer tablet, cleared coin trap filter", cost: "₹350" },
      ],
      thumbnail: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "ast-06",
      name: "Sintex Pure 1000L Overhead Tank & V-Guard Pump",
      category: "Safety & Utility" as const,
      room: "Rooftop Common Duct / Utility Supply",
      brand: "Sintex & V-Guard",
      model: "Sintex 4-Layer Antibacterial + V-Guard 1HP Submersible",
      purchaseDate: "05 Feb 2021",
      warrantyStatus: "Active" as const,
      warrantyExpiry: "04 Feb 2028",
      condition: "Monitored" as const,
      lastServiced: "10 Jun 2026",
      nextServiceDue: "10 Dec 2026 (Quarterly deep scrub)",
      documents: [
        { title: "Tank_Cleaning_Certificate_Jun2026.pdf", type: "Manual", size: "750 KB" },
      ],
      serviceHistory: [
        { date: "10 Jun 2026", provider: "TankClean Solutions", description: "Pressure wash, sludge extraction, and UV sterilization treatment", cost: "₹1,400" },
      ],
      notes: "Connected to HomeOS telemetry preview. Current level: 74% (Adequate 24-hr reserve).",
      thumbnail: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=400&q=80",
    },
  ],
  findings: [
    {
      id: "fnd-01",
      title: "Sub-surface dampness detected behind Master Bathroom dry wall",
      category: "Moisture & Seepage" as const,
      room: "Master Bedroom (Adjacent to Shower Mixer)",
      severity: "high" as const,
      confidence: "Observed Defect" as const,
      dateDetected: "04 Oct 2026",
      inspectionType: "Home X-Ray" as const,
      status: "scheduled" as const,
      summary: "Non-invasive moisture meter detected 26% relative dampness along the shared partition wall behind the master wardrobe baseboard.",
      evidence: {
        description: "Pinless moisture meter registered 26% (normal baseline <12%). Micro-efflorescence salt deposits visible behind skirting board. Shower mixer escutcheon flange in the bathroom has degraded silicone seal.",
        metrics: "Moisture Level: 26% (Threshold >15% triggers alert) • Area affected: 0.8 sq. meter",
        photoLabel: "Moisture meter reading & baseboard salt crystal formation",
        photoUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      },
      implications: "If left unattended before the upcoming wet season, moisture may penetrate wooden wardrobe cabinetry and trigger mold spores behind clothing.",
      recommendedAction: "Reseal shower mixer fixture flange with anti-fungal sanitary silicone and regrout tile joints around the wet shower stall.",
      estimatedCost: "₹1,800 - ₹2,500",
      linkedProviderCategory: "Plumbing",
      resolutionNotes: "Service booked with CleanFlow Plumbing for Saturday 18 Oct at 10:30 AM.",
    },
    {
      id: "fnd-02",
      title: "Sediment & carbon filter cartridge life exceeded on RO purifier",
      category: "Appliances" as const,
      room: "Kitchen",
      severity: "medium" as const,
      confidence: "Observed Defect" as const,
      dateDetected: "04 Oct 2026",
      inspectionType: "Home X-Ray" as const,
      status: "open" as const,
      summary: "Water purifier filters last replaced 14 months ago; filtration flow rate has reduced by ~50% indicating membrane stress.",
      evidence: {
        description: "Pre-sediment filter housing shows heavy reddish sediment accumulation from municipal borewell line. Pure water flow rate clocked at 7.5 Litres/hour vs rated 15 L/hr.",
        metrics: "Raw Water TDS: 410 ppm • Output TDS: 68 ppm • Flow: 7.5 L/hr (Rated 15 L/hr)",
        photoLabel: "Clogged spun sediment candle inside clear pre-filter bowl",
        photoUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
      },
      implications: "Stressed RO booster pump risks burnout; reduced flow creates water wastage and potential bacterial breakthrough.",
      recommendedAction: "Replace external spun candle (5-micron) and internal activated carbon block. Sanitize 8L food-grade storage chamber.",
      estimatedCost: "₹1,800 - ₹2,200",
      linkedAssetId: "ast-01",
      linkedProviderCategory: "Water Purifier",
    },
    {
      id: "fnd-03",
      title: "Living balcony sliding UPVC track drainage weep holes clogged",
      category: "Fixtures & Carpentry" as const,
      room: "Living Room Balcony",
      severity: "low" as const,
      confidence: "Observed Defect" as const,
      dateDetected: "04 Oct 2026",
      inspectionType: "Home X-Ray" as const,
      status: "resolved" as const,
      summary: "Dust and construction debris settled in exterior slider drainage slots, causing water retention in aluminum track during rains.",
      evidence: {
        description: "Both outer weep hole flap valves blocked with urban dust crust. Roller friction noticeable on left sliding shutter.",
        metrics: "Track drainage clearance: 10% operational",
        photoLabel: "Debris clogging weep hole outlet channel",
        photoUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      },
      implications: "Water pooling during torrential downpours can overflow the bottom rail threshold onto the engineered wooden living room flooring.",
      recommendedAction: "Clear slots using narrow vacuum crevice tool & nylon bristle; lubricate rollers with dry silicone spray.",
      estimatedCost: "₹0 (DIY) or ₹500 handyman visit",
      linkedProviderCategory: "Carpentry",
      resolvedDate: "10 Oct 2026",
      resolutionNotes: "Homeowner cleared debris with vacuum nozzle and flushed track with warm water. Drainage flap operates freely.",
    },
  ],
  tasks: [
    {
      id: "tsk-01",
      title: "Replace RO Purifier Sediment & Carbon Cartridges",
      assetId: "ast-01",
      assetName: "Kent Grand Plus RO Water Purifier",
      category: "Water Filter Maintenance",
      priority: "high" as const,
      dueDate: "16 Oct 2026",
      status: "pending" as const,
      estimatedCost: "₹1,800",
      recurringFrequency: "Every 12 Months",
    },
    {
      id: "tsk-02",
      title: "Master Shower Grouting & Silicone Flange Seal",
      category: "Plumbing & Waterproofing",
      assetName: "Master Bath Wet Stall",
      priority: "high" as const,
      dueDate: "18 Oct 2026",
      status: "scheduled" as const,
      estimatedCost: "₹2,200",
      scheduledProvider: "CleanFlow Plumbing & Waterproofing",
    },
    {
      id: "tsk-03",
      title: "Daikin AC Pre-Winter Dry Coil Foam Wash",
      assetId: "ast-02",
      assetName: "Daikin 1.5T Inverter AC",
      category: "HVAC Maintenance",
      priority: "low" as const,
      dueDate: "15 Nov 2026",
      status: "pending" as const,
      estimatedCost: "₹1,200",
      recurringFrequency: "Every 6 Months",
    },
    {
      id: "tsk-04",
      title: "Overhead 1000L Sintex Tank Sludge Clean & UV Flush",
      assetId: "ast-06",
      assetName: "Sintex Overhead Tank",
      category: "Water Hygiene",
      priority: "medium" as const,
      dueDate: "10 Dec 2026",
      status: "pending" as const,
      estimatedCost: "₹1,400",
      recurringFrequency: "Quarterly",
    },
    {
      id: "tsk-05",
      title: "Balcony UPVC slider rail drainage hole clearance",
      category: "Fixtures",
      assetName: "Living Balcony Sliders",
      priority: "low" as const,
      dueDate: "10 Oct 2026",
      status: "completed" as const,
      estimatedCost: "₹0",
      completedDate: "10 Oct 2026",
    },
  ],
  timeline: [
    {
      id: "tme-01",
      date: "10 Oct 2026",
      title: "Balcony Weep Hole Maintenance Completed",
      type: "maintenance_completed",
      description: "Resolved Finding #FND-03: Flushed exterior sliding track channels and lubricated roller bearings.",
      actor: "Aditya Sharma (Homeowner)",
    },
    {
      id: "tme-02",
      date: "06 Oct 2026",
      title: "Repair Scheduled with CleanFlow Plumbing",
      type: "service_scheduled",
      description: "Confirmed technician visit for Saturday, 18 Oct at 10:30 AM for Master Bath sealant.",
      actor: "HomeOS Concierge",
    },
    {
      id: "tme-03",
      date: "04 Oct 2026",
      title: "Home X-Ray Inspection Conducted",
      type: "inspection",
      description: "Certified assessor Rajesh Varma inspected 5 systems across 6 zones. Generated Home Health Report HX-2026-BLR-0419.",
      actor: "Rajesh Varma (Assessor)",
    },
    {
      id: "tme-04",
      date: "15 Sep 2026",
      title: "Washing Machine Drum Descale",
      type: "maintenance_completed",
      description: "Routine 90°C hygiene cycle run with descaling tablets.",
      actor: "Aditya Sharma",
    },
    {
      id: "tme-05",
      date: "18 Apr 2026",
      title: "Annual Pre-Summer AC Servicing",
      type: "service_completed",
      description: "CoolBreeze HVAC serviced Daikin 1.5T AC with jet pressure wash and amp draw calibration.",
      actor: "CoolBreeze HVAC",
    },
  ],
  monitoring: {
    disclaimer: "Simulated demonstration telemetry. Real deployments connect via compatible Zigbee / WiFi hardware bridges.",
    waterTank: {
      overheadLevelPercent: 74,
      overheadVolumeLiters: 740,
      overheadCapacityLiters: 1000,
      sumpLevelPercent: 91,
      sumpVolumeLiters: 4550,
      sumpCapacityLiters: 5000,
      pumpStatus: "Idle (Auto-start threshold: <40%)",
      lastInflowTimestamp: "Today, 06:15 AM (Municipal supply active)",
      leakDetected: false,
    },
    electricity: {
      currentLoadWatts: 1140,
      todayConsumptionKwh: 11.8,
      estimatedMonthlyBill: "₹3,420 (BESCOM Slab 3)",
      voltage: "231 V (Nominal 220-240V)",
      frequency: "50.1 Hz",
      earthingResistance: "0.8 Ohms (Safe < 2.0 Ohms)",
      status: "Stable • No phase imbalance",
    },
    leakSensors: [
      { id: "ls-1", location: "Under Kitchen RO Sink", status: "Dry • Normal", lastPing: "1 min ago" },
      { id: "ls-2", location: "Master Bath Geyser Enclosure", status: "Dry • Normal", lastPing: "1 min ago" },
      { id: "ls-3", location: "Washing Machine Utility Tap", status: "Dry • Normal", lastPing: "2 mins ago" },
    ],
  },
};

export const providersList: ServiceProvider[] = [
  {
    id: "sp-01",
    name: "CleanFlow Plumbing & Waterproofing",
    category: "Plumbing",
    rating: 4.9,
    reviewCount: 184,
    serviceAreas: ["Bellandur", "HSR Layout", "Sarjapur Road", "Koramangala"],
    verifiedBadges: ["Trade Certified", "Background Verified", "HomeOS Partner"],
    hourlyOrBaseRate: "₹450 inspection visit",
    responseTime: "Within 2 Hours",
    description: "Specialists in non-invasive thermal leakage detection, wet area epoxy regrouting, bathroom sanitary installations, and pressure testing.",
    specialties: ["Thermal Leak Detection", "Shower Grouting", "Pressure Boosting", "Sanitary Fittings"],
    phone: "+91 98450 12844",
    shopImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    gigTitle: "I will diagnose concealed bathroom seepage, regrout tiles and fix sanitary plumbing",
    sellerLevel: "Top Rated Partner",
    badgeLabel: "HomeOS Choice",
    startingPrice: 450,
    ordersCompleted: 248,
  },
  {
    id: "sp-02",
    name: "AquaPure Solutions & Spares",
    category: "Water Purifier",
    rating: 4.8,
    reviewCount: 320,
    serviceAreas: ["All Bengaluru East & South"],
    verifiedBadges: ["Authorized Kent/Eureka Spares", "Background Verified"],
    hourlyOrBaseRate: "₹350 visit + genuine parts",
    responseTime: "Same Day Available",
    description: "Independent multi-brand water purifier care. Stocks 100% genuine NSF-certified sediment filters, Dow Filmtec RO membranes, and UV lamps.",
    specialties: ["Filter Replacements", "Membrane Descaling", "TDS Calibration", "Annual Maintenance Contracts"],
    phone: "+91 80 4123 9988",
    shopImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    gigTitle: "I will service multi-brand RO purifiers with certified Dow membranes and TDS calibration",
    sellerLevel: "Level 2 Verified",
    badgeLabel: "Authorized Spares",
    startingPrice: 350,
    ordersCompleted: 410,
  },
  {
    id: "sp-03",
    name: "VoltCraft Electrical Systems",
    category: "Electrical",
    rating: 4.9,
    reviewCount: 142,
    serviceAreas: ["Bellandur", "Whitefield", "Indiranagar", "Marathahalli"],
    verifiedBadges: ["Licensed Electricians (Class 1)", "Govt. Approved"],
    hourlyOrBaseRate: "₹400 standard visit",
    responseTime: "Within 3 Hours",
    description: "Certified wiremen for residential switchboards, RCCB/ELCB tripping diagnostics, inverter wiring, and EV charger point installations.",
    specialties: ["RCCB Safety Audits", "Inverter Line Wiring", "Short Circuit Repair", "Earthing Pit Health"],
    phone: "+91 97312 88401",
    shopImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    gigTitle: "I will resolve MCB/RCCB tripping, audit residential earthing and repair electrical loads",
    sellerLevel: "Top Rated Partner",
    badgeLabel: "Govt. Licensed",
    startingPrice: 400,
    ordersCompleted: 189,
  },
  {
    id: "sp-04",
    name: "CoolBreeze HVAC & Climate Care",
    category: "HVAC",
    rating: 4.7,
    reviewCount: 215,
    serviceAreas: ["Bengaluru Urban"],
    verifiedBadges: ["Certified Refrigerant Technicians", "Eco-Friendly Cleaning"],
    hourlyOrBaseRate: "₹799 deep foam jet wash",
    responseTime: "Next Day Slots",
    description: "Specialized in indoor inverter split AC maintenance using high-pressure foam jets that remove 99% allergen buildup without damaging cooling fins.",
    specialties: ["Foam Jet Wash", "R32/R410A Gas Leak Fix", "PCB Board Diagnostics", "Copper Line Insulation"],
    phone: "+91 99001 55670",
    shopImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    gigTitle: "I will perform high-pressure foam jet wash, gas calibration and AC leak fixes",
    sellerLevel: "Level 2 Verified",
    badgeLabel: "Eco Jet Cleaning",
    startingPrice: 799,
    ordersCompleted: 320,
  },
  {
    id: "sp-05",
    name: "UrbanShield Pest & Termite Defense",
    category: "Pest Control",
    rating: 4.8,
    reviewCount: 98,
    serviceAreas: ["Bengaluru South & East"],
    verifiedBadges: ["Odorless Bayer Chemicals", "Eco-Friendly"],
    hourlyOrBaseRate: "₹1,200 for 3BHK herbal treatment",
    responseTime: "24 Hours Notice",
    description: "Targeted perimeter spray and gel baiting for cockroach eradication, plumbing duct termite barriers, and bed bug thermal treatments.",
    specialties: ["Herbal Cockroach Gel", "Subterranean Termite Treatment", "Drainage Pipe Shielding"],
    phone: "+91 80 2234 1190",
    shopImage: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    gigTitle: "I will provide 100% odorless herbal cockroach eradication and drainage pipe defense",
    sellerLevel: "Top Rated Partner",
    badgeLabel: "Bayer Certified",
    startingPrice: 1200,
    ordersCompleted: 165,
  },
  {
    id: "sp-06",
    name: "WoodCraft Fixtures & Sliders",
    category: "Carpentry",
    rating: 4.9,
    reviewCount: 110,
    serviceAreas: ["Bengaluru Urban"],
    verifiedBadges: ["Master Carpenter", "Hardware Specialist"],
    hourlyOrBaseRate: "₹500 handyman visit",
    responseTime: "Within 4 Hours",
    description: "Specialized repair for UPVC balcony sliding tracks, wardrobe soft-close hydraulic dampers, wooden door latch alignments, and weep hole restoration.",
    specialties: ["UPVC Slider Tracks", "Hydraulic Hinges", "Weep Hole Clearance", "Door Realignment"],
    phone: "+91 98801 23410",
    shopImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    gigTitle: "I will repair balcony sliding door tracks, lubricate rollers and align fixtures",
    sellerLevel: "Level 1 Verified",
    badgeLabel: "Hardware Pro",
    startingPrice: 500,
    ordersCompleted: 140,
  },
];

export const samplePreCommitReport: PropertyInspection = {
  id: "PIR-2026-BLR-0902",
  propertyAddress: "Flat 701, Tower 4, Prestige Ferns Residency, Harlur Road, Bengaluru 560102",
  propertyType: "3 BHK Premium Apartment",
  areaSqFt: 1750,
  clientType: "Renter",
  inspectionDate: "12 Oct 2026",
  inspectorName: "Vikram Sengupta (HomeOS Senior Property Inspector)",
  overallHealthScore: 78,
  summary: "Comprehensive visual and operational assessment conducted prior to rental lease signing. The apartment is in broadly good structural and habitable condition, but has 4 observable items and pre-existing cosmetic damages that should be formally documented and addressed by the landlord before security deposit execution.",
  findings: [
    {
      id: "pir-fnd-01",
      title: "Visible paint peeling and moisture efflorescence near Utility exterior window",
      category: "Moisture & Seepage",
      room: "Utility Area",
      severity: "medium",
      confidence: "Observed Defect",
      dateDetected: "12 Oct 2026",
      inspectionType: "Pre-Commit Inspection",
      status: "open",
      summary: "Moisture trapped below sill of utility balcony louvered window; paint flaking across 4 sq ft area.",
      evidence: {
        description: "External window sealant has perished under direct sun exposure, allowing monsoon rainwater seepages along the sill brickwork.",
        metrics: "Moisture reader: 18% along lower window sill",
        photoLabel: "Flaking paint and powdery salt deposits beneath utility window sill",
        photoUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      },
      implications: "Will worsen during upcoming wet spells; prospective tenant should request owner repair before moving electronic laundry appliances in.",
      recommendedAction: "Request landlord/owner to scrape peeling paint, apply waterproof polymer putty, and re-caulk exterior window frame with polyurethane silicone.",
      estimatedCost: "₹2,500 (Landlord responsibility)",
      linkedProviderCategory: "Plumbing",
    },
    {
      id: "pir-fnd-02",
      title: "Master bedroom geyser pressure release valve weeping water",
      category: "Plumbing",
      room: "Master Bathroom",
      severity: "medium",
      confidence: "Observed Defect",
      dateDetected: "12 Oct 2026",
      inspectionType: "Pre-Commit Inspection",
      status: "open",
      summary: "25L geyser PRV (Pressure Relief Valve) drips continuously into the false ceiling crawl space when turned on.",
      evidence: {
        description: "No dedicated drainage tube connected from PRV outlet pipe. Water dripping directly onto false ceiling gypsum board support channel.",
        metrics: "Drip rate: ~15 ml per heating cycle",
        photoLabel: "Geyser safety valve dripping onto gypsum ceiling frame",
        photoUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
      },
      implications: "Could cause gypsum water-staining, ceiling sagging, or short-circuiting of nearby ceiling spotlights.",
      recommendedAction: "Direct technician to attach a transparent silicone drain tail leading down into the shower drain floor line.",
      estimatedCost: "₹600 - ₹900 (Landlord repair)",
      linkedProviderCategory: "Plumbing",
    },
    {
      id: "pir-fnd-03",
      title: "Loose 16A power socket in Kitchen appliance counter",
      category: "Electrical",
      room: "Modular Kitchen",
      severity: "high",
      confidence: "Observed Defect",
      dateDetected: "12 Oct 2026",
      inspectionType: "Pre-Commit Inspection",
      status: "open",
      summary: "16A microwave/oven socket gang box is detached from the wall tile anchor, exposing live conductors when plug is removed.",
      evidence: {
        description: "Both internal brass anchors stripped. Pulling a heavy 3-pin plug pulls the faceplate outward by 12mm.",
        metrics: "Live voltage detected: 232V AC • Ground intact but mechanical housing insecure",
        photoLabel: "Exposed wiring behind loose 16A appliance socket faceplate",
        photoUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      },
      implications: "Critical fire hazard and electric shock risk when handling high-draw kitchen heating appliances.",
      recommendedAction: "Owner's electrician must replace internal modular metal box anchor screws and secure faceplate flush with wall tile.",
      estimatedCost: "₹450 (Landlord responsibility)",
      linkedProviderCategory: "Electrical",
    },
  ],
  rentalBaselineItems: [
    {
      id: "base-01",
      area: "Bedroom 2 (Guest Bed)",
      description: "Existing 15cm scuff mark and adhesive tape discoloration on east wall from previous tenant's wall hanger.",
      statusOnMoveIn: "Pre-existing scratch documented before move-in",
      photoUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      responsibilityNote: "Tenant is NOT liable for painting deduction upon lease expiration for this wall segment.",
    },
    {
      id: "base-02",
      area: "Dining Room Flooring",
      description: "Small hairline chip (approx 8mm) on vitrified floor tile near balcony door threshold.",
      statusOnMoveIn: "Pre-existing chipped tile documented",
      photoUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      responsibilityNote: "Pre-existing mechanical chip. Landlord acknowledged tile was damaged prior to Oct 2026 tenancy.",
    },
    {
      id: "base-03",
      area: "Kitchen Granite Countertop",
      description: "Minor faint lemon/acid ring stain (diameter 5cm) near sink cut-out.",
      statusOnMoveIn: "Pre-existing etched surface mark",
      photoUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      responsibilityNote: "Photographic timestamp recorded in HomeOS digital ledger.",
    },
  ],
  questionsToRaise: [
    {
      target: "Landlord",
      question: "Will the landlord agree to have the loose 16A kitchen socket fixed and the geyser drain line routed before handing over the keys on Nov 1?",
      reason: "Electrical safety hazard and water dripping on false ceiling must be remediated prior to furniture move-in.",
      urgency: "High",
    },
    {
      target: "Landlord",
      question: "Can we include the dated HomeOS Pre-Commit Baseline Report as Annexure B in the registered rental agreement?",
      reason: "Ensures the 3 pre-existing damages (scuff mark, tile chip, granite ring) cannot be deducted from the security deposit upon checkout.",
      urgency: "High",
    },
    {
      target: "Society / Builder",
      question: "What is the typical water schedule and tanker dependency in Tower 4 during peak summer months (March-May)?",
      reason: "Visual water pressure test showed 1.4 Bar, which is adequate, but building management should clarify if softened water is supplied 24/7.",
      urgency: "Medium",
    },
    {
      target: "Seller",
      question: "Are all appliance warranty transfer cards (Daikin ACs, Faber Chimney) available with proof of original purchase invoices?",
      reason: "Essential for ongoing warranty claims and servicing without paying retail spare prices.",
      urgency: "Medium",
    },
  ],
  limitations: [
    "Non-invasive visual and operational inspection only. Concealed wall plumbing pipes and embedded rebar could not be tested without destructive breaking.",
    "Electrical testing limited to socket polarity, RCCB trip response, and external voltage measurements. Concealed conduit load capacity not certified.",
    "Report does not certify structural foundation integrity, legal property title, encumbrance certificates, or municipal building plan approvals.",
    "Elevator machinery, common diesel generator sets, and shared rooftop fire sprinklers fall under Apartment Owners Association jurisdiction and were not individually audited.",
  ],
};
