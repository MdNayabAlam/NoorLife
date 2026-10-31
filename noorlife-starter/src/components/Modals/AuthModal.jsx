import React, { useState } from "react";
import { X, Lock, Mail, User, Eye, EyeOff, LogIn, UserPlus, Sparkles, AlertCircle } from "lucide-react";
import { loginAPI, registerAPI } from "../../services/api";

export function AuthModal({ isOpen, onClose, onAuthSuccess, showToast }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error("Full name is required.");
        if (!email.trim() || !email.includes("@")) throw new Error("Please enter a valid email address.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");

        const res = await registerAPI({ name: name.trim(), email: email.trim(), password });
        if (showToast) showToast(`Welcome to NoorLife, ${name}! 🎉`);
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      } else {
        if (!email.trim()) throw new Error("Email is required.");
        if (!password) throw new Error("Password is required.");

        const res = await loginAPI({ email: email.trim(), password });
        if (showToast) showToast(`Welcome back, ${res.user.displayName || res.user.name}! 🌿`);
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  }

  function handleDemoLogin() {
    setEmail("alamnayab718@gmail.com");
    setPassword("noorlife2026");
    const demo = {
      name: "Md Nayab Alam",
      displayName: "Nayab",
      email: "alamnayab718@gmail.com",
      avatarImg: "/images/user_nayab.png",
      isPro: true
    };
    if (onAuthSuccess) onAuthSuccess(demo);
    if (showToast) showToast("Signed in as Md Nayab Alam ✨");
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        style={{ maxWidth: "440px", padding: "0", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #184232 0%, #0d281e 100%)",
            color: "white",
            padding: "24px 24px 20px",
            position: "relative",
          }}
        >
          <button
            className="action-icon-btn"
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              color: "rgba(255, 255, 255, 0.8)",
              background: "rgba(255, 255, 255, 0.1)",
            }}
            onClick={onClose}
          >
            <X size={16} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(198, 162, 86, 0.2)",
                border: "1px solid #c6a256",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e5c57b",
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "19px", color: "#ffffff", fontWeight: "800", margin: 0 }}>
                {isRegister ? "Join NoorLife" : "Welcome to NoorLife"}
              </h3>
              <span style={{ fontSize: "11px", color: "#cce0d2" }}>
                Ghar • Deen • Ilm • Behtar Zindagi
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "rgba(0, 0, 0, 0.25)",
              borderRadius: "8px",
              padding: "3px",
              marginTop: "16px",
            }}
          >
            <button
              type="button"
              style={{
                background: !isRegister ? "#c6a256" : "transparent",
                color: !isRegister ? "#0e2a20" : "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "12.5px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                setIsRegister(false);
                setErrorMsg("");
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              style={{
                background: isRegister ? "#c6a256" : "transparent",
                color: isRegister ? "#0e2a20" : "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "12.5px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                setIsRegister(true);
                setErrorMsg("");
              }}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {errorMsg && (
            <div
              style={{
                background: "#fee2e2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {isRegister && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "12px" }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: "36px" }}
                  placeholder="e.g. Md Nayab Alam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "12px" }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: "36px" }}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "12px" }} />
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                style={{ paddingLeft: "36px", paddingRight: "36px" }}
                placeholder={isRegister ? "At least 6 characters" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="card-action-btn-green"
            style={{
              padding: "12px",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "700",
              marginTop: "4px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <span>Connecting...</span>
            ) : isRegister ? (
              <>
                <UserPlus size={16} />
                <span>Create NoorLife Account</span>
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span>Sign In to Account</span>
              </>
            )}
          </button>

          <div style={{ textAlign: "center", margin: "4px 0" }}>
            <span style={{ fontSize: "11px", color: "var(--text-light)" }}>— or test with instant credentials —</span>
          </div>

          <button
            type="button"
            className="action-icon-btn"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "var(--radius-md)",
              border: "1px dashed var(--primary-green)",
              background: "#edf6f0",
              color: "var(--primary-green)",
              fontWeight: "700",
              fontSize: "12.5px",
            }}
            onClick={handleDemoLogin}
          >
            ⚡ Instant Demo Login (Md Nayab Alam)
          </button>
        </form>
      </div>
    </div>
  );
}
