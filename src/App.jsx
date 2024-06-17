import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [languages, setLanguages] = useState([]);
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    fetchAllLanguages();
  }, []);

  useEffect(() => {
    if(source !== "" && destination !== "" && text !== "") {
      translateApi();
    }
  }, [source, destination, text]);

  const fetchAllLanguages = () => {
    fetch("https://text-translator2.p.rapidapi.com/getLanguages", {
      method: "GET",
      headers: {
        'x-rapidapi-key': 'b91acf5cc7mshb7020959cc252bcp1e6389jsnb1ab907b1b6e',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      }
    })
    .then(res => res.json())
    .then(data => { setLanguages(data.data.languages); console.log(data.data); })
    .catch(err => console.log(err));
  }

  const translateApi = (formData) => {
    fetch("https://text-translator2.p.rapidapi.com/translate", {
      method: "POST",
      headers: {
        'x-rapidapi-key': 'b91acf5cc7mshb7020959cc252bcp1e6389jsnb1ab907b1b6e',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      },
      body: formData
    })
    .then(res => res.json())
    .then(result => setTranslatedText(result.data.translatedText))
    .catch(err => console.log(err));
  }

  const translate = () => {
    const formData = new FormData();
    formData.append("source_language", source);
    formData.append("target_language", destination);
    formData.append("text", text);
    translateApi(formData);
    console.log(source, destination, text);
  }

  return (
    <div>
      <p className='text-4xl font-bold text-center my-12'>Language Translation</p>
      <form 
        className='flex flex-col gap-4 w-1/2 mx-auto p-10 rounded-xl shadow-xl'
        onSubmit={(e) => {
          e.preventDefault();
          translate();
        }}
      >
        <input 
          className='border-[0.1rem] border-blue-200 p-2 rounded-xl'
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text...'
          type="text" 
        />
        <div className='flex justify-around'>
          <p>Input Language</p>
          <select 
            onChange={(e) => setSource(e.target.value)}
            className='border-[0.1rem] border-blue-100 p-2 rounded-xl cursor-pointer'
          >
            <option value="">Select Language</option>
            {
              languages.map((item, index) => {
                return <option key={index} value={item.code}>{item.name}</option>
              })
            }
          </select>
        </div>
        <div className='flex justify-around'>
          <p>Output Language</p>
          <select 
            onChange={(e) => setDestination(e.target.value)}
            className='border-[0.1rem] border-blue-100 p-2 rounded-xl cursor-pointer'
          >
            <option value="">Select Language</option>
            {
              languages.map((item, index) => {
                return <option key={index} value={item.code}>{item.name}</option>
              })
            }
          </select>
        </div>
        <input 
          type="submit" 
          value="Translate"
          className='submit-btn cursor-pointer bg-blue-500 text-white p-2 rounded-xl w-1/2 mx-auto hover:bg-blue-200 hover:text-blue-500'
        />
      </form>
      {translatedText && (
        <div className='mt-10 w-1/2 mx-auto'>
          <p className='text-2xl font-bold text-center'>Translated Text:</p>
          <p className='text-xl text-center mt-4'>{translatedText}</p>
        </div>
      )}
    </div>
  )
}

export default App
