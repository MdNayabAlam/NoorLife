import React, { useState } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, IndianRupee } from "lucide-react";
import { budgetInitialData } from "../data/initialData";

export function BudgetPage({ showToast }) {
  const [entries, setEntries] = useState(budgetInitialData.entries);
  const [showAddForm, setShowAddForm] = useState(false);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Groceries");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const totalIncome = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const netBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;

  function handleAdd(e) {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    const newEntry = {
      id: Date.now(),
      type,
      category,
      amount: Number(amount),
      date: new Date().toISOString().split("T")[0],
      note: note.trim() || category,
    };
    setEntries([newEntry, ...entries]);
    setAmount("");
    setNote("");
    setShowAddForm(false);
    if (showToast) showToast(`Added ${type === "income" ? "income" : "expense"} of ₹${amount}!`);
  }

  function handleDelete(id) {
    setEntries(entries.filter((e) => e.id !== id));
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Household Budget & Expenses</h2>
          <p>Track your family finances with intentionality, discipline, and barakah.</p>
        </div>
        <button className="card-action-btn-green" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={15} strokeWidth={2.5} />
          <span>{showAddForm ? "Close Form" : "Add Entry"}</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
        <div className="dashboard-card" style={{ padding: "18px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>Total Income</span>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#2a7c4f", marginTop: "4px" }}>
            ₹{totalIncome.toLocaleString()}
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "18px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>Total Expenses</span>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#e63946", marginTop: "4px" }}>
            ₹{totalExpense.toLocaleString()}
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "18px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>Remaining Balance</span>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--primary-green)", marginTop: "4px" }}>
            ₹{netBalance.toLocaleString()}
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "18px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>Savings Rate</span>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#d97706", marginTop: "4px" }}>
            {savingsRate}%
          </div>
        </div>
      </div>

      {/* Inline Add Transaction */}
      {showAddForm && (
        <div className="dashboard-card" style={{ padding: "20px", background: "var(--bg-subtle)" }}>
          <h3 style={{ fontSize: "15px", marginBottom: "14px", color: "var(--text-heading)" }}>
            New Transaction Entry
          </h3>
          <form onSubmit={handleAdd} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr 2fr auto", gap: "12px", alignItems: "flex-end" }}>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {type === "expense" ? (
                  <>
                    <option value="Groceries">Groceries</option>
                    <option value="Rent & Housing">Rent & Housing</option>
                    <option value="Utilities & Bills">Utilities & Bills</option>
                    <option value="Kids Education">Kids Education</option>
                    <option value="Charity & Sadaqah">Charity & Sadaqah</option>
                    <option value="Health">Health</option>
                  </>
                ) : (
                  <>
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Investment">Investment</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 1500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notes / Description</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Vegetable market weekly run"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button type="submit" className="card-action-btn-green" style={{ height: "42px", padding: "0 20px" }}>
              Save
            </button>
          </form>
        </div>
      )}

      {/* Transactions Table */}
      <div className="dashboard-card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "14px" }}>
          Recent Transactions
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: entry.type === "income" ? "#e8f5ec" : "#fee2e2",
                    color: entry.type === "income" ? "#2a7c4f" : "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {entry.type === "income" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-heading)" }}>
                    {entry.note}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    {entry.category} • {entry.date}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    color: entry.type === "income" ? "#2a7c4f" : "#dc2626",
                  }}
                >
                  {entry.type === "income" ? "+" : "-"}₹{entry.amount.toLocaleString()}
                </span>
                <button
                  className="action-icon-btn"
                  style={{ width: "28px", height: "28px", color: "#dc2626" }}
                  onClick={() => handleDelete(entry.id)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
