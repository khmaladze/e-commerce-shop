import axios from "axios";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
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

interface Product {
  product_id: string;
  product_image: string;
  title: string;
  product_description: string;
  price: string;
}

interface UserShopInterface {
  shop_id: string;
  shop_image: string;
  shop_name: string;
  budget: string;
  category: string | number;
}

export const dataformat = (num: number | string) => {
  if (num == 1) return "ELECTRONICS";
  if (num == 2) return "HOME";
  if (num == 3) return "FASHION";
  if (num == 4) return "SPORT";
  if (num == 5) return "ITEM";
};

export const imageFormat = (img: string) => {
  let firstImage = img?.split(",");
  if (firstImage && firstImage[0]) {
    return firstImage[0];
  } else if (firstImage) {
    return firstImage;
  }
};

export const MyShop: FC<Product> = ({
  product_id,
  product_image,
  title,
  product_description,
  price,
}) => {
  const deleteProduct = (e: any) => {
    fetch(`/api/product/my/products/:${e}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
        toast.success(`Product id ${e} Delete Successfully`);
      });
  };
  return (
    <div>
      <div className="myshop__products__card" key={product_id}>
        <div
          className="myshop__produts__card__image"
          style={{
            backgroundImage: `url(${imageFormat(product_image)})`,
          }}
        ></div>
        <div className="myshop__products__card__content">
          <h3>{title}</h3>
          <h4>{product_description}</h4>
          <h5>Price: {price}$</h5>
        </div>
        <AiOutlineDelete
          onClick={() => deleteProduct(product_id)}
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
      </div>
    </div>
  );
};

export const UserShop: FC<UserShopInterface> = ({
  shop_id,
  shop_image,
  shop_name,
  budget,
  category,
}) => {
  return (
    <div className="myshop__page__shop__header" key={shop_id}>
      <div
        className="myshop__page__image"
        style={{
          backgroundImage: `url(${shop_image})`,
        }}
      ></div>
      <div className="myshop__content">
        <h4>shop_name: {shop_name}</h4>
        <h4>balance: {budget}$</h4>
        <h4>category: {dataformat(category)}</h4>
      </div>
    </div>
  );
};

interface UserProduct {
  product_id: any;
  product_image: any;
  title: any;
  product_description: any;
  price: any;
  onDelete: any;
  onUpdate: any;
}

export const UserProductComponent: FC<UserProduct> = ({
  product_id,
  product_image,
  title,
  product_description,
  price,
  onDelete,
  onUpdate,
}) => {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "345px",
        marginTop: "50px",
        marginBottom: "50px",
      }}
      key={product_id}
    >
      <Card sx={{ maxWidth: 345 }} id={product_id}>
        <CardMedia
          style={{ objectFit: "contain", padding: "5px" }}
          component="img"
          height="140"
          image={`${imageFormat(product_image)}`}
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product_description.substring(0, 30)}...
          </Typography>
          <Typography variant="body1" color="text">
            Price: {price}$
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <AiOutlineDelete
              onClick={() => onDelete(product_id)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                marginRight: "5px",
              }}
            />
          </Button>
          <Button size="small">
            <AiOutlineEdit
              style={{
                cursor: "pointer",
                fontSize: "20px",
                marginLeft: "5px",
              }}
              onClick={() => onUpdate(product_id)}
            />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

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
