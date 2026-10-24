import React from "react";
import { CheckCircle2 } from "lucide-react";

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast-pill">
        <CheckCircle2 size={16} color="#c6a256" />
        <span>{message}</span>
      </div>
    </div>
  );
}
