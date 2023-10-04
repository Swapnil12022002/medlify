import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/func-components/Navigation";
import Home from "./components/func-components/Home";
import { useAppSelector } from "./state/hooks";
import { selectTheme } from "./state/reducers/themeReducer";

const router = createBrowserRouter([
  {
    Component: Navbar,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
]);

export default function App() {
  const theme = useAppSelector(selectTheme);
  return (
    <div className={`${theme ? "bg-black" : ""}`}>
      <RouterProvider router={router} />
    </div>
  );
}
