import { Loader2, CheckCircle, AlertCircle, Clock, ExternalLink } from "lucide-react";
import { AgentState, JOB_BOARD_INFO } from "../types";
import { cn } from "../lib/utils";

interface AgentCardProps {
  agent: AgentState;
}

export function AgentCard({ agent }: AgentCardProps) {
  const boardInfo = JOB_BOARD_INFO[agent.board];

  const statusMeta = {
    pending: {
      icon: <Clock className="w-4 h-4 text-slate-500" />,
      label: "Pending",
      card: "border-slate-200 bg-white",
      pill: "bg-slate-100 text-slate-600",
      message: "Waiting in queue...",
    },
    running: {
      icon: <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />,
      label: "Running",
      card: "border-blue-200 bg-blue-50/40 ring-1 ring-blue-100",
      pill: "bg-blue-100 text-blue-700",
      message: "Searching...",
    },
    completed: {
      icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
      label: "Completed",
      card: "border-emerald-200 bg-emerald-50/40",
      pill: "bg-emerald-100 text-emerald-700",
      message: `Found ${agent.jobs.length} jobs`,
    },
    error: {
      icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
      label: "Error",
      card: "border-rose-200 bg-rose-50/40",
      pill: "bg-rose-100 text-rose-700",
      message: agent.error || "Failed to search",
    },
  }[agent.status];

  return (
    <div className={cn("rounded-2xl border overflow-hidden shadow-sm", statusMeta.card)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/70 bg-white/80">
        <div className="flex items-center gap-2.5 min-w-0">
          {statusMeta.icon}
          <span className="font-semibold text-slate-900 truncate">{boardInfo.name}</span>
        </div>
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", statusMeta.pill)}>
          {statusMeta.label}
        </span>
      </div>

      {agent.status === "running" && agent.streamingUrl && (
        <div className="relative h-52 bg-slate-900">
          <iframe
            src={agent.streamingUrl}
            className="w-full h-full border-0"
            title={`Live preview for ${boardInfo.name}`}
            sandbox="allow-scripts allow-same-origin"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-rose-600 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="text-xs text-white font-semibold">LIVE</span>
          </div>
        </div>
      )}

      <div className="px-4 py-3">
        <p className="text-sm text-slate-600">
          {agent.status === "running" ? agent.message || statusMeta.message : statusMeta.message}
        </p>
      </div>

      {agent.status === "completed" && agent.jobs.length > 0 && (
        <div className="px-4 pb-4 space-y-2.5">
          {agent.jobs.slice(0, 3).map((job, i) => (
            <a
              key={i}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/40 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900 text-sm truncate group-hover:text-blue-700">
                    {job.title}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{job.company}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 flex-shrink-0" />
              </div>
            </a>
          ))}
          {agent.jobs.length > 3 && (
            <p className="text-xs text-slate-500 text-center">+{agent.jobs.length - 3} more jobs</p>
          )}
        </div>
      )}
    </div>
  );
}

