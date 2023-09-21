import { useState, useEffect } from "react";
import styled from "styled-components";

const BrandFilter = ({
  selectedBrand,
  setSelectedBrand,
  category,
  filteredData,
}) => {
  const [companies, setCompanies] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [select, setSelect] = useState(false);

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then((data) => {
        const newArray =
          filteredData &&
          filteredData.map((i) => {
            return data.data.filter((item) => {
              if (i.companyId === item._id) {
                return item.name;
              }
            });
          });

        const names = newArray.map(([name]) => name.name);
        const ids = newArray.map(([name]) => name._id);
        const newSetNames = Array.from(new Set(names));
        const newSetIds = Array.from(new Set(ids));
        const theOne = newSetNames.map((name, index) => {
          return { name: name, _id: newSetIds[index] };
        });
        setCompanies(theOne);
      })
      .catch((err) => {
        console.log("Error", err);
      });
    return () => {
      setSelect(false);
    };
  }, [selectedBrand, category, filteredData]);

  const selectedChanged = (brand) => {
    if (selectedBrand === brand._id) {
      setSelectedBrand(null); // uncheck if already selected
    } else {
      setSelectedBrand(brand._id);
      setSelectedCat(null); // reset selected category
      setSelect(false);
    }
  };
  //   const selectedHandler = (category) => {
  //     setSelectedCat(category);
  //     setSelect(category);
  //     selectedChanged(category);
  //   };

  //   const selectedHandler = (category) => {
  //   setSelectedCat(category);
  //   selectedChanged(category);
  //   };
  return (
    <Wrapper>
      <Brand>Shop by Brand</Brand>
      {companies &&
        companies.map((brand, i) => {
          return (
            <Container key={i}>
              <label>
                <input
                  checked={selectedBrand === brand._id}
                  onChange={() => selectedChanged(brand)}
                  type="checkbox"
                  name="brandName"
                />{" "}
                {brand.name}
              </label>
            </Container>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  width: 120px;
  display: flex;
  gap: 5px;
  padding-left: 10px;
`;

const Brand = styled.p`
  padding-bottom: 5px;
  padding-top: 10px;
  padding-left: 2px;
  margin-left: 10px;
  border-bottom: 5px solid lightpink;
  border-radius: 2px;
`;

export default BrandFilter;
