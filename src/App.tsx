import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
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
  Compass,
  ArrowUpRight,
  Sliders,
  Activity,
  Globe,
  Award,
  Scale,
  Brain,
  Percent,
} from "lucide-react";

const AmanahLogo = ({ className = "w-10 h-9" }: { className?: string }) => (
  <svg viewBox="0 0 100 85" className={`${className} fill-current text-[#d4af37] shrink-0`} xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 5 L 12 75 L 26 75 L 50 31 L 74 75 L 88 75 Z" />
    <path d="M 50 42 L 35 68 L 65 68 Z" />
  </svg>
);

/* ----------------------------------------------------------------
   PREMIUM MOTION REVEALS & WIDGET UTILITIES
-----------------------------------------------------------------*/

// WordsPullUp Component - Animates each word sliding up from an overflow hidden container
const WordsPullUp = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <span className={`inline-block overflow-hidden pb-1 ${className}`}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.9,
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

const WordsPullUpMultiStyle = ({ parts, className = "", delay = 0 }: { parts: Part[]; className?: string; delay?: number }) => {
  return (
    <h2 className={`font-medium tracking-tight ${className}`}>
      {parts.map((p, i) => (
        <span key={i} className="inline-block overflow-hidden mr-2">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              delay: delay + i * 0.06,
              duration: 1.1,
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
    <p ref={ref} className={`relative leading-relaxed text-[#DEDBC8] ${className}`}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = Math.min(1, start + 0.05);
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
   CINEMATIC BACKGROUND PARTICLES & STATIC TECHNICAL GRID
-----------------------------------------------------------------*/
const CinematicParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);
  
  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable particle effects on mobile to maximize FPS
    const list = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 8 + 6,
    }));
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2] opacity-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#d4af37]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0px", "-120px"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const StaticStructuralGrid = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-30 select-none">
      <svg className="w-full h-full text-white/5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="structural-grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#structural-grid-pattern)" />
        
        {/* Fine crosshairs & technical tags */}
        {[
          { x: 150, y: 150, label: "WEALTH.STRUCT [S-01]" },
          { x: 1050, y: 120, label: "PSX.ACCUMULATE [P-92]" },
          { x: 300, y: 650, label: "DISCIPLINE.RATIO [D-12]" },
          { x: 950, y: 550, label: "RISK.MITIGATION [R-08]" },
        ].map((marker, i) => (
          <g key={i} className="text-primary/20">
            <line x1={marker.x - 10} y1={marker.y} x2={marker.x + 10} y2={marker.y} stroke="currentColor" strokeWidth="0.75" />
            <line x1={marker.x} y1={marker.y - 10} x2={marker.x} y2={marker.y + 10} stroke="currentColor" strokeWidth="0.75" />
            <text x={marker.x + 8} y={marker.y - 4} className="fill-[#DEDBC8]/40 font-mono text-[7px] tracking-wider">
              {marker.label}
            </text>
          </g>
        ))}

        <g className="text-[#DEDBC8]/20 font-mono text-[7px] tracking-[0.25em] uppercase">
          <text x="40" y="50">Advisory: Shariah Filtered</text>
          <text x="40" y="65">Coordinate: 33.6844° N</text>
          <text x="96%" y="50" textAnchor="end">Firm Status: Long-Term Focused</text>
        </g>
      </svg>
    </div>
  );
};

