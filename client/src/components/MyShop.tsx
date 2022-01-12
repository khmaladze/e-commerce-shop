import axios from "axios";
import React, { FC } from "react";
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
