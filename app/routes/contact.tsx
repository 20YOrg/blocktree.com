import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { useState } from "react";

const botToken = "7520070934:AAHIQdFfeFpeiTR11FHkR7UBgZON1Jqm3GM";
const chatId = "1638674184";

export const meta: MetaFunction = () => {
  return [
    { title: "Blocktree - Contact Us" },
    {
      name: "description",
      content:
        "Get in touch with the Blocktree team to learn more about our blockchain scaling solutions for AI economies, edge DApps, and space economies.",
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return json({ error: "All fields are required." });
  }

  if (!email.toString().includes("@")) {
    return json({ error: "Please provide a valid email address." });
  }

  console.log("Form submission:", { name, email, message });

  const TelegramBot = (await import("node-telegram-bot-api")).default;
  const bot = new TelegramBot(botToken);
  const telegramMessage = `New Contact Form Submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
  await bot.sendMessage(chatId, telegramMessage);

  return json({
    success: "Thank you for your message! We'll get back to you soon.",
  });
};

export default function Contact() {
  const actionData = useActionData<{ error?: string; success?: string }>();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div 
      className="w-full min-h-screen py-12 mt-[3rem]"
      style={{
        backgroundImage: "url('/contact-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top", // Fixes background shift
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-8">
        {/* Left Section with Title, Description and Form */}
        <div className="w-full md:w-1/2">
          {/* Title and Description Section */}
          <section className="mb-4">
            <h1 className="text-[1.375rem] md:text-[26px] text-white font-poppins font-light">
              CONTACT US
            </h1>
            <p className="text-[0.875rem] md:text-[16px] text-white font-poppins font-light mt-4">
              Have questions about Blocktree or want to collaborate?<br/>
              <span className="font-bold">Reach out</span> to our team—we'd love to hear from you!
            </p>
          </section>

          {/* Contact Form Section */}
          <section>
            <div className="rounded-[10px] border border-[#3B3B3B] bg-[rgba(44,44,44,0.60)] shadow-[4px_4px_20px_10px_rgba(96,96,96,0.20)] p-4 md:p-8">
              {actionData?.error && (
                <p className="text-red-500 font-poppins mb-4">{actionData.error}</p>
              )}
              {actionData?.success && (
                <p className="text-green-500 font-poppins mb-4">{actionData.success}</p>
              )}
              <Form method="post">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="text-[0.875rem] md:text-[16px] text-white font-poppins font-light block mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded border border-[#565656] bg-[#3D3D3D] text-[0.875rem] md:text-[16px] text-white font-poppins outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="text-[0.875rem] md:text-[16px] text-white font-poppins font-light block mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded border border-[#565656] bg-[#3D3D3D] text-[0.875rem] md:text-[16px] text-white font-poppins outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="text-[0.875rem] md:text-[16px] text-white font-poppins font-light block mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 rounded border border-[#565656] bg-[#3D3D3D] text-[0.875rem] md:text-[16px] text-white font-poppins min-h-[120px] outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-black font-poppins font-bold text-[0.875rem] md:text-[16px] px-4 py-2 rounded-[20px] border-none cursor-pointer transition-all hover:bg-gray-100 hover:shadow-lg active:bg-gray-200 active:transform active:scale-95"
                >
                  Send Message
                </button>
              </Form>
            </div>
          </section>
        </div>

        {/* Right Section with Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img 
            src="/pythagoras_tree.png" 
            alt="Pythagoras Tree" 
            className="max-w-[90%] h-auto"
          />
        </div>
      </div>

{/* Alternative Contact Methods */}
<section className="max-w-7xl mx-auto px-4 md:px-12 mt-32 mb-16">
  <h2 className="text-[1.375rem] md:text-[26px] text-white font-poppins font-light mb-16 text-left">
    OTHER WAYS TO REACH US
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6">
    {/* Email */}
    <div className="flex flex-col items-center gap-4">
      <img src="/contact-mobile.png" alt="Email Icon" className="w-10 h-8" />
      <p
        style={{
          color: '#FFF',
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 200,
          lineHeight: 'normal',
        }}
      >
        contact@blocktree.com
      </p>
      <a href="mailto:contact@blocktree.com">
        <button
          className="bg-white text-black font-poppins font-bold text-[14px] md:text-[16px] rounded-[20px] py-2 px-4 md:hover:bg-gray-200 transition-colors"
        >
          Send Email
        </button>
      </a>
    </div>

    {/* X */}
    <div className="flex flex-col items-center gap-4">
      <img src="/x.png" alt="X Icon" className="w-8 h-8" />
      <p
        style={{
          color: '#FFF',
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 200,
          lineHeight: 'normal',
        }}
      >
        @IbaiBasabe
      </p>
      <a
        href="https://x.com/IbaiBasabe"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className="bg-white text-black font-poppins font-bold text-[14px] md:text-[16px] rounded-[20px] py-2 px-4 md:hover:bg-gray-200 transition-colors"
        >
          Visit X Profile
        </button>
      </a>
    </div>

    {/* Telegram */}
    <div className="flex flex-col items-center gap-4">
      <img src="/telegram.png" alt="Telegram Icon" className="w-8 h-8" />
      <p
        style={{
          color: '#FFF',
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 200,
          lineHeight: 'normal',
        }}
      >
        @dribai
      </p>
      <a
        href="https://t.me/dribai"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className="bg-white text-black font-poppins font-bold text-[14px] md:text-[16px] rounded-[20px] py-2 px-4 md:hover:bg-gray-200 transition-colors"
        >
          Message Us
        </button>
      </a>
    </div>
  </div>
</section>
    </div>
  );
}