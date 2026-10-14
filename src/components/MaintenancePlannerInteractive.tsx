import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Wrench, 
  Check, 
  RotateCw, 
  CalendarClock, 
  DollarSign,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { getStoredState, completeTask, saveState, type HomeOSState } from "@/data/store";
import { providersList, type MaintenanceTask } from "@/data/mockData";

export const MaintenancePlannerInteractive: React.FC = () => {
  const [state, setState] = useState<HomeOSState | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "scheduled" | "completed">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    assetName: "",
    category: "General Maintenance",
    priority: "medium",
    dueDate: "",
    estimatedCost: "",
    recurringFrequency: "Every 6 Months",
  });

  useEffect(() => {
    setState(getStoredState());
    const handleStateChange = (e: any) => setState(e.detail);
    window.addEventListener("homeos:state-changed", handleStateChange);
    return () => window.removeEventListener("homeos:state-changed", handleStateChange);
  }, []);

  if (!state) return null;

  const handleMarkComplete = (task: MaintenanceTask) => {
    completeTask(task.id);
    setToastMessage(`Completed "${task.title}"! Added to permanent timeline.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    const created: MaintenanceTask = {
      id: `tsk-${Date.now()}`,
      title: newTask.title,
      assetName: newTask.assetName || "Home Facility",
      category: newTask.category,
      priority: newTask.priority as any,
      dueDate: newTask.dueDate || "Next Month",
      status: "pending",
      estimatedCost: newTask.estimatedCost || "₹1,000",
      recurringFrequency: newTask.recurringFrequency,
    };

    const nextState = { ...state, tasks: [created, ...state.tasks] };
    saveState(nextState);
    setNewTaskModalOpen(false);
    setNewTask({
      title: "",
      assetName: "",
      category: "General Maintenance",
      priority: "medium",
      dueDate: "",
      estimatedCost: "",
      recurringFrequency: "Every 6 Months",
    });
    setToastMessage(`Created new maintenance task: "${created.title}"`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAssignProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskId || !selectedProvider) return;

    const updatedTasks = state.tasks.map((t) => {
      if (t.id === selectedTaskId) {
        return {
          ...t,
          status: "scheduled" as const,
          scheduledProvider: selectedProvider,
        };
      }
      return t;
    });

    saveState({ ...state, tasks: updatedTasks });
    setAssignModalOpen(false);
    setToastMessage(`Assigned ${selectedProvider} to task!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredTasks = state.tasks.filter((t) => {
    if (activeTab === "all") return true;
    return t.status === activeTab;
  });

  const pendingCount = state.tasks.filter((t) => t.status === "pending").length;
  const scheduledCount = state.tasks.filter((t) => t.status === "scheduled").length;
  const completedCount = state.tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Maintenance Operating System</span>
            <span>•</span>
            <span>{state.profile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Preventive Maintenance Planner
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Transforming inspection observations and equipment schedules into scheduled, budgeted tasks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setNewTaskModalOpen(true)}
            className="text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Maintenance Task
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200/90 bg-white p-4">
          <span className="text-xs font-medium text-slate-500">Pending Actions</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{pendingCount}</div>
          <span className="text-[11px] text-slate-400">Due within 30 days</span>
        </div>
        <div className="rounded-xl border border-slate-200/90 bg-white p-4">
          <span className="text-xs font-medium text-slate-500">Scheduled Visits</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{scheduledCount}</div>
          <span className="text-[11px] text-blue-700">Contractors booked</span>
        </div>
        <div className="rounded-xl border border-slate-200/90 bg-white p-4">
          <span className="text-xs font-medium text-slate-500">Completed Works</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{completedCount}</div>
          <span className="text-[11px] text-emerald-700">Recorded in home history</span>
        </div>
        <div className="rounded-xl border border-slate-200/90 bg-white p-4">
          <span className="text-xs font-medium text-slate-500">Upcoming Budget</span>
          <div className="text-2xl font-black text-slate-900 mt-1">₹5,400</div>
          <span className="text-[11px] text-slate-400">Est. 60-day maintenance</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Tasks ({state.tasks.length})
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "pending" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Due Soon ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "scheduled" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Scheduled ({scheduledCount})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "completed" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Task List Cards */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
            No tasks in this view.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                task.status === "completed"
                  ? "border-slate-200/80 bg-slate-50/40 opacity-80"
                  : "border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => handleMarkComplete(task)}
                  disabled={task.status === "completed"}
                  className={`mt-0.5 h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    task.status === "completed"
                      ? "border-emerald-600 bg-emerald-600 text-white cursor-default"
                      : "border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 text-transparent"
                  }`}
                  title={task.status === "completed" ? "Completed" : "Click to mark complete"}
                >
                  <Check className="w-3.5 h-3.5" />
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      task.priority === "high" ? "bg-orange-100 text-orange-800" :
                      task.priority === "medium" ? "bg-amber-100 text-amber-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {task.category}
                    </span>
                    {task.recurringFrequency && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <RotateCw className="w-3 h-3" /> {task.recurringFrequency}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-bold text-slate-900 ${
                    task.status === "completed" ? "line-through text-slate-500" : ""
                  }`}>
                    {task.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                    <span>Target Asset: <strong className="text-slate-700">{task.assetName}</strong></span>
                    <span>•</span>
                    <span>Due: <strong>{task.dueDate}</strong></span>
                    <span>•</span>
                    <span>Estimated Cost: <strong className="font-mono text-slate-800">{task.estimatedCost}</strong></span>
                  </div>

                  {task.scheduledProvider && (
                    <div className="mt-1 text-xs text-blue-700 font-semibold flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" /> Assigned Contractor: {task.scheduledProvider}
                    </div>
                  )}

                  {task.completedDate && (
                    <div className="text-[11px] text-emerald-700 font-semibold pt-0.5">
                      ✓ Completed and recorded in Home History on {task.completedDate}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-8 md:ml-0 shrink-0">
                {task.status !== "completed" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTaskId(task.id);
                        setSelectedProvider(providersList[0].name);
                        setAssignModalOpen(true);
                      }}
                      className="text-xs h-8"
                    >
                      {task.scheduledProvider ? "Change Provider" : "Schedule Tech"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleMarkComplete(task)}
                      className="text-xs h-8 bg-emerald-700 hover:bg-emerald-800 text-white"
                    >
                      Mark Done
                    </Button>
                  </>
                )}
                {task.status === "completed" && (
                  <Badge variant="success">Completed</Badge>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      <Dialog open={newTaskModalOpen} onOpenChange={setNewTaskModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Maintenance Action</DialogTitle>
            <DialogDescription>
              Schedule routine work or follow up on an inspection finding.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddTask} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Task Title *</label>
              <Input
                placeholder="e.g. Clean AC air filters & foam rinse"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Target Appliance / Room</label>
                <Input
                  placeholder="e.g. Master Bed AC"
                  value={newTask.assetName}
                  onChange={(e) => setNewTask({ ...newTask, assetName: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Category</label>
                <Input
                  placeholder="e.g. HVAC"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-xs"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Due Date</label>
                <Input
                  placeholder="e.g. 20 Nov 2026"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Estimated Cost</label>
                <Input
                  placeholder="e.g. ₹1,200"
                  value={newTask.estimatedCost}
                  onChange={(e) => setNewTask({ ...newTask, estimatedCost: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Frequency</label>
                <select
                  value={newTask.recurringFrequency}
                  onChange={(e) => setNewTask({ ...newTask, recurringFrequency: e.target.value })}
                  className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-xs"
                >
                  <option value="One-time">One-time</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Every 6 Months">Every 6 Months</option>
                  <option value="Every 12 Months">Every 12 Months</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setNewTaskModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white">
                Add to Planner
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Assign Provider Modal */}
      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Verified Contractor</DialogTitle>
            <DialogDescription>
              Select a vetted local partner for this maintenance task.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAssignProvider} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-700">Available Verified Providers</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-xs"
              >
                {providersList.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.category} • ★ {p.rating})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
              Contractor will receive the job assignment with target asset specifications and location.
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white">
                Confirm Assignment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
