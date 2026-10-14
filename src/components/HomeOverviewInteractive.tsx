import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Wrench, 
  Droplets, 
  Zap, 
  FileText, 
  ChevronRight,
  ExternalLink,
  PlusCircle,
  Building,
  Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStoredState, completeTask, updateFindingStatus, type HomeOSState } from "@/data/store";

export const HomeOverviewInteractive: React.FC = () => {
  const [state, setState] = useState<HomeOSState | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    setState(getStoredState());

    const handleStateChange = (e: any) => {
      setState(e.detail);
    };

    window.addEventListener("homeos:state-changed", handleStateChange);
    return () => window.removeEventListener("homeos:state-changed", handleStateChange);
  }, []);

  if (!state) return null;

  const openFindings = state.findings.filter((f) => f.status !== "resolved");
  const urgentFinding = openFindings.find((f) => f.severity === "high" || f.severity === "critical");
  const pendingTasks = state.tasks.filter((t) => t.status !== "completed");
  const completedTasks = state.tasks.filter((t) => t.status === "completed");

  const handleCompleteTask = (taskId: string, taskTitle: string) => {
    completeTask(taskId);
    setSuccessToast(`Completed "${taskTitle}"! Health score updated.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="critical">Critical</Badge>;
      case "high":
        return <Badge variant="high">High Priority</Badge>;
      case "medium":
        return <Badge variant="medium">Medium Priority</Badge>;
      default:
        return <Badge variant="low">Routine</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="high">Action Required</Badge>;
      case "scheduled":
        return <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case "resolved":
        return <Badge variant="success">Resolved</Badge>;
      case "monitoring":
        return <Badge variant="monitoring">Monitoring</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Property Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6 md:p-8 shadow-md">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300">
              <span className="bg-slate-800/90 border border-slate-700 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                {state.profile.type} • {state.profile.carpetArea}
              </span>
              <span className="bg-slate-800/90 border border-slate-700 px-2.5 py-0.5 rounded-full">
                {state.profile.occupancyType}
              </span>
              <span className="text-slate-400">
                Last Assessed: {state.profile.lastInspectionDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {state.profile.name}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              {state.profile.address}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> HomeOS ID: 
                <span className="font-mono text-slate-200 ml-1">{state.profile.inspectionId}</span>
              </span>
              <span>•</span>
              <span>Resident: <strong>{state.profile.residents}</strong></span>
            </div>
          </div>

          {/* Health Score Pill */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 flex items-center gap-5 sm:min-w-[280px]">
            <div className="relative flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="7"
                  className="text-slate-700/60"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="7"
                  className="text-emerald-400 transition-all duration-1000 ease-out"
                  fill="transparent"
                  strokeDasharray={213.6}
                  strokeDashoffset={213.6 - (213.6 * state.profile.healthScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black tracking-tight text-white leading-none">
                  {state.profile.healthScore}
                </span>
                <span className="text-[10px] text-slate-300 font-semibold uppercase mt-0.5">/ 100</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Home Health Index
              </div>
              <div className="text-sm font-medium text-white leading-snug">
                {state.profile.healthStatus}
              </div>
              <div className="text-[11px] text-slate-300">
                {openFindings.length} open {openFindings.length === 1 ? "finding" : "findings"} recorded
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-700/70 flex flex-wrap items-center gap-3">
          <a href="/xray-report">
            <Button size="sm" variant="subtle" className="text-xs font-medium gap-1.5 bg-white text-slate-900 hover:bg-slate-100 border-none">
              <FileText className="w-3.5 h-3.5 text-blue-600" /> View Home X-Ray Report
            </Button>
          </a>
          <a href="/maintenance">
            <Button size="sm" variant="outline" className="text-xs font-medium gap-1.5 border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Maintenance Planner ({pendingTasks.length})
            </Button>
          </a>
          <a href="/marketplace">
            <Button size="sm" variant="outline" className="text-xs font-medium gap-1.5 border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700">
              <Wrench className="w-3.5 h-3.5 text-amber-400" /> Book Verified Service
            </Button>
          </a>
          <a href="/inventory" className="ml-auto text-xs text-slate-300 hover:text-white flex items-center gap-1">
            Browse {state.assets.length} Registered Assets <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* High Priority Urgent Alert (if any) */}
      {urgentFinding && (
        <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 sm:p-5 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="rounded-lg bg-amber-200/80 p-2 text-amber-900 mt-0.5 shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Priority Action Item
                </span>
                <span className="text-xs text-amber-700 font-medium">Detected during Home X-Ray</span>
              </div>
              <h2 className="text-base font-bold text-amber-950 mt-1">
                {urgentFinding.title}
              </h2>
              <p className="text-xs text-amber-800 mt-0.5 max-w-2xl leading-relaxed">
                {urgentFinding.summary} Location: <strong>{urgentFinding.room}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a href={`/finding/${urgentFinding.id}`} className="w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto bg-amber-900 hover:bg-amber-950 text-white text-xs gap-1">
                Inspect Finding & Schedule <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Main Grid: Left Column (Findings & Tasks), Right Column (Telemetry & Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Actionable Findings & Maintenance */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Findings Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Inspection Findings</span>
                  <Badge variant="outline" className="font-semibold text-xs">
                    {state.findings.length} Total
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-1">
                  Observable issues identified during certified Home X-Ray assessments
                </CardDescription>
              </div>
              <a href="/xray-report" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                Full Report <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </CardHeader>
            <CardContent className="space-y-3">
              {state.findings.map((finding) => (
                <div
                  key={finding.id}
                  className="rounded-xl border border-slate-200/80 p-4 transition-all hover:border-slate-300 hover:shadow-xs bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      {getSeverityBadge(finding.severity)}
                      {getStatusBadge(finding.status)}
                      <span className="text-xs text-slate-500 font-medium">
                        {finding.category} • {finding.room}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Observed: {finding.dateDetected}
                    </span>
                  </div>

                  <div className="pt-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        {finding.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        {finding.summary}
                      </p>
                      {finding.resolutionNotes && (
                        <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 border border-slate-200/60 rounded-md p-2">
                          <strong>Note:</strong> {finding.resolutionNotes}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <a href={`/finding/${finding.id}`}>
                        <Button variant="outline" size="sm" className="text-xs gap-1">
                          View Evidence <ArrowRight className="w-3 h-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Maintenance Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Upcoming Maintenance Planner</span>
                  <Badge variant="high" className="font-semibold text-xs">
                    {pendingTasks.length} Due
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-1">
                  Scheduled preventive work, filter renewals, and contractor visits
                </CardDescription>
              </div>
              <a href="/maintenance" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                Open Planner <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  All scheduled maintenance tasks are up to date!
                </div>
              ) : (
                pendingTasks.slice(0, 4).map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-slate-200/90 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleCompleteTask(task.id, task.title)}
                        className="mt-0.5 h-5 w-5 rounded-md border-2 border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                        title="Mark task completed"
                      >
                        <Check className="w-3 h-3 text-transparent hover:text-emerald-600" />
                      </button>
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-slate-900">
                          {task.title}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-medium text-slate-700">{task.assetName}</span>
                          <span>•</span>
                          <span>Due: <strong>{task.dueDate}</strong></span>
                          <span>•</span>
                          <span>Est: {task.estimatedCost}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-8 sm:ml-0">
                      {task.scheduledProvider ? (
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium border border-blue-200">
                          Assigned: {task.scheduledProvider.split(" ")[0]}
                        </span>
                      ) : (
                        <a href="/marketplace">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Find Provider
                          </Button>
                        </a>
                      )}
                      <Button
                        variant="subtle"
                        size="sm"
                        onClick={() => handleCompleteTask(task.id, task.title)}
                        className="h-7 text-xs text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
                      >
                        Mark Done
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Inventory Strip */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Registered Systems & Appliances
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-1">
                  Active register of installed fixtures, warranties, and service schedules
                </CardDescription>
              </div>
              <a href="/inventory" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                View All ({state.assets.length}) <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {state.assets.map((asset) => (
                  <a
                    key={asset.id}
                    href={`/asset/${asset.id}`}
                    className="group rounded-xl border border-slate-200 p-3 hover:border-slate-400 hover:shadow-xs transition-all bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-slate-500 font-medium">{asset.category}</span>
                        <span className={`px-1.5 py-0.2 rounded font-semibold text-[10px] ${
                          asset.condition === "Good"
                            ? "bg-emerald-50 text-emerald-700"
                            : asset.condition === "Needs Attention"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-purple-50 text-purple-700"
                        }`}>
                          {asset.condition}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {asset.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {asset.room}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{asset.documents.length} docs stored</span>
                      <span className="group-hover:translate-x-0.5 transition-transform text-slate-600 font-medium">Details →</span>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Monitoring Preview & Home Timeline */}
        <div className="space-y-8">
          
          {/* Live Telemetry Preview Card */}
          <Card className="border-slate-300 overflow-hidden">
            <div className="bg-slate-900 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></div>
                  <h3 className="text-sm font-bold tracking-tight">Home Telemetry</h3>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                  Demo Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {state.monitoring.disclaimer}
              </p>
            </div>

            <CardContent className="p-4 space-y-5">
              {/* Water Tank Monitor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-500" /> Overhead Tank Level
                  </span>
                  <span className="font-mono font-bold text-blue-700">
                    {state.monitoring.waterTank.overheadLevelPercent}% ({state.monitoring.waterTank.overheadVolumeLiters}L)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${state.monitoring.waterTank.overheadLevelPercent}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Sump: {state.monitoring.waterTank.sumpLevelPercent}% (4,550L reserve)</span>
                  <span className="text-emerald-700 font-medium">No active leaks detected</span>
                </div>
              </div>

              {/* Electricity Monitor */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" /> Current Power Draw
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {state.monitoring.electricity.currentLoadWatts} W
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                  <div>
                    <span className="text-slate-500 block">Today's Total:</span>
                    <strong className="text-slate-800">{state.monitoring.electricity.todayConsumptionKwh} kWh</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Supply Voltage:</span>
                    <strong className="text-emerald-700">{state.monitoring.electricity.voltage}</strong>
                  </div>
                </div>
              </div>

              {/* Leak Sensors */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Acoustic Wet Zone Sensors
                </span>
                <div className="space-y-1.5">
                  {state.monitoring.leakSensors.map((sensor) => (
                    <div key={sensor.id} className="flex items-center justify-between text-[11px] p-1.5 rounded bg-slate-50">
                      <span className="text-slate-700 truncate max-w-[170px]">{sensor.location}</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        {sensor.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <a href="/monitoring" className="block text-center pt-2">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Full Telemetry Dashboard →
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Chronological Home Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Home History Timeline</span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Persistent log of repairs, inspections, and verified servicing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-slate-200 ml-2 space-y-5 py-1">
                {state.timeline.map((event) => (
                  <div key={event.id} className="relative pl-5">
                    <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${
                      event.type === "inspection" 
                        ? "bg-blue-600" 
                        : event.type === "service_completed" || event.type === "maintenance_completed"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}></span>
                    <div className="text-[11px] font-semibold text-slate-400">
                      {event.date}
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      {event.title}
                    </div>
                    <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {event.description}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 italic">
                      Logged by: {event.actor}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};
