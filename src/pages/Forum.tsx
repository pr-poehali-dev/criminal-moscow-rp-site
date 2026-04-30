import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const FACTIONS = [
  {
    code: "1.5.1",
    name: "ФСБ",
    sub: null,
    color: "#8b5cf6",
    icon: "Eye",
    age: "от 11 лет",
    limit: 'только до звания "Лейтенант"',
    limited: true,
    desc: "Федеральная служба безопасности. Засекреченные операции.",
  },
  {
    code: "1.5.1(2)",
    name: "ФСБ",
    sub: "Расширенный состав",
    color: "#a78bfa",
    icon: "Eye",
    age: "от 12+ лет",
    limit: "звания не ограничены",
    limited: false,
    desc: "Федеральная служба безопасности. Старший оперативный состав.",
  },
  {
    code: "1.5.2",
    name: "ОПГ",
    sub: null,
    color: "#f43f5e",
    icon: "Swords",
    age: "от 11 лет",
    limit: "без ограничений",
    limited: false,
    desc: "Организованная преступная группировка. Криминальный мир столицы.",
  },
  {
    code: "1.5.2",
    name: "Правительство",
    sub: null,
    color: "#22d3ee",
    icon: "Building2",
    age: "от 13 лет",
    limit: "без ограничений",
    limited: false,
    desc: "Исполнительная власть города. Законодательство и управление.",
  },
  {
    code: "1.5.2(2)",
    name: "ФСО",
    sub: null,
    color: "#f59e0b",
    icon: "ShieldCheck",
    age: "от 11 лет",
    limit: 'только до звания "Лейтенант"',
    limited: true,
    desc: "Федеральная служба охраны. Защита государственных объектов.",
  },
  {
    code: "1.5.2(3)",
    name: "ФСО",
    sub: "Расширенный состав",
    color: "#fbbf24",
    icon: "ShieldCheck",
    age: "от 12+ лет",
    limit: "звания не ограничены",
    limited: false,
    desc: "Федеральная служба охраны. Старший командный состав.",
  },
  {
    code: "1.5.3",
    name: "МВД",
    sub: null,
    color: "#3b82f6",
    icon: "Shield",
    age: "от 11 лет",
    limit: "звания не ограничены",
    limited: false,
    desc: "Министерство внутренних дел. Порядок и закон на улицах.",
  },
];

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl"
      style={{ borderColor: "rgba(168,85,247,0.2)", background: "rgba(8,12,20,0.9)" }}>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-xl overflow-hidden border shrink-0"
            style={{ borderColor: "rgba(168,85,247,0.4)" }}>
            <img
              src="https://cdn.poehali.dev/projects/fdbcb214-b12b-4a90-8d07-0043200875ef/files/5226f5cf-0d81-4989-bd2c-987e2d4afacd.jpg"
              alt="КМРП"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-oswald font-bold text-lg tracking-widest text-white hidden sm:block">КМРП</span>
        </button>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
        <span className="font-oswald tracking-wider text-sm" style={{ color: "var(--neon-cyan)" }}>Фракции</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/laws")} className="nav-link text-sm">Законы</button>
        <button onClick={() => navigate("/")} className="nav-link text-sm">Главная</button>
        <button className="btn-grad text-sm px-4 py-2">Войти</button>
      </div>
    </nav>
  );
}

export default function Forum() {
  return (
    <div className="min-h-screen font-rubik" style={{ background: "var(--dark-bg)", color: "white" }}>
      <NavBar />

      {/* Hero */}
      <div className="relative py-16 px-6 overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: "var(--neon-purple)" }} />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10"
            style={{ background: "var(--neon-cyan)" }} />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="section-tag mb-3">Государственные и криминальные структуры</div>
          <h1 className="font-oswald font-bold text-6xl text-white mb-3">ФРАКЦИИ</h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Список всех фракций проекта КМРП с требованиями по возрасту и ограничениями по званиям
          </p>
        </div>
      </div>

      {/* Factions list */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-3">
        {FACTIONS.map((f, i) => (
          <div key={i} className="card-dark p-5 flex items-center gap-5"
            style={{ borderColor: `${f.color}25`, cursor: "default" }}>
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${f.color}18`, border: `1px solid ${f.color}35` }}>
              <Icon name={f.icon} size={22} style={{ color: f.color }} />
            </div>

            {/* Code + Name */}
            <div className="w-36 shrink-0">
              <div className="font-oswald font-bold text-xs mb-0.5" style={{ color: f.color }}>{f.code}</div>
              <div className="font-oswald font-bold text-xl text-white leading-tight">{f.name}</div>
              {f.sub && (
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{f.sub}</div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px self-stretch" style={{ background: `${f.color}20` }} />

            {/* Info */}
            <div className="flex-1 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                <span className="font-oswald font-bold text-base" style={{ color: f.color }}>{f.age}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name={f.limited ? "Lock" : "Unlock"} size={14}
                  style={{ color: f.limited ? "var(--neon-gold)" : "rgba(255,255,255,0.4)" }} />
                <span className="text-sm" style={{ color: f.limited ? "var(--neon-gold)" : "rgba(255,255,255,0.6)" }}>
                  {f.limit}
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div className="shrink-0">
              <span className="text-xs px-3 py-1.5 rounded-full font-oswald tracking-wider"
                style={f.limited
                  ? { background: "rgba(251,191,36,0.12)", color: "var(--neon-gold)", border: "1px solid rgba(251,191,36,0.3)" }
                  : { background: `${f.color}12`, color: f.color, border: `1px solid ${f.color}30` }}>
                {f.limited ? "Ограничено" : "Открыто"}
              </span>
            </div>
          </div>
        ))}

        {/* Note */}
        <div className="mt-6 p-4 rounded-xl text-sm flex items-start gap-3"
          style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <Icon name="Info" size={16} className="shrink-0 mt-0.5" style={{ color: "var(--neon-gold)" }} />
          <span style={{ color: "rgba(255,255,255,0.6)" }}>
            Все возрастные требования являются минимальными. Финальное решение о вступлении принимает командование фракции.
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t mt-6"
        style={{ borderColor: "rgba(168,85,247,0.2)" }}>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2024 КМРП — Криминальный Мир РП · Группа Rusfirst
        </p>
      </footer>
    </div>
  );
}
