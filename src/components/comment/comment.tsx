import React from "react";
import { IComment } from "../../redux/taskSlice/taskSlice";
import style from "./comment.module.scss";
import CommentItem from "./CommentItem/CommentItem";
const Comment: React.FC<{ comment: IComment[] }> = (comment) => {
  return (
    <>
      {comment &&
        comment.comment.map((item, index) => (
          <CommentItem key={`comment__${index}`} datacomment={item} />
        ))}
    </>
  );
};

export default Comment;
