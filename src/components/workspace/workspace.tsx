import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchTask, Itask, ITaskState } from "../../redux/taskSlice/taskSlice";
import Task from "./task/task";
import { useDrop } from "react-dnd";
import style from "./workspace.module.scss";
import React from "react";
import Modalmain from "../modalMain/modalmain";

const Workspace = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = React.useState<Itask[]>();
  const [dataTask, setDataTask] = useState<any>();
  const [dataTarget, setDataTarget] = useState<
    "notStarted" | "inWork" | "done"
  >();
  const [taskToDo, setTaskToDo] = useState<Itask[]>();
  const [taskInWork, setTaskInWork] = useState<Itask[]>();
  const [taskDone, setTaskDone] = useState<Itask[]>();
  const { task } = useSelector((state: RootState) => state.task);

  const fetchTask1 = async () => {
    dispath(fetchTask());
    setTasks(task);
    setTaskToDo(
      task
        ?.filter((item: Itask) => item.idProject === Number(id))
        .filter((item: Itask) => item.currentStatus === "notStarted")
    );
    setTaskInWork(
      task
        ?.filter((item: Itask) => item.idProject === Number(id))
        .filter((item: Itask) => item.currentStatus === "inWork")
    );
    setTaskDone(
      task
        ?.filter((item: Itask) => item.idProject === Number(id))
        .filter((item: Itask) => item.currentStatus === "done")
    );
    console.log("wwwwwwwwwwwwwwwwww");
  };

  const dispath = useDispatch<AppDispatch>();
  useEffect(() => {
    fetchTask1();
  }, []);

  const [{ isOver }, addToStatusRef] = useDrop({
    accept: ["notStarted", "inWork", "done"],
    hover() {
      setDataTarget("inWork");
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOverTask }, removeFromStatusRef] = useDrop({
    accept: ["notStarted", "inWork", "done"],
    hover() {
      setDataTarget("notStarted");
      console.log();
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [{ isOver: isOverTask1 }, removeFromStatusRef1] = useDrop({
    accept: ["notStarted", "inWork", "done"],
    hover() {
      setDataTarget("done");
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveTask = (data: any) => {
    console.log("---------------");

    switch (dataTarget) {
      case "notStarted":
        if (data.type === "inWork") {
          setTaskInWork(
            taskInWork?.filter((item: Itask) => {
              return item.id !== data.id;
            })
          );
          const b = taskInWork?.filter((item: Itask) => {
            return item.id === data.id;
          });
          //@ts-ignore
          setTaskToDo(taskToDo ? [...taskToDo, ...b] : []);
        } else {
          setTaskDone(
            taskDone?.filter((item: Itask) => {
              return item.id !== data.id;
            })
          );
          const b = taskDone?.filter((item: Itask) => {
            return item.id === data.id;
          });
          //@ts-ignore
          setTaskToDo(taskToDo ? [...taskToDo, ...b] : []);
        }
        break;
      case "inWork":
        if (data.type === "notStarted") {
          setTaskToDo(
            taskToDo?.filter((item: Itask) => {
              return item.id !== data.id;
            })
          );
          const b = taskToDo?.filter((item: Itask) => {
            return item.id === data.id;
          });
          //@ts-ignore
          setTaskInWork(taskInWork ? [...taskInWork, ...b] : []);
        } else {
          setTaskDone(
            taskDone?.filter((item: Itask) => {
              return item.id !== data.id;
            })
          );
          const b = taskDone?.filter((item: Itask) => {
            return item.id === data.id;
          });
          //@ts-ignore
          setTaskInWork(taskInWork ? [...taskInWork, ...b] : []);
        }
        break;
      case "done":
        if (data.type === "inWork") {
          setTaskInWork(
            taskInWork?.filter((item: Itask) => {
              return item.id !== data.id;
            })
          );
          const b = taskInWork?.filter((item: Itask) => {
            return item.id === data.id;
          });
          //@ts-ignore
          setTaskDone(taskDone ? [...taskDone, ...b] : []);
        } else {
          setTaskToDo(
            taskToDo?.filter((item: Itask) => {
              return item.id !== data.id;
            })
          );
          const b = taskToDo?.filter((item: Itask) => {
            return item.id === data.id;
          });
          //@ts-ignore
          setTaskDone(taskDone ? [...taskDone, ...b] : []);
        }
        break;
      default:
        break;
    }

    console.log("-----------");
  };
  useEffect(() => {
    console.log(dataTarget);
  }, [dataTarget]);

  const showModalfinc = () => {
    setShowModal(true);
  };
  return (
    <div>
      <Modalmain
        setShowModal={() => setShowModal(false)}
        showModal={showModal}
      />
      <h2 className={style.title}> Строительный магазин</h2>
      <hr className={style.line} />
      <div className={style.option}></div>
      <div className={style.body}>
        <div className={style.workspace}>
          <ul className={style.columnStatus} ref={removeFromStatusRef}>
            <h3 className={style.status}> Задания</h3>
            {taskToDo
              ?.sort((a, b) => Number(b.priority) - Number(a.priority))
              .map((item: Itask, index) => (
                <Task
                  onClick={() => setShowModal(true)}
                  key={`${index}__r`}
                  index={index}
                  Typetype="notStarted"
                  OnDropTask={moveTask}
                  {...item}
                />
              ))}
          </ul>
          <ul className={style.columnStatus} ref={addToStatusRef}>
            <h3 className={style.status}> В работе</h3>
            {taskInWork
              ?.sort((a, b) => Number(b.priority) - Number(a.priority))
              .map((item: Itask, index) => (
                <Task
                  onClick={() => setShowModal(true)}
                  key={`${index}__o`}
                  index={index}
                  Typetype="inWork"
                  OnDropTask={moveTask}
                  {...item}
                />
              ))}
          </ul>
          <ul className={style.columnStatus} ref={removeFromStatusRef1}>
            <h3 className={style.status}>Завершены</h3>
            {taskDone
              ?.sort((a, b) => Number(b.priority) - Number(a.priority))
              .map((item: Itask, index) => {
                return (
                  <Task
                    onClick={() => setShowModal(true)}
                    key={`${index}__w`}
                    index={index}
                    Typetype="done"
                    OnDropTask={moveTask}
                    {...item}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
