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
import { NewTag, DeleteCard } from "../../Store/kanban/index";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Draggable } from "react-beautiful-dnd";

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
                key={Draggable}
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
