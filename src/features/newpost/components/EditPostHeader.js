import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePost } from '../../home/homeSlice';
import './newcomponent.scss';

const UpdatePostHeader = ({ listImg, content, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ listImg, content });
  const handleCreatePost = async () => {
    try {
      const result = await dispatch(
        updatePost({ images: listImg, content, postId })
      ).unwrap();
      console.log({ result });
      alert(result.message);
      navigate('/account');
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="newHeader">
      <h6>Chỉnh sửa bài viết</h6>
      <button onClick={() => handleCreatePost()}>Cập nhật</button>
    </div>
  );
};

export default UpdatePostHeader;
