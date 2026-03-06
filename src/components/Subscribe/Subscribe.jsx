import { useState } from "react";
import BannerImg from "../../assets/website/orange-pattern.jpg";
import { subscribe } from "../../lib/api";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const myStyle = {
    backgroundImage: `url(${BannerImg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const result = await subscribe(email);
      setMessage(result.message);
      setEmail("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div data-aos="zoom-in" className="container backdrop-blur-sm py-10" style={myStyle}>
        <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">
            Get Notified About New Products
          </h1>
          <input
            data-aos="fade-up"
            type="email"
            placeholder="Enter Email"
            className="w-full p-3"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Subscribe"}
          </button>
          {message && <p className="text-sm font-medium text-white">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
