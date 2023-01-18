import React from "react";
import { IComment } from "../../../redux/taskSlice/taskSlice";

const CommentItem: React.FC<{ datacomment: IComment }> = ({ datacomment }) => {
  console.log(datacomment);

  return (
    <>
      <div>{datacomment.textComment}</div>
      {datacomment.comment.map}
      {datacomment.comment?.map((item) => (
        <CommentItem datacomment={item} />
      ))}
    </>
  );
};

export default CommentItem;
