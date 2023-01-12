import style from "./madalmain.module.scss";
import cx from "classnames";
import { Itask } from "../../redux/taskSlice/taskSlice";
const Modalmain: React.FC<
  { showModal: boolean } & { setShowModal: any } & { currnetTask: Itask[] }
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
  } = currnetTask[0];

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
        <h1 onClick={() => setShowModal()} className={style.title}>
          {taskTitle}
        </h1>
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
      <div className={style.body}>
        <div className={style.leftside}>
          <p className={style.title_point}>Описание</p>
          <textarea
            value={description}
            name="description"
            id="textarea"
          ></textarea>
          <div className={style.comment}>
            <p className={style.title_point}>Комментарии</p>
            <div className={style.body}>22222</div>
          </div>
        </div>
        <div className={style.rightside}>
          <p className={style.title_point}>Дата создания</p>
          <input
            value={dateStartConvert.toLocaleDateString("ru-RU")}
            name="description"
            id="textarea"
          />

          <p className={style.title_point}>Время в работе</p>
          <input
            value={inWorkTime.toLocaleDateString("ru-RU")}
            name="description"
            id="textarea"
          />
          <p className={style.title_point}>Дата окончания</p>
          <input
            value={timeDone.toLocaleDateString("ru-RU")}
            name="description"
            id="textarea"
          />
          <p className={style.title_point}>Текущий статус </p>
          <input
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
