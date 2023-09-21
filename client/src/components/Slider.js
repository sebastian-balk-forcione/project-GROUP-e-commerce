import styled from "styled-components";
import { Link } from "react-router-dom";

const Slider = ({ name, photo, id }) => {
  return (
    <>
      <Wrapper>
        <SmallWrap to={`/productdetails/${id}`}>
          <Image src={photo} alt="product_photo" />
          <Text>{name}</Text>
        </SmallWrap>
      </Wrapper>
    </>
  );
};
export default Slider;

const Wrapper = styled.div`
  display: flex;
  padding: 0 20px;
`;

const SmallWrap = styled(Link)`
  border: 1px solid pink;
`;

const Text = styled.div`
  font-weight: 500;
  color: black;
  text-align: center;
  padding: 15px 7px 0;
`;

const Image = styled.img`
  padding: 23px;
`;
