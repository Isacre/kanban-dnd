import React from "react";
import styled from "styled-components";

const TagsComponent = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  gap: 10px;
`;

const TagContainer = styled.div`
  background-color: #fff;
  padding: 3px;
  border-radius: 5px;
  max-width: fit-content;
`;
export default function Tags(props) {
  const tag = props.tag;
  return (
    <TagsComponent>
      <TagContainer>
        {tag.name}
        <button>x</button>
      </TagContainer>
      <button>+</button>
    </TagsComponent>
  );
}
