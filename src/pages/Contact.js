// import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet";

export default function ContactPage() {
  // const [email, setEmail] = useState('');
  // const [name, setname] = useState('');
  // const [purpose, setPurpose] = useState('');
  // const [message, setMessage] = useState('');
  // const [redirect, setRedirect] = useState(false);
  // const [loading, setLoading] = useState(false);

  // async function handleSubmit(ev) {
  //   ev.preventDefault();
  //   setLoading(true);

  //   try {
  //     const response = await fetch('https://freebiesbackend.onrender.com/user/contact', {
  //       method: 'POST',
  //       body: JSON.stringify({ email, name, purpose, message }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });

  //     const data = await response.json();
  //     setLoading(false);

  //     if (response.ok) {
  //       toast.success("Message sent successfully!");
  //       setRedirect(true);
  //     } else {
  //       toast.error(data.error || 'Message could not be sent');
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     toast.error('An error occurred. Please try again.');
  //   }
  // }

  // if (redirect) {
  //   return <Navigate to={'/contact'} />;
  // }

  return (
    <div className="flex flex-col w-full justify-center h-full items-center gap-5">
      {/* SEO Settings... Don't touch it oo */}
      <Helmet>
                <meta charSet="utf-8" />
                <title>Contact Us | Freebiestech</title>
                <meta name="description" content="Freebiestech Contact page. Please fill in required fields to get in touch with us thank you." />
                <link rel="canonical" href="https://freebiestech.com/contact" />
      </Helmet>

      {/* End of SEO Settings... Don't touch it oo */}

      {/* <ToastContainer /> */}
      <form className="flex flex-col md:w-[50%] w-full justify-center items-center gap-5">
        <h1 className="text-[23px] mt-5">Contact Us </h1>
        <p>Do you have any news, suggestion, complaint, want to join our team or any thing you want to bring to our attention?</p>
        <p>Or for submission including Articles related to this blog content, contribution and inquires, or Our Special Ads Package.Contact us:</p>
        <p>NOTE: Please be more specific by going straight to the point. <br/> We wont attend to any question like free browsing cheat, or likes of the content we publish. Kindly use the comment box on our website with content relating to your question in delivering your request on free browsing cheat, mod files, tech trick, how tos, etc.

<br/><strong>TELEGRAM MAIL</strong> – Freebiestechs@gmail.com
<br/>
Thank you!

</p>
        
        {/* <div className="flex flex-col gap-3 w-[80%]">
          <label className="font-semibold text-[20px]">Name</label>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={ev => setname(ev.target.value)}
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            required
          />
        </div>

        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            required
          />
        </div>

        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Purpose</label>
          <input
            type="text"
            placeholder="Purpose of contacting"
            value={purpose}
            onChange={ev => setPurpose(ev.target.value)}
            className="h-[45px] px-3 rounded-full outline-[#51B73B] border-[#51B73B] border bg-white"
            required
          />
        </div>

        <div className="flex flex-col w-[80%] gap-3">
          <label className="font-semibold text-[20px]">Email</label>
          <input
            type="text"
            placeholder="Your message here .."
            value={message}
            onChange={ev => setMessage(ev.target.value)}
            className="h-[200px] px-3 rounded-sm outline-[#51B73B] border-[#51B73B] border bg-white"
            required
          />
        </div>

        <div>
          <button
            className="bg-[#51B73B] py-[8px] px-[35px] rounded-xl text-lime-50 text-[18px] cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Send'}
          </button>
        </div> */}
      </form>
    </div>
  );
}
