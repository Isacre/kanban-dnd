import {
  ColunaContainer,
  ColunaContent,
  TopRow,
  TasksContainer,
  TextIcon,
  Text,
  Icon,
  NewCardButton,
  FakeCardContainer,
  FakeCard,
} from "./styles";

import React from "react";
import Tarefas from "../Tarefas";
import plusbranco from "../../assets/branco.svg";
import dotsMenu from "../../assets/dots-vertical.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NewCard, DeleteColumn } from "../../Store/kanban/index";
import { toast } from "react-toastify";
import { Droppable } from "react-beautiful-dnd";

export default function Coluna(props) {
  const dispatch = useDispatch();
  const [cardinput, setCardinput] = useState(false);
  const [Card, setCard] = useState("");
  const coluna = props.coluna;
  const index = props.index;

  function SubmitNewCard() {
    if (Card !== "") {
      const dados = {
        card: {
          name: Card,
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: `Tag ${index + 1}`,
              id: `tag - ${Math.floor(Math.random() * 10291)}`,
            },
          ],
        },
        index,
      };

      setCard("");
      setCardinput(false);
      dispatch(NewCard(dados));
    } else toast.error("Por favor, insíra um titulo no card");
  }

  function EnterToSave(e) {
    if (e.key === "Enter") SubmitNewCard();

    if (e.key === "Escape") {
      e.target.value = "";
      setCardinput(false);
    }
  }

  function Deletecolumn() {
    dispatch(DeleteColumn(index));
  }

  return (
    <ColunaContainer color={coluna.color}>
      <ColunaContent>
        <TopRow onClick={Deletecolumn}>
          <button>
            <img src={dotsMenu} alt="dotsmenu" />
          </button>
        </TopRow>
        <TextIcon>
          <Icon>{coluna.icon}</Icon>
          <Text> {coluna.name}</Text>
        </TextIcon>
        <Droppable droppableId={coluna.id.toString()}>
          {(provided) => (
            <TasksContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {coluna.cards.map((card, cardindex) => (
                <Tarefas
                  card={card}
                  key={cardindex}
                  color={coluna.color}
                  cardindex={cardindex}
                  columnindex={index}
                />
              ))}
              {provided.placeholder}
            </TasksContainer>
          )}
        </Droppable>
        {cardinput && (
          <FakeCardContainer>
            <FakeCard
              placeholder="Digite o titulo do card e pressione Enter "
              onChange={(event) => setCard(event.target.value)}
              value={Card}
              onKeyDown={EnterToSave}
              autoFocus
              onBlur={() => {
                if (Card !== "") SubmitNewCard();
                if (Card === "") setCardinput(false);
              }}
            ></FakeCard>
          </FakeCardContainer>
        )}
      </ColunaContent>

      <NewCardButton onClick={() => setCardinput(true)}>
        <img src={plusbranco} alt="plus branco" />
        <button>Adicionar outro cartão</button>
      </NewCardButton>
    </ColunaContainer>
  );
}
