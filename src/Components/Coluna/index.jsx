import React from "react";
import styled from "styled-components";
import Tarefas from "../Tarefas";

const ColunaContainer = styled.div`
  background-color: #fff;
  width: 400px;
  height: 200px;
  margin-top: 40px;
`;
const ColunaContent = styled.div`
  margin: 10px;
`;
const TopRow = styled.div`
  margin: 5px;
  button {
    float: right;
  }
`;
const TasksContainer = styled.div``;
const Text = styled.h1``;
const TagsContainer = styled.p``;

export default function Coluna(props) {
  const coluna = props.coluna;
  console.log(coluna);
  return (
    <ColunaContainer>
      <ColunaContent>
        <TopRow>
          <button>X</button>
        </TopRow>
        <Text>{coluna.name}</Text>
        <TasksContainer>
          {coluna.cards.map((card) => (
            <Tarefas card={card} key={card.id} />
          ))}
        </TasksContainer>
      </ColunaContent>
      <button onClick={() => console.log(`added to ${coluna.id}`)}>
        Adicionar nova coluna
      </button>
    </ColunaContainer>
  );
}
