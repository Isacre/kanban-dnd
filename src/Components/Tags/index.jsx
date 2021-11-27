import React from "react";
import styled from "styled-components";

const TagsComponent = styled.div``;

const TagContainer = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  cursor: grab;
`;

export default function Tags(props) {
  const tag = props.tag;
  const color = props.color;

  return (
    <TagsComponent>
      <TagContainer color={color}>{tag?.name}</TagContainer>
    </TagsComponent>
  );
}
