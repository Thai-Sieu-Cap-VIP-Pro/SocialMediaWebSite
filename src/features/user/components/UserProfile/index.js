import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../profileSlice';
import UserHeader from '../userHeader';

const UserProfile = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const action = getUserInfo();
    await dispatch(action);
  }, []);
  return (
    <>
      <UserHeader />
    </>
  );
};

export default UserProfile;
