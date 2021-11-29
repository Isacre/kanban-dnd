import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { DeleteTg } from "../../Store/kanban";

const TagsComponent = styled.div``;

const TagContainer = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    transition: 0.5s;
    background: red;
  }
`;

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
    <TagsComponent>
      <TagContainer onClick={DeleteTag} color={color}>
        {tag?.name}
      </TagContainer>
    </TagsComponent>
  );
}
