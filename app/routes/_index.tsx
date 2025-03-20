import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Blocktree - Powering Interstellar DApps and Space Economies" },
    { name: "description", content: "Explore Blocktree, a blockchain scaling solution for AI economies, edge DApps, and interstellar finance, inspired by @billqian_uae and @IbaiBasabe." },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Menu (Header) */}
      <header className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-10">
        <nav className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo Placeholder - Replace with your image */}
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-800 dark:text-gray-200 font-bold">BT</span>
            </div>
            {/* Project Name */}
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-poppins">
              Blocktree
            </h1>
          </div>
        </nav>
      </header>

      {/* Main Content Centered Vertically and Horizontally */}
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-4xl px-4 py-12 mt-[4rem]">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-poppins">
              Blocktree - Powering Interstellar DApps and Space Economies
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-inter">
              Revolutionizing blockchain for the future of AI, edge computing, and beyond the stars.
            </p>
          </section>

          {/* About Blocktree Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
              What is Blocktree?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              Blocktree is a groundbreaking blockchain scaling solution that transforms traditional blockchain architectures into a spatially scalable "blocktree" structure. Inspired by @IbaiBasabe’s vision, Blocktree enables efficient, permissionless networks for AI-driven economies, decentralized applications (DApps) at the edge, and financial systems for interstellar exploration. Building on @billqian_uae’s FinTech 6.0 framework, Blocktree empowers silicon-based life and machine economies with unmatched scalability and trust.
            </p>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-inter">
              <li>Spatial scalability with the blocktree architecture for infinite growth.</li>
              <li>AI integration for autonomous DeFi and machine-to-machine transactions.</li>
              <li>Edge DApp support for low-latency, decentralized applications.</li>
              <li>Interstellar-ready finance, supporting space economies and cross-planetary transactions.</li>
              <li>Permissionless, borderless blockchain for global and extraterrestrial adoption.</li>
            </ul>
          </section>

          {/* Use Cases Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
              Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins">
                  AI Economies
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300 font-inter">
                  Enable autonomous AI agents to trade, invest, and operate in decentralized finance (DeFi) without human intervention.
                </p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins">
                  Edge DApps
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300 font-inter">
                  Power low-latency, decentralized apps for IoT, gaming, and real-time data processing at the network edge.
                </p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 font-poppins">
                  Space Economies
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300 font-inter">
                  Facilitate secure, scalable transactions for interstellar commerce, mining, and colonization.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-4">
              Join the Blocktree Revolution
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-inter mb-4">
              Be part of the future of blockchain and space economies. Contact us to learn more or collaborate.
            </p>
            <a
              href="mailto:contact@blocktree.com"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-inter"
            >
              Get in Touch
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}