import React from "react";
import {
  TarefasComponent,
  CardN,
  TagsContainer,
  FakeTagInput,
  TopRow,
  ICONS,
  RenameInput,
} from "./styles";
import { useState } from "react";
import { NewTag, DeleteCard, EditCardName } from "../../Store/kanban/index";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Draggable } from "react-beautiful-dnd";
import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";
import Tags from "../Tags";

export default function Tarefas(props) {
  const color = props.color;
  const card = props.card;
  const cardindex = props.cardindex;
  const columnindex = props.columnindex;
  const dispatch = useDispatch();
  const [ShowInput, setShowInput] = useState(false);
  const [TagName, setTagName] = useState("");
  const [NewCardName, setNewCardName] = useState("");
  const [CardInputOn, setCardInputOn] = useState(false);

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
