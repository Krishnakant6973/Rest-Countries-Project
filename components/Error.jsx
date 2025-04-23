import React from 'react'
import { useRouteError } from 'react-router'

export default function Error() {
    const err=useRouteError()
    console.log(err)
  return (
    <div className='page-not-found'>404 page Not Found</div>
  )
}
