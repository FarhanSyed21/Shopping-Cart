import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { uiActions } from "./components/store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const ShowCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "Pending",
          title: "Sending...",
          message: "Sending cart data!"
        })
      );
      const response = await fetch(
        `https://api-calls-70500-default-rtdb.firebaseio.com/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart)
        }
      );
      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "Error",
            title: "Error!",
            message: "Sending cart data failed!"
          })
        );
      }
      dispatch(
        uiActions.showNotification({
          status: "Success",
          title: "Success!",
          message: "Sent cart data successfully!"
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "Success",
          title: "Success!",
          message: "Sent cart data successfully!"
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {ShowCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
