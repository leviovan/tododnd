import React from "react";
import { IComment } from "../../redux/taskSlice/taskSlice";
import style from "./comment.module.scss";
import CommentItem from "./CommentItem/CommentItem";
const Comment: React.FC<{ comment: IComment[] }> = (comment) => {
  return (
    <div className={style.comment}>
      <p className={style.title_point}>Комментарии</p>
      <div className={style.body}>
        {comment &&
          comment.comment.map((item) => <CommentItem datacomment={item} />)}
      </div>
    </div>
  );
};

export default Comment;
