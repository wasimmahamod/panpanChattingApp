import React from 'react';
import {BsSearch,BsThreeDotsVertical} from 'react-icons/bs'

const Search = () => {
  return (
    <div className='relative'>
        <BsSearch className='absolute top-5 left-5 text-xl'/>
        <input className='w-full rounded-xl py-4 pl-20 placeholder:font-poppins text-base drop-shadow-lg	' type="text" placeholder='Search'/>
        <BsThreeDotsVertical className='absolute top-5 right-3 text-xl'/>
    </div>
  )
}

export default Search