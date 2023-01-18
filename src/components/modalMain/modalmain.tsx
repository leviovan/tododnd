import style from "./madalmain.module.scss";
import cx from "classnames";
import { Itask } from "../../redux/taskSlice/taskSlice";
import Comment from "../comment/comment";
const Modalmain: React.FC<
  { showModal: boolean } & { setShowModal: any } & { currnetTask: Itask }
> = ({ showModal, setShowModal, currnetTask }) => {
  console.log(currnetTask);

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

  const dateStartConvert = new Date(dataStart * 1000);
  const inWorkTime = new Date(timeInWork * 1000);
  const timeDone = new Date(deadLine * 1000);

  const status = {
    notStarted: "Не начинали ",
    inWork: "В работе",
    done: "Завершили",
  };

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
            <Comment comment={comment} />
          </div>
        </div>
        <div className={style.rightside}>
          <p className={style.title_point}>Дата создания</p>
          <input
            readOnly
            value={dateStartConvert.toLocaleDateString("ru-RU")}
            name="description"
            id="textarea"
          />

          <p className={style.title_point}>Время в работе</p>
          <input
            readOnly
            value={inWorkTime.toLocaleDateString("ru-RU")}
            name="description"
            id="textarea"
          />
          <p className={style.title_point}>Дата окончания</p>
          <input
            readOnly
            value={timeDone.toLocaleDateString("ru-RU")}
            name="description"
            id="textarea"
          />
          <p className={style.title_point}>Текущий статус </p>
          <input
            readOnly
            value={status[currentStatus]}
            name="description"
            id="textarea"
          />
          {/* <p className={style.title_point}>Прикриплённые файлы </p> */}
        </div>
      </div>
    </div>
  );
};

export default Modalmain;
