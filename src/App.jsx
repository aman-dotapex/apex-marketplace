import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  Home as HomeIcon, Grid3x3, Search, FileText, User, ChevronLeft, ChevronRight,
  Star, Heart, Phone, MessageCircle, Send, CheckCircle2, Shield, MapPin,
  X, Plus, Minus, LogOut, LogIn, UserPlus, Settings as SettingsIcon, Package, TrendingUp,
  DollarSign, BarChart3, Users, Building2, Gamepad2, Smartphone, Monitor, Sofa,
  Shirt, HardHat, Wrench, Eye, EyeOff, ShoppingBag, ShoppingCart, Percent, Wallet, Info,
  Sun, Moon, Laptop, Tag, Truck, CreditCard, Edit3, Trash2, ChevronDown, Bell
} from "lucide-react";

/* ============================================================
   STORAGE
   ============================================================ */
const store = {
  get(key, fallback) { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} },
};

/* ============================================================
   THEME ENGINE — system / light / dark
   ============================================================ */
const darkTokens = {
  mode: "dark",
  bg: "#0B0C10", bgGrad: "linear-gradient(160deg,#0B0C10 0%,#15161C 100%)",
  panel: "rgba(255,255,255,0.045)", panel2: "rgba(255,255,255,0.075)",
  panelSolid: "#181A20", border: "rgba(255,255,255,0.09)",
  text: "#F3F2ED", textDim: "#A0A2AC", textFaint: "#6C6E78",
  navBg: "rgba(11,12,16,0.82)", inputBg: "rgba(255,255,255,0.06)",
  danger: "#FF6B6B", success: "#34C77B", overlay: "rgba(0,0,0,0.6)",
  shadow: "0 8px 30px rgba(0,0,0,0.35)",
};
const lightTokens = {
  mode: "light",
  bg: "#F6F6F3", bgGrad: "linear-gradient(160deg,#FFFFFF 0%,#F0F0EC 100%)",
  panel: "rgba(255,255,255,0.75)", panel2: "rgba(0,0,0,0.035)",
  panelSolid: "#FFFFFF", border: "rgba(0,0,0,0.08)",
  text: "#16171B", textDim: "#5C5E67", textFaint: "#8D8F98",
  navBg: "rgba(255,255,255,0.85)", inputBg: "rgba(0,0,0,0.035)",
  danger: "#E5484D", success: "#1F9D5C", overlay: "rgba(0,0,0,0.4)",
  shadow: "0 8px 24px rgba(0,0,0,0.08)",
};
const ACCENT = "#E08A3E";
const ACCENT_DEEP = "#B5661F";
const ACCENT_ON = "#12130F";

const ThemeContext = createContext(darkTokens);
const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [pref, setPref] = useState(() => store.get("apex_theme_pref", "system"));
  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)").matches : true
  );

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setSystemDark(e.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler); };
  }, []);

  const resolvedMode = pref === "system" ? (systemDark ? "dark" : "light") : pref;
  const tokens = resolvedMode === "dark" ? darkTokens : lightTokens;

  const setThemePref = (p) => { setPref(p); store.set("apex_theme_pref", p); };

  useEffect(() => {
    document.documentElement.style.background = tokens.bg;
    document.body.style.background = tokens.bg;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "theme-color"; document.head.appendChild(meta); }
    meta.content = tokens.bg;
  }, [tokens]);

  return (
    <ThemeContext.Provider value={{ ...tokens, pref, setThemePref, resolvedMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

const fontStack = "'Manrope','Segoe UI',system-ui,sans-serif";
const displayFont = "'Sora','Manrope',system-ui,sans-serif";

/* ============================================================
   CATEGORIES (dark + light gradient variants)
   ============================================================ */
const CATEGORIES = [
  { id: "construction", name: "Construction", Icon: HardHat, accent: "#E08A3E",
    dark: "linear-gradient(135deg,#1E1610 0%,#2B1D10 100%)", light: "linear-gradient(135deg,#FBEEE0 0%,#F5DEC1 100%)",
    tagline: "Cement, steel, tiles, roofing & more" },
  { id: "gaming", name: "Gaming", Icon: Gamepad2, accent: "#8B5CF6",
    dark: "linear-gradient(135deg,#160B26 0%,#241236 100%)", light: "linear-gradient(135deg,#EFE7FC 0%,#DFCEFA 100%)",
    tagline: "Consoles, PCs, gear & accessories" },
  { id: "electronics", name: "Phones & Electronics", Icon: Smartphone, accent: "#22B8CF",
    dark: "linear-gradient(135deg,#071B22 0%,#0C2A33 100%)", light: "linear-gradient(135deg,#E1F6FA 0%,#C7EDF4 100%)",
    tagline: "Smartphones, TVs, audio & gadgets" },
  { id: "computers", name: "Computers", Icon: Monitor, accent: "#14B8A6",
    dark: "linear-gradient(135deg,#071A17 0%,#0C2723 100%)", light: "linear-gradient(135deg,#DFF7F3 0%,#C4EEE6 100%)",
    tagline: "Laptops, desktops, parts & peripherals" },
  { id: "furniture", name: "Furniture", Icon: Sofa, accent: "#C88A4F",
    dark: "linear-gradient(135deg,#1C140D 0%,#2A1D12 100%)", light: "linear-gradient(135deg,#F6EADB 0%,#EDD8BB 100%)",
    tagline: "Sofas, desks, storage & decor" },
  { id: "fashion", name: "Fashion", Icon: Shirt, accent: "#E0559B",
    dark: "linear-gradient(135deg,#210E1A 0%,#301327 100%)", light: "linear-gradient(135deg,#FBE5F0 0%,#F5CCE2 100%)",
    tagline: "Clothing, shoes & accessories" },
];
const catById = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
const catBg = (c, mode) => (mode === "light" ? c.light : c.dark);

/* ============================================================
   SAMPLE DATA
   ============================================================ */
const SUPPLIERS = [
  { id: "s1", name: "Habesha Cement & Steel", city: "Addis Ababa", verified: true, rating: 4.8, reviews: 214 },
  { id: "s2", name: "Merkato Building Supplies", city: "Addis Ababa", verified: true, rating: 4.6, reviews: 132 },
  { id: "s3", name: "Bole Tech Gadgets", city: "Addis Ababa", verified: true, rating: 4.7, reviews: 301 },
  { id: "s4", name: "Nexus Gaming Hub", city: "Addis Ababa", verified: true, rating: 4.9, reviews: 178 },
  { id: "s5", name: "Adama Furniture House", city: "Adama", verified: false, rating: 4.3, reviews: 64 },
  { id: "s6", name: "Piassa Style Collection", city: "Addis Ababa", verified: true, rating: 4.5, reviews: 97 },
  { id: "s7", name: "Dukem Construction Depot", city: "Dukem", verified: true, rating: 4.4, reviews: 88 },
  { id: "s8", name: "Bishoftu Electronics", city: "Bishoftu", verified: false, rating: 4.2, reviews: 41 },
];
const PRODUCTS = [
  { id: "p1", name: "Portland Cement (50kg)", cat: "construction", price: 950, oldPrice: null, unit: "bag", supplierId: "s1", rating: 4.8, img: "🧱", stock: 240 },
  { id: "p2", name: "Reinforcement Steel Bar 12mm", cat: "construction", price: 2100, oldPrice: 2350, unit: "piece", supplierId: "s1", rating: 4.7, img: "🔩", stock: 500 },
  { id: "p3", name: "Ceramic Floor Tiles (per m²)", cat: "construction", price: 780, oldPrice: null, unit: "m²", supplierId: "s2", rating: 4.5, img: "🔲", stock: 1200 },
  { id: "p4", name: "Corrugated Roofing Sheet", cat: "construction", price: 1350, oldPrice: null, unit: "sheet", supplierId: "s7", rating: 4.6, img: "🏠", stock: 80 },
  { id: "p5", name: "River Sand (per truck)", cat: "construction", price: 4800, oldPrice: null, unit: "truck", supplierId: "s2", rating: 4.4, img: "🏖️", stock: 12 },
  { id: "p6", name: "PVC Plumbing Pipe 4in", cat: "construction", price: 620, oldPrice: 700, unit: "piece", supplierId: "s7", rating: 4.3, img: "🚰", stock: 300 },
  { id: "p7", name: "PlayStation 5 Console", cat: "gaming", price: 68000, oldPrice: 74000, unit: "unit", supplierId: "s4", rating: 4.9, img: "🎮", stock: 14 },
  { id: "p8", name: "Gaming PC — RTX 4070 Build", cat: "gaming", price: 145000, oldPrice: null, unit: "unit", supplierId: "s4", rating: 4.8, img: "🖥️", stock: 5 },
  { id: "p9", name: "Mechanical RGB Keyboard", cat: "gaming", price: 3200, oldPrice: null, unit: "unit", supplierId: "s4", rating: 4.6, img: "⌨️", stock: 60 },
  { id: "p10", name: "Wireless Gaming Headset", cat: "gaming", price: 2800, oldPrice: 3300, unit: "unit", supplierId: "s4", rating: 4.5, img: "🎧", stock: 45 },
  { id: "p11", name: "iPhone 15 Pro (256GB)", cat: "electronics", price: 98000, oldPrice: null, unit: "unit", supplierId: "s3", rating: 4.9, img: "📱", stock: 22 },
  { id: "p12", name: "Samsung 55in 4K Smart TV", cat: "electronics", price: 52000, oldPrice: 58000, unit: "unit", supplierId: "s3", rating: 4.6, img: "📺", stock: 9 },
  { id: "p13", name: "Bluetooth Speaker — Pro", cat: "electronics", price: 4200, oldPrice: null, unit: "unit", supplierId: "s8", rating: 4.4, img: "🔊", stock: 70 },
  { id: "p14", name: "MacBook Air M3", cat: "computers", price: 112000, oldPrice: null, unit: "unit", supplierId: "s3", rating: 4.8, img: "💻", stock: 11 },
  { id: "p15", name: "27in 144Hz Monitor", cat: "computers", price: 21500, oldPrice: 24000, unit: "unit", supplierId: "s4", rating: 4.7, img: "🖥️", stock: 18 },
  { id: "p16", name: "1TB NVMe SSD", cat: "computers", price: 3800, oldPrice: null, unit: "unit", supplierId: "s3", rating: 4.6, img: "💾", stock: 90 },
  { id: "p17", name: "3-Seat Modern Sofa", cat: "furniture", price: 38000, oldPrice: null, unit: "unit", supplierId: "s5", rating: 4.5, img: "🛋️", stock: 7 },
  { id: "p18", name: "Office Desk — Oak Finish", cat: "furniture", price: 12500, oldPrice: 14000, unit: "unit", supplierId: "s5", rating: 4.3, img: "🪑", stock: 15 },
  { id: "p19", name: "Wardrobe Storage Cabinet", cat: "furniture", price: 21000, oldPrice: null, unit: "unit", supplierId: "s5", rating: 4.4, img: "🚪", stock: 6 },
  { id: "p20", name: "Habesha Kemis — Handwoven", cat: "fashion", price: 4500, oldPrice: null, unit: "piece", supplierId: "s6", rating: 4.8, img: "👗", stock: 33 },
  { id: "p21", name: "Men's Leather Jacket", cat: "fashion", price: 6200, oldPrice: 7000, unit: "piece", supplierId: "s6", rating: 4.5, img: "🧥", stock: 25 },
  { id: "p22", name: "Running Shoes — Sport", cat: "fashion", price: 3100, oldPrice: null, unit: "pair", supplierId: "s6", rating: 4.4, img: "👟", stock: 55 },
];
const COMMISSION_RATE = 0.06;
const DELIVERY_FEE = 250;
const COUPONS = { APEX10: 0.10 };

/* ============================================================
   PRIMITIVES
   ============================================================ */
function TopBar({ title, onBack, right }) {
  const T = useTheme();
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", gap: 10,
      padding: "16px 16px", background: T.navBg, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      borderBottom: `1px solid ${T.border}`,
    }}>
      {onBack && <button onClick={onBack} style={iconBtnStyle(T)}><ChevronLeft size={20} color={T.text} /></button>}
      <div style={{ fontFamily: displayFont, fontSize: 18, fontWeight: 700, color: T.text, flex: 1 }}>{title}</div>
      {right}
    </div>
  );
}
const iconBtnStyle = (T) => ({
  width: 38, height: 38, borderRadius: 12, background: T.panel2, border: `1px solid ${T.border}`,
  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
});
const inputStyle = (T) => ({
  width: "100%", padding: "13px 14px", borderRadius: 12, marginBottom: 12,
  background: T.inputBg, border: `1px solid ${T.border}`, color: T.text,
  fontSize: 14.5, fontFamily: fontStack, outline: "none", boxSizing: "border-box",
});
const cardStyle = (T) => ({ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, backdropFilter: "blur(10px)" });

