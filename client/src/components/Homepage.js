import { useState, useEffect, useRef } from "react";
import Slider from "./Slider";
import styled from "styled-components";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import Loading from "./Loading";
import Categories from "./Categories";
import Banner from "./Banner";

const Homepage = ({ cats, pics }) => {
  const [popItems, setPopItems] = useState([]);
  const scroll = useRef(null);

  //   Fetching items and putting the ones that have less than 3 stock count in my above state
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        const items = data.data.filter((item) => {
          return item.numInStock < 3;
        });
        setPopItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const slide = (shift) => {
    scroll.current.scrollLeft += shift;
  };

  return (
    <>
      <Wrapper>
        <div>
          <Banner />
        </div>

        <PopularBanner>POPULAR ITEMS</PopularBanner>

        <BtnWrap>
          <LeftBtn onClick={() => slide(-500)}>
            <TfiArrowCircleLeft />
          </LeftBtn>
          <SlideWrap ref={scroll}>
            {popItems.length > 1 ? (
              popItems.map((item) => {
                return (
                  <Slider
                    key={item._id}
                    photo={item.imageSrc}
                    name={item.name}
                    id={item._id}
                  />
                );
              })
            ) : (
              <LoadingWrap>
                <Loading />
              </LoadingWrap>
            )}
          </SlideWrap>
          <RightBtn onClick={() => slide(500)}>
            <TfiArrowCircleRight />
          </RightBtn>
        </BtnWrap>
        <Categories cats={cats} pics={pics} />
      </Wrapper>
    </>
  );
};

export default Homepage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoadingWrap = styled.div`
  margin-top: 10vh;
  height: 33vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const PopularBanner = styled.div`
  text-align: center;
  font-size: 1.3em;
  color: pink;
  height: 7vh;
  background-color: black;
  padding: 0.9% 0;
  letter-spacing: 7px;
  margin-top: 50px;
`;
const SlideWrap = styled.div`
  width: 95vw;
  padding: 30px 0;
  display: flex;
  overflow: hidden;
  overflow-x: hidden;
  scroll-behavior: smooth;
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

const BtnWrap = styled.div`
  position: relative;
`;

const LeftBtn = styled.button`
  position: absolute;
  top: 160px;
  left: 0px;
  z-index: 2;
  height: 130px;
  padding: 30px 0;
  font-size: 4em;
  border: none;
  cursor: pointer;
`;

const RightBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 160px;
  height: 130px;
  padding: 30px 0;
  font-size: 4em;
  border: none;
  cursor: pointer;
`;
