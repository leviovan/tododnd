import React from "react";
import style from "./task.module.scss";
import cx from "classnames";
import { Itask } from "../../../redux/taskSlice/taskSlice";
import { useDrag } from "react-dnd";

const Task: React.FC<
  Itask & { OnDropTask: (item: any) => void } & { Typetype: string } & {
    index: number;
  } & { onClick: any }
> = ({
  id,
  taskTitle,
  description,
  dataStart,
  deadLine,
  priority,
  OnDropTask,
  Typetype,
  index,
  onClick,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: Typetype,
    item: {
      type: Typetype,
      index,
      id,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        OnDropTask(item);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <li
        onClick={() => onClick()}
        className={cx(style.task, isDragging ? style.isDrag : "")}
        ref={dragRef}
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
