import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";

export async function loader() {
    try {
        const res = await fetch("http://77.37.54.98:3001/chain");
        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        console.error("Loader error:", error);
        return Response.json({ mainChain: [], earthBranch: [], marsBranch: [] });
    }
}

export default function Demo() {
    const initialData = useLoaderData();
    const [isMounted, setIsMounted] = useState(false);
    const [miningStatus, setMiningStatus] = useState("idle");
    const [lastMined, setLastMined] = useState(null);
    const [highlightedBranch, setHighlightedBranch] = useState(null);
    const [newNode, setNewNode] = useState(null);
    const [translate, setTranslate] = useState({ x: 100, y: 120 });
    const [zoom, setZoom] = useState(0.8);
    const [mainChain, setMainChain] = useState(initialData.mainChain);
    const [earthBranch, setEarthBranch] = useState(initialData.earthBranch);
    const [marsBranch, setMarsBranch] = useState(initialData.marsBranch);
    const treeRef = useRef();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const buildChain = (blocks, branchPrefix) => {
        if (!blocks.length) return null;
        let chain = null;
        for (let i = blocks.length - 1; i >= 0; i--) {
            const b = blocks[i];
            chain = {
                name: `${branchPrefix}${b.id} (${b.hash.slice(0, 6)}...)`,
                attributes: { fullHash: b.hash, location: b.location, timestamp: b.timestamp, id: b.id },
                children: chain ? [chain] : [],
            };
        }
        return chain;
    };

    const treeData = () => {
        const rootChain = buildChain(mainChain, "R");
        if (!rootChain) return { name: "Root", children: [] };

        const earthBlocks = earthBranch.filter(b => b.location === "Earth");
        const marsBlocks = marsBranch.filter(b => b.location === "Mars");

        if (!earthBlocks.length && !marsBlocks.length) {
            return rootChain;
        }

        let lastRoot = rootChain;
        while (lastRoot.children && lastRoot.children.length) {
            lastRoot = lastRoot.children[0];
        }

        const earthChain = buildChain(earthBlocks, "E");
        const marsChain = buildChain(marsBlocks, "M");

        lastRoot.children = [earthChain, marsChain].filter(Boolean);

        return rootChain;
    };

    const handleMine = async () => {
        setMiningStatus("mining");
        try {
            const res = await fetch("https://demo.blocktree.com/chain/mine", { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                setMiningStatus("success");
                setLastMined(new Date().toLocaleTimeString());
                setMainChain(data.mainChain);
                setEarthBranch(data.earthBranch);
                setMarsBranch(data.marsBranch);
                const branch = data.earthBranch.length > earthBranch.length ? 'earthBranch' :
                    data.marsBranch.length > marsBranch.length ? 'marsBranch' : 'mainChain';
                const newBlock = data[branch].slice(-1)[0];
                const newNodeName = `${branch === 'mainChain' ? 'R' : branch === 'earthBranch' ? 'E' : 'M'}${newBlock.id} (${newBlock.hash.slice(0, 6)}...)`;
                setNewNode(newNodeName);
                setTimeout(() => {
                    setNewNode(null);
                }, 2000); // Flash for 2s
            } else {
                setMiningStatus("error");
            }
        } catch (error) {
            setMiningStatus("error");
        }
    };

    const resetView = () => {
        setHighlightedBranch(null);
        setTranslate({ x: 100, y: 120 });
        setZoom(0.8);
    };

    const handleResetBlockchain = async () => {
        setMiningStatus("mining"); // Reuse "mining" state for simplicity
        try {
            const res = await fetch("https://demo.blocktree.com/chain/reset", { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                setMiningStatus("success");
                setLastMined(null);
                setMainChain(data.mainChain);
                setEarthBranch(data.earthBranch);
                setMarsBranch(data.marsBranch);
                setNewNode(null);
                resetView();
            } else {
                setMiningStatus("error");
            }
        } catch (error) {
            setMiningStatus("error");
        }
    };

    const handleNodeClick = (nodeDatum) => {
        const branch = nodeDatum.name.startsWith("E") ? "Earth" : nodeDatum.name.startsWith("M") ? "Mars" : "Root";
        setHighlightedBranch(branch);
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
                        className={`px-4 py-2 rounded font-inter transition-all flex items-center justify-center gap-2 ${miningStatus === "mining"
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                            }`}
                    >
                        {miningStatus === "mining" ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Mining...
                            </>
                        ) : (
                            "Mine"
                        )}
                    </button>
                    <button
                        onClick={resetView}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 font-inter transition-colors"
                    >
                        Reset View
                    </button>
                    <button
                        onClick={handleResetBlockchain}
                        disabled={miningStatus === "mining"}
                        className={`px-4 py-2 rounded font-inter transition-all ${miningStatus === "mining"
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        Reset Blocktree
                    </button>
                </div>
                <div className="mt-2 text-center font-inter h-6">
                    {miningStatus === "success" && (
                        <p className="text-green-500">Block mined successfully!</p>
                    )}
                    {miningStatus === "error" && (
                        <p className="text-red-500">Mining failed. Try again.</p>
                    )}
                </div>
                <div
                    className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
                    style={{ height: "300px" }}
                >
                    <Tree
                        ref={treeRef}
                        data={treeData()}
                        orientation="horizontal"
                        translate={translate}
                        zoom={zoom}
                        nodeSize={{ x: 200, y: 100 }}
                        separation={{ siblings: 0.5, nonSiblings: 1 }}
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
                                    highlightedBranch &&
                                        (d.source.name.startsWith(highlightedBranch[0]) || d.target.name.startsWith(highlightedBranch[0]))
                                        ? 4
                                        : 2,
                                strokeDasharray: (d) =>
                                    highlightedBranch &&
                                        !(d.source.name.startsWith(highlightedBranch[0]) || d.target.name.startsWith(highlightedBranch[0]))
                                        ? "5,5"
                                        : "none",
                            },
                        }}
                        renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
                            <g>
                                <defs>
                                    <linearGradient id="rootGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: "#4b5e40", stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: "#2f3d27", stopOpacity: 1 }} />
                                    </linearGradient>
                                    <linearGradient id="marsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: "#ff6b6b", stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: "#b91c1c", stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <rect
                                    width={24}
                                    height={24}
                                    x={-12}
                                    y={-12}
                                    fill={
                                        nodeDatum.name === newNode
                                            ? "#ffd700"
                                            : nodeDatum.name.startsWith("R") || nodeDatum.name.startsWith("E")
                                                ? "url(#rootGradient)"
                                                : "url(#marsGradient)"
                                    }
                                    stroke={
                                        nodeDatum.name.startsWith("R") || nodeDatum.name.startsWith("E") ? "#2f3d27" : "#b91c1c"
                                    }
                                    strokeWidth={2}
                                    onClick={toggleNode}
                                />
                                <text
                                    dx="0"
                                    dy="30"
                                    fill="#333"
                                    fontFamily="Inter"
                                    fontSize="18px"
                                    fontWeight="100"
                                    textAnchor="middle"
                                >
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