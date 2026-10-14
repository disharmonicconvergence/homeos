import { initialHomeData, providersList, samplePreCommitReport, type Asset, type Finding, type MaintenanceTask, type PropertyInspection } from "./mockData";

const STORAGE_KEY = "homeos_state_v1";

export interface HomeOSState {
  profile: typeof initialHomeData.profile;
  assets: Asset[];
  findings: Finding[];
  tasks: MaintenanceTask[];
  timeline: typeof initialHomeData.timeline;
  monitoring: typeof initialHomeData.monitoring;
  preCommitReport: PropertyInspection;
  recentBookings: any[];
  quoteInquiries: any[];
}

export function getDefaultState(): HomeOSState {
  return {
    profile: { ...initialHomeData.profile },
    assets: JSON.parse(JSON.stringify(initialHomeData.assets)),
    findings: JSON.parse(JSON.stringify(initialHomeData.findings)),
    tasks: JSON.parse(JSON.stringify(initialHomeData.tasks)),
    timeline: JSON.parse(JSON.stringify(initialHomeData.timeline)),
    monitoring: JSON.parse(JSON.stringify(initialHomeData.monitoring)),
    preCommitReport: JSON.parse(JSON.stringify(samplePreCommitReport)),
    recentBookings: [],
    quoteInquiries: [],
  };
}

export function getStoredState(): HomeOSState {
  if (typeof window === "undefined") {
    return getDefaultState();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const def = getDefaultState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
      return def;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse HomeOS state from localStorage", e);
    return getDefaultState();
  }
}

export function saveState(state: HomeOSState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("homeos:state-changed", { detail: state }));
  } catch (e) {
    console.error("Failed to save HomeOS state", e);
  }
}

export function updateFindingStatus(
  findingId: string,
  newStatus: "open" | "scheduled" | "resolved" | "monitoring",
  resolutionNotes?: string
): HomeOSState {
  const state = getStoredState();
  const finding = state.findings.find((f) => f.id === findingId);
  if (finding) {
    const oldStatus = finding.status;
    finding.status = newStatus;
    if (resolutionNotes) {
      finding.resolutionNotes = resolutionNotes;
    }
    if (newStatus === "resolved") {
      finding.resolvedDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      
      // Update health score
      state.profile.healthScore = Math.min(100, state.profile.healthScore + 6);
      
      // Add timeline event
      state.timeline.unshift({
        id: `tme-${Date.now()}`,
        date: finding.resolvedDate,
        title: `Finding Resolved: ${finding.title}`,
        type: "maintenance_completed",
        description: resolutionNotes || `Issue marked as resolved in ${finding.room}.`,
        actor: "Aditya Sharma (Homeowner)",
      });

      // If linked task exists, mark completed
      const linkedTask = state.tasks.find((t) => t.title.toLowerCase().includes(finding.category.toLowerCase()) || (finding.linkedAssetId && t.assetId === finding.linkedAssetId));
      if (linkedTask) {
        linkedTask.status = "completed";
        linkedTask.completedDate = finding.resolvedDate;
      }
    } else if (newStatus === "scheduled") {
      state.timeline.unshift({
        id: `tme-${Date.now()}`,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        title: `Service Scheduled for: ${finding.title}`,
        type: "service_scheduled",
        description: resolutionNotes || `Assigned to service provider for inspection and repair.`,
        actor: "Aditya Sharma (Homeowner)",
      });
    }
    saveState(state);
  }
  return state;
}

