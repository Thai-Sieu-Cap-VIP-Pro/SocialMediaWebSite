import React, { useState } from 'react';
import { AddAPhotoOutlined } from '@material-ui/icons';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { Close } from '@material-ui/icons';
import useImageUpload from '../../../hooks/useImageUpload';

const NewpostImage = () => {
    const [listImg, setlistImg] = useState([]);
    const imageUpload = useImageUpload();
    const imgHandleChange = async (e) => {
        console.log(e.target.files);
        Array.from(e.target.files).forEach(async (file) => {
            const url = await imageUpload(file);
            setlistImg((prev) => [...prev, url]);
        });
    };

    const handleDropImage = (url) => {
        setlistImg((prev) => {
            return prev.filter((item) => item !== url);
        });
    };

    return (
        <div className="newImg">
            <div className="newImg_add">
                <form action="" encType="multipart/form-data">
                    <input type="file" multiple name="" id="cImg" onChange={imgHandleChange} />
                    <label htmlFor="cImg">
                        <AddAPhotoOutlined />
                    </label>
                </form>
            </div>

            <div className="newImg_listImg">
                {/* <Image cloudName="wjbucloud" publicId={listImg} /> */}
                {listImg.map((item, index) => {
                    return (
                        <div className="newImg_listImg_singleImg">
                            <div className="newImg_listImg_singleImg_closeIcon">
                                <Close onClick={() => handleDropImage(item)} />
                            </div>
                            <img src={item} key={index} alt="imagePosthihi" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NewpostImage;