function PrimaryButton({ children, onClick, style, Icon, full, accent = ACCENT, disabled }) {
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px",
      borderRadius: 14, border: "none", cursor: disabled ? "not-allowed" : "pointer",
      background: disabled ? "#8A8A8A" : accent, color: ACCENT_ON, fontFamily: fontStack, fontWeight: 700,
      fontSize: 15, width: full ? "100%" : "auto", opacity: disabled ? 0.6 : 1, ...style,
    }}>
      {Icon && <Icon size={17} />}{children}
    </button>
  );
}
function GhostButton({ children, onClick, style, Icon }) {
  const T = useTheme();
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 18px",
      borderRadius: 14, cursor: "pointer", background: "transparent", color: T.text, border: `1px solid ${T.border}`,
      fontFamily: fontStack, fontWeight: 600, fontSize: 14, ...style,
    }}>{Icon && <Icon size={16} />}{children}</button>
  );
}
function Badge({ children, color, bg }) {
  const T = useTheme();
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999,
      background: bg || T.panel2, color: color || T.textDim, fontFamily: fontStack,
    }}>{children}</span>
  );
}
function EmptyState({ Icon, text }) {
  const T = useTheme();
  return (
    <div style={{ textAlign: "center", color: T.textFaint, padding: "60px 24px", fontSize: 13.5 }}>
      <Icon size={36} color={T.textFaint} style={{ marginBottom: 10 }} />
      <div>{text}</div>
    </div>
  );
}

