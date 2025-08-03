import { useEffect, useState } from 'react';
import './App.css';
import logo from "../src/assets/dictionary.png"
import github from "../src/assets/github.png"
import sendIcon from "../src/assets/send.png"
import books from "../src/assets/books.png"

function App() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function getWordMeaning() {
    if (!word.trim()) return;
    
    console.log("Searching for word:", word);
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("http://localhost:3000/word-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word }),
      });

      if (response.ok) {
        const res = await response.json();
        if (res && res.meanings) {
          setData(res);
          // console.log("Meaning received:", res);
        } else {
          setError({ message: "No definitions found" });
        }
      } else {
        setError({ message: "Failed to fetch word meaning" });
      }
    } catch (err) {
      // console.error("Error fetching word meaning:", err);
      setError({ message: "No meaning found..." });
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWordMeaning();
    }
  };

  return (
    <div className='min-h-screen font-sans flex flex-col bg-gray-50'>
      {/* Header */}
      <header className='flex justify-between items-center px-4 py-3 bg-white shadow-sm'>
        <div className='flex items-center gap-2'>
          <img alt='logo' src={logo} className='w-8 h-8'/>
          <h1 className='text-xl font-bold text-gray-800'>Pen-Ultman</h1>
        </div>
        <a 
          href="https://github.com/owenlovescoding" 
          target="_blank" 
          rel="noopener noreferrer"
          className='flex items-center gap-1 hover:opacity-80 transition-opacity'
        >
          <span className='hidden md:inline text-sm text-gray-600'>Follow Me</span>
          <img alt='github logo' src={github} className='w-6 h-6'/>
        </a>
      </header>

      {/* Main Content */}
      <main className='flex-1 container mx-auto px-4 py-8 max-w-4xl'>
        <div className='text-center mb-10'>
          <div className='inline-block bg-white px-3 py-1 rounded-lg shadow-sm mb-4'>
            <p className='text-sm font-medium text-indigo-600'>✔✔100DaysOfBeauty</p>
          </div>

          <div className='flex justify-center items-end gap-2 mb-2'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-800'>DICTIONARY</h1>
            <img alt='stack of books' src={books} className='w-12 h-12 md:w-16 md:h-16'/>
          </div>
          <p className='text-gray-600'>Simple Dictionary Application</p>
        </div>

        {/* Search Box */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <h2 className='font-semibold text-center text-xl mb-4 text-gray-700'>English Dictionary</h2>
          
          <div className='flex w-full items-center gap-2 mb-2'>
            <input 
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={handleKeyDown}
              className='flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Enter word here'
              disabled={loading}
            />
            <button 
              onClick={getWordMeaning}
              disabled={loading || !word.trim()}
              className={`p-3 rounded-lg ${loading || !word.trim() ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
            >
              <img alt='send icon' src={sendIcon} className='w-5 h-5'/>
            </button>
          </div>
          <p className='text-center text-sm text-gray-500 italic'>
            Type any existing word and press enter to get meaning, example, synonyms, etc
          </p>
        </div>

        {/* Results Section */}
        {loading && (
          <div className='text-center py-8'>
            <div className='inline-block rounded-full animate-spin h-8 w-8 border-t-2 border-b-2 border-gray-600'></div>
          </div>
        )}

        {error && (
          <div className='bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg className='h-5 w-5 text-red-500' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-red-700'>{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {data && (
          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='text-2xl font-bold text-gray-800 capitalize'>{data.word}</h2>
              {data.partOfSpeech && (
                <span className='px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full'>
                  {data.partOfSpeech}
                </span>
              )}
            </div>

            {data.image && (
              <div className='mb-6'>
                <img 
                  alt={data.word} 
                  src={data.image} 
                  className='w-full max-h-64 object-cover lg:object-cover rounded-lg border border-gray-200'
                />
              </div>
            )}

            <div className='space-y-6'>
              {data.meanings && (
                <div>
                  <h3 className='text-lg font-semibold text-gray-700 mb-2'>Definition</h3>
                  <p className='text-gray-700 italic'>"{data.meanings}"</p>
                </div>
              )}

              {data.synonyms && data.synonyms.length > 0 && (
                <div>
                  <h3 className='text-lg font-semibold text-gray-700 mb-2'>Synonyms</h3>
                  <div className='flex flex-wrap gap-2'>
                    {data.synonyms.map((synonym, index) => (
                      <span key={index} className='px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full'>
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.antonyms && data.antonyms.length > 0 && (
                <div>
                  <h3 className='text-lg font-semibold text-gray-700 mb-2'>Antonyms</h3>
                  <div className='flex flex-wrap gap-2'>
                    {data.antonyms.map((antonym, index) => (
                      <span key={index} className='px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full'>
                        {antonym}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className='py-4 text-center text-sm text-gray-500 border-t border-gray-200'>
        <p>© {new Date().getFullYear()} Pen-Ultman Dictionary App</p>
      </footer>
    </div>
  )
}

export default App