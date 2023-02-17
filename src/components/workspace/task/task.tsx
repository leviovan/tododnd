import React from "react";
import style from "./task.module.scss";
import cx from "classnames";
import {
  changeCurrentStatus,
  Itask,
  ITaskState,
  setCurrentTask,
} from "../../../redux/taskSlice/taskSlice";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";

const Task: React.FC<
  Itask & { OnDropTask: (item: any) => void } & {
    dataTarget: "notStarted" | "inWork" | "done";
  } & { Typetype: string } & {
    index: number;
  } & { onClick: any }
> = ({
  id,
  idProject,
  taskTitle,
  timeInWork,
  description,
  dataStart,
  files,
  deadLine,
  priority,
  OnDropTask,
  currentStatus,
  Typetype,
  index,
  onClick,
  dataTarget,
}) => {
  const dispath = useDispatch<AppDispatch>();

  const [{ isDragging }, dragRef] = useDrag({
    type: Typetype,
    item: {
      type: Typetype,
      index,
      id,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      dispath(changeCurrentStatus(dataTarget));
      if (item && dropResult) {
        OnDropTask(item);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const setCurrentTaskHandler = () => {
    dispath(
      setCurrentTask({
        taskTitle,
        idProject,
        description,
        dataStart,
        timeInWork,
        deadLine,
        priority,
        files,
        currentStatus,
        id,
        comment: [],
      })
    );
  };
  return (
    <>
      <li
        onClick={() => onClick()}
        className={cx(style.task, isDragging ? style.isDrag : "")}
        ref={dragRef}
        onDragStart={() => setCurrentTaskHandler()}
      >
        <div className={style.header}>
          <h3 className={style.title}>{taskTitle}</h3>
          <p className={style.date}>{}</p>
        </div>
        <div className={style.body}>
          <p className={style.decription}>{description}</p>
        </div>
        <div className={style.footer}>
          <span
            className={cx(
              style.circle,
              style.greenColor,
              priority === "1" ? style.greenbng : ""
            )}
          ></span>
          <span
            className={cx(
              style.circle,
              style.orangeColor,
              priority === "2" ? style.yellowbng : ""
            )}
          ></span>
          <span
            className={cx(
              style.circle,
              style.redColor,
              priority === "3" ? style.redbng : ""
            )}
          ></span>
        </div>
      </li>
    </>
  );
};

export default Task;
