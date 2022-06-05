import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfile, selectProfiles } from '../app/store/slices/authSlice';
import { PROPS_LIKEUSER } from '../app/store/types';

export const Likeuser: React.FC<PROPS_LIKEUSER> = ({ likeuser }) => {
  const profiles = useSelector(selectProfiles);
  const likeuserprofile = profiles.filter((profile) => {
    return profile.profileUser === likeuser;
  });
  const likeuserprofileids = likeuserprofile.map((obj) => obj.id);
  const likeuserprofileid = likeuserprofileids[0];

  return (
    <>
      <Link href={`/profile/${likeuserprofileid}`} passHref>
        <div className='text-red-600'>{likeuser}</div>
      </Link>
    </>
  );
};
