import React from 'react';
import { AddAPhotoOutlined } from '@material-ui/icons';
import { Close } from '@material-ui/icons';
import useImageUpload from '../../../hooks/useImageUpload';
import useVideoUpload from '../../../hooks/useVideoUpload';

const NewpostImage = ({ listImg, setlistImg }) => {
    const imageUpload = useImageUpload();
    const videoUpload = useVideoUpload();
    const imgHandleChange = async (e) => {
        Array.from(e.target.files).forEach(async (file) => {
            if (file.size <= 52428800) {
                if (file.type.includes('image')) {
                    const url = await imageUpload(file);
                    setlistImg((prev) => [...prev, { url, type: 'image' }]);
                } else {
                    const url = await videoUpload(file);
                    setlistImg((prev) => [...prev, { url, type: 'video' }]);
                }
            } else {
                alert('Kích thước của file quá lớn!!!');
            }
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
                    <input
                        type="file"
                        multiple
                        name=""
                        id="cImg"
                        onChange={imgHandleChange}
                        accept="video/mp4, image/*"
                    />
                    <label htmlFor="cImg">
                        <AddAPhotoOutlined />
                    </label>
                </form>
            </div>

            <div className="newImg_listImg">
                {/* <Image cloudName="wjbucloud" publicId={listImg} /> */}
                {listImg.map((item, index) => {
                    return (
                        <div className="newImg_listImg_singleImg" key={index}>
                            <div className="newImg_listImg_singleImg_closeIcon">
                                <Close onClick={() => handleDropImage(item)} fontSize="small" />
                            </div>
                            {item.type === 'image' ? (
                                <img src={item.url} key={index} alt="imagePosthihi" loading="lazy" />
                            ) : item.type === 'video' ? (
                                <video src={item.url} key={index}></video>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NewpostImage;
