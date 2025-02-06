import Navbar from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import Products from "./components/products/Products"
import TopProducts from "./components/TopProducts/TopProducts"
import Banner from "./components/Banner/Banner"
import Subscribe from "./components/Subscribe/Subscribe"
import Testimonials from "./components/Testimonials/Testimonials"
import Footer from './components/Footer/Footer'
import Popup from "./components/Popup/Popup"
import AOS from 'aos'
import { useEffect,useState } from "react"
import "aos/dist/aos.css"


const App = () => {

  const [popup, setPopup] = useState(false)

  const handleOrderPopup=()=>{
    setPopup(!popup)
  }


  useEffect(()=>{
    AOS.init({
      offset:100,
      duration:800,
      easing:"ease-in-sine",
      delay:100
    });
    AOS.refresh();

  },[])

  return (
    <>
    <Navbar handlePopup={handleOrderPopup}/>
    <Hero handlePopup={handleOrderPopup}/>
    <Products/>
    <TopProducts handlePopup={handleOrderPopup}/>
    <Banner/>
    <Subscribe/>
    <Products/>
    <Testimonials/>
    <Footer/>
    <Popup popUp={popup} setOrderPopup={setPopup} />
    </>
  )
}

export default App