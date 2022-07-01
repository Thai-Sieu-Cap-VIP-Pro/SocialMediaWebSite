import axios from 'axios';

const useVideoUpload = () => {
    return async (file) => {
        const videoData = new FormData();
        videoData.append('api_key', '711435673899525');
        videoData.append('file', file);
        videoData.append('upload_preset', 'socialnetwork');
        videoData.append('cloud_name', 'wjbucloud');
        const url = (
            await axios.post('https://api.cloudinary.com/v1_1/wjbucloud/video/upload', videoData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
        ).data.url;
        return url;
    };
};

export default useVideoUpload;
