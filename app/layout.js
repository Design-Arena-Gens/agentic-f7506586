import "@/app/globals.css";

export const metadata = {
  title: "FlowTrack | Smart Expense Management",
  description:
    "Modern, responsive expense management dashboard to track spending, budgets, and financial health."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">
        {children}
      </body>
    </html>
  );
}
