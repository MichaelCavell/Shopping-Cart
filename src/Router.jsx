import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import App from "./App";

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Home />,
            index: true,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
    ]);

  return <RouterProvider router={router} />;
};

export default Router;
