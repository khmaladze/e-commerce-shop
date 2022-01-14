import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const ProductDetailPage = () => {
  const productId = useParams();
  const [data, setData] = useState<[]>([]);
  const [firstImage, setFirstImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const [mainImage, setMainImage] = useState(firstImage);

  const imageSlice = (img: string) => {
    let arr = img?.split(",");
    if (arr[0]) {
      setFirstImage(arr[0]);
      setMainImage(arr[0]);
    }
    if (arr[1]) {
      setSecondImage(arr[1]);
    }
    if (arr[2]) {
      setThirdImage(arr[2]);
    }
  };

  const getProductById = async (productId: string | number | any) => {
    try {
      const res = await axios.get(`/api/product/get/product/${productId}`);
      setData(res.data.product);
      imageSlice(res.data.product[0].product_image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById(productId.productId);
  }, []);

  return (
    <div>
      <Wrapper>
        <div className="section section-center page">
          <div>
            {data.map((item: any) => {
              return (
                <div key={item.product_id}>
                  <div className=" product-center">
                    <WrapperImage>
                      <div
                        style={{
                          backgroundImage: `url(${mainImage})`,
                        }}
                        className="main"
                      ></div>
                      <div className="gallery">
                        {firstImage && (
                          <img
                            src={firstImage}
                            onClick={() => setMainImage(firstImage)}
                            className={"active"}
                          />
                        )}
                        {secondImage && (
                          <img
                            src={secondImage}
                            onClick={() => setMainImage(secondImage)}
                            className={"active"}
                          />
                        )}
                        {thirdImage && (
                          <img
                            src={thirdImage}
                            onClick={() => setMainImage(thirdImage)}
                            className={"active"}
                          />
                        )}
                      </div>
                    </WrapperImage>
                    <section className="content">
                      <h2>Product: {item.title}</h2>
                      <div style={{ height: "10px" }}></div>
                      <h5 className="price">Price: {item.price}$</h5>
                      <div style={{ height: "10px" }}></div>
                      <p className="desc">{item.product_description}</p>
                      <div style={{ height: "10px" }}></div>
                      {item.product_count == 1 ? (
                        <p className="info">
                          <span> Only 1 item Left</span>
                        </p>
                      ) : (
                        <p className="info">
                          <span>Available : </span>
                          {item.product_count > 0 ? "In stock" : "out of stock"}
                        </p>
                      )}
                      <div style={{ height: "20px" }}></div>
                      <hr />
                      <Stack
                        spacing={2}
                        direction="row"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <Button variant="contained" style={{ width: "45%" }}>
                          Buy Now
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            width: "45%",
                          }}
                        >
                          Add To Cart <AiOutlineShoppingCart />
                        </Button>
                      </Stack>
                    </section>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const WrapperImage = styled.section`
  .main {
    height: auto;
    max-height: 500px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  img {
    width: 100%;
    display: block;
    border-radius: 10px;
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 1px solid #9e9e9e;
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 576px) {
    .main {
      height: 500px;
      width: 100%;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  .product-center {
    display: grid;
    width: 95%;
    gap: 4rem;
    margin: 0 auto;
    margin-top: 2rem;
  }
  .price {
    color: blue;
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;
