exports.chatAssistant = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required." });
    }

    const normalized = prompt.toLowerCase();

    // Domain intelligent replies on server
    if (normalized.includes("ghar ke kaam") || normalized.includes("kaam ka plan")) {
      return res.json({
        success: true,
        data: {
          reply: "Assalamu Alaikum! Aaj ka balanced ghar ka plan:\n\n• Subah: Kitchen dusting & breakfast dishes\n• Dopahar: Lunch tayyar karein (Dal Rice Salad Roti) & Zuhr prayer\n• Shaam: Bachon ki revision & Quran reading\n• Raat: Kal ke meals plan karein & rest.",
          suggestions: ["₹500 mein grocery list banao", "Halal lunch ideas"]
        }
      });
    }

    if (normalized.includes("500") || normalized.includes("grocery")) {
      return res.json({
        success: true,
        data: {
          reply: "₹500 ke andar smart kitchen basket:\n• Aloo 2kg (₹50)\n• Pyaz 1kg (₹40)\n• Tamatar 1kg (₹40)\n• Taaza Doodh 1L (₹60)\n• Andey 6 pcs (₹42)\n• Moong Dal 500g (₹65)\n• Atta 2kg (₹85)\n• Total: ₹382 (₹118 bachte hain!)",
          suggestions: ["Ghar ke kaam ka plan", "Quick dinner recipes"]
        }
      });
    }

    return res.json({
      success: true,
      data: {
        reply: `Assalamu Alaikum Md Nayab Alam! NoorLife AI assistant aapki madad ke liye tayyar hai. Aapne pucha: "${prompt}". Niyat saaf rakhein aur har kaam Bismillah se shuru karein, Allah ta'ala barkat ata farmayega.`,
        suggestions: ["Aaj ke ghar ke kaam ka plan banao", "₹500 mein grocery list banao", "Mujhe 10 GK questions do"]
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
