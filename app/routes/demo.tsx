import { useLoaderData } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";

export async function loader() {
  try {
    const res = await fetch("http://77.37.54.98:3001/chain");
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Loader error:", error);
    return Response.json({
      mainChain: [],
      earthBranch: [],
      marsBranch: [],
      earth1Branch: [],
      venusBranch: [],
      mars1Branch: [],
      europaBranch: [],
    });
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
  const [earth1Branch, setEarth1Branch] = useState(
    initialData.earth1Branch || []
  );
  const [venusBranch, setVenusBranch] = useState(initialData.venusBranch || []);
  const [mars1Branch, setMars1Branch] = useState(initialData.mars1Branch || []);
  const [europaBranch, setEuropaBranch] = useState(
    initialData.europaBranch || []
  );
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const treeRef = useRef();

  useEffect(() => {
    setIsMounted(true);
    
    // 检测屏幕尺寸
    const checkScreenSize = () => {
      // 假设M屏幕的断点是768px
      setIsMediumScreen(window.innerWidth < 768);
    };
    
    // 初始检查
    checkScreenSize();
    
    // 添加事件监听
    window.addEventListener('resize', checkScreenSize);
    
    // 清理事件监听
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const buildChain = (blocks, branchPrefix) => {
    if (!blocks.length) return null;
    let chain = null;
    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i];
      chain = {
        name: `${branchPrefix}${b.id} (${b.hash.slice(0, 6)}...)`,
        attributes: {
          fullHash: b.hash,
          location: b.location,
          timestamp: b.timestamp,
          id: b.id,
        },
        children: chain ? [chain] : [],
      };
    }
    return chain;
  };

  const treeData = () => {
    const rootChain = buildChain(mainChain, "R");
    if (!rootChain) return { name: "Root", children: [] };

    const earthBlocks = earthBranch.filter((b) => b.location === "Earth");
    const marsBlocks = marsBranch.filter((b) => b.location === "Mars");
    const earth1Blocks = earth1Branch.filter((b) => b.location === "Earth1");
    const venusBlocks = venusBranch.filter((b) => b.location === "Venus");
    const mars1Blocks = mars1Branch.filter((b) => b.location === "Mars1");
    const europaBlocks = europaBranch.filter((b) => b.location === "Europa");

    if (
      !earthBlocks.length &&
      !marsBlocks.length &&
      !earth1Blocks.length &&
      !venusBlocks.length &&
      !mars1Blocks.length &&
      !europaBlocks.length
    ) {
      return rootChain;
    }

    let lastRoot = rootChain;
    while (lastRoot.children && lastRoot.children.length) {
      lastRoot = lastRoot.children[0];
    }

    const earthChain = buildChain(earthBlocks, "E");
    const marsChain = buildChain(marsBlocks, "M");
    lastRoot.children = [earthChain, marsChain].filter(Boolean);

    if (earth1Blocks.length || venusBlocks.length) {
      let lastEarth = earthChain;
      while (lastEarth.children && lastEarth.children.length) {
        lastEarth = lastEarth.children[0];
      }
      const earth1Chain = buildChain(earth1Blocks, "E1");
      const venusChain = buildChain(venusBlocks, "V");
      lastEarth.children = [earth1Chain, venusChain].filter(Boolean);
    }

    if (mars1Blocks.length || europaBlocks.length) {
      let lastMars = marsChain;
      while (lastMars.children && lastMars.children.length) {
        lastMars = lastMars.children[0];
      }
      const mars1Chain = buildChain(mars1Blocks, "M1");
      const europaChain = buildChain(europaBlocks, "Eu");
      lastMars.children = [mars1Chain, europaChain].filter(Boolean);
    }

    return rootChain;
  };

  const handleMine = async () => {
    setMiningStatus("mining");
    try {
      const res = await fetch("https://demo.blocktree.com/chain/mine", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setMiningStatus("success");
        setLastMined(new Date().toLocaleTimeString());
        setMainChain(data.mainChain);
        setEarthBranch(data.earthBranch);
        setMarsBranch(data.marsBranch);
        setEarth1Branch(data.earth1Branch || []);
        setVenusBranch(data.venusBranch || []);
        setMars1Branch(data.mars1Branch || []);
        setEuropaBranch(data.europaBranch || []);
        const branchLengths = {
          mainChain: data.mainChain.length - mainChain.length,
          earthBranch: data.earthBranch.length - earthBranch.length,
          marsBranch: data.marsBranch.length - marsBranch.length,
          earth1Branch: (data.earth1Branch?.length || 0) - earth1Branch.length,
          venusBranch: (data.venusBranch?.length || 0) - venusBranch.length,
          mars1Branch: (data.mars1Branch?.length || 0) - mars1Branch.length,
          europaBranch: (data.europaBranch?.length || 0) - europaBranch.length,
        };
        const grownBranch =
          Object.keys(branchLengths).find((key) => branchLengths[key] > 0) ||
          "mainChain";
        const newBlock = data[grownBranch].slice(-1)[0];
        const newNodeName = `${
          grownBranch === "mainChain"
            ? "R"
            : grownBranch === "earthBranch"
            ? "E"
            : grownBranch === "marsBranch"
            ? "M"
            : grownBranch === "earth1Branch"
            ? "E1"
            : grownBranch === "venusBranch"
            ? "V"
            : grownBranch === "mars1Branch"
            ? "M1"
            : "Eu"
        }${newBlock.id} (${newBlock.hash.slice(0, 6)}...)`;
        setNewNode(newNodeName);
        setTimeout(() => {
          setNewNode(null);
        }, 2000);
      } else {
        setMiningStatus("error");
      }
    } catch (error) {
      setMiningStatus("error");
    }
  };

  const resetView = () => {
    const longestBranch = Math.max(
      mainChain.length,
      earthBranch.length,
      marsBranch.length,
      earth1Branch.length,
      venusBranch.length,
      mars1Branch.length,
      europaBranch.length
    );
    const newZoom = Math.min(0.8 / (longestBranch / 4), 0.8);
    setHighlightedBranch(null);
    setTranslate({ x: 100, y: 120 });
    setZoom(newZoom);
  };

  const handleResetBlockchain = async () => {
    setMiningStatus("mining");
    try {
      const res = await fetch("https://demo.blocktree.com/chain/reset", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setMiningStatus("success");
        setLastMined(null);
        setMainChain(data.mainChain);
        setEarthBranch(data.earthBranch);
        setMarsBranch(data.marsBranch);
        setEarth1Branch(data.earth1Branch || []);
        setVenusBranch(data.venusBranch || []);
        setMars1Branch(data.mars1Branch || []);
        setEuropaBranch(data.europaBranch || []);
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
    const branch = nodeDatum.name.startsWith("E1")
      ? "Earth1"
      : nodeDatum.name.startsWith("E")
      ? "Earth"
      : nodeDatum.name.startsWith("M1")
      ? "Mars1"
      : nodeDatum.name.startsWith("M")
      ? "Mars"
      : nodeDatum.name.startsWith("V")
      ? "Venus"
      : nodeDatum.name.startsWith("Eu")
      ? "Europa"
      : "Root";
    setHighlightedBranch(branch);
  };

  const handleTreeUpdate = ({ translate, zoom }) => {
    setTranslate(translate);
    setZoom(zoom);
  };

  // 标题样式
  const titleStyle = {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: isMediumScreen ? '2rem' : '40px',
    fontStyle: 'normal',
    fontWeight: isMediumScreen ? 300 : 'medium',
    lineHeight: 'normal'
  };
  
  // 描述样式
  const descriptionStyle = {
    marginTop: '4px',
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: isMediumScreen ? '0.875rem' : '16px',
    fontStyle: 'normal',
    fontWeight: 'extralight',
    lineHeight: 'normal'
  };
  
  // 挖矿历史标题样式
  const miningHistoryTitleStyle = {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: isMediumScreen ? '1.375rem' : '26px',
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal'
  };
  
  // 表格文字样式
  const tableTextStyle = {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: isMediumScreen ? '12px' : '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal'
  };

  if (!isMounted) {
    return (
      <div className="w-full relative">
        <img
          src="/demo-background.png"
          alt="Background"
          className="absolute -top-16 left-0 right-0 w-full h-auto z-0 object-cover"
        />
        <div className="w-full max-w-4xl mx-auto px-4 md:px-12 py-12 mt-[4rem] relative z-10">
          <h1 className="text-center text-white font-poppins text-[40px] font-medium leading-normal" style={titleStyle}>
            BLOCKTREE DEMO
          </h1>
          <p className="mt-4 text-center text-white font-poppins font-extralight leading-normal" style={descriptionStyle}>
            Watch the blockchain split into Earth and Mars branches!
          </p>
          <p className="mt-8 text-center text-gray-500">Loading tree...</p>
          <div className="mt-8 space-y-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                Main Chain
              </h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-poppins">
                {mainChain.map((b) => (
                  <li key={b.id}>
                    {b.location} Block {b.id} (Hash: {b.hash}, Mined:{" "}
                    {new Date(b.timestamp).toLocaleTimeString()})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                Earth Branch
              </h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-poppins">
                {earthBranch.map((b) => (
                  <li key={b.id}>
                    {b.location} Block {b.id} (Hash: {b.hash}, Mined:{" "}
                    {new Date(b.timestamp).toLocaleTimeString()})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                Mars Branch
              </h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-poppins">
                {marsBranch.map((b) => (
                  <li key={b.id}>
                    {b.location} Block {b.id} (Hash: {b.hash}, Mined:{" "}
                    {new Date(b.timestamp).toLocaleTimeString()})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                Earth1 Branch
              </h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-poppins">
                {earth1Branch.map((b) => (
                  <li key={b.id}>
                    {b.location} Block {b.id} (Hash: {b.hash}, Mined:{" "}
                    {new Date(b.timestamp).toLocaleTimeString()})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                Venus Branch
              </h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-poppins">
                {venusBranch.map((b) => (
                  <li key={b.id}>
                    {b.location} Block {b.id} (Hash: {b.hash}, Mined:{" "}
                    {new Date(b.timestamp).toLocaleTimeString()})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                Mars1 Branch
              </h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-poppins">
                {mars1Branch.map((b) => (
                  <li key={b.id}>
                    {b.location} Block {b.id} (Hash: {b.hash}, Mined:{" "}
                    {new Date(b.timestamp).toLocaleTimeString()})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins mb-2">
                Europa Branch
              </h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 font-poppins">
                {europaBranch.map((b) => (
                  <li key={b.id}>
                    {b.location} Block {b.id} (Hash: {b.hash}, Mined:{" "}
                    {new Date(b.timestamp).toLocaleTimeString()})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <img
        src="/demo-background.png"
        alt="Background"
        className="absolute -top-16 left-0 right-0 w-full h-auto z-0 object-cover"
      />
      <div className="w-full max-w-4xl mx-auto px-4 md:px-12 py-12 mt-[4rem] relative z-0">
        <h1 className="text-center text-white font-poppins leading-normal" style={titleStyle}>
          BLOCKTREE DEMO
        </h1>
        <p className="mt-4 text-center text-white font-poppins font-extralight leading-normal" style={descriptionStyle}>
          Watch the blockchain split into Earth and Mars branches!
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleMine}
            disabled={miningStatus === "mining"}
            className={`group flex items-center justify-center gap-2 rounded-[10px] border border-[#3B3B3B] bg-[rgba(44,44,44,0.60)] px-4 py-2 transition-all font-poppins text-white ${
              miningStatus === "mining"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[rgba(60,60,60,0.60)] hover:shadow-[4px_4px_20px_10px_rgba(96,96,96,0.20)]"
            }`}
            style={{ fontSize: isMediumScreen ? '0.875rem' : '16px', fontWeight: 'semibold' }}
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
            className="rounded-[10px] border border-[#3B3B3B] bg-[rgba(44,44,44,0.60)] px-4 py-2 transition-all font-poppins text-white hover:bg-[rgba(60,60,60,0.60)] hover:shadow-[4px_4px_20px_10px_rgba(96,96,96,0.20)]"
            style={{ fontSize: isMediumScreen ? '0.875rem' : '16px', fontWeight: 'semibold' }}
          >
            Reset View
          </button>
          <button
            onClick={handleResetBlockchain}
            disabled={miningStatus === "mining"}
            className={`group rounded-[10px] border border-[#3B3B3B] bg-[rgba(44,44,44,0.60)] px-4 py-2 transition-all font-poppins text-white ${
              miningStatus === "mining"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[rgba(60,60,60,0.60)] hover:shadow-[4px_4px_20px_10px_rgba(96,96,96,0.20)]"
            }`}
            style={{ fontSize: isMediumScreen ? '0.875rem' : '16px', fontWeight: 'semibold' }}
          >
            Reset Blocktree
          </button>
        </div>
        <div className="mt-4 text-center font-poppins h-6">
          {miningStatus === "success" && (
            <p className="text-green-500">Block mined successfully!</p>
          )}
          {miningStatus === "error" && (
            <p className="text-red-500">Mining failed. Please try again.</p>
          )}
        </div>
        <div
          className="rounded-lg shadow-md relative bg-[#2C2C2C] bg-opacity-60 backdrop-blur-[10px] border border-[#3B3B3B]"
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
                stroke: "#D1D5DB", 
                strokeWidth: (d) =>
                  highlightedBranch &&
                  (d.source.name.startsWith(highlightedBranch[0]) ||
                    d.target.name.startsWith(highlightedBranch[0]))
                    ? 4
                    : 2,
                strokeDasharray: (d) =>
                  highlightedBranch &&
                  !(
                    d.source.name.startsWith(highlightedBranch[0]) ||
                    d.target.name.startsWith(highlightedBranch[0])
                  )
                    ? "5,5"
                    : "none",
              },
            }}
            renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
              <g>
                <defs>
                  <linearGradient id="rootGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#6B7280", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#9CA3AF", stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="marsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#F87171", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#EF4444", stopOpacity: 1 }} />
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
                      : nodeDatum.name.startsWith("R") ||
                        nodeDatum.name.startsWith("E") ||
                        nodeDatum.name.startsWith("E1") ||
                        nodeDatum.name.startsWith("V")
                      ? "url(#rootGradient)"
                      : "url(#marsGradient)"
                  }
                  stroke={
                    nodeDatum.name.startsWith("R") ||
                    nodeDatum.name.startsWith("E") ||
                    nodeDatum.name.startsWith("E1") ||
                    nodeDatum.name.startsWith("V")
                      ? "#9CA3AF"
                      : "#EF4444"
                  }
                  strokeWidth={2}
                  onClick={toggleNode}
                />
                <text
                  dx="0"
                  dy="30"
                  fill="#FFFFFF"
                  fontFamily="Poppins"
                  fontSize={isMediumScreen ? "14px" : "18px"}
                  fontWeight="100"
                  textAnchor="middle"
                >
                  {nodeDatum.name}
                </text>
                <title>{`${nodeDatum.attributes?.location} Block ${
                  nodeDatum.attributes?.id
                } - Hash: ${nodeDatum.attributes?.fullHash} (Mined: ${new Date(
                  nodeDatum.attributes?.timestamp
                ).toLocaleTimeString()})`}</title>
              </g>
            )}
          />
        </div>
        <div className="mt-32 space-y-4">
  <h1 style={miningHistoryTitleStyle}>
    MINING HISTORY
  </h1>

  {/* Header Row */}
  <div style={{
    borderRadius: '10px',
    border: '1px solid #3B3B3B',
    background: '#2C2C2C',
    boxShadow: '0px 4px 20px 0px rgba(96, 96, 96, 0.20)',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    padding: isMediumScreen ? '0 10px' : '0 20px'
  }}>
    <div style={{ flex: 1, ...tableTextStyle, textAlign: 'left' }}>
      Branch Name
    </div>
    <div style={{ flex: 1, ...tableTextStyle, textAlign: 'right' }}>
      Block Name
    </div>
    <div style={{ flex: 1, ...tableTextStyle, textAlign: 'right' }}>
      Hash
    </div>
    <div style={{ flex: 1, ...tableTextStyle, textAlign: 'right' }}>
      Time Mined
    </div>
  </div>

  {/* Branch Rows - Only show branches with blocks */}
  {[
    { name: 'Main Chain', blocks: mainChain },
    { name: 'Earth Branch', blocks: earthBranch },
    { name: 'Mars Branch', blocks: marsBranch },
    { name: 'Earth1 Branch', blocks: earth1Branch },
    { name: 'Venus Branch', blocks: venusBranch },
    { name: 'Mars1 Branch', blocks: mars1Branch },
    { name: 'Europa Branch', blocks: europaBranch }
  ]
    .filter(branch => branch.blocks.length > 0)
    .map((branch, index) => (
      <div key={index} style={{
        borderRadius: '10px',
        border: '1px solid #3B3B3B',
        background: '#2C2C2C',
        boxShadow: '0px 4px 20px 0px rgba(96, 96, 96, 0.20)',
        minHeight: '50px',
        display: 'flex',
        padding: isMediumScreen ? '0 10px' : '0 20px',
        marginBottom: '10px',
        position: 'relative'
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          ...tableTextStyle,
          textAlign: 'left'
        }}>
          {branch.name}
          <div style={{
            position: 'absolute',
            left: '95%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: '#565656'
          }}></div>
        </div>
        <div style={{ flex: 3, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {branch.blocks.map((b, blockIndex) => (
            <div key={b.id} style={{
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              position: 'relative',
              ...tableTextStyle
            }}>
              <div style={{ flex: 1, textAlign: 'right' }}>{b.location} Block {b.id}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{b.hash}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{new Date(b.timestamp).toLocaleTimeString()}</div>
              {blockIndex < branch.blocks.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '-1.5%',
                  right: isMediumScreen ? '-10px' : '-20px',
                  bottom: 0,
                  height: '1px',
                  background: '#565656'
                }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    ))}
</div>
      </div>
    </div>
  );
}