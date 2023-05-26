import React from 'react'

export const Statistics = () => {
  return (
    <section className='flex items-center justify-between pb-10'>
      <div className='text-center'>
        <h2 className='text-5xl font-bold mb-3'>0</h2>
        <div className='h-[1px] w-[200px] mb-2 bg-black'></div>
        <p>Processing</p>
      </div>
      <div className='text-center'>
        <h2 className='text-5xl font-bold mb-3'>0</h2>
        <div className='h-[1px] w-[200px] mb-2 bg-black'></div>
        <p>Waiting</p>
      </div>
      <div className='text-center'>
        <h2 className='text-5xl font-bold mb-3 text-purple-600'>0</h2>
        <div className='h-[1px] w-[200px] mb-2 bg-purple-600'></div>
        <p>Printing</p>
      </div>
      <div className='text-center'>
        <h2 className='text-5xl font-bold mb-3'>0</h2>
        <div className='h-[1px] w-[200px] mb-2 bg-black'></div>
        <p>Completed</p>
      </div>
      <div className='text-center'>
        <h2 className='text-5xl font-bold mb-3'>0</h2>
        <div className='h-[1px] w-[200px] mb-2 bg-black'></div>
        <p>Shipping</p>
      </div>
    </section>
  )
}
