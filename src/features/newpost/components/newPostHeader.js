import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../home/homeSlice';
import { updatePost } from '../../home/homeSlice';
import './newcomponent.scss';

const NewpostHeader = ({ listImg, content, isUpdate, postId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCreatePost = async () => {
        try {
            const listUrl = listImg.map((item) => item.url);
            const result = await dispatch(createPost({ images: listUrl, content })).unwrap();
            console.log({ result });
            alert(result.message);
            navigate('/');
        } catch (error) {
            throw error;
        }
    };

    const handleUpdatePost = async () => {
        try {
            const listUrl = listImg.map((item) => item.url);
            const result = await dispatch(updatePost({ images: listUrl, content, postId })).unwrap();
            console.log({ result });
            alert(result.message);
            navigate('/account');
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="newHeader">
            <h6>Tạo bài viết mới</h6>
            {!isUpdate ? (
                <button className={`${listImg.length === 0 ? 'disabled' : ''}`} onClick={handleCreatePost}>
                    Chia sẻ
                </button>
            ) : (
                <button className={`${listImg.length === 0 ? 'disabled' : ''}`} onClick={handleUpdatePost}>
                    Cập nhật
                </button>
            )}
        </div>
    );
};

export default NewpostHeader;
