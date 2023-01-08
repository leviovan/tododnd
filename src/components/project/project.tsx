import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, Iproject } from "../../redux/projectSlice/projectSlice";
import { AppDispatch, RootState } from "../../redux/store";
import ItemProject from "./items/itemProject";
import style from "./project.module.scss";
const Project = () => {
  const { project } = useSelector((state: RootState) => state.project);

  const dispath = useDispatch<AppDispatch>();
  const fetchProject1 = async () => {
    dispath(fetchProject());
  };
  useEffect(() => {
    fetchProject1();
  }, []);

  return (
    <div>
      <h2 className={style.title}>Ваши проекты</h2>
      <hr />
      <div className={style.header}>
        <div className={style.header__item}>
          <p className={style.text}>ID</p>
        </div>
        <div className={style.header__item}>
          <p className={style.text}>Название проекта</p>
        </div>
      </div>
      {project?.map((item) => {
        return <ItemProject {...item} />;
      })}
    </div>
  );
};

export default Project;
