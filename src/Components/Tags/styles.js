import styled from "styled-components";

export const TagContainer = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 700;
  :hover {
    transition: 0.5s;
    background: red;
  }
`;
