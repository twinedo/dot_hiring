"use client";
import Buttons from "@/components/buttons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("johnd");
  const [password, setPassword] = useState("m38rmF$");

  const _onSubmit = () => {
    if (username.length === 0) {
      alert("Username is required");
    }
    if (password.length === 0) {
      alert("Password is required");
    }
    axios
      .post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("reslogin", res);
        localStorage.setItem("@token_dot", res.data.token);
        if (res.status === 200) {
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("errLogin", err);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-5">
        <div>Login</div>
        <input
          className="border border-spacing-1"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border border-spacing-1"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Buttons className="text-white" onClick={_onSubmit}>
          Click to Login
        </Buttons>
      </div>
    </main>
  );
}

export default Login;
