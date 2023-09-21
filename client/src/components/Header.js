import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { IoBody } from "react-icons/io5";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Header = ({ cats }) => {
  const { cartCount } = useContext(CartContext);

  return (
    <>
      <Wrapper>
        <Title to="/">
          <IoBody />
          BParts
        </Title>
        <Linkwrapper>
          <Links to={`/category/${cats[0]}`}>FITNESS</Links>
          <Links to={`/category/${cats[2]}`}>LIFESTYLE</Links>
          <Links to={`/category/${cats[4]}`}>MEDICAL</Links>
          <Links to={`/category/${cats[1]}`}>ENTERTAINMENT</Links>
          <Links to={`/category/${cats[3]}`}>INDUSTRIAL</Links>
          <Links to={`/category/${cats[6]}`}>PETS AND ANIMALS</Links>
          <Links to={`/category/${cats[5]}`}>GAMING</Links>
        </Linkwrapper>
        <Cart to="/cart">
          <BsCart />
          <CartNum>{cartCount}</CartNum>
        </Cart>
      </Wrapper>
      <Div>LIMITED TIME ONLY! FREE SHIPPING ON ALL ORDERS !!</Div>
    </>
  );
};

export default Header;

const CartNum = styled.div`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  position: absolute;
  top: -10px;
  right: -10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  font-size: 1.2em;
`;

const Linkwrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-right: px;
`;
const Div = styled.div`
  background-color: black;
  color: pink;
  text-align: center;
  height: 5vh;
  padding-top: 5px;
  letter-spacing: 2px;
`;

const Title = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3em;
  letter-spacing: 0.3rem;
`;

const Links = styled(Link)`
  padding: 0 30px;
  color: inherit;
  text-decoration: none;
`;

const Cart = styled(Link)`
  font-size: 1.5em;
  color: black;
  position: relative;
`;
