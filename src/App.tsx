import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  BadgeDollarSign,
  HeartPulse,
  ShieldCheck,
  Check,
  Phone,
  MapPin,
  Mail,
  Lock,
  Compass,
  ArrowUpRight,
  Sliders,
  Activity,
  Globe,
  Award,
} from "lucide-react";

/* ----------------------------------------------------------------
   PREMIUM UTILITIES & SHADERS
-----------------------------------------------------------------*/

// WordsPullUp Component - Animates each word sliding up from an overflow hidden container
const WordsPullUp = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden pb-1 ${className}`}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: i * 0.04,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// WordsPullUpMultiStyle Component - Combined Normal and Italic-Serif font sections
interface Part {
  text: string;
  italic?: boolean;
}

const WordsPullUpMultiStyle = ({ parts, className = "" }: { parts: Part[]; className?: string }) => {
  return (
    <h2 className={`font-medium tracking-tight ${className}`}>
      {parts.map((p, i) => (
        <span key={i} className="inline-block overflow-hidden mr-2">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              delay: i * 0.05,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${p.italic ? "font-serif italic text-primary" : ""}`}
          >
            {p.text}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};

// AnimatedLetter Component - Character-by-character scroll opacity text animation
const AnimatedLetter = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={`leading-relaxed text-[#DEDBC8] ${className}`}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = Math.min(1, start + 0.06);
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

        return (
          <motion.span key={i} style={{ opacity }} className="transition-colors duration-150">
            {char}
          </motion.span>
        );
      })}
    </p>
  );
};

/* ----------------------------------------------------------------
   STATIC TECHNICAL STRUCTURAL BLUEPRINT GRID
-----------------------------------------------------------------*/
const StaticStructuralGrid = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-40 select-none">
      {/* Structural SVG Blueprint Overlay */}
      <svg className="w-full h-full text-white/5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="structural-grid-pattern" width="90" height="90" patternUnits="userSpaceOnUse">
            <path d="M 90 0 L 0 0 0 90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        
        {/* Draw repeating structural grid */}
        <rect width="100%" height="100%" fill="url(#structural-grid-pattern)" />
        
        {/* Fine crosshair (+) ticks and mathematical coordinate tags */}
        {[
          { x: 180, y: 180, label: "ADVISORY.GRID [A-01]" },
          { x: 1080, y: 150, label: "SYS.RATIOS [X-09]" },
          { x: 270, y: 630, label: "RISK.BOUNDS [B-04]" },
          { x: 990, y: 540, label: "PORTFOLIO.FLOW [Y-07]" },
        ].map((marker, i) => (
          <g key={i} className="text-primary/25">
            {/* Horizontal line tick */}
            <line x1={marker.x - 12} y1={marker.y} x2={marker.x + 12} y2={marker.y} stroke="currentColor" strokeWidth="0.75" />
            {/* Vertical line tick */}
            <line x1={marker.x} y1={marker.y - 12} x2={marker.x} y2={marker.y + 12} stroke="currentColor" strokeWidth="0.75" />
            {/* Small technical coordinate tag typography text */}
            <text x={marker.x + 8} y={marker.y - 4} className="fill-[#DEDBC8]/45 font-mono text-[7px] tracking-wider">
              {marker.label}
            </text>
          </g>
        ))}

        {/* Institutional axis labeling markers */}
        <g className="text-[#DEDBC8]/25 font-mono text-[7px] tracking-[0.25em] uppercase">
          <text x="30" y="40">Index: PSX KSE-100</text>
          <text x="30" y="55">Lat: 33.6844 N</text>
          <text x="30" y="70">Long: 73.0479 E</text>
          
          <text x="96%" y="40" textAnchor="end">Custody: Secured</text>
          <text x="96%" y="55" textAnchor="end">Model: Accumulate</text>
          <text x="96%" y="70" textAnchor="end">Asset Advisory: Active</text>
        </g>
      </svg>
    </div>
  );
};

