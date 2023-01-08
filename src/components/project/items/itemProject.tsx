import React from "react";
import { NavLink } from "react-router-dom";
import { Iproject } from "../../../redux/projectSlice/projectSlice";
import style from "./itemProject.module.scss";
const ItemProject = ({ id, title }: Iproject) => {
  return (
    <NavLink to={`/${id}`}>
      <div className={style.item}>
        <div className={style.id}>
          <p className={style.text}> {id}</p>
        </div>
        <div className={style["name-task"]}>
          <p className={style.text}>{title}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default ItemProject;
