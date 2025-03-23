import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
    return [
        { title: "Blocktree - About Us" },
        { name: "description", content: "Learn about Blocktree’s mission, vision, and team, dedicated to revolutionizing blockchain for AI economies, edge DApps, and space economies." },
    ];
};

export default function About() {
    return (
        <Layout>
            <div className="w-full max-w-4xl mx-auto px-4 py-12 mt-[4rem]">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-poppins">
                        About Blocktree
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-inter">
                        Pioneering the future of blockchain with scalable solutions for AI, edge computing, and interstellar exploration.
                    </p>
                </section>

                {/* Our Mission Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-inter">
                        At Blocktree, our mission is to redefine the boundaries of blockchain technology by creating a spatially scalable "blocktree" architecture that empowers the next generation of decentralized applications. Inspired by the visionary ideas of @IbaiBasabe and @billqian_uae, we aim to build a permissionless, borderless network that supports AI-driven economies, edge DApps, and financial systems for interstellar exploration. We believe in a future where blockchain technology transcends Earth, enabling humanity and machines to thrive in a decentralized universe.
                    </p>
                </section>

                {/* Our Vision Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
                        Our Vision
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-inter">
                        We envision a world where blockchain technology is the backbone of global and extraterrestrial economies. Blocktree’s vision is to create a scalable, efficient, and trustless infrastructure that supports silicon-based life, autonomous AI agents, and space-faring civilizations. By combining the principles of FinTech 6.0 with innovative blockchain scaling, we’re building a future where decentralized systems power everything from machine-to-machine transactions on Earth to interstellar commerce on Mars and beyond.
                    </p>
                </section>

                {/* Our History Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
                        Our History
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-inter">
                        Blocktree was founded in 2024 by a team of blockchain enthusiasts, AI researchers, and space technology advocates who were inspired by the discussions between @billqian_uae and @IbaiBasabe on X. The concept of a "blocktree" as a spatially scalable blockchain structure sparked the idea for a new kind of decentralized network—one that could handle the demands of AI economies, edge computing, and interstellar finance. Since our inception, we’ve been working tirelessly to develop and deploy Blocktree’s technology, collaborating with innovators in the blockchain and space industries to bring our vision to life.
                    </p>
                </section>

                {/* Our Team Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4 text-center">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Team Member 1 */}
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
                            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-400 font-inter">
                                    [Photo]
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-1">
                                Alex Carter
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-inter mb-2">
                                Co-Founder & CEO
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 font-inter">
                                Alex is a blockchain pioneer with over a decade of experience in decentralized systems, leading Blocktree’s mission to scale blockchain for the stars.
                            </p>
                        </div>
                        {/* Team Member 2 */}
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
                            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-400 font-inter">
                                    [Photo]
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-1">
                                Dr. Maya Singh
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-inter mb-2">
                                Chief Technology Officer
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 font-inter">
                                Maya holds a PhD in AI and distributed systems, driving Blocktree’s integration of AI with blockchain for autonomous economies.
                            </p>
                        </div>
                        {/* Team Member 3 */}
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
                            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-400 font-inter">
                                    [Photo]
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-1">
                                Liam Zhang
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-inter mb-2">
                                Head of Space Initiatives
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 font-inter">
                                Liam brings expertise in space technology, ensuring Blocktree’s solutions are ready for interstellar applications.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="text-center mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
                        Join Our Journey
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-inter mb-4">
                        Want to be part of the Blocktree revolution? Get in touch with us to learn more or collaborate.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-inter"
                    >
                        Contact Us
                    </Link>
                </section>
            </div>
        </Layout>
    );
}