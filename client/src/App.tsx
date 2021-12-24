import React, {
  FC,
  useEffect,
  createContext,
  useReducer,
  useContext,
} from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateShopPage } from "./pages/CreateShopPage";
import { Settings } from "./components/Settings";
import { MyShopPage } from "./pages/MyShopPage";

// interface UserInfo {
//   user_id?: string;
//   firstName?: string;
//   lastName?: string;
//   birthDate?: string;
//   country?: string;
//   userAddress?: string;
//   email?: string;
//   userCard?: string;
//   isBlocked?: boolean;
//   budget?: string;
//   userImage?: string;
//   ipAddress?: string;
//   browserType?: string;
//   operationSystemCpu?: string;
//   homeDir?: string;
//   hostname?: string;
//   operationSystemUsername?: string;
//   operationSystemVersion?: string;
//   operationSystem?: string;
//   operationSystemRelease?: string;
//   operationSystemPlatform?: string;
//   created_at?: string;
//   updated_at?: string;
//   user_password?: string;
//   card_password?: string;
// }

export const UserContext = createContext<any>(null);

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      if (history.location.pathname.startsWith("/login")) {
        history.push("/");
      }
      if (history.location.pathname.startsWith("/register")) {
        history.push("/");
      }
      if (history.location.pathname.startsWith("/admin")) {
        history.push("/");
      }
      dispatch({ type: "USER", payload: user });
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/add/shop">
        <CreateShopPage />
      </Route>
      <Route exact path="/my/shop">
        <MyShopPage />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
    </Switch>
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
