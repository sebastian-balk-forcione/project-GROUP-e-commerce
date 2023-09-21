import ProductDetails from "./ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import ViewCart from "./ViewCart";
import Footer from "./Footer";
import CheckoutPage from "./CheckoutPage";
import styled from "styled-components";
import { CartProvider } from "./CartContext";
import OrderConfirmation from "./OrderConfirmation";
import medical from "../assets/Categories/medical.jpg";
import entertainment from "../assets/Categories/entertainment_hp.jpg";
import fitness from "../assets/Categories/fitness_hp.jpg";
import lifestyle from "../assets/Categories/lifestyle_hp.jpg";
import industrial from "../assets/Categories/industrial_hp.jpg";
import gaming from "../assets/Categories/gaming.jpg";
import animal from "../assets/Categories/animal.jpg";

const App = () => {
  const picArray = [
    fitness,
    entertainment,
    lifestyle,
    industrial,
    medical,
    gaming,
    animal,
  ];

  const catArray = [
    "fitness",
    "entertainment",
    "lifestyle",
    "industrial",
    "medical",
    "gaming",
    "pets and animals",
  ];

  return (
    <CartProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Header cats={catArray} />

        <Container>
          <Routes>
            <Route
              path="/"
              element={<Homepage cats={catArray} pics={picArray} />}
            />
            <Route
              path="/category/:category"
              element={<ProductsPage cats={catArray} pics={picArray} />}
            />
            <Route
              path="/productdetails/:productid"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<ViewCart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/:total" element={<CheckoutPage />} />

            <Route
              path="/order-confirmation/:name/:total"
              element={<OrderConfirmation />}
            />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;

const Container = styled.div`
  min-height: 87vh;
  position: relative;
  padding-bottom: 10vh;
`;
