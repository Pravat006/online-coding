
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import './App.css'

function App() {

  return (
   <div >
     <h2 className='text-blue-500 text-5xl font-bold animate-bounce'>Hello</h2>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
   </div>
  )
}

export default App
