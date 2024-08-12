import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegistrationPage from "../pages/RegistrationPage";
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import Home from "../pages/Home";
import Message from "../components/Message";
import AuthLayout from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // This will render Home component for the root path "/"
        element: <Home />,
      },
      {
        path: "register",
        element:<AuthLayout> <RegistrationPage /> </AuthLayout>,
      },
      {
        path: "email",
        element:<AuthLayout> <CheckEmail /> </AuthLayout>,
      },
      {
        path: "password",
        element:<AuthLayout> <CheckPassword /></AuthLayout>,
      },
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: ":userId", // Dynamic route for userId
            element: <Message />,
          },
          {
            path: "*", // Wildcard route to catch all undefined paths
            element: <Message />,
          },
        ],
      },
      {
        path: "*", // Wildcard route to catch all undefined paths at the root level
        element: <Home />,
      },
    ],
  },
]);

export default router;
