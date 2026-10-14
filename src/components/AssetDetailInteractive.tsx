import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  FileText, 
  Download, 
  Calendar, 
  Wrench, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Check,
  Building,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { getStoredState, saveState, type HomeOSState } from "@/data/store";
import type { Asset, Finding } from "@/data/mockData";

interface AssetDetailProps {
  assetId: string;
}

export const AssetDetailInteractive: React.FC<AssetDetailProps> = ({ assetId }) => {
  const [state, setState] = useState<HomeOSState | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newLog, setNewLog] = useState({
    provider: "",
    description: "",
    cost: "",
  });

  useEffect(() => {
    setState(getStoredState());
    const handleStateChange = (e: any) => setState(e.detail);
    window.addEventListener("homeos:state-changed", handleStateChange);
    return () => window.removeEventListener("homeos:state-changed", handleStateChange);
  }, []);

  if (!state) return null;

  const asset = state.assets.find((a) => a.id === assetId) || state.assets[0];
  const linkedFindings = state.findings.filter(
    (f) => f.linkedAssetId === asset.id || (asset.associatedFindingIds && asset.associatedFindingIds.includes(f.id))
  );

  const handleAddServiceLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.provider || !newLog.description) return;

    const todayStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const logItem = {
      date: todayStr,
      provider: newLog.provider,
      description: newLog.description,
      cost: newLog.cost || "₹0",
    };

    const updatedAssets = state.assets.map((a) => {
      if (a.id === asset.id) {
        return {
          ...a,
          condition: "Good" as const,
          lastServiced: todayStr,
          serviceHistory: [logItem, ...a.serviceHistory],
        };
      }
      return a;
    });

    // Also add to timeline
    const updatedTimeline = [
      {
        id: `tme-${Date.now()}`,
        date: todayStr,
        title: `Service Logged: ${asset.name}`,
        type: "service_completed",
        description: `${newLog.description} performed by ${newLog.provider}. Cost: ${newLog.cost || "N/A"}.`,
        actor: "Aditya Sharma (Homeowner)",
      },
      ...state.timeline,
    ];

    saveState({ ...state, assets: updatedAssets, timeline: updatedTimeline });
    setServiceModalOpen(false);
    setNewLog({ provider: "", description: "", cost: "" });
    setToastMessage(`Service visit successfully logged for ${asset.name}!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadDoc = (title: string) => {
    setToastMessage(`Downloading "${title}"... (Demonstration file)`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <a href="/" className="hover:text-slate-900">Home</a>
        <span>/</span>
        <a href="/inventory" className="hover:text-slate-900">Inventory</a>
        <span>/</span>
        <span className="font-semibold text-slate-900">{asset.name}</span>
      </div>

      {/* Asset Hero Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="h-24 w-24 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
              <img
                src={asset.thumbnail}
                alt={asset.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {asset.category}
                </span>
                <span className="text-slate-300">•</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                  asset.condition === "Good"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}>
                  {asset.condition}
                </span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                  asset.warrantyStatus === "Active"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}>
                  Warranty: {asset.warrantyStatus}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {asset.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span>Brand: <strong>{asset.brand}</strong></span>
                <span>•</span>
                <span>Model: <strong className="font-mono">{asset.model}</strong></span>
                <span>•</span>
                <span>Location: <strong>{asset.room}</strong></span>
                {asset.serialNumber && (
                  <>
                    <span>•</span>
                    <span>Serial: <span className="font-mono text-slate-500">{asset.serialNumber}</span></span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <Button
              onClick={() => setServiceModalOpen(true)}
              className="text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Log Service Record
            </Button>
            <a href="/marketplace">
              <Button variant="outline" className="text-xs font-semibold gap-1.5">
                <Wrench className="w-4 h-4 text-slate-600" /> Book Certified Tech
              </Button>
            </a>
          </div>
        </div>

        {/* Key Milestone Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Purchase Date:</span>
            <strong className="text-slate-900 text-sm">{asset.purchaseDate}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Warranty Expiration:</span>
            <strong className="text-slate-900 text-sm">{asset.warrantyExpiry}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Last Maintenance:</span>
            <strong className="text-slate-900 text-sm">{asset.lastServiced}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Next Service Window:</span>
            <strong className="text-amber-700 text-sm font-semibold">{asset.nextServiceDue}</strong>
          </div>
        </div>
      </div>

      {/* Linked Finding Alert (if any) */}
      {linkedFindings.length > 0 && (
        <div className="space-y-3">
          {linkedFindings.map((finding) => (
            <div key={finding.id} className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Open Inspection Finding on this Asset
                    </span>
                    <Badge variant="high">Requires Service</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-amber-950 mt-1">{finding.title}</h4>
                  <p className="text-xs text-amber-800 mt-0.5">{finding.summary}</p>
                </div>
              </div>
              <a href={`/finding/${finding.id}`}>
                <Button size="sm" className="bg-amber-900 hover:bg-amber-950 text-white text-xs whitespace-nowrap">
                  View Diagnostic Finding →
                </Button>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Main Tabs: Documents, Service History, Maintenance Tasks */}
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="documents">Document Vault</TabsTrigger>
          <TabsTrigger value="history">Service History ({asset.serviceHistory.length})</TabsTrigger>
          <TabsTrigger value="care">Routine Care</TabsTrigger>
        </TabsList>

        {/* Tab 1: Documents */}
        <TabsContent value="documents" className="pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900">
                Invoices, Warranties & User Manuals
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Persistent PDF records tied to this equipment. Available anytime for warranty claims.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {asset.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5 overflow-hidden">
                        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                          {doc.type}
                        </span>
                        <div className="text-xs font-bold text-slate-900 truncate" title={doc.title}>
                          {doc.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {doc.size} • Verified PDF
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">Stored on HomeOS</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadDoc(doc.title)}
                        className="h-7 text-xs text-blue-600 hover:text-blue-800 gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Service History */}
        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Equipment Maintenance Ledger
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Every service visit, technician note, and spare replacement recorded over time.
                </CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setServiceModalOpen(true)}
                className="text-xs gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Past Record
              </Button>
            </CardHeader>
            <CardContent>
              {asset.serviceHistory.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                  No service records logged yet. Click "Log Service Record" to record maintenance.
                </div>
              ) : (
                <div className="space-y-3">
                  {asset.serviceHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-slate-900">{item.date}</span>
                            <span>•</span>
                            <span className="text-blue-700 font-semibold">{item.provider}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-slate-900 font-mono">{item.cost}</div>
                        <div className="text-[10px] text-slate-400">Recorded in Home Ledger</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Routine Care */}
        <TabsContent value="care" className="pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900">
                Recommended Maintenance Regimen
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Manufacturer-recommended preventive actions for longevity and energy efficiency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900">Annual Preventative Servicing</div>
                  <div className="text-xs text-slate-600">
                    Comprehensive chemical / pressure flush, electrical load testing, and sanitization.
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Recommended Frequency: Every 12 Months</div>
                </div>
                <a href="/marketplace">
                  <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
                    Schedule AMC
                  </Button>
                </a>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900">Quarterly Self-Inspection</div>
                  <div className="text-xs text-slate-600">
                    Check inlet hoses for micro-kinks, inspect electrical 3-pin plug for scorch marks, wipe exterior vents.
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Recommended Frequency: Every 3 Months</div>
                </div>
                <Button 
                  variant="subtle" 
                  size="sm" 
                  onClick={() => {
                    setToastMessage("Marked quarterly self-check as completed!");
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="text-xs whitespace-nowrap text-emerald-700"
                >
                  Mark Checked
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Log Service Modal */}
      <Dialog open={serviceModalOpen} onOpenChange={setServiceModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Log Maintenance / Service Visit</DialogTitle>
            <DialogDescription>
              Record maintenance done on {asset.name}. This updates your permanent home history.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddServiceLog} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Service Provider / Technician *</label>
              <Input
                placeholder="e.g. Authorized Brand Service / Urban Company / Self"
                value={newLog.provider}
                onChange={(e) => setNewLog({ ...newLog, provider: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Work Description *</label>
              <Input
                placeholder="e.g. Replaced internal filter cartridge & sanitized water chamber"
                value={newLog.description}
                onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Total Expenditure (₹)</label>
              <Input
                placeholder="e.g. ₹1,850"
                value={newLog.cost}
                onChange={(e) => setNewLog({ ...newLog, cost: e.target.value })}
                className="mt-1"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setServiceModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white">
                Save to Home History
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
