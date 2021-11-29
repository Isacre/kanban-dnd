import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Tags from "../Tags";
import { NewTag, DeleteCard } from "../../Store/kanban/index";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Draggable } from "react-beautiful-dnd";

const TarefasComponent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  min-height: 50px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
  cursor: grab;

  button {
    float: right;
  }
`;
const CardN = styled.div`
  margin-top: 10px;
  font-size: 16px;
  line-height: 21px;
  word-break: break-all;
`;

const TagsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 5px;
`;

const FakeTagInput = styled.input`
  background-color: transparent;
  border: none;
  border-radius: 5px;
  outline: none;
  padding-left: 5px;
  padding-right: 5px;
  width: 95%;
`;
const TopRow = styled.div`
  height: 0px;
  button {
    float: right;
    color: red;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default function Tarefas(props) {
  const dispatch = useDispatch();
  const color = props.color;
  const card = props.card;
  const [ShowInput, setShowInput] = useState(false);
  const [TagName, setTagName] = useState("");
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

  return (
    <Draggable draggableId={card.id} key={card.id} index={cardindex}>
      {(provided) => (
        <TarefasComponent
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <TopRow>
            <button onClick={DeleteItem}>X</button>
          </TopRow>
          <CardN>{card.name}</CardN>
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
              />
            ))}

            <FakeTagInput
              placeholder="Nova Tag..."
              color={color}
              autoFocus
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
