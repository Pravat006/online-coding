import Decorations from "../home/Decorations"
// import Feature from "../home/Feature"
// import Footer from "../home/Footer"
// import Navbar from "../home/Navbar"
import Hero from "../home/Hero"
// import Review from "../home/Review"

function Home() {
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