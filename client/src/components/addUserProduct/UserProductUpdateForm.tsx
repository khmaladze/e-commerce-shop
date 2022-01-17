import React, { FC, useState } from "react";
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
import axios from "axios";

toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface Props {
  onAdd?: any;
  id: any;
  getProductById: any;
  getData: any;
}

export const UserProductUpdateForm: FC<Props> = ({
  id,
  getProductById,
  getData,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [showPostUpdate, setShowPostUpdate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productCount, setProductCount] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<any>("");
  const [productData, setProductData] = useState<any>([]);
  const [updateProductId, setUpdateProductId] = useState<any>("");
  const [showAddProduct, setShowAddProduct] = useState<boolean>(true);

  let imageList: any = [];
  const UpdateProduct = (updatePostId: string | number) => {
    if (
      !title &&
      !category &&
      !description &&
      !price &&
      !productCount &&
      !image[0]
    ) {
      toast.warn("Please add minumum one filed");
    }
    if (
      !image[0] &&
      (title || description || category || price || productCount)
    ) {
      const updateUserProduct = async () => {
        try {
          const uploadData = {
            title,
            productDescription: description,
            price,
            productCount,
            productImage: imageUrl,
            requestedBy: "user",
          };
          const res = await axios.put(
            `/api/product/my/user/products/${updatePostId}`,
            uploadData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          );
          toast.success("Product Updated  Successfully");
          setTitle("");
          setDescription("");
          setPrice("");
          setProductCount("");
          imageList = [];
          setImage([]);
          setShowPostUpdate(false);
          setShowAddProduct(true);
          return getData();
        } catch (error) {
          console.log(error);
        }
      };
      updateUserProduct();
    }
    if (image.length == 1 && showPostUpdate) {
      const data = new FormData();
      data.append("file", image[0].file);
      data.append(
        "upload_preset",
        "afdffasfdsgsfgfasdasasgfherhrehrehrehrhrhrhr"
      );
      data.append("cloud_name", "dtlhyd02w");
      console.log(data);
      const updateUserProduct = async () => {
        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dtlhyd02w/image/upload",
            data
          );
          const uploadData = {
            title,
            productDescription: description,
            price,
            productCount,
            productImage: res.data.url,
            requestedBy: "user",
          };
          const response = await axios.put(
            `/api/product/my/user/products/${updatePostId}`,
            uploadData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          );
          toast.success("Product Updated Successfully");
          setTitle("");
          setDescription("");
          setPrice("");
          setProductCount("");
          imageList = [];
          setImage([]);
          setShowPostUpdate(false);
          setShowAddProduct(true);
          return getData();
        } catch (error) {
          console.log(error);
        }
      };
      updateUserProduct();
    } else if (image.length > 1 && showPostUpdate) {
      for (let i = 0; i < image.length; i++) {
        const data = new FormData();
        data.append("file", image[i].file);
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
            setImageUrl(data.url);
            imageList.push(data.url);
            console.log(imageList, "imageList");
            toast.success("Image Uploaded");
            if (imageList.length == image.length) {
              fetch(`/api/product/my/user/products/:${updatePostId}`, {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
                body: JSON.stringify({
                  title,
                  productDescription: description,
                  price,
                  productCount,
                  productImage: String(imageList),
                  requestedBy: "user",
                }),
              })
                .then((res) => res.json())
                .then((result) => {
                  console.log(result);
                  if (result.success) {
                    toast.success("Product Add Successfully");
                    setTitle("");
                    setDescription("");
                    setPrice("");
                    setProductCount("");
                    imageList = [];
                    setImage([]);
                    setShowPostUpdate(false);
                    setShowAddProduct(true);
                    return getData();
                  }
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (showPostUpdate == true) {
        setShowPostUpdate(false);
        setUpdateProductId("");
        setShowAddProduct(true);
        window.scrollTo({ top: 150, behavior: "smooth" });
        setTitle("");
        setDescription("");
        setPrice("");
        setProductCount("");
        setImage([]);
      } else {
        setShowPostUpdate(true);
        setUpdateProductId(updatePostId);
        setShowAddProduct(false);
        window.scrollTo({ top: 150, behavior: "smooth" });
        getProductById(updatePostId);
      }
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
            UPDATE PRODUCT
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
            onClick={() => UpdateProduct(updateProductId)}
          >
            Update Product
          </Button>
        </Box>
      </Container>
    </div>
  );
};
