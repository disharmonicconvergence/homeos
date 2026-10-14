import React, { useState, useEffect } from "react";
import { 
  Home, 
  Layers, 
  FileText, 
  CalendarClock, 
  Store, 
  Activity, 
  SearchCheck, 
  Menu, 
  X, 
  RotateCcw, 
  ChevronDown, 
  ShieldCheck,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStoredState, resetHomeOSData, type HomeOSState } from "@/data/store";

interface NavigationProps {
  currentPath?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath = "/" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [state, setState] = useState<HomeOSState | null>(null);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);

  useEffect(() => {
    setState(getStoredState());

    const handleStateChange = (e: any) => {
      setState(e.detail);
    };

    window.addEventListener("homeos:state-changed", handleStateChange);
    return () => window.removeEventListener("homeos:state-changed", handleStateChange);
  }, []);

  const navLinks = [
    { name: "Overview", href: "/", icon: Home },
    { name: "Inventory", href: "/inventory", icon: Layers, count: state?.assets.length },
    { name: "X-Ray", href: "/xray-report", icon: FileText },
    { 
      name: "Maintenance", 
      href: "/maintenance", 
      icon: CalendarClock, 
      count: state?.tasks.filter(t => t.status !== "completed").length,
      badgeVariant: "high"
    },
    { name: "Marketplace", href: "/marketplace", icon: Store },
    { name: "Monitoring", href: "/monitoring", icon: Activity, isPreview: true },
  ];

  const handleReset = () => {
    if (confirm("Reset HomeOS demo state back to default?")) {
      resetHomeOSData();
      window.location.reload();
    }
  };

  const openFindingsCount = state?.findings.filter(f => f.status !== "resolved").length || 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md print:hidden">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">
            <strong>HomeOS Urban India Edition</strong> • Persistent property ledger, health diagnostics & zero-commission service network
          </span>
          <div className="ml-auto hidden md:flex items-center gap-4 text-[11px] text-slate-400">
            <a href="/walkthrough" className="text-amber-300 hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer">
              <span className="text-amber-400">📖</span> Product Walkthrough Guide
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free Core Platform
            </span>
            <span>•</span>
            <button 
              onClick={handleReset} 
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset sample findings and records"
            >
              <RotateCcw className="w-3 h-3" /> Reset Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Property Selector */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-lg bg-slate-950 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-slate-800 transition-colors">
                H
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900">HomeOS</span>
                <span className="hidden sm:inline-block ml-2 text-xs font-normal text-slate-500 border-l border-slate-200 pl-2">
                  Your home, understood.
                </span>
              </div>
            </a>

            {/* Current Active Property Pill */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition-colors border border-slate-200 cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="max-w-[200px] truncate font-semibold">
                  {state?.profile.name || "Apt 502, Orchid Woods"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {propertyDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-72 rounded-xl bg-white border border-slate-200 shadow-lg py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Active Home Record
                  </div>
                  <div className="px-3 py-2 bg-slate-50 border-y border-slate-100">
                    <div className="font-semibold text-xs text-slate-900">{state?.profile.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{state?.profile.address}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                        Health: {state?.profile.healthScore}/100
                      </span>
                      <span className="text-[10px] text-slate-500">{state?.profile.type}</span>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                    Evaluate Another Property
                  </div>
                  <a
                    href="/inspect/sample-report"
                    className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <div className="font-medium text-slate-900">Prestige Ferns Residency (Pre-Commit)</div>
                    <div className="text-[11px] text-slate-500">View prospective rental evaluation report →</div>
                  </a>
                  <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                    <a
                      href="/inspect"
                      className="text-[11px] text-blue-600 font-medium hover:underline flex items-center gap-1 py-1"
                    >
                      Book a new pre-commitment inspection
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 shrink-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.href || (link.href !== "/" && currentPath?.startsWith(link.href));
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-900" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-slate-200 text-slate-700">
                      {link.count}
                    </span>
                  )}
                  {link.isPreview && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-100 text-amber-800 uppercase tracking-wider">
                      Demo
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Inspect Before You Commit Journey */}
          <div className="hidden md:flex items-center gap-2">
            <a href="/walkthrough">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Walkthrough</span>
              </Button>
            </a>
            <a href="/inspect">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-semibold text-xs flex items-center gap-1.5"
              >
                <SearchCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Inspect Before Commit</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                  Paid
                </span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a href="/inspect" className="text-xs font-semibold text-blue-600 mr-1">
              Inspect
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <div className="py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Property: <strong>{state?.profile.name}</strong></span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Score: {state?.profile.healthScore}/100
            </span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? "bg-slate-100 text-slate-900 font-semibold" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{link.name}</span>
                  </div>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-slate-200 text-slate-700">
                      {link.count}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <a
              href="/walkthrough"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Product Walkthrough Guide</span>
              </div>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                Pitch Deck
              </span>
            </a>
            <a
              href="/inspect"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200"
            >
              <div className="flex items-center gap-2">
                <SearchCheck className="w-4 h-4 text-blue-600" />
                <span>Inspect Before You Commit</span>
              </div>
              <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">
                Paid Service
              </span>
            </a>

            <div className="flex items-center justify-between px-3 pt-2 text-xs text-slate-500">
              <a href="/inspect/sample-report" className="text-slate-600 hover:underline">
                Sample Pre-Commit Report
              </a>
              <button onClick={handleReset} className="text-slate-500 hover:text-slate-800 flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
