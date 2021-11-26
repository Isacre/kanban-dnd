import React from "react";
import styled from "styled-components";

const TagsComponent = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  gap: 10px;
`;

const TagContainer = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  max-width: fit-content;
  cursor: grab;
`;

const NewTag = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 5px;
  :hover {
    filter: brightness(110%);
  }
`;
export default function Tags(props) {
  const tag = props.tag;
  const color = props.color;
  return (
    <TagsComponent>
      <TagContainer color={color}>{tag.name}</TagContainer>
      <NewTag color={color}>+</NewTag>
    </TagsComponent>
  );
}
