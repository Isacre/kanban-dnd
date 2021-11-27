import React from "react";
import styled from "styled-components";
import { CardName } from "../../Store/kanban";
import Tags from "../Tags";

const TarefasComponent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  min-height: 50px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
  cursor: grab;

  button {
    float: right;
  }
`;
const CardN = styled.div`
  margin-top: 15px;
  font-size: 16px;
  line-height: 21px;
`;
const TopRow = styled.div``;
const TagsContainer = styled.div`
  margin-top: 20px;
`;
const TagButton = styled.button``;
const DeleteButton = styled.button`
  color: red;
  background: transparent;
  border: none;
  outline: none;
`;
const AddTagButton = styled.button``;

export default function Tarefas(props) {
  const color = props.color;
  const card = props.card;
  return (
    <TarefasComponent>
      <CardN>{card.name}</CardN>
      <TagsContainer>
        {card?.tags.map((tag) => (
          <Tags tag={tag} color={color} />
        ))}
      </TagsContainer>
    </TarefasComponent>
  );
}
