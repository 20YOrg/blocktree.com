import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";

export async function loader() {
    const res = await fetch("http://77.37.54.98:3001/chain");
    const data = await res.json();
    return Response.json(data);
}

export default function Demo() {
    const { mainChain, earthBranch, marsBranch } = useLoaderData();
    return (
        <Layout>
            <div className="w-full max-w-4xl mx-auto px-4 py-12 mt-[4rem]">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-poppins text-center">
                    Blocktree Demo
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-inter text-center">
                    Watch the blockchain split into Earth and Mars branches!
                </p>
                <div className="mt-8 space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                            Main Chain
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                            {mainChain.map(b => (
                                <li key={b.id}>{b.location} Block {b.id} (Hash: {b.hash})</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                            Earth Branch
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                            {earthBranch.map(b => (
                                <li key={b.id}>{b.location} Block {b.id} (Hash: {b.hash})</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                            Mars Branch
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                            {marsBranch.map(b => (
                                <li key={b.id}>{b.location} Block {b.id} (Hash: {b.hash})</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}