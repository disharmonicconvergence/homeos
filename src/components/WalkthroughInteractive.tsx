import React, { useState } from "react";
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Wrench, 
  SearchCheck, 
  Activity, 
  ShieldCheck, 
  Building, 
  Key, 
  Calendar, 
  ExternalLink, 
  Copy, 
  Printer, 
  Presentation, 
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const WalkthroughInteractive: React.FC = () => {
  const [activeSection, setActiveSection] = useState("vision");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyLink = (id: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/walkthrough#${id}`;
      navigator.clipboard.writeText(url);
      setCopied(id);
      setTimeout(() => setCopied(null), 2500);
    }
  };

  const sections = [
    { id: "thesis", label: "Product Thesis & Identity" },
    { id: "vision", label: "1. Vision" },
    { id: "problem", label: "2. The Problem" },
    { id: "customers", label: "3. Target Customers" },
    { id: "entry-points", label: "4. Two Entry Points" },
    { id: "reports", label: "5. Reports & Severity Framework" },
    { id: "modules", label: "6. Core Product Modules" },
    { id: "principles", label: "7. Product Principles" },
    { id: "business-model", label: "8. Business Model" },
  ];

  return (
    <div className="space-y-10">
      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Section link copied to clipboard!</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
              Product Walkthrough & Thesis Guide
            </Badge>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-mono">Urban India Edition 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            HomeOS: Your home, understood.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A comprehensive guide to the vision, customer journeys, physical inspection frameworks, and business economics behind the physical home operating system.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              Category: <strong>Consumer Technology / Home OS</strong>
            </span>
            <span className="bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              Market: <strong>Urban India (Bengaluru, Mumbai, NCR)</strong>
            </span>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a href="/">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer">
                Open Live Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </a>
            <Button
              size="sm"
              onClick={() => window.print()}
              className="bg-white hover:bg-slate-100 text-slate-900 hover:text-slate-950 font-bold text-xs gap-2 shadow-sm border border-slate-200 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-800" />
              <span>Print Walkthrough Doc</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sticky Sidebar Navigation + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Sticky Table of Contents */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs print:hidden">
          <div className="flex items-center justify-between px-2">
            <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Walkthrough Outline
            </div>
            <button
              onClick={() => window.print()}
              title="Print Walkthrough Document"
              className="text-slate-700 hover:text-slate-950 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-[11px] font-bold border border-slate-200 cursor-pointer"
            >
              <Printer className="w-3 h-3 text-slate-700" />
              <span>Print</span>
            </button>
          </div>
          <nav className="space-y-1 text-xs">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === sec.id
                    ? "bg-slate-900 text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{sec.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 px-2 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Prototype Links
            </span>
            <div className="space-y-1 text-xs font-semibold">
              <a href="/xray-report" className="text-blue-600 hover:underline block">→ Free Home X-Ray</a>
              <a href="/inspect/sample-report" className="text-blue-600 hover:underline block">→ Inspect Before Commit</a>
              <a href="/inventory" className="text-blue-600 hover:underline block">→ Home Inventory</a>
              <a href="/marketplace" className="text-blue-600 hover:underline block">→ Service Marketplace</a>
              <a href="/monitoring" className="text-blue-600 hover:underline block">→ Home Monitoring</a>
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="lg:col-span-3 space-y-12">
          
          {/* Section: Product Thesis */}
          <section id="thesis" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-blue-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">Product Thesis & Identity</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("thesis")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Working Product Name</span>
                <strong className="text-slate-900 text-sm">HomeOS</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Category</span>
                <strong className="text-slate-900 text-sm">Consumer technology / Home operating system</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Initial Market</span>
                <strong className="text-slate-900 text-sm">Urban India</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Initial Customer</span>
                <strong className="text-slate-900 text-sm">Homeowners and residents who want to understand, maintain, and manage their homes without coordinating everything manually.</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
              <strong className="font-bold text-blue-900 block text-sm">Product Thesis:</strong>
              <p className="leading-relaxed">
                Every home generates information about its assets, maintenance, expenses, services, and physical condition. Today, that information is scattered across people, invoices, WhatsApp conversations, service providers, and disconnected devices. HomeOS brings it together into one persistent, actionable record.
              </p>
            </div>
          </section>

          {/* Section 1: Vision */}
          <section id="vision" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-slate-900 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">1. Vision</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("vision")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <p className="text-base font-semibold text-slate-900 leading-snug">
              Make every home observable, understandable, and easier to maintain.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              HomeOS is a consumer platform that creates a living digital record of a home, helps its occupants understand its condition, identifies maintenance needs, connects them with suitable service providers, and eventually monitors physical systems through connected devices.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              HomeOS serves people at two important moments: when they already live in a home and need to manage it, and when they are deciding whether to buy or rent a property.
            </p>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                The ambition is to become the default place where a person goes to answer five questions:
              </span>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs font-medium text-slate-800">
                <li>What do I have in my home?</li>
                <li>What condition is it in?</li>
                <li>What needs attention, and how urgently?</li>
                <li>Who can help me resolve it?</li>
                <li>What has happened to my home over time?</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950">
              For someone considering a property, HomeOS also helps answer a more immediate question: <strong>What am I committing to, and what should I know before I commit?</strong>
            </div>

            <p className="text-xs text-slate-500 italic">
              The long-term product is not merely a maintenance app. It is an operating system for the physical home.
            </p>
          </section>

          {/* Section 2: The Problem */}
          <section id="problem" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-red-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">2. The Problem</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("problem")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <p className="text-sm font-semibold text-slate-900">
              Managing a home is a fragmented, reactive process.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">No central record:</strong>
                <span className="text-slate-600">Appliance invoices, warranties, manuals, service records, and installation details are scattered across emails, paper documents, and messaging apps.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">Reactive maintenance:</strong>
                <span className="text-slate-600">Residents often discover problems only after something breaks, leaks, stops working, or becomes expensive to repair.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">Unclear priorities:</strong>
                <span className="text-slate-600">Homeowners may notice several issues but cannot easily distinguish an urgent problem from routine maintenance.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">Fragmented service discovery:</strong>
                <span className="text-slate-600">Finding a reliable electrician, plumber, appliance technician, or other professional often depends on word of mouth and repeated searching.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">No continuity:</strong>
                <span className="text-slate-600">A new technician may not know what was repaired previously. Residents moving into a property may have little understanding of its maintenance history.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">No system-level visibility:</strong>
                <span className="text-slate-600">Water tanks, pumps, electrical consumption, leaks, and other physical conditions are generally managed through separate devices or manual checks.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">No unified history:</strong>
                <span className="text-slate-600">There is no single timeline connecting a home's condition, maintenance work, expenses, and ongoing issues.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">Uncertainty before moving in:</strong>
                <span className="text-slate-600">Buyers and renters may struggle to identify visible defects, understand maintenance concerns, document existing damage, or decide which questions to ask before committing to a property.</span>
              </div>
              <div className="md:col-span-2 p-3.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                <strong className="text-slate-900 block font-semibold">Weak condition records:</strong>
                <span className="text-slate-600">Renters and landlords may lack a consistent, photographic record of the property's condition at the beginning of a tenancy, creating room for disagreements when the tenant moves out.</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium">
              HomeOS should reduce the cognitive load of being responsible for a home, including the uncertainty involved in choosing one.
            </p>
          </section>

          {/* Section 3: Target Customers */}
          <section id="customers" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-emerald-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">3. Target Customers</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("customers")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Primary Segment</span>
                <h3 className="text-sm font-bold text-slate-900">Urban Homeowners</h3>
                <p className="text-slate-600 leading-relaxed">
                  People living in apartments or independent houses who are responsible for maintenance decisions and expenses. Motivations: protecting property value, avoiding unexpected breakdowns, finding trustworthy professionals.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Secondary Segment</span>
                <h3 className="text-sm font-bold text-slate-900">Busy Urban Residents & Families</h3>
                <p className="text-slate-600 leading-relaxed">
                  Working professionals, couples, and families who want home maintenance to happen without having to remember every deadline or repeatedly coordinate with service providers.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Pre-Commitment Segment</span>
                <h3 className="text-sm font-bold text-slate-900">Prospective Buyers & Renters</h3>
                <p className="text-slate-600 leading-relaxed">
                  Evaluating a property before financial or contractual commitment. Need to identify visible defects, ask the right questions, document existing damage, and create a baseline for future maintenance.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
              <strong>Future segments:</strong> Landlords managing rental portfolios, people moving into a new home, owners of larger estates, and residential housing societies. Initial product focus remains strictly on individual households.
            </div>
          </section>

          {/* Section 4: Two Entry Points */}
          <section id="entry-points" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-purple-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">4. Two Entry Points into HomeOS</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("entry-points")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <p className="text-xs text-slate-600">
              HomeOS has two distinct inspection services. They serve different customer needs and should not be confused.
            </p>

            {/* Entry Point A */}
            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="bg-blue-600 text-white text-[10px] font-bold">Entry Point A</Badge>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Free Home X-Ray: Understand the home you already live in
                  </h3>
                </div>
                <a href="/xray-report">
                  <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                    View Live Report →
                  </Button>
                </a>
              </div>

              <div className="text-xs text-slate-700 space-y-2">
                <p><strong>Proposition:</strong> Get a free X-Ray of your home.</p>
                <p>A trained HomeOS representative visits the property, conducts a structured visual and operational assessment, documents relevant findings, and generates a digital Home Health Report.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded border border-blue-100"><strong>Step 1:</strong> Book inspection</div>
                <div className="p-2 bg-white rounded border border-blue-100"><strong>Step 2:</strong> Conduct assessment</div>
                <div className="p-2 bg-white rounded border border-blue-100"><strong>Step 3:</strong> Generate Report</div>
                <div className="p-2 bg-white rounded border border-blue-100"><strong>Step 4:</strong> Create digital home</div>
                <div className="p-2 bg-white rounded border border-blue-100"><strong>Step 5:</strong> Resolve issues</div>
                <div className="p-2 bg-white rounded border border-blue-100"><strong>Step 6:</strong> Build lasting record</div>
              </div>
            </div>

            {/* Entry Point B */}
            <div className="p-5 rounded-xl border border-slate-300 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="bg-slate-900 text-white text-[10px] font-bold">Entry Point B</Badge>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Inspect Before You Commit: Evaluate a home before buying or renting
                  </h3>
                </div>
                <a href="/inspect/sample-report">
                  <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                    View Sample Report →
                  </Button>
                </a>
              </div>

              <div className="text-xs text-slate-700 space-y-2">
                <p><strong>Proposition:</strong> Get a clearer picture of the property before you commit.</p>
                <p>Paid property inspection service for people considering buying or renting a home. A representative follows a structured checklist, documents observable concerns, captures photographic damage baselines, and prepares questions to raise.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded border border-slate-200"><strong>Step 1:</strong> Share property details</div>
                <div className="p-2 bg-white rounded border border-slate-200"><strong>Step 2:</strong> Book appointment</div>
                <div className="p-2 bg-white rounded border border-slate-200"><strong>Step 3:</strong> Inspect property</div>
                <div className="p-2 bg-white rounded border border-slate-200"><strong>Step 4:</strong> Receive report</div>
                <div className="p-2 bg-white rounded border border-slate-200"><strong>Step 5:</strong> Make informed decision</div>
                <div className="p-2 bg-white rounded border border-slate-200"><strong>Step 6:</strong> Convert to home record</div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Dimension</th>
                    <th className="py-2.5 px-3 font-bold text-blue-700">Free Home X-Ray</th>
                    <th className="py-2.5 px-3 font-bold text-slate-900">Inspect Before You Commit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold">User Context</td>
                    <td className="py-2.5 px-3">For someone already living in a home</td>
                    <td className="py-2.5 px-3">For someone evaluating a property</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold">Purpose</td>
                    <td className="py-2.5 px-3">Establishes baseline for ongoing maintenance</td>
                    <td className="py-2.5 px-3">Supports a buying or renting decision</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold">Pricing Model</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-bold">Free at launch (Acquisition channel)</td>
                    <td className="py-2.5 px-3 text-blue-700 font-bold">Paid appointment-based service</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold">Focus Area</td>
                    <td className="py-2.5 px-3">Maintenance, assets, and actionable findings</td>
                    <td className="py-2.5 px-3">Observable condition, pre-move damage, and seller questions</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold">Home Continuity</td>
                    <td className="py-2.5 px-3">Starts ongoing HomeOS record</td>
                    <td className="py-2.5 px-3">Can become initial HomeOS record if customer proceeds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Reports & Severity Framework */}
          <section id="reports" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-amber-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">5. Home Health Report & Property Inspection Report</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("reports")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <p className="text-xs text-slate-600">
              Reports are the first tangible expression of HomeOS. They feel like professional assessment documents rather than marketing brochures.
            </p>

            {/* Severity Matrix */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                The 4-Tier Severity Framework:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <div className="font-bold text-red-900">Critical Priority</div>
                  <p className="text-red-800 text-[11px] mt-0.5">Immediate safety concern or issue requiring urgent professional attention. Escalation and safety instructions provided.</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="font-bold text-orange-900">High Priority</div>
                  <p className="text-orange-800 text-[11px] mt-0.5">Significant observed issue that should be assessed or addressed promptly (e.g. wet wall efflorescence).</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="font-bold text-amber-900">Medium Priority</div>
                  <p className="text-amber-800 text-[11px] mt-0.5">Maintenance concern that should be scheduled within a reasonable timeframe (e.g. overdue RO filters).</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="font-bold text-blue-900">Low Priority</div>
                  <p className="text-blue-800 text-[11px] mt-0.5">Routine maintenance, monitoring, or preventive action (e.g. clearing balcony slider weep holes).</p>
                </div>
              </div>
            </div>

            {/* Report to Action Connection */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block text-sm">The Report-to-Action Connection:</span>
              <p className="text-slate-600 leading-relaxed">
                Every finding inside the PDF has a live corresponding digital record inside HomeOS. It tracks location, photographs, date observed, severity, recommended follow-up, and interactive status changes: <strong>Open → Scheduled → Resolved → Monitoring</strong>.
              </p>
              <p className="text-slate-500 italic text-[11px]">
                "The PDF is the portable summary. The app is the living record."
              </p>
            </div>
          </section>

          {/* Section 6: Core Product Modules */}
          <section id="modules" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-cyan-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">6. Core Product Modules</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("modules")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">A. Home Profile</strong>
                    <a href="/" className="text-blue-600 text-[11px] hover:underline font-semibold">View Live →</a>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    Digital representation of the property: property type, approximate age, zones, relevant systems, identified assets, and inspection history.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">B. Home Inventory</strong>
                    <a href="/inventory" className="text-blue-600 text-[11px] hover:underline font-semibold">View Live →</a>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    Register of appliances, fixtures, and home systems with brand, model, invoices, warranties, manuals, service history, and condition status.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">C. Home Timeline</strong>
                    <a href="/" className="text-blue-600 text-[11px] hover:underline font-semibold">View Live →</a>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    Chronological record of inspections, service visits, appliance installations, warranty expiries, repair completions, and sensor events.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">D. Maintenance Planner</strong>
                    <a href="/maintenance" className="text-blue-600 text-[11px] hover:underline font-semibold">View Live →</a>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    Single view of upcoming and outstanding work with due dates, priorities, recurring schedules, and direct contractor scheduling.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">E. Service Marketplace</strong>
                    <a href="/marketplace" className="text-blue-600 text-[11px] hover:underline font-semibold">View Live →</a>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    Neutral marketplace with Fiverr-style cards, verified badges, shop photography, 0% consumer commissions, and flat provider subscriptions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">F. Pre-Commitment Booking</strong>
                    <a href="/inspect/book" className="text-blue-600 text-[11px] hover:underline font-semibold">View Live →</a>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    Dedicated booking flow for buyers and renters capturing property details, specific concerns, transparent fees, and appointment scheduling.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">G. Home Observability</strong>
                    <a href="/monitoring" className="text-blue-600 text-[11px] hover:underline font-semibold">View Live →</a>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    Monitoring layer for water-tank levels, pump controls, power draw, voltage fluctuations, and wet zone acoustic micro-leak sensors.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">H. Home Intelligence</strong>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Rule Layer</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    Combines history, asset info, and sensor data to detect recurring faults, forecast upcoming maintenance costs, and provide explainable alerts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Product Principles */}
          <section id="principles" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-emerald-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">7. Product Principles</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("principles")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { title: "1. Consumer first", desc: "The homeowner's interests come before marketplace monetisation." },
                { title: "2. Free core product", desc: "Home records, inspection reports, maintenance planning, and service discovery remain accessible without a consumer subscription." },
                { title: "3. One persistent home record", desc: "Findings, assets, work orders, and supported sensor events connect to the same permanent property ledger." },
                { title: "4. Useful by default", desc: "The app surfaces actionable steps, not merely storing raw diagnostic information." },
                { title: "5. Explainable recommendations", desc: "Every important alert explains what was observed, why it matters, and what the homeowner can do." },
                { title: "6. Hardware agnostic", desc: "Support compatible third-party devices rather than requiring proprietary hardware for every feature." },
                { title: "7. Privacy by design", desc: "Home layouts, access details, and sensor data require strong access controls and explicit consent." },
                { title: "8. Trust over short-term revenue", desc: "Do not exaggerate severity to sell repairs or rank providers solely by commercial incentives." },
                { title: "9. Progressive complexity", desc: "Begin with simple records and maintenance workflows. Introduce advanced monitoring only when it provides clear value." },
                { title: "10. Reports stand on their own", desc: "An inspection provides standalone useful information even if the customer never purchases a service." },
                { title: "11. Clear inspection boundaries", desc: "Explicitly communicate physical scope and legal limitations. Do not imply certified structural or electrical title where none was tested." },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                  <strong className="text-slate-900 block font-bold">{item.title}</strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Business Model */}
          <section id="business-model" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 bg-blue-600 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900">8. Business Model & Revenue Streams</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyLink("business-model")}
                className="text-xs text-slate-400 hover:text-slate-800 gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-blue-950 font-bold text-sm">Revenue Stream 1: Provider Subscriptions (SaaS)</strong>
                  <Badge variant="outline" className="text-[10px] font-bold">0% Consumer Commission</Badge>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  HomeOS does not charge consumers a transaction fee. Instead, service providers pay a flat monthly subscription for business software (lead inbox, scheduling, quotation dispatch, service area management, and customer history for work performed through HomeOS).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 font-bold text-sm">Revenue Stream 2: Paid Property Inspections</strong>
                  <Badge variant="outline" className="text-[10px] font-bold">From ₹2,499</Badge>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  The Inspect Before You Commit service charges customers a transparent fee reflecting travel, certified assessor time, diagnostic tools, and reporting. Primary value is decision support and condition documentation before entering a lease or purchase.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <strong className="text-slate-900 font-bold text-sm">Revenue Stream 3: Compatible Hardware</strong>
                <p className="text-slate-700 leading-relaxed">
                  Carefully selected third-party sensors and bridges (water level transducers, clamp-on CT power monitors, acoustic leak sensors).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <strong className="text-slate-900 font-bold text-sm">Revenue Stream 4: Optional Monitoring Plans</strong>
                <p className="text-slate-700 leading-relaxed">
                  Future premium tier for multi-property landlords, advanced analytics, longer historical sensor logs, and automated emergency dispatches.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <strong className="text-slate-900 font-bold text-sm">Revenue Stream 5: Utility Bill Payments (Future Exploration)</strong>
                <p className="text-slate-700 leading-relaxed">
                  Potential convenience fee or partner-funded revenue on eligible utility bills inside HomeOS, evaluated strictly against category economics.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
