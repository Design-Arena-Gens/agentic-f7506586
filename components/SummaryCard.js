"use client";

export default function SummaryCard({ title, value, change, trend, accent }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {title}
        </p>
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: accent }}
        >
          {trend}
        </span>
      </div>
      <p className="text-3xl font-semibold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{change}</p>
    </div>
  );
}
