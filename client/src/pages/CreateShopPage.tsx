/* eslint-disable no-loop-func */
import React, { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const CreateShopPage: FC = () => {
  const [shopName, setShopName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [shopImage, setShopImage] = useState<any>([]);
  const [shopBackgroundImage, setShopBackgroundImage] = useState<any>([]);

  const history = useNavigate();

  interface Shop {
    shopName: string;
    category: string;
    budget: string;
    shopImage: string;
    shopBackgroundImage: string;
  }

  const postCreateShop = async (image: string, bgImage: string) => {
    console.log(shopBackgroundImage);
    try {
      if (image && shopName && category && budget && shopImage) {
        const createShop: Shop = {
          shopName,
          category,
          budget,
          shopImage: image,
          shopBackgroundImage: bgImage,
        };
        const res = await axios.post(`/api/shop/add/shop`, createShop, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        toast.success("shop Add Successfully");
        localStorage.setItem("shop", "shop created successfully");
        history("/my/shop");
      } else {
        toast.warn("please upload image");
      }
    } catch (error: any) {
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

  const CreateShop = () => {
    if (shopName && category && budget && shopImage && shopBackgroundImage) {
      let data = new FormData();
      data.append("file", shopBackgroundImage[0].file);
      data.append(
        "upload_preset",
        "afdffasfdsgsfgfasdasasgfherhrehrehrehrhrhrhr"
      );
      data.append("cloud_name", "dtlhyd02w");
      fetch("https://api.cloudinary.com/v1_1/dtlhyd02w/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((dataImg) => {
          toast.success("Image Uploaded");
          data.append("file", shopImage[0].file);
          data.append(
            "upload_preset",
            "afdffasfdsgsfgfasdasasgfherhrehrehrehrhrhrhr"
          );
          data.append("cloud_name", "dtlhyd02w");
          fetch("https://api.cloudinary.com/v1_1/dtlhyd02w/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((dataa) => {
              toast.success("Image Uploaded");
              postCreateShop(dataImg.url, dataa.url);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("Please add all the field");
    }
  };

  return (
    <div>
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
            CREATE YOUR SHOP
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="shop"
                  label="Shop Name"
                  name="Shop Name"
                  autoComplete="Shop Name"
                  margin="normal"
                  type="text"
                  placeholder="Shop Name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Age"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={1}>ELECTRONICS</MenuItem>
                    <MenuItem value={2}>HOME</MenuItem>
                    <MenuItem value={3}>FASHION</MenuItem>
                    <MenuItem value={4}>SPORT</MenuItem>
                    <MenuItem value={5}>ITEM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="budget"
                  label="budget"
                  name="budget"
                  autoComplete="budget"
                  margin="normal"
                  type="number"
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  IMAGE FOR BACKGROUND
                </Typography>
                <div>
                  <FilePond
                    files={shopImage}
                    allowMultiple={true}
                    maxFiles={3}
                    onupdatefiles={setShopImage}
                    name="files"
                    labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <FilePond
                    files={shopBackgroundImage}
                    allowMultiple={true}
                    maxFiles={3}
                    onupdatefiles={setShopBackgroundImage}
                    name="files"
                    labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => CreateShop()}
          >
            Create Shop
          </Button>
        </Box>
      </Container>
    </div>
  );
};
