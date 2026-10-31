import React, { useState, useEffect } from "react";
import {
  Utensils,
  BookOpen,
  Heart,
  Sparkles,
  Search,
  Check,
  Plus,
  Clock,
  Flame,
  ShoppingBasket,
  ArrowRight,
  Info,
  Share2,
  ChevronDown,
  ChevronUp,
  Languages,
  Globe
} from "lucide-react";
import { SUNNAH_DISHES, SUNNAH_INGREDIENTS_DIRECTORY, SUNNAH_UI_TEXT } from "../data/sunnahDishesData";

export function SunnahDishesPage({ onAddGroceryItem, onNavigateMeals, showToast }) {
  const [dishLang, setDishLang] = useState(() => {
    return localStorage.getItem("noorlife_sunnah_lang") || "en";
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDishId, setExpandedDishId] = useState("talbina"); // Default open 1st dish recipe

  useEffect(() => {
    localStorage.setItem("noorlife_sunnah_lang", dishLang);
  }, [dishLang]);

  const ui = SUNNAH_UI_TEXT[dishLang] || SUNNAH_UI_TEXT.en;
  const isRTL = dishLang === "ar" || dishLang === "ur";

  const categories = [
    { id: "all", label: `${ui.allDishes} (${SUNNAH_DISHES.length})` },
    { id: "Healing Soups & Porridge", label: ui.soupsCategory },
    { id: "Savory Main Meals", label: ui.mealsCategory },
    { id: "Sunnah Drinks", label: ui.drinksCategory },
    { id: "Healthy Snacks & Sweets", label: ui.snacksCategory },
  ];

  const filteredDishes = SUNNAH_DISHES.filter((d) => {
    const dishData = d.translations?.[dishLang] || d;
    const matchesCat = selectedCategory === "all" || d.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();

    if (!q) return matchesCat;

    const matchesSearch =
      d.name.toLowerCase().includes(q) ||
      dishData.name.toLowerCase().includes(q) ||
      d.tagline.toLowerCase().includes(q) ||
      dishData.tagline.toLowerCase().includes(q) ||
      d.arabic.includes(q) ||
      dishData.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
      dishData.benefits.some((b) => b.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedDishId((prev) => (prev === id ? null : id));
  };

  const handleAddIngredientsToGrocery = (dish, dishData) => {
    if (onAddGroceryItem) {
      dishData.ingredients.forEach((ing) => {
        onAddGroceryItem({
          id: Date.now() + Math.random(),
          name: `${ing.split("(")[0].trim()} (${dishData.name.split("(")[0].trim()})`,
          category: "Sunnah Food",
          estimatedPrice: 60,
          done: false,
        });
      });
      if (showToast) {
        showToast(`${ui.addedGrocery} (${dishData.name.split("(")[0].trim()})`);
      }
    }
  };

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      {/* Top Header */}
      <div className="page-view-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "22px" }}>🌿</span>
            <h2 style={{ margin: 0, fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>
              {ui.pageTitle}
            </h2>
          </div>
          <p style={{ margin: 0 }}>
            {ui.pageDesc}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {onNavigateMeals && (
            <button
              className="card-action-btn-green"
              onClick={onNavigateMeals}
              style={{
                background: "var(--bg-card)",
                color: "var(--text-heading)",
                border: "1px solid var(--border-color)",
                boxShadow: "none"
              }}
            >
              <Utensils size={15} color="var(--primary-green)" />
              <span>{ui.weeklyMealBtn}</span>
            </button>
          )}
        </div>
      </div>

      {/* MULTILINGUAL LANGUAGE SELECTOR BAR */}
      <div className="sunnah-lang-selector-card">
        <div className="sunnah-lang-title">
          <Globe size={18} color="var(--accent-gold)" />
          <span>{ui.languageLabel}</span>
        </div>

        <div className="sunnah-lang-pills">
          <button
            className={`sunnah-lang-pill ${dishLang === "en" ? "active" : ""}`}
            onClick={() => setDishLang("en")}
            aria-label="Switch to English"
          >
            <span style={{ fontSize: "15px" }}>🇬🇧</span>
            <span>English</span>
          </button>

          <button
            className={`sunnah-lang-pill ${dishLang === "hi" ? "active" : ""}`}
            onClick={() => setDishLang("hi")}
            aria-label="Switch to Hinglish"
          >
            <span style={{ fontSize: "15px" }}>🇮🇳</span>
            <span>Hinglish</span>
          </button>

          <button
            className={`sunnah-lang-pill ${dishLang === "ur" ? "active" : ""}`}
            onClick={() => setDishLang("ur")}
            aria-label="Switch to Urdu"
          >
            <span style={{ fontSize: "15px" }}>🇵🇰</span>
            <span>اردو (Urdu)</span>
          </button>

          <button
            className={`sunnah-lang-pill ${dishLang === "ar" ? "active" : ""}`}
            onClick={() => setDishLang("ar")}
            aria-label="Switch to Arabic"
          >
            <span style={{ fontSize: "15px" }}>🇸🇦</span>
            <span style={{ fontFamily: "var(--font-arabic)", fontSize: "14px" }}>العربية (Arabic)</span>
          </button>
        </div>
      </div>

      {/* PROPHETIC NUTRITION WISDOM HERO BANNER */}
      <div
        className="dashboard-card"
        style={{
          padding: "20px 24px",
          background: "linear-gradient(135deg, #133927 0%, #1c503b 100%)",
          color: "#ffffff",
          marginBottom: "18px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 6px 20px rgba(19, 57, 39, 0.25)",
          border: "1px solid rgba(198, 162, 86, 0.35)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ maxWidth: "740px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-gold-light)", fontSize: "11px", fontWeight: "700" }}>
              <Sparkles size={14} />
              <span>{ui.heroTag}</span>
            </div>
            <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#ffffff", margin: "6px 0", fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>
              {ui.heroTitle}
            </h3>
            <p style={{ fontSize: "12.5px", color: "#d2e5d8", margin: 0, lineHeight: "1.6" }}>
              {ui.heroHadith}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(6px)",
              padding: "12px 18px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: "11px", color: "var(--accent-gold-light)", fontWeight: "700" }}>
              {ui.heroBadge1}
            </div>
            <div style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginTop: "2px" }}>
              {ui.heroBadge2}
            </div>
            <div style={{ fontSize: "11px", color: "#cce0d2" }}>
              {ui.heroBadge3}
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Category Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-pill)",
                border: selectedCategory === cat.id ? "1.5px solid var(--primary-green)" : "1px solid var(--border-color)",
                background: selectedCategory === cat.id ? "var(--primary-green)" : "var(--bg-card)",
                color: selectedCategory === cat.id ? "#ffffff" : "var(--text-heading)",
                fontWeight: "700",
                fontSize: "12.5px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", width: "270px" }}>
          <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: "32px", paddingRight: "10px", height: "36px", fontSize: "12px" }}
            placeholder={ui.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* DISHES LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "28px" }}>
        {filteredDishes.map((dish) => {
          const dishData = dish.translations?.[dishLang] || dish;
          const isExpanded = expandedDishId === dish.id;

          return (
            <div
              key={dish.id}
              className="dashboard-card"
              style={{
                padding: "22px",
                borderRadius: "var(--radius-md)",
                borderLeft: "5px solid var(--primary-green)",
                transition: "all 0.2s ease",
              }}
            >
              {/* Header Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        background: "var(--bg-subtle)",
                        padding: "3px 9px",
                        borderRadius: "var(--radius-pill)",
                        color: "var(--primary-green)",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {dishData.category}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        background: "rgba(198, 162, 86, 0.15)",
                        padding: "3px 9px",
                        borderRadius: "var(--radius-pill)",
                        color: "#92400e",
                      }}
                    >
                      {dishData.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-heading)", margin: "2px 0 4px", fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>
                    {dishData.name}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
                    {dishData.tagline}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-arabic)",
                      fontSize: "28px",
                      color: "var(--primary-green)",
                      direction: "rtl",
                      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
                    }}
                  >
                    {dish.arabic}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11.5px", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} /> {dishData.prepTime} • {dishData.cookTime}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Flame size={12} color="#e76f51" /> {dishData.calories}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hadith Citation Box */}
              <div
                style={{
                  margin: "14px 0",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-subtle)",
                  borderLeft: "3px solid var(--accent-gold)",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: "800", color: "#92400e", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {ui.hadithCitation}:
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-heading)",
                    fontStyle: isRTL ? "normal" : "italic",
                    fontFamily: isRTL ? "var(--font-arabic)" : "inherit",
                    marginTop: "4px",
                    lineHeight: "1.6",
                    direction: isRTL ? "rtl" : "ltr",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  "{dishData.hadith}"
                </div>
                <div style={{ fontSize: "11px", color: "var(--primary-green)", fontWeight: "700", marginTop: "5px", direction: isRTL ? "rtl" : "ltr" }}>
                  — {dishData.reference}
                </div>
              </div>

              {/* Health Benefits Pills */}
              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
                  {ui.healthBenefits}
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "6px" }}>
                  {dishData.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: "var(--text-heading)",
                        background: "var(--bg-card)",
                        padding: "6px 10px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                        direction: isRTL ? "rtl" : "ltr",
                      }}
                    >
                      <Check size={12} color="var(--primary-green)" strokeWidth={3} style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collapsible Recipe & Ingredients Drawer */}
              {isExpanded && (
                <div
                  style={{
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border-color)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1.6fr",
                    gap: "20px",
                  }}
                >
                  {/* Ingredients Column */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12.5px", fontWeight: "800", color: "var(--text-heading)" }}>
                        {ui.ingredients} ({dishData.servings}):
                      </span>
                    </div>

                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: isRTL ? "0" : "18px",
                        paddingRight: isRTL ? "18px" : "0",
                        fontSize: "12.5px",
                        color: "var(--text-heading)",
                        lineHeight: "1.8",
                        direction: isRTL ? "rtl" : "ltr",
                      }}
                    >
                      {dishData.ingredients.map((ing, i) => (
                        <li key={i} style={{ fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>
                          {ing}
                        </li>
                      ))}
                    </ul>

                    {onAddGroceryItem && (
                      <button
                        onClick={() => handleAddIngredientsToGrocery(dish, dishData)}
                        className="card-action-btn-green"
                        style={{
                          marginTop: "14px",
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "11.5px",
                          gap: "6px",
                          justifyContent: "center",
                        }}
                      >
                        <ShoppingBasket size={13} />
                        <span>{ui.addGrocery}</span>
                      </button>
                    )}
                  </div>

                  {/* Cooking Steps Column */}
                  <div>
                    <span style={{ fontSize: "12.5px", fontWeight: "800", color: "var(--text-heading)", display: "block", marginBottom: "8px" }}>
                      {ui.prepSteps}
                    </span>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {dishData.steps.map((st, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            direction: isRTL ? "rtl" : "ltr",
                          }}
                        >
                          <span
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              background: "var(--bg-subtle)",
                              border: "1px solid var(--primary-green)",
                              color: "var(--primary-green)",
                              fontSize: "10.5px",
                              fontWeight: "800",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          >
                            {i + 1}
                          </span>
                          <p style={{ margin: 0, fontSize: "12.5px", color: "var(--text-heading)", lineHeight: "1.5", fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>
                            {st}
                          </p>
                        </div>
                      ))}
                    </div>

                    {dishData.sunnahEtiquette && (
                      <div
                        style={{
                          marginTop: "14px",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          background: "rgba(27, 67, 50, 0.08)",
                          border: "1px solid rgba(27, 67, 50, 0.2)",
                          fontSize: "12px",
                          color: "var(--primary-green)",
                          fontWeight: "600",
                          direction: isRTL ? "rtl" : "ltr",
                        }}
                      >
                        🤲 <strong>{ui.sunnahEtiquette}</strong> {dishData.sunnahEtiquette}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Actions Row */}
              <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  onClick={() => toggleExpand(dish.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary-green)",
                    fontWeight: "700",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <span>{isExpanded ? ui.hideRecipe : ui.viewRecipe}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  Authentic Sunnah Preparation
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BLESSED SUNNAH INGREDIENTS DIRECTORY */}
      <div className="dashboard-card" style={{ padding: "22px", marginBottom: "20px" }}>
        <div style={{ marginBottom: "14px" }}>
          <h3 style={{ fontSize: "17px", fontWeight: "800", color: "var(--text-heading)", margin: 0, fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>
            {ui.directoryTitle}
          </h3>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "2px 0 0" }}>
            {ui.directorySubtitle}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "12px" }}>
          {SUNNAH_INGREDIENTS_DIRECTORY.map((item, idx) => {
            const itemData = item.translations?.[dishLang] || item;
            return (
              <div
                key={idx}
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-color)",
                  direction: isRTL ? "rtl" : "ltr",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-heading)", fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>
                  {itemData.name}
                </div>
                <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "3px", lineHeight: "1.4", fontFamily: isRTL ? "var(--font-arabic)" : "inherit" }}>
                  {itemData.desc}
                </div>
                <div style={{ fontSize: "10.5px", color: "var(--primary-green)", fontWeight: "700", marginTop: "4px" }}>
                  📖 {item.surah}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
