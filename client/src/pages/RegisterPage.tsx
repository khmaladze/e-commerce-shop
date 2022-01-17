import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postUserRegisterFunction } from "./ApiClient";

toast.configure();

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a
        style={{
          cursor: "pointer",
          textDecoration: "underline",
          color: "blue",
        }}
      >
        ecommerce-app
      </a>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("2022-01-01");
  const [country, setCountry] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userCard, setUserCard] = useState<string>("");
  const [cardPassword, setCardPassword] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  interface UserRegister {
    firstName: string;
    lastName: string;
    birthDate: string;
    country: string;
    userAddress: string;
    email: string;
    userPassword: string;
    userCard: string;
    cardPassword: string;
    budget: string;
    confirmPassword: string;
  }

  const PostData = () => {
    if (
      firstName &&
      lastName &&
      birthDate &&
      country &&
      userAddress &&
      email &&
      userPassword &&
      userCard &&
      cardPassword &&
      budget &&
      confirmPassword
    ) {
      // convert Date to yyyy/mm/dd format
      let validDate = `${birthDate.slice(0, 4)}-${birthDate.slice(
        5,
        7
      )}-${birthDate.slice(8, 10)}`;
      const postUserRegister = async () => {
        try {
          const res = await postUserRegisterFunction(
            firstName,
            lastName,
            validDate,
            country,
            userAddress,
            email,
            userPassword,
            userCard,
            cardPassword,
            budget,
            confirmPassword
          );
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
          toast.success("user register successfully");
        } catch (error: any) {
          if (error.response) {
            toast.warn(error.response.data.detail[0].message);
          } else {
            toast.warn("Please Use Valid Credentials");
          }
        }
      };
      postUserRegister();
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
        paddingTop: "0px",
        paddingBottom: "20px",
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
              REGISTER
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    name="BirthDate"
                    label="BirthDate"
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    autoComplete="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </Grid>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="card"
                    label="Card"
                    name="card"
                    autoComplete="card"
                    value={userCard}
                    onChange={(e) => setUserCard(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="cardPassword"
                    label="Card Password"
                    name="cardPassword"
                    autoComplete="cardPassword"
                    value={cardPassword}
                    onChange={(e) => setCardPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="budget"
                    label="Budget"
                    name="budget"
                    autoComplete="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I Agree This Developers are Great."
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => PostData()}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/login"}>Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};
