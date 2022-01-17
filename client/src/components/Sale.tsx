import React, { FC, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { imageFormat } from "./MyShop";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

export const Sale: FC = () => {
  const [data, setData] = useState<[]>([]);
  const getData = async () => {
    try {
      const res = await axios.get("/api/product/get/sale");
      setData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const randomPrice = (number: number) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return Number(randomNumber + number);
  };
  return (
    <div>
      <h1 className="container__shop__text">Sale</h1>
      <div className="container__shop" style={{ paddingTop: "25px" }}>
        {data.slice(0, 3).map((item: any) => {
          return (
            <div
              style={{
                maxWidth: "345px",
                width: "100%",
                margin: "0 auto",
                padding: "15px",
              }}
              key={item.product_id}
            >
              <Fade>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    style={{ objectFit: "contain", padding: "5px" }}
                    component="img"
                    height="140"
                    image={`${imageFormat(item.product_image)}`}
                    alt="justimage"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.product_description.substring(0, 50)}...
                    </Typography>
                    <Typography variant="body1" color="red">
                      Old Price: {randomPrice(Number(item.price))}$
                    </Typography>
                    <Typography variant="body1" color="blue">
                      New Price: {item.price}$
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <Link to={`/product/${item.product_id}`}>Learn More</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Fade>
            </div>
          );
        })}
      </div>
    </div>
  );
};
