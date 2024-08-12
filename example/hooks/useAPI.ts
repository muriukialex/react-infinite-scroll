import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useImmer } from 'use-immer';
import useSWR from 'swr';

const endpoint = 'https://jsonplaceholder.typicode.com/posts';

interface ParamsType {
  _start: number;
  _limit: number;
}

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Posts = PostType[];

const getPosts = ({ params }: { params: ParamsType }) => {
  return axios.get(endpoint, { params });
};

const usePosts = ({ params }: { params: ParamsType }) => {
  const { data, isLoading } = useSWR(params, params => getPosts({ params }));
  const [items, setItems] = useImmer([]);

  const updateItems = useCallback(
    (newItems: Posts) => {
      const uniqueNewItems = newItems.filter(
        (newItem: PostType) =>
          !items.some((item: PostType) => item.id === newItem.id)
      );

      // Push only unique new items
      setItems((draft: Posts) => {
        draft.push(...uniqueNewItems);
      });
    },
    [setItems, items]
  );

  useEffect(() => {
    if (!isLoading) {
      updateItems(data?.data);
    }
  }, [isLoading, data?.data, updateItems]);

  return {
    isLoading,
    data,
    items,
  };
};

export default usePosts;
