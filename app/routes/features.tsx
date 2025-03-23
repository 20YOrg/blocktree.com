import type { MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
    return [
        { title: "Blocktree - Features" },
        { name: "description", content: "Discover the innovative features of Blocktree, a blockchain scaling solution for AI economies, edge DApps, and interstellar finance." },
    ];
};

export default function Features() {
    return (
        <Layout>
            <div className="w-full max-w-4xl mx-auto px-4 py-12 mt-[4rem]">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-poppins">
                        Blocktree Features
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-inter">
                        Discover the innovative features that make Blocktree the ultimate blockchain scaling solution for the future.
                    </p>
                </section>

                {/* Features List */}
                <section className="mb-16">
                    <div className="space-y-8">
                        {/* Feature 1: Spatial Scalability */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                1
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                    Spatial Scalability with Blocktree Architecture
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-inter">
                                    Blocktree introduces a revolutionary "blocktree" structure that spatially scales blockchain networks, enabling infinite growth without compromising performance. By partitioning the mining process, Blocktree ensures scalability for global and extraterrestrial applications.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2: AI Integration */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                2
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                    AI Integration for Autonomous DeFi
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-inter">
                                    Seamlessly integrate AI agents into Blocktree’s ecosystem for autonomous decentralized finance (DeFi) operations. From borrowing to arbitrage and investing, AI-driven transactions are executed without human intervention, paving the way for a machine economy.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3: Edge DApp Support */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                3
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                    Edge DApp Support for Low Latency
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-inter">
                                    Blocktree powers low-latency decentralized applications (DApps) at the network edge, supporting IoT, gaming, and real-time data processing with minimal delays, ensuring a seamless user experience.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4: Interstellar-Ready Finance */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                4
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                    Interstellar-Ready Finance
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-inter">
                                    Designed for space economies, Blocktree facilitates secure, scalable transactions for interstellar commerce, mining, and colonization, ensuring financial systems work beyond Earth.
                                </p>
                            </div>
                        </div>

                        {/* Feature 5: Permissionless Network */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                5
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                    Permissionless, Borderless Blockchain
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 font-inter">
                                    Blocktree’s permissionless and borderless network enables global and extraterrestrial adoption, allowing anyone, anywhere, to participate in the blockchain ecosystem without barriers.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}