/* eslint-disable no-loop-func */
import React, { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useHistory } from "react-router-dom";

toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const CreateShopPage: FC = () => {
  const [shopName, setShopName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [shopImage, setShopImage] = useState<any>([]);

  const history = useHistory();

  const CreateShop = () => {
    const data = new FormData();
    data.append("file", shopImage[0].file);
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
        console.log(data);
        console.log(data.url);
        toast.success("Image Uploaded");
        fetch("/api/shop/add/shop", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            shopName,
            category,
            budget,
            shopImage: data.url,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            if (result.success) {
              toast.success("shop Add Successfully");
              localStorage.setItem("shop", result);
              history.push("/my/shop");
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="myshop__page">
      <div className="myshop__page__shop__add_product">
        <div className="settings__page">
          <div className="auth-card">
            <h3>Create Shop</h3>
            <input
              type="text"
              placeholder="shop name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <input
              type="number"
              placeholder="shop category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="number"
              placeholder="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
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
            <button className="signinbutton" onClick={() => CreateShop()}>
              Create Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
