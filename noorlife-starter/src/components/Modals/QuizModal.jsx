import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Trophy, RotateCcw, ArrowRight, ShieldCheck, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";
import { quizQuestionsData } from "../../data/initialData";
import { submitQuizAttemptAPI } from "../../services/api";

export function QuizModal({ isOpen, onClose, initialDifficulty = "easy", onQuizComplete }) {
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [serverResult, setServerResult] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDifficulty(initialDifficulty);
      setCurrentIdx(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setUserAnswers([]);
      setServerResult(null);
      setQuizFinished(false);
      setShowReview(false);
    }
  }, [isOpen, initialDifficulty]);

  if (!isOpen) return null;

  const questionsList = quizQuestionsData[difficulty] || quizQuestionsData.easy;
  const currentQ = questionsList[currentIdx];

  function handleSelectOption(index) {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const questionId = currentQ.id ? String(currentQ.id) : (difficulty === "easy" ? `q-${currentIdx + 1}` : difficulty === "medium" ? `q-${currentIdx + 6}` : `q-${currentIdx + 11}`);
    setUserAnswers((prev) => [
      ...prev,
      { questionId, selectedIndex: index }
    ]);
  }

  async function handleNext() {
    if (currentIdx + 1 < questionsList.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed - submit to server for safe server-side calculation
      const questionId = currentQ.id ? String(currentQ.id) : (difficulty === "easy" ? `q-${currentIdx + 1}` : difficulty === "medium" ? `q-${currentIdx + 6}` : `q-${currentIdx + 11}`);
      const finalAnswers = selectedOption !== null && !userAnswers.find(a => a.questionId === questionId)
        ? [...userAnswers, { questionId, selectedIndex: selectedOption }]
        : userAnswers;

      try {
        const result = await submitQuizAttemptAPI({
          difficulty,
          userAnswers: finalAnswers,
          category: "Mixed Daily Challenge",
        });
        setServerResult(result);
        if (onQuizComplete) {
          onQuizComplete(result.score, result.totalQuestions);
        }
      } catch (err) {
        // Fallback local score
        const localScore = finalAnswers.filter((a, idx) => a.selectedIndex === (questionsList[idx]?.correct || 0)).length;
        setServerResult({
          score: localScore,
          totalQuestions: questionsList.length,
          percentage: Math.round((localScore / questionsList.length) * 100),
          pointsEarned: localScore * 10,
        });
        if (onQuizComplete) {
          onQuizComplete(localScore, questionsList.length);
        }
      }

      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#174232", "#c6a256", "#2a7c4f", "#e63946"],
      });
    }
  }

  function handleRestart() {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setServerResult(null);
    setQuizFinished(false);
    setShowReview(false);
  }

  const progressPercent = Math.round(((currentIdx + 1) / questionsList.length) * 100);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: "620px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Today's GK Quiz</h3>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>Level: <strong style={{ textTransform: "capitalize" }}>{difficulty}</strong></span>
              <span>•</span>
              <span style={{ color: "#2a7c4f", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                <ShieldCheck size={12} /> Server-Validated
              </span>
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
              <span>Progress: {progressPercent}%</span>
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
              <span className="search-badge" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
                {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <h4 style={{ fontSize: "16px", color: "var(--text-heading)", lineHeight: "1.4", margin: "8px 0 12px" }}>
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
                      cursor: isAnswered ? "default" : "pointer",
                      transition: "all 0.15s ease",
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
                  marginTop: "8px",
                }}
              >
                <strong>{selectedOption === currentQ.correct ? "MashAllah, Correct! " : "Not quite! "}</strong>
                {currentQ.explanation}
              </div>
            )}
          </div>
        ) : (
          <div className="modal-body" style={{ padding: "24px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "#fef3c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                  color: "#d97706",
                }}
              >
                <Trophy size={36} />
              </div>
              <h3 style={{ fontSize: "22px", color: "var(--text-heading)", marginBottom: "4px" }}>
                Quiz Completed!
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "14px" }}>
                You scored <strong>{serverResult?.score || 0}</strong> out of{" "}
                <strong>{serverResult?.totalQuestions || questionsList.length}</strong> questions correctly (
                {serverResult?.percentage || 0}%)!
              </p>
              <div style={{ display: "inline-flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                <span className="search-badge" style={{ background: "#e8f5ec", color: "#2a7c4f", fontSize: "12px", padding: "6px 14px" }}>
                  +{serverResult?.pointsEarned || 30} NoorLife Points Earned 🌟
                </span>
                <span className="search-badge" style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: "12px", padding: "6px 14px" }}>
                  Verified by Server Engine ✓
                </span>
              </div>
            </div>

            {/* Answer Review Section */}
            <div style={{ marginTop: "16px", borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <BookOpen size={16} color="var(--primary-green)" />
                  <span>Answer Review & Knowledge Key</span>
                </h4>
                <button
                  type="button"
                  className="action-icon-btn"
                  style={{ width: "auto", padding: "4px 10px", fontSize: "11px" }}
                  onClick={() => setShowReview(!showReview)}
                >
                  {showReview ? "Collapse Review" : "Show Full Review"}
                </button>
              </div>

              {showReview && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "240px", overflowY: "auto", paddingRight: "4px" }}>
                  {(serverResult?.review || questionsList).map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-subtle)",
                        border: "1px solid var(--border-color)",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ fontWeight: "700", color: "var(--text-heading)", marginBottom: "4px" }}>
                        {idx + 1}. {item.question}
                      </div>
                      <div style={{ color: "#2a7c4f", fontWeight: "600", fontSize: "11.5px" }}>
                        ✓ Correct Answer: {item.options ? item.options[item.correctAnswerIndex !== undefined ? item.correctAnswerIndex : item.correct] : "Correct"}
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: "11px", marginTop: "3px", lineHeight: "1.4" }}>
                        {item.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              <span>{currentIdx + 1 === questionsList.length ? "Finish & Submit to Server" : "Next Question"}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
