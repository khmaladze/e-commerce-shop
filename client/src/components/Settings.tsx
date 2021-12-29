import React, { FC, useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
toast.configure();
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export const Settings: FC = () => {
  const history = useHistory();

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
        toast.success("SETTINGS UPDATED SUCCESSFULLY");
        console.log(newUrl);
      })
      .catch((err) => {
        console.log(err);
      });
    // fetch(`/api/user/user?Id=${userId}`, {
  };

  useEffect(() => {
    if (newUrl) {
      if (userId) {
        // fetch(`/api/user/user?Id=${userId}`, {
        fetch(`/api/user/profile/update/${userId}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            country,
            userAddress,
            userImage: newUrl,
            userPassword,
            confirmPassword,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.detail) {
              toast.warn(data.detail[0].message);
            }
            if (data.success) {
              dispatch({
                type: "UPDATE",
                payload: {
                  country: data.user.country,
                  user_address: data.user.user_address,
                  user_password: data.user.user_password,
                  user_image: data.user.user_image,
                },
              });
              localStorage.setItem("user", JSON.stringify(data.user));
              toast.success("SETTINGS UPDATED SUCCESSFULLY");
              history.push("/profile");
            }
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });

  const PostUpdate = () => {
    fetch(`/api/user/profile/update/${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        country,
        userAddress,
        userImage: "same",
        userPassword,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.detail) {
          toast.warn(data.detail[0].message);
        }
        if (data.success) {
          dispatch({
            type: "UPDATE",
            payload: {
              country: data.user.country,
              user_address: data.user.user_address,
              user_password: data.user.user_password,
              user_image: data.user.user_image,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("SETTINGS UPDATED SUCCESSFULLY");
          history.push("/profile");
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
