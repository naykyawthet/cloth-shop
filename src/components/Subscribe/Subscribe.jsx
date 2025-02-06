import BannerImg from '../../assets/website/orange-pattern.jpg'

const Subscribe = () => {
  
    const myStyle = {
        backgroundImage: `url(${BannerImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
    };
  
  return (
    <div  className="bg-white dark:bg-gray-900"  >
        <div data-aos="zoom-in" className="container backdrop-blur-sm py-10"style={myStyle} >
          <div className='space-y-6 max-w-xl mx-auto'>
              <h1  className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">Get Notified About New Products</h1>
              <input data-aos="fade-up" type="text" placeholder="Enter Email" className="w-full p-3" />
          </div>
        </div>
    </div>
  )
}

export default Subscribe