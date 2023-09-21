import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const ViewCart = () => {  
  const {cartCount,setCartCount}=useContext(CartContext)


  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ispageupdated, setIspageUpdated] = useState();

  // Fetch orders
  useEffect(() => {
    fetch("api/cart")
      .then((response) => response.json())
      .then((data) => {

       
        setItems(data.data);

        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [ispageupdated]);

  // select quantity.
  const handleQuantityChange = (id, e) => {
    const itemFound = items.find((i) => {
      return i._id === id;
    });


    const newValues = {
      body_location: itemFound.body_location,
      category: itemFound.category,
      imageSrc: itemFound.imageSrc,
      name: itemFound.name,
      numInStock: itemFound.numInStock,
      price: parseFloat(itemFound.price).toFixed(2),
      quantity: parseInt(e.target.value),
      _id: itemFound._id,
    };

    updatedCart(newValues);
  };

  const updatedCart = (itemUpdated) => {
    fetch("/api/cart", {
      headers: {
        Accept: "aplication/json",
        "content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(itemUpdated),
    })
      .then((res) => res.json())
      .then((data) => {
        setIspageUpdated(Date.now());
      });
  };

  // Remove item from cart
  const handleDelete = (id) => {
    fetch(`/api/cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setCartCount(cartCount -1)
        setIspageUpdated(Date.now());
      });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.quantity * parseFloat(item.price);
    });
    return parseFloat(totalPrice).toFixed(2);
  };

  return (
    <Container>
      <Wrapper>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            {items.length === 0 ? (
              <Empty>Your cart is empty.</Empty>
            ) : (
              <>
                <OrderSection>
                  <Title>Cart</Title>

                  {items.map((item) => (
                    <Item key={item.id}>
                      <ItemPicture src={item.imageSrc} />
                      <ItemInfo>
                        <ItemName>{item.name}</ItemName>
                        <ItemId>{item._id}</ItemId>

                        <ItemTotal>
                          ${(item.quantity * parseFloat(item.price)).toFixed(2)}{" "}
                          CAD
                        </ItemTotal>
                        <ItemQuantity>
                          <QuantityInput
                            type="number"
                            min="1"
                            max={item.numInStock}
                            name={item.id}
                            value={(item.quantity && item.quantity) || 1}
                            onChange={(e) => handleQuantityChange(item._id, e)}
                          />
                          <DeleteButton onClick={() => handleDelete(item._id)}>
                            Remove
                          </DeleteButton>
                        </ItemQuantity>
                      </ItemInfo>
                    </Item>
                  ))}
                </OrderSection>

                <ConfirmationSection>
                  <Total>
                    <TotalRow>
                      <TotalLabel>Subtotal:</TotalLabel>
                      <TotalValue>
                        ${parseFloat(calculateTotalPrice()).toFixed(2)}
                      </TotalValue>
                    </TotalRow>
                    <TotalRow>
                      <TotalLabel>Estimated Total:</TotalLabel>
                      <TotalValue>
                        ${parseFloat(calculateTotalPrice()).toFixed(2)}
                      </TotalValue>
                    </TotalRow>
                  </Total>

                  <Buttons>
                    <CheckoutButton
                      onClick={() => {
                        navigate(`/checkout/${calculateTotalPrice()}`);
                      }}
                      disabled={items.length === 0}
                    >
                      Checkout
                    </CheckoutButton>
                    <Link to="/">
                      <ContinueButton>Continue Shopping</ContinueButton>
                    </Link>
                  </Buttons>
                </ConfirmationSection>
              </>
            )}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  align-items: start;

  justify-content: space-between;
  margin-left: 1%;
  /* margin-right: 10%; */

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const OrderSection = styled.div`
  flex-grow: 1;
  margin-left: 10%;
  margin-right: 2%;
  width: 60%;
  margin-top:50px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const ConfirmationSection = styled.div`
  flex-grow: 1;
  width: 20%;
  border: 1px solid black;
  padding: 2%;
  background-color: #f2f2f2;
  margin-right: 10%;
  margin-top:50px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 2%;
  }
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 2%;
  text-align: center;
  background-color: black;
  color: white;
`;

const Loading = styled.p`
  font-size: 1.5em;
`;

const Empty = styled.p`
  font-size: 1.5em;
`;

const ItemPicture = styled.img`
  height: 200px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 1% 0;
  gap: 25px;
  border-bottom: 1px solid gray;
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

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2%;
`;

const CheckoutButton = styled.button`
width:90%;
  background-color: black;
  color:white;
  font-weight:bolder;
  border: 1px solid black;
  padding: 0.5em 1em;
  font-size: 1em;
  margin-right: 1em;
  margin-bottom: 1em;
`;

const ContinueButton = styled.button`
width:90%;
  background-color: white;
  border: 1px solid black;
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
`;

export default ViewCart;
