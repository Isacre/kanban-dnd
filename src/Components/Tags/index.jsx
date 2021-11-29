import React from "react";
import { TagContainer } from "./styles";

import { useDispatch } from "react-redux";
import { DeleteTg } from "../../Store/kanban";

export default function Tags(props) {
  const tag = props.tag;
  const tagindex = props.tagindex;
  const columnindex = props.columnindex;
  const cardindex = props.cardindex;
  const color = props.color;
  const dispatch = useDispatch();

  function DeleteTag() {
    const indexes = {
      columnindex,
      cardindex,
      tagindex,
    };

    dispatch(DeleteTg(indexes));
  }

  return (
    <TagContainer onClick={DeleteTag} color={color}>
      {tag?.name}
    </TagContainer>
  );
}
