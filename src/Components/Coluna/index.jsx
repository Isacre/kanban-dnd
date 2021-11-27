import React from "react";
import styled from "styled-components";
import Tarefas from "../Tarefas";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NewCard } from "../../Store/kanban/index";
import plusbranco from "../../assets/branco.svg";

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
  }
`;
const TasksContainer = styled.div``;
const TextIcon = styled.h1`
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
const Icon = styled.h1`
  margin-bottom: 2px;
  font-size: 18px;
  line-height: 25px;
  color: none;
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
          id: Math.random(),
          tags: [
            {
              name: `Tag ${index + 1}`,
              id: Math.random(),
            },
          ],
        },
        index,
      };
      console.log(dados);
      setCard("");
      setCardinput(false);
      dispatch(NewCard(dados));
    } else window.alert("Por favor, insíra um titulo");
  }

  function EnterToSave(e) {
    if (e.key === "Enter") SubmitNewCard();

    if (e.key === "Escape") {
      e.target.value = "";
      setCardinput(false);
    }
  }

  return (
    <ColunaContainer color={coluna.color}>
      <ColunaContent>
        <TopRow></TopRow>

        <TextIcon>
          <Icon>{coluna.icon}</Icon>
          <Text> {coluna.name}</Text>
        </TextIcon>

        <TasksContainer>
          {coluna.cards.map((card, cardindex) => (
            <Tarefas
              card={card}
              key={card.id}
              color={coluna.color}
              cardindex={cardindex}
              columnindex={index}
            />
          ))}
        </TasksContainer>
        {cardinput && (
          <FakeCardContainer>
            <FakeCard
              placeholder="Digite o titulo do card e pressione Enter "
              onChange={(event) => setCard(event.target.value)}
              value={Card}
              onKeyDown={EnterToSave}
              autoFocus
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
