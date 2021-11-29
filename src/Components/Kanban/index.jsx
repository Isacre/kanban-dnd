import React from "react";
import styled from "styled-components";
import Coluna from "../Coluna";
import pluspreto from "../../assets/preto.svg";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { MoveCardToColumn, NewColumn } from "../../Store/kanban";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext } from "react-beautiful-dnd";
import { ChromePicker } from "react-color";

const MainComponent = styled.div`
  width: fit-content;
`;
const Title = styled.h1``;

const Columns = styled.div`
  display: flex;
  gap: 20px;
`;

const AddColumnButton = styled.button`
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

const NewColumnInput = styled.div`
  background-color: ${(props) => props.color};
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

const NewColumnText = styled.div`
  margin: auto;
  margin-left: 5px;
  margin-top: 19px;
  font-size: 16px;
`;

const DIV = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;

export default function Kanban() {
  const data = useSelector((state) => state.kanban.column);
  console.log(data);

  const dispatch = useDispatch();
  const [NewInputOn, setNewInputOn] = useState(false);
  const [ColumnName, setColumnName] = useState("");
  const [color, setColor] = useState("#5cc4ff");

  function SubmitNewColumn() {
    if (ColumnName !== "") {
      const dados = {
        icon: "📋",
        name: ColumnName,
        id: `coluna - ${Math.floor(Math.random() * 101)}`,
        color: color,
        cards: [],
      };
      setColumnName("");
      setNewInputOn(false);
      dispatch(NewColumn(dados));
    } else toast.error("Por favor, insíra um titulo na coluna");
  }

  function EnterToSave(e) {
    if (e.key === "Enter") SubmitNewColumn();

    if (e.key === "Escape") {
      setNewInputOn(false);
      setColumnName("");
    }
  }

  return (
    <MainComponent>
      <ToastContainer />
      <Title>Kanban do projeto</Title>

      <Columns>
        <DragDropContext
          onDragEnd={(result) => {
            if (result.destination === null) return null;

            dispatch(
              MoveCardToColumn({
                SourceIndex: result.source.droppableId,
                DestinationIndex: result.destination.droppableId,
                CardId: result.draggableId,
                ColumnIndex: result.destination.index,
              })
            );
          }}
        >
          {data.map((coluna, index) => (
            <Coluna coluna={coluna} key={coluna.id} index={index} />
          ))}
        </DragDropContext>

        {NewInputOn && (
          <NewColumnInput color={color}>
            <input
              placeholder="Digite o nome da coluna  e pressione enter"
              onChange={(event) => setColumnName(event.target.value)}
              value={ColumnName}
              onKeyDown={EnterToSave}
              autoFocus
            />
            <DIV>
              <ChromePicker
                color={color}
                onChange={(updatedcolor) => setColor(updatedcolor.hex)}
                margin="auto"
              />
            </DIV>
          </NewColumnInput>
        )}
        <AddColumnButton onClick={() => setNewInputOn(true)}>
          <img src={pluspreto} alt="pluspreto" />
          <NewColumnText>Adicionar nova coluna</NewColumnText>
        </AddColumnButton>
      </Columns>
    </MainComponent>
  );
}
