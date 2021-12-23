import React, { FC, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const MyShop: FC = () => {
  const { state, dispatch } = useContext(UserContext);
  const [shop, setShop] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productCount, setProductCount] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  useEffect(() => {
    console.log("hello world");
    fetch("http://localhost:5000/api/shopRoute/my/shop", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.shopList[0]);
        setShop(result.shopList);
        console.log(shop);
        setShow(true);
        console.log(shop[0]?.category);
      });
  }, []);

  const AddProduct = () => {
    fetch("localhost:5000/api/productRoute/add/product", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        productDescription: description,
        category: shop[0]?.category,
        price,
        productCount,
        image,
        requestedBy: "shop",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("Product Add Successfully");
        }
      });
  };
  console.log(image);
  console.log(shop);
  const dataformat = (num: number) => {
    if (num == 1) return "ELECTRONICS";
    if (num == 2) return "HOME";
    if (num == 3) return "FASHION";
    if (num == 4) return "SPORT";
    if (num == 5) return "ITEM";
  };
  return (
    <div className="myshop__page">
      {show
        ? shop.map((data: any) => {
            return (
              <div className="myshop__page__shop__header" key={data.shop_id}>
                <div
                  className="myshop__page__image"
                  style={{
                    backgroundImage: `url(${data.shop_image})`,
                  }}
                ></div>
                <div className="myshop__content">
                  <h4>shop_name: {data.shop_name}</h4>
                  <h4>balance: {data.budget}$</h4>
                  <h4>category: {dataformat(data.category)}</h4>
                </div>
              </div>
            );
          })
        : "loading"}
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
                maxFiles={5}
                onupdatefiles={setImage}
                name="files"
                labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
              />
            </div>

            <button
              className="signinbutton"
              // onClick={() => handleClick(false)}
            >
              Update
            </button>

            {/* <button className="signinbutton" onClick={() => PostUpdate()}>
          Update
        </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
