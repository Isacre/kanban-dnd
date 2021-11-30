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
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import React from "react";
import Tarefas from "../Tarefas";
import plusbranco from "../../assets/branco.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  NewCard,
  DeleteColumn,
  EditColumnName,
} from "../../Store/kanban/index";
import { toast } from "react-toastify";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const RenameInput = styled.input`
  font-family: AvenirBold;
  color: white;
  font-size: 18px;
  line-height: 25px;
  background-color: transparent;
  border: none;
  outline: none;
  ::placeholder {
    color: #fff;
  }
`;
/* export const TextIcon = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Text = styled.h1`
  font-family: AvenirBold;
  color: white;
  font-size: 18px;
  line-height: 25px;
`; */

export default function Coluna(props) {
  const dispatch = useDispatch();
  const [cardinput, setCardinput] = useState(false);
  const [Card, setCard] = useState("");
  const [RenameCard, setRenameCard] = useState("");
  const [renameInput, setrenameInput] = useState(false);
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
  function ChangeColumnName() {
    if (RenameCard !== "") {
      const NovoTitulo = {
        NewCard: RenameCard,
        ColumnIndex: index,
      };

      dispatch(EditColumnName(NovoTitulo));
      setrenameInput(false);
      toast.success("Coluna renomeada com sucesso");
    } else
      toast.error(
        "Por favor insira um nome para a coluna ou aperte ESC para cancelar"
      );
  }

  function EnterToRename(e) {
    if (e.key === "Enter") {
      ChangeColumnName();
      setRenameCard("");
    }

    if (e.key === "Escape") {
      e.target.value = "";
      setrenameInput(false);
      setRenameCard("");
    }
  }

  return (
    <ColunaContainer color={coluna.color}>
      <ColunaContent>
        <TopRow>
          <h2>
            <MdOutlineDeleteOutline onClick={Deletecolumn} />
          </h2>

          <h2>
            <MdEdit onClick={() => setrenameInput(!renameInput)} />
          </h2>
        </TopRow>

        <TextIcon>
          <Icon>{coluna.icon}</Icon>
          {renameInput ? (
            <RenameInput
              autoFocus
              type="text"
              value={RenameCard}
              onChange={(event) => setRenameCard(event.target.value)}
              onKeyDown={EnterToRename}
              placeholder={coluna.name}
            />
          ) : (
            <>
              <Text> {coluna.name}</Text>
            </>
          )}
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
