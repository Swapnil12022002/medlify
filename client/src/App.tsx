import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppSelector } from "./state/hooks";
import { selectTheme } from "./state/reducers/themeReducer";
import Navbar from "./components/func-components/Navigation";
import Home from "./components/func-components/Home";
import Medicines from "./components/func-components/Medicines";
import Map from "./components/Map/Map";
import Dashboard from "./components/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    Component: Navbar,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/map",
        Component: Map,
      },
      {
        path: "/medicines",
        Component: Medicines,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
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
