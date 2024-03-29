import React, { FC, useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  postSettingUpdate,
  postSettingUpdateWithImage,
} from "../pages/ApiClient";
import { RootStateOrAny, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const Settings: FC = () => {
  const navigate = useNavigate();
  const newdispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.user.value);
  console.log(user);
  const { state, dispatch } = useContext(UserContext);
  const [country, setCountry] = useState<string>(
    user ? user.country : state?.country
  );
  const [userAddress, setUserAddress] = useState<string>(
    user ? user.user_address : state?.user_address
  );
  const [userPassword, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newUserImage, setNewUserImage] = useState<any | []>([]);
  const userId = user ? user.user_id : state?.user_id;
  const [newUrl, setNewUrl] = useState("");
  const PostUpdateWithImage = () => {
    const data = new FormData();
    data.append("file", newUserImage[0].file);
    data.append(
      "upload_preset",
      "afdffasfdsgsfgfasdasasgfherhrehrehrehrhrhrhr"
    );
    data.append("cloud_name", "dtlhyd02w");
    console.log(data);
    fetch("https://api.cloudinary.com/v1_1/dtlhyd02w/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setNewUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const putUserUpdate = async () => {
    try {
      const res = await postSettingUpdateWithImage(
        userId,
        country,
        userAddress,
        newUrl,
        userPassword,
        confirmPassword
      );
      dispatch({
        type: "UPDATE",
        payload: {
          country: res.data.user.country,
          user_address: res.data.user.user_address,
          user_password: res.data.user.user_password,
          user_image: res.data.user.user_image,
        },
      });
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
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("settings updated successfully");
      navigate("/profile");
    } catch (error: any) {
      console.log(error);
      console.log(error.response);
      if (error.response.data.detail[0].message) {
        toast.warn(error.response.data.detail[0].message);
      }
      if (error.response.data.message) {
        toast.warn(error.response.data.message);
      } else {
        toast.warn("Please Use Valid Credentials");
      }
    }
  };

  useEffect(() => {
    if (
      newUrl &&
      country &&
      userAddress &&
      userPassword.length >= 8 &&
      confirmPassword == userPassword &&
      userId
    ) {
      if (userId) {
        putUserUpdate();
      }
    }
  }, [newUrl]);

  const PostUpdate = async () => {
    try {
      const res = await postSettingUpdate(
        userId,
        country,
        userAddress,
        userPassword,
        confirmPassword
      );
      dispatch({
        type: "UPDATE",
        payload: {
          country: res.data.user.country,
          user_address: res.data.user.user_address,
          user_password: res.data.user.user_password,
          user_image: res.data.user.user_image,
        },
      });
      console.log(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("SETTINGS UPDATED SUCCESSFULLY");
      navigate("/profile");
    } catch (error: any) {
      console.log(error);
      console.log(error.response);
      if (error.response.data.detail[0].message) {
        toast.warn(error.response.data.detail[0].message);
      }
      if (error.response.data.message) {
        toast.warn(error.response.data.message);
      } else {
        toast.warn("Please Use Valid Credentials");
      }
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 425px)" }}>
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
            UPDATE USER DATA
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  margin="normal"
                  type="text"
                  placeholder="country"
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
                  margin="normal"
                  type="text"
                  placeholder="address"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                  margin="normal"
                  type="password"
                  placeholder="Password"
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
                  name="passwordConfirm"
                  autoComplete="password"
                  margin="normal"
                  type="password"
                  placeholder="Password Confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  <FilePond
                    files={newUserImage}
                    allowMultiple={false}
                    maxFiles={1}
                    onupdatefiles={setNewUserImage}
                    name="files"
                    labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
          {newUserImage.length == 0 ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => PostUpdate()}
            >
              Update
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => PostUpdateWithImage()}
            >
              Update with image
            </Button>
          )}
        </Box>
      </Container>
    </div>
  );
};
