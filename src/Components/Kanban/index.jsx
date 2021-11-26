import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Coluna from "../Coluna";

const MainComponent = styled.div``;
const Titulo = styled.h1``;
const Content = styled.div`
  display: flex;
  gap: 30px;
`;

const Newcolumn = styled.button`
  width: 400px;
  height: 100px;
  margin-top: 40px;
`;

export default function Kanban() {
  const data = useSelector((state) => state.kanban.column);
  /* console.log(data); */
  return (
    <MainComponent>
      <Titulo>Kanban do projeto</Titulo>
      <Content>
        {data.map((coluna) => (
          <Coluna coluna={coluna} key={coluna.id} />
        ))}
        <Newcolumn>Adicionar nova coluna</Newcolumn>
      </Content>
    </MainComponent>
  );
}
