import React from "react";
import styled from "styled-components";
import Tags from "../Tags";

const TarefasComponent = styled.div`
  background-color: grey;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  button {
    float: right;
  }
`;
const TopRow = styled.div``;
const TagsContainer = styled.div``;
export default function Tarefas(props) {
  const card = props.card;
  return (
    <TarefasComponent>
      <div>
        <button>x</button>
        {card.name}
      </div>
      <TagsContainer>
        {card.tags.map((tag) => (
          <Tags tag={tag} />
        ))}
      </TagsContainer>
    </TarefasComponent>
  );
}
