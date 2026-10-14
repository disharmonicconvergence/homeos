import React, { useState } from "react";
import { 
  SearchCheck, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Building, 
  Key, 
  Home, 
  HelpCircle,
  Clock,
  Sparkles,
  Camera,
  Layers
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const InspectLandingInteractive: React.FC = () => {
  const [clientType, setClientType] = useState<"Buyer" | "Renter">("Renter");
  const [propertySize, setPropertySize] = useState<"1-2 BHK" | "3-4 BHK" | "Villa">("3-4 BHK");

  const getPrice = () => {
    if (clientType === "Renter") {
      if (propertySize === "1-2 BHK") return "₹2,499";
      if (propertySize === "3-4 BHK") return "₹3,499";
      return "₹4,999";
    } else {
      if (propertySize === "1-2 BHK") return "₹3,999";
      if (propertySize === "3-4 BHK") return "₹5,499";
      return "₹6,999";
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <SearchCheck className="w-4 h-4 text-blue-400" />
            <span>Inspect Before You Commit • Paid Service</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Get a clearer picture of the property <span className="text-blue-400">before you commit.</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Whether you are signing a rental agreement or buying a home in Urban India, send an accredited HomeOS property inspector to uncover visible dampness, test water pressures, audit electrical fixtures, and photograph pre-existing damages.
          </p>

          {/* Interactive Buyer vs Renter Switcher */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a href="/inspect/book">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md gap-2">
                Book Property Inspection <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="/inspect/sample-report">
              <Button size="lg" variant="outline" className="border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800 text-sm font-semibold gap-2">
                <FileText className="w-4 h-4 text-blue-400" /> View Sample Pre-Commit Report
              </Button>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Delivered within 6 hours of viewing
            </span>
            <span className="flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-400" /> High-res dated photographic baseline
            </span>
          </div>
        </div>
      </div>

      {/* Choose Persona Tabs */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Tailored for Your Decision
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Select your scenario to see how HomeOS provides independent clarity before legal commitment.
          </p>

          <div className="inline-flex rounded-xl bg-slate-100 p-1.5 border border-slate-200 mt-2">
            <button
              onClick={() => setClientType("Renter")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                clientType === "Renter" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Key className="w-4 h-4 text-blue-600" />
              <span>I am Renting a Home</span>
            </button>
            <button
              onClick={() => setClientType("Buyer")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                clientType === "Buyer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building className="w-4 h-4 text-emerald-600" />
              <span>I am Buying a Property</span>
            </button>
          </div>
        </div>

        {/* Detailed Persona Benefits Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientType === "Renter" ? (
            <>
              <Card className="p-6 space-y-3 border-blue-200 bg-blue-50/30">
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Protect Your Security Deposit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every pre-existing scuff, hairline tile chip, or faint marble etching is documented with timestamped photographs before you sign the lease, so landlords cannot deduct for past tenant damages upon move-out.
                </p>
              </Card>

              <Card className="p-6 space-y-3 border-blue-200 bg-blue-50/30">
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  List Repairs Before Move-In
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identify dripping geyser valves, loose kitchen counter sockets, or non-closing balcony tracks. Hand a structured punch list to the owner before releasing your initial deposit.
                </p>
              </Card>

              <Card className="p-6 space-y-3 border-blue-200 bg-blue-50/30">
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Starts Your HomeOS Profile
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you decide to take the flat, 1-click converts this report into your active HomeOS maintenance dashboard, keeping track of your tenancy obligations and service records.
                </p>
              </Card>
            </>
          ) : (
            <>
              <Card className="p-6 space-y-3 border-emerald-200 bg-emerald-50/30">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Detect Concealed Seepage Risks
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Non-invasive pinless moisture meters identify sub-surface moisture behind fresh coats of paint, common bathroom partition seepages, and window sill efflorescence before you make token commitments.
                </p>
              </Card>

              <Card className="p-6 space-y-3 border-emerald-200 bg-emerald-50/30">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Structured Questions for Seller & Builder
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive an actionable list of questions for the seller, broker, and society management regarding water hardness, tanker dependency, electrical load sanctions, and warranty transfers.
                </p>
              </Card>

              <Card className="p-6 space-y-3 border-emerald-200 bg-emerald-50/30">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Negotiate or Budget Remodeling
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use line-item repair estimates in the report to negotiate with the seller or prepare realistic post-handover renovation budgets before registration.
                </p>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Transparent Pricing Calculator */}
      <Card className="p-6 sm:p-8 border-slate-300 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              Transparent Pricing • No Hidden Surcharges
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Calculate Your Property Assessment Fee
            </h3>
            <p className="text-xs text-slate-500">
              Covers certified assessor visit, calibrated testing instruments, and digital report delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(["1-2 BHK", "3-4 BHK", "Villa"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setPropertySize(size)}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  propertySize === size
                    ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="text-xs font-semibold text-slate-500 uppercase">{size}</div>
                <div className="text-xl font-black text-slate-900 mt-1">
                  {clientType === "Renter" ? (
                    size === "1-2 BHK" ? "₹2,499" : size === "3-4 BHK" ? "₹3,499" : "₹4,999"
                  ) : (
                    size === "1-2 BHK" ? "₹3,999" : size === "3-4 BHK" ? "₹5,499" : "₹6,999"
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {clientType === "Renter" ? "Move-in Condition Baseline" : "Pre-Purchase Assessment"}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Selected: {propertySize} for {clientType === "Renter" ? "Prospective Renter" : "Prospective Buyer"}
              </div>
              <div className="text-[11px] text-slate-500">
                Comprehensive 8-point physical scope • Delivered in PDF & live HomeOS ledger format
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">{getPrice()}</span>
              <a href={`/inspect/book?type=${clientType}&size=${propertySize}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                  Book This Inspection →
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* Comparison Table: Free Home X-Ray vs Paid Inspect Before Commit */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 text-center">
          How Our Two Inspection Services Differ
        </h3>

        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Feature / Dimension</th>
                <th className="py-3 px-4 text-slate-900 font-bold">Free Home X-Ray</th>
                <th className="py-3 px-4 text-blue-700 font-bold">Inspect Before You Commit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">Target Customer</td>
                <td className="py-3 px-4 text-slate-600">Existing homeowners & residents</td>
                <td className="py-3 px-4 text-slate-900 font-medium">Prospective buyers and renters evaluating a property</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">Core Objective</td>
                <td className="py-3 px-4 text-slate-600">Establish ongoing home maintenance baseline</td>
                <td className="py-3 px-4 text-slate-900 font-medium">Decision support, seller questions & move-in condition baseline</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">Pricing</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">Free (Platform acquisition channel)</td>
                <td className="py-3 px-4 text-blue-700 font-bold">Paid appointment (from ₹2,499)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">Pre-Existing Cosmetic Damage</td>
                <td className="py-3 px-4 text-slate-400">Not emphasized</td>
                <td className="py-3 px-4 text-slate-900 font-medium">Detailed photographic baseline for security deposit protection</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">Digital Home Creation</td>
                <td className="py-3 px-4 text-slate-600">Immediate onboarding</td>
                <td className="py-3 px-4 text-slate-900 font-medium">1-Click conversion if the customer proceeds with transaction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope & Boundaries Disclaimer */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-700" /> Professional Scope & Explicit Limitations
        </h4>
        <p className="leading-relaxed">
          The Inspect Before You Commit service is an independent visual and operational assessment of accessible building components. It does not certify structural engineering integrity, subterranean soil conditions, municipal title deeds, or concealed conduit electrical safety. Where specialized testing is indicated, our report explicitly flags the need for certified structural engineers or licensed electricians.
        </p>
      </div>
    </div>
  );
};
