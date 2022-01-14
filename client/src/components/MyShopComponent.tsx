import { FC } from "react";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { imageFormat } from "./MyShop";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface UserProduct {
  product_id: any;
  product_image: any;
  title: any;
  product_description: any;
  price: any;
  onDelete: any;
  onUpdate: any;
}

export const MyShopCardComponent: FC<UserProduct> = ({
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
