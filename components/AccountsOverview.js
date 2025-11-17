"use client";

import { FiActivity } from "react-icons/fi";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

export default function AccountsOverview({ accounts }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Connected Accounts
          </h3>
          <p className="text-sm text-slate-500">
            Sync balances across banking, credit, and savings in one command center.
          </p>
        </div>
        <FiActivity className="hidden text-brand-500 lg:block" size={22} />
      </div>
      <ul className="flex flex-col gap-3">
        {accounts.map((account) => (
          <li
            key={account.id}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                {account.type}
              </p>
              <p className="text-base font-semibold text-slate-900">
                {account.name}
              </p>
            </div>
            <p
              className={`text-base font-semibold ${
                account.balance >= 0 ? "text-slate-900" : "text-red-500"
              }`}
            >
              {formatCurrency(account.balance)}
            </p>
          </li>
        ))}
      </ul>
      <button className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-600">
        Add Account
      </button>
    </div>
  );
}
