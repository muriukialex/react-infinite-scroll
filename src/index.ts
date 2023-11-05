import { useState, useEffect } from 'react'

interface useInfiniteScrollProps {
	targetRef: any
	onLoadMore: () => void
	options?: IntersectionObserverInit
}

const defaultOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 1,
}

const useInfiniteScroll = ({ targetRef, onLoadMore, options = defaultOptions }: useInfiniteScrollProps) => {
	const [isVisible, setIsVisible] = useState(false)
	const observer = new IntersectionObserver(entries => {
		const [entry] = entries
		if (entry.isIntersecting) {
			setIsVisible(true)
			onLoadMore()
		} else {
			setIsVisible(false)
		}
	}, options)

	useEffect(() => {
		if (targetRef.current) observer.observe(targetRef.current)

		return () => {
			if (targetRef.current) observer.unobserve(targetRef.current)
		}
	}, [targetRef.current])

	return [isVisible]
}

export default useInfiniteScroll
