import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ViewCart from './ViewCart';
import {  useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { CartContext } from './CartContext';


const CheckoutPage = ({ items, totalPrice }) => {
const {cartCount,setCartCount}=useContext(CartContext)
    const {total} = useParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid Email';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errors.state = 'State is required';
    }

    if (!formData.zip.trim()) {
      errors.zip = 'ZIP code is required';
    }

    if (!formData.cardName.trim()) {
      errors.cardName = 'Name on card is required';
    }

    if (!formData.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      errors.cardNumber = 'Card number is invalid (must be 16 digits).';
    }

    if (!formData.expDate.trim()) {
      errors.expDate = 'Expiration date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expDate)) {
      errors.expDate = 'Expiration date is invalid (MM/YY)';
    }

    if (!formData.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      errors.cvv = 'CVV is invalid (must be 3 digits)';
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(); // validate the form data
    setErrors(errors); // update the errors state
    setIsSubmitting(true);
  
    if (Object.keys(errors).length === 0) {
      handlePayment(); // make the payment if there are no errors
      setCartCount(0);
      navigate(`/order-confirmation/${formData.name}/${(total * 1.14).toFixed(2)}`);
    }
  
    setIsSubmitting(false);
  };

  const handlePayment = () => {
    const orderData = {
      items: items,
      totalPrice: totalPrice,
      user: formData,
    };
    // Simulated successful payment
    setPaymentSuccessful(true);
  };

  return (
    <Container>
      <Title>Checkout</Title>

        <Box>
    <Wrapper>         
      {paymentSuccessful ? (
          <SuccessMessage>Your payment was successful!</SuccessMessage>
          ) : (
              <Form onSubmit={handleSubmit}>
          <PersonalInfo>
            <SectionTitle>Personal Information</SectionTitle>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                id="city"
                
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="state">State</Label>
              <Input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
              {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
              {errors.zip && <ErrorMessage>{errors.zip}</ErrorMessage>}
            </FormGroup>
          </PersonalInfo>

          <PaymentInfo>
            <SectionTitle>Payment Information</SectionTitle>

            <FormGroup>
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
              />
              {errors.cardName && <ErrorMessage>{errors.cardName}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
              {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="expDate">Expiration Date</Label>
              <Input
                type="text"
                id="expDate"
                name="expDate"
                value={formData.expDate}
                onChange={handleInputChange}
              />
              {errors.expDate && <ErrorMessage>{errors.expDate}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
              />
              {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
            </FormGroup>
          </PaymentInfo>

          <Buttons>
            <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
          </Buttons>
        </Form>
      )}
    </Wrapper>

                <ConfirmationSection>
                  <Total>
                    <TotalRow>
                      <TotalLabel>Subtotal:</TotalLabel>
                      <TotalValue>${total}</TotalValue>
                    </TotalRow>
                    <TotalRow>
                      <TotalLabel>Shipping:</TotalLabel>
                      <TotalValue>Free</TotalValue>
                    </TotalRow>
                    <TotalRow>
                      <TotalLabel>Estimated Tax:</TotalLabel>
                      <TotalValue>${(total * 0.14).toFixed(2)} CAD</TotalValue>
                    </TotalRow>
                    <TotalRow>
                      <TotalLabel>Total:</TotalLabel>
                      <TotalValue>${(total * 1.14).toFixed(2)} CAD</TotalValue>
                    </TotalRow>
                  </Total>
                  
                </ConfirmationSection>
                </Box>
    </Container>
    
  );
};

const Container = styled.div`
display: flex;
flex-direction: column;
margin-right: 10%;

`
const Box = styled.div`
display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 1%;
  margin-bottom: 200px;

  
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
width: 80%;
margin-left: 10%;

`

const Wrapper = styled.div`

width: 70%;
background-color: #f2f2f2;`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
    margin-right: 10%;
`;

const SuccessMessage = styled.p`
  font-size: 1.5rem;
  color: green;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PersonalInfo = styled.div`
  border: none;
  padding: 1rem;
`;

const PaymentInfo = styled.div`
  border: none;
  padding: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid lightgray;
`;

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: red;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0069d9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


const ConfirmationSection = styled.div`
  flex-grow: 1;
  width: 20%;
  border: 1px solid black;
  padding: 2%;
  background-color: #f2f2f2;
  margin-left: 2%;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 2%;
  }
`;



const Loading = styled.p`
  font-size: 1.5em;
`;

const Empty = styled.p`
  font-size: 1.5em;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 1% 0;
`;

const ItemId = styled.div`
  font-size: 1em;
  margin-right: 1%;
  margin-bottom: 1%;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 0.2em;
`;

const ItemPrice = styled.div`
  font-size: 1em;
  
`;

const ItemTotal = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 1%;
`;

const ItemQuantity = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QuantityInput = styled.input`
  width: 15%;
  height: 3em;
  margin-right: 1%;
`;

const DeleteButton = styled.button`
  background-color: none;
  border: 1px solid black;
  margin-left: 2%;
  padding: 0.5% 1%;
  font-size: 1em;
  cursor: pointer;
`;

const Total = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2em;
  width: 100%;
`;

const TotalRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1em 0;
`;

const TotalLabel = styled.td`
  font-size: 1.1em;
  font-weight: bold;
  text-align: left;
`;

const TotalValue = styled.td`
  font-size: 1.1em;
  font-weight: bold;
  text-align: right;
`;

const Subtotal = styled.div`
  font-size: 1.1em;
  font-weight: bold;
`;

const EstimatedTotal = styled.div`
  font-size: 1.1em;
  font-weight: bold;
`;



const CheckoutButton = styled.button`
  background-color: #6dcff6;
  border: 1px solid black;
  padding: 0.5em 1em;
  font-size: 1em;
  margin-right: 1em;
  margin-bottom: 1em;
`;

const ContinueButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
`;
export default CheckoutPage;

