import React, { ReactNode } from "react";

interface ICard {
  children: ReactNode;
}

function Card(props: ICard) {
  const { children } = props;
  return (
    <div className="p-4 rounded-lg bg-white shadow-md cursor-pointer gap-4 hover:shadow-xl">
      {children}
    </div>
  );
}

export default Card;
