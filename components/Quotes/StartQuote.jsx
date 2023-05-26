import Link from 'next/link'
import React from 'react'
import { AppButton } from '../core/AppButton'

export const StartQuote = ({ handleInc }) => {
  return (
    <div className="mt-20 flex justify-center items-center w-full h-[70%] rounded-xl bg-gray-400">
      <div className="flex flex-col text-center gap-3 text-white">
        <h2>Start a new quote</h2>
        <span>Find out the price of 3D printing for your project</span>
        <AppButton className="!bg-white !text-black text-sm !rounded self-center" onClick={() => handleInc(1)}>
          Find out
        </AppButton>
      </div>
    </div>
  )
}
