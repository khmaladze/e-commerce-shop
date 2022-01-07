import React, { FC, useState, useContext, useEffect } from "react";
import { serverUrl, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const Settings: FC = () => {
  const history = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  const [country, setCountry] = useState<string>(state?.country);
  const [userAddress, setUserAddress] = useState<string>(state?.user_address);
  const [userPassword, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newUserImage, setNewUserImage] = useState<any | []>([]);
  const userId = state?.user_id;
  const [newUrl, setNewUrl] = useState("");
  console.log(newUserImage);
  console.log(newUserImage[0]);
  console.log(newUserImage.length);

  interface UserUpdate {
    country: string;
    userAddress: string;
    userImage: string;
    userPassword: string;
    confirmPassword: string;
  }

  const PostUpdateWithImage = () => {
    const data = new FormData();
    data.append("file", newUserImage[0].file);
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
        setNewUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (newUrl && country && userAddress && userPassword && confirmPassword) {
      if (userId) {
        const putUserUpdate = async () => {
          try {
            const userUpdate: UserUpdate = {
              country,
              userAddress,
              userImage: newUrl,
              userPassword,
              confirmPassword,
            };
            const res = await axios.put(
              `${serverUrl}/api/user/profile/update/${userId}`,
              userUpdate,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
              }
            );
            if (res.status == 200) {
              dispatch({
                type: "UPDATE",
                payload: {
                  country: res.data.user.country,
                  user_address: res.data.user.user_address,
                  user_password: res.data.user.user_password,
                  user_image: res.data.user.user_image,
                },
              });
              localStorage.setItem("user", JSON.stringify(res.data.user));
              toast.success("SETTINGS UPDATED SUCCESSFULLY");
              history("/profile");
            }
          } catch (error: any) {
            console.log(error);
            console.log(error.response);
            if (error.response.data.detail[0].message) {
              toast.warn(error.response.data.detail[0].message);
            }
            if (error.response.data.message) {
              toast.warn(error.response.data.message);
            } else {
              toast.warn("Please Use Valid Credentials");
            }
          }
        };
        putUserUpdate();
      }
    } else {
      toast.warn("Please Add All The fields. only image could be empty");
    }
  }, [newUrl]);

  const PostUpdate = () => {
    const putUserUpdate = async () => {
      try {
        const userUpdate: UserUpdate = {
          country,
          userAddress,
          userImage: "same",
          userPassword,
          confirmPassword,
        };
        const res = await axios.put(
          `${serverUrl}/api/user/profile/update/${userId}`,
          userUpdate,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        if (res.status == 200) {
          dispatch({
            type: "UPDATE",
            payload: {
              country: res.data.user.country,
              user_address: res.data.user.user_address,
              user_password: res.data.user.user_password,
              user_image: res.data.user.user_image,
            },
          });
          console.log(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success("SETTINGS UPDATED SUCCESSFULLY");
          history("/profile");
        }
      } catch (error: any) {
        console.log(error);
        console.log(error.response);
        if (error.response.data.detail[0].message) {
          toast.warn(error.response.data.detail[0].message);
        }
        if (error.response.data.message) {
          toast.warn(error.response.data.message);
        } else {
          toast.warn("Please Use Valid Credentials");
        }
      }
    };
    putUserUpdate();
  };

  return (
    <div className="settings__page">
      <div className="auth-card">
        <h3>Update User Data</h3>
        <input
          type="text"
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password or enter new password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <FilePond
            files={newUserImage}
            allowMultiple={false}
            maxFiles={1}
            onupdatefiles={setNewUserImage}
            name="files"
            labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
          />
        </div>
        {newUserImage.length == 0 ? (
          <button className="signinbutton" onClick={() => PostUpdate()}>
            Update
          </button>
        ) : (
          <button
            className="signinbutton"
            onClick={() => PostUpdateWithImage()}
          >
            Update with image
          </button>
        )}
      </div>
    </div>
  );
};
