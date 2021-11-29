import styled from "styled-components";

export const MainComponent = styled.div`
  width: fit-content;
`;
export const Title = styled.h1`
  font-family: AvenirBold;
  font-size: 32px;
  color: #212529;
`;

export const Columns = styled.div`
  display: flex;
  gap: 20px;
`;

export const AddColumnButton = styled.button`
  width: 315px;
  border-radius: 5px;
  border: none;
  outline: none;
  height: 54px;
  margin-right: 50px;

  background-color: #cad1d5;
  color: #43474b;
  margin-top: 40px;
  cursor: pointer;
  display: flex;

  img {
    margin-right: 0px;
    padding: 15px;
  }
`;

export const NewColumnInput = styled.div`
  background-color: ${(props) => props.color};
  width: 315px;
  height: 100%;
  border-radius: 5px;
  margin-top: 40px;
  border-top: 5px solid rgba(0, 0, 0, 10%);
  padding: 12px;

  input {
    line-height: 50px;
    width: 100%;
    background: transparent;
    outline: none;
    color: white;
    border: none;

    ::placeholder {
      color: #fff;
      text-align: center;
    }
  }
`;

export const NewColumnText = styled.div`
  margin: auto;
  margin-left: 5px;
  margin-top: 19px;
  font-size: 16px;
`;

export const DIV = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;