/* ----------------------------------------------------------------
   3D PERSPECTIVE TILT CARD COMPONENT
-----------------------------------------------------------------*/
const TiltCard = ({ children, className = "", onHoverStart, onHoverEnd }: { children: React.ReactNode; className?: string; onHoverStart?: () => void; onHoverEnd?: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlowX(x);
    setGlowY(y);

    const mouseX = x - width / 2;
    const mouseY = y - height / 2;

    const rX = -(mouseY / (height / 2)) * 6;
    const rY = (mouseX / (width / 2)) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) setIsHovered(true);
        if (onHoverStart) onHoverStart();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
        if (onHoverEnd) onHoverEnd();
      }}
      animate={{ 
        rotateX: isMobile ? 0 : rotateX, 
        rotateY: isMobile ? 0 : rotateY, 
        scale: isHovered ? 1.015 : 1 
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      className={`relative rounded-3xl overflow-hidden bg-[#0b291a]/50 backdrop-blur-md border border-[#0b291a]/40 p-6 sm:p-8 transition-all duration-500 group shadow-2xl ${className}`}
    >
      {/* Dynamic Gold Glow Spot */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(240px circle at ${glowX}px ${glowY}px, rgba(212, 175, 55, 0.08), transparent 50%)`,
          }}
        />
      )}
      <div style={{ transform: isMobile ? "none" : "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------------
   INTERACTIVE RUPEE DEVALUATION WIDGET
-----------------------------------------------------------------*/
const RupeeDevaluationWidget = () => {
  const [inflationRate, setInflationRate] = useState(14); // Default Pakistan average inflation 14%
  const years = 5;
  const initialValue = 100000;
  
  // Calculate value over time
  const values = Array.from({ length: years + 1 }).map((_, idx) => {
    return Math.round(initialValue * Math.pow(1 - inflationRate / 100, idx));
  });

  const finalValue = values[years];
  const lossAmount = initialValue - finalValue;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0b291a]/80 backdrop-blur-md border border-[#0b291a]/40 p-6 sm:p-8 rounded-[2rem] shadow-3xl text-left relative z-20 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-luxury-glow blur-3xl opacity-10 pointer-events-none" />
      
      <div className="lg:col-span-5 space-y-6 z-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Percent className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-lg font-medium text-white tracking-wide">Devaluation Controls</h3>
          </div>
          <p className="text-xs text-[#A8A695]/85 leading-relaxed font-light mb-6">
            Drag the slider to adjust the annual inflation rate and observe how cash silently loses purchasing power over 5 years.
          </p>

          <div className="space-y-4">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-400 font-light">Annual Inflation Rate</span>
              <span className="text-[#d4af37] font-semibold">{inflationRate}%</span>
            </div>
            <div className="relative py-2">
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-1.5 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
            </div>
            <p className="text-[10px] text-[#A8A695]/60 italic font-light">
              *Pakistan's official localized inflation rates frequently fluctuate between 12% and 24%.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#0b291a]/50 space-y-2">
          <div className="text-[10px] tracking-widest uppercase text-gray-500 font-bold">5-Year Capital Impact</div>
          <div className="text-sm font-light text-[#A8A695]">
            Silent purchasing loss: <span className="text-rose-500 font-medium">Rs. {lossAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[9px] tracking-widest uppercase text-gray-500 font-bold block mb-1">Purchasing Power Analysis</span>
            <h4 className="text-lg text-white font-medium">PKR Erosion Timeline</h4>
          </div>
          <div className="text-right">
            <span className="text-[9px] tracking-widest uppercase text-[#d4af37] font-bold block mb-1">Remaining Value</span>
            <span className="text-2xl text-[#d4af37] font-semibold block">Rs. {finalValue.toLocaleString()}</span>
          </div>
        </div>

        {/* Visual erosion timeline */}
        <div className="space-y-4 py-4">
          {values.map((val, idx) => {
            const widthPct = (val / initialValue) * 100;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[10px] sm:text-xs">
                  <span className="text-gray-400 font-light">{idx === 0 ? "Today" : `Year ${idx}`}</span>
                  <span className={idx === 0 ? "text-white font-medium" : "text-[#A8A695]/90"}>
                    Rs. {val.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 bg-[#061a10] rounded-full overflow-hidden border border-[#0b291a]/30">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`h-full rounded-full ${
                      idx === 0 
                        ? "bg-[#DEDBC8]" 
                        : idx === years 
                          ? "bg-rose-500" 
                          : "bg-gradient-to-r from-[#d4af37] to-[#A8A695]"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[#0b291a]/50 text-[10px] text-gray-500 font-mono">
          <span>Base PKR 100,000 Cash</span>
          <span>Compounded Devaluation</span>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------
   INTERACTIVE PSX COMPOUNDING GRAPH WIDGET
-----------------------------------------------------------------*/
const PSXCompoundingWidget = () => {
  const [initialCapital, setInitialCapital] = useState(500000); 
  const [monthlySavings, setMonthlySavings] = useState(30000);   
  const [growthRate, setGrowthRate] = useState(18);             
  const [years, setYears] = useState(15);                       

  const calculateData = () => {
    const psxGrowthPoints: number[] = [];
    const devalCashPoints: number[] = [];

    const r = growthRate / 100 / 12; 
    const inflation = 0.09;          

    let currentPsxPortfolio = initialCapital;
    let currentCashRealValue = initialCapital;

    for (let yr = 0; yr <= years; yr++) {
      psxGrowthPoints.push(Math.round(currentPsxPortfolio));
      devalCashPoints.push(Math.round(currentCashRealValue));

      for (let m = 0; m < 12; m++) {
        currentPsxPortfolio = currentPsxPortfolio * (1 + r) + monthlySavings;
        currentCashRealValue = (currentCashRealValue + monthlySavings) * (1 - inflation / 12);
      }
    }

    return { psxGrowthPoints, devalCashPoints };
  };

  const { psxGrowthPoints, devalCashPoints } = calculateData();

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
      const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
      return { x, y };
    });
  };

  const psxCoords = getCoordinates(psxGrowthPoints);
  const cashCoords = getCoordinates(devalCashPoints);

  const getPathString = (coords: { x: number; y: number }[]) => {
    return coords.reduce((acc, coord, idx) => {
      return idx === 0 ? `M ${coord.x} ${coord.y}` : `${acc} L ${coord.x} ${coord.y}`;
    }, "");
  };

  const psxPath = getPathString(psxCoords);
  const cashPath = getPathString(cashCoords);

  const formatPKR = (num: number) => {
    if (num >= 10000000) return `Rs. ${(num / 10000000).toFixed(2)} Cr`; 
    if (num >= 100000) return `Rs. ${(num / 100000).toFixed(1)} Lakh`;   
    return `Rs. ${num.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0b291a]/80 backdrop-blur-md border border-[#0b291a]/40 p-6 sm:p-8 rounded-[2rem] shadow-3xl text-left relative z-20">
      
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
              max="3000000"
              step="50000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full h-1.5 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
          </div>
        </div>

        {/* Monthly Savings */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A8A695] font-light">Monthly Saved Contribution</span>
            <span className="text-[#DEDBC8] font-medium">{formatPKR(monthlySavings)}</span>
          </div>
          <div className="relative py-2 select-none">
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
              className="w-full h-1.5 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
          </div>
        </div>

        {/* Yield APY */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A8A695] font-light">Estimated Growth Yield</span>
            <span className="text-[#DEDBC8] font-medium">{growthRate}% APY</span>
          </div>
          <div className="relative py-2 select-none">
            <input
              type="range"
              min="8"
              max="26"
              step="1"
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="w-full h-1.5 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
          </div>
          <p className="text-[10px] text-[#A8A695]/60 font-light italic">
            *Historical active PSX indices yield tracks 15% - 22% annualized APY.
          </p>
        </div>

        {/* Years */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#A8A695] font-light">Accumulation Horizon</span>
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
              className="w-full h-1.5 bg-[#061a10] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[9px] tracking-widest uppercase text-gray-500 font-bold block mb-1">
                Portfolio simulation
              </span>
              <h3 className="text-lg sm:text-xl text-white font-medium">
                Long-Term Projection
              </h3>
            </div>
            
            <div className="text-right">
              <span className="text-[9px] tracking-widest uppercase text-primary font-bold block mb-1">
                Projected Balance
              </span>
              <span className="text-xl sm:text-2xl text-[#d4af37] font-semibold block">
                {formatPKR(psxGrowthPoints[years])}
              </span>
            </div>
          </div>

          {/* Dynamic Compounding Path SVG */}
          <div className="relative border-b border-l border-[#0b291a]/40 py-4 w-full h-[200px] select-none bg-[#061a10]/50 rounded-xl overflow-hidden">
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-emerald-dark/10" />
            <div className="absolute top-2/4 left-0 w-full h-[1px] bg-emerald-dark/10" />
            <div className="absolute top-3/4 left-0 w-full h-[1px] bg-emerald-dark/10" />

            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              {/* Cash devaluation line path */}
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

              {/* Active Portfolio growth line path */}
              <motion.path
                d={psxPath}
                fill="none"
                stroke="#d4af37"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              
              {/* Endpoint Glowing Indicator */}
              {psxCoords.length > 0 && (
                <motion.circle
                  cx={psxCoords[psxCoords.length - 1].x}
                  cy={psxCoords[psxCoords.length - 1].y}
                  initial={{ r: 6 }}
                  animate={{ r: [5, 8, 5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  fill="#d4af37"
                />
              )}
            </svg>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-6 pt-4 border-t border-white/5 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary shrink-0" />
            <span className="text-gray-300 font-light">
              Disciplined Active PSX Strategy ({growthRate}% Yield)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 border-t-2 border-dashed border-gray-600 shrink-0" />
            <span className="text-gray-400 font-light">
              Idle PKR Cash (9% Annual Inflation Erosion)
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ----------------------------------------------------------------
   MAIN APP CINEMATIC PLATFORM
-----------------------------------------------------------------*/
export default function App() {
  const [loading, setLoading] = useState(true);
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

  // Real-time stock tickers simulation engine (bypasses unstable CORS proxies for instant load & 0 red errors)
  useEffect(() => {
    const simulateMarketTicks = () => {
      setTickers((prevTickers) =>
        prevTickers.map((ticker) => {
          if (ticker.title === "AMANAH STRATEGY") return ticker;

          // Parse numeric value safely
          const cleanValue = parseFloat(ticker.value.replace(/,/g, ""));
          if (isNaN(cleanValue)) return ticker;

          // Slight realistic stock tick fluctuation (-0.08% to +0.10%)
          const tickPct = (Math.random() * 0.18 - 0.08) / 100;
          const newValue = cleanValue * (1 + tickPct);

          // Random walk change generator
          const changeVal = parseFloat(ticker.change.replace(/[+%]/g, ""));
          const changeShift = (Math.random() * 0.15 - 0.07);
          const newChange = changeVal + changeShift;

          let formattedValue = newValue.toFixed(2);
          if (ticker.title === "KSE-100 INDEX") {
            formattedValue = newValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }

          return {
            ...ticker,
            value: formattedValue,
            change: `${newChange >= 0 ? "+" : ""}${newChange.toFixed(2)}%`,
            positive: newChange >= 0,
          };
        })
      );
    };

    // Run tick animation every 3.5 seconds
    const interval = setInterval(simulateMarketTicks, 3500);
    return () => clearInterval(interval);
  }, []);

  // Detect mobile viewport bounds
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pointer coordination spring hooks
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "hovered" | "slider">("default");

  const springConfig = isMobile 
    ? { stiffness: 220, damping: 24, mass: 0.8 } 
    : { stiffness: 400, damping: 28, mass: 0.5 };

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

  // Scrollspy observer for floating navigation highlighting
  useEffect(() => {
    const sections = ["home", "why-invest", "psx", "services", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedItem = navItems.find(
            (item) => item.toLowerCase().replace(" ", "-") === id
          );
          if (matchedItem) setActiveNav(matchedItem);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    // Detect scrolled header state offset
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Initialize Lenis Inertia smooth-scrolling dynamically to support hot-reloading cleanly
  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable Lenis on mobile devices to optimize native scroll speed
    let lenisInstance: any = null;
    
    // @ts-ignore
    import("lenis").then((module) => {
      const Lenis = module.default;
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });

      function raf(time: number) {
        if (lenisInstance) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
      }
      requestAnimationFrame(raf);
    }).catch((err) => {
      console.warn("Lenis smooth scroll package deferred locally. Falling back to native scrolling.", err);
    });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  // Simulated loading duration for premium cinematic preloader
  useEffect(() => {
    const isMobileViewport = window.innerWidth < 768;
    const timer = setTimeout(() => {
      setLoading(false);
    }, isMobileViewport ? 200 : 800); // 200ms for instant mobile load, 800ms for swift desktop load
    return () => clearTimeout(timer);
  }, []);

  const navItems = ["Home", "Why Invest", "PSX", "Services", "Contact"];

  const enterInteractive = (text: string, type: "hovered" | "slider") => {
    setCursorText(text);
    setCursorType(type);
  };

  const leaveInteractive = () => {
    setCursorText("");
    setCursorType("default");
  };

  // Parallax Scroll Transforms for cinematic layering
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroContentOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-[#061a10] bg-[#061a10] overflow-x-hidden text-[#A8A695]">
      

      {/* -----------------------------------------------------------
         PREMIUM CUSTOM COMPANION CURSOR (Desktop Only)
      ------------------------------------------------------------ */}
      {!isMobile && (
        <motion.div
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: cursorType === "hovered" ? 1.4 : cursorType === "slider" ? 1.6 : 1,
            backgroundColor: cursorType === "hovered" ? "rgba(222, 219, 200, 0.08)" : "rgba(222, 219, 200, 0)",
            borderColor: cursorType === "hovered" ? "#d4af37" : "#DEDBC8",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] flex items-center justify-center font-mono text-[6px] tracking-widest text-[#d4af37] font-semibold bg-transparent shadow-[0_0_12px_rgba(212,175,55,0.1)]"
        >
          {cursorText}
        </motion.div>
      )}

      {/* -----------------------------------------------------------
         CINEMATIC PRELOADER SCREEN
      ------------------------------------------------------------ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99999] bg-[#061a10] flex flex-col justify-center items-center select-none"
          >
            
            <div className="space-y-6 text-center max-w-lg px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="flex flex-col items-center space-y-3"
              >
                <AmanahLogo className="w-12 h-10 text-[#d4af37]" />
                <div className="flex flex-col text-center">
                  <span className="text-sm font-bold tracking-[0.25em] text-white font-cinzel leading-none">
                    AMANAH
                  </span>
                  <span className="text-[7px] font-bold tracking-[0.3em] text-[#d4af37] uppercase leading-none mt-1.5">
                    CAPITAL
                  </span>
                </div>
              </motion.div>
              
              {/* Premium Progress Bar */}
              <div className="w-48 h-[1px] bg-white/5 relative mx-auto overflow-hidden">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.45, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-[9px] text-[#A8A695] uppercase tracking-widest font-mono"
              >
                Disciplined PSX Asset advisory
              </motion.p>
            </div>

            {/* Glowing spot in preloader */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[35vh] bg-luxury-glow blur-[100px] opacity-15 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* -----------------------------------------------------------
         FLOATING MATTE GLASS NAVBAR
      ------------------------------------------------------------ */}
      <motion.header
        animate={{ y: scrolled ? 12 : 12, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-40 px-4 sm:px-6 flex justify-center pointer-events-none"
      >
        <nav 
          className="bg-[#0b291a]/85 backdrop-blur-xl rounded-full border border-[#0b291a]/55 shadow-2xl px-4 py-2 flex items-center justify-between w-full max-w-4xl relative overflow-hidden pointer-events-auto"
        >
          {/* Brand Wordmark Logo */}
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseEnter={() => enterInteractive("LOGO", "hovered")}
            onMouseLeave={leaveInteractive}
            className="flex items-center gap-2 pl-2 select-none"
          >
            <AmanahLogo className="w-5 h-4.5" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-wider text-white font-cinzel leading-none">
                AMANAH
              </span>
              <span className="text-[6px] font-bold tracking-[0.25em] text-[#d4af37] uppercase leading-none mt-0.5">
                CAPITAL
              </span>
            </div>
          </a>

          {/* Floating pill menu elements */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeNav === item;
              return (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = item.toLowerCase().replace(" ", "-");
                    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  onMouseEnter={() => {
                    setHoveredNav(item);
                    enterInteractive("NAV", "hovered");
                  }}
                  onMouseLeave={() => {
                    setHoveredNav(null);
                    leaveInteractive();
                  }}
                  className={`relative py-1.5 px-4 rounded-full text-xs font-medium tracking-wide transition-colors duration-300 select-none z-10 ${
                    isActive ? "text-[#061a10]" : "text-[#A8A695]/85 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBack"
                      className="absolute inset-0 bg-[#DEDBC8] rounded-full -z-10 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
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
          </div>

          {/* Simple Mobile Hamburg Menu Trigger */}
          <div
            onClick={() => {
              setMenuOpen(true);
              enterInteractive("OPEN", "hovered");
            }}
            onMouseEnter={() => enterInteractive("MENU", "hovered")}
            onMouseLeave={leaveInteractive}
            className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg hover:border-primary/45 transition-colors cursor-pointer"
          >
            <div className="flex flex-col justify-center items-center gap-1">
              <span className="w-3.5 h-[1px] bg-white block" />
              <span className="w-3.5 h-[1px] bg-white block" />
            </div>
          </div>
        </nav>
      </motion.header>

      {/* -----------------------------------------------------------
         FULL-SCREEN GLASS NAV OVERLAY (Mobile)
      ------------------------------------------------------------ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#061a10]/98 backdrop-blur-2xl flex flex-col justify-center items-center select-none"
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                leaveInteractive();
              }}
              onMouseEnter={() => enterInteractive("CLOSE", "hovered")}
              onMouseLeave={leaveInteractive}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <span className="text-xl font-light">×</span>
            </button>

            <div className="space-y-6 text-center">
              {navItems.map((item, index) => {
                const isActive = activeNav === item;
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.5 }}
                  >
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        const targetId = item.toLowerCase().replace(" ", "-");
                        setTimeout(() => {
                          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                        }, 300);
                      }}
                      className={`text-2xl sm:text-3xl font-medium tracking-tight transition-colors duration-300 block ${
                        isActive ? "text-[#d4af37]" : "text-[#A8A695] hover:text-white"
                      }`}
                    >
                      {item}
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -----------------------------------------------------------
         SECTION 1 — IMMERSIVE HERO WITH STATIC COMPONENT DOCK
      ------------------------------------------------------------ */}
      <section 
        id="home" 
        className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden w-full bg-[#061a10] px-4 py-24 sm:py-32"
      >
        
        <StaticStructuralGrid />
        <CinematicParticles />

        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-transparent to-[#061a10] z-[2] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[55vh] bg-luxury-glow blur-[120px] opacity-20 rounded-full z-[2] pointer-events-none" />

          {/* Floating UI HUD elements (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-8 top-1/3 w-72 bg-[#0b291a]/55 backdrop-blur-xl border border-[#0b291a]/45 rounded-2xl p-5 space-y-4 shadow-3xl text-left hidden xl:block z-10 hover:border-[#d4af37]/20 transition-all duration-500"
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-widest text-[#DEDBC8] font-bold">
                Portfolio Yield HUD
              </span>
              <Activity className="w-3.5 h-3.5 text-[#DEDBC8] animate-pulse" />
            </div>

            <div className="h-10 w-full relative">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <path
                  d="M 5 25 Q 30 18 55 12 T 95 3"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="95" cy="3" r="2.5" fill="#d4af37" />
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-8 top-1/3 w-72 bg-[#0b291a]/55 backdrop-blur-xl border border-[#0b291a]/45 rounded-2xl p-5 space-y-4 shadow-3xl text-left hidden xl:block z-10 hover:border-[#d4af37]/20 transition-all duration-500"
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-widest text-[#DEDBC8] font-bold">
                Advisory Standards
              </span>
              <Globe className="w-3.5 h-3.5 text-[#DEDBC8]" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white">
                <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="font-light">Disciplined Asset Allocation</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="font-light">Shariah Conscious Screening</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="font-light">Active Long-Term Compounding</span>
              </div>
            </div>
          </motion.div>

          {/* Main Hero Elements */}
          <motion.div 
            style={{ y: isMobile ? 0 : heroContentY, opacity: heroContentOpacity }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 pointer-events-none mt-4 sm:mt-8"
          >
            <div className="space-y-6 pointer-events-auto">
              
              {/* Premium Golden Triangle logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center mb-2"
              >
                <AmanahLogo className="w-20 h-16 sm:w-24 sm:h-20 text-[#d4af37]" />
              </motion.div>

              {/* Brochure Typography Lockup */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5vw] font-bold text-[#d4af37] tracking-[0.1em] font-cinzel leading-none select-none">
                  AMANAH
                </h1>
                
                <div className="flex items-center justify-center gap-4 w-full max-w-sm sm:max-w-md mx-auto mt-2 select-none">
                  <div className="h-[1px] bg-[#d4af37]/45 flex-grow" />
                  <span className="text-xs sm:text-lg md:text-xl font-light tracking-[0.4em] text-[#DEDBC8] font-cinzel">
                    CAPITAL
                  </span>
                  <div className="h-[1px] bg-[#d4af37]/45 flex-grow" />
                </div>
              </motion.div>

              {/* Verified Subtext description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light tracking-wide px-4"
              >
                Amanah Capital helps individuals and families build long-term financial stability through disciplined Pakistan Stock Exchange investment strategies, risk management, and professional market guidance.
              </motion.p>

              {/* Magnetic primary CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
              >
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  onMouseEnter={() => enterInteractive("START", "hovered")}
                  onMouseLeave={leaveInteractive}
                  className="group relative flex items-center justify-between gap-6 bg-[#DEDBC8] text-[#061a10] pl-6 pr-2 py-2 rounded-full hover:bg-[#d4af37] transition-all duration-500 shadow-xl overflow-hidden font-medium text-xs sm:text-sm tracking-wider w-fit"
                >
                  <span>Start Investing</span>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center relative overflow-hidden transition-transform duration-500 z-10 shrink-0">
                    <ArrowRight className="text-primary w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-500" />
                  </div>
                </button>

                <button
                  onClick={() => {
                    document.getElementById("psx")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  onMouseEnter={() => enterInteractive("EXPLORE", "hovered")}
                  onMouseLeave={leaveInteractive}
                  className="group relative flex items-center justify-center gap-2 bg-transparent text-[#DEDBC8] px-6 py-3 border border-[#0b291a]/80 rounded-full hover:bg-white/5 transition-all duration-300 font-medium text-xs tracking-wider w-fit"
                >
                  <span>Learn About PSX</span>
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </button>
              </motion.div>

            </div>
          </motion.div>

          {/* Yahoo Finance Live Stock Marquee docked bottom-0 center */}
          <div className="absolute bottom-0 left-0 w-full bg-[#0b291a]/95 py-3 border-t border-[#0b291a]/60 z-20 overflow-hidden select-none">
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

      </section>

      {/* -----------------------------------------------------------
         SECTION 2 — STICKY SCROLLING REALITY STORY & INTERACTIVE DEVALUATION
      ------------------------------------------------------------ */}
      <section 
        id="why-invest" 
        className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#061a10] flex justify-center items-center relative overflow-hidden z-10"
      >
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-luxury-glow blur-[120px] opacity-10 pointer-events-none" />
        
        <div className="max-w-5xl text-center w-full">
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0b291a]/60 border border-[#0b291a]/40 rounded-full text-primary text-[9px] uppercase tracking-widest font-semibold mb-6">
            <Compass className="w-3 h-3 animate-spin-slow" />
            Financial Reality
          </span>

          {/* Sticky Reveal Cinematic Headers */}
          <WordsPullUpMultiStyle
            parts={[
              { text: "Why your current income" },
              { text: "is no longer enough.", italic: true },
            ]}
            className="text-3xl sm:text-5xl lg:text-7xl text-white font-medium leading-[1.1] mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[#A8A695] max-w-xl mx-auto mb-12 leading-relaxed font-light px-4"
          >
            If your idle savings stay the same while domestic prices double, your wealth is silently evaporating every second.
          </motion.p>

          {/* Dynamic scrollytelling letters opacity reveal */}
          <div className="max-w-3xl mx-auto my-12 border-t border-b border-[#0b291a]/30 py-10 md:py-16 px-4">
            <AnimatedLetter
              text="Today, one localized salary or simple business yield is rarely enough to protect family safety. High inflation rises, food/commodity costs double, and the domestic rupee continuously devalues against real assets. A secondary source of systematic passive asset returns is no longer a choice — it has become an absolute necessity."
              className="text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide font-light leading-relaxed"
            />
          </div>

          {/* Rupee Devaluation Interactive Simulator */}
          <div className="my-16 max-w-4xl mx-auto">
            <RupeeDevaluationWidget />
          </div>

          {/* Educational Threat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-left">
            {[
              {
                icon: TrendingUp,
                title: "Create Second Income",
                desc: "Establish a reliable passive income source through strong PSX corporate dividends.",
              },
              {
                icon: BadgeDollarSign,
                title: "Beat Inflation Drag",
                desc: "Deploy funds directly into high-yield real equities to counter active PKR currency devaluations.",
              },
              {
                icon: HeartPulse,
                title: "Secure Children's Future",
                desc: "Accumulate systematic assets to plan education, marriages, and family priorities.",
              },
              {
                icon: ShieldCheck,
                title: "Dignified Retirement",
                desc: "Ensure capital preservation through regulated, compounding PSX holdings.",
              },
            ].map((threat) => (
              <TiltCard key={threat.title}>
                <threat.icon className="text-[#d4af37] w-6 h-6 mb-4" />
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
         SECTION 3 — WHY PSX & PORTFOLIO COMPOSITION
      ------------------------------------------------------------ */}
      <section 
        id="psx" 
        className="min-h-screen bg-[#061a10] relative py-24 sm:py-32 px-3 sm:px-6 md:px-12 overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:6rem_6rem] z-[2] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-luxury-glow blur-[160px] opacity-10 z-[2]" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-bold text-primary uppercase">
              Financial Engine
            </span>
            <WordsPullUpMultiStyle
              parts={[
                { text: "Why Pakistan Stock Exchange (PSX)?", italic: true }
              ]}
              className="text-3xl sm:text-5xl text-white leading-tight font-medium"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: 0.3 }}
              className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto font-light"
            >
              PSX is one of the most powerful wealth-building platforms available. It represents ownership in strong local enterprises rather than volatile speculative assets.
            </motion.p>
          </div>

          {/* Interactive Compounding Graph */}
          <div className="mb-20 max-w-4xl mx-auto">
            <PSXCompoundingWidget />
          </div>

          {/* Minimalist Editorial grid explaining PSX features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              {
                step: "01",
                title: "Enterprise Ownership",
                items: [
                  "Own stakes in Pakistan's top profitable conglomerates",
                  "Direct correlation with real underlying business value",
                  "Benefit from national industrial expansion models"
                ]
              },
              {
                step: "02",
                title: "Capital Appreciation",
                items: [
                  "Long-term compound yields exceeding bank savings deposits",
                  "Leverage market-entry dips systematically",
                  "Mitigate currency devaluations by holding resilient enterprise equities"
                ]
              },
              {
                step: "03",
                title: "Corporate Dividends",
                items: [
                  "Create passive cash flow streams directly into your custody account",
                  "Yield benefits from quarterly corporate payouts",
                  "Access highly liquid asset options easily"
                ]
              }
            ].map((box) => (
              <TiltCard key={box.title} className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-2xl font-serif italic font-light text-primary/30">{box.step}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {box.title}
                  </h3>
                  <ul className="text-xs text-[#A8A695]/90 space-y-3 font-light">
                    {box.items.map((it, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="text-primary w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-[10px] text-primary uppercase tracking-wider font-semibold">
                  <span>Logic Driven</span>
                  <ArrowRight className="w-4 h-4 -rotate-45 text-primary" />
                </div>
              </TiltCard>
            ))}
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 4 — HOW MANAGED INVESTING WORKS (STICKY SCROLL)
      ------------------------------------------------------------ */}
      <section 
        className="py-24 sm:py-32 pl-12 pr-4 sm:px-6 md:px-12 bg-[#061a10] border-t border-[#0b291a]/30 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-bold text-[#d4af37] uppercase">
              Disciplined Journey
            </span>
            <h2 className="text-3xl sm:text-5xl text-white font-medium">
              How Managed Investing Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto font-light">
              A transparent, step-by-step advisory structure built to optimize asset growth while strictly respecting risk margins.
            </p>
          </div>

          <div className="relative border-l border-[#0b291a] pl-6 sm:pl-10 space-y-12 text-left">
            {[
              {
                num: "1",
                title: "Initial Advisory Consultation",
                desc: "A direct personal assessment defining your financial objectives, capital profile, and long-term liquidity constraints."
              },
              {
                num: "2",
                title: "Risk Margin Assessment",
                desc: "Determine realistic volatility tolerances to isolate capital exposure boundaries, keeping assets protected."
              },
              {
                num: "3",
                title: "Custody Account Activation",
                desc: "Establish secure CDC (Central Depository Company) sub-accounts directly in your legal ownership, ensuring complete asset safety."
              },
              {
                num: "4",
                title: "Custom Portfolio Strategy",
                desc: "Formulate a personalized asset allocation mix utilizing high-conviction dividend and growth PSX equities."
              },
              {
                num: "5",
                title: "Active Risk Management",
                desc: "Ongoing fundamental review and dividend optimization to guard capital against domestic economic headwinds."
              },
              {
                num: "6",
                title: "Long-Term Capital Compounding",
                desc: "Maintain systematic capital re-investment routines to foster sustainable, multi-generational wealth growth."
              }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Glowing connector point */}
                <div className="absolute -left-[32px] sm:-left-[48px] top-1.5 w-4 h-4 rounded-full bg-[#061a10] border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-serif italic text-primary/40 text-lg">0{step.num}</span>
                    <h4 className="text-white font-medium text-sm sm:text-base tracking-wide">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-[#A8A695]/85 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 5 — WHY INVEST WITH AMANAH CAPITAL (CONTRAST)
      ------------------------------------------------------------ */}
      <section 
        className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#061a10] border-t border-[#0b291a]/30 relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-bold text-primary uppercase">
              Operational Contrast
            </span>
            <h2 className="text-3xl sm:text-5xl text-white font-medium">
              Disciplined Philosophy vs Market Hype
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto font-light">
              Trust is built through emotional control and mathematical realities, not speculative trading hype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Speculator Column */}
            <div className="bg-[#0b291a]/30 border border-[#0b291a]/40 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 text-rose-500">
                <Brain className="w-5 h-5" />
                <h3 className="text-lg font-medium">The Speculative Approach</h3>
              </div>
              <p className="text-xs text-[#A8A695]/80 font-light leading-relaxed">
                Most retail capital in Pakistan stock markets suffers due to unstructured speculation and short-term volatility panic.
              </p>
              <ul className="space-y-3.5 text-xs text-[#A8A695]/90 font-light">
                {[
                  "Trading based on media rumors and unverified social tips",
                  "Panic selling assets during standard, healthy market corrections",
                  "Entering at peak valuations due to fear of missing out (FOMO)",
                  "Over-leveraging capital without risk hedge structures"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-rose-500 text-sm shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Amanah Advisor Column */}
            <div className="bg-[#0b291a]/70 border border-[#d4af37]/25 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-glow blur-2xl opacity-10 pointer-events-none" />
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Scale className="w-5 h-5" />
                <h3 className="text-lg font-medium">The Amanah Discipline</h3>
              </div>
              <p className="text-xs text-[#A8A695]/85 font-light leading-relaxed">
                We believe wealth is accumulated slowly through strict corporate profiling, shariah evaluations, and systematic cost-averaging.
              </p>
              <ul className="space-y-3.5 text-xs text-white font-light">
                {[
                  "Decisions anchored strictly in audited corporate financials",
                  "Systematic asset rebalancing across sound dividend yielders",
                  "Patience to enter when valuations are fundamentally attractive",
                  "Focusing exclusively on capital security margins"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="text-[#d4af37] w-3.5 h-3.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 6 — SERVICES BENTO GRID
      ------------------------------------------------------------ */}
      <section 
        id="services"
        className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#061a10] border-t border-[#0b291a]/30 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-bold text-primary uppercase">
              Advisory Offerings
            </span>
            <WordsPullUpMultiStyle
              parts={[
                { text: "Bento Services Suite", italic: true }
              ]}
              className="text-3xl sm:text-5xl text-white font-medium"
            />
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto font-light">
              A comprehensive suite of customized financial services built on realistic expectations and clear corporate research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Service 1 - Large Bento */}
            <div className="md:col-span-8">
              <TiltCard className="h-full flex flex-col justify-between min-h-[250px]">
                <div className="space-y-4">
                  <div className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">Primary Advisory</div>
                  <h3 className="text-xl sm:text-2xl text-white font-medium">PSX Investment Guidance</h3>
                  <p className="text-xs sm:text-sm text-[#A8A695]/95 leading-relaxed font-light max-w-xl">
                    Our core service offers personalized advisory strategies, mapping corporate balance sheets to pick high-yield enterprise assets. We build your long-term PSX allocations systematically.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-xs text-primary font-mono">
                  <span> CDC Sub-Account Custody </span>
                  <Award className="w-5 h-5 text-primary" />
                </div>
              </TiltCard>
            </div>

            {/* Service 2 - Short Bento */}
            <div className="md:col-span-4">
              <TiltCard className="h-full flex flex-col justify-between min-h-[250px]">
                <div className="space-y-4">
                  <div className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">Active Shield</div>
                  <h3 className="text-lg sm:text-xl text-white font-medium">Risk Management</h3>
                  <p className="text-xs text-[#A8A695]/90 leading-relaxed font-light">
                    Continuous monitoring of volatility metrics and defensive sector adjustments to shield asset base from economic corrections.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-xs text-primary font-mono">
                  <span>Capital Preservation</span>
                  <Check className="w-4 h-4 text-primary" />
                </div>
              </TiltCard>
            </div>

            {/* Service 3 - Short Bento */}
            <div className="md:col-span-4">
              <TiltCard className="h-full flex flex-col justify-between min-h-[250px]">
                <div className="space-y-4">
                  <div className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">Dividend Stream</div>
                  <h3 className="text-lg sm:text-xl text-white font-medium">Dividend Investing</h3>
                  <p className="text-xs text-[#A8A695]/90 leading-relaxed font-light">
                    Targeted allocation in verified blue-chip corporate entities offering high dividend payouts to provide solid secondary PKR cash flows.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-xs text-primary font-mono">
                  <span>Passive Cash Flows</span>
                  <Activity className="w-4 h-4 text-primary" />
                </div>
              </TiltCard>
            </div>

            {/* Service 4 - Large Bento */}
            <div className="md:col-span-8">
              <TiltCard className="h-full flex flex-col justify-between min-h-[250px]">
                <div className="space-y-4">
                  <div className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">Future Allocation</div>
                  <h3 className="text-xl sm:text-2xl text-white font-medium">Long-Term Wealth Strategy</h3>
                  <p className="text-xs sm:text-sm text-[#A8A695]/95 leading-relaxed font-light max-w-xl">
                    Bespoke long-term planning aligned with family objectives: children's elite university education funds, marriages, and retired income systems using PSX capital growth potentials.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-xs text-primary font-mono">
                  <span>Generational Security</span>
                  <Globe className="w-5 h-5 text-primary" />
                </div>
              </TiltCard>
            </div>
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 7 — EMOTIONAL TRANSITION STATEMENT (QUOTE)
      ------------------------------------------------------------ */}
      <section className="py-24 sm:py-36 px-4 bg-[#020a05] text-center relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-glow blur-3xl opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.25em] text-[#d4af37] font-bold uppercase"
          >
            Silent Reality Check
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-4xl md:text-5xl font-light text-white leading-snug font-serif italic"
          >
            “If your income stays the same while prices rise every year, you are becoming poorer silently.”
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="h-[1px] w-24 bg-primary mx-auto mt-6"
          />
        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 8 — PREMIUM DUAL FOUNDER CARD SPREAD
      ------------------------------------------------------------ */}
      <section 
        className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#061a10] border-t border-[#0b291a]/30 relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-bold text-primary uppercase">
              Trusted Mentors
            </span>
            <WordsPullUpMultiStyle
              parts={[
                { text: "Founders & Advisors", italic: true }
              ]}
              className="text-3xl sm:text-5xl text-white font-medium"
            />
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto font-light">
              Calm, disciplined investment mentors who are dedicated to helped families navigate the PSX systematically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Founder 1 */}
            <TiltCard className="flex flex-col justify-between min-h-[350px]">
              <div>
                <div className="relative w-20 h-20 mb-6 mx-auto md:mx-0">
                  <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow scale-105" />
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#d4af37] bg-[#0b291a] flex items-center justify-center select-none shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#DEDBC8]" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <h4 className="text-lg sm:text-xl font-medium text-white tracking-wide">
                    Muhammad Atif Nadeem
                  </h4>
                  <p className="text-[10px] text-primary/80 tracking-widest uppercase font-bold">
                    Investment Advisor
                  </p>
                  <p className="text-xs text-[#A8A695]/90 leading-relaxed font-light pt-3">
                    “Focused on disciplined long-term investing, financial awareness, and helping ordinary individuals build stronger financial futures through responsible PSX investment strategies.”
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                <span>Core Research</span>
                <span className="text-[#d4af37]">Discipline First</span>
              </div>
            </TiltCard>

            {/* Founder 2 */}
            <TiltCard className="flex flex-col justify-between min-h-[350px]">
              <div>
                <div className="relative w-20 h-20 mb-6 mx-auto md:mx-0">
                  <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow scale-105" />
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#d4af37] bg-[#0b291a] flex items-center justify-center select-none shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#DEDBC8]" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <h4 className="text-lg sm:text-xl font-medium text-white tracking-wide">
                    Tanveer Hussain
                  </h4>
                  <p className="text-[10px] text-primary/80 tracking-widest uppercase font-bold">
                    Investment Advisor
                  </p>
                  <p className="text-xs text-[#A8A695]/90 leading-relaxed font-light pt-3">
                    “Focused on disciplined long-term investing, financial awareness, and helping ordinary individuals build stronger financial futures through responsible PSX investment strategies.”
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#0b291a]/40 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                <span>Asset Management</span>
                <span className="text-[#d4af37]">Compound Focus</span>
              </div>
            </TiltCard>
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 9 — MISSION STATEMENT (FULL WIDTH)
      ------------------------------------------------------------ */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 border-t border-[#0b291a]/30 bg-[#020a05] text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(222,219,200,0.03),transparent_60%)] pointer-events-none" />
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-bold mb-4"
        >
          Our Purpose
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1.2 }}
          className="text-2xl sm:text-4xl md:text-5xl font-light text-white leading-snug max-w-4xl mx-auto"
        >
          "Our mission is helping <span className="font-serif italic text-primary">ordinary people</span> build <span className="font-serif italic text-primary">extraordinary</span> financial stability."
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 text-center text-xs font-light text-[#A8A695]/85">
          <div className="p-4 border border-[#0b291a]/40 rounded-2xl bg-[#0b291a]/20">Financial security for every family</div>
          <div className="p-4 border border-[#0b291a]/40 rounded-2xl bg-[#0b291a]/20">Accessible investing education</div>
          <div className="p-4 border border-[#0b291a]/40 rounded-2xl bg-[#0b291a]/20">Disciplined wealth building</div>
        </div>
      </section>

      {/* -----------------------------------------------------------
         SECTION 10 — SECURED CONTACT FOOTER
      ------------------------------------------------------------ */}
      <footer 
        id="contact"
        className="bg-[#020a06] py-16 sm:py-24 px-4 sm:px-12 md:px-24 border-t border-[#0b291a]/40 relative overflow-hidden z-10"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-luxury-glow blur-[120px] opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 text-left">
          
          {/* Brand Info (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <AmanahLogo className="w-8 h-7" />
              <div className="flex flex-col text-left">
                <span className="text-base font-cinzel font-bold tracking-wider text-white leading-none">
                  AMANAH
                </span>
                <span className="text-[8px] font-cinzel font-bold tracking-[0.25em] text-[#d4af37] uppercase leading-none mt-0.5">
                  CAPITAL
                </span>
              </div>
            </div>
            
            <p className="text-xs text-[#A8A695]/80 font-light leading-relaxed max-w-sm">
              Portfolio guidance and disciplined asset consulting constructed exclusively for PKR accumulators, retail professionals, and high-trust wealth creation systems in Pakistan & UAE.
            </p>

            {/* Premium WhatsApp Button */}
            <div className="pt-4">
              <a 
                href="https://wa.me/971501987035"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => enterInteractive("WHATSAPP", "hovered")}
                onMouseLeave={leaveInteractive}
                className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-lg transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.405 0 9.803-4.373 9.806-9.755.002-2.607-1.012-5.059-2.859-6.908C16.475 2.093 14.02 1.078 11.41 1.078 6.009 1.078 1.61 5.452 1.607 10.835c-.001 1.623.424 3.21 1.233 4.621L1.83 20.897l5.412-1.427zM17.15 15.64c-.3-.15-1.775-.875-2.05-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-3.04-1.524-4.885-3.75-5.59-4.965-.175-.3-.025-.462.125-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.491-.58-.675-.589-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.012-.275.938-1.05 1.013-1.05 2.463 0 1.45.95 2.85 1.075 3.025.125.175 1.866 2.85 4.52 3.999 2.652 1.15 2.652.766 3.127.725.475-.04 1.775-.725 2.025-1.388.25-.662.25-1.225.175-1.35-.075-.125-.275-.2-.575-.35z" />
                </svg>
                <span>WhatsApp Advisory</span>
              </a>
            </div>
          </div>

          {/* Legal Risk (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs text-white uppercase tracking-widest font-bold">
              Legal & Risk Disclaimer
            </h4>
            
            <p className="text-[11px] text-[#A8A695]/60 leading-relaxed font-light">
              Investing in the Pakistan Stock Exchange involves real market volatility. Past returns do not ensure future advisory profit yield margins. Decisions must be backed by transparent balance-sheet profiling. Amanah Capital specializes in pure financial education and market discipline.
            </p>
            
            <p className="text-[10px] text-primary/45 font-light">
              © 2026 Amanah Capital Advisory. All Rights Reserved.
            </p>
          </div>

          {/* Direct Address & Channels (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs text-white uppercase tracking-widest font-bold">
              Secure Advisory Channels
            </h4>

            <ul className="space-y-3.5 text-xs font-light text-[#A8A695]/90">
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <Phone className="text-primary w-3.5 h-3.5" />
                <a href="tel:+923122120303">+92 312 2120303</a>
                <span className="text-[8px] bg-white/5 border border-white/15 px-1.5 py-0.5 rounded text-gray-500 uppercase tracking-widest font-semibold">PK</span>
              </li>

              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <Phone className="text-primary w-3.5 h-3.5" />
                <a href="tel:+971501987035">+971 50 198 7035</a>
                <span className="text-[8px] bg-white/5 border border-white/15 px-1.5 py-0.5 rounded text-gray-500 uppercase tracking-widest font-semibold">UAE</span>
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
