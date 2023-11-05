# @muriukialex/react-infinite-scroll

A custom React hook for implementing infinite scroll functionality with ease. This hook simplifies the process of setting up an Intersection Observer for infinite scrolling in your React application.

## Installation

To use this hook in your React project, follow these steps:

1. Install it using npm or yarn:

    ```bash
    npm install @muriukialex/react-infinite-scroll
    # or
    yarn add @muriukialex/react-infinite-scroll
    ```

2. Import and use the `useInfiniteScroll` hook in your React component.

```javascript
import useInfiniteScroll from '@muriukialex/react-infinite-scroll'

// ... (your component code)
```

## Usage

Here's how to use the `useInfiniteScroll` hook in your React component:

```javascript
import { useState, useRef } from 'react'
import useInfiniteScroll from '@muriukialex/react-infinite-scroll'

// ... (your other imports)

const defaultParams = {
	_start: 0,
	_limit: 10,
}

export default function App() {
	const [params, updateParams] = useState(defaultParams)
	const { isLoading, items } = usePosts({ params })
	const targetRef = useRef(null)

	const onLoadMore = () => {
		if (params._start > 95) {
			return
		}
		updateParams(prev => ({
			_start: prev._start + 10,
			_limit: prev._limit,
		}))
	}

	const [isVisible] = useInfiniteScroll({ targetRef, onLoadMore })

	if (isLoading && items.length === 0) return <h2>Is loading</h2>

	return (
		<div className='App container'>
			<div className='floating'>{isVisible ? <span>✅ Element Visible</span> : <span>❌ Element Not Visible</span>}</div>
			<h1>Infinite Scroll Example</h1>
			<Items items={items} />
			{isLoading && <div className='loader'>Is loading...</div>}
			{params._start < 95 ? <div ref={targetRef} /> : <h4>Reached end</h4>}
		</div>
	)
}
```

## API

### `useInfiniteScroll(options: useInfiniteScrollProps): boolean`

-   `options`: An object containing the following properties:

    -   `targetRef` (required): A React ref to the target element that triggers the infinite scroll when it becomes visible in the viewport.
    -   `onLoadMore` (required): A callback function to execute when the target element becomes visible, indicating the need to load more content.
    -   `options` (optional): An object containing configuration options for the Intersection Observer. The default values are used if not provided.

-   Returns a boolean value, `isVisible`, which indicates whether the target element is currently visible in the viewport.

## License

This project is licensed under the ISC License.

## Author

[muriukialex](https://github.com/muriukialex)
