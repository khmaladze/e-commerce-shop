import axios from "axios";

interface UserLogin {
  email: string;
  userPassword: string;
}

interface UserRegister {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  userAddress: string;
  email: string;
  userPassword: string;
  userCard: string;
  cardPassword: string;
  budget: string;
  confirmPassword: string;
}

interface UserUpdate {
  country: string;
  userAddress: string;
  userImage: string;
  userPassword: string;
  confirmPassword: string;
}

interface Product {
  title: string;
  productDescription: string;
  category: string;
  price: string;
  productCount: string;
  productImage: string;
  requestedBy: string;
}

export const postUserLogin = async (email: string, password: string) => {
  const userLogin: UserLogin = {
    email,
    userPassword: password,
  };
  return await axios.post(`/api/auth/login`, userLogin);
};

export const postUserRegisterFunction = async (
  firstName: string,
  lastName: string,
  validDate: string,
  country: string,
  userAddress: string,
  email: string,
  userPassword: string,
  userCard: string,
  cardPassword: string,
  budget: string,
  confirmPassword: string
) => {
  const userRegister: UserRegister = {
    firstName,
    lastName,
    birthDate: validDate,
    country,
    userAddress,
    email,
    userPassword,
    userCard,
    cardPassword,
    budget,
    confirmPassword,
  };
  return await axios.post(`/api/auth/register`, userRegister);
};

export const postSettingUpdate = async (
  userId: string | number,
  country: string,
  userAddress: string,
  userPassword: string,
  confirmPassword: string
) => {
  const userUpdate: UserUpdate = {
    country,
    userAddress,
    userImage: "same",
    userPassword,
    confirmPassword,
  };
  return await axios.put(`/api/user/profile/update/${userId}`, userUpdate, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
};

export const postSettingUpdateWithImage = async (
  userId: string | number,
  country: string,
  userAddress: string,
  newUrl: string,
  userPassword: string,
  confirmPassword: string
) => {
  const userUpdate: UserUpdate = {
    country,
    userAddress,
    userImage: newUrl,
    userPassword,
    confirmPassword,
  };
  return await axios.put(`/api/user/profile/update/${userId}`, userUpdate, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
};

export const postCreateProductForUser = async (
  title: string,
  description: string,
  category: string,
  price: string,
  productCount: string,
  ImageOne: string
) => {
  try {
    const postData: Product = {
      title,
      productDescription: description,
      category,
      price,
      productCount,
      productImage: String(ImageOne),
      requestedBy: "user",
    };
    return await axios.post("/api/product/add/product", postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

interface ProductUpdate {
  title: string;
  productDescription: string;
  price: string;
  productCount: string;
  productImage: string;
  requestedBy: string;
}

export const putUserProductUpdate = async (
  updatePostId: string,
  title: string,
  description: string,
  price: string,
  productCount: string,
  ImageOne: string
) => {
  try {
    const uploadData: ProductUpdate = {
      title,
      productDescription: description,
      price,
      productCount,
      productImage: String(ImageOne),
      requestedBy: "user",
    };
    return await axios.put(
      `/api/product/my/user/products/${updatePostId}`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
