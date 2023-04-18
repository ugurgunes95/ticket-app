import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Journeys from "./pages/Journeys";
import PersistLogin from "./components/PersistLogin";
import RequireAuthLayout from "./components/RequireAuthLayout";
import PublicLayout from "./components/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "logout", element: <Logout /> },
        ],
      },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuthLayout />,
            children: [{ path: "journeys", element: <Journeys /> }],
          },
        ],
      },
    ],
  },
]);

export default () => <RouterProvider router={router} />;
