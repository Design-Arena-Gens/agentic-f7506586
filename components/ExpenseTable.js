"use client";

import { categories } from "@/lib/data";
import { FiArrowDownRight } from "react-icons/fi";

const categoryMap = categories.reduce((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {});

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

export default function ExpenseTable({ expenses, onDeleteExpense }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
          <p className="text-sm text-slate-500">
            Monitor new transactions as they flow in across accounts.
          </p>
        </div>
        <button className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 md:flex">
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Account</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-right">Date</th>
              <th aria-label="actions" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {expenses.map((expense) => {
              const category = categoryMap[expense.category];
              return (
                <tr key={expense.id} className="transition hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-slate-700"
                      style={{ backgroundColor: `${category?.color}1a` }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: category?.color }}
                      />
                      {category?.name ?? "Other"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{expense.account}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-900">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit"
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      <FiArrowDownRight />
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