function BottomNav({ screen, setScreen, role, cartCount }) {
  const T = useTheme();
  const items = role === "supplier"
    ? [{ id: "supplierHome", label: "Dashboard", Icon: BarChart3 }, { id: "supplierProducts", label: "Products", Icon: Package },
       { id: "chatList", label: "Chats", Icon: MessageCircle }, { id: "profile", label: "Profile", Icon: User }]
    : role === "admin"
    ? [{ id: "adminHome", label: "Overview", Icon: BarChart3 }, { id: "adminUsers", label: "Users", Icon: Users },
       { id: "adminSuppliers", label: "Suppliers", Icon: Building2 }, { id: "profile", label: "Profile", Icon: User }]
    : [{ id: "home", label: "Home", Icon: HomeIcon }, { id: "categories", label: "Categories", Icon: Grid3x3 },
       { id: "search", label: "Search", Icon: Search }, { id: "cart", label: "Cart", Icon: ShoppingCart, badge: cartCount },
       { id: "profile", label: "Profile", Icon: User }];
  return (
    <div style={{ position: "sticky", bottom: 0, display: "flex", background: T.navBg, backdropFilter: "blur(14px)",
      borderTop: `1px solid ${T.border}`, padding: "8px 4px 10px" }}>
      {items.map(({ id, label, Icon, badge }) => {
        const active = screen === id;
        return (
          <button key={id} onClick={() => setScreen(id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            background: "transparent", border: "none", cursor: "pointer", padding: "6px 0", position: "relative",
          }}>
            <Icon size={20} color={active ? ACCENT : T.textFaint} />
            {badge > 0 && <span style={{
              position: "absolute", top: 0, right: "28%", background: T.danger, color: "#fff", fontSize: 9, fontWeight: 800,
              borderRadius: 999, minWidth: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px",
            }}>{badge}</span>}
            <span style={{ fontSize: 10.5, fontWeight: 700, color: active ? T.text : T.textFaint, fontFamily: fontStack }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   AUTH
   ============================================================ */
function AuthScreen({ mode, setMode, onAuth }) {
  const T = useTheme();
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); const [role, setRole] = useState("customer");
  const [showPw, setShowPw] = useState(false); const [err, setErr] = useState(""); const [forgot, setForgot] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const submit = () => {
    setErr("");
    if (!email || !password || (mode === "signup" && !name)) { setErr("Please fill in all fields."); return; }
    const users = store.get("apex_users", []);
    if (mode === "signup") {
      if (users.some(u => u.email === email)) { setErr("An account with this email already exists."); return; }
      const newUser = { id: "u" + Date.now(), name, email, password, role, createdAt: Date.now() };
      users.push(newUser); store.set("apex_users", users); store.set("apex_session", newUser.id); onAuth(newUser);
    } else {
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) { setErr("Incorrect email or password."); return; }
      store.set("apex_session", found.id); onAuth(found);
    }
  };

  if (forgot) {
    return (
      <div style={{ minHeight: "100vh", background: T.bgGrad, display: "flex", flexDirection: "column", padding: 24, fontFamily: fontStack }}>
        <button onClick={() => { setForgot(false); setResetSent(false); }} style={{ ...iconBtnStyle(T), marginBottom: 20 }}><ChevronLeft size={20} color={T.text} /></button>
        <div style={{ fontFamily: displayFont, fontSize: 22, fontWeight: 800, color: T.text, marginBottom: 8 }}>Reset password</div>
        <div style={{ fontSize: 13.5, color: T.textDim, marginBottom: 20 }}>Enter your email and we'll send a reset link.</div>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle(T)} />
        {resetSent ? (
          <div style={{ color: T.success, fontSize: 13.5, display: "flex", alignItems: "center", gap: 6 }}><CheckCircle2 size={16} /> Reset link sent — check your inbox.</div>
        ) : (
          <PrimaryButton full onClick={() => setResetSent(true)}>Send reset link</PrimaryButton>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bgGrad, display: "flex", flexDirection: "column", padding: 24, fontFamily: fontStack }}>
      <div style={{ marginTop: 40, marginBottom: 28, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 28, fontWeight: 900, color: "#12130F" }}>A</div>
        <div style={{ fontFamily: displayFont, fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: 0.3 }}>APEX Marketplace</div>
        <div style={{ color: T.textDim, fontSize: 13.5, marginTop: 6 }}>Built for buyers, suppliers & administrators.</div>
      </div>

      <div style={{ display: "flex", background: T.panel2, borderRadius: 14, padding: 4, marginBottom: 22 }}>
        {["login", "signup"].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
            background: mode === m ? ACCENT : "transparent", color: mode === m ? ACCENT_ON : T.textDim, fontWeight: 700, fontSize: 14,
          }}>{m === "login" ? "Log In" : "Sign Up"}</button>
        ))}
      </div>

      {mode === "signup" && <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} style={inputStyle(T)} />}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle(T)} />
      <div style={{ position: "relative" }}>
        <input placeholder="Password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle(T), paddingRight: 44 }} />
        <button onClick={() => setShowPw(s => !s)} style={{ position: "absolute", right: 12, top: 13, background: "none", border: "none", cursor: "pointer" }}>
          {showPw ? <EyeOff size={18} color={T.textFaint} /> : <Eye size={18} color={T.textFaint} />}
        </button>
      </div>
      {mode === "login" && (
        <button onClick={() => setForgot(true)} style={{ background: "none", border: "none", color: ACCENT, fontSize: 12.5, fontWeight: 700, textAlign: "right", cursor: "pointer", marginBottom: 6 }}>
          Forgot password?
        </button>
      )}

      {mode === "signup" && (
        <div style={{ marginTop: 6, marginBottom: 4 }}>
          <div style={{ fontSize: 12.5, color: T.textDim, marginBottom: 8, fontWeight: 600 }}>I want to join as a...</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ id: "customer", label: "Buyer", Icon: ShoppingBag }, { id: "supplier", label: "Supplier", Icon: Building2 }].map(r => (
              <button key={r.id} onClick={() => setRole(r.id)} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px",
                borderRadius: 14, cursor: "pointer", fontFamily: fontStack,
                background: role === r.id ? `${ACCENT}22` : T.panel2, border: `1.5px solid ${role === r.id ? ACCENT : T.border}`,
              }}>
                <r.Icon size={20} color={role === r.id ? ACCENT : T.textDim} />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: role === r.id ? T.text : T.textDim }}>{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {err && <div style={{ color: T.danger, fontSize: 13, marginTop: 10, marginBottom: 4 }}>{err}</div>}
      <PrimaryButton onClick={submit} full style={{ marginTop: 18 }} Icon={mode === "login" ? LogIn : UserPlus}>
        {mode === "login" ? "Log In" : "Create Account"}
      </PrimaryButton>
      <div style={{ marginTop: 24, textAlign: "center", fontSize: 12, color: T.textFaint }}>Demo app — accounts are stored on this device only.</div>
    </div>
  );
}

/* ============================================================
   PRODUCT CARD
   ============================================================ */
