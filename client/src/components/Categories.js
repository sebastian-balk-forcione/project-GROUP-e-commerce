import { Link } from "react-router-dom";
import styled from "styled-components";
// import medical from "../assets/Categories/medical.jpg";
// import entertainment from "../assets/Categories/entertainment_hp.jpg";
// import fitness from "../assets/Categories/fitness_hp.jpg";
// import lifestyle from "../assets/Categories/lifestyle_hp.jpg";
// import industrial from "../assets/Categories/industrial_hp.jpg";
// import gaming from "../assets/Categories/gaming.jpg";
// import animal from "../assets/Categories/animal.jpg";

const Categories = ({ cats, pics }) => {
  // const array = [
  //   fitness,
  //   entertainment,
  //   lifestyle,
  //   industrial,
  //   medical,
  //   gaming,
  //   animal,
  // ];
  return (
    <>
      <Header>Shop by Category</Header>
      <Wrapper>
        {cats.map((cat, index) => {
          return (
            <Link key={index} to={`/category/${cat}`}>
              <Div>
                <Images src={pics[index]} />
                <Div2>
                  <Text>{cat}</Text>
                  <Button>Shop Now</Button>
                </Div2>
              </Div>
            </Link>
          );
        })}
      </Wrapper>
    </>
  );
};

export default Categories;

const Wrapper = styled.div`
  max-width: 95vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 40px;
`;

const Header = styled.h2`
  display: flex;
  justify-content: center;
`;

const Images = styled.img`
  margin: 20px 40px;
  max-width: 25vw;
`;

const Div = styled.div`
  position: relative;
`;

const Div2 = styled.div`
  position: absolute;
  top: 75%;
  left: 10%;
`;

const Button = styled.button`
  cursor: pointer;

  &:hover {
    color: pink;
  }
`;

const Text = styled.div`
  color: white;
`;
