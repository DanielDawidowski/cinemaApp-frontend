import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 0.8rem;
  li {
    font-size: 1.2em;
    padding: 1rem 1.6rem;
  }

  @media (max-width: 1300px) {
    border-top: 1px solid ${(props) => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
