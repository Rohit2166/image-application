import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

 const[ userdata,setuserdata] = useState([]);

 const[ index,setindex] = useState(1)

  const getdata= async ()=>{
   const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`)

   setuserdata(response.data)

  }

  useEffect(function(){
    getdata()
  },[index])

  let printuserdata=<h3 className='text-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading....</h3>
  if(userdata.length>0){
    printuserdata=userdata.map(function(elem,idx){
      return <div key={idx}>
        <a href={elem.url} target='_blank'>
        <div className='h-40 w-44  overflow-hidden rounded-xl'>
        <img className='h-full w-full object-cover'
        src={elem.download_url} alt=""/>
      </div>
        <h2 className='font-bold text-lg '>{elem.author}</h2>
        </a>
        
      </div>
      
    })
  }

  return (
    <div className='bg-black h-screen overflow-auto text-white'>
      
      
      <div className='flex flex-wrap gap-4 '>
    {printuserdata}
    </div>
    <div className='flex justify-center items-center p-4 gap-8 '>
          <button className='bg-amber-400 text-black rounded px-4 py-2 font-semibold'
          style={{opacity: index == 1 ? 0.5 : 1}}
          onClick={()=>{
            if(index>1){
            setindex(index-1)
            setuserdata([])
            }
          }}
          >prev</button>
          <h2>Page   {index}</h2>
          <button className='bg-amber-400 text-black rounded px-4 py-2 font-semibold'
          onClick={()=>{
             setuserdata([])
              setindex(index+1)
          }}
          >next</button>
        </div>
    </div>
  )
}

export default App