function ProductCard({ product, onClick, isFav, onFav }) {
  const T = useTheme();
  const c = catById(product.cat);
  const supplier = SUPPLIERS.find(s => s.id === product.supplierId);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
    <div onClick={onClick} style={{ ...cardStyle(T), overflow: "hidden", cursor: "pointer" }}>
      <div style={{ height: 90, background: catBg(c, T.mode), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, position: "relative" }}>
        {product.img}
        {discount > 0 && <div style={{ position: "absolute", top: 8, left: 8, background: T.danger, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 7px", borderRadius: 8 }}>-{discount}%</div>}
        <button onClick={(e) => { e.stopPropagation(); onFav(); }} style={{
          position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.35)", border: "none", borderRadius: 999,
          width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}><Heart size={14} color={isFav ? T.danger : "#fff"} fill={isFav ? T.danger : "none"} /></button>
      </div>
      <div style={{ padding: 11 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.text, lineHeight: 1.3, marginBottom: 4 }}>{product.name}</div>
        <div style={{ fontSize: 10.5, color: T.textFaint, marginBottom: 6, display: "flex", alignItems: "center", gap: 3 }}>
          {supplier?.verified && <Shield size={10} color={T.success} />} {supplier?.name}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: c.accent }}>{product.price.toLocaleString()} ETB</span>
          {product.oldPrice && <span style={{ fontSize: 10.5, color: T.textFaint, textDecoration: "line-through" }}>{product.oldPrice.toLocaleString()}</span>}
        </div>
        <div style={{ fontSize: 10, color: product.stock < 10 ? T.danger : T.textFaint, marginTop: 3 }}>
          {product.stock < 10 ? `Only ${product.stock} left` : "In stock"}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HOME
   ============================================================ */
function HomeScreen({ user, setScreen, setActiveCategory, setActiveProduct, favorites, toggleFavorite }) {
  const T = useTheme();
  const deals = PRODUCTS.filter(p => p.oldPrice).slice(0, 6);
  const featured = PRODUCTS.slice(0, 8);
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "18px 16px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, color: T.textDim }}>Welcome back,</div>
          <div style={{ fontFamily: displayFont, fontSize: 22, fontWeight: 800, color: T.text }}>{user?.name?.split(" ")[0] || "Guest"} 👋</div>
        </div>
        <button style={iconBtnStyle(T)} onClick={() => setScreen("notifications")}><Bell size={17} color={T.text} /></button>
      </div>

      <div style={{ padding: "0 16px 18px" }} onClick={() => setScreen("search")}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 14, padding: "12px 14px" }}>
          <Search size={17} color={T.textFaint} />
          <span style={{ color: T.textFaint, fontSize: 14 }}>Search across all categories...</span>
        </div>
      </div>

      <div style={{ padding: "0 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: displayFont, fontSize: 16, fontWeight: 700, color: T.text }}>Shop by category</div>
        <button onClick={() => setScreen("categories")} style={{ background: "none", border: "none", color: ACCENT, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>See all</button>
      </div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 16px 20px" }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => { setActiveCategory(c.id); setScreen("categoryProducts"); }} style={{
            minWidth: 96, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 10px",
            borderRadius: 16, cursor: "pointer", border: "none", background: catBg(c, T.mode),
          }}>
            <c.Icon size={22} color={c.accent} />
            <span style={{ fontSize: 11.5, fontWeight: 700, color: T.text, textAlign: "center" }}>{c.name}</span>
          </button>
        ))}
      </div>

      {deals.length > 0 && (
        <>
          <div style={{ padding: "0 16px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <Tag size={16} color={T.danger} />
            <div style={{ fontFamily: displayFont, fontSize: 16, fontWeight: 700, color: T.text }}>Today's deals</div>
          </div>
          <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 16px 20px" }}>
            {deals.map(p => (
              <div key={p.id} style={{ minWidth: 150 }}>
                <ProductCard product={p} onClick={() => { setActiveProduct(p.id); setScreen("productDetail"); }} isFav={favorites.includes(p.id)} onFav={() => toggleFavorite(p.id)} />
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ padding: "0 16px 12px", fontFamily: displayFont, fontSize: 16, fontWeight: 700, color: T.text }}>Recommended for you</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 16px" }}>
        {featured.map(p => (
          <ProductCard key={p.id} product={p} onClick={() => { setActiveProduct(p.id); setScreen("productDetail"); }} isFav={favorites.includes(p.id)} onFav={() => toggleFavorite(p.id)} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CATEGORIES / CATEGORY PRODUCTS / SEARCH
   ============================================================ */
function CategoriesScreen({ setScreen, setActiveCategory }) {
  const T = useTheme();
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Categories" />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => { setActiveCategory(c.id); setScreen("categoryProducts"); }} style={{
            display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 18, cursor: "pointer",
            border: `1px solid ${T.border}`, background: catBg(c, T.mode), textAlign: "left",
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(120,120,120,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <c.Icon size={24} color={c.accent} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 15.5, color: T.text }}>{c.name}</div>
              <div style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}>{c.tagline}</div>
            </div>
            <ChevronRight size={18} color={T.textFaint} />
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoryProductsScreen({ activeCategory, setScreen, setActiveProduct, favorites, toggleFavorite }) {
  const T = useTheme();
  const c = catById(activeCategory);
  const [sort, setSort] = useState("featured");
  let products = PRODUCTS.filter(p => p.cat === activeCategory);
  if (sort === "priceLow") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "priceHigh") products = [...products].sort((a, b) => b.price - a.price);
  if (sort === "rating") products = [...products].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ minHeight: "100vh", background: catBg(c, T.mode), paddingBottom: 90 }}>
      <TopBar title={c.name} onBack={() => setScreen("categories")} />
      <div style={{ padding: "6px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(120,120,120,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <c.Icon size={22} color={c.accent} />
          </div>
          <div>
            <div style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 17, color: T.text }}>{c.name}</div>
            <div style={{ fontSize: 12, color: T.textDim }}>{products.length} items · {c.tagline}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14 }}>
          {[["featured", "Featured"], ["priceLow", "Price: Low"], ["priceHigh", "Price: High"], ["rating", "Top Rated"]].map(([id, label]) => (
            <button key={id} onClick={() => setSort(id)} style={{
              padding: "7px 13px", borderRadius: 999, whiteSpace: "nowrap", cursor: "pointer", fontSize: 12, fontWeight: 700,
              border: `1px solid ${sort === id ? c.accent : T.border}`, background: sort === id ? `${c.accent}22` : "rgba(120,120,120,0.1)",
              color: sort === id ? c.accent : T.textDim, fontFamily: fontStack,
            }}>{label}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} onClick={() => { setActiveProduct(p.id); setScreen("productDetail"); }} isFav={favorites.includes(p.id)} onFav={() => toggleFavorite(p.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchScreen({ setScreen, setActiveProduct, favorites, toggleFavorite }) {
  const T = useTheme();
  const [q, setQ] = useState(""); const [filterCat, setFilterCat] = useState("all");
  const [maxPrice, setMaxPrice] = useState(200000); const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const results = PRODUCTS.filter(p =>
    (filterCat === "all" || p.cat === filterCat) && (q === "" || p.name.toLowerCase().includes(q.toLowerCase())) &&
    p.price <= maxPrice && p.rating >= minRating
  );
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Search" />
      <div style={{ padding: "10px 16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 14, padding: "11px 14px", flex: 1 }}>
            <Search size={16} color={T.textFaint} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products..." style={{ background: "none", border: "none", outline: "none", color: T.text, fontSize: 14, flex: 1, fontFamily: fontStack }} />
            {q && <X size={15} color={T.textFaint} style={{ cursor: "pointer" }} onClick={() => setQ("")} />}
          </div>
          <button onClick={() => setShowFilters(s => !s)} style={{ ...iconBtnStyle(T), width: 44, height: 44 }}><SettingsIcon size={17} color={T.text} /></button>
        </div>

        {showFilters && (
          <div style={{ ...cardStyle(T), padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, marginBottom: 8 }}>Max price: {maxPrice.toLocaleString()} ETB</div>
            <input type="range" min={500} max={200000} step={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: "100%", marginBottom: 14, accentColor: ACCENT }} />
            <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, marginBottom: 8 }}>Minimum rating</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 4, 4.5, 4.8].map(r => (
                <button key={r} onClick={() => setMinRating(r)} style={{
                  padding: "6px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 700, cursor: "pointer",
                  border: `1px solid ${minRating === r ? ACCENT : T.border}`, background: minRating === r ? `${ACCENT}22` : "transparent",
                  color: minRating === r ? ACCENT : T.textDim,
                }}>{r === 0 ? "Any" : `${r}★+`}</button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12 }}>
          <FilterChip active={filterCat === "all"} onClick={() => setFilterCat("all")} label="All" />
          {CATEGORIES.map(c => <FilterChip key={c.id} active={filterCat === c.id} onClick={() => setFilterCat(c.id)} label={c.name} color={c.accent} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {results.map(p => <ProductCard key={p.id} product={p} onClick={() => { setActiveProduct(p.id); setScreen("productDetail"); }} isFav={favorites.includes(p.id)} onFav={() => toggleFavorite(p.id)} />)}
        </div>
        {results.length === 0 && <EmptyState Icon={Search} text="No products match your search." />}
      </div>
    </div>
  );
}
function FilterChip({ active, onClick, label, color = ACCENT }) {
  const T = useTheme();
  return (
    <button onClick={onClick} style={{
      padding: "8px 14px", borderRadius: 999, whiteSpace: "nowrap", cursor: "pointer", fontSize: 12.5, fontWeight: 700,
      border: `1px solid ${active ? color : T.border}`, background: active ? `${color}22` : "transparent",
      color: active ? color : T.textDim, fontFamily: fontStack,
    }}>{label}</button>
  );
}

/* ============================================================
   PRODUCT DETAIL
   ============================================================ */
function ProductDetailScreen({ activeProduct, setActiveProduct, setScreen, favorites, toggleFavorite, startChat, addToCart, setBuyNowItem }) {
  const T = useTheme();
  const product = PRODUCTS.find(p => p.id === activeProduct);
  const supplier = SUPPLIERS.find(s => s.id === product?.supplierId);
  const c = catById(product?.cat);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  if (!product) return null;
  const isFav = favorites.includes(product.id);
  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ paddingBottom: 100 }}>
      <TopBar title="" onBack={() => setScreen(-1)} right={
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigator.share ? navigator.share({ title: product.name }) : null} style={iconBtnStyle(T)}><Send size={16} color={T.text} /></button>
          <button onClick={() => toggleFavorite(product.id)} style={iconBtnStyle(T)}><Heart size={18} color={isFav ? T.danger : T.text} fill={isFav ? T.danger : "none"} /></button>
        </div>
      } />
      <div style={{ height: 200, background: catBg(c, T.mode), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>{product.img}</div>
      <div style={{ padding: 18 }}>
        <Badge bg={`${c.accent}22`} color={c.accent}>{c.name}</Badge>
        <div style={{ fontFamily: displayFont, fontSize: 21, fontWeight: 800, color: T.text, marginTop: 10 }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={14} color="#F5B942" fill="#F5B942" /><span style={{ fontSize: 13, color: T.textDim }}>{product.rating}</span></div>
          <span style={{ fontSize: 12, color: product.stock < 10 ? T.danger : T.success, fontWeight: 700 }}>{product.stock < 10 ? `Only ${product.stock} left` : "In stock"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: c.accent }}>{product.price.toLocaleString()} ETB</span>
          {product.oldPrice && <span style={{ fontSize: 14, color: T.textFaint, textDecoration: "line-through" }}>{product.oldPrice.toLocaleString()}</span>}
          <span style={{ fontSize: 12, color: T.textFaint }}>/ {product.unit}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
          <span style={{ fontSize: 12.5, color: T.textDim, fontWeight: 600 }}>Quantity</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: T.panel2, borderRadius: 12, padding: "4px 6px" }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ ...iconBtnStyle(T), width: 30, height: 30, background: "transparent", border: "none" }}><Minus size={14} color={T.text} /></button>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.text, minWidth: 18, textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ ...iconBtnStyle(T), width: 30, height: 30, background: "transparent", border: "none" }}><Plus size={14} color={T.text} /></button>
          </div>
        </div>

        <div style={{ marginTop: 18, padding: 14, borderRadius: 14, ...cardStyle(T), display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: T.panel2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏢</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: T.text, display: "flex", alignItems: "center", gap: 5 }}>{supplier?.name} {supplier?.verified && <Shield size={12} color={T.success} />}</div>
            <div style={{ fontSize: 11.5, color: T.textFaint, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={11} /> {supplier?.city} · {supplier?.rating}★ ({supplier?.reviews})</div>
          </div>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: T.textDim, display: "flex", alignItems: "center", gap: 8, ...cardStyle(T), padding: 12 }}>
          <Truck size={15} color={ACCENT} /> Standard delivery {DELIVERY_FEE} ETB · 2–5 business days
        </div>

        <div style={{ marginTop: 20, fontFamily: displayFont, fontSize: 15, fontWeight: 700, color: T.text }}>Description</div>
        <div style={{ fontSize: 13, color: T.textDim, marginTop: 6, lineHeight: 1.6 }}>
          Quality {product.name.toLowerCase()} sourced directly from a verified APEX supplier in {supplier?.city}. Bulk pricing available on request via chat.
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
          <PrimaryButton style={{ flex: 1 }} accent={c.accent} Icon={added ? CheckCircle2 : ShoppingCart} onClick={() => { addToCart(product.id, qty); setAdded(true); setTimeout(() => setAdded(false), 1500); }}>
            {added ? "Added" : "Add to Cart"}
          </PrimaryButton>
          <PrimaryButton style={{ flex: 1, background: T.text, color: T.mode === "dark" ? "#0B0C10" : "#fff" }} Icon={ArrowRightIcon} onClick={() => { setBuyNowItem({ productId: product.id, qty }); setScreen("checkout"); }}>
            Buy Now
          </PrimaryButton>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <GhostButton style={{ flex: 1 }} Icon={MessageCircle} onClick={() => { startChat(product, supplier); setScreen("chat"); }}>Chat</GhostButton>
          <GhostButton style={{ flex: 1 }} Icon={Phone}>Call</GhostButton>
        </div>

        <div style={{ marginTop: 20, fontSize: 12, color: T.textFaint, ...cardStyle(T), padding: 12, display: "flex", gap: 8 }}>
          <Info size={14} color={T.textFaint} style={{ flexShrink: 0, marginTop: 1 }} />
          APEX charges the supplier a small commission on completed orders — the price you see is exactly what you pay.
        </div>

        {related.length > 0 && (
          <>
            <div style={{ marginTop: 24, fontFamily: displayFont, fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 10 }}>Related products</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {related.map(p => <ProductCard key={p.id} product={p} onClick={() => { setActiveProduct(p.id); setQty(1); }} isFav={favorites.includes(p.id)} onFav={() => toggleFavorite(p.id)} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function ArrowRightIcon(props) { return <ChevronRight {...props} />; }

/* ============================================================
   CART / CHECKOUT / ORDERS
   ============================================================ */
function CartScreen({ cart, setCart, setScreen, setBuyNowItem }) {
  const T = useTheme();
  const [coupon, setCoupon] = useState(""); const [couponApplied, setCouponApplied] = useState(null); const [couponErr, setCouponErr] = useState("");
  const items = cart.map(ci => ({ ...ci, product: PRODUCTS.find(p => p.id === ci.productId) })).filter(i => i.product);
  const bySupplier = {};
  items.forEach(i => { const sid = i.product.supplierId; (bySupplier[sid] = bySupplier[sid] || []).push(i); });

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * couponApplied) : 0;
  const delivery = items.length ? DELIVERY_FEE : 0;
  const total = subtotal - discount + delivery;

  const updateQty = (id, qty) => setCart(c => qty <= 0 ? c.filter(x => x.productId !== id) : c.map(x => x.productId === id ? { ...x, qty } : x));
  const removeItem = (id) => setCart(c => c.filter(x => x.productId !== id));

  const applyCoupon = () => {
    const rate = COUPONS[coupon.trim().toUpperCase()];
    if (rate) { setCouponApplied(rate); setCouponErr(""); } else { setCouponErr("Invalid coupon code."); setCouponApplied(null); }
  };

  if (items.length === 0) {
    return (<div style={{ paddingBottom: 90 }}><TopBar title="Cart" /><EmptyState Icon={ShoppingCart} text="Your cart is empty. Browse categories to find something you need." /></div>);
  }

  return (
    <div style={{ paddingBottom: 160 }}>
      <TopBar title="Cart" />
      <div style={{ padding: 16 }}>
        {Object.entries(bySupplier).map(([sid, group]) => {
          const supplier = SUPPLIERS.find(s => s.id === sid);
          return (
            <div key={sid} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: T.textDim, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                <Building2 size={13} /> {supplier?.name}
              </div>
              {group.map(i => (
                <div key={i.productId} style={{ display: "flex", gap: 12, padding: 12, ...cardStyle(T), marginBottom: 8 }}>
                  <div style={{ fontSize: 28 }}>{i.product.img}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{i.product.name}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: catById(i.product.cat).accent, marginTop: 4 }}>{i.product.price.toLocaleString()} ETB</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.panel2, borderRadius: 10, padding: "2px 6px" }}>
                        <button onClick={() => updateQty(i.productId, i.qty - 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Minus size={13} color={T.text} /></button>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: T.text }}>{i.qty}</span>
                        <button onClick={() => updateQty(i.productId, i.qty + 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Plus size={13} color={T.text} /></button>
                      </div>
                      <button onClick={() => removeItem(i.productId)} style={{ background: "none", border: "none", cursor: "pointer", color: T.danger, fontSize: 11.5, fontWeight: 700 }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input placeholder="Coupon code (try APEX10)" value={coupon} onChange={e => setCoupon(e.target.value)} style={{ ...inputStyle(T), marginBottom: 0, flex: 1 }} />
          <PrimaryButton onClick={applyCoupon}>Apply</PrimaryButton>
        </div>
        {couponErr && <div style={{ color: T.danger, fontSize: 12, marginBottom: 10 }}>{couponErr}</div>}
        {couponApplied && <div style={{ color: T.success, fontSize: 12, marginBottom: 10 }}>Coupon applied — {(couponApplied * 100).toFixed(0)}% off!</div>}

        <div style={{ ...cardStyle(T), padding: 16 }}>
          <Row label="Subtotal" value={`${subtotal.toLocaleString()} ETB`} />
          {discount > 0 && <Row label="Discount" value={`− ${discount.toLocaleString()} ETB`} color={T.success} />}
          <Row label="Delivery fee" value={`${delivery.toLocaleString()} ETB`} />
          <div style={{ borderTop: `1px solid ${T.border}`, margin: "10px 0" }} />
          <Row label="Total" value={`${total.toLocaleString()} ETB`} bold />
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 480, margin: "0 auto", padding: 14, background: T.navBg, backdropFilter: "blur(14px)", borderTop: `1px solid ${T.border}` }}>
        <PrimaryButton full Icon={ArrowRightIcon} onClick={() => { setBuyNowItem(null); setScreen("checkout"); }}>Proceed to Checkout · {total.toLocaleString()} ETB</PrimaryButton>
      </div>
    </div>
  );
}
function Row({ label, value, bold, color }) {
  const T = useTheme();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: bold ? 0 : 8 }}>
      <span style={{ fontSize: bold ? 14.5 : 13, color: bold ? T.text : T.textDim, fontWeight: bold ? 800 : 600 }}>{label}</span>
      <span style={{ fontSize: bold ? 16 : 13, color: color || (bold ? ACCENT : T.text), fontWeight: bold ? 800 : 700 }}>{value}</span>
    </div>
  );
}

function CheckoutScreen({ cart, buyNowItem, setScreen, user, placeOrder }) {
  const T = useTheme();
  const items = (buyNowItem ? [buyNowItem] : cart).map(ci => ({ ...ci, product: PRODUCTS.find(p => p.id === ci.productId) })).filter(i => i.product);
  const [address, setAddress] = useState(() => store.get("apex_address", { line: "", city: "Addis Ababa", phone: "" }));
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [payment, setPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const delivery = deliveryMethod === "express" ? DELIVERY_FEE * 2 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const canPlace = address.line && address.phone;

  const confirm = () => {
    if (!canPlace) return;
    setPlacing(true);
    store.set("apex_address", address);
    setTimeout(() => {
      placeOrder({ items, address, deliveryMethod, payment, subtotal, delivery, total });
      setPlacing(false);
    }, 700);
  };

  return (
    <div style={{ paddingBottom: 160 }}>
      <TopBar title="Checkout" onBack={() => setScreen(-1)} />
      <div style={{ padding: 16 }}>
        <SectionLabel>Delivery address</SectionLabel>
        <input placeholder="Street address, house number" value={address.line} onChange={e => setAddress(a => ({ ...a, line: e.target.value }))} style={inputStyle(T)} />
        <input placeholder="Phone number" value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} style={inputStyle(T)} />
        <select value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} style={{ ...inputStyle(T), appearance: "none" }}>
          {["Addis Ababa", "Dukem", "Bishoftu", "Adama"].map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <SectionLabel>Delivery method</SectionLabel>
        <OptionRow selected={deliveryMethod === "standard"} onClick={() => setDeliveryMethod("standard")} title="Standard delivery" sub="2–5 business days" right={`${DELIVERY_FEE} ETB`} />
        <OptionRow selected={deliveryMethod === "express"} onClick={() => setDeliveryMethod("express")} title="Express delivery" sub="Next-day, select cities" right={`${DELIVERY_FEE * 2} ETB`} />

        <SectionLabel>Payment method</SectionLabel>
        <OptionRow selected={payment === "cod"} onClick={() => setPayment("cod")} title="Cash on Delivery" sub="Pay when your order arrives" Icon={Wallet} />
        <OptionRow selected={payment === "mobile"} onClick={() => setPayment("mobile")} title="Mobile Money" sub="Telebirr, CBE Birr, M-Pesa" Icon={Smartphone} />
        <OptionRow selected={payment === "card"} onClick={() => setPayment("card")} title="Debit / Credit Card" sub="Visa, Mastercard" Icon={CreditCard} />

        <SectionLabel>Order summary</SectionLabel>
        <div style={{ ...cardStyle(T), padding: 16 }}>
          {items.map(i => <Row key={i.productId} label={`${i.product.name} ×${i.qty}`} value={`${(i.product.price * i.qty).toLocaleString()} ETB`} />)}
          <div style={{ borderTop: `1px solid ${T.border}`, margin: "10px 0" }} />
          <Row label="Delivery" value={`${delivery.toLocaleString()} ETB`} />
          <div style={{ borderTop: `1px solid ${T.border}`, margin: "10px 0" }} />
          <Row label="Total" value={`${total.toLocaleString()} ETB`} bold />
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 480, margin: "0 auto", padding: 14, background: T.navBg, backdropFilter: "blur(14px)", borderTop: `1px solid ${T.border}` }}>
        {!canPlace && <div style={{ fontSize: 11.5, color: T.textFaint, marginBottom: 8, textAlign: "center" }}>Add an address and phone number to continue</div>}
        <PrimaryButton full disabled={!canPlace || placing} onClick={confirm}>{placing ? "Placing order..." : `Place Order · ${total.toLocaleString()} ETB`}</PrimaryButton>
      </div>
    </div>
  );
}
function SectionLabel({ children }) {
  const T = useTheme();
  return <div style={{ fontFamily: displayFont, fontSize: 14, fontWeight: 700, color: T.text, margin: "18px 0 10px" }}>{children}</div>;
}
function OptionRow({ selected, onClick, title, sub, right, Icon }) {
  const T = useTheme();
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 12, width: "100%", padding: 13, borderRadius: 14, marginBottom: 8, cursor: "pointer", textAlign: "left",
      background: selected ? `${ACCENT}15` : T.panel, border: `1.5px solid ${selected ? ACCENT : T.border}`,
    }}>
      {Icon && <Icon size={18} color={selected ? ACCENT : T.textDim} />}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: T.text }}>{title}</div>
        {sub && <div style={{ fontSize: 11.5, color: T.textFaint, marginTop: 2 }}>{sub}</div>}
      </div>
      {right && <span style={{ fontSize: 12.5, fontWeight: 700, color: T.textDim }}>{right}</span>}
      <div style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${selected ? ACCENT : T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {selected && <div style={{ width: 9, height: 9, borderRadius: 999, background: ACCENT }} />}
      </div>
    </button>
  );
}

function OrderConfirmationScreen({ lastOrder, setScreen }) {
  const T = useTheme();
  if (!lastOrder) return null;
  return (
    <div style={{ padding: 24, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: 999, background: `${T.success}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <CheckCircle2 size={36} color={T.success} />
      </div>
      <div style={{ fontFamily: displayFont, fontSize: 20, fontWeight: 800, color: T.text }}>Order placed!</div>
      <div style={{ fontSize: 13.5, color: T.textDim, marginTop: 8 }}>Order #{lastOrder.id} · {lastOrder.total.toLocaleString()} ETB</div>
      <div style={{ fontSize: 12.5, color: T.textFaint, marginTop: 4 }}>You'll receive updates as your order is processed.</div>
      <PrimaryButton style={{ marginTop: 26 }} onClick={() => setScreen("orders")}>View my orders</PrimaryButton>
      <GhostButton style={{ marginTop: 10 }} onClick={() => setScreen("home")}>Back to home</GhostButton>
    </div>
  );
}

function OrdersScreen({ user, setScreen }) {
  const T = useTheme();
  const orders = store.get("apex_orders", []).filter(o => o.userId === user.id).slice().reverse();
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="My Orders" onBack={() => setScreen("profile")} />
      {orders.length === 0 ? <EmptyState Icon={Package} text="No orders yet." /> : (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {orders.map(o => (
            <div key={o.id} style={{ ...cardStyle(T), padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>Order #{o.id}</span>
                <Badge bg={`${ACCENT}22`} color={ACCENT}>{o.status}</Badge>
              </div>
              {o.items.map(i => <div key={i.productId} style={{ fontSize: 12, color: T.textDim, marginBottom: 3 }}>{i.product.name} ×{i.qty}</div>)}
              <div style={{ borderTop: `1px solid ${T.border}`, margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: T.textFaint }}>{new Date(o.createdAt).toLocaleDateString()}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: ACCENT }}>{o.total.toLocaleString()} ETB</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   CHAT
   ============================================================ */
function ChatListScreen({ user, setScreen, setActiveChat }) {
  const T = useTheme();
  const myChats = store.get("apex_chats", []).filter(ch => ch.participants?.includes(user.id));
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Messages" />
      {myChats.length === 0 ? <EmptyState Icon={MessageCircle} text='No conversations yet. Open a product and tap "Chat" to start one.' /> : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {myChats.slice().reverse().map(ch => {
            const lastMsg = ch.messages[ch.messages.length - 1];
            return (
              <button key={ch.id} onClick={() => { setActiveChat(ch.id); setScreen("chat"); }} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", textAlign: "left",
                background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer",
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: T.panel2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{ch.productImg}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: T.text }}>{ch.supplierName}</div>
                  <div style={{ fontSize: 12, color: T.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ch.productName}</div>
                  {lastMsg && <div style={{ fontSize: 11.5, color: T.textFaint, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lastMsg.text}</div>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
function ChatScreen({ user, activeChat, setScreen }) {
  const T = useTheme();
  const [chats, setChats] = useState(() => store.get("apex_chats", []));
  const [text, setText] = useState(""); const bottomRef = useRef(null);
  const chat = chats.find(c => c.id === activeChat);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat?.messages?.length]);
  if (!chat) return <div style={{ padding: 40, textAlign: "center", color: T.textFaint }}>Conversation not found.</div>;

  const send = () => {
    if (!text.trim()) return;
    const updated = chats.map(c => c.id === chat.id ? { ...c, messages: [...c.messages, { from: user.id, text: text.trim(), ts: Date.now() }] } : c);
    setChats(updated); store.set("apex_chats", updated); setText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar title={chat.supplierName} onBack={() => setScreen("chatList")} />
      <div style={{ padding: "10px 14px", background: T.panel2, display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 20 }}>{chat.productImg}</div>
        <div><div style={{ fontSize: 12.5, fontWeight: 700, color: T.text }}>{chat.productName}</div><div style={{ fontSize: 11, color: T.textFaint }}>{chat.productPrice?.toLocaleString()} ETB</div></div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {chat.messages.map((m, i) => {
          const mine = m.from === user.id;
          return (
            <div key={i} style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "75%", padding: "9px 13px", borderRadius: mine ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: mine ? ACCENT : T.panel2, color: mine ? ACCENT_ON : T.text, fontSize: 13.5 }}>{m.text}</div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8, padding: 12, borderTop: `1px solid ${T.border}` }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{ ...inputStyle(T), marginBottom: 0, flex: 1 }} />
        <button onClick={send} style={{ ...iconBtnStyle(T), width: 44, height: 44, background: ACCENT }}><Send size={17} color={ACCENT_ON} /></button>
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE / SETTINGS / NOTIFICATIONS
   ============================================================ */
function ProfileScreen({ user, onLogout, setScreen }) {
  const T = useTheme();
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Profile" />
      <div style={{ padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 60, height: 60, borderRadius: 999, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: ACCENT_ON }}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
        <div>
          <div style={{ fontFamily: displayFont, fontSize: 18, fontWeight: 800, color: T.text }}>{user?.name}</div>
          <div style={{ fontSize: 12.5, color: T.textDim }}>{user?.email}</div>
          <Badge bg={`${ACCENT}22`} color={ACCENT}>{user?.role}</Badge>
        </div>
      </div>
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 2 }}>
        <MenuRow Icon={Package} label="My orders" onClick={() => setScreen("orders")} />
        <MenuRow Icon={Heart} label="Wishlist" onClick={() => setScreen("categories")} />
        <MenuRow Icon={MapPin} label="Addresses" onClick={() => setScreen("checkout")} />
        <MenuRow Icon={Percent} label="How APEX makes money" onClick={() => setScreen("howItWorks")} />
        <MenuRow Icon={SettingsIcon} label="Settings" onClick={() => setScreen("settings")} />
        <MenuRow Icon={LogOut} label="Log out" onClick={onLogout} danger />
      </div>
    </div>
  );
}
function MenuRow({ Icon, label, onClick, danger }) {
  const T = useTheme();
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 4px", background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer", textAlign: "left", width: "100%" }}>
      <Icon size={18} color={danger ? T.danger : T.textDim} />
      <span style={{ fontSize: 14, fontWeight: 600, color: danger ? T.danger : T.text, flex: 1 }}>{label}</span>
      <ChevronRight size={16} color={T.textFaint} />
    </button>
  );
}

function SettingsScreen({ setScreen }) {
  const T = useTheme();
  const [notifs, setNotifs] = useState(() => store.get("apex_notifs_on", true));
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Settings" onBack={() => setScreen("profile")} />
      <div style={{ padding: 16 }}>
        <SectionLabel>Appearance</SectionLabel>
        <div style={{ display: "flex", gap: 8 }}>
          {[["system", "System", Laptop], ["light", "Light", Sun], ["dark", "Dark", Moon]].map(([id, label, Icon]) => (
            <button key={id} onClick={() => T.setThemePref(id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 6px",
              borderRadius: 14, cursor: "pointer", background: T.pref === id ? `${ACCENT}18` : T.panel,
              border: `1.5px solid ${T.pref === id ? ACCENT : T.border}`,
            }}>
              <Icon size={18} color={T.pref === id ? ACCENT : T.textDim} />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: T.pref === id ? T.text : T.textDim }}>{label}</span>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: T.textFaint, marginTop: 8 }}>
          "System" follows your device's light/dark setting automatically.
        </div>

        <SectionLabel>Notifications</SectionLabel>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...cardStyle(T), padding: 14 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: T.text }}>Push notifications</span>
          <Toggle on={notifs} onClick={() => { setNotifs(n => { store.set("apex_notifs_on", !n); return !n; }); }} />
        </div>
      </div>
    </div>
  );
}
function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} style={{ width: 44, height: 26, borderRadius: 999, background: on ? ACCENT : "rgba(120,120,120,0.35)", border: "none", cursor: "pointer", position: "relative" }}>
      <div style={{ width: 20, height: 20, borderRadius: 999, background: "#fff", position: "absolute", top: 3, left: on ? 21 : 3, transition: "left 0.15s" }} />
    </button>
  );
}
function NotificationsScreen({ setScreen }) {
  const T = useTheme();
  const notifs = [
    { Icon: Package, title: "Your order is on the way", sub: "Estimated delivery in 2 days", time: "2h ago" },
    { Icon: Percent, title: "Weekend deal: 10% off electronics", sub: "Use code APEX10 at checkout", time: "1d ago" },
    { Icon: MessageCircle, title: "New message from a supplier", sub: "Reply to keep your order on track", time: "2d ago" },
  ];
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Notifications" onBack={() => setScreen(-1)} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {notifs.map((n, i) => (
          <div key={i} style={{ display: "flex", gap: 12, ...cardStyle(T), padding: 13 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${ACCENT}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><n.Icon size={16} color={ACCENT} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{n.title}</div>
              <div style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}>{n.sub}</div>
            </div>
            <span style={{ fontSize: 10.5, color: T.textFaint, flexShrink: 0 }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksScreen({ setScreen }) {
  const T = useTheme();
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="How APEX Makes Money" onBack={() => setScreen("profile")} />
      <div style={{ padding: 20 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: `${ACCENT}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Percent size={24} color={ACCENT} /></div>
        <div style={{ fontFamily: displayFont, fontSize: 19, fontWeight: 800, color: T.text, marginBottom: 10 }}>A simple commission model</div>
        <div style={{ fontSize: 14, color: T.textDim, lineHeight: 1.6, marginBottom: 18 }}>
          Buyers never pay extra. APEX earns a {(COMMISSION_RATE * 100).toFixed(0)}% commission from the supplier on every order completed through the platform.
        </div>
        {[
          { Icon: ShoppingCart, title: "Buyer places an order", body: "Checkout runs through APEX with delivery and payment options." },
          { Icon: CheckCircle2, title: "Order marked complete", body: "The supplier confirms fulfillment in their dashboard." },
          { Icon: Percent, title: `APEX takes ${(COMMISSION_RATE * 100).toFixed(0)}%`, body: "A commission is deducted from the supplier's payout, not added to your price." },
          { Icon: Wallet, title: "Supplier gets paid", body: "The remaining balance is recorded as the supplier's net earnings." },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.panel2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><s.Icon size={17} color={ACCENT} /></div>
            <div><div style={{ fontSize: 13.5, fontWeight: 700, color: T.text }}>{s.title}</div><div style={{ fontSize: 12.5, color: T.textDim, marginTop: 2, lineHeight: 1.5 }}>{s.body}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SUPPLIER SCREENS
   ============================================================ */
function SupplierHomeScreen({ user, setScreen }) {
  const T = useTheme();
  const myProducts = PRODUCTS.filter(p => p.supplierId === "s1" || p.supplierId === "s4");
  const gross = 186400, commission = Math.round(gross * COMMISSION_RATE), net = gross - commission;
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Supplier Dashboard" right={<button style={iconBtnStyle(T)} onClick={() => setScreen("notifications")}><Bell size={16} color={T.text} /></button>} />
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 13, color: T.textDim, marginBottom: 14 }}>Welcome back, {user?.name?.split(" ")[0]}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <StatCard label="Gross Sales (30d)" value={`${gross.toLocaleString()} ETB`} Icon={TrendingUp} />
          <StatCard label="APEX Commission" value={`− ${commission.toLocaleString()} ETB`} Icon={Percent} negative />
          <StatCard label="Your Net Earnings" value={`${net.toLocaleString()} ETB`} Icon={Wallet} highlight />
          <StatCard label="Active Listings" value={myProducts.length} Icon={Package} />
        </div>
        <div style={{ fontFamily: displayFont, fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 10 }}>Your listings</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {myProducts.map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, ...cardStyle(T) }}>
              <div style={{ fontSize: 22 }}>{p.img}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{p.name}</div><div style={{ fontSize: 11.5, color: T.textFaint }}>{p.price.toLocaleString()} ETB / {p.unit} · Stock: {p.stock}</div></div>
              <Edit3 size={15} color={T.textFaint} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function StatCard({ label, value, Icon, negative, highlight }) {
  const T = useTheme();
  return (
    <div style={{ padding: 14, borderRadius: 14, background: highlight ? `${T.success}18` : T.panel, border: `1px solid ${highlight ? `${T.success}55` : T.border}` }}>
      <Icon size={16} color={negative ? T.danger : highlight ? T.success : ACCENT} />
      <div style={{ fontSize: 16, fontWeight: 800, color: negative ? T.danger : T.text, marginTop: 8 }}>{value}</div>
      <div style={{ fontSize: 10.5, color: T.textFaint, marginTop: 2 }}>{label}</div>
    </div>
  );
}
function SupplierProductsScreen() {
  const T = useTheme();
  const myProducts = PRODUCTS.filter(p => p.supplierId === "s1" || p.supplierId === "s4");
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="My Products" right={<button style={{ ...iconBtnStyle(T), background: ACCENT }}><Plus size={18} color={ACCENT_ON} /></button>} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {myProducts.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 13, ...cardStyle(T) }}>
            <div style={{ fontSize: 24 }}>{p.img}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 700, color: T.text }}>{p.name}</div><div style={{ fontSize: 11.5, color: T.textFaint }}>{p.price.toLocaleString()} ETB / {p.unit} · Stock: {p.stock}</div></div>
            <Edit3 size={16} color={T.textFaint} style={{ marginRight: 4 }} /><Trash2 size={16} color={T.danger} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ADMIN SCREENS
   ============================================================ */
function AdminHomeScreen() {
  const T = useTheme();
  const users = store.get("apex_users", []);
  const totalGross = 1245000, commission = Math.round(totalGross * COMMISSION_RATE);
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Platform Overview" />
      <div style={{ padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <StatCard label="Total Users" value={users.length} Icon={Users} />
          <StatCard label="Suppliers" value={SUPPLIERS.length} Icon={Building2} />
          <StatCard label="GMV (30d)" value={`${totalGross.toLocaleString()} ETB`} Icon={TrendingUp} />
          <StatCard label="APEX Revenue" value={`${commission.toLocaleString()} ETB`} Icon={DollarSign} highlight />
        </div>
        <div style={{ fontFamily: displayFont, fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 10 }}>Categories</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CATEGORIES.map(c => {
            const count = PRODUCTS.filter(p => p.cat === c.id).length;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 14, background: catBg(c, T.mode) }}>
                <c.Icon size={18} color={c.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.text, flex: 1 }}>{c.name}</span><span style={{ fontSize: 12, color: T.textDim }}>{count} items</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function AdminUsersScreen() {
  const T = useTheme();
  const users = store.get("apex_users", []);
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Users" />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {users.length === 0 && <EmptyState Icon={Users} text="No signups yet on this device." />}
        {users.map(u => (
          <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, ...cardStyle(T) }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: ACCENT_ON, fontSize: 13 }}>{u.name?.[0]?.toUpperCase()}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{u.name}</div><div style={{ fontSize: 11.5, color: T.textFaint }}>{u.email}</div></div>
            <Badge>{u.role}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
function AdminSuppliersScreen() {
  const T = useTheme();
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Suppliers" />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {SUPPLIERS.map(s => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, ...cardStyle(T) }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.panel2, display: "flex", alignItems: "center", justifyContent: "center" }}>🏢</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, display: "flex", alignItems: "center", gap: 5 }}>{s.name} {s.verified ? <Shield size={11} color={T.success} /> : <Badge bg={`${T.danger}22`} color={T.danger}>Unverified</Badge>}</div>
              <div style={{ fontSize: 11.5, color: T.textFaint }}>{s.city} · {s.rating}★ ({s.reviews})</div>
            </div>
            {!s.verified && <PrimaryButton style={{ padding: "8px 12px", fontSize: 12 }}>Verify</PrimaryButton>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
function AppInner() {
  const T = useTheme();
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [screen, setScreenRaw] = useState("home");
  const [screenHistory, setScreenHistory] = useState(["home"]);
  const [activeCategory, setActiveCategory] = useState("construction");
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [favorites, setFavorites] = useState(() => store.get("apex_favorites", []));
  const [cart, setCartRaw] = useState(() => store.get("apex_cart", []));
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const sessionId = store.get("apex_session", null);
    if (sessionId) { const found = store.get("apex_users", []).find(u => u.id === sessionId); if (found) setUser(found); }
  }, []);

  const setCart = (updater) => setCartRaw(prev => { const next = typeof updater === "function" ? updater(prev) : updater; store.set("apex_cart", next); return next; });
  const setScreen = (s) => {
    if (s === -1) { setScreenHistory(h => { const next = h.slice(0, -1); setScreenRaw(next[next.length - 1] || "home"); return next.length ? next : ["home"]; }); return; }
    setScreenRaw(s); setScreenHistory(h => [...h, s]);
  };
  const toggleFavorite = (id) => setFavorites(f => { const next = f.includes(id) ? f.filter(x => x !== id) : [...f, id]; store.set("apex_favorites", next); return next; });
  const addToCart = (productId, qty) => setCart(c => { const existing = c.find(x => x.productId === productId); return existing ? c.map(x => x.productId === productId ? { ...x, qty: x.qty + qty } : x) : [...c, { productId, qty }]; });

  const startChat = (product, supplier) => {
    const chats = store.get("apex_chats", []);
    let chat = chats.find(c => c.productId === product.id && c.buyerId === user.id);
    if (!chat) {
      chat = { id: "c" + Date.now(), productId: product.id, productName: product.name, productImg: product.img, productPrice: product.price,
        supplierId: product.supplierId, supplierName: supplier.name, buyerId: user.id, participants: [user.id],
        messages: [{ from: "system", text: `Hi! I'm interested in "${product.name}". Is it available?`, ts: Date.now() }] };
      chats.push(chat); store.set("apex_chats", chats);
    }
    setActiveChat(chat.id);
  };

  const placeOrder = ({ items, address, deliveryMethod, payment, total }) => {
    const orders = store.get("apex_orders", []);
    const order = { id: String(1000 + orders.length + 1), userId: user.id, items, address, deliveryMethod, payment, total, status: "Processing", createdAt: Date.now() };
    orders.push(order); store.set("apex_orders", orders);
    if (!buyNowItem) setCart([]);
    setBuyNowItem(null); setLastOrder(order); setScreen("orderConfirmation");
  };

  const handleAuth = (u) => { setUser(u); setScreenRaw(u.role === "supplier" ? "supplierHome" : u.role === "admin" ? "adminHome" : "home"); setScreenHistory(["home"]); };
  const handleLogout = () => { store.set("apex_session", null); setUser(null); };

  if (!user) return <AuthScreen mode={authMode} setMode={setAuthMode} onAuth={handleAuth} />;

  const screenProps = {
    user, screen, setScreen, activeCategory, setActiveCategory, activeProduct, setActiveProduct,
    activeChat, setActiveChat, favorites, toggleFavorite, startChat, onLogout: handleLogout,
    cart, setCart, addToCart, buyNowItem, setBuyNowItem, placeOrder, lastOrder,
  };

  const screens = {
    home: HomeScreen, categories: CategoriesScreen, categoryProducts: CategoryProductsScreen, search: SearchScreen,
    productDetail: ProductDetailScreen, cart: CartScreen, checkout: CheckoutScreen, orderConfirmation: OrderConfirmationScreen,
    orders: OrdersScreen, chatList: ChatListScreen, chat: ChatScreen, profile: ProfileScreen, settings: SettingsScreen,
    notifications: NotificationsScreen, howItWorks: HowItWorksScreen, supplierHome: SupplierHomeScreen,
    supplierProducts: SupplierProductsScreen, adminHome: AdminHomeScreen, adminUsers: AdminUsersScreen, adminSuppliers: AdminSuppliersScreen,
  };
  const Screen = screens[screen] || HomeScreen;
  const hideNav = screen === "chat";
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: fontStack, maxWidth: 480, margin: "0 auto", position: "relative", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}><Screen {...screenProps} /></div>
      {!hideNav && <BottomNav screen={screen} setScreen={setScreen} role={user.role} cartCount={cartCount} />}
    </div>
  );
}

export default function App() {
  return (<ThemeProvider><AppInner /></ThemeProvider>);
}
