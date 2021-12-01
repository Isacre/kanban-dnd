import React from "react";
import {
  TarefasComponent,
  CardN,
  TagsContainer,
  FakeTagInput,
  TopRow,
} from "./styles";

import { useState } from "react";
import Tags from "../Tags";
import { NewTag, DeleteCard, EditCardName } from "../../Store/kanban/index";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Draggable } from "react-beautiful-dnd";
import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";
import styled from "styled-components";

const ICONS = styled.div`
  float: right;
  cursor: pointer;
  color: ${(props) => props.color};
  display: flex;

  div {
    :hover {
      filter: brightness(150%);
    }
  }
`;

const RenameInput = styled.input`
  margin-top: 10px;
  font-size: 16px;
  line-height: 21px;
  word-break: break-all;
  border: none;
  background-color: transparent;
  outline: none;
  ::placeholder {
    color: rgb(33, 37, 41, 50%);
  }
`;

export default function Tarefas(props) {
  const dispatch = useDispatch();
  const color = props.color;
  const card = props.card;
  const [ShowInput, setShowInput] = useState(false);
  const [TagName, setTagName] = useState("");
  const [NewCardName, setNewCardName] = useState("");
  const [CardInputOn, setCardInputOn] = useState(false);
  const cardindex = props.cardindex;
  const columnindex = props.columnindex;

  function SubmitNewTag() {
    if (TagName !== "") {
      const NewTagdata = {
        tag: {
          name: TagName,
          id: `tag - ${Math.floor(Math.random() * 10991)}`,
        },
        columnindex,
        cardindex,
      };

      dispatch(NewTag(NewTagdata));
      setTagName("");
    } else toast.error("Por favor, insíra um titulo na tag");
  }

  function Entertotag(e) {
    if (e.key === "Enter") SubmitNewTag();
    if (e.key === "Escape") setShowInput(false);
  }

  function DeleteItem() {
    const indexes = {
      columnindex,
      cardindex,
    };
    dispatch(DeleteCard(indexes));
    console.log(card);
  }

  function ChangeCardName() {
    if (NewCardName !== "") {
      const NovoTitulo = {
        NewCard: NewCardName,
        ColumnIndex: columnindex,
        CardIndex: cardindex,
      };
      dispatch(EditCardName(NovoTitulo));
      setCardInputOn(false);
      toast.success("Cartão alterado com sucesso");
    } else
      toast.error("Por favor insira um titulo ou pressione ESC para cancelar");
  }

  function EnterToRename(e) {
    if (e.key === "Enter") {
      ChangeCardName();
      setNewCardName("");
    }

    if (e.key === "Escape") {
      setCardInputOn(false);
      setNewCardName("");
    }
  }

  return (
    <Draggable draggableId={card.id} key={card.id} index={cardindex}>
      {(provided) => (
        <TarefasComponent
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          onBlur={() => setCardInputOn(false)}
        >
          <TopRow>
            <ICONS color={color}>
              <h3>
                <MdModeEdit onClick={() => setCardInputOn(!CardInputOn)} />
              </h3>
              <h3>
                <MdOutlineDeleteForever onClick={DeleteItem} />
              </h3>
            </ICONS>
          </TopRow>
          {CardInputOn ? (
            <RenameInput
              autoFocus
              type="text"
              value={NewCardName}
              onChange={(event) => setNewCardName(event.target.value)}
              onKeyDown={EnterToRename}
              placeholder={card.name}
            />
          ) : (
            <CardN>{card.name}</CardN>
          )}
          <TagsContainer>
            {card.tags.map((tag, tagindex) => (
              <Tags
                tag={tag}
                color={color}
                ShowInput={ShowInput}
                setShowInput={setShowInput}
                tagindex={tagindex}
                columnindex={columnindex}
                cardindex={cardindex}
                key={tag.id}
              />
            ))}

            <FakeTagInput
              placeholder="Nova Tag..."
              color={color}
              onKeyDown={Entertotag}
              onChange={(e) => setTagName(e.target.value)}
              value={TagName}
            />
          </TagsContainer>
        </TarefasComponent>
      )}
    </Draggable>
  );
}
