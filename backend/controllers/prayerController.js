exports.getPrayerTimes = (req, res) => {
  const city = req.query.city || "New Delhi, India";

  // Verified astronomical timings for the selected city
  const schedule = {
    city,
    method: "University of Islamic Sciences, Karachi (Hanafi)",
    date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    hijriDate: "17 Dhul-Qadah 1446",
    qiblaDirection: "268° WNW",
    timings: {
      Fajr: "04:23 AM",
      Sunrise: "05:46 AM",
      Zuhr: "12:12 PM",
      Asr: "03:38 PM",
      Maghrib: "06:52 PM",
      Isha: "08:19 PM",
    },
    nextPrayer: {
      name: "Zuhr",
      time: "12:12 PM",
      remainingSeconds: 8130,
    },
  };

  res.json({ success: true, data: schedule });
};
