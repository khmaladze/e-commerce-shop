import React, { FC, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { postUserLogin } from "./ApiClient";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

toast.configure();

const theme = createTheme();

export const LoginPage: FC = () => {
  const { dispatch } = useContext(UserContext);
  const newdispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const PostData = async () => {
    if (email.length > 1 && password.length > 7) {
      try {
        const res = await postUserLogin(email, password);
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("user log in successfully");
        localStorage.clear();
        if (res.data.token) {
          localStorage.setItem("jwt", res.data.token);
        }
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        if (res.data.shop) {
          localStorage.setItem("shop", JSON.stringify(res.data.shop));
        }

        dispatch({ type: "USER", payload: res.data.user });
        newdispatch(
          login({
            birth_date: res.data.user.birth_date,
            browser_type: res.data.user.browser_type,
            budget: res.data.user.budget,
            card_password: res.data.user.card_password,
            country: res.data.user.country,
            created_at: res.data.user.created_at,
            email: res.data.user.email,
            first_name: res.data.user.first_name,
            ip_address: res.data.user.ip_address,
            is_blocked: false,
            last_name: res.data.user.last_name,
            permission: res.data.user.permission,
            updated_at: res.data.user.updated_at,
            user_address: res.data.user.user_address,
            user_card: res.data.user.user_card,
            user_id: res.data.user.user_id,
            user_image: res.data.user.user_image,
            user_password: res.data.user.user_password,
          })
        );
      } catch (error: any) {
        if (error.response.data) {
          for (let errDetail of error.response.data.detail) {
            toast.warn(errDetail.message);
          }
        } else {
          toast.warn("Please Use Valid Credentials");
        }
      }
    } else {
      toast.warn("Please Add All the fields and use valid credentials");
    }
  };

  return (
    <div
      style={{
        // background: "#f7f7f7",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
        minHeight: "calc(100vh - 360px)",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              LOG IN
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => PostData()}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/register"}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
