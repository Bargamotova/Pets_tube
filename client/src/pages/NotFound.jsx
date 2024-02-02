import React from "react";
import styled from "styled-components";
import BargoTube from "../img/CatTube-8.svg";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  max-width: 500px;
  margin-bottom: 20px;
`;
const Text = styled.p`
  color: ${(theme) => theme.text};
  font-size: 2rem;
  line-height: 1;
`;
const NotFound = () => {
  return (
    <Container>
      <Image src={BargoTube} />
      <Text>Unfortunately this page does not exists</Text>
    </Container>
  );
};

export default NotFound;
