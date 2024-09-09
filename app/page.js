'use client'

import Link from 'next/link'
import React, { useState } from 'react'

const HomePage = () => {
  const [roomId, setRoomId] = useState('')

  return (
    <div className="h-screen flex items-center flex-col justify-center">
      <h1 className="text-[27px] mb-[1rem] md:text-[35px] lg:text-[50px] text-center font-bold leading-[4rem] text-blue-600">
        Video Call Application Using <br /> ZEGOCLOUD
      </h1>
      
      <input
        type="text"
        placeholder="Enter Room ID"
        className="px-8 py-3 w-[50%] rounded-none bg-gray-300"
        onChange={(e) => setRoomId(e.target.value)}
        value={roomId}
      />
      
      <Link href={`/room/${roomId}`}>
        <button className="px-8 py-2 rounded-lg bg-blue-600 text-white mt-[1rem]">
          Join
        </button>
      </Link>
    </div>
  )
}

export default HomePage
