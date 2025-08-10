"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { tasks } = useTasks();

  async function signIn() {
    console.log(email, password);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });
    console.log(data, error);
  }
  async function logIn() {
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });
    console.log(data, error);
  }

  async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
    }
  }
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // console.log(data);
    console.log(user);
  }

  return (
    <div>
      <input
        className="bg-amber-700 mx-2"
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="bg-amber-700 mx-2"
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="bg-amber-400 mx-2" onClick={signIn}>
        sign in
      </button>
      <button onClick={logIn} className="bg-amber-400 mx-2">
        log in
      </button>
      <button onClick={logOut} className="bg-amber-400 mx-2">
        log out
      </button>
      <button onClick={getUser} className="bg-amber-400 mx-2">
        get user
      </button>

      <div className="mt-8 border-t-2 border-amber-400">
        {tasks.map((task) => (
          <div key={task.id}>{task.description}</div>
        ))}
      </div>
    </div>
  );
}
