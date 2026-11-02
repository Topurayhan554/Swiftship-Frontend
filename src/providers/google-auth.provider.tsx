"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

export default function GoogleAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  // console.log("Google Client ID:", clientId);
  if (!clientId) {
    console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing");
    return <>{children}</>;
  }

  if (!clientId) {
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
