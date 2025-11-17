"use client";

import { FiTrendingUp } from "react-icons/fi";

export default function BudgetProgress({ budgets }) {
  return (
    <div
      id="budgets"
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Budgets &amp; Guardrails
          </h3>
          <p className="text-sm text-slate-500">
            Keep monthly targets on track with smart guardrails and alerts.
          </p>
        </div>
        <FiTrendingUp className="hidden text-brand-500 lg:block" size={24} />
      </div>
      <div className="flex flex-col gap-4">
        {budgets.map((budget) => {
          const percent = Math.min((budget.spent / budget.limit) * 100, 100);
          const overBudget = budget.spent > budget.limit;

          return (
            <div key={budget.id} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                    {budget.name}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${budget.spent.toLocaleString()}{" "}
                    <span className="text-sm font-medium text-slate-400">
                      / ${budget.limit.toLocaleString()}
                    </span>
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    overBudget
                      ? "bg-red-100 text-red-600"
                      : percent > 80
                        ? "bg-amber-100 text-amber-600"
                        : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {overBudget ? "Over budget" : `${percent.toFixed(0)}% of target`}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${
                    overBudget
                      ? "bg-red-400"
                      : percent > 80
                        ? "bg-amber-400"
                        : "bg-brand-500"
                  }`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
