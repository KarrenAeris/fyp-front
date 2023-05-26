import React from 'react'
import { TheModelItem } from './TheModelItem'

export const TheModels = ({ models }) => {
  return (
    <div className="md:container md:mx-auto px-10">
      <div className="flex justify-between pl-2 pr-2">
        <h2 className="text-2x1 text-gray-900">Our Work</h2>
        <h2 className="font-bold text-2x1">Parts & Specifications</h2>
      </div>
      <div className="flex-column justify-around">
        {models.map((model, i) => <TheModelItem key={i} model={model} id={i}/>)}
        {/* {<TheModelItem  />} */}
      </div>
    </div>
  )
}
