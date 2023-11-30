import React from 'react'

export default function LoadingOrContent({isLoading, children}) {

	return (
		<>
			{ isLoading ? (
				<div className={'text-center'}>
					<span className="fa fa-spin fa-spinner fa-4x"></span>
				</div>
			) : (
				<>{ children }</>
			) }
		</>
	)
}