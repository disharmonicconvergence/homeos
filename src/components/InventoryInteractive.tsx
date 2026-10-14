import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Wrench, 
  Calendar, 
  ChevronRight,
  Sparkles,
  ArrowUpDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { getStoredState, saveState, type HomeOSState } from "@/data/store";
import type { Asset } from "@/data/mockData";

export const InventoryInteractive: React.FC = () => {
  const [state, setState] = useState<HomeOSState | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCondition, setSelectedCondition] = useState<string>("All");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: "",
    category: "Kitchen",
    brand: "",
    model: "",
    room: "",
    purchaseDate: "",
    warrantyStatus: "Active",
    warrantyExpiry: "",
    condition: "Good",
  });

  useEffect(() => {
    setState(getStoredState());
    const handleStateChange = (e: any) => setState(e.detail);
    window.addEventListener("homeos:state-changed", handleStateChange);
    return () => window.removeEventListener("homeos:state-changed", handleStateChange);
  }, []);

  if (!state) return null;

  const categories = ["All", "HVAC", "Water & Plumbing", "Electrical", "Kitchen", "Safety & Utility"];
  const conditions = ["All", "Good", "Needs Attention", "Monitored"];

  const filteredAssets = state.assets.filter((asset) => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.room.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === "All" || asset.category === selectedCategory;
    const matchesCond = selectedCondition === "All" || asset.condition === selectedCondition;

    return matchesSearch && matchesCat && matchesCond;
  });

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.brand) return;

    const created: Asset = {
      id: `ast-${Date.now()}`,
      name: newAsset.name,
      category: newAsset.category as any,
      room: newAsset.room || "Main Living Area",
      brand: newAsset.brand,
      model: newAsset.model || "Standard Series",
      purchaseDate: newAsset.purchaseDate || "Recently Added",
      warrantyStatus: newAsset.warrantyStatus as any,
      warrantyExpiry: newAsset.warrantyExpiry || "1 Year Standard",
      condition: newAsset.condition as any,
      lastServiced: "Initial Setup",
      nextServiceDue: "In 6 Months",
      documents: [
        { title: `${newAsset.name}_Purchase_Invoice.pdf`, type: "Invoice", size: "1.1 MB" }
      ],
      serviceHistory: [],
      thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
    };

    const nextState = { ...state, assets: [created, ...state.assets] };
    saveState(nextState);
    setAddModalOpen(false);
    setNewAsset({
      name: "",
      category: "Kitchen",
      brand: "",
      model: "",
      room: "",
      purchaseDate: "",
      warrantyStatus: "Active",
      warrantyExpiry: "",
      condition: "Good",
    });
  };

  const needingServiceCount = state.assets.filter(a => a.condition === "Needs Attention" || a.condition === "Critical").length;
  const totalDocsCount = state.assets.reduce((sum, a) => sum + a.documents.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Property Asset Registry</span>
            <span>•</span>
            <span>{state.profile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Home Inventory & Systems
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            A permanent digital register of every appliance, system, warranty, and invoice in your home.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setAddModalOpen(true)}
            className="text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-white gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Appliance / System
          </Button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200/90 bg-white p-4">
          <span className="text-xs font-medium text-slate-500">Registered Assets</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{state.assets.length}</div>
          <span className="text-[11px] text-slate-400">Fixed & movable fixtures</span>
        </div>
        <div className="rounded-xl border border-slate-200/90 bg-white p-4">
          <span className="text-xs font-medium text-slate-500">Needs Service</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{needingServiceCount}</div>
          <span className="text-[11px] text-amber-700">Action items flagged</span>
        </div>
        <div className="rounded-xl border border-slate-200/90 bg-white p-4">
          <span className="text-xs font-medium text-slate-500">Active Warranties</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {state.assets.filter(a => a.warrantyStatus === "Active").length}
          </div>
          <span className="text-[11px] text-emerald-700">Covered under manufacturer</span>
        </div>
        <div className="rounded-xl border border-slate-200/90 bg-white p-4">
          <span className="text-xs font-medium text-slate-500">Stored Documents</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalDocsCount}</div>
          <span className="text-[11px] text-slate-400">Invoices, manuals & cards</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200/90">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by appliance name, brand, model, or room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-sm bg-slate-50/50 border-slate-200"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-xl border border-slate-200">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-slate-900">No assets match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or search terms</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedCondition("All"); }}
              className="mt-4 text-xs"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden flex flex-col justify-between group hover:border-slate-400 transition-all">
              <div>
                {/* Header Image Strip / Banner */}
                <div className="h-28 w-full bg-slate-100 relative overflow-hidden">
                  <img
                    src={asset.thumbnail}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] shadow-xs backdrop-blur-md ${
                      asset.condition === "Good"
                        ? "bg-emerald-500/90 text-white"
                        : asset.condition === "Needs Attention"
                        ? "bg-amber-500/90 text-white"
                        : "bg-purple-600/90 text-white"
                    }`}>
                      {asset.condition}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-200">
                      {asset.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {asset.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {asset.brand} • {asset.model}
                    </p>
                    <p className="text-xs font-medium text-slate-700 mt-1">
                      📍 {asset.room}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Warranty Status:</span>
                      <span className={`font-semibold ${
                        asset.warrantyStatus === "Active" ? "text-emerald-700" : "text-slate-500"
                      }`}>
                        {asset.warrantyStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Last Serviced:</span>
                      <span className="font-medium text-slate-900">{asset.lastServiced}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Next Due:</span>
                      <span className="font-medium text-amber-700">{asset.nextServiceDue}</span>
                    </div>
                  </div>

                  {asset.notes && (
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 leading-relaxed line-clamp-2">
                      {asset.notes}
                    </div>
                  )}
                </CardContent>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> {asset.documents.length} Files
                </span>
                <a href={`/asset/${asset.id}`}>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 font-semibold gap-1 hover:text-blue-800 p-0">
                    View Asset Record <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </a>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add New Asset Dialog */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Appliance or System to Inventory</DialogTitle>
            <DialogDescription>
              Create a persistent record for your home ledger with warranty details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddAsset} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Appliance / System Name *</label>
              <Input
                placeholder="e.g. Havells 25L Storage Geyser"
                value={newAsset.name}
                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Category</label>
                <select
                  value={newAsset.category}
                  onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                  className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-xs"
                >
                  <option value="HVAC">HVAC</option>
                  <option value="Water & Plumbing">Water & Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Safety & Utility">Safety & Utility</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Room / Zone</label>
                <Input
                  placeholder="e.g. Master Bath"
                  value={newAsset.room}
                  onChange={(e) => setNewAsset({ ...newAsset, room: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Brand *</label>
                <Input
                  placeholder="e.g. Daikin / Havells"
                  value={newAsset.brand}
                  onChange={(e) => setNewAsset({ ...newAsset, brand: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Model / Specs</label>
                <Input
                  placeholder="e.g. 5-Star Inverter"
                  value={newAsset.model}
                  onChange={(e) => setNewAsset({ ...newAsset, model: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Purchase Date</label>
                <Input
                  placeholder="e.g. 15 Mar 2024"
                  value={newAsset.purchaseDate}
                  onChange={(e) => setNewAsset({ ...newAsset, purchaseDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Warranty Expiry</label>
                <Input
                  placeholder="e.g. 14 Mar 2027"
                  value={newAsset.warrantyExpiry}
                  onChange={(e) => setNewAsset({ ...newAsset, warrantyExpiry: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Invoice PDF & warranty card will be automatically attached to this asset.</span>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white">
                Save Asset to HomeOS
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
