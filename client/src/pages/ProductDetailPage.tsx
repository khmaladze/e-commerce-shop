import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductDetailPage = () => {
  const productId = useParams();
  const [data, setData] = useState<[]>([]);
  useEffect(() => {
    const getProductById = async (productId: string | number | any) => {
      try {
        console.log(productId);
        const res = await axios.get(`/api/product/get/product/${productId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        console.log(res);
        setData(res.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    getProductById(productId.productId);
  }, []);
  return (
    <div>
      <div>
        {data.map((item: any) => {
          return <div key={item.product_id}>hello world `{item.title}`</div>;
        })}
      </div>
    </div>
  );
};
