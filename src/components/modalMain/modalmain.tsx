import style from "./madalmain.module.scss";
import cx from "classnames";
import { changeCurrentStatus, Itask } from "../../redux/taskSlice/taskSlice";
import Comment from "../comment/comment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
const Modalmain: React.FC<
  { showModal: boolean } & { setShowModal: any } & { currnetTask: Itask }
> = ({ showModal, setShowModal, currnetTask }) => {
  const {
    currentStatus,
    dataStart,
    deadLine,
    description,
    files,
    id,
    idProject,
    priority,
    taskTitle,
    timeInWork,
    comment,
  } = currnetTask;

  const dispath = useDispatch<AppDispatch>();

  // const [currnetTaskData, setCurrnetTaskData] = useState<Itask>(currnetTask);

  const [deadLineInput, setDeadLineInput] = useState<string>(deadLine);

  const currentTaskssss = useSelector((state) => state);
  console.log(currentTaskssss);

  const status = {
    notStarted: "Не начинали ",
    inWork: "В работе",
    done: "Завершили",
  };
  useEffect(() => {
    // setCurrnetTaskData(currnetTask);
    setDeadLineInput(deadLine);
  }, []);

  useEffect(() => {
    setDeadLineInput(deadLine);
  }, [currnetTask]);

  const handlerDeadLineChange = (text: string) => {
    setDeadLineInput(text);
  };

  const OnchangeHandlerCurrentStatus = (text: string) => {
    console.log(text);
    //@ts-ignore
    const b = Object.keys(status).find((key) => status[key] === text);
    //@ts-ignore
    dispath(changeCurrentStatus(b));
  };

  console.log(status[currentStatus]);

  return (
    <div className={cx(style.mainModal, showModal ? style.showModal : "")}>
      <div className={style.header}>
        <div className={style.title_block}>
          <h1 className={style.title}>{taskTitle}</h1>
          <div className={style.priority}>
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
        </div>
        <span onClick={() => setShowModal()} className={style.closeModal}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6 6L18 18"
                stroke="#000000"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M18 6L6.00001 18"
                stroke="#000000"
                strokeLinecap="round"
              ></path>
            </g>
          </svg>
        </span>
      </div>
      <div className={style.body}>
        <div className={style.leftside}>
          <p className={style.title_point}>Описание</p>
          <textarea
            readOnly
            value={description}
            name="description"
            id="textarea"
          ></textarea>
          <p className={style.title_point}>Комментарии</p>
          <div className={style.comment_body}>
            <Comment comment={comment && comment} />
          </div>
        </div>
        <div className={style.rightside}>
          <p className={style.title_point}>Дата создания</p>
          <input
            type={"date"}
            className={style.fieldData}
            readOnly
            value={dataStart}
            name="dateStart"
          />
          <p className={style.title_point}>Время в работе</p>
          <input
            type={"text"}
            className={style.fieldData}
            readOnly
            value={timeInWork}
            name="timeInWork"
          />
          <p className={style.title_point}>Дата окончания</p>
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              handlerDeadLineChange(e.currentTarget.value)
            }
            className={style.fieldData}
            value={deadLineInput}
            name="deadline"
            type={"date"}
          />
          <p className={style.title_point}>Текущий статус </p>
          <select
            onChange={(e) =>
              OnchangeHandlerCurrentStatus(e.currentTarget.value)
            }
            className={style.fieldData}
            name="currentStatus"
            value={status[currentStatus]}
          >
            {Object.values(status).map((i: string) => {
              return (
                <option selected key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Modalmain;
