/* eslint-disable react/display-name */
import { useState } from "react";
import NotificationComponent from "@/components/NotificationComponent";

export function useNotification(props: {
  type: "success" | "info" | "error";
  title?: string;
  description?: string;
  seconds: number;
}) {
  return <NotificationComponent {...props} />;
}
