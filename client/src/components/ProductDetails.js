import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { CartContext } from "./CartContext";

const ProductDetails = () => {
  const { cartCount, setCartCount } = useContext(CartContext);

  const [item, setItem] = useState([]);
  const [error, setError] = useState(false);
  const { productid } = useParams();

  const navigate = useNavigate();

  const handleButton = (item) => {
    const newItem = { ...item, quantity: 1 };
    fetch(`/api/cart`, {
      //POST the selected item to the cart
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCartCount(cartCount + 1);
          navigate("/cart");
        } else if (data.status === 400) {
          setError(true);
        }
      });
  };

  useEffect(() => {
    fetch(`/api/item/${productid}`) // GET the selected item from the ProductsPage
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data); //
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [productid]);

  return (
    <>
      {item ? (
        <Wrapper>
          <AllDiv>
            <ImgDiv>
              <Img src={item.imageSrc} />
            </ImgDiv>
            <InfoDiv>
              <P>{item.name}</P>
              <P>{item.body_location}</P>
              <P>{item.category}</P>
              <P>${item.price}</P>
              <Error visible={error}>This product is already in the cart</Error>
              <P>
                {item.numInStock > 0
                  ? `${item.numInStock} Available in Stock!`
                  : "Out of Stock :("}
              </P>
              <Button
                onClick={() => handleButton(item)}
                color={item.numInStock ? "black" : "#757b85"}
                disabled={item.numInStock === 0 ? true : false}
              >
                {item.numInStock < 1 ? "Out of Stock :(" : "Add to Cart!"}
              </Button>
            </InfoDiv>
          </AllDiv>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

const Error = styled.div`
  display: ${(props) => (props.visible === true ? "visible" : "none")};
  height: 30px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 2px;
  font-weight: bold;
  background-color: red;
  color: yellow;
  text-align: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  /* border: 5px solid lightpink; */
  gap: 35px;
`;

const InfoDiv = styled.div``;

const ImgDiv = styled.div``;

const Button = styled.button`
  background-color: ${(props) => props.color};
  :disabled {
    cursor: pointer !important;
  }
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

  border-radius: 4px;
  font-size: 20px;
`;

const P = styled.p`
  padding-top: 10px;
  padding-bottom: 5px;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
`;

const AllDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;
  border: 2px solid lightpink;
  padding-top: 80px;
  padding-bottom: 80px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 1px;
`;

const NameP = styled.h2``;

export default ProductDetails;
