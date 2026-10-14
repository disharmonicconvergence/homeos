import React, { useState } from "react";
import { 
  Building, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  Check, 
  User, 
  Phone, 
  Mail,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveInspectionBooking } from "@/data/store";

export const InspectBookingInteractive: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [clientType, setClientType] = useState<"Renter" | "Buyer">("Renter");
  const [city, setCity] = useState("Bengaluru");
  const [societyAddress, setSocietyAddress] = useState("Prestige Ferns Residency, Harlur Road");
  const [configuration, setConfiguration] = useState("3 BHK");
  const [sqFt, setSqFt] = useState("1,750");

  const [preferredDate, setPreferredDate] = useState("Tomorrow (15 Oct 2026)");
  const [preferredTime, setPreferredTime] = useState("Morning (10:00 AM - 12:30 PM)");
  const [concerns, setConcerns] = useState<string[]>([
    "Bathroom sub-surface seepages",
    "Pre-existing move-in tenant damage documentation",
    "Water pressure and TDS quality"
  ]);

  const [clientName, setClientName] = useState("Ananya Sen");
  const [clientPhone, setClientPhone] = useState("+91 98860 33491");
  const [clientEmail, setClientEmail] = useState("ananya.sen@gmail.com");
  const [accessArrangement, setAccessArrangement] = useState("Accompanying broker during scheduled viewing");

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const toggleConcern = (item: string) => {
    if (concerns.includes(item)) {
      setConcerns(concerns.filter((c) => c !== item));
    } else {
      setConcerns([...concerns, item]);
    }
  };

  const getPrice = () => {
    if (clientType === "Renter") {
      return configuration === "1 BHK" || configuration === "2 BHK" ? "₹2,499" : "₹3,499";
    } else {
      return configuration === "1 BHK" || configuration === "2 BHK" ? "₹3,999" : "₹5,499";
    }
  };

  const handleConfirmBooking = () => {
    const booking = {
      clientType,
      city,
      property: societyAddress,
      configuration,
      preferredDate,
      preferredTime,
      concerns,
      clientName,
      clientPhone,
      clientEmail,
      accessArrangement,
      fee: getPrice(),
    };

    const res = saveInspectionBooking(booking);
    setBookingId(res.recentBookings[0]?.id || `BK-${Date.now().toString().slice(-6)}`);
    setBookingConfirmed(true);
    setStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <a href="/inspect" className="hover:underline">Inspect Before You Commit</a>
          <span>/</span>
          <span>Book Property Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Book Pre-Commitment Property Inspection
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          A trained HomeOS representative will accompany you or visit the property to audit observable defects and document conditions.
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
        <div className={`p-2.5 rounded-lg border text-center transition-all ${
          step >= 1 ? "border-blue-600 bg-blue-50 text-blue-900 font-bold" : "border-slate-200 text-slate-400"
        }`}>
          1. Property Details
        </div>
        <div className={`p-2.5 rounded-lg border text-center transition-all ${
          step >= 2 ? "border-blue-600 bg-blue-50 text-blue-900 font-bold" : "border-slate-200 text-slate-400"
        }`}>
          2. Slot & Concerns
        </div>
        <div className={`p-2.5 rounded-lg border text-center transition-all ${
          step >= 3 ? "border-blue-600 bg-blue-50 text-blue-900 font-bold" : "border-slate-200 text-slate-400"
        }`}>
          3. Scope & Confirmation
        </div>
      </div>

      {/* Step 1: Property Details */}
      {step === 1 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              Tell us about the property you are evaluating
            </h2>
            <p className="text-xs text-slate-500">
              Select whether you intend to rent or buy so we adapt the assessment checklist.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">I am evaluating this property to:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setClientType("Renter")}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    clientType === "Renter" ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900">Rent the Property</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Documents move-in condition baseline & punch-list</div>
                </button>
                <button
                  type="button"
                  onClick={() => setClientType("Buyer")}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    clientType === "Buyer" ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900">Buy the Property</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Uncovers seepages, electrical load & seller questions</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm shadow-xs"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi-NCR">Delhi-NCR (Gurugram / Noida)</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Configuration</label>
                <select
                  value={configuration}
                  onChange={(e) => setConfiguration(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm shadow-xs"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="Villa">Independent Villa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Society / Apartment Name & Locality *</label>
              <Input
                placeholder="e.g. Prestige Ferns Residency, Harlur Road / Godrej Woodsman"
                value={societyAddress}
                onChange={(e) => setSocietyAddress(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Approximate Super Built-up / Carpet Area (sq. ft.)</label>
              <Input
                placeholder="e.g. 1,650"
                value={sqFt}
                onChange={(e) => setSqFt(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Estimated Service Fee: <strong className="text-slate-900 text-sm font-mono">{getPrice()}</strong>
            </span>
            <Button onClick={() => setStep(2)} className="bg-slate-900 text-white text-xs gap-1">
              Next: Schedule & Concerns <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Appointment Slot & Specific Concerns */}
      {step === 2 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              Select Appointment Slot & Specific Concerns
            </h2>
            <p className="text-xs text-slate-500">
              Pick your viewing window and specify any issues you noticed during casual inspection.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Preferred Date *</label>
                <Input
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  placeholder="e.g. Tomorrow (15 Oct 2026)"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Preferred Time Window *</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm shadow-xs"
                >
                  <option value="Morning (10:00 AM - 12:30 PM)">Morning (10:00 AM - 12:30 PM)</option>
                  <option value="Afternoon (02:00 PM - 04:30 PM)">Afternoon (02:00 PM - 04:30 PM)</option>
                  <option value="Late Afternoon (04:30 PM - 06:30 PM)">Late Afternoon (04:30 PM - 06:30 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                Requested Areas of Particular Focus:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  "Bathroom sub-surface seepages",
                  "Pre-existing move-in tenant damage documentation",
                  "Water pressure and TDS quality",
                  "Electrical earthing & RCCB tripping safety",
                  "Balcony sliding door tracks & drainage",
                  "Kitchen exhaust ducting & chimney status",
                  "AC copper piping & refrigerant drain lines",
                  "Wardrobe false ceiling moisture checks"
                ].map((item) => (
                  <label
                    key={item}
                    className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                      concerns.includes(item) ? "border-blue-600 bg-blue-50/60 font-medium text-blue-950" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={concerns.includes(item)}
                      onChange={() => toggleConcern(item)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Access Arrangement</label>
              <Input
                value={accessArrangement}
                onChange={(e) => setAccessArrangement(e.target.value)}
                placeholder="e.g. Accompanying broker during scheduled viewing"
                className="mt-1"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <Button variant="outline" onClick={() => setStep(1)} className="text-xs gap-1">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button onClick={() => setStep(3)} className="bg-slate-900 text-white text-xs gap-1">
              Next: Scope & Contact <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Scope Review & Contact Details */}
      {step === 3 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              Review Inspection Scope & Contact Information
            </h2>
            <p className="text-xs text-slate-500">
              Transparent assessment agreement with zero hidden charges.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Property</span>
                <strong className="text-slate-900">{societyAddress}</strong>
                <span className="text-slate-500 block">{configuration} • {city}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Appointment</span>
                <strong className="text-slate-900">{preferredDate}</strong>
                <span className="text-slate-500 block">{preferredTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Evaluation Type</span>
                <strong className="text-blue-700">{clientType} Inspection</strong>
                <span className="text-slate-900 font-mono font-bold block">{getPrice()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                <Input
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                <Input
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Scope & Limitation Notice */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-xs text-blue-950 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Agreed Scope & Operating Boundaries:
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed text-[11px]">
                <li>Our trained inspector evaluates accessible areas: visual dampness/seepages, plumbing pressure, electrical fixtures, door/window operation, and documented cosmetic baselines.</li>
                <li>Inaccessible zones or locked rooms will be explicitly identified as uninspected.</li>
                <li>Does not certify structural engineering rebar integrity, concealed underground piping, or municipal legal title.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <Button variant="outline" onClick={() => setStep(2)} className="text-xs gap-1">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button onClick={handleConfirmBooking} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-2 shadow-sm">
              <Check className="w-4 h-4" /> Confirm & Book Inspection ({getPrice()})
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Confirmation Screen */}
      {step === 4 && (
        <Card className="p-8 text-center space-y-6 border-emerald-300 bg-white shadow-md animate-in zoom-in-95">
          <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <Badge variant="success" className="text-xs px-3 py-1">
              Booking Confirmed
            </Badge>
            <h2 className="text-2xl font-black text-slate-900">
              Inspection Booked for {societyAddress}
            </h2>
            <p className="text-xs text-slate-600">
              Confirmation Code: <strong className="font-mono text-slate-900">{bookingId}</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-md mx-auto space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Assessor:</span>
              <strong className="text-slate-900">Rajesh Varma (Lead Assessor)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Slot:</span>
              <strong className="text-slate-900">{preferredDate} • {preferredTime}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Contact:</span>
              <strong className="text-slate-900">{clientPhone}</strong>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold">
              <span className="text-slate-500">Fee (Payable post-inspection):</span>
              <strong className="text-slate-900 font-mono">{getPrice()}</strong>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/inspect/sample-report">
              <Button className="bg-slate-900 text-white text-xs font-semibold gap-1.5 shadow-sm">
                <FileText className="w-4 h-4 text-blue-400" /> View Sample Property Inspection Report →
              </Button>
            </a>
            <a href="/">
              <Button variant="outline" className="text-xs">
                Return to HomeOS
              </Button>
            </a>
          </div>
        </Card>
      )}
    </div>
  );
};
