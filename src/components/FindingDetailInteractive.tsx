import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Calendar,
  Check,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getStoredState, updateFindingStatus, requestProviderQuote, type HomeOSState } from "@/data/store";
import { providersList, type Finding } from "@/data/mockData";

interface FindingDetailProps {
  findingId: string;
}

export const FindingDetailInteractive: React.FC<FindingDetailProps> = ({ findingId }) => {
  const [state, setState] = useState<HomeOSState | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [quoteDetails, setQuoteDetails] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  useEffect(() => {
    setState(getStoredState());
    const handleStateChange = (e: any) => setState(e.detail);
    window.addEventListener("homeos:state-changed", handleStateChange);
    return () => window.removeEventListener("homeos:state-changed", handleStateChange);
  }, []);

  if (!state) return null;

  const finding = state.findings.find((f) => f.id === findingId) || state.findings[0];
  const matchingProviders = providersList.filter(
    (p) => p.category.toLowerCase().includes(finding.linkedProviderCategory.toLowerCase()) ||
           finding.category.toLowerCase().includes(p.category.toLowerCase())
  );

  const handleStatusChange = (newStatus: "open" | "scheduled" | "resolved" | "monitoring") => {
    updateFindingStatus(finding.id, newStatus, notesInput || undefined);
    setToastMsg(`Status updated to "${newStatus.toUpperCase()}"!`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const provider = providersList.find(p => p.id === selectedProviderId) || matchingProviders[0];
    if (!provider) return;

    requestProviderQuote({
      providerId: provider.id,
      providerName: provider.name,
      category: provider.category,
      findingId: finding.id,
      details: quoteDetails || finding.summary,
      preferredDate: preferredDate || "Next Available Slot",
    });

    setQuoteModalOpen(false);
    setToastMsg(`Quote requested from ${provider.name}! Finding marked as Scheduled.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <a href="/" className="hover:text-slate-900">Home</a>
        <span>/</span>
        <a href="/xray-report" className="hover:text-slate-900">Home X-Ray</a>
        <span>/</span>
        <span className="font-semibold text-slate-900">{finding.id}</span>
      </div>

      {/* Finding Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-500 uppercase">{finding.id}</span>
              <span className="text-slate-300">•</span>
              <Badge variant={finding.severity as any}>
                {finding.severity.toUpperCase()} PRIORITY
              </Badge>
              <Badge variant="outline" className="text-xs">
                {finding.confidence}
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                Detected: {finding.dateDetected}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight pt-1">
              {finding.title}
            </h1>
            <p className="text-xs text-slate-600">
              📍 Location: <strong>{finding.room}</strong> • Inspection Type: <strong>{finding.inspectionType}</strong>
            </p>
          </div>

          <div className="shrink-0">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider block text-center ${
              finding.status === "resolved" ? "bg-emerald-100 text-emerald-800" :
              finding.status === "scheduled" ? "bg-blue-100 text-blue-800" :
              "bg-amber-100 text-amber-800"
            }`}>
              Status: {finding.status}
            </span>
          </div>
        </div>

        {/* Evidence Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <div className="h-64 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
              <img
                src={finding.evidence.photoUrl}
                alt={finding.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              📷 <strong>Photographic Evidence:</strong> {finding.evidence.photoLabel}
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] block">
                Physical Diagnostic & Instrument Reading
              </span>
              <p className="text-slate-800 leading-relaxed">
                {finding.evidence.description}
              </p>
              {finding.evidence.metrics && (
                <div className="mt-2 p-2 bg-white rounded border border-slate-200 font-mono text-slate-900 font-bold">
                  {finding.evidence.metrics}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] block">
                Why This Matters (Potential Implications)
              </span>
              <p className="text-slate-700 leading-relaxed">
                {finding.implications}
              </p>
            </div>

            <div className="space-y-1 bg-blue-50/60 p-4 rounded-xl border border-blue-200/80">
              <span className="font-semibold text-blue-800 uppercase tracking-wider text-[10px] block">
                Recommended Remediation Action
              </span>
              <p className="text-blue-950 font-semibold leading-relaxed">
                {finding.recommendedAction}
              </p>
              <div className="pt-2 flex items-center justify-between text-slate-600">
                <span>Estimated Repair Range:</span>
                <strong className="text-slate-900 text-sm font-mono">{finding.estimatedCost}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Resolution Notes Log (if present) */}
        {finding.resolutionNotes && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Recorded Work Log / Resolution Notes
            </span>
            <p className="text-slate-800 font-medium">
              {finding.resolutionNotes}
            </p>
            {finding.resolvedDate && (
              <span className="text-[11px] text-emerald-700 font-semibold block pt-1">
                ✓ Confirmed Resolved on {finding.resolvedDate}
              </span>
            )}
          </div>
        )}

        {/* Interactive Action Control Panel */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Interactive Finding Status Controller
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={finding.status === "open" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("open")}
              className="text-xs"
            >
              Action Required (Open)
            </Button>
            <Button
              variant={finding.status === "scheduled" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("scheduled")}
              className="text-xs"
            >
              Scheduled with Tech
            </Button>
            <Button
              variant={finding.status === "monitoring" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("monitoring")}
              className="text-xs"
            >
              Under Monitoring
            </Button>
            <Button
              variant={finding.status === "resolved" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusChange("resolved")}
              className={`text-xs ${
                finding.status === "resolved" ? "bg-emerald-700 text-white" : "text-emerald-700 border-emerald-300"
              }`}
            >
              <Check className="w-3.5 h-3.5 mr-1" /> Mark Resolved & Update Ledger
            </Button>

            <Button
              size="sm"
              onClick={() => {
                setSelectedProviderId(matchingProviders[0]?.id || "sp-01");
                setQuoteModalOpen(true);
              }}
              className="ml-auto text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-sm"
            >
              <Wrench className="w-3.5 h-3.5" /> Connect with Verified Provider
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Add resolution or repair note (e.g. Resealed flange on Oct 10)..."
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              className="h-9 text-xs"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (notesInput) {
                  updateFindingStatus(finding.id, finding.status, notesInput);
                  setToastMsg("Note saved to permanent home ledger!");
                  setNotesInput("");
                  setTimeout(() => setToastMsg(null), 3000);
                }
              }}
              className="text-xs shrink-0"
            >
              Save Note
            </Button>
          </div>
        </div>
      </div>

      {/* Recommended Local Service Providers */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-slate-900">
            Recommended Verified Providers for this Issue
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Independent vetted specialists. HomeOS charges zero consumer commissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchingProviders.map((provider) => (
              <div
                key={provider.id}
                className="rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                    <img
                      src={provider.shopImage}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {provider.badgeLabel || "Verified"}
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div className="overflow-hidden">
                        <span className="font-bold text-slate-900 text-xs truncate block">{provider.name}</span>
                        <span className="text-[10px] text-slate-500 block">{provider.sellerLevel}</span>
                      </div>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-800 line-clamp-2">
                      {provider.gigTitle}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-amber-500 font-bold flex items-center gap-1">
                        ★ {provider.rating}
                      </span>
                      <span className="text-slate-400">({provider.reviewCount})</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500">{provider.ordersCompleted}+ jobs</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">From</span>
                    <span className="font-mono font-bold text-slate-900">₹{provider.startingPrice}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedProviderId(provider.id);
                      setQuoteModalOpen(true);
                    }}
                    className="text-xs h-7 bg-slate-900 text-white"
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quote Request Modal */}
      <Dialog open={quoteModalOpen} onOpenChange={setQuoteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Service Quotation</DialogTitle>
            <DialogDescription>
              Share diagnostic details from Finding {finding.id} with the contractor.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendQuote} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Select Provider</label>
              <select
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-xs"
              >
                {matchingProviders.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.hourlyOrBaseRate})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Preferred Appointment Slot</label>
              <Input
                placeholder="e.g. Saturday, 18 Oct at 10:30 AM"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Additional Instructions / Notes</label>
              <Input
                placeholder="Attach gate pass instructions or specific access time..."
                value={quoteDetails}
                onChange={(e) => setQuoteDetails(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 leading-relaxed">
              <strong>Attached Diagnostic:</strong> {finding.title} ({finding.room}) with photographic evidence and moisture meter reading.
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setQuoteModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white gap-1.5">
                <Send className="w-3.5 h-3.5" /> Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
