"use client";

import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { categories } from "@/lib/data";

const initialState = {
  description: "",
  amount: "",
  date: "",
  category: categories[0]?.id ?? "",
  account: "Chase Checking"
};

const accountsOptions = [
  "Chase Checking",
  "Amex Gold",
  "Chase Sapphire",
  "Ally High-Yield Savings"
];

export default function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.description || !formData.amount || !formData.date) return;

    const newExpense = {
      ...formData,
      id: crypto.randomUUID(),
      amount: Number.parseFloat(formData.amount)
    };

    onAddExpense(newExpense);
    setFormData(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Quick Expense Entry
        </h3>
        <p className="text-sm text-slate-500">
          Keep spending data accurate by logging expenses in realtime.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium text-slate-600">
            Description
          </label>
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Trader Joe&apos;s grocery run"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-sm font-medium text-slate-600">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            step="0.01"
            onChange={handleChange}
            placeholder="0.00"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-sm font-medium text-slate-600">
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-medium text-slate-600">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="account" className="text-sm font-medium text-slate-600">
          Account
        </label>
        <select
          id="account"
          name="account"
          value={formData.account}
          onChange={handleChange}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
        >
          {accountsOptions.map((account) => (
            <option key={account} value={account}>
              {account}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
      >
        <FiPlusCircle />
        Log Expense
      </button>
    </form>
  );
}
