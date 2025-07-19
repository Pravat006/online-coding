import Decorations from "../home/Decorations"
import Hero from "../home/Hero"

// import axios from "axios"
// import { useEffect } from "react"



function Home() {

    // useEffect(() => {

    //     axios.get("http://localhost:5054/api/v0/auth/user/data", {
    //         withCredentials: true
    //     }).then((res) => {
    //         console.log("User data fetched successfully");
    //         console.log(res);
    //         console.log(res.data);
    //     }).catch((err) => {
    //         console.error(err);
    //     });
    // }, []);


    return (
        <div className="min-h-screen bg-white text-gray-800 font-mono w-full relative overflow-hidden">

            <Decorations />
            {/* <Navbar /> */}
            <Hero />
            {/* <Feature /> */}
            {/* <Review /> */}
            {/* <Footer /> */}
        </div>
    )
}

export default Home