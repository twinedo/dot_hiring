import React, { ReactNode } from "react";

interface IButtons {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

function Buttons(props: IButtons) {
  const { onClick, className, children } = props;
  return (
    <div
      className={"p-4 rounded-md cursor-pointer bg-blue-900 " + className}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Buttons;
