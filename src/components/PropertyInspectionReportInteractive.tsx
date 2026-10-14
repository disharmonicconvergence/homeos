import React, { useState, useEffect } from "react";
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Camera, 
  Building, 
  ArrowRight, 
  Printer, 
  Sparkles, 
  Key, 
  DollarSign, 
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { samplePreCommitReport } from "@/data/mockData";
import { convertPreCommitToHomeRecord, getStoredState, type HomeOSState } from "@/data/store";

export const PropertyInspectionReportInteractive: React.FC = () => {
  const [report, setReport] = useState(samplePreCommitReport);
  const [conversionModalOpen, setConversionModalOpen] = useState(false);
  const [convertedSuccess, setConvertedSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleConvert = () => {
    convertPreCommitToHomeRecord(report);
    setConversionModalOpen(false);
    setConvertedSuccess(true);
    setToastMessage("Report successfully converted into your active HomeOS record!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1800);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200 shadow-xs print:hidden">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-600 text-white shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600 text-white font-bold text-[10px]">
                Paid Service Report
              </Badge>
              <span className="text-xs font-mono font-bold text-blue-900">
                {report.id}
              </span>
            </div>
            <p className="text-xs text-blue-800 mt-0.5">
              Conducted for <strong>Prospective Renter Evaluation & Baseline Documentation</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs font-semibold gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print Report
          </Button>
          <Button
            size="sm"
            onClick={() => setConversionModalOpen(true)}
            className="text-xs font-bold bg-slate-950 hover:bg-slate-800 text-white gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Convert to Home Record
          </Button>
        </div>
      </div>

      {/* Printable Report Document Body */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-10 print:border-none print:shadow-none print:p-0">
        
        {/* Header Strip */}
        <div className="border-b border-slate-200 pb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-extrabold text-xl">
                H
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900">HomeOS</span>
                <span className="block text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                  Property Inspection Report (Pre-Commitment)
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1">
              <div className="font-mono font-bold text-slate-900 text-sm">
                ID: {report.id}
              </div>
              <div className="text-slate-500">
                Inspection Date: <strong>{report.inspectionDate}</strong>
              </div>
              <div className="text-blue-700 font-semibold flex items-center gap-1 sm:justify-end">
                <ShieldCheck className="w-3.5 h-3.5" /> Certified Renter Pre-Move-in Baseline
              </div>
            </div>
          </div>

          {/* Property Metadata Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200/80 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Target Property Evaluated
              </span>
              <div className="text-sm font-bold text-slate-900">{report.propertyAddress}</div>
              <div className="text-slate-600">{report.propertyType} • {report.areaSqFt} sq. ft.</div>
              <div className="text-blue-700 font-semibold pt-1">
                Client Scenario: Prospective Renter (Negotiating Lease Agreement)
              </div>
            </div>

            <div className="space-y-1 md:border-l md:border-slate-200 md:pl-5">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Assessor & Scope
              </span>
              <div className="text-slate-700">
                Lead Assessor: <strong>{report.inspectorName}</strong>
              </div>
              <div className="text-slate-700">
                Assessment Fee: <strong>Paid (₹3,499 Standard 3 BHK)</strong>
              </div>
              <div className="text-slate-500 pt-1">
                Objective: Identify visible defects, prepare owner punch-list, and photograph pre-existing damages.
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-1 bg-blue-600 rounded-full"></span>
            <h2 className="text-lg font-bold text-slate-900">1. Executive Summary & Property Baseline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Observable Condition Index
              </span>
              <div className="py-3 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900">{report.overallHealthScore}</span>
                <span className="text-slate-400 font-bold">/ 100</span>
                <span className="ml-auto text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Action Items
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Broadly good habitability with 3 electrical & plumbing repair recommendations and 3 pre-existing cosmetic condition baseline items.
              </p>
            </div>

            <div className="md:col-span-2 p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Assessor Overview & Recommendation
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {report.summary}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="bg-red-50 text-red-800 border border-red-200 px-2.5 py-1 rounded font-semibold">
                  1 Electrical Socket Safety Risk
                </span>
                <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded font-semibold">
                  2 Plumbing & Efflorescence Concerns
                </span>
                <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded font-semibold">
                  3 Pre-Existing Rental Baseline Records
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Observed Findings (Punch List for Landlord) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 bg-blue-600 rounded-full"></span>
              <h2 className="text-lg font-bold text-slate-900">2. Observable Concerns & Punch-List for Landlord</h2>
            </div>
            <span className="text-xs text-slate-500">Items to resolve prior to lease execution</span>
          </div>

          <div className="space-y-6">
            {report.findings.map((f, idx) => (
              <div key={f.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-500">ITEM #{idx + 1}</span>
                    <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={f.severity as any}>
                      {f.severity.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-xs text-slate-500 font-medium">📍 {f.room}</span>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="h-44 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                      <img
                        src={f.evidence.photoUrl}
                        alt={f.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      📷 {f.evidence.photoLabel}
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[10px]">
                        Assessor Observation
                      </span>
                      <p className="text-slate-800 mt-0.5 leading-relaxed">
                        {f.evidence.description}
                      </p>
                      {f.evidence.metrics && (
                        <div className="mt-1.5 p-2 rounded bg-slate-50 border border-slate-200 font-mono text-slate-700">
                          📊 {f.evidence.metrics}
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[10px]">
                        Why This Matters Before Moving In
                      </span>
                      <p className="text-slate-700 mt-0.5 leading-relaxed">
                        {f.implications}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-blue-50/40 p-3 rounded-lg border border-blue-100">
                      <div>
                        <span className="font-bold text-blue-900 block text-[11px]">
                          Requested Action from Landlord / Owner:
                        </span>
                        <p className="text-slate-800 font-medium mt-0.5">
                          {f.recommendedAction}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 block">Est. Cost</span>
                        <span className="text-xs font-bold text-slate-900 font-mono">{f.estimatedCost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Rental Pre-Existing Condition Baseline (For Deposit Protection) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 bg-emerald-600 rounded-full"></span>
              <h2 className="text-lg font-bold text-slate-900">
                3. Pre-Existing Condition Baseline (Move-In Documentation)
              </h2>
            </div>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Security Deposit Protection Annexure
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            These observable cosmetic marks and superficial wear existed prior to the commencement of tenancy. Documented with high-resolution photographic evidence to eliminate security deposit disputes at checkout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {report.rentalBaselineItems?.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-40 bg-slate-100 overflow-hidden relative">
                    <img
                      src={item.photoUrl}
                      alt={item.area}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] p-1.5 rounded">
                      Timestamp: {report.inspectionDate} • GPS Verified
                    </div>
                  </div>
                  <div className="p-4 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 text-sm">{item.area}</div>
                    <div className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block">
                      {item.statusOnMoveIn}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 mt-auto">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 leading-tight">
                    <strong>Protection Clause:</strong> {item.responsibilityNote}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Questions to Raise with Landlord / Seller / Society */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-1 bg-purple-600 rounded-full"></span>
            <h2 className="text-lg font-bold text-slate-900">4. Recommended Questions Before Signing</h2>
          </div>

          <div className="space-y-3">
            {report.questionsToRaise.map((q, qIdx) => (
              <div key={qIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      Ask {q.target}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      q.urgency === "High" ? "bg-red-100 text-red-800" : "bg-slate-200 text-slate-700"
                    }`}>
                      {q.urgency} Priority
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">"{q.question}"</h4>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Context:</strong> {q.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Agreed Scope & Limitations */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">
            5. Assessment Boundaries & Explicit Limitations
          </h3>
          <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-4 leading-relaxed">
            {report.limitations.map((lim, lIdx) => (
              <li key={lIdx}>{lim}</li>
            ))}
          </ul>
        </div>

        {/* Conversion Action Footer Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
              Step 6: Digital Home Conversion
            </span>
            <h3 className="text-xl font-bold text-white">
              Proceeding with this property?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Convert this Pre-Commitment report into your permanent HomeOS account. All 3 punch-list items will be added to your maintenance planner, and the photographic baseline will be locked into your rental ledger.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button
              size="lg"
              onClick={() => setConversionModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> Convert to My Home Record
            </Button>
          </div>
        </div>

      </div>

      {/* Conversion Confirmation Modal */}
      <Dialog open={conversionModalOpen} onOpenChange={setConversionModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Convert Report to Active Home Record</DialogTitle>
            <DialogDescription>
              This will set {report.propertyAddress.split(",")[0]} as your active home in HomeOS.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <strong className="text-slate-900 block font-semibold">What will happen:</strong>
              <p>• The active property will switch to Flat 701, Prestige Ferns Residency.</p>
              <p>• {report.findings.length} findings will be imported into your live health tracker.</p>
              <p>• {report.rentalBaselineItems?.length || 0} pre-existing condition photos will be preserved as your official lease baseline.</p>
              <p>• Initial maintenance tasks will be automatically generated.</p>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => setConversionModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConvert} className="bg-blue-600 text-white font-bold gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" /> Confirm Conversion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
