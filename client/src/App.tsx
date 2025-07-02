import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';


interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {

    const fetchUser = async () => {
      try {

        const response = await axios.get('http://localhost:5054/api/v0/auth/user/data', {
          withCredentials: true,
        });


        if (response.data || response.data.success) {
          setUserData(response.data.user);
        } else {
          console.log("Request was successful, but backend indicated failure.");
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className='w-full flex flex-col justify-center items-start'>
      <Navbar userName={userData?.name} />
    </div>
  );
}

export default App;