/* ----------------------------------------------------------------
   3D PERSPECTIVE TILT CARD COMPONENT (Mobile-Optimized)
-----------------------------------------------------------------*/
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate relative mouse coordinates inside the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlowX(x);
    setGlowY(y);

    const mouseX = x - width / 2;
    const mouseY = y - height / 2;

    // Limit rotation to safe bounds (max 10 degrees)
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        rotateX: isMobile ? 0 : rotateX, 
        rotateY: isMobile ? 0 : rotateY, 
        scale: isHovered && !isMobile ? 1.015 : 1 
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.6 }}
      className={`relative rounded-3xl overflow-hidden bg-[#0b291a]/60 backdrop-blur-md border border-[#0b291a]/30 p-6 sm:p-8 transition-all duration-500 cursor-none select-none group shadow-2xl ${className}`}
    >
      {/* 3D Spotlight Glow Overlay (Disabled on Mobile) */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(280px circle at ${glowX}px ${glowY}px, rgba(212, 175, 55, 0.1), transparent 50%)`,
          }}
        />
      )}

      {/* Floating 3D Depth Layer */}
      <div style={{ transform: isMobile ? "none" : "translateZ(35px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------------
   INTERACTIVE PSX COMPOUNDING GRAPH WIDGET (Mobile-Optimized)
-----------------------------------------------------------------*/
const PSXCompoundingWidget = () => {
  const [initialCapital, setInitialCapital] = useState(500000); // Default 500k PKR
  const [monthlySavings, setMonthlySavings] = useState(30000);   // Default 30k PKR
  const [growthRate, setGrowthRate] = useState(18);             // 18% PSX Average Yield
  const [years, setYears] = useState(15);                       // 15 Year Duration

  // Compounding Calculations
  const calculateData = () => {
    const psxGrowthPoints: number[] = [];
    const devalCashPoints: number[] = [];

    const r = growthRate / 100 / 12; // Monthly compounded return
    const inflation = 0.09;          // 9% average PKR Devaluation/Inflation drag

    let currentPsxPortfolio = initialCapital;
    let currentCashRealValue = initialCapital;

    // Monthly compound simulation
    for (let yr = 0; yr <= years; yr++) {
      psxGrowthPoints.push(Math.round(currentPsxPortfolio));
      devalCashPoints.push(Math.round(currentCashRealValue));

      // Simulate 12 months compounding growth vs cash devaluation
      for (let m = 0; m < 12; m++) {
        // Amanah compound model (Growth + periodic contributions)
        currentPsxPortfolio = currentPsxPortfolio * (1 + r) + monthlySavings;
        // Idle cash devaluation model ( contributions drop in real purchasing value + inflation drag)
        currentCashRealValue = (currentCashRealValue + monthlySavings) * (1 - inflation / 12);
      }
    }

    return { psxGrowthPoints, devalCashPoints };
  };

  const { psxGrowthPoints, devalCashPoints } = calculateData();

  // Plot details for custom visual SVG graph
  const maxVal = Math.max(...psxGrowthPoints);
  const minVal = Math.min(...devalCashPoints);
  
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 20;

  const pointsCount = psxGrowthPoints.length;

  const getCoordinates = (points: number[]) => {
    return points.map((val, idx) => {
      const x = paddingX + (idx / (pointsCount - 1)) * (width - paddingX * 2);
      // logarithmic scale mapping
      const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
      return { x, y };
    });
  };

  const psxCoords = getCoordinates(psxGrowthPoints);
  const cashCoords = getCoordinates(devalCashPoints);

  // SVG Line path strings
  const getPathString = (coords: { x: number; y: number }[]) => {
    return coords.reduce((acc, coord, idx) => {
      return idx === 0 ? `M ${coord.x} ${coord.y}` : `${acc} L ${coord.x} ${coord.y}`;
    }, "");
  };

  const psxPath = getPathString(psxCoords);
  const cashPath = getPathString(cashCoords);

  // Formatting large values into Pakistani millions/crores
  const formatPKR = (num: number) => {
    if (num >= 10000000) return `Rs. ${(num / 10000000).toFixed(2)} Cr`; // Crores
    if (num >= 100000) return `Rs. ${(num / 100000).toFixed(1)} Lakh`;   // Lakhs
    return `Rs. ${num.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0b291a]/80 backdrop-blur-md border border-[#0b291a]/40 p-5 sm:p-8 rounded-[2rem] shadow-3xl text-left relative z-20">
      
      {/* Control Nodes with Touch targets */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-white tracking-wide">Compounding Controls</h3>
        </div>

        {/* Initial Contribution */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-400 font-light">Initial Advisory Capital</span>
            <span className="text-primary font-medium">{formatPKR(initialCapital)}</span>
          </div>
          <div className="relative py-2 select-none">
            <input
              type="range"
              min="50000"
              max="5000000"
              step="50000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full h-2 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37] py-2"
            />
          </div>
        </div>

        {/* Monthly Accumulations */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A8A695] font-light">Monthly Saved Contribution</span>
            <span className="text-[#DEDBC8] font-medium">{formatPKR(monthlySavings)}</span>
          </div>
          <div className="relative py-2 select-none">
            <input
              type="range"
              min="5000"
              max="300000"
              step="5000"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
              className="w-full h-2 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37] py-2"
            />
          </div>
        </div>

        {/* Compound Interest Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A8A695] font-light">Estimated Growth Yield</span>
            <span className="text-[#DEDBC8] font-medium">{growthRate}% APY</span>
          </div>
          <div className="relative py-2 select-none">
            <input
              type="range"
              min="8"
              max="28"
              step="1"
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="w-full h-2 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37] py-2"
            />
          </div>
          <p className="text-[10px] text-[#A8A695]/60 font-light italic">
            *Historical PSX annualized yield indexes track 16% - 22%.
          </p>
        </div>

        {/* Duration Sliders */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A8A695] font-light">Compound Horizon</span>
            <span className="text-[#DEDBC8] font-medium">{years} Years</span>
          </div>
          <div className="relative py-2 select-none">
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37] py-2"
            />
          </div>
        </div>
      </div>

      {/* Financial Vector Visualization Plot */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[9px] tracking-widest uppercase text-gray-500 font-bold block mb-1">
                Compound Simulation
              </span>
              <h3 className="text-lg sm:text-2xl text-white font-medium">
                Portfolio Growth Forecast
              </h3>
            </div>
            
            {/* Projected Capital outcome */}
            <div className="text-right">
              <span className="text-[9px] tracking-widest uppercase text-primary font-bold block mb-1">
                Projected Value
              </span>
              <span className="text-lg sm:text-2xl text-[#d4af37] font-semibold block">
                {formatPKR(psxGrowthPoints[years])}
              </span>
            </div>
          </div>

          {/* SVG Custom interactive Line Chart */}
          <div className="relative border-b border-l border-[#0b291a]/40 py-4 w-full h-[200px] sm:h-[240px] select-none bg-[#061a10]/50 rounded-xl overflow-hidden">
            
            {/* Grid Helper lines */}
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-emerald-dark/10" />
            <div className="absolute top-2/4 left-0 w-full h-[1px] bg-emerald-dark/10" />
            <div className="absolute top-3/4 left-0 w-full h-[1px] bg-emerald-dark/10" />

            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              
              {/* Cash Devaluation Line Plot */}
              <motion.path
                d={cashPath}
                fill="none"
                stroke="#A8A695"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Amanah Growth Line Plot */}
              <motion.path
                d={psxPath}
                fill="none"
                stroke="#d4af37"
                strokeWidth="3.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              
              {/* Endpoint Glowing Aura circle */}
              {psxCoords.length > 0 && (
                <motion.circle
                  cx={psxCoords[psxCoords.length - 1].x}
                  cy={psxCoords[psxCoords.length - 1].y}
                  r="6"
                  fill="#d4af37"
                  className="shadow-2xl"
                  animate={{ r: [5, 8, 5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </svg>
          </div>
        </div>

        {/* Legend stats comparison */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-6 pt-4 border-t border-white/5 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary shrink-0" />
            <span className="text-gray-300 font-light">
              Amanah Active PSX Strategy ({growthRate}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 border-t-2 border-dashed border-gray-600 shrink-0" />
            <span className="text-gray-400 font-light">
              Idle Rupee Cash (9% Devaluation Drag)
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ----------------------------------------------------------------
   MAIN APP REDESIGN CONTROL
-----------------------------------------------------------------*/

export default function App() {
  // Active states
  const [activeNav, setActiveNav] = useState("Home");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Real-time stock tickers state
  const [tickers, setTickers] = useState([
    { title: "KSE-100 INDEX", value: "74,320.15", change: "+1.42%", positive: true },
    { title: "AMANAH STRATEGY", value: "+24.8% APY", change: "15-Yr Avg", positive: true },
    { title: "OGDC", value: "142.50", change: "+2.1%", positive: true },
    { title: "SYSTEMS LTD", value: "412.30", change: "+3.8%", positive: true },
    { title: "MEEZAN BANK", value: "187.60", change: "+1.2%", positive: true },
    { title: "ENGRO CORP", value: "318.40", change: "-0.4%", positive: false },
    { title: "LUCKY CEMENT", value: "815.10", change: "+1.9%", positive: true },
  ]);

  // Live stock data fetcher helper
  const extractYahooData = (data: any) => {
    const result = data?.chart?.result?.[0];
    if (!result) return null;
    const price = result.meta?.regularMarketPrice;
    const prevClose = result.meta?.chartPreviousClose;
    if (price === undefined || prevClose === undefined) return null;
    const changeRaw = price - prevClose;
    const percentChange = prevClose !== 0 ? (changeRaw / prevClose) * 100 : 0;
    return {
      price: price.toFixed(2),
      change: `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`,
      positive: percentChange >= 0
    };
  };

  const fetchLiveTicker = async (symbol: string) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
    try {
      const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error("CORS Proxy IO failed");
      const data = await response.json();
      return extractYahooData(data);
    } catch (err) {
      console.warn(`corsproxy.io failed for ${symbol}, trying allorigins...`, err);
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error("Allorigins failed");
        const resData = await response.json();
        const data = JSON.parse(resData.contents);
        return extractYahooData(data);
      } catch (err2) {
        console.error(`All fetching failed for ${symbol}`, err2);
        return null;
      }
    }
  };

  useEffect(() => {
    const fetchAllLivePrices = async () => {
      const ogdcData = await fetchLiveTicker("OGDC.KA");
      const sysData = await fetchLiveTicker("SYS.KA");
      const kseData = await fetchLiveTicker("%5ECS100");

      setTickers(prev => prev.map(t => {
        if (t.title === "OGDC" && ogdcData) {
          return { ...t, value: ogdcData.price, change: ogdcData.change, positive: ogdcData.positive };
        }
        if (t.title === "SYSTEMS LTD" && sysData) {
          return { ...t, value: sysData.price, change: sysData.change, positive: sysData.positive };
        }
        if (t.title === "KSE-100 INDEX" && kseData) {
          return { ...t, value: parseFloat(kseData.price).toLocaleString("en-US", { minimumFractionDigits: 2 }), change: kseData.change, positive: kseData.positive };
        }
        return t;
      }));
    };

    fetchAllLivePrices();
    const interval = setInterval(fetchAllLivePrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Detect mobile viewports to adapt spring configuration and pointer styles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pointer position coordinates (Disabled on mobile)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "hovered" | "difference">("default");

  // Mobile-Optimized Spring Physics to prevent lag on mid-range phones
  const springConfig = isMobile 
    ? { stiffness: 220, damping: 24, mass: 0.8 } 
    : { stiffness: 450, damping: 30, mass: 0.6 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.classList.add("custom-cursor-enabled");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [cursorX, cursorY, isMobile]);

  // Scroll spy detection using IntersectionObserver
  useEffect(() => {
    const sections = ["home", "why-invest", "psx", "services", "contact"];
    
    const observerOptions = {
      root: null, // default viewport
      rootMargin: "-28% 0px -28% 0px", // triggers when crossing viewport bounds
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const mappedName = id === "home" ? "Home" : 
                             id === "why-invest" ? "Why Invest" : 
                             id === "psx" ? "PSX" : 
                             id === "services" ? "Services" : "Contact";
          setActiveNav(mappedName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Scroll listener to hide navbar past 80px
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax calculations for scroll actions
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroContentY = useTransform(heroScrollProgress, [0, 1], ["0px", "140px"]);
  const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.75], [1, 0]);

  // Interactive mouse events
  const enterInteractive = (text = "", type: "hovered" | "difference" = "hovered") => {
    if (isMobile) return;
    setCursorText(text);
    setCursorType(type);
    cursorScale.set(type === "difference" ? 3.5 : 1.8);
  };

  const leaveInteractive = () => {
    if (isMobile) return;
    setCursorText("");
    setCursorType("default");
    cursorScale.set(1);
  };

  const navItems = ["Home", "Why Invest", "PSX", "Services", "Contact"];

  return (
    <div className="bg-[#061a10] text-[#A8A695] font-sans overflow-x-hidden min-h-screen relative selection:bg-[#DEDBC8] selection:text-[#061a10]">
      
      {/* -----------------------------------------------------------
         AWWWARDS CUSTOM CURSOR (Hidden on Mobile)
      ------------------------------------------------------------ */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: cursorScale,
        }}
        className={`fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-50 transition-colors duration-300 hidden md:flex items-center justify-center text-[4px] font-bold tracking-widest uppercase select-none ${
          cursorType === "hovered"
            ? "bg-[#DEDBC8] text-[#061a10] shadow-[0_0_18px_rgba(212,175,55,0.6)]"
            : cursorType === "difference"
            ? "bg-white mix-blend-difference"
            : "bg-[#DEDBC8]/30 border border-[#d4af37]/50"
        }`}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-black text-[5px] scale-90"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* -----------------------------------------------------------
         FLOATING NAVBAR (Desktop Only, Hides on Scroll down past 80px)
      ------------------------------------------------------------ */}
      <motion.header
        animate={{ y: scrolled ? -100 : 0, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-40 px-4 md:px-6 pt-4 hidden md:flex justify-center pointer-events-none"
      >
        <nav 
          className="bg-[#061a10]/90 backdrop-blur-md rounded-full border border-[#0b291a]/40 shadow-2xl px-4 py-2 sm:px-6 flex items-center gap-3 sm:gap-5 md:gap-8 relative overflow-hidden pointer-events-auto"
        >
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.toLowerCase().replace(" ", "-");
                  const el = document.getElementById(targetId);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => {
                  setHoveredNav(item);
                  enterInteractive("", "hovered");
                }}
                onMouseLeave={() => {
                  setHoveredNav(null);
                  leaveInteractive();
                }}
                className={`relative py-1.5 px-3 rounded-full text-[10px] sm:text-xs md:text-sm font-medium tracking-wider transition-colors duration-300 select-none z-10 ${
                  isActive ? "text-[#061a10]" : "text-[#A8A695]/80 hover:text-white"
                }`}
              >
                {/* Active Indicator Backdrop */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBack"
                    className="absolute inset-0 bg-[#DEDBC8] rounded-full -z-10 shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Hover Backdrop Slider */}
                {hoveredNav === item && !isActive && (
                  <motion.div
                    layoutId="hoverNavBack"
                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                
                {item}
              </a>
            );
          })}
        </nav>
      </motion.header>

      {/* -----------------------------------------------------------
         FLOATING HAMBURGER MENU HUD TRIGGER (Visible instantly on Mobile)
      ------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: (isMobile || scrolled) ? 1 : 0, 
          scale: (isMobile || scrolled) ? 1 : 0.8,
          pointerEvents: (isMobile || scrolled) ? "auto" : "none" 
        }}
        transition={{ duration: 0.4 }}
        onClick={() => {
          setMenuOpen(true);
          enterInteractive("", "hovered");
        }}
        onMouseEnter={() => enterInteractive("MENU", "hovered")}
        onMouseLeave={leaveInteractive}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40 bg-[#0b291a]/90 backdrop-blur-xl border border-[#0b291a]/40 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-2xl hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer"
      >
        {/* Dynamic Hamburger Vector lines */}
        <div className="flex flex-col justify-center items-center gap-1">
          <span className="w-3.5 sm:w-4 h-[1px] sm:h-[1.5px] bg-[#DEDBC8] block" />
          <span className="w-3.5 sm:w-4 h-[1px] sm:h-[1.5px] bg-[#DEDBC8] block" />
        </div>
      </motion.div>

      {/* -----------------------------------------------------------
         FULL-SCREEN GLASS MENU OVERLAY
      ------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#061a10]/98 backdrop-blur-2xl flex flex-col justify-center items-center pointer-events-auto select-none"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        {/* Close trigger button */}
        <button
          onClick={() => {
            setMenuOpen(false);
            leaveInteractive();
          }}
          onMouseEnter={() => enterInteractive("CLOSE", "hovered")}
          onMouseLeave={leaveInteractive}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="text-xl font-light">×</span>
        </button>

        {/* Editorial links list */}
        <div className="space-y-6 sm:space-y-8 text-center px-6">
          {navItems.map((item, index) => {
            const isActive = activeNav === item;
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="overflow-hidden"
              >
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    const targetId = item.toLowerCase().replace(" ", "-");
                    const el = document.getElementById(targetId);
                    if (el) {
                      setTimeout(() => {
                        el.scrollIntoView({ behavior: "smooth" });
                      }, 400); // Wait for menu close transition
                    }
                  }}
                  onMouseEnter={() => enterInteractive("NAVIGATE", "difference")}
                  onMouseLeave={leaveInteractive}
                  className={`group flex items-baseline justify-center gap-3 sm:gap-4 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight transition-colors duration-300 ${
                    isActive ? "text-[#d4af37]" : "text-[#A8A695] hover:text-white"
                  }`}
                >
                  {/* Number index */}
                  <span className="font-serif italic text-primary/40 text-sm sm:text-lg group-hover:text-primary transition-colors">
                    0{index + 1}
                  </span>

                  {/* Text Title */}
                  <span>{item}</span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeOverlayDot"
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary"
                    />
                  )}
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Corporate branding overlay inside menu */}
        <div className="absolute bottom-12 text-[8px] sm:text-[10px] tracking-[0.25em] text-gray-500 font-bold uppercase select-none">
          Amanah Capital Advisory <span className="text-primary/50 mx-2">|</span> Secured Portals
        </div>
      </motion.div>

      {/* -----------------------------------------------------------
         SECTION 1 — HERO & SECURE STATIC GRID BLUEPRINT
      ------------------------------------------------------------ */}
      <section 
        id="home" 
        ref={heroRef}
        className="h-screen p-3 sm:p-4 md:p-6 relative flex flex-col justify-center items-center overflow-hidden"
      >
        <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden h-full w-full relative border border-[#0b291a]/30 bg-[#061a10] flex flex-col justify-center items-center px-4">
          
          {/* Static technical blueprint grid overlay */}
          <StaticStructuralGrid />

          {/* Cinematic gradients overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#061a10]/20 to-[#061a10] z-[2] pointer-events-none" />
          <div className="noise-overlay z-[3]" />
          
          {/* Static Glowing Radial Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-luxury-glow blur-[100px] sm:blur-[120px] opacity-25 rounded-full z-[2] pointer-events-none" />

          {/* FLOATING HUD A — PORTFOLIO YIELD METRICS (LEFT) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-72 bg-[#0b291a]/60 backdrop-blur-xl border border-[#0b291a]/40 rounded-2xl p-5 space-y-4 shadow-3xl text-left hidden xl:block z-10 hover:border-[#d4af37]/20 hover:bg-[#0b291a]/85"
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-widest text-[#DEDBC8] font-bold">
                Portfolio Yield HUD
              </span>
              <Activity className="w-3.5 h-3.5 text-[#DEDBC8] animate-pulse" />
            </div>

            {/* Simulated Micro growth trendline graph */}
            <div className="h-10 w-full relative">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <path
                  d="M 5 25 Q 25 20 45 10 T 85 2"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="85" cy="2" r="2.5" fill="#d4af37" />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-light">Advisory APY</span>
                <span className="text-white font-medium">+24.8% PKR</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-light">KSE-100 APY</span>
                <span className="text-gray-400 font-light">+18.4% Benchmark</span>
              </div>
            </div>

            <div className="text-[8px] text-emerald-500 font-bold tracking-widest uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Real-time Optimization Active
            </div>
          </motion.div>

          {/* FLOATING HUD B — CUSTODY ONLINE STATE (RIGHT) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-72 bg-[#0b291a]/60 backdrop-blur-xl border border-[#0b291a]/30 rounded-2xl p-5 space-y-4 shadow-3xl text-left hidden xl:block z-10 hover:border-[#d4af37]/20 hover:bg-[#0b291a]/85"
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-widest text-[#DEDBC8] font-bold">
                Advisory Credentials
              </span>
              <Globe className="w-3.5 h-3.5 text-[#DEDBC8]" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white">
                <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="font-light">SEC Registered Advisors</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="font-light">Shariah Conscious Filters</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="font-light">Active Capital Protection</span>
              </div>
            </div>

            <div className="border-t border-[#0b291a]/40 pt-3 flex items-center justify-between">
              <span className="text-[8px] uppercase tracking-widest text-[#A8A695] font-bold">
                Advisory Status
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
                </span>
                Secure Advisory Online
              </span>
            </div>
          </motion.div>

          {/* FLOATING HUD C — CURRENT ADVISORY WEIGHT ALLOCATIONS (BOTTOM LEFT) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-8 bottom-12 w-72 bg-[#0b291a]/60 backdrop-blur-xl border border-[#0b291a]/40 rounded-2xl p-4 shadow-3xl text-left hidden lg:block z-10 hover:border-[#d4af37]/20"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[8px] uppercase tracking-widest text-primary font-bold">
                Target Advisory Mix
              </span>
              <Award className="w-3.5 h-3.5 text-primary" />
            </div>

            <div className="space-y-2.5 text-[10px]">
              <div>
                <div className="flex justify-between text-gray-400 font-light mb-1">
                  <span>Equities (PSX Growth)</span>
                  <span className="text-white font-medium">80%</span>
                </div>
                <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "80%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-400 font-light mb-1">
                  <span>Cash Reserves (Liquidity)</span>
                  <span className="text-white font-medium">15%</span>
                </div>
                <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-gray-600" style={{ width: "15%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-400 font-light mb-1">
                  <span>Hedges (Capital Protect)</span>
                  <span className="text-white font-medium">5%</span>
                </div>
                <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-gray-600" style={{ width: "5%" }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* MAIN HERO CONTENT - PROPORTIONAL MOBILE ARCHITECTURE */}
          <motion.div 
            style={{ y: isMobile ? 0 : heroContentY, opacity: heroContentOpacity }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 pointer-events-none mt-2 sm:mt-6"
          >
            <div className="space-y-5 sm:space-y-6 pointer-events-auto">
              
              {/* Wide Editorial Tagline */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-block text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-primary uppercase font-bold"
              >
                The Science of Asset Accumulation
              </motion.span>

              {/* Huge Editorial Name Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7vw] xl:text-[6.5vw] font-medium leading-[0.92] tracking-[-0.05em] text-white">
                <WordsPullUp text="AMANAH" className="text-white" />
                <br />
                <span className="font-serif italic text-primary">CAPITAL</span>
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-primary text-[5vw] sm:text-[4vw] select-none inline-block ml-1"
                >
                  *
                </motion.span>
              </h1>

              {/* Subtext description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light tracking-wide px-2 sm:px-0"
              >
                Amanah Capital helps individuals and families build long-term
                financial stability through disciplined Pakistan Stock Exchange
                investment strategies, risk management, and professional market
                guidance.
              </motion.p>

              {/* Dynamic Centered Pill CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="pt-3 flex justify-center"
              >
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative flex items-center justify-between gap-6 bg-[#DEDBC8] text-[#061a10] pl-6 pr-2 py-2 sm:pl-8 sm:pr-3 sm:py-3 rounded-full hover:bg-[#d4af37] hover:text-[#061a10] transition-all duration-500 shadow-xl overflow-hidden font-medium text-xs sm:text-sm tracking-wider"
                >
                  <span>Start Investing</span>
                  
                  {/* Arrow circle */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500 z-10">
                    <ArrowRight className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </div>
                </button>
              </motion.div>

            </div>
          </motion.div>

          {/* Real-time Simulated Stock Ticker Marquee - Shifted to Hero Bottom for Mobile Visibility without Scrolling */}
          <div className="absolute bottom-0 left-0 w-full bg-[#0b291a]/95 py-2.5 sm:py-3 border-t border-[#0b291a]/60 z-20 overflow-hidden select-none">
            <div className="flex gap-12 whitespace-nowrap animate-marquee">
              {Array(3).fill(tickers).flat().map((ticker, index) => (
                <div key={index} className="inline-flex items-center gap-3 text-[10px] sm:text-xs tracking-wide">
                  <span className="text-[#A8A695]/70 font-light">{ticker.title}</span>
                  <span className="text-white font-medium">{ticker.value}</span>
                  <span className={`flex items-center font-semibold ${ticker.positive ? "text-emerald-500" : "text-rose-500"}`}>
                    {ticker.change.startsWith("+") || ticker.change.startsWith("-") ? "" : (ticker.positive ? "+" : "")}{ticker.change}
                    <ArrowUpRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${ticker.positive ? "rotate-0" : "rotate-90"}`} />
                  </span>
                  <span className="text-white/10 px-2">|</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 2 — FINANCIAL AWARENESS / CORE INSIGHTS
      ------------------------------------------------------------ */}
      <section 
        id="why-invest" 
        className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-[#061a10] flex justify-center items-center relative overflow-hidden z-10"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 w-[420px] h-[420px] rounded-full bg-luxury-glow blur-[120px] opacity-15" />
        
        <div className="max-w-5xl text-center w-full">
          
          {/* Top Label Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0b291a]/60 border border-[#0b291a]/40 rounded-full text-primary text-[9px] uppercase tracking-widest font-semibold mb-6">
            <Compass className="w-3 h-3 animate-spin-slow" />
            Financial Awareness
          </span>

          {/* Heading segments */}
          <WordsPullUpMultiStyle
            parts={[
              { text: "Why your current income" },
              { text: "is no longer enough.", italic: true },
            ]}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-[1.15] sm:leading-[1.1] mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[#A8A695] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light px-2 sm:px-0"
          >
            Inflation rises, expenses grow, and idle money silently loses value every single day.
          </motion.p>

          {/* High-impact scrollytelling letters opacity reveal */}
          <div className="max-w-3xl mx-auto my-8 sm:my-12 md:my-16 border-t border-b border-[#0b291a]/30 py-8 sm:py-10 md:py-14 px-2 sm:px-4">
            <AnimatedLetter
              text="Today, one salary or one small business income is often not enough to secure the future. Education costs increase, medical expenses rise, retirement becomes uncertain, and the rupee continuously loses purchasing power. A second source of income is no longer optional — it has become an absolute necessity."
              className="text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wide font-light leading-relaxed"
            />
          </div>

          {/* Redesigned Threat Cards with responsive grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              {
                icon: TrendingUp,
                title: "Inflation Increases",
                desc: "Purchasing power depreciates as costs double, shrinking your capital.",
              },
              {
                icon: BadgeDollarSign,
                title: "Rupee Loses Value",
                desc: "Devaluation wipes out the relative international value of local currency savings.",
              },
              {
                icon: HeartPulse,
                title: "Medical Costs Rise",
                desc: "Healthcare inflation can wipe out decades of unprotected idle funds in days.",
              },
              {
                icon: ShieldCheck,
                title: "Retirement Uncertain",
                desc: "Pensions underperform basic inflation rate increases, leading to lifestyle stress.",
              },
            ].map((threat) => (
              <TiltCard key={threat.title}>
                <threat.icon className="text-primary w-6 h-6 mb-4" />
                <h4 className="text-white font-medium text-sm sm:text-base mb-2 group-hover:text-primary transition-colors duration-300">
                  {threat.title}
                </h4>
                <p className="text-[#A8A695]/85 text-xs leading-relaxed font-light">
                  {threat.desc}
                </p>
              </TiltCard>
            ))}
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 3 — PSX ADVISORY & STRATEGIES
      ------------------------------------------------------------ */}
      <section 
        id="psx" 
        className="min-h-screen bg-[#061a10] relative py-20 sm:py-28 md:py-36 px-3 sm:px-6 md:px-12 overflow-hidden z-10"
      >
        {/* Custom SVG Noise overlay */}
        <div className="bg-noise z-[1]" />
        
        {/* Decorative Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] z-[2] pointer-events-none" />
        
        {/* Gradient light bounds */}
        <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] rounded-full bg-luxury-glow blur-[160px] opacity-10 z-[2]" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Text block */}
          <div className="text-center mb-12 sm:mb-16 md:mb-24 space-y-4 px-2">
            <span className="text-[10px] tracking-[0.25em] font-bold text-primary uppercase">
              Financial Engine
            </span>
            <WordsPullUpMultiStyle
              parts={[
                { text: "Build wealth through disciplined PSX investing." }
              ]}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-medium"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base text-gray-500 max-w-xl mx-auto font-light"
            >
              Professional market guidance for long-term growth and capital security.
            </motion.p>
          </div>

          {/* Interactive Compound Growth Visualization tool */}
          <div className="mb-16 sm:mb-24">
            <PSXCompoundingWidget />
          </div>

          {/* 3D Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            
            {/* CARD 1 — Cinematic Video Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[300px] relative border border-[#0b291a]/30 flex flex-col justify-between p-6 sm:p-8 group bg-[#0b291a] shadow-2xl"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#061a10]/40 to-[#061a10] z-10" />
              
              {/* Looping Image background */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600" 
                  alt="Financial analytics"
                  className="w-full h-full object-cover grayscale brightness-[0.22] group-hover:scale-105 group-hover:brightness-[0.35] transition-all duration-700" 
                />
              </div>

              {/* Status indicator */}
              <div className="z-20 self-start bg-[#0b291a]/80 backdrop-blur-sm border border-[#0b291a]/40 rounded-full px-3 py-1 text-[8px] sm:text-[9px] tracking-widest text-[#DEDBC8] uppercase font-bold">
                Live Markets
              </div>

              {/* Bottom taglines */}
              <div className="z-20">
                <p className="text-base sm:text-xl font-serif italic text-white leading-tight mb-2">
                  "Your future wealth starts today."
                </p>
                <p className="text-[10px] text-primary/75 tracking-wider font-light">
                  Amanah Asset Allocation Model
                </p>
              </div>
            </motion.div>

            {/* CARD 2 — Market Research */}
            <TiltCard>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[32px] font-serif font-light text-primary/30">01</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              
              <h3 className="text-lg font-medium text-white mb-4 group-hover:text-primary transition-colors duration-300">
                Market Research
              </h3>
              
              <ul className="text-xs text-[#A8A695]/90 space-y-3 font-light">
                {[
                  "In-depth PSX market research",
                  "Fundamental company analysis",
                  "Technical trend insights",
                  "Sector performance tracking"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="text-primary w-3.5 h-3.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-[10px] text-primary uppercase tracking-wider font-semibold">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 -rotate-45 text-primary" />
              </div>
            </TiltCard>

            {/* CARD 3 — Risk Management */}
            <TiltCard>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[32px] font-serif font-light text-primary/30">02</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              
              <h3 className="text-lg font-medium text-white mb-4 group-hover:text-primary transition-colors duration-300">
                Risk Management
              </h3>
              
              <ul className="text-xs text-[#A8A695]/90 space-y-3 font-light">
                {[
                  "Strategic portfolio diversification",
                  "Capital protection mindset",
                  "Disciplined value-entry timing",
                  "Emotional trading mitigation"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="text-primary w-3.5 h-3.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-[10px] text-primary uppercase tracking-wider font-semibold">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 -rotate-45 text-primary" />
              </div>
            </TiltCard>

            {/* CARD 4 — Long-Term Planning */}
            <TiltCard>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[32px] font-serif font-light text-primary/30">03</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              
              <h3 className="text-lg font-medium text-white mb-4 group-hover:text-primary transition-colors duration-300">
                Long-Term Planning
              </h3>
              
              <ul className="text-xs text-[#A8A695]/90 space-y-3 font-light">
                {[
                  "Retirement wealth construction",
                  "Children education planning",
                  "Generational wealth strategies",
                  "Reliable passive income streams"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="text-primary w-3.5 h-3.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-[10px] text-primary uppercase tracking-wider font-semibold">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 -rotate-45 text-primary" />
              </div>
            </TiltCard>

          </div>

          {/* -----------------------------------------------------------
             MISSION STATEMENT
          ------------------------------------------------------------ */}
          <div 
            id="services"
            className="text-center mt-24 sm:mt-36 md:mt-48 relative py-10 sm:py-12 px-4 sm:px-6 border-t border-b border-[#0b291a]/30"
          >
            {/* Background glowing orb */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(222,219,200,0.04),transparent_60%)] pointer-events-none" />
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-4"
            >
              Our Purpose
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: 0.1, duration: 1 }}
              className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white leading-snug max-w-4xl mx-auto"
            >
              "Our mission is helping <span className="font-serif italic text-primary">ordinary people</span> build <span className="font-serif italic text-primary">extraordinary</span> financial stability."
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 mt-4 text-[10px] sm:text-xs tracking-wider font-medium uppercase"
            >
              Invest today <span className="text-primary/45 mx-2">|</span> Secure tomorrow
            </motion.p>
          </div>

          {/* -----------------------------------------------------------
             FOUNDER / PRINCIPAL ADVISOR Spotlight
          ------------------------------------------------------------ */}
          <div className="mt-20 sm:mt-28 md:mt-36 flex flex-col items-center text-center px-4">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6"
            >
              {/* Rotating glowing border vector */}
              <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow scale-105" />
              
              {/* Avatar circle frame */}
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#d4af37] bg-[#0b291a] flex items-center justify-center relative select-none">
                <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-16 sm:h-16 text-[#DEDBC8]" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: 0.2 }}
              className="space-y-1"
            >
              <h4 className="text-base sm:text-xl font-medium text-white tracking-wide">
                Atif Nadeem
              </h4>
              <p className="text-[10px] sm:text-xs text-primary/75 tracking-widest uppercase font-bold">
                Founder & Principal Advisor
              </p>
              <p className="text-[11px] text-gray-500 max-w-sm mx-auto font-light leading-relaxed pt-2">
                Professional investment counselor committed to helping families navigate PSX complexities through transparent, shariah-conscious market insights.
              </p>
            </motion.div>

            {/* Aesthetic outline */}
            <div className="h-[1px] w-20 bg-primary/20 mt-6" />
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 4 — SECURED CONTACT & FOOTER
      ------------------------------------------------------------ */}
      <footer 
        id="contact"
        className="bg-[#020a06] py-16 sm:py-20 px-4 sm:px-12 md:px-24 border-t border-[#0b291a]/40 relative overflow-hidden z-10"
      >
        {/* Soft background luxury glow overlay */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-luxury-glow blur-[120px] opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative z-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-medium tracking-wider text-white">
                AMANAH <span className="font-serif italic text-primary">CAPITAL</span>
              </span>
              <span className="text-primary text-xs">*</span>
            </div>
            
            <p className="text-xs text-[#A8A695]/80 font-light leading-relaxed max-w-sm">
              Authorized investment consulting firm offering high-end, portfolio consulting for high-net-worth families, professionals, and long-term accumulators across Pakistan & UAE.
            </p>
            

          </div>

          {/* Legal Risk notice */}
          <div className="space-y-4">
            <h4 className="text-xs text-white uppercase tracking-widest font-bold">
              Legal & Risk Warning
            </h4>
            
            <p className="text-[11px] text-[#A8A695]/60 leading-relaxed font-light">
              Investing in the Pakistan Stock Exchange involves market risk. Past performance does not guarantee future financial returns. All decisions should be based on diversified fundamental profiling. Amanah Capital provides pure financial advisory.
            </p>
            
            <p className="text-[10px] text-primary/40 font-light">
              © 2026 Amanah Capital Advisory. All Rights Reserved.
            </p>
          </div>

          {/* Address channels */}
          <div className="space-y-4">
            <h4 className="text-xs text-white uppercase tracking-widest font-bold">
              Secure Advisory Channels
            </h4>

            <ul className="space-y-3 text-xs font-light text-[#A8A695]/90">
              
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <Phone className="text-primary w-3.5 h-3.5" />
                <a href="tel:+923122120303">+92 312 2120303</a>
                <span className="text-[8px] bg-white/5 border border-white/15 px-1.5 py-0.5 rounded text-gray-500 uppercase tracking-widest">PK</span>
              </li>

              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <Phone className="text-primary w-3.5 h-3.5" />
                <a href="tel:+971501987035">+971 50 198 7035</a>
                <span className="text-[8px] bg-white/5 border border-white/15 px-1.5 py-0.5 rounded text-gray-500 uppercase tracking-widest">UAE</span>
              </li>

              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <Mail className="text-primary w-3.5 h-3.5" />
                <a href="mailto:advisory@amanahcapital.pk">advisory@amanahcapital.pk</a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="text-primary w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Chakwal – Islamabad,<br />Pakistan
                </span>
              </li>

            </ul>
          </div>

        </div>
      </footer>

    </div>
  );
}
