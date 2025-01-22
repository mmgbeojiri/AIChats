import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'




function Index(name: string) {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <div className='messages'>

      </div>

      <div className='flex justify-center gap-1 m-4'>
        <input type='text' className="flex-[9] rounded-xl shadow-sm border p-2" placeholder='Type a message...' />
        <button className="flex-[1] p-2 bg-blue-500 duration-100 rounded-xl text-white shadow-sm hover:bg-blue-400" >Send</button>
      </div>
    </>
  )
}

export default Index
