import axios from "axios";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface ProductUser {
  onAdd: any;
}

export const CreateProductComponent: FC<ProductUser> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productCount, setProductCount] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<any>("");
  const [productData, setProductData] = useState<any>([]);
  const [updateProductId, setUpdateProductId] = useState<any>("");
  const handleChange = (event: any) => {
    setCategory(event.target.value);
  };
  let imageList: any = [];

  const AddProduct = () => {
    if (
      !title ||
      !category ||
      !description ||
      !price ||
      !productCount ||
      !image[0]
    ) {
      toast.warn("Please add All The filed");
    }
    if (image.length == 1) {
      const data = new FormData();
      data.append("file", image[0].file);
      data.append(
        "upload_preset",
        "afdffasfdsgsfgfasdasasgfherhrehrehrehrhrhrhr"
      );
      data.append("cloud_name", "dtlhyd02w");
      const createPost = async () => {
        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dtlhyd02w/image/upload",
            data
          );
          setImageUrl(res.data.url);
          const postData = {
            title,
            productDescription: description,
            category,
            price,
            productCount,
            productImage: String(res.data.url),
            requestedBy: "user",
          };
          const response = await axios.post(
            "/api/product/add/product",
            postData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          );
          toast.success("it working good");
          toast.success("Product Add Successfully");
          setTitle("");
          setDescription("");
          setCategory("");
          setPrice("");
          setProductCount("");
          imageList = [];
          setImage([]);
          setImageUrl("");
          return onAdd();
        } catch (error) {
          console.log(error);
        }
      };
      createPost();
    } else {
      if (image.length > 1) {
        for (let i = 0; i < image.length; i++) {
          const data = new FormData();
          data.append("file", image[i].file);
          data.append(
            "upload_preset",
            "afdffasfdsgsfgfasdasasgfherhrehrehrehrhrhrhr"
          );
          data.append("cloud_name", "dtlhyd02w");
          const createPost = async () => {
            try {
              const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dtlhyd02w/image/upload",
                data
              );
              imageList.push(res.data.url);
              if (imageList.length == image.length) {
                const postData = {
                  title,
                  productDescription: description,
                  category,
                  price,
                  productCount,
                  productImage: String(imageList),
                  requestedBy: "user",
                };
                const response = await axios.post(
                  "/api/product/add/product",
                  postData,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                  }
                );
                toast.success("it working good");
                toast.success("Product Add Successfully");
                setTitle("");
                setDescription("");
                setCategory("");
                setPrice("");
                setProductCount("");
                imageList = [];
                setImage([]);
                setImageUrl("");
                return onAdd();
              }
            } catch (error) {
              console.log(error);
            }
          };
          createPost();
        }
      }
    }
  };
  return (
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
          ADD PRODUCT
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="Title"
                label="Title"
                name="Title"
                autoComplete="Title"
                margin="normal"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder=" Enter Your Text Here..."
                style={{
                  marginTop: "10px",
                  height: "200px",
                  maxHeight: "250px",
                  maxWidth: "755px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  background: "transparent",
                }}
              ></textarea>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>ELECTRONICS</MenuItem>
                  <MenuItem value={2}>HOME</MenuItem>
                  <MenuItem value={3}>FASHION</MenuItem>
                  <MenuItem value={4}>SPORT</MenuItem>
                  <MenuItem value={5}>ITEM</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="Price"
                label="Price"
                name="Price"
                autoComplete="Price"
                margin="normal"
                type="number"
                placeholder="price $"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="count"
                label="count"
                name="count"
                autoComplete="count"
                margin="normal"
                type="number"
                placeholder="count $"
                value={productCount}
                onChange={(e) => setProductCount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <FilePond
                  files={image}
                  allowMultiple={true}
                  maxFiles={3}
                  onupdatefiles={setImage}
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
          onClick={() => AddProduct()}
        >
          Add Product
        </Button>
      </Box>
    </Container>
  );
};
