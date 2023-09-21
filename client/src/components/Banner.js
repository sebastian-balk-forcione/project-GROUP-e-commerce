import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import fitness from "../assets/banners/fitness.jpg";
import medical from "../assets/banners/medical_2_good.jpg";
import lifestyle from "../assets/banners/lifestyle_3.jpg";

const array = [fitness, lifestyle, medical];
const length = array.length;

// Banner with timed changer
const Banner = () => {
  const [current, setCurrent] = useState({ current: 0, number: 0 });
  const [filteredData, setFilteredData] = useState(null);

  const navigate = useNavigate();

  // fetching data and then organizing by category
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        const medical = data.data.filter((item) => {
          return item.category === "Medical";
        });
        const fitness = data.data.filter((item) => {
          return item.category === "Fitness";
        });
        const lifestyle = data.data.filter((item) => {
          return item.category === "Lifestyle";
        });
        setFilteredData({
          fitness: fitness,
          lifestyle: lifestyle,
          medical: medical,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // State set for the images to move through the array
  useEffect(() => {
    if (filteredData === null) return;
    const timeOut = setTimeout(() => {
      if (current.current === length - 1) {
        const index = Math.floor(Math.random() * filteredData[keys[0]].length);
        setCurrent({ current: 0, number: index });
      } else {
        const index = Math.floor(
          Math.random() * filteredData[keys[current.current + 1]].length
        );
        setCurrent({ current: current.current + 1, number: index });
      }
    }, 6000);
    return () => clearTimeout(timeOut);
  }, [current, filteredData]);

  let keys;
  if (filteredData) {
    keys = Object.keys(filteredData);
  }

  const onClickHandler = (id) => {
    navigate(`/productdetails/${id._id}`);
  };

  return (
    <>
      {array.map((pic, index) => {
        return (
          <Wrapper key={index}>
            {index === current.current && (
              <Image src={pic} alt="" count={current.current} index={index} />
            )}
          </Wrapper>
        );
      })}
      {filteredData && (
        <Btnwrap>
          <Product
            src={filteredData[keys[current.current]][current.number].imageSrc}
          />
          <ItemWrap>
            <Name>
              {filteredData[keys[current.current]][current.number].name}
            </Name>
            <Price>
              ${filteredData[keys[current.current]][current.number].price}
            </Price>
            <Button
              onClick={() =>
                onClickHandler(
                  filteredData &&
                    filteredData[keys[current.current]][current.number]
                )
              }
            >
              Shop Now
            </Button>
          </ItemWrap>
        </Btnwrap>
      )}
    </>
  );
};

export default Banner;

const Wrapper = styled.div`
  width: 30vw;
  position: relative;
`;

const Image = styled.img`
  width: 100vw;
  height: 56.2vh;
  opacity: ${(props) => (props.index === props.count ? 1 : 0)};
  object-fit: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Btnwrap = styled.div`
  z-index: 5;
  position: relative;
  width: 20vw;
  height: 43vh;
  background-color: white;
  border: 3px solid pink;
  padding: 25px;
  margin: 3.5% 0 0 5.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Product = styled.img`
  margin: 0 25px;
  width: 10vw;
  height: 20vh;
`;

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    padding-top: 7px;
  }
`;
const Name = styled.div`
  text-align: center;
`;
const Price = styled.div`
  font-weight: bold;
`;
const Button = styled.button`
  margin-top: 5px;
  height: 4vh;
  width: 12vw;
  font-size: 1em;
  cursor: pointer;

`;
