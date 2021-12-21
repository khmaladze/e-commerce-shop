import React, { FC } from "react";
import { Carusel } from "../components/Carusel";
import { LatestUploads } from "../components/LatestUploads";
import { LowestPrice } from "../components/LowestPrice";
import { PopularCategories } from "../components/PopularCategories";
import { PopularShops } from "../components/PopularShops";
import { Sale } from "../components/Sale";
//  <main>
//       <Navbar />
//       <Carusel />
//       <PopularShops />
//       <PopularCategories />
//       <LatestUploads />
//       <LowestPrice />
//       <Sale />
//       <Footer />
//     </main>
export const MainPage: FC = () => {
  return (
    <div>
      <Carusel />
      <PopularShops />
      <PopularCategories />
      <LatestUploads />
      <LowestPrice />
      <Sale />
    </div>
  );
};
