import React from "react";
import styled from "styled-components";
import Tarefas from "../Tarefas";
import plusbranco from "../../assets/branco.svg";
import dotsMenu from "../../assets/dots-vertical.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NewCard, DeleteColumn } from "../../Store/kanban/index";
import { toast } from "react-toastify";
import { Droppable } from "react-beautiful-dnd";

const ColunaContainer = styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  min-width: 315px;
  margin-top: 40px;
  border-radius: 5px;
  border-top: 5px solid rgba(0, 0, 0, 10%);
`;
const ColunaContent = styled.div`
  margin: 15px;
  width: 100%fit-content;
`;
const TopRow = styled.div`
  button {
    float: right;
    color: red;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  img {
    width: 20px;

    :hover {
      background: rgba(255, 255, 255, 30%);
      border-radius: 25px;
    }
  }
`;
const TasksContainer = styled.div``;
const TextIcon = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Text = styled.h1`
  color: white;
  font-size: 18px;
  line-height: 25px;
`;
const Icon = styled.p`
  margin-bottom: 2px;
  font-size: 21px;
  line-height: 25px;
  cursor: pointer;
`;

const NewCardButton = styled.div`
  display: flex;
  cursor: pointer;

  button {
    cursor: pointer;
    background: transparent;
    outline: none;
    border: none;
    color: rgba(255, 255, 255, 80%);
    font-size: 16px;
    margin-left: 5px;
    margin-bottom: 8px;
  }
  img {
    cursor: pointer;

    margin-left: 12px;
    margin-bottom: 10px;
  }
`;
const FakeCardContainer = styled.div`
  line-height: 50px;
  border: none;
  background: white;
  width: 100%;
  border-radius: 5px;
  outline: none;
  text-align: center;
`;
const FakeCard = styled.input`
  line-height: 40px;
  margin: auto;
  border: none;
  width: 90%;

  outline: none;
  ::placeholder {
    text-align: center;
  }
`;

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
        <button>Adicionar novo cartão</button>
      </NewCardButton>
    </ColunaContainer>
  );
}
