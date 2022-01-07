import React, {
  FC,
  useEffect,
  createContext,
  useReducer,
  useContext,
} from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MainPage } from "./pages/MainPage";
// import { LoginPage } from "./pages/LoginPage";
// import { RegisterPage } from "./pages/RegisterPage";
// import { ProfilePage } from "./pages/ProfilePage";
// import { CreateShopPage } from "./pages/CreateShopPage";
// import { Settings } from "./components/Settings";
// import { MyShopPage } from "./pages/MyShopPage";
// import { AddUserProducts } from "./pages/AddUserProducts";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const UserContext = createContext<any>(null);
export const serverUrl = "http://localhost:5000";
const user = JSON.parse(localStorage.getItem("user") || "{}");
let guest: any = false;
const Routing = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    if (JSON.stringify(user) === "{}") {
      localStorage.clear();
      guest = localStorage.setItem("guest", `true`);
      if (JSON.parse(localStorage.getItem("guest") || "nothing") == true) {
        if (window.location.pathname.startsWith("/profile")) {
          navigate("/");
        }
      }
    }

    // if (navigate.location.pathname.startsWith("/register")) {
    //   navigate.push("/register");
    // }
    // if (user) {
    //   if (navigate.location.pathname.startsWith("/login")) {
    //     navigate.push("/");
    //   }
    //   if (navigate.location.pathname.startsWith("/register")) {
    //     navigate.push("/");
    //   }
    //   if (navigate.location.pathname.startsWith("/admin")) {
    //     navigate.push("/");
    //   }
    //   dispatch({ type: "USER", payload: user });
    // }
    dispatch({ type: "USER", payload: user });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <main>
          <Navbar />
          <Routing />
          <Footer />
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
