import React, { useEffect } from "react";
import { Spin, Badge, Button } from "antd";
import {
  useGetNotificationsQuery,
  useMarkAllReadMutation,
  useMarkAsReadMutation,
} from "../../redux/notificationApiSlice";
import { getTimeAgo } from "../../utils/time";
import styles from "./NotificationPanel.module.css";
import type { INotification } from "../../utils/types";
import { getUserAvatar } from "../../utils/avatarGenerator";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose?: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: notifications, isLoading } = useGetNotificationsQuery();
  const [markAllRead] = useMarkAllReadMutation();
    const [markAsRead] = useMarkAsReadMutation();
    
      useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }, [isOpen]);


  const unreadCount = notifications?.filter((n) => !n.read).length || 0;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleNotificationClick = async (notification: INotification) => {
    if (!notification.read) {
      try {
        await markAsRead(notification._id);
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }

    if (onClose) {
      onClose();
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick} />

      <aside
        className={styles.panel}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>Notifications</h3>
          <div className={styles.actions}>
            {unreadCount > 0 && <Badge count={unreadCount} color="#1677ff" />}
            {unreadCount > 0 && (
              <Button type="link" size="small" onClick={handleMarkAllRead}>
                Mark all as read
              </Button>
            )}
            {onClose && (
              <Button type="text" size="small" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <ul className={styles.list}>
            {notifications && notifications.length > 0 ? (
              notifications.map((n: INotification) => (
                <li
                  key={n._id}
                  className={`${styles.notificationItem} ${
                    n.read ? styles.read : styles.unread
                  }`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <div className={styles.notificationContent}>
                    <img
                      src={getUserAvatar(n.sender)}
                      alt={n.sender.name}
                      className={styles.avatar}
                    />
                    <div className={styles.textBlock}>
                      <p className={styles.text}>
                        <strong>{n.sender.name}</strong>{" "}
                        {n.type === "like" && "liked your post"}
                        {n.type === "comment" && "commented on your post"}
                        {n.type === "follow" && "started following you"}
                      </p>
                      <span className={styles.time}>
                        {getTimeAgo(n.createdAt)}
                      </span>
                    </div>
                  </div>

                  {n.post && n.post.image && (
                    <div className={styles.postPreview}>
                      <img
                        src={n.post.image}
                        alt="Post preview"
                        className={styles.postImage}
                      />
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className={styles.noNotifications}>No notifications yet 💤</p>
            )}
          </ul>
        )}
      </aside>
    </>
  );
};

export default NotificationPanel;
