import React, { useState } from "react";
import { Search, MapPin, Check } from "lucide-react";
import { JobBoard, SearchRequest, JOB_BOARD_INFO } from "../types";
import { cn } from "../lib/utils";

const JOB_BOARDS: JobBoard[] = [
  "linkedin",
  "indeed",
  "wellfound",
  "yc_jobs",
  "levels_fyi",
  "glassdoor",
];

interface SearchFormProps {
  onSearch: (request: SearchRequest) => void;
  isSearching: boolean;
}

export function SearchForm({ onSearch, isSearching }: SearchFormProps) {
  const [keywords, setKeywords] = useState("AI Engineer");
  const [location, setLocation] = useState("San Francisco");
  const [selectedBoards, setSelectedBoards] = useState<JobBoard[]>([
    "linkedin",
    "indeed",
    "wellfound",
    "yc_jobs",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim() || selectedBoards.length === 0) return;

    onSearch({
      keywords: keywords.trim(),
      location: location.trim(),
      job_boards: selectedBoards,
    });
  };

  const toggleBoard = (board: JobBoard) => {
    setSelectedBoards((prev) =>
      prev.includes(board) ? prev.filter((b) => b !== board) : [...prev, board]
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white/90 shadow-xl shadow-slate-900/5 p-6 md:p-8 space-y-7"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Job Title / Keywords
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="AI Engineer, ML Engineer, LLM..."
              className="w-full pl-10 pr-4 py-3.5 border border-slate-300 rounded-xl bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="San Francisco, Remote, New York..."
              className="w-full pl-10 pr-4 py-3.5 border border-slate-300 rounded-xl bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Select Job Boards to Search
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {JOB_BOARDS.map((board) => {
            const isSelected = selectedBoards.includes(board);
            return (
              <button
                key={board}
                type="button"
                onClick={() => toggleBoard(board)}
                className={cn(
                  "px-3 py-2.5 rounded-xl text-sm font-medium border flex items-center justify-between",
                  isSelected
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <span>{JOB_BOARD_INFO[board].name}</span>
                <span
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center border",
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-slate-300 text-transparent"
                  )}
                >
                  <Check className="w-3.5 h-3.5" />
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Selected: {selectedBoards.length} board{selectedBoards.length !== 1 ? "s" : ""}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSearching || selectedBoards.length === 0 || !keywords.trim()}
        className={cn(
          "w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3",
          isSearching || selectedBoards.length === 0 || !keywords.trim()
            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white hover:shadow-lg hover:shadow-cyan-600/25 hover:-translate-y-0.5"
        )}
      >
        {isSearching ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Searching {selectedBoards.length} Job Boards...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Search {selectedBoards.length} Job Board{selectedBoards.length !== 1 ? "s" : ""}
          </>
        )}
      </button>
    </form>
  );
}
