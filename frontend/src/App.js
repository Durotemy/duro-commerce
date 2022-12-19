import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path="/product/:id" element={<ProductScreen/>} />
            <Route path="/cart/:id" element={<CartScreen/>} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/register" element={<RegisterScreen />}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
