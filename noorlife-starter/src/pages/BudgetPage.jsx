import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, IndianRupee, PieChart, BarChart3, AlertCircle } from "lucide-react";
import { budgetInitialData } from "../data/initialData";
import { fetchBudgetSummaryAPI, createBudgetEntryAPI, deleteBudgetEntryAPI } from "../services/api";

export function BudgetPage({ showToast }) {
  const [entries, setEntries] = useState(budgetInitialData.entries);
  const [showAddForm, setShowAddForm] = useState(false);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Groceries");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Sync with API on mount
  useEffect(() => {
    fetchBudgetSummaryAPI()
      .then((data) => {
        if (data && data.entries && data.entries.length > 0) {
          setEntries(data.entries);
        }
      })
      .catch(() => {});
  }, []);

  const totalIncome = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalExpense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const netBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;

  // Category breakdown for expenses
  const categoryTotals = entries
    .filter((e) => e.type === "expense")
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

  async function handleAdd(e) {
    e.preventDefault();
    setErrorMsg("");

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setErrorMsg("Please enter a valid positive amount greater than zero.");
      return;
    }

    const newEntry = {
      type,
      category,
      amount: parsedAmount,
      date: new Date().toISOString().split("T")[0],
      note: note.trim() || category,
    };

    // Optimistic UI update
    const tempId = "b-" + Date.now();
    setEntries([{ ...newEntry, id: tempId }, ...entries]);
    setAmount("");
    setNote("");
    setShowAddForm(false);
    if (showToast) showToast(`Added ${type === "income" ? "income" : "expense"} of ₹${parsedAmount}!`);

    try {
      await createBudgetEntryAPI(newEntry);
    } catch (err) {
      console.warn("Budget API fallback:", err);
    }
  }

  async function handleDelete(id) {
    setEntries(entries.filter((e) => (e.id || e._id) !== id));
    if (showToast) showToast("Entry removed");
    try {
      await deleteBudgetEntryAPI(id);
    } catch (err) {
      console.warn("Budget delete API fallback:", err);
    }
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
          <span>{showAddForm ? "Close Form" : "Add Transaction"}</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
        <div className="dashboard-card" style={{ padding: "18px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>Total Monthly Income</span>
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
          <div style={{ fontSize: "22px", fontWeight: "800", color: netBalance >= 0 ? "var(--primary-green)" : "#dc2626", marginTop: "4px" }}>
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

      {/* Add Transaction Form Drawer */}
      {showAddForm && (
        <div className="dashboard-card" style={{ padding: "20px", background: "var(--bg-subtle)" }}>
          <h3 style={{ fontSize: "15px", marginBottom: "12px", color: "var(--text-heading)" }}>
            New Transaction Entry
          </h3>
          {errorMsg && (
            <div style={{ color: "#dc2626", fontSize: "12px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <AlertCircle size={14} />
              <span>{errorMsg}</span>
            </div>
          )}
          <form onSubmit={handleAdd} className="budget-add-form">
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
                    <option value="Groceries">Groceries & Ration</option>
                    <option value="Rent & Housing">Rent & Housing</option>
                    <option value="Utilities & Bills">Utilities & Bills</option>
                    <option value="Kids Education">Kids Education</option>
                    <option value="Charity & Sadaqah">Charity & Sadaqah</option>
                    <option value="Health & Medical">Health & Medical</option>
                    <option value="Other">Other Expense</option>
                  </>
                ) : (
                  <>
                    <option value="Salary">Salary / Primary Job</option>
                    <option value="Freelance">Freelance / Business</option>
                    <option value="Gift / Barakah">Gift / Barakah</option>
                    <option value="Other">Other Income</option>
                  </>
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                min="1"
                step="any"
                className="form-input"
                placeholder="e.g. 2500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Note / Description</label>
              <input
                type="text"
                className="form-input"
                placeholder="Optional details..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button type="submit" className="card-action-btn-green" style={{ height: "42px", padding: "0 22px" }}>
              Save
            </button>
          </form>
        </div>
      )}

      {/* Visual Charts & Category Breakdown */}
      <div className="budget-visuals-grid">
        {/* Income vs Expense Balance Visual */}
        <div className="dashboard-card" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "14px", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "6px" }}>
            <BarChart3 size={16} color="var(--primary-green)" />
            <span>Monthly Cashflow Visual</span>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                <span style={{ fontWeight: "600", color: "#2a7c4f" }}>Income (₹{totalIncome.toLocaleString()})</span>
                <span style={{ color: "var(--text-muted)" }}>100%</span>
              </div>
              <div style={{ height: "10px", background: "var(--border-color)", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "100%", background: "#2a7c4f" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                <span style={{ fontWeight: "600", color: "#e63946" }}>Expenses (₹{totalExpense.toLocaleString()})</span>
                <span style={{ color: "var(--text-muted)" }}>{totalIncome > 0 ? Math.round((totalExpense / totalIncome) * 100) : 0}%</span>
              </div>
              <div style={{ height: "10px", background: "var(--border-color)", borderRadius: "999px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${totalIncome > 0 ? Math.min(Math.round((totalExpense / totalIncome) * 100), 100) : 0}%`,
                    background: "#e63946",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Expense Category Breakdown */}
        <div className="dashboard-card" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "14px", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "6px" }}>
            <PieChart size={16} color="var(--accent-gold)" />
            <span>Top Expense Categories</span>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {Object.entries(categoryTotals).slice(0, 4).map(([catName, catAmt]) => {
              const catPercent = totalExpense > 0 ? Math.round((catAmt / totalExpense) * 100) : 0;
              return (
                <div key={catName} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <span style={{ color: "var(--text-heading)", fontWeight: "500" }}>{catName}</span>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span style={{ fontWeight: "700", color: "var(--text-heading)" }}>₹{catAmt.toLocaleString()}</span>
                    <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309", padding: "2px 6px" }}>
                      {catPercent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transactions History Ledger */}
      <div className="dashboard-card">
        <div className="card-header-row">
          <h3>Recent Transactions Ledger</h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{entries.length} recorded entries</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {entries.map((item) => {
            const isExpense = item.type === "expense";
            const id = item.id || item._id;
            return (
              <div
                key={id}
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
                      background: isExpense ? "#fee2e2" : "#e8f5ec",
                      color: isExpense ? "#dc2626" : "#2a7c4f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isExpense ? <TrendingDown size={18} /> : <TrendingUp size={18} />}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-heading)" }}>
                      {item.note || item.category}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                      {item.category} • {item.date}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "800",
                      color: isExpense ? "#dc2626" : "#2a7c4f",
                    }}
                  >
                    {isExpense ? "-" : "+"}₹{Number(item.amount).toLocaleString()}
                  </div>
                  <button
                    className="action-icon-btn"
                    style={{ width: "30px", height: "30px", color: "#dc2626" }}
                    onClick={() => handleDelete(id)}
                    title="Delete transaction"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
