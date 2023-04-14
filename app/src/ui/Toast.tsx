"use client";

import { Toaster } from "react-hot-toast";

export default function Toast() {
  const toastOptions = {
    className: "",
    style: {
      boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
      background: "#FFFFFF",
      borderRadius: "10px",
      fontFamily: "sans-serif",
      fontWeight: "300",
      fontSize: "16px",
      lineHeight: "18px",
      maxWidth: "unset",
      height: "40px",
      color: "#1a1a1a",
    },
  };

  return (
    <>
      <Toaster toastOptions={toastOptions} position="top-center" />
    </>
  );
}
