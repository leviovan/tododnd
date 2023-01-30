import React from "react";
import { IComment } from "../../../redux/taskSlice/taskSlice";
import style from "./CommentItem.module.scss";

const CommentItem: React.FC<{ datacomment: IComment }> = ({ datacomment }) => {
  const marg = datacomment.parentId ? 30 * datacomment.parentId : 30 * 0;
  return (
    <>
      <p
        className={style.comment}
        style={{
          marginLeft: marg,
        }}
      >
        {datacomment.textComment}
      </p>
      {datacomment.comment.map}
      {datacomment.comment?.map((item) => (
        <CommentItem datacomment={item} />
      ))}
    </>
  );
};

export default CommentItem;
