import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Coluna from "../Coluna";
import { useState } from "react";
import { NewColumn } from "../../Store/kanban";
import pluspreto from "../../assets/preto.svg";
import { ToastContainer, toast } from "react-toastify";

const MainComponent = styled.div`
  width: fit-content;
`;
const Titulo = styled.h1``;
const Content = styled.div`
  display: flex;
  gap: 20px;
`;

const Newcolumn = styled.button`
  width: 315px;
  border-radius: 5px;
  border: none;
  outline: none;
  height: 54px;
  margin-right: 50px;

  background-color: #cad1d5;
  color: #43474b;
  margin-top: 40px;
  cursor: pointer;
  display: flex;

  img {
    margin-right: 0px;
    padding: 15px;
  }
`;

const INPUTBOX = styled.div`
  background-color: #5cc4ff;
  width: 315px;
  height: 100%;
  border-radius: 5px;
  margin-top: 40px;
  border-top: 5px solid rgba(0, 0, 0, 10%);
  padding: 12px;

  input {
    line-height: 50px;
    width: 100%;
    background: transparent;
    outline: none;
    color: white;
    border: none;

    ::placeholder {
      color: #fff;
      text-align: center;
    }
  }
`;

const NewColumnContent = styled.div`
  margin: auto;
  margin-left: 5px;
  margin-top: 19px;
  font-size: 16px;
`;

export default function Kanban() {
  const data = useSelector((state) => state.kanban.column);
  const dispatch = useDispatch();
  const [NewInput, setNewInput] = useState(false);
  const [inputvalue, setInputvalue] = useState("");
  const [color, setColor] = useState("#5cc4ff");

  console.log(data);
  function SubmitNewColumn() {
    if (inputvalue !== "") {
      const dados = {
        icon: "📋",
        name: inputvalue,
        id: Math.random(),
        color: color,
        cards: [],
      };

      setInputvalue("");
      setNewInput(false);
      dispatch(NewColumn(dados));
    } else window.alert("Por favor, insíra um titulo");
  }

  function EnterToSave(e) {
    if (e.key === "Enter") SubmitNewColumn();

    if (e.key === "Escape") {
      e.target.value = "";
      setNewInput(false);
    }
  }

  return (
    <MainComponent>
      <Titulo>Kanban do projeto</Titulo>

      <Content>
        {data.map((coluna, index) => (
          <Coluna
            coluna={coluna}
            key={coluna.id}
            inputvalue={inputvalue}
            index={index}
          />
        ))}
        {NewInput && (
          <INPUTBOX>
            <input
              placeholder="Digite o nome da coluna  e pressione enter"
              onChange={(event) => setInputvalue(event.target.value)}
              value={inputvalue}
              onKeyDown={EnterToSave}
              autoFocus
            />
          </INPUTBOX>
        )}
        <Newcolumn onClick={() => setNewInput(true)}>
          <img src={pluspreto} alt="pluspreto" />
          <NewColumnContent>Adicionar nova coluna</NewColumnContent>
        </Newcolumn>
      </Content>
    </MainComponent>
  );
}
