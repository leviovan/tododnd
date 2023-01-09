import style from "./madalmain.module.scss";
import cx from "classnames";
const Modalmain: React.FC<{ showModal: boolean } & { setShowModal: any }> = ({
  showModal,
  setShowModal,
}) => {
  console.log(showModal);

  return (
    <div
      onClick={() => setShowModal()}
      className={cx(style.mainModal, showModal ? style.showModal : "")}
    >
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
