"use client";

import { useState } from "react";
import { FiMenu, FiPieChart, FiSettings, FiX } from "react-icons/fi";

const navigation = [
  { id: "dashboard", label: "Dashboard" },
  { id: "expenses", label: "Expenses" },
  { id: "budgets", label: "Budgets" },
  { id: "insights", label: "Insights" }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-soft">
            <FiPieChart size={22} />
          </span>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              FlowTrack
            </p>
            <h1 className="text-xl font-semibold text-slate-900 leading-tight">
              Smart Expense Management
            </h1>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-500 md:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-4 py-2 transition-colors hover:text-brand-600 hover:bg-brand-50"
            >
              {item.label}
            </a>
          ))}
          <button className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700">
            <FiSettings />
            Customize
          </button>
        </nav>
        <button
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4 text-sm font-medium text-slate-600">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700">
              <FiSettings />
              Customize
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
