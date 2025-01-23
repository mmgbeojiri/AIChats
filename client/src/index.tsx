import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

const name: string = 'Glem'

function Index() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='max-w-4xl flex flex-col justify-center mx-auto space-between h-screen'>
      <div>
        <h1 className='p-4 rounded-xl mx-4 my-2 font-semibold bg-white shadow-sm'>{name}</h1>
      </div>

      <div className='messages'>
          <div className='message'>
            <h1 className='message-role'>System</h1>
            <h1 className='message-content'>Hello world! <span>Shits on you cutely.</span></h1>
            </div>
      </div>

      <div className='flex justify-center gap-1 m-4 bg-white p-2 rounded-xl shadow-sm'>
        <input type='text' className="flex-[9] rounded-xl border p-2" placeholder='Type a message...' />
        <button className="flex-[1] p-2 bg-blue-500 duration-100 rounded-xl text-white shadow-sm hover:bg-blue-400" >Send</button>
      </div>
    </div>
    </>
  )
}

export default Index
