/* eslint-disable no-loop-func */
import { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { imageFormat, UserShop } from "../components/MyShop";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { serverUrl } from "../App";
import { MyShopCardComponent } from "../components/MyShopComponent";

toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const MyShopPage: FC = () => {
  const [shop, setShop] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [showPostUpdate, setShowPostUpdate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productCount, setProductCount] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<any>("");
  const [productData, setProductData] = useState<any>([]);
  const [updateProductId, setUpdateProductId] = useState<any>("");
  const [showAddProduct, setShowAddProduct] = useState<boolean>(true);
  let imageList: any = [];

  const getMyUserShop = async () => {
    try {
      const res = await axios.get(`/api/shop/my/shop`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      setShop(res.data.shop);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  const getMyShopProducts = async () => {
    try {
      const res = await axios.get("/api/product/my/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      setProductData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyUserShop();
    getMyShopProducts();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("/api/product/my/products", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      setProductData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const AddProduct = () => {
    if (!title || !description || !price || !productCount || !image[0]) {
      toast.warn("Please add minumum one filed");
    }
    if (image.length == 1) {
      const data = new FormData();
      data.append("file", image[0].file);
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
          toast.success("Image Uploaded");
          if (data.url) {
            console.log("it works good", imageUrl);
            const addShopProduct = async () => {
              try {
                const postData = {
                  title,
                  productDescription: description,
                  category: shop[0]?.category,
                  price,
                  productCount,
                  productImage: data.url,
                  requestedBy: "shop",
                };
                const res = await axios.post(
                  "/api/product/add/product",
                  postData,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                  }
                );
                toast.success("Product Add Successfully");
                setTitle("");
                setDescription("");
                setPrice("");
                setProductCount("");
                imageList = [];
                setImage([]);
                return getData();
              } catch (error) {
                console.log(error);
              }
            };
            addShopProduct();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (image.length > 1) {
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
              const addShopProduct = async () => {
                try {
                  const postData = {
                    title,
                    productDescription: description,
                    category: shop[0]?.category,
                    price,
                    productCount,
                    productImage: String(imageList),
                    requestedBy: "shop",
                  };
                  const res = await axios.post(
                    "/api/product/add/product",
                    postData,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                      },
                    }
                  );
                  toast.success("Product Add Successfully");
                  setTitle("");
                  setDescription("");
                  setPrice("");
                  setProductCount("");
                  imageList = [];
                  setImage([]);
                  return getData();
                } catch (error) {
                  console.log(error);
                }
              };
              addShopProduct();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      toast.warn("Please add all the field and upload image ");
    }
  };

  const UpdateProduct = (updatePostId: string | number) => {
    if (!image[0] && !title && !description && !price && !productCount) {
      toast.warn("Please add all the field and upload image ");
    }
    if (!image[0] && (title || description || price || productCount)) {
      fetch(`/api/product/my/products/${updatePostId}`, {
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
          productImage: imageUrl,
          requestedBy: "shop",
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.success) {
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
          }
        });
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
      fetch("https://api.cloudinary.com/v1_1/dtlhyd02w/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.url);
          toast.success("Image Uploaded");
          if (data.url) {
            fetch(`/api/product/my/products/${updatePostId}`, {
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
                productImage: data.url,
                requestedBy: "shop",
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
              fetch(`/api/product/my/products/${updatePostId}`, {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
                body: JSON.stringify({
                  title,
                  productDescription: description,
                  category: shop[0]?.category,
                  price,
                  productCount,
                  productImage: String(imageList),
                  requestedBy: "shop",
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
      } else {
        window.scrollTo({ top: 150, behavior: "smooth" });
        setShowPostUpdate(true);
        setUpdateProductId(updatePostId);
        setShowAddProduct(false);
      }
    }
  };

  const deleteProduct = async (id: any) => {
    try {
      const res = await axios.delete(
        `${serverUrl}/api/product/my/products/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      toast.success(`Product id ${id} Delete Successfully`);
      console.log(id);
      return getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="myshop__page">
      {show ? (
        shop.map((data: any) => {
          return (
            <UserShop
              shop_id={data.shop_id}
              shop_image={data.shop_image}
              shop_name={data.shop_name}
              budget={data.budget}
              category={data.category}
              key={data.shop_id}
            />
          );
        })
      ) : (
        <div
          style={{
            height: "100px",
            maxWidth: "1200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {showAddProduct && (
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
      )}
      {showPostUpdate && (
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
      )}
      <div className="myshop__products__container">
        <h1 style={{ paddingTop: "20px", textAlign: "center" }}>My Products</h1>
        {productData
          ? productData.map((item: any) => {
              return (
                <MyShopCardComponent
                  product_id={item.product_id}
                  product_image={item.product_image}
                  title={item.title}
                  price={item.price}
                  product_description={item.product_description}
                  onDelete={deleteProduct}
                  onUpdate={UpdateProduct}
                />
              );
            })
          : "loading"}
      </div>
    </div>
  );
};
