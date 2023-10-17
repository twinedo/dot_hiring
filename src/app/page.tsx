"use client";
import Buttons from "@/components/buttons";
import Card from "@/components/card";
import { checkIfAuthenticated } from "@/components/withAuth";
import { IProductsData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dataArray, setDataArray] = useState<IProductsData[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const _getAllProducts = () => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setDataArray(json);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    _getAllProducts();
  }, []);

  useEffect(() => {
    const token = checkIfAuthenticated();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const _onBuyItem = (item: IProductsData) => {
    if (isAuthenticated) {
      alert("Success Buy " + item.title);
    } else {
      alert("Please Login");
      router.push("/login");
    }
  };

  const _onCartItem = (item: IProductsData) => {
    if (isAuthenticated) {
      alert("Success Add to cart: " + item.title);
    } else {
      alert("Please Login");
      router.push("/login");
    }
  };

  const _onLogout = () => {
    localStorage.removeItem("@token_dot");
    router.replace("/");
  };

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full row my-2 justify-between">
        <div className="text-lg">All Products</div>
        <div className="flex flex-row gap-4">
          {isAuthenticated ? (
            <Buttons
              className="text-white bg-green-700"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Buttons>
          ) : null}
          <Buttons
            className="text-white bg-green-700"
            onClick={() =>
              isAuthenticated ? _onLogout() : router.push("/login")
            }
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Buttons>
        </div>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="grid grid-cols-3 gap-5">
          {dataArray &&
            dataArray.map((o: IProductsData) => (
              <div key={o?.id?.toString()}>
                <Card>
                  <div>
                    <Image
                      src={o.image}
                      alt="img-products"
                      width={100}
                      height={24}
                    />
                  </div>
                  {o?.title}
                  <div className="flex row gap-4">
                    <Buttons
                      className="text-white"
                      onClick={() => _onBuyItem(o)}
                    >
                      Buy
                    </Buttons>
                    <Buttons
                      className="text-white bg-orange-400"
                      onClick={() => _onCartItem(o)}
                    >
                      Add to Cart
                    </Buttons>
                  </div>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
