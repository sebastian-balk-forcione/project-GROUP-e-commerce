import styled from "styled-components";
import { IoBodyOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <IoBodyOutline style={{ color: "pink" }} />
        <Text>ABOUT US</Text>
        <Text>BLOG</Text>
        <Text>SPECIAL OFFERS</Text>
        <Text>CONTACT US</Text>
        <IoBodyOutline style={{ color: "pink" }} />
      </Wrapper>
    </>
  );
};

export default Footer;

const Wrapper = styled.div`
  background-color: black;
  height: 10vh;
  display: flex;
  justify-content: space-evenly;
  font-size: 1.7em;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Text = styled.div`
  color: white;
`;
