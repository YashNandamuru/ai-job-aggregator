import { Briefcase, Globe, RotateCcw, SearchCheck, CheckCircle2, Sparkles } from "lucide-react";
import { SearchForm } from "./components/SearchForm";
import { AgentCard } from "./components/AgentCard";
import { ResultsTable } from "./components/ResultsTable";
import { useJobSearch } from "./hooks/useJobSearch";

function App() {
  const { agents, allJobs, isSearching, error, searchedBoards, search, reset } =
    useJobSearch();

  const activeAgents = searchedBoards.map((board) => agents[board]);
  const hasStarted = searchedBoards.length > 0;
  const completedCount = activeAgents.filter((a) => a.status === "completed").length;
  const runningCount = activeAgents.filter((a) => a.status === "running").length;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-16 -right-40 h-[28rem] w-[28rem] rounded-full bg-emerald-200/25 blur-3xl pointer-events-none" />

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">AI Job Aggregator</h1>
              <p className="text-xs text-slate-500 truncate">Parallel AI job search assistant</p>
            </div>
          </div>

          {hasStarted && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-400"
            >
              <RotateCcw className="w-4 h-4" />
              New Search
            </button>
          )}
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-8">
        {!hasStarted && (
          <div className="text-center max-w-3xl mx-auto pt-2 pb-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Multi-board AI job search
            </div>
          </div>
        )}

        <SearchForm onSearch={search} isSearching={isSearching} />

        {error && (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 text-rose-700 px-5 py-4 flex items-start gap-3 shadow-sm">
            <span className="mt-0.5 font-bold">!</span>
            <div>
              <p className="font-semibold">Search Error</p>
              <p className="text-sm text-rose-700/90">{error}</p>
            </div>
          </div>
        )}

        {hasStarted && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                <Globe className="w-3.5 h-3.5" />
                Boards
              </div>
              <p className="mt-1 text-2xl font-bold text-slate-900">{searchedBoards.length}</p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50/80 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-blue-600">
                <SearchCheck className="w-3.5 h-3.5" />
                Running
              </div>
              <p className="mt-1 text-2xl font-bold text-blue-700">{runningCount}</p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </div>
              <p className="mt-1 text-2xl font-bold text-emerald-700">{completedCount}</p>
            </div>

            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/80 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-cyan-700">
                <Briefcase className="w-3.5 h-3.5" />
                Jobs Found
              </div>
              <p className="mt-1 text-2xl font-bold text-cyan-800">{allJobs.length}</p>
            </div>
          </section>
        )}

        {hasStarted && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Agent Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {activeAgents.map((agent) => (
                <AgentCard key={agent.board} agent={agent} />
              ))}
            </div>
          </section>
        )}

        <ResultsTable jobs={allJobs} />
      </main>

      <footer className="border-t border-slate-200/80 bg-white/75 backdrop-blur-md mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-slate-500">AI Job Aggregator</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

