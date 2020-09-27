import styled from "styled-components";

export const DropDownContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  /* height: 10px;
  border: 4px solid ${(props) => props.theme.gold}; */
  &:focus {
    outline: none;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

export const DropDownHeader = styled.div`
  background: transparent;
  color: ${(props) => props.theme.gold};
  padding: 0 1rem;
  width: 180px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  span svg {
    width: 26px;
    height: 30px;
    margin-bottom: -0.5rem;
  }
  &:focus {
    outline: none;
  }
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 9999;
  /* margin: 0 0.2rem; */
  &:focus {
    outline: none;
  }
`;

export const DropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  background: ${(props) => props.theme.gold_transparent};
  &:focus {
    outline: none;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  width: 196px;
  color: ${(props) => props.theme.white};

  /* padding: 0 0.2rem;
  margin: 0 0.2rem; */
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
