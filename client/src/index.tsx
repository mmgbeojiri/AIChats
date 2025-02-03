import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import jsonData from "../../memory.json"

const name: string = 'Glem'

interface Message {
  role: string;
  content: string;
}

function Index() {
  const [count, setCount] = useState(0)
  const [messageData, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Read and parse the memory.json file
    setMessages(jsonData[0].messages); // remove the comment when running on local
  }, []);

  return (
    <>
    <div className='max-w-4xl flex flex-col justify-center mx-auto space-between h-screen'>
      <div>
        <h1 className='p-4 rounded-xl mx-4 mt-2 font-semibold bg-white shadow-sm'>{name}</h1>
      </div>

      <div className='messages'>
          <div className='message'>
            <h1 className='message-role'>System</h1>
            <h1 className='message-content'>Hello world! <span>Shits on you cutely.</span></h1>
            </div>
          {
            messageData.map((messageData, index) => {
              return (
                <div key={index} className='message'>
                  <h1 className='message-role'>{messageData.role}</h1>
                  <h1 className='message-content'>{messageData.content}</h1>
                </div>
              )
            })
          }
      </div>

          <div className='flex flex-row space-between '>
      <div className='flex flex-[18] justify-center gap-1 m-4 bg-white p-2 rounded-xl shadow-sm'>
        <input type='text' className="flex-[9] rounded-xl border p-2" placeholder='Type a message...' />
        <button className="flex-[1] p-2 bg-blue-500 duration-100 rounded-xl text-white shadow-sm hover:bg-blue-400" >Send</button>
      </div>
      <button className='flex flex-1 w-12 h-12 bg-white self-center rounded-full flex items-center justify-center shadow-sm'><img src="https://img.icons8.com/?size=100&id=9730&format=png&color=000000" className='w-6 h-6 ' /></button>
      </div>

    </div>
    </>
  )
}

export default Index
