import React from "react";
import { BookOpen, Check, ArrowRight } from "lucide-react";

export function LearnNamazCard({ steps, toggleStep, onContinueLearning }) {
  const completed = steps.filter((s) => s.done).length;
  const total = steps.length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="dashboard-card namaz-widget-card-exact">
      {/* Header Row */}
      <div className="card-header-row namaz-header-row">
        <div className="card-title-group">
          <div className="namaz-title-with-icon">
            <div className="namaz-header-icon-box-exact">
              <BookOpen size={15} color="#78350f" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="namaz-card-title">Learn Namaz</h3>
              <div className="card-subtitle namaz-card-sub">Step-by-step with images</div>
            </div>
          </div>
        </div>

        <div className="namaz-progress-badge-group">
          <div className="namaz-mini-progress-track">
            <div
              className="namaz-mini-progress-fill"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="namaz-count-text">{completed}/{total} completed</span>
        </div>
      </div>

      {/* Main Body: Steps Checklist (Left) + Arched Boy Illustration (Right) */}
      <div className="namaz-card-body-exact">
        <div className="namaz-steps-checklist-exact">
          {steps.slice(0, 5).map((step, idx) => {
            const isRadioActive = idx === 2 && !step.done; // Step 3: Takbeer-e-Tahreema is active radio
            return (
              <div
                key={step.id}
                className={`namaz-step-row-exact ${step.done ? "done" : ""} ${isRadioActive ? "active-step" : ""}`}
                onClick={() => toggleStep(step.id)}
              >
                {step.done ? (
                  <div className="namaz-checkbox-square checked">
                    <Check size={11} strokeWidth={3} />
                  </div>
                ) : isRadioActive ? (
                  <div className="namaz-radio-circle active">
                    <div className="namaz-radio-dot" />
                  </div>
                ) : (
                  <div className="namaz-radio-circle empty" />
                )}
                <span className="namaz-step-title-text">{step.title}</span>
              </div>
            );
          })}
        </div>

        {/* Arched Illustration Box with Boy Worshipper in Tashahhud on Prayer Rug */}
        <div className="namaz-arched-illustration-box">
          <img
            src="/images/namaz_worshipper.jpg"
            alt="Young Muslim boy in white thobe and cap sitting on prayer mat in Tashahhud posture"
            className="namaz-boy-worshipper-img"
          />
        </div>
      </div>

      {/* Footer CTA: Continue Learning */}
      <div className="namaz-footer-row-exact">
        <button className="namaz-continue-cta-btn-exact" onClick={onContinueLearning}>
          <span>Continue Learning</span>
          <ArrowRight size={13} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
