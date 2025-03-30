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
    const [miningStatus, setMiningStatus] = useState("idle"); // "idle", "mining", "success", "error"
    const [lastMined, setLastMined] = useState(null);
    const [highlightedBranch, setHighlightedBranch] = useState(null);
    const [newNode, setNewNode] = useState(null);
    const [translate, setTranslate] = useState({ x: 100, y: 300 }); // Initial position
    const [zoom, setZoom] = useState(0.8); // Initial zoom

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const treeData = {
        name: "Root",
        children: [
            {
                name: "Earth",
                children: earthBranch.map((b) => ({
                    name: `E${b.id} (${b.hash.slice(0, 6)}...)`,
                    attributes: { fullHash: b.hash, location: b.location, timestamp: b.timestamp, id: b.id },
                })),
            },
            {
                name: "Mars",
                children: marsBranch.map((b) => ({
                    name: `M${b.id} (${b.hash.slice(0, 6)}...)`,
                    attributes: { fullHash: b.hash, location: b.location, timestamp: b.timestamp, id: b.id },
                })),
            },
        ],
    };

    const handleMine = async () => {
        setMiningStatus("mining");
        try {
            const res = await fetch("https://demo.blocktree.com/chain/mine", { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                setMiningStatus("success");
                setLastMined(new Date().toLocaleTimeString());
                const branch = data.earthBranch.length > earthBranch.length ? 'earthBranch' : 'marsBranch';
                const newBlock = data[branch].slice(-1)[0];
                setNewNode(`B${newBlock.id}`);
                setTimeout(() => {
                    setNewNode(null);
                    window.location.reload();
                }, 2000); // Flash for 2s then reload
            } else {
                setMiningStatus("error");
            }
        } catch (error) {
            setMiningStatus("error");
        }
    };

    const resetView = () => {
        setHighlightedBranch(null);
        setTranslate({ x: 100, y: 300 });
        setZoom(0.8);
    };

    const handleNodeClick = (nodeDatum) => {
        const branch = nodeDatum.parent?.data.name;
        setHighlightedBranch(branch === "Earth" || branch === "Mars" ? branch : null);
    };

    const handleTreeUpdate = ({ translate, zoom }) => {
        setTranslate(translate);
        setZoom(zoom);
    };

    if (!isMounted) {
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
                                        {b.location} Block {b.id} (Hash: {b.hash}, Mined: {new Date(b.timestamp).toLocaleTimeString()})
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
                                        {b.location} Block {b.id} (Hash: {b.hash}, Mined: {new Date(b.timestamp).toLocaleTimeString()})
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
                                        {b.location} Block {b.id} (Hash: {b.hash}, Mined: {new Date(b.timestamp).toLocaleTimeString()})
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
                <div className="mt-4 text-center text-gray-700 dark:text-gray-300 font-inter">
                    {lastMined ? `Last Mined: ${lastMined}` : "No blocks mined yet."}
                </div>
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={handleMine}
                        disabled={miningStatus === "mining"}
                        className={`px-4 py-2 rounded font-inter transition-all ${miningStatus === "mining"
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                            }`}
                    >
                        {miningStatus === "mining" ? "Mining..." : "Mine"}
                    </button>
                    <button
                        onClick={resetView}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 font-inter transition-colors"
                    >
                        Reset View
                    </button>
                </div>
                <div className="mt-2 text-center font-inter">
                    {miningStatus === "success" && (
                        <p className="text-green-500">Block mined successfully!</p>
                    )}
                    {miningStatus === "error" && (
                        <p className="text-red-500">Mining failed. Try again.</p>
                    )}
                </div>
                <div
                    className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
                    style={{ height: "600px" }}
                >
                    <Tree
                        data={treeData}
                        orientation="horizontal"
                        translate={translate}
                        zoom={zoom}
                        nodeSize={{ x: 150, y: 100 }}
                        separation={{ siblings: 1, nonSiblings: 1.5 }}
                        transitionDuration={500}
                        onNodeClick={handleNodeClick}
                        onUpdate={handleTreeUpdate}
                        styles={{
                            nodes: {
                                node: { shape: "rect" },
                                leafNode: { shape: "rect" },
                            },
                            links: {
                                stroke: "#6b7280",
                                strokeWidth: (d) =>
                                    highlightedBranch && d.source.data.name === highlightedBranch ? 4 : 2,
                                strokeDasharray: (d) =>
                                    highlightedBranch && d.source.data.name !== highlightedBranch
                                        ? "5,5"
                                        : "none",
                            },
                        }}
                        renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
                            <g>
                                <rect
                                    width={20}
                                    height={20}
                                    x={-10}
                                    y={-10}
                                    fill={
                                        nodeDatum.name === newNode
                                            ? "#ffd700" // Gold flash for new node
                                            : nodeDatum.children
                                                ? "#4b5e40"
                                                : nodeDatum.parent?.data.name === "Earth"
                                                    ? "#4b5e40"
                                                    : "#ff6b6b"
                                    }
                                    stroke={
                                        nodeDatum.children
                                            ? "#2f3d27"
                                            : nodeDatum.parent?.data.name === "Earth"
                                                ? "#2f3d27"
                                                : "#b91c1c"
                                    }
                                    strokeWidth={2}
                                    onClick={toggleNode}
                                />
                                <text dx="20" dy=".33em" fill="#333" fontFamily="Inter" fontSize="14px">
                                    {nodeDatum.name}
                                </text>
                                <title>{`${nodeDatum.attributes?.location} Block ${nodeDatum.attributes?.id} - Hash: ${nodeDatum.attributes?.fullHash} (Mined: ${new Date(nodeDatum.attributes?.timestamp).toLocaleTimeString()})`}</title>
                            </g>
                        )}
                    />
                </div>
                <div className="mt-8 space-y-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                            Main Chain
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-inter">
                            {mainChain.map((b) => (
                                <li key={b.id}>
                                    {b.location} Block {b.id} (Hash: {b.hash}, Mined: {new Date(b.timestamp).toLocaleTimeString()})
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
                                    {b.location} Block {b.id} (Hash: {b.hash}, Mined: {new Date(b.timestamp).toLocaleTimeString()})
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
                                    {b.location} Block {b.id} (Hash: {b.hash}, Mined: {new Date(b.timestamp).toLocaleTimeString()})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}