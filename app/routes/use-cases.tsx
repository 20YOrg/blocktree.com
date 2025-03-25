import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
    return [
        { title: "Blocktree - Use Cases" },
        { name: "description", content: "Explore the practical applications of Blocktree in AI economies, edge DApps, and space economies, revolutionizing blockchain for the future." },
    ];
};

export default function UseCases() {
    return (
        <Layout>
            <div className="w-full max-w-4xl mx-auto px-4 py-12 mt-[4rem]">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-poppins">
                        Blocktree Use Cases
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-inter">
                        See how Blocktree is transforming the future with its scalable blockchain solutions for AI, edge computing, and interstellar economies.
                    </p>
                </section>

                {/* Use Cases List */}
                <section className="mb-16">
                    <div className="space-y-12">
                        {/* Use Case 1: Space Economies */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-full md:w-1/3">
                                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-600 dark:text-gray-400 font-inter">
                                        [Placeholder: Space Economy Illustration]
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                    Space Economies
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-inter">
                                    Blocktree is designed to support financial systems for interstellar exploration, enabling secure and scalable transactions for space economies. Whether it’s facilitating commerce on Mars, managing mining operations on asteroids, or supporting colonization efforts, Blocktree’s permissionless network ensures that financial transactions can occur across planets with the same efficiency as on Earth. This use case positions Blocktree as the backbone for humanity’s expansion into space.
                                </p>
                            </div>
                        </div>
                        {/* Use Case 2: AI Economies */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-full md:w-1/3">
                                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-600 dark:text-gray-400 font-inter">
                                        [Placeholder: AI Economy Illustration]
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                    AI Economies
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-inter">
                                    Blocktree enables autonomous AI agents to participate in decentralized finance (DeFi) ecosystems, performing tasks like trading, investing, and arbitrage without human intervention. By leveraging Blocktree’s scalable architecture, AI-driven economies can operate at unprecedented scale, supporting machine-to-machine transactions in a trustless environment. This use case is ideal for creating self-sustaining financial systems where AI agents manage assets, optimize strategies, and drive economic growth.
                                </p>
                            </div>
                        </div>
                        {/* Use Case 3: Edge DApps */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-full md:w-1/3">
                                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-600 dark:text-gray-400 font-inter">
                                        [Placeholder: Edge DApp Illustration]
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                    Edge DApps
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-inter">
                                    Blocktree powers low-latency decentralized applications (DApps) at the network edge, making it perfect for IoT, gaming, and real-time data processing. With its spatially scalable blocktree structure, Blocktree ensures that edge DApps can handle massive transaction volumes with minimal delays, providing a seamless user experience. This use case is critical for industries requiring real-time interactions, such as smart cities, autonomous vehicles, and immersive gaming platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="text-center mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
                        Ready to Explore Blocktree’s Potential?
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-inter mb-4">
                        Contact us to learn how Blocktree can enable your future with its cutting-edge blockchain solutions.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-inter"
                    >
                        Get in Touch
                    </Link>
                </section>
            </div>
        </Layout>
    );
}