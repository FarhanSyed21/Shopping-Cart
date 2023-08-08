import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const store = useSelector((state) => state.ui.cartIsVisible);
  return (
    <Layout>
      {store && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
