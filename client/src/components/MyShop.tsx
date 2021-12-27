import React, { FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

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
