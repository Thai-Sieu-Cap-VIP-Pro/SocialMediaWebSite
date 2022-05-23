import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../home/homeSlice';
import './newcomponent.scss';

const NewpostHeader = ({ listImg, content }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCreatePost = async () => {
        try {
            const result = await dispatch(createPost({ images: listImg, content })).unwrap();
            console.log({ result });
            alert(result.message);
            navigate('/');
        } catch (error) {
            throw error;
        }
    };
    return (
        <div className="newHeader">
            <h6>Tạo bài viết mới</h6>
            <button onClick={handleCreatePost}>Chia sẻ</button>
        </div>
    );
};

export default NewpostHeader;
