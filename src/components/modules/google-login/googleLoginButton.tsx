"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useGoogleOAuth } from "@/hooks";
import { toast } from "@/components/ui/toast";

interface GoogleLoginButtonProps {
  successTitle?: string;
  successDescription?: string;
  redirectTo?: string;
  label?: string;
}

export default function GoogleLoginButton({
  successTitle = "Logged In Successfully",
  successDescription = "Welcome Back!",
  redirectTo = "/",
  label = "Continue with Google",
}: GoogleLoginButtonProps) {
  const { mutate: googleLogin, isPending } = useGoogleOAuth();
  const router = useRouter();

  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () =>
      setWidth(Math.min(400, Math.max(200, Math.round(el.offsetWidth))));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: successTitle,
            description: successDescription,
            type: "success",
          });
          router.push(redirectTo);
        },
        onError: (err) => {
          toast.add({
            title: "Google OAuth Failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };

  return (
    <div
      ref={wrapRef}
      className={`group relative h-12 w-full overflow-hidden rounded-full ${
        isPending ? "pointer-events-none opacity-70" : ""
      }`}
    >
      <div className="pointer-events-none flex h-full w-full items-center justify-center gap-3 rounded-full border border-[#0f2a4a]/15 bg-white/80 text-[14.5px] font-semibold text-[#0f2a4a] shadow-md shadow-[#0f2a4a]/10 transition-all group-hover:-translate-y-0.5 group-hover:bg-white group-hover:shadow-lg">
        <FcGoogle className="size-5" />
        {isPending ? "Signing in..." : label}
      </div>

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-0 [&_iframe]:!h-12 [&>div]:!w-full">
        <GoogleLogin
          theme="outline"
          shape="pill"
          size="large"
          width={width}
          text="continue_with"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
}
