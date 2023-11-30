import React from 'react'

export default function PageLayout({ children, isFullWidth = false }) {

	return (
		<div className={`pt-4 ${ isFullWidth ? '' : 'container' }`}>{ children }</div>
	)
}