export function completeTask(taskId: string): HomeOSState {
  const state = getStoredState();
  const task = state.tasks.find((t) => t.id === taskId);
  if (task && task.status !== "completed") {
    task.status = "completed";
    task.completedDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    
    state.profile.healthScore = Math.min(100, state.profile.healthScore + 4);

    state.timeline.unshift({
      id: `tme-${Date.now()}`,
      date: task.completedDate,
      title: `Task Completed: ${task.title}`,
      type: "maintenance_completed",
      description: `Maintenance action recorded on ${task.assetName}. Cost recorded: ${task.estimatedCost}.`,
      actor: "Aditya Sharma (Homeowner)",
    });

    // If related finding exists, mark resolved
    if (task.assetId) {
      const relatedFinding = state.findings.find((f) => f.linkedAssetId === task.assetId && f.status !== "resolved");
      if (relatedFinding) {
        relatedFinding.status = "resolved";
        relatedFinding.resolvedDate = task.completedDate;
        relatedFinding.resolutionNotes = `Resolved via maintenance action: ${task.title}`;
      }
    }

    saveState(state);
  }
  return state;
}

export function requestProviderQuote(quote: {
  providerId: string;
  providerName: string;
  category: string;
  findingId?: string;
  details: string;
  preferredDate: string;
}): HomeOSState {
  const state = getStoredState();
  const newInquiry = {
    id: `quo-${Date.now()}`,
    ...quote,
    createdAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "Quote Requested",
  };
  state.quoteInquiries.unshift(newInquiry);

  if (quote.findingId) {
    const f = state.findings.find((item) => item.id === quote.findingId);
    if (f && f.status === "open") {
      f.status = "scheduled";
      f.resolutionNotes = `Quote requested from ${quote.providerName} for ${quote.preferredDate}.`;
    }
  }

  saveState(state);
  return state;
}

export function saveInspectionBooking(booking: any): HomeOSState {
  const state = getStoredState();
  const record = {
    id: `BK-${Date.now().toString().slice(-6)}`,
    ...booking,
    bookedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "Confirmed",
  };
  state.recentBookings.unshift(record);
  saveState(state);
  return state;
}

export function convertPreCommitToHomeRecord(report: PropertyInspection): HomeOSState {
  const state = getStoredState();
  
  // Create new active home profile based on this property!
  state.profile = {
    id: `home-${Date.now().toString().slice(-4)}`,
    name: report.propertyAddress.split(",")[0] || "My New Home",
    address: report.propertyAddress,
    type: report.propertyType,
    carpetArea: `${report.areaSqFt} sq. ft.`,
    yearBuilt: 2023,
    occupancyType: report.clientType === "Renter" ? "Tenant (Active Lease)" : "Owner Occupied",
    residents: "You (Converted from Inspection)",
    healthScore: report.overallHealthScore,
    healthStatus: `Baseline established from Pre-Commit Report (${report.id})`,
    lastInspectionDate: report.inspectionDate,
    inspectionId: report.id,
    inspector: report.inspectorName,
  };

  // Convert findings into active findings
  state.findings = report.findings.map((f) => ({
    ...f,
    inspectionType: "Pre-Commit Inspection" as const,
  }));

  // Create initial maintenance tasks from findings
  state.tasks = report.findings.map((f, idx) => ({
    id: `tsk-conv-${idx}`,
    title: f.recommendedAction.split(".")[0],
    assetName: f.room,
    category: f.category,
    priority: f.severity,
    dueDate: "Within 14 Days",
    status: "pending" as const,
    estimatedCost: f.estimatedCost,
  }));

  // Add initial timeline item
  state.timeline = [
    {
      id: `tme-${Date.now()}`,
      date: report.inspectionDate,
      title: `Home Record Initialized from Pre-Commit Inspection`,
      type: "inspection",
      description: `Digital Home profile established for ${report.propertyAddress}. Imported ${report.findings.length} baseline findings and ${report.rentalBaselineItems?.length || 0} pre-existing condition records.`,
      actor: "HomeOS System",
    },
  ];

  saveState(state);
  return state;
}

export function resetHomeOSData(): HomeOSState {
  const def = getDefaultState();
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
    window.dispatchEvent(new CustomEvent("homeos:state-changed", { detail: def }));
  }
  return def;
}
