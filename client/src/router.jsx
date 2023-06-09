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
import MyTickets from "./pages/MyTickets";

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
        ],
      },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuthLayout />,
            children: [
              { path: "journeys", element: <Journeys /> },
              { path: "mytickets", element: <MyTickets /> },
              { path: "logout", element: <Logout /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default () => <RouterProvider router={router} />;
