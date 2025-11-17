"use client";

import { FiCalendar } from "react-icons/fi";

const statusPalette = {
  scheduled: {
    background: "bg-slate-100",
    text: "text-slate-600",
    label: "Scheduled"
  },
  upcoming: {
    background: "bg-amber-100",
    text: "text-amber-600",
    label: "Upcoming"
  },
  "due soon": {
    background: "bg-red-100",
    text: "text-red-600",
    label: "Due soon"
  }
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit"
  });

export default function UpcomingBills({ bills }) {
  return (
    <div
      id="insights"
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Upcoming Bills</h3>
          <p className="text-sm text-slate-500">
            Automate your payments and avoid late fees with proactive alerts.
          </p>
        </div>
        <FiCalendar className="hidden text-brand-500 lg:block" size={22} />
      </div>
      <div className="flex flex-col gap-4">
        {bills.map((bill) => {
          const status = statusPalette[bill.status] ?? statusPalette.scheduled;
          return (
            <div
              key={bill.id}
              className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{bill.name}</p>
                <p className="text-sm text-slate-500">
                  Auto-pay ready • Due {formatDate(bill.dueDate)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-slate-900">
                  ${bill.amount.toLocaleString()}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${status.background} ${status.text}`}
                >
                  {status.label}
                </span>
                <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-brand-600">
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
