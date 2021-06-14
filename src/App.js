import './App.css'
import React, { useState } from 'react'
import { FaClipboard, FaCopy } from 'react-icons/fa'
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters
} from './characters.js'
import toast, { Toaster } from 'react-hot-toast'

function App () {
  const [String, setString] = useState('')
  const [StringLength, setStringLength] = useState(4)
  const [includeUppercase, setUppercase] = useState(false)
  const [includeLowercase, setLowercase] = useState(false)
  const [includeNumbers, setNumbers] = useState(false)
  const [includeSymbol, setSymbol] = useState(false)

  // Updates String
  const handleString = () => {
    if (
      !includeLowercase &&
      !includeUppercase &&
      !includeNumbers &&
      !includeSymbol
    ) {
      errorGenerate()
    } else {
      let characterList = ''

      if (includeUppercase) {
        characterList += upperCaseLetters
      }

      if (includeLowercase) {
        characterList += lowerCaseLetters
      }

      if (includeNumbers) {
        characterList += numbers
      }

      if (includeSymbol) {
        characterList += specialCharacters
      }

      setString(createString(characterList))
    }
  }

  // Creates String
  const createString = characterList => {
    let String = ''
    const characterListLength = characterList.length

    for (let i = 0; i < StringLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      String = String + characterList.charAt(characterIndex)
    }
    return String
  }

  // Copies to Clipboard
  const clipboard = () => {
    const textArea = document.createElement('textarea')

    textArea.innerText = String

    document.body.appendChild(textArea)

    textArea.select()

    document.execCommand('copy')

    textArea.remove()
  }

  // Notifies if String has been copied to clipboard
  const notify = () => toast('Copied to clipboard.')

  // Displays message if no String has been generated
  const errorCopy = () => toast.error('No String has been generated.')

  // Displays message if not boxes have been checked
  const errorGenerate = () => toast('Please check at least one box.')

  //
  const handleCopy = () => {
    if (String === '') {
      errorCopy()
    } else {
      notify()
      clipboard()
    }
  }
  return (
    <div className='App'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='container'>
        <h2 className='header'>String Generator</h2>

        {/* Displays String and clipboard */}
        <div className='generator'>
          <h3>{String}</h3>
          <button onClick={handleCopy} className='cpy-btn'>
            <FaClipboard />
          </button>
        </div>

        {/* String Length */}
        <div className='sub'>
          <label for='String-length'>String Length</label>
          <input
            defaultValue='StringLength'
            onChange={e => {
              setStringLength(e.target.value)
            }}
            type='number'
            id='String-length'
            name='String-length'
            min='4'
            max='20'
          />
        </div>

        {/* Uppercase Letters */}
        <div className='sub'>
          <label for='uppercase-letters'>Include Uppercase Letters</label>
          <input
            checked={includeUppercase}
            onChange={e => setUppercase(e.target.checked)}
            type='checkbox'
            id='uppercase-letters'
            name='uppercase-letters'
            value='uppercaseLetters'
          />
        </div>

        {/* Lowercase Letters */}
        <div className='sub'>
          <label for='lowercase-letters'>Include Lowercase Letters</label>
          <input
            checked={includeLowercase}
            onChange={e => setLowercase(e.target.checked)}
            type='checkbox'
            id='lowercase-letters'
            name='lowercase-letters'
            value='lowercaseLetters'
          />
        </div>

        {/* Numbers */}
        <div className='sub'>
          <label for='numbers'>Include Numbers</label>
          <input
            checked={includeNumbers}
            onChange={e => setNumbers(e.target.checked)}
            type='checkbox'
            id='numbers'
            name='numbers'
            value='number'
          />
        </div>

        {/*Symbols*/}
        <div className='sub'>
          <label for='symbols'>Include Symbols</label>
          <input
            checked={includeSymbol}
            onChange={e => setSymbol(e.target.checked)}
            type='checkbox'
            id='symbols'
            name='symbols'
            value='symbol'
          />
        </div>

        {/*Generate String*/}
        <button onClick={handleString} className='generate-btn'>
          <p>Generate String</p>
        </button>
      </div>
    </div>
  )
}

export default App
