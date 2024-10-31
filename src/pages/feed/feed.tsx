import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getAllFeeds,
  getAllOrdersSelector
} from '../../services/slices/feedsSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const orders = useSelector(getAllOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getAllFeeds());
      }}
    />
  );
};
