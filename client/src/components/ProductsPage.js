import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BrandFilter from "./BrandFilter";
import Loading from "./Loading";

const ProductsPage = ({ cats, pics }) => {
  const { category } = useParams();
  const [filteredItems, setFilteredItems] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    setSelectedBrand(null);
  }, [category]);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        const result = data.data;
        const filtered = result.filter(
          (item) =>
            item.category.toLowerCase() === category.toLowerCase() &&
            (!selectedBrand || item.companyId === selectedBrand)
        );
        setFilteredItems(filtered);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [category, selectedBrand]);

  return (
    <>
      <ImageWrap>
        <Image src={pics[cats.indexOf(category)]} />
        <CatWrap>
          <div>{category.toUpperCase()}</div>
        </CatWrap>
      </ImageWrap>
      <Container>
        <BrandFilter
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          filteredData={filteredItems}
          category={category}
        />
        <Wrapper>
          {filteredItems ? (
            filteredItems.map((item) => {
              return (
                <ItemLink to={`/productdetails/${item._id}`}>
                  <Name>{item.name}</Name>
                  <Img src={item.imageSrc} alt="item"></Img>
                  {item.numInStock === 0 ? (
                    <SoldOutSticker>
                      Sold <br /> out
                    </SoldOutSticker>
                  ) : (
                    <Price>${item.price}</Price>
                  )}

                  {item.numInStock < 3 && item.numInStock !== 0 ? (
                    <LowItemSticker>
                      Popular <br /> Item
                    </LowItemSticker>
                  ) : (
                    <div></div>
                  )}
                </ItemLink>
              );
            })
          ) : (
            <LoadingDiv>
              <Loading />
            </LoadingDiv>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageWrap = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const CatWrap = styled.div`
  position: absolute;
  color: white;
  font-size: 4em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: -1px 4px 5px #000000;
`;
const Image = styled.img`
  width: 100vw;
  object-fit: cover;
  height: 50vh;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: max-content;
  margin-left: 100px;
  margin-right: 50px;
`;

const ItemLink = styled(Link)`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  margin-right: 15px;
  border: 1px solid lightpink;
  position: relative;
`;

const Img = styled.img`
  width: auto;
  height: 150px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 18px;
  display: flex;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;

  text-align: center;
`;

const LowItemSticker = styled.div`
  position: absolute;
  color: white;
  background: lightpink;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 50%;
  font-weight: bold;
  top: 85%;
  left: 85%;
  transform: translate(-50%, -50%);
  display: flex;
  text-align: center;
`;
const SoldOutSticker = styled.div`
  position: absolute;
  color: white;
  background: red;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 50%;
  font-weight: bold;
  top: 85%;
  left: 85%;
  transform: translate(-50%, -50%);
  display: flex;
  text-align: center;
`;

const LoadingDiv = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
`;

const Price = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
`;
export default ProductsPage;
