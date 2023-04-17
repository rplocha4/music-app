import React, { useEffect, useState } from 'react';
import { TrackItem } from '../../types/types';
import {
  useIsLikingTrackQuery,
  useLikeTrackMutation,
  useUnlikeTrackMutation,
} from '../../store/features/ServerApi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const LikeTrack: React.FC<{ track: TrackItem }> = ({ track }) => {
  const [likeSong, resultLike] = useLikeTrackMutation();
  const [unlikeSong, resultUnlike] = useUnlikeTrackMutation();
  const { data, refetch } = useIsLikingTrackQuery(track.id);
  const [likedTrack, setLikedTrack] = useState(data?.isLiking || false);

  useEffect(() => {
    data && setLikedTrack(data.isLiking);
  }, [data]);
  const likeTrack = () => {
    likeSong(track).then((res: any) => {
      console.log(res.data.message);
      refetch();
    });
  };
  const unlikeTrack = () => {
    refetch();
    unlikeSong(track.id).then((res: any) => {
      console.log(res.data.message);
      refetch();
    });
  };
  return (
    <>
      {!likedTrack ? (
        <AiOutlineHeart
          className="cursor-pointer text-xl "
          onClick={() => likeTrack()}
        />
      ) : (
        <AiFillHeart
          className="cursor-pointer text-xl text-green-500"
          onClick={() => unlikeTrack()}
        />
      )}
    </>
  );
};

export default LikeTrack;
