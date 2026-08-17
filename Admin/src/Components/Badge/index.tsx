import React from "react";

interface BadgeProps {
  status: string;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return {
          bg: "#e7f8ee",
          text: "#1eae5f",
          label: "Delivered",
        };
      case "pending":
        return {
          bg: "#fef3e6",
          text: "#f59e0b",
          label: "Pending",
        };
      case "processing":
        return {
          bg: "#eaf0ff",
          text: "#3872fa",
          label: "Processing",
        };
      case "cancelled":
        return {
          bg: "#fee2e2",
          text: "#dc2626",
          label: "Cancelled",
        };
      default:
        return {
          bg: "#f3f4f6",
          text: "#6b7280",
          label: status,
        };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
      }}
    >
      {styles.label}
    </span>
  );
};

export default Badge;
