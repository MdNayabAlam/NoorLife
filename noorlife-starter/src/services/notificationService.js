/**
 * NoorLife — Real-Time Notification & Family Calendar Alert Service
 * Manages dynamic notifications, unread counts, calendar event alerts,
 * Web Audio chime playback, desktop push notifications, and dismiss/mark-as-read actions.
 */

class NotificationService {
  constructor() {
    this.storageKey = "noorlife_notifications_v3";
    this.listeners = new Set();
    this.notifications = this.loadNotifications();
  }

  loadNotifications() {
    if (typeof localStorage === "undefined") return [];
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // ignore
    }
    // Initial default notifications
    return [
      {
        id: "init-1",
        title: "Prayer Alert",
        desc: "Live prayer timings synced for your location. Never miss an Azaan.",
        time: "10 mins ago",
        unread: true,
        category: "prayer",
        linkTab: "Prayer Times",
        timestamp: Date.now() - 600000
      },
      {
        id: "init-2",
        title: "Streak Kept!",
        desc: "MashaAllah! Consistency streak maintained on NoorLife.",
        time: "1 hour ago",
        unread: true,
        category: "streak",
        linkTab: "Rewards & Streaks",
        timestamp: Date.now() - 3600000
      },
      {
        id: "init-3",
        title: "Family Reminder",
        desc: "Check your household schedule and family events in Family Calendar.",
        time: "Today",
        unread: true,
        category: "calendar",
        linkTab: "Family Calendar",
        timestamp: Date.now() - 7200000
      }
    ];
  }

  saveNotifications() {
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.notifications));
      } catch (e) {
        // ignore
      }
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener([...this.notifications]);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener([...this.notifications]);
    }
  }

  getUnreadCount() {
    return this.notifications.filter((n) => n.unread).length;
  }

  // Soft, pleasant notification chime using Web Audio
  playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      // Dual tone pleasant chime (D5 -> A5)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0.09, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.6);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880.0, now + 0.12); // A5
      gain2.gain.setValueAtTime(0.12, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.9);
    } catch (e) {
      // ignore
    }
  }

  // Show desktop push notification
  showDesktopNotification(title, body) {
    try {
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon: "/images/hero_mosque.jpg",
          badge: "/images/hero_mosque.jpg"
        });
      }
    } catch (e) {
      // ignore
    }
  }

  // Add new notification
  addNotification({ title, desc, category = "general", linkTab = null, eventId = null, highPriority = false }) {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title,
      desc,
      time: "Just now",
      unread: true,
      category,
      linkTab,
      eventId,
      timestamp: Date.now()
    };

    // Prepend
    this.notifications = [newNotif, ...this.notifications];
    this.saveNotifications();
    this.playChime();
    this.showDesktopNotification(title, desc);

    return newNotif;
  }

  // User requirement: When user clicks "Mark all read", remove them so they disappear!
  markAllAsRead() {
    // Empty the notifications list completely so user gets a clean empty state
    this.notifications = [];
    this.saveNotifications();
  }

  // User requirement: When marking an individual message read or dismissing it, remove it from list
  dismissNotification(id) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.saveNotifications();
  }

  // Check and trigger alerts for Family Calendar events matching current time/date
  checkFamilyCalendarAlerts(events = [], onAlertTriggered = null) {
    if (!events || events.length === 0) return;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthNum = String(now.getMonth() + 1).padStart(2, "0");
    const currentDayNum = String(now.getDate()).padStart(2, "0");
    const todayISODate = `${currentYear}-${currentMonthNum}-${currentDayNum}`;
    const todayShortDate = now.toLocaleDateString("en-US", { day: "numeric", month: "short" }).toLowerCase(); // e.g. "31 oct"

    const currentHours = now.getHours();
    const currentMins = now.getMinutes();
    const currentTotalMins = currentHours * 60 + currentMins;

    for (const ev of events) {
      if (!ev || !ev.title) continue;

      // Check if event is scheduled for today
      const isFullDateToday = ev.fullDate && ev.fullDate.startsWith(todayISODate);
      const isDateToday = ev.date && ev.date.toLowerCase() === todayShortDate;

      if (isFullDateToday || isDateToday) {
        // Today alert key
        const todayAlertKey = `noorlife_cal_today_${todayISODate}_${ev.id}`;
        let alreadyNotifiedToday = false;
        try {
          alreadyNotifiedToday = localStorage.getItem(todayAlertKey) === "true";
        } catch (e) {}

        if (!alreadyNotifiedToday) {
          try {
            localStorage.setItem(todayAlertKey, "true");
          } catch (e) {}

          const title = `📅 Today's Reminder: ${ev.title}`;
          const desc = `Time: ${ev.time || "All Day"} • Category: ${ev.category || "Family"}`;

          this.addNotification({
            title,
            desc,
            category: "calendar",
            linkTab: "Family Calendar",
            eventId: ev.id,
            highPriority: true
          });

          if (onAlertTriggered) {
            onAlertTriggered({
              type: "today_event",
              title: ev.title,
              time: ev.time || "All Day",
              category: ev.category || "Family"
            });
          }
        }

        // Time-specific check: if event has a specific time (e.g. "10:00 AM" or "10:00")
        if (ev.time && ev.time !== "All Day") {
          const parsedMins = this.parseTimeStringToMinutes(ev.time);
          if (parsedMins !== null) {
            // If current time matches event time within current minute
            if (currentTotalMins === parsedMins) {
              const timeAlertKey = `noorlife_cal_exact_time_${todayISODate}_${ev.id}`;
              let alreadyTimeAlerted = false;
              try {
                alreadyTimeAlerted = localStorage.getItem(timeAlertKey) === "true";
              } catch (e) {}

              if (!alreadyTimeAlerted) {
                try {
                  localStorage.setItem(timeAlertKey, "true");
                } catch (e) {}

                const title = `⏰ Waqt Ho Gaya: ${ev.title}`;
                const desc = `Your scheduled event "${ev.title}" is happening NOW (${ev.time})!`;

                this.addNotification({
                  title,
                  desc,
                  category: "calendar",
                  linkTab: "Family Calendar",
                  eventId: ev.id,
                  highPriority: true
                });

                if (onAlertTriggered) {
                  onAlertTriggered({
                    type: "exact_time",
                    title: ev.title,
                    time: ev.time,
                    category: ev.category || "Family"
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  // Handle immediate alert when user adds a new event
  onEventCreated(newEvent, onAlertTriggered = null) {
    if (!newEvent || !newEvent.title) return;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthNum = String(now.getMonth() + 1).padStart(2, "0");
    const currentDayNum = String(now.getDate()).padStart(2, "0");
    const todayISODate = `${currentYear}-${currentMonthNum}-${currentDayNum}`;
    const todayShortDate = now.toLocaleDateString("en-US", { day: "numeric", month: "short" }).toLowerCase();

    const isToday =
      (newEvent.fullDate && newEvent.fullDate.startsWith(todayISODate)) ||
      (newEvent.date && newEvent.date.toLowerCase() === todayShortDate);

    let title = "";
    let desc = "";

    if (isToday) {
      title = `📅 Family Reminder: "${newEvent.title}" is TODAY!`;
      desc = `Scheduled for TODAY at ${newEvent.time || "All Day"} (${newEvent.category || "Family"}).`;
    } else {
      title = `📅 New Event Added: "${newEvent.title}"`;
      desc = `Scheduled for ${newEvent.date || newEvent.fullDate} (${newEvent.time || "All Day"}) in ${newEvent.category || "Family"}.`;
    }

    this.addNotification({
      title,
      desc,
      category: "calendar",
      linkTab: "Family Calendar",
      eventId: newEvent.id,
      highPriority: isToday
    });

    if (onAlertTriggered) {
      onAlertTriggered({
        type: isToday ? "new_today_event" : "new_event",
        title: newEvent.title,
        date: newEvent.date || newEvent.fullDate,
        time: newEvent.time || "All Day",
        isToday
      });
    }
  }

  parseTimeStringToMinutes(timeStr) {
    if (!timeStr) return null;
    const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridiem = match[3] ? match[3].toUpperCase() : null;

    if (meridiem === "PM" && hours < 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }
}

export const notificationService = new NotificationService();

