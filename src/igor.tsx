import React, { FC } from "react";

interface btn {
  typebtn: "1" | "2" | "3" | "4" | "5";
}

const igor: FC<btn> = ({ typebtn }) => {
  return <div>igor</div>;
};

export default igor;
