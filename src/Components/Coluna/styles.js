import styled from "styled-components";

export const RenameInput = styled.input`
  font-family: AvenirBold;
  color: white;
  font-size: 18px;
  line-height: 25px;
  background-color: transparent;
  border: none;
  outline: none;
  ::placeholder {
    color: rgba(255, 255, 255, 50%);
  }
`;

export const ColunaContainer = styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  min-width: 315px;
  margin-top: 40px;
  border-radius: 5px;
  border-top: 5px solid rgba(0, 0, 0, 10%);
`;
export const ColunaContent = styled.div`
  margin: 15px;
  width: 100%fit-content;
`;
export const TopRow = styled.div`
  margin-left: 10px;
`;
export const TextIcon = styled.div`
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
`;
export const Icon = styled.p`
  margin-bottom: 2px;
  font-size: 21px;
  line-height: 25px;
  cursor: pointer;
`;

export const NewCardButton = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: 5px;

  button {
    cursor: pointer;
    background: transparent;
    outline: none;
    border: none;
    color: rgba(255, 255, 255, 80%);
    font-size: 16px;
    margin-left: 5px;
    margin-bottom: 8px;
  }
  img {
    cursor: pointer;

    margin-left: 12px;
    margin-bottom: 10px;
  }
`;
export const FakeCardContainer = styled.div`
  line-height: 50px;
  border: none;
  background: white;
  width: 100%;
  border-radius: 5px;
  outline: none;
  text-align: center;
`;
export const FakeCard = styled.input`
  line-height: 40px;
  margin: auto;
  border: none;
  width: 90%;

  outline: none;
  ::placeholder {
    text-align: center;
  }
`;

export const ColorPicker = styled.div`
  position: absolute;
  margin-top: 50px;
  margin-left: 50px;
`;
export const EMOJIDIV = styled.div`
  position: absolute;
  margin-top: 50px;
  margin-left: 15px;
`;

export const DeleteColumnButton = styled.h2`
  float: right;
  color: rgba(255, 255, 255, 50%);
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    color: rgba(255, 0, 0, 100%);
  }
`;
export const EditColumnButton = styled.h2`
  float: right;
  color: ${(props) =>
    props.renameInput
      ? "rgba(255, 255, 255, 100%);"
      : "rgba(255, 255, 255, 50%);"};
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  :hover {
    color: ${(props) =>
      props.renameInput
        ? "rgba(255, 255, 255, 100%);"
        : "rgba(255, 255, 255, 80%);"};
  }
`;
export const RecolorColumnButton = styled.h2`
  float: right;
  color: ${(props) =>
    props.colorpalleton
      ? "rgba(255, 255, 255, 100%);"
      : "rgba(255, 255, 255, 50%);"};
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    color: ${(props) =>
      props.colorpalleton
        ? "rgba(255, 255, 255, 100%);"
        : "rgba(255, 255, 255, 80%);"};
  }
`;
export const TasksContainer = styled.div``;
