import React, { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { imageFormat } from "../components/MyShop";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const AddUserProducts = () => {
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

  useEffect(() => {
    fetch("/api/product/my/products/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.products);
        setProductData(result.products);
      });
  }, []);
  const getData = () => {
    fetch("/api/product/my/products/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("now update", result.products);
        setProductData(result.products);
      });
  };

  const AddProduct = () => {
    if (
      !title ||
      !category ||
      !description ||
      !price ||
      !productCount ||
      !image[0]
    ) {
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
            fetch("/api/product/add/product", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
              body: JSON.stringify({
                title,
                productDescription: description,
                category,
                price,
                productCount,
                productImage: data.url,
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
                  return getData();
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
                fetch("/api/product/add/product", {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                  },
                  body: JSON.stringify({
                    title,
                    productDescription: description,
                    category,
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
                      return getData();
                    }
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  const UpdateProduct = (updatePostId: string | number) => {
    if (
      !title ||
      !category ||
      !description ||
      !price ||
      !productCount ||
      !image[0]
    ) {
      toast.warn("Please add minumum one filed");
    }
    if (
      !image[0] &&
      (title || description || category || price || productCount)
    ) {
      fetch(`/api/product/my/user/products/${updatePostId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          productDescription: description,
          category,
          price,
          productCount,
          productImage: imageUrl,
          requestedBy: "user",
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
            fetch(`/api/product/my/user/products/${updatePostId}`, {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
              body: JSON.stringify({
                title,
                productDescription: description,
                category,
                price,
                productCount,
                productImage: data.url,
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
                  category,
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
      } else {
        setShowPostUpdate(true);
        setUpdateProductId(updatePostId);
        setShowAddProduct(false);
      }
    }
  };

  const deleteProduct = (id: any) => {
    fetch(`/api/product/my/products/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success(`Product id ${id} Delete Successfully`);
        return getData();
      });
  };
  return (
    <div>
      <div className="myshop__page">
        {showAddProduct ? (
          <div className="myshop__page__shop__add_product">
            <div className="settings__page">
              <div className="auth-card">
                <h3>Add Product</h3>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder=" Enter Your Text Here..."
                  style={{
                    marginTop: "10px",
                    height: "200px",
                    maxHeight: "250px",
                    maxWidth: "755px",
                    width: "90%",
                    padding: "10px",
                  }}
                ></textarea>
                <input
                  type="text"
                  placeholder="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="price $"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="product Count"
                  value={productCount}
                  onChange={(e) => setProductCount(e.target.value)}
                />
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
                <button className="signinbutton" onClick={() => AddProduct()}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {showPostUpdate ? (
          <div className="myshop__page__shop__add_product">
            <div className="settings__page">
              <div className="auth-card">
                <h3>Update Product</h3>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder=" Enter Your Text Here..."
                  style={{
                    marginTop: "10px",
                    height: "200px",
                    maxHeight: "250px",
                    maxWidth: "755px",
                    width: "90%",
                    padding: "10px",
                  }}
                ></textarea>
                <input
                  type="number"
                  placeholder="price $"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="product Count"
                  value={productCount}
                  onChange={(e) => setProductCount(e.target.value)}
                />
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
                <button
                  className="signinbutton"
                  onClick={() => UpdateProduct(updateProductId)}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="myshop__products__container">
          <h1 style={{ paddingTop: "20px", textAlign: "center" }}>
            My Products
          </h1>
          {productData
            ? productData.map((item: string | any) => {
                return (
                  <div>
                    <div
                      id={item.product_id}
                      className="myshop__products__card"
                      key={item.product_id}
                    >
                      <div
                        className="myshop__produts__card__image"
                        style={{
                          backgroundImage: `url(${imageFormat(
                            item.product_image
                          )})`,
                        }}
                      ></div>
                      <div className="myshop__products__card__content">
                        <h3>{item.title}</h3>
                        <h4>{item.product_description.substring(0, 30)}...</h4>
                        <h5>Price: {item.price}$</h5>
                      </div>
                      <AiOutlineDelete
                        onClick={() => deleteProduct(item.product_id)}
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          marginRight: "5px",
                        }}
                      />
                      <AiOutlineEdit
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          marginLeft: "5px",
                        }}
                        onClick={() => UpdateProduct(item.product_id)}
                      />
                    </div>
                  </div>
                );
              })
            : "loading"}
        </div>
      </div>
      );
    </div>
  );
};
