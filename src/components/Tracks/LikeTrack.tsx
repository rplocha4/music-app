import React, { useEffect, useState } from 'react';
import { TrackItem } from '../../types/types';
import {
  useIsLikingTrackQuery,
  useLikeTrackMutation,
  useUnlikeTrackMutation,
} from '../../store/features/ServerApi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { showInfo } from '../../store/uiSlice';
import { Song } from '../../store/playerSlice';

const LikeTrack: React.FC<{
  track: TrackItem | Song;
}> = ({ track }) => {
  const [likeSong, resultLike] = useLikeTrackMutation();
  const [unlikeSong, resultUnlike] = useUnlikeTrackMutation();
  const { data, refetch } = useIsLikingTrackQuery(track.id);
  const [likedTrack, setLikedTrack] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLikedTrack(data?.isLiking || false);
  }, [data]);

  const likeTrack = () => {
    setLikedTrack(true);
    likeSong(track).then((res: any) => {
      dispatch(showInfo(res.data.message));
      refetch();
    });
  };
  const unlikeTrack = () => {
    setLikedTrack(false);
    unlikeSong(track.id).then((res: any) => {
      dispatch(showInfo(res.data.message));
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
