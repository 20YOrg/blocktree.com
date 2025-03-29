import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { useState, useEffect } from "react";
import Tree from "react-d3-tree";

export async function loader() {
    const res = await fetch("http://77.37.54.98:3001/chain");
    const data = await res.json();
    return Response.json(data);
}

export default function Demo() {
    const { mainChain, earthBranch, marsBranch } = useLoaderData();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        console.log("Client mount effect triggered");
        setIsMounted(true);
    }, []);

    const treeData = {
        name: "Root",
        children: [
            {
                name: "Earth",
                children: earthBranch.map((b) => ({
                    name: `${b.location} ${b.id} (${b.hash})`,
                })),
            },
            {
                name: "Mars",
                children: marsBranch.map((b) => ({
                    name: `${b.location} ${b.id} (${b.hash})`,
                })),
            },
        ],
    };

    const handleMine = async () => {
        try {
            const res = await fetch("https://demo.blocktree.com/chain/mine", {  // Use your SSL URL
                method: "POST",
            });
            const data = await res.json();
            console.log("Mining response:", res.status, data);
            if (res.ok) {
                window.location.reload();
            } else {
                console.error("Mining failed:", res.status, res.statusText, data);
                alert("Mining failed! Check the console for details.");
            }
        } catch (error) {
            console.error("Error during mining:", error);
            alert("Something went wrong while mining!");
        }
    };

    console.log("Rendering Demo, isMounted:", isMounted);
    console.log("treeData:", JSON.stringify(treeData));

    if (!isMounted) {
        console.log("SSR render - skipping Tree");
        return (
            <Layout>
                <div className="w-full max-w-4xl mx-auto px-4 py-12 mt-[4rem]">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-poppins text-center">
                        Blocktree Demo
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-inter text-center">
                        Watch the blockchain split into Earth and Mars branches!
                    </p>
                    <p className="mt-8 text-center text-gray-500">Loading tree...</p>
                    <div className="mt-8 space-y-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                Main Chain
                            </h2>
                            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                                {mainChain.map((b) => (
                                    <li key={b.id}>
                                        {b.location} Block {b.id} (Hash: {b.hash})
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                Earth Branch
                            </h2>
                            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                                {earthBranch.map((b) => (
                                    <li key={b.id}>
                                        {b.location} Block {b.id} (Hash: {b.hash})
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                                Mars Branch
                            </h2>
                            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                                {marsBranch.map((b) => (
                                    <li key={b.id}>
                                        {b.location} Block {b.id} (Hash: {b.hash})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="w-full max-w-4xl mx-auto px-4 py-12 mt-[4rem]">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-poppins text-center">
                    Blocktree Demo
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-inter text-center">
                    Watch the blockchain split into Earth and Mars branches!
                </p>
                <div
                    className="mt-8 flex justify-center items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
                    style={{ height: "500px" }}
                >
                    <Tree
                        data={treeData}
                        orientation="horizontal"
                        translate={{ x: 50, y: 200 }}
                        nodeSize={{ x: 100, y: 80 }}
                        separation={{ siblings: 0.8, nonSiblings: 1 }}
                        initialDepth={2}
                        zoom={0.7}
                        styles={{
                            nodes: {
                                node: {
                                    circle: { fill: "#4b5e40", stroke: "#2f3d27", strokeWidth: 2, r: 10 },
                                    attributes: { fill: "#333", fontFamily: "Inter", fontSize: "14px", dx: "1em" },
                                },
                                leafNode: {
                                    circle: { fill: "#8b5cf6", stroke: "#5b21b6", strokeWidth: 2, r: 10 },
                                    attributes: { fill: "#333", fontFamily: "Inter", fontSize: "14px", dx: "1em" },
                                },
                            },
                            links: { stroke: "#6b7280", strokeWidth: 2 },
                        }}
                    />
                </div>
                <div className="mt-4 text-center">
                    <button
                        onClick={handleMine}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                        Mine
                    </button>
                </div>
                <div className="mt-8 space-y-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                            Main Chain
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                            {mainChain.map((b) => (
                                <li key={b.id}>
                                    {b.location} Block {b.id} (Hash: {b.hash})
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                            Earth Branch
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                            {earthBranch.map((b) => (
                                <li key={b.id}>
                                    {b.location} Block {b.id} (Hash: {b.hash})
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                            Mars Branch
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                            {marsBranch.map((b) => (
                                <li key={b.id}>
                                    {b.location} Block {b.id} (Hash: {b.hash})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}