import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Tags from "../Tags";
import { NewTag } from "../../Store/kanban/index";
import { useDispatch } from "react-redux";

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
  margin-top: 15px;
  font-size: 16px;
  line-height: 21px;
`;

const TagsContainer = styled.div`
  margin-top: 20px;
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
          id: Math.random(),
        },
        columnindex,
        cardindex,
      };

      dispatch(NewTag(NewTagdata));
      setTagName("");
    } else window.alert("Por favor, insíra um titulo");
  }

  function Entertotag(e) {
    if (e.key === "Enter") SubmitNewTag();
    if (e.key === "Escape") setShowInput(false);
  }

  return (
    <TarefasComponent>
      <CardN>{card.name}</CardN>
      <TagsContainer>
        {card.tags.map((tag) => (
          <Tags
            tag={tag}
            color={color}
            ShowInput={ShowInput}
            setShowInput={setShowInput}
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
  );
}
