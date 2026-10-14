import React, { useState } from "react";
import { 
  Activity, 
  Droplets, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Gauge, 
  RotateCcw, 
  Waves, 
  ShieldAlert,
  Sliders,
  Sparkles,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const HomeMonitoringInteractive: React.FC = () => {
  const [overheadLevel, setOverheadLevel] = useState(74);
  const [sumpLevel, setSumpLevel] = useState(91);
  const [pumpRunning, setPumpRunning] = useState(false);
  const [simulatedLeak, setSimulatedLeak] = useState(false);
  const [voltage, setVoltage] = useState(231);
  const [loadWatts, setLoadWatts] = useState(1140);

  const handleSimulateLowWater = () => {
    setOverheadLevel(28);
    setPumpRunning(true);
  };

  const handleSimulateLeak = () => {
    setSimulatedLeak(true);
  };

  const handleSimulateVoltageSpike = () => {
    setVoltage(254);
  };

  const handleResetSimulation = () => {
    setOverheadLevel(74);
    setSumpLevel(91);
    setPumpRunning(false);
    setSimulatedLeak(false);
    setVoltage(231);
    setLoadWatts(1140);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Physical Systems Layer</span>
            <span>•</span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">
              Technology Preview
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Home Observability & Telemetry
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Actionable monitoring of overhead water reserves, supply stability, and acoustic micro-leak detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetSimulation}
            className="text-xs gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Telemetry
          </Button>
        </div>
      </div>

      {/* Prominent Demo Notice */}
      <div className="rounded-xl border border-amber-300 bg-amber-50/90 p-4 text-xs text-amber-950 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold">
            Simulated Sensor Telemetry Preview
          </div>
          <p className="text-amber-800 leading-relaxed">
            HomeOS is designed to be hardware-agnostic. In production, this layer connects to compatible third-party ultrasonic tank sensors, clamp-on CT energy monitors, and Zigbee/Wi-Fi moisture detectors. The readings below illustrate real-time automated anomaly handling.
          </p>
        </div>
      </div>

      {/* Interactive Simulation Sandbox Bar */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <Sliders className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-slate-200">Interactive Simulation Triggers:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="subtle"
            onClick={handleSimulateLowWater}
            className="text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
          >
            Trigger Low Tank (&lt;30%)
          </Button>
          <Button
            size="sm"
            variant="subtle"
            onClick={handleSimulateLeak}
            className="text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
          >
            Trigger RO Leak Alert
          </Button>
          <Button
            size="sm"
            variant="subtle"
            onClick={handleSimulateVoltageSpike}
            className="text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
          >
            Trigger High Voltage (254V)
          </Button>
        </div>
      </div>

      {/* Main Monitoring Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* System 1: Water Tank & Pump Monitoring */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span>Water Reserves & Pump Telemetry</span>
              </CardTitle>
              <Badge variant={overheadLevel < 35 ? "high" : "success"}>
                {overheadLevel < 35 ? "Low Water Reserve" : "Reserves Adequate"}
              </Badge>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Sintex 1,000L Overhead Tank + 5,000L Underground Sump
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            {/* Visual Tank Graphic */}
            <div className="grid grid-cols-2 gap-4 text-center">
              {/* Overhead Tank */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-600 mb-2">Overhead Tank</span>
                <div className="relative w-24 h-36 rounded-2xl border-2 border-slate-300 bg-white overflow-hidden shadow-inner flex flex-col justify-end">
                  <div
                    className={`w-full transition-all duration-700 ${
                      overheadLevel < 35 ? "bg-amber-500" : "bg-blue-500"
                    }`}
                    style={{ height: `${overheadLevel}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-slate-900 bg-white/30 backdrop-blur-xs">
                    {overheadLevel}%
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-800 mt-2">
                  {Math.round((overheadLevel * 1000) / 100)} / 1,000 L
                </span>
                <span className="text-[10px] text-slate-400">Rooftop Section</span>
              </div>

              {/* Sump Tank */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-600 mb-2">Underground Sump</span>
                <div className="relative w-24 h-36 rounded-2xl border-2 border-slate-300 bg-white overflow-hidden shadow-inner flex flex-col justify-end">
                  <div
                    className="w-full bg-cyan-600 transition-all duration-700"
                    style={{ height: `${sumpLevel}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-slate-900 bg-white/30 backdrop-blur-xs">
                    {sumpLevel}%
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-800 mt-2">
                  {Math.round((sumpLevel * 5000) / 100)} / 5,000 L
                </span>
                <span className="text-[10px] text-slate-400">Ground Basement Sump</span>
              </div>
            </div>

            {/* Pump Controller State */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">1HP Submersible Booster Pump:</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                  pumpRunning ? "bg-emerald-100 text-emerald-800 animate-pulse" : "bg-slate-100 text-slate-600"
                }`}>
                  {pumpRunning ? "RUNNING (Pumping to Tank)" : "IDLE (Standby)"}
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Logic: Auto-starts when overhead tank &lt; 40% and sump &gt; 25%. Dry-run auto protection enabled.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System 2: Electrical Grid & Safety Monitoring */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Electrical Load & Grid Health</span>
              </CardTitle>
              <Badge variant={voltage > 250 ? "critical" : "success"}>
                {voltage > 250 ? "Voltage Fluctuation" : "Grid Nominal"}
              </Badge>
            </div>
            <CardDescription className="text-xs text-slate-500">
              BESCOM 3-Phase Supply + Schneider RCCB Diagnostic
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Live Draw
                </span>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {loadWatts} <span className="text-sm font-normal text-slate-500">W</span>
                </div>
                <span className="text-[11px] text-slate-500 block">Baseline load ~380W</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Line Voltage
                </span>
                <div className={`text-3xl font-black font-mono ${
                  voltage > 250 ? "text-red-600 animate-pulse" : "text-emerald-700"
                }`}>
                  {voltage} <span className="text-sm font-normal text-slate-500">V</span>
                </div>
                <span className="text-[11px] text-slate-500 block">Nominal range: 220–240V</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-600">Today's Total Consumption:</span>
                <strong className="text-slate-900 font-mono">11.8 kWh (₹88.50 est.)</strong>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-600">Earth Resistance:</span>
                <strong className="text-emerald-700 font-mono">0.8 Ohms (Safe &lt; 2.0Ω)</strong>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-600">Schneider 30mA RCCB Health:</span>
                <strong className="text-emerald-700 font-semibold">Active Protection • Verified</strong>
              </div>
            </div>

            {voltage > 250 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-center gap-2 animate-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <span>
                  <strong>Voltage Warning:</strong> Line voltage reached 254V. Surge protection active on sensitive kitchen electronics.
                </span>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Acoustic Leak Detection Zone */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Waves className="w-5 h-5 text-purple-600" />
            <span>Wet Zone Acoustic Micro-Leak Sensors</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Smart moisture & acoustic sensors positioned at vulnerable failure points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Sensor 1 */}
            <div className={`p-4 rounded-xl border transition-all ${
              simulatedLeak
                ? "border-red-300 bg-red-50 text-red-950 shadow-sm"
                : "border-slate-200 bg-slate-50/50"
            }`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Under Kitchen RO Purifier</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  simulatedLeak ? "bg-red-200 text-red-800 animate-bounce" : "bg-emerald-100 text-emerald-800"
                }`}>
                  {simulatedLeak ? "LEAK DETECTED" : "Dry • Normal"}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {simulatedLeak 
                  ? "Moisture sensor triggered at RO drain connector. Recommend turning off inlet valve." 
                  : "Continuous acoustic monitoring. No anomalous water flow detected."}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-200/80 text-[11px] text-slate-400">
                Ping: Just now • Battery: 94%
              </div>
            </div>

            {/* Sensor 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Master Bath False Ceiling</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                  Dry • Normal
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Positioned beneath AO Smith Geyser pressure valve crawl space.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-200/80 text-[11px] text-slate-400">
                Ping: 1 min ago • Battery: 89%
              </div>
            </div>

            {/* Sensor 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Balcony Washer Tap</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                  Dry • Normal
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Monitoring high-pressure inlet braided hose on Bosch washing machine.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-200/80 text-[11px] text-slate-400">
                Ping: 2 mins ago • Battery: 91%
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};
