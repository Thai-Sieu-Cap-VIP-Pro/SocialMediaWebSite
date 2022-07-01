import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../profileSlice';
import UserHeader from '../userHeader';
import UserPost from '../UserPost';

const UserProfile = () => {

  const activeId = useSelector(state => state.user.activeId)

  const dispatch = useDispatch();
  useEffect(async () => {
    const action = getUserById(activeId);
    await dispatch(action);
  }, [activeId]);
  return (
    <>
      <UserHeader />
      <UserPost />
    </>
  );
};

export default UserProfile;
