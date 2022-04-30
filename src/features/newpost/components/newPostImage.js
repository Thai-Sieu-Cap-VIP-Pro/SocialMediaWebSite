import React, { useState } from "react";
import { AddAPhotoOutlined } from "@material-ui/icons";
import axios from "axios";

const NewpostImage = () => {
  const [listImg, setlistImg] = useState([]);

  const imgHandleChange = async (e) => {
    console.log(e.target.files);

    const imageData = new FormData();
    imageData.append("api_key", "711435673899525");
    imageData.append("file", e.target.files[0]);
    imageData.append("upload_preset", "socialnetwork");
    imageData.append("cloud_name", "wjbucloud");
    const url = (
      await axios.post(
        "https://api.cloudinary.com/v1_1/wjbucloud/image/upload",
        imageData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
    ).data.url;

    console.log(url);
  };

  return (
    <div className="newImg">
      <div className="newImg_add">
        <form action="" encType="multipart/form-data">
          <input
            type="file"
            multiple
            name=""
            id="cImg"
            onChange={imgHandleChange}
          />
          <label htmlFor="cImg">
            <AddAPhotoOutlined />
          </label>
        </form>
      </div>

      <div className="newImg_listImg"></div>
    </div>
  );
};

export default NewpostImage;
