"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import SummaryCard from "@/components/SummaryCard";
import ExpenseTrendChart from "@/components/ExpenseTrendChart";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import BudgetProgress from "@/components/BudgetProgress";
import UpcomingBills from "@/components/UpcomingBills";
import AccountsOverview from "@/components/AccountsOverview";
import {
  initialExpenses,
  budgets,
  recurringBills,
  accounts,
  categories
} from "@/lib/data";
import { FiArrowUpRight, FiDownloadCloud, FiTarget } from "react-icons/fi";

const formatCurrency = (value, fractionDigits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);

export default function HomePage() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const totals = useMemo(() => {
    const totalSpend = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageTransaction =
      expenses.length > 0 ? totalSpend / expenses.length : 0;
    const last30Days = expenses.filter((expense) => {
      const delta = Date.now() - new Date(expense.date).getTime();
      return delta <= 1000 * 60 * 60 * 24 * 30;
    });
    const last30DaysTotal = last30Days.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const upcomingBillsTotal = recurringBills.reduce(
      (sum, bill) => sum + bill.amount,
      0
    );

    return {
      totalSpend,
      averageTransaction,
      last30DaysTotal,
      upcomingBillsTotal
    };
  }, [expenses]);

  const chartData = useMemo(() => {
    const sortedExpenses = [...expenses].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const mapByDate = sortedExpenses.reduce((acc, expense) => {
      const key = new Date(expense.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
      acc[key] = (acc[key] ?? 0) + expense.amount;
      return acc;
    }, {});

    return Object.entries(mapByDate).map(([name, spending]) => ({
      name,
      spending: Number(spending.toFixed(2))
    }));
  }, [expenses]);

  const categoryBreakdown = useMemo(() => {
    return categories.map((category) => {
      const total = expenses
        .filter((expense) => expense.category === category.id)
        .reduce((sum, expense) => sum + expense.amount, 0);

      return {
        ...category,
        total
      };
    });
  }, [expenses]);

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-24 pt-10 lg:px-6">
        <section id="dashboard" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Spend (30d)"
            value={formatCurrency(totals.last30DaysTotal)}
            change="+6.8% vs last cycle"
            trend="Live Sync"
            accent="#2563eb"
          />
          <SummaryCard
            title="Average Transaction"
            value={formatCurrency(totals.averageTransaction, 2)}
            change={`Across ${expenses.length} logged expenses`}
            trend="Smart Insights"
            accent="#f97316"
          />
          <SummaryCard
            title="Upcoming Bills"
            value={formatCurrency(totals.upcomingBillsTotal)}
            change="Auto-pay configured for 5 recurring bills"
            trend="Autopay"
            accent="#14b8a6"
          />
          <SummaryCard
            title="Total Spend YTD"
            value={formatCurrency(totals.totalSpend)}
            change="Includes connected cards & accounts"
            trend="Unified"
            accent="#a855f7"
          />
        </section>

        <section
          id="expenses"
          className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
        >
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    Intelligent Cashflow
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                    Track spending velocity across every account
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    FlowTrack consolidates transactions from your banking, credit,
                    and savings accounts to unlock proactive budgeting insights,
                    smart forecasts, and accountability nudges that keep you in
                    control.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-600">
                    <FiDownloadCloud />
                    Sync Statements
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-800">
                    <FiTarget />
                    Launch Goal
                  </button>
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-slate-50 p-6">
                <ExpenseTrendChart data={chartData} />
              </div>
            </div>

            <ExpenseTable
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
          <div className="flex flex-col gap-6">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <AccountsOverview accounts={accounts} />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <BudgetProgress budgets={budgets} />
          <UpcomingBills bills={recurringBills} />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                Category Spotlight
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                Tune spending habits with real-time category alerts
              </h3>
              <p className="text-sm text-slate-500">
                FlowTrack surfaces micro-trends by monitoring every category in
                your ecosystem. Leverage this view for accelerated savings wins
                and to spot habit drift before it snowballs.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-600">
              <FiArrowUpRight />
              Build Automation
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryBreakdown.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <p className="text-sm font-semibold text-slate-900">
                      {category.name}
                    </p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {category.total === 0 ? "Idle" : "Active"}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-slate-900">
                  {formatCurrency(category.total, 2)}
                </p>
                <p className="text-sm text-slate-500">
                  Smart alerts trigger once you break 80% of your monthly target.
                </p>
                <div className="h-2 rounded-full bg-white">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${
                        category.total ? Math.min((category.total / 600) * 100, 100) : 12
                      }%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white/70 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-slate-500 md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} FlowTrack Labs. Designed for velocity.</p>
          <div className="flex items-center gap-4">
            <a href="#dashboard">Overview</a>
            <a href="#expenses">Transactions</a>
            <a href="#budgets">Budgets</a>
            <a href="#insights">Insights</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
