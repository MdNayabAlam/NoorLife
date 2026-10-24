import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, Trophy, RotateCcw, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { quizQuestionsData } from "../../data/initialData";

export function QuizModal({ isOpen, onClose, initialDifficulty = "easy", onQuizComplete }) {
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const questionsList = quizQuestionsData[difficulty] || quizQuestionsData.easy;
  const currentQ = questionsList[currentIdx];

  function handleSelectOption(index) {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentIdx + 1 < questionsList.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#174232", "#c6a256", "#2a7c4f", "#e63946"]
      });
      if (onQuizComplete) {
        onQuizComplete(score + (selectedOption === currentQ.correct ? 1 : 0), questionsList.length);
      }
    }
  }

  function handleRestart() {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  }

  const progressPercent = Math.round(((currentIdx + 1) / questionsList.length) * 100);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: "580px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Today's GK Quiz</h3>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              Level: <strong style={{ textTransform: "capitalize" }}>{difficulty}</strong>
            </span>
          </div>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {!quizFinished ? (
          <div className="modal-body">
            {/* Progress */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)" }}>
              <span>Question {currentIdx + 1} of {questionsList.length}</span>
              <span>Score: {score}</span>
            </div>
            <div style={{ height: "6px", background: "#edf2ec", borderRadius: "999px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  background: "var(--primary-green)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            {/* Category tag */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
              <span className="search-badge" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
                {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <h4 style={{ fontSize: "16px", color: "var(--text-heading)", lineHeight: "1.4", margin: "6px 0 10px" }}>
              {currentQ.question}
            </h4>

            {/* Multiple Choice Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {currentQ.options.map((opt, idx) => {
                let borderStyle = "1px solid var(--border-color)";
                let bgStyle = "var(--bg-subtle)";
                let textColor = "var(--text-main)";

                if (isAnswered) {
                  if (idx === currentQ.correct) {
                    borderStyle = "1.5px solid #2a7c4f";
                    bgStyle = "#e8f5ec";
                    textColor = "#14532d";
                  } else if (idx === selectedOption) {
                    borderStyle = "1.5px solid #dc2626";
                    bgStyle = "#fee2e2";
                    textColor = "#7f1d1d";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: borderStyle,
                      background: bgStyle,
                      color: textColor,
                      fontSize: "13px",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === currentQ.correct && (
                      <CheckCircle2 size={16} color="#2a7c4f" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correct && (
                      <AlertCircle size={16} color="#dc2626" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Explanation Box */}
            {isAnswered && (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  background: selectedOption === currentQ.correct ? "#ecfdf5" : "#fffbeb",
                  border: `1px solid ${selectedOption === currentQ.correct ? "#a7f3d0" : "#fde68a"}`,
                  fontSize: "12px",
                  lineHeight: "1.45",
                  color: selectedOption === currentQ.correct ? "#065f46" : "#92400e",
                  marginTop: "6px"
                }}
              >
                <strong>{selectedOption === currentQ.correct ? "MashAllah, Correct! " : "Not quite! "}</strong>
                {currentQ.explanation}
              </div>
            )}
          </div>
        ) : (
          <div className="modal-body" style={{ textAlign: "center", padding: "36px 20px" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#d97706",
              }}
            >
              <Trophy size={36} />
            </div>
            <h3 style={{ fontSize: "22px", color: "var(--text-heading)", marginBottom: "6px" }}>
              Quiz Completed!
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "16px" }}>
              You scored <strong>{score}</strong> out of <strong>{questionsList.length}</strong> questions correctly!
            </p>
            <div style={{ display: "inline-flex", gap: "10px" }}>
              <span className="search-badge" style={{ background: "#e8f5ec", color: "#2a7c4f", fontSize: "12px", padding: "6px 14px" }}>
                +30 NoorLife Points Earned 🌟
              </span>
            </div>
          </div>
        )}

        <div className="modal-footer">
          {quizFinished ? (
            <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "center" }}>
              <button
                type="button"
                className="action-icon-btn"
                style={{ width: "auto", padding: "8px 16px", borderRadius: "var(--radius-md)", display: "flex", gap: "6px" }}
                onClick={handleRestart}
              >
                <RotateCcw size={14} /> Retry Quiz
              </button>
              <button
                type="button"
                className="card-action-btn-green"
                style={{ padding: "8px 24px" }}
                onClick={onClose}
              >
                Done
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={!isAnswered}
              className="card-action-btn-green"
              style={{
                padding: "8px 22px",
                opacity: isAnswered ? 1 : 0.5,
                cursor: isAnswered ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onClick={handleNext}
            >
              <span>{currentIdx + 1 === questionsList.length ? "Finish Quiz" : "Next Question"}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
