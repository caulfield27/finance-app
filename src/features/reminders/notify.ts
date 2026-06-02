/** Wrapper around the Web Notifications API with graceful fallbacks. */
export const notifications = {
  supported: typeof window !== "undefined" && "Notification" in window,

  permission(): NotificationPermission {
    return this.supported ? Notification.permission : "denied";
  },

  async request(): Promise<boolean> {
    if (!this.supported) return false;
    if (Notification.permission === "granted") return true;
    const result = await Notification.requestPermission();
    return result === "granted";
  },

  show(title: string, body: string) {
    if (this.supported && Notification.permission === "granted") {
      new Notification(title, { body, icon: "/favicon.svg" });
    }
  },
};
