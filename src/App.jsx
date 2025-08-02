import { useEffect, useState } from 'react';
import './App.css';
import logo from "../src/assets/dictionary.png"
import github from "../src/assets/github.png"
import sendIcon from "../src/assets/send.png"
import books from "../src/assets/books.png"

function App() {

  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

 async function getWordMeaning() {
  console.log("Searching for word:", word);
  setLoading(true);

  try {
    const mainData = await fetch("http://localhost:3000/word-service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ Important
      },
      body: JSON.stringify({ word }),
    });

    if (mainData.ok) {
      const res = await mainData.json();
      console.log("Meaning received:", res);
      setData(res);
    } else {
      console.log("Failed to fetch word meaning:", mainData.status);
      setData({});
    }
  } catch (err) {
    console.error("Error fetching word meaning:", err);
    setData(err);
  } finally {
    setLoading(false)
  }
}


  return (
    <div className='overflow-x-hidden min-h-screen font-sans flex flex-col justify-between'>
      <div className='flex lg:justify-between px-2 shadow-sm items-center'>
        <img alt='logo' src={logo} className='size-7 md:size-10 lg:size-7'/>
        <p className='text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold'>Pen-Ultman</p>
        <div className='hidden lg:flex items-center gap-x-2 group translate-y-2'>
          <p className='opacity-0 -z-10 translate-x-[100px] group-hover:translate-none group-hover:opacity-100 transition-all duration-500 ease-in-out'>
            Follow Me 
            </p>
          <img alt='github logo' src={github} className='lg:size-7 bg-black/30 animate-bounce github'/>
        </div>
      </div>

      {/* BODY */}
      <div className='w-full md:w-3/4 2xl:w-2/4 4xl:w-1/4 mx-auto flex flex-col items-center'>

<div className='text-center relative'>
  <div className='ring-4 inline-block m-2 p-1 ring-neutral-300'>
        <p className='bg-[#fff] p-1 rounded-md'>✔✔100DaysOfBeauty</p>
      </div>

<div className='flex items-center gap-x-2'>
        <h1 className='text-center text-lg md:text-4xl lg:text54xl xl:text-6xl font-bold'>DICTIONARY</h1>
<img alt='stack of books' src={books} className='size-20 translate-y-5'/>
</div>
     
     <p className='mt-4'>Simple Dictionary Application</p>
      {/* <div className='border-l-2 absolute -z-10 w-[50px] h-[50px] hidden lg:flex top-0 rounded-full left-0 origin-center animate-spin'></div>
      <div className='border-r-2 hidden lg:flex absolute -z-10 w-[50px] h-[50px] top-[50px] right-0 rounded-full origin-center animate-spin'></div> */}
      </div>



{/* DICTIONARY BOX */}
    <div className='ring-[1px] p-2 w-9/10 md:w-3/4 2xl:w-2/4 mt-6 md:mt-8 lg:mt-10 box'>

        <h2 className='font-semibold text-center text-xl'>English Dictionary</h2>

<div className='flex w-full mx-auto mt-2 items-center gap-x-[4px] justify-center'>
<input 
value={word}
onChange={(inp) => setWord(inp.target.value)}
className='p-2 text-lg rounded-md w-3/4 bg-white shadow-sm hover:shadow-zinc-400 focus:shadow-zinc-700 focus:ring-0 focus:outline-offset-0 transition duration-500 ease-in-out' placeholder='Enter word here'/>
<img 
onClick={getWordMeaning}
alt='send icon' src={sendIcon} className='size-6 hover:bg-[#FF6B35] shadow-[#FF6B35] p-[4px] rounded- shadow-sm transition ease-in-out duration-300'/>
</div>
<p className='text-center mt-4 italic'>Type any existing word and press enter to get meaning, example, synonyms, etc</p>
    </div>
</div>      

      <div></div>
    </div>
  )
}

export default App
