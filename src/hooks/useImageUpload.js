import axios from 'axios';

const useImageUpload = () => {
    return async (file) => {
        const imageData = new FormData();
        imageData.append('api_key', '711435673899525');
        imageData.append('file', file);
        imageData.append('upload_preset', 'socialnetwork');
        imageData.append('cloud_name', 'wjbucloud');
        const url = (
            await axios.post('https://api.cloudinary.com/v1_1/wjbucloud/video/upload', imageData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
        ).data.url;
        return url;
    };
};

export default useImageUpload;
