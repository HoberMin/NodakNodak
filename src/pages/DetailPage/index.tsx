import PostContent from './PostContent';
import PostComment from './PostComment';
import { useSelectedPost } from './useSelectedPost';
import { useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch, RootState } from '@/store';
import { getPostDetail } from '@/slices/postDetail';
import { getMyInfo } from '@/slices/user';

const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myInfo = useSelector((state: RootState) => state.userInfo.authUser);
  const postDetail = useSelectedPost();
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getPostDetail({ postId }));
  }, [dispatch, postId]);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/sign');
    } else {
      dispatch(getMyInfo({ token }));
    }
  }, [navigate, dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {postDetail?.author?._id === myInfo?._id ? (
        <button style={{ border: '3px solid' }}>수정하기</button>
      ) : null}
      <PostContent />
      <Outlet />
      <PostComment />
    </div>
  );
};

export default DetailPage;
