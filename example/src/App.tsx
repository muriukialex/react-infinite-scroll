import { useState, useRef } from 'react'
import './styles.css'
import usePosts, { Posts } from './useAPI'
import useInfiniteScroll from '@muriukialex/react-infinite-scroll'

const defaultParams = {
	_start: 0,
	_limit: 10,
}

const Items = ({ items }: { items: Posts }) => {
	return items.map(item => (
		<div key={item.id} className='itemsContainer'>
			<h4>{item.title}</h4>
			<span>{item.body}</span>
		</div>
	))
}

export default function App() {
	const [params, updateParams] = useState(defaultParams)
	const { isLoading, items } = usePosts({ params })
	const targetRef = useRef(null)

	const onLoadMore = () => {
		if (params._start >= 95) {
			return
		}
		updateParams(prev => ({
			...prev,
			_start: prev._start + 10,
		}))
	}

	const [isVisible] = useInfiniteScroll({ targetRef, onLoadMore })

	if (isLoading && items.length === 0) return <h2>Is loading</h2>
	return (
		<div className='App container'>
			<div className='floating'>{isVisible ? <span>✅ element visible</span> : <span>❌ element not visible</span>}</div>
			<h1>Infinite scroll example</h1>
			<Items items={items} />
			{isLoading && <div className='loader'>is loading...</div>}
			{params._start < 95 && !isLoading ? <div ref={targetRef} /> : <h4>Reached end</h4>}
		</div>
	)
}
