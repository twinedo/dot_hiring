import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function withAuth(WrappedComponent: React.ComponentType) {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const authenticate = async () => {
        const token = await checkIfAuthenticated();
        if (!token) {
          router.push("/login");
        }

        setIsAuth(token);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      };
      authenticate();
    }, []);

    if (isLoading) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <span className="relative flex h-10 w-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-10 w-10 bg-sky-500"></span>
          </span>
        </div>
      );
    }
    if (isAuth) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return ComponentWithAuth;
}

export function checkIfAuthenticated() {
  const token = localStorage.getItem("@token_dot");
  console.log("tokenn", token);
  if (token) {
    return true;
  } else {
    return false;
  }
}
