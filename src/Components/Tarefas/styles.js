import styled from "styled-components";

export const TarefasComponent = styled.div`
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
export const CardN = styled.div`
  color: #212529;
  margin-top: 10px;
  font-size: 16px;
  line-height: 21px;
  word-break: break-all;
`;

export const TagsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 5px;
  min-width: 285px;
`;

export const FakeTagInput = styled.input`
  background-color: transparent;
  border: none;
  border-radius: 5px;
  outline: none;
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;
`;
export const TopRow = styled.div`
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

export const ICONS = styled.div`
  float: right;
  cursor: pointer;
  color: ${(props) => props.color};
  display: flex;
  gap: 5px;

  div {
    :hover {
      filter: brightness(150%);
    }
  }
`;

export const RenameInput = styled.input`
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
