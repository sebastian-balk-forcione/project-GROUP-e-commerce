import React from 'react';

import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const OrderConfirmationPage = () => {
    const { name, total } =useParams()

  return (
    <Box>
        
    <Container>
      <Title>Order Confirmation</Title>
      <ConfirmationMessage>
        Thank you for your purchase, <Span>{name}</Span>!
        <p>Your total was <Span>${total}</Span></p> 
      </ConfirmationMessage>
      <ConfirmationDetails>
        
      </ConfirmationDetails>
      <Message>Your order is on its way.</Message>
    </Container>
    </Box>
  );
};

const Message = styled.p`
font-size: 2em;
text-align: center;`

const Box = styled.div`
  margin-top: 10%;
`;

const Container = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 50px auto;
  text-align: center;
`;

const Span = styled.span`
font-weight: bolder;`



const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;

`

const ConfirmationMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;`

const ConfirmationDetails = styled.div`
  font-size: 1.2rem;
  text-align: center;`

const Picture = styled.img`
`

export default OrderConfirmationPage;



