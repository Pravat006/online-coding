
// import { Editor } from '@monaco-editor/react'
import Editor from './components/Editor'
import Navbar from './components/Navbar'

function App() {


  return (
    <div className='w-full flex flex-col justify-center items-start'>
      <Navbar />
      <div className='w-full flex flex-col justify-center items-start bg-gray-100 min-h-screen p-4'>

        <Editor />;

      </div>
    </div>
  )
}

export default App
