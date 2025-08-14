"use client";

import { LoginForm } from "@/features/auth/components/login-form";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginFeature() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error.message);
      setError(error.message);
    } else router.push("/rooms/885ed5d2-0d3d-423a-80ac-9f357494c1d8");

    setLoading(false);
  }

  return <LoginForm onSubmit={handleLogin} error={error} isLoading={loading} />;
}
