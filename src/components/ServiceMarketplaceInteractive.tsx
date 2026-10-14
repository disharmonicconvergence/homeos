import React, { useState, useEffect } from "react";
import { 
  Store, 
  Search, 
  ShieldCheck, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Send, 
  Phone, 
  Info,
  Calendar,
  Sparkles,
  Heart,
  Wrench,
  Check,
  Zap,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { getStoredState, requestProviderQuote, type HomeOSState } from "@/data/store";
import { providersList, type ServiceProvider } from "@/data/mockData";

export const ServiceMarketplaceInteractive: React.FC = () => {
  const [state, setState] = useState<HomeOSState | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [selectedFindingId, setSelectedFindingId] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [instructionNotes, setInstructionNotes] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<string[]>(["sp-01", "sp-03"]);

  useEffect(() => {
    setState(getStoredState());
    const handleStateChange = (e: any) => setState(e.detail);
    window.addEventListener("homeos:state-changed", handleStateChange);
    return () => window.removeEventListener("homeos:state-changed", handleStateChange);
  }, []);

  const categories = ["All", "Plumbing", "Water Purifier", "Electrical", "HVAC", "Pest Control", "Carpentry"];

  const filteredProviders = providersList.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.gigTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleOpenQuote = (provider: ServiceProvider, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedProvider(provider);
    setSelectedFindingId(state?.findings[0]?.id || "");
    setQuoteModalOpen(true);
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoritedIds.includes(id)) {
      setFavoritedIds(favoritedIds.filter((item) => item !== id));
      setToastMessage("Removed from saved specialists.");
    } else {
      setFavoritedIds([...favoritedIds, id]);
      setToastMessage("Saved to favorite specialists list!");
    }
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvider) return;

    requestProviderQuote({
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      category: selectedProvider.category,
      findingId: selectedFindingId || undefined,
      details: instructionNotes || selectedProvider.gigTitle,
      preferredDate: preferredDate || "Tomorrow 10:00 AM",
    });

    setQuoteModalOpen(false);
    setToastMessage(`Booking & quotation request submitted to ${selectedProvider.name}!`);
    setTimeout(() => setToastMessage(null), 4000);
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Verified Local Professionals</span>
            <span>•</span>
            <span>Bengaluru Urban</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              0% Consumer Commission
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Service Specialists & Workshops
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Browse verified workshops, check authentic customer ratings, and book transparent-rate technicians directly for repairs identified in your Home X-Ray.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Independent ranking: No paid ad boosts or hidden markups</span>
        </div>
      </div>

      {/* Search & Categories Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by specialist skill, shop name, or problem (e.g. thermal leak, RO filter, AC foam jet)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 text-sm bg-slate-50/70 border-slate-200 rounded-xl"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fiverr-Like Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => {
          const isSaved = favoritedIds.includes(provider.id);
          return (
            <div
              key={provider.id}
              onClick={() => handleOpenQuote(provider)}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div>
                {/* Shop / Workshop Photo Banner (Fiverr style) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={provider.shopImage}
                    alt={provider.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"></div>

                  {/* Top Left Badge (HomeOS Choice / Top Rated) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black text-white uppercase tracking-wider backdrop-blur-md bg-slate-950/85 border border-white/20 shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {provider.badgeLabel || "HomeOS Verified"}
                    </span>
                  </div>

                  {/* Top Right Favorite Heart Icon */}
                  <button
                    onClick={(e) => handleToggleFavorite(provider.id, e)}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 flex items-center justify-center transition-all cursor-pointer"
                    title={isSaved ? "Remove from saved" : "Save this specialist"}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isSaved ? "fill-red-500 text-red-500" : "text-white hover:text-red-400"
                      }`}
                    />
                  </button>

                  {/* Bottom Image Overlay: Area & Response Time */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-medium">
                    <span className="flex items-center gap-1 drop-shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate max-w-[170px]">{provider.serviceAreas[0]} & nearby</span>
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-slate-200">
                      <Clock className="w-3 h-3 text-emerald-400" /> {provider.responseTime}
                    </span>
                  </div>
                </div>

                {/* Card Content Section */}
                <div className="p-4 sm:p-5 space-y-3">
                  
                  {/* Seller / Workshop Profile Row (Fiverr hallmark) */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-9 w-9 rounded-full ring-2 ring-slate-100 overflow-hidden shrink-0 shadow-xs">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                    </div>

                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {provider.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        {provider.sellerLevel}
                      </span>
                    </div>
                  </div>

                  {/* Gig / Service Offer Title (Fiverr headline) */}
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {provider.gigTitle}
                  </h3>

                  {/* Rating & Orders Bar */}
                  <div className="flex items-center gap-1.5 text-xs pt-0.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    <span className="font-extrabold text-slate-900">{provider.rating}</span>
                    <span className="text-slate-500 font-medium">({provider.reviewCount})</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 text-[11px] font-medium">
                      {provider.ordersCompleted}+ jobs completed
                    </span>
                  </div>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {provider.specialties.slice(0, 3).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Starting Price & Book Button (Fiverr hallmark) */}
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Starting At
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-slate-900 font-mono">
                      ₹{provider.startingPrice}
                    </span>
                    <span className="text-[10px] text-slate-400">/ visit</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={(e) => handleOpenQuote(provider, e)}
                  className="h-8 px-3.5 text-xs font-bold bg-slate-900 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer gap-1"
                >
                  Book Service <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote / Booking Modal */}
      <Dialog open={quoteModalOpen} onOpenChange={setQuoteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Book / Request Quote from {selectedProvider?.name}</span>
            </DialogTitle>
            <DialogDescription>
              Direct contractor dispatch with zero consumer commission markup.
            </DialogDescription>
          </DialogHeader>

          {selectedProvider && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <img
                src={selectedProvider.shopImage}
                alt={selectedProvider.name}
                className="h-14 w-14 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-0.5 overflow-hidden">
                <div className="text-xs font-bold text-slate-900 truncate">{selectedProvider.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{selectedProvider.gigTitle}</div>
                <div className="flex items-center gap-2 text-xs pt-0.5">
                  <span className="text-amber-600 font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {selectedProvider.rating} ({selectedProvider.reviewCount})
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono font-bold text-slate-900">From ₹{selectedProvider.startingPrice}</span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitQuote} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Attach Inspection Finding (Optional)</label>
              <select
                value={selectedFindingId}
                onChange={(e) => setSelectedFindingId(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-xs shadow-xs"
              >
                <option value="">None (Routine Maintenance / Checkup)</option>
                {state?.findings.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.id}: {f.title} ({f.room})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Preferred Appointment Slot *</label>
              <Input
                placeholder="e.g. Tomorrow, between 10:00 AM - 1:00 PM"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                className="mt-1 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Service Notes / Apartment Access</label>
              <Input
                placeholder="e.g. Tower 4, Flat 502. Guard pass will be provided."
                value={instructionNotes}
                onChange={(e) => setInstructionNotes(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Contractor Direct Booking
              </div>
              <p className="text-[11px] text-emerald-800">
                You will receive a direct WhatsApp / SMS confirmation with technician details and ETA.
              </p>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setQuoteModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white gap-1.5">
                <Send className="w-3.5 h-3.5" /> Confirm Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
