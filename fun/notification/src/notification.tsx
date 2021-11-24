import React from "react";

interface NotificationParams {
  title: string;
  options?: NotificationOptions | undefined;
}

export const useNotification = ({ title, options }: NotificationParams) => {
  if (!("Notification" in window)) {
    return;
  }

  const handleClick = function (event: Event) {
    event.preventDefault();
    window.open("https://www.google.com/", "_blank");
  };

  const triggerNotification = () => {
    if (Notification.permission !== "granted") {
      // permission denied
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title, options);
          notification.onclick = handleClick;
        } else {
          return;
        }
      });
    } else {
      // permisstion granted
      const notification = new Notification(title, options);
      notification.onclick = handleClick;
    }
  };

  return triggerNotification;
};

export default function UseNotificationComponent() {
  const triggerNotification = useNotification({
    title: "구글",
    options: {
      body: "얄림 내용",
    },
  });

  return (
    <div className="App">
      <button onClick={triggerNotification}>알림</button>
    </div>
  );
}
