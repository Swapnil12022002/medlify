import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/func-components/Navigation";

const router = createBrowserRouter([
  {
    Component: Navbar,
    children: [
      {
        path: "/",
        Component: Navbar,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
