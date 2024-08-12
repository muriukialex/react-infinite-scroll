import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { useState, useRef } from 'react';
import './styles.css';
import usePosts from './hooks/useAPI';
import useInfiniteScroll from '@muriukialex/react-infinite-scroll';
import { Items } from './components';

const defaultParams = {
  _start: 0,
  _limit: 10,
};

export default function App() {
  const [params, updateParams] = useState(defaultParams);
  const { isLoading, items } = usePosts({ params });
  const targetRef = useRef(null);

  const onLoadMore = () => {
    if (params._start >= 95) {
      return;
    }
    updateParams(prev => ({
      ...prev,
      _start: prev._start + 10,
    }));
  };

  const [isVisible] = useInfiniteScroll({ targetRef, onLoadMore });

  if (isLoading && items.length === 0) return <h2>Is loading</h2>;
  return (
    <div className="App container">
      <div className="floating">
        {isVisible ? (
          <span>✅ element visible</span>
        ) : (
          <span>❌ element not visible</span>
        )}
      </div>
      <h1>Infinite scroll example</h1>
      <Items items={items} />
      {isLoading && <div className="loader">is loading...</div>}
      {params._start !== 95 && !isLoading ? (
        <div ref={targetRef}>_</div>
      ) : (
        <h4>Reached end</h4>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
