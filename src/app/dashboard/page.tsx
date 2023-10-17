"use client";
import Buttons from "@/components/buttons";
import withAuth from "@/components/withAuth";
import { useRouter } from "next/navigation";
import React from "react";

function Dashboard() {
  const navigation = useRouter();

  const _onLogout = () => {
    localStorage.removeItem("@token_dot");
    navigation.replace("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-7">
      <div>Welcome to Dashboard</div>
      <Buttons className="text-white" onClick={() => navigation.replace("/")}>
        Products
      </Buttons>
      <Buttons className="text-white" onClick={_onLogout}>
        Logout
      </Buttons>
    </main>
  );
}

export default withAuth(Dashboard);
