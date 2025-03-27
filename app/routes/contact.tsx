import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node"; // Added json import
import { useActionData, Form } from "@remix-run/react"; // Added Form import
import { useState } from "react";
import Layout from "~/components/Layout";
const TelegramBot = require("node-telegram-bot-api");

// Telegram setup
const botToken = "7520070934:AAHIQdFfeFpeiTR11FHkR7UBgZON1Jqm3GM";
const chatId = "1638674184";
const bot = new TelegramBot(botToken);

export const meta: MetaFunction = () => {
    return [
        { title: "Blocktree - Contact Us" },
        { name: "description", content: "Get in touch with the Blocktree team to learn more about our blockchain scaling solutions for AI economies, edge DApps, and space economies." },
    ];
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Basic server-side validation
    if (!name || !email || !message) {
        return json({ error: "All fields are required." });
    }

    if (!email.toString().includes("@")) {
        return json({ error: "Please provide a valid email address." });
    }

    // Log submission
    console.log("Form submission:", { name, email, message });

    // Send Telegram notification
    const telegramMessage = `New Contact Form Submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    await bot.sendMessage(chatId, telegramMessage);

    return json({ success: "Thank you for your message! We’ll get back to you soon." });
};

export default function Contact() {
    const actionData = useActionData<{ error?: string; success?: string }>();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
            <div className="w-full max-w-4xl mx-auto px-4 py-12 mt-[4rem]">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-poppins">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-inter">
                        Have questions about Blocktree or want to collaborate? Reach out to our team—we’d love to hear from you!
                    </p>
                </section>

                {/* Contact Form Section */}
                <section className="mb-16">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
                            Send Us a Message
                        </h2>
                        {actionData?.error && (
                            <p className="text-red-500 font-inter mb-4">{actionData.error}</p>
                        )}
                        {actionData?.success && (
                            <p className="text-green-500 font-inter mb-4">{actionData.success}</p>
                        )}
                        <Form method="post" className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-inter mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-inter mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-inter mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={5}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-inter"
                            >
                                Send Message
                            </button>
                        </Form>
                    </div>
                </section>

                {/* Alternative Contact Methods */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4 text-center">
                        Other Ways to Reach Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                Email
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 font-inter">
                                <a href="mailto:contact@blocktree.com" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    contact@blocktree.com
                                </a>
                            </p>
                        </div>
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                X
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 font-inter">
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    @BlocktreeHQ
                                </a>
                            </p>
                        </div>
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                Telegram
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 font-inter">
                                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Join our community
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}