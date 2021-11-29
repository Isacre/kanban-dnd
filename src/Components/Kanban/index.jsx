import React from "react";
import {
  MainComponent,
  Title,
  Columns,
  AddColumnButton,
  NewColumnInput,
  NewColumnText,
  DIV,
} from "./styles";

import Coluna from "../Coluna";
import pluspreto from "../../assets/preto.svg";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { MoveCardToColumn, NewColumn } from "../../Store/kanban";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext } from "react-beautiful-dnd";
import { ChromePicker } from "react-color";

export default function Kanban() {
  const data = useSelector((state) => state.kanban.column);
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
              />
            </DIV>
          </NewColumnInput>
        )}
        <AddColumnButton onClick={() => setNewInputOn(true)}>
          <img src={pluspreto} alt="pluspreto" />
          <NewColumnText>Adicionar outra lista</NewColumnText>
        </AddColumnButton>
      </Columns>
    </MainComponent>
  );
}
