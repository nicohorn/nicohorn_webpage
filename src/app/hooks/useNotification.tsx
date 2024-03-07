/* eslint-disable react/display-name */
import { useState } from "react";
import NotificationComponent from "@/components/Notification";

export function useNotification(props: {
  type: "success" | "info" | "error";
  title?: string;
  description?: string;
  seconds: number;
}) {
  return <NotificationComponent {...props} />;
}
