import React from "react";
import style from "./madalmain.module.scss";
const Modalmain = () => {
  return (
    <div className={style.mainModal}>
      <div className={style.header}>
        <h1 className={style.title}>Переделать комментарии</h1>
      </div>
      <div className={style.body}>
        <div className="leftside"></div>
        <div className="rightside"></div>
      </div>
    </div>
  );
};

export default Modalmain;
