import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "🔴 ЖИВОЙ СЕРВЕР • КРИМИНАЛЬНЫЙ МИР",
  "🏛️ ГРУППА: RUSFIRST",
  "⚡ УНИКАЛЬНЫЕ РП-МЕХАНИКИ",
  "🎯 ФСБ • МВД • ОПГ • ПРАВИТЕЛЬСТВО • ФСО",
  "🔫 СЕЗОН 12 — УЖЕ В ЭФИРЕ",
  "💎 ОТКРЫТ НАБОР В ФРАКЦИИ",
];

const FACTION_ITEMS = [
  {
    code: "1.5.1",
    name: "ФСБ",
    sub: null,
    color: "#8b5cf6",
    icon: "Eye",
    age: "от 11 лет",
    limit: 'только до звания "Лейтенант"',
    limited: true,
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
  },
];

const DEVS = [
  {
    nick: "Trifiilia",
    role: "Главный разработчик",
    color: "var(--neon-purple)",
    badge: "👑",
    desc: "Архитектура проекта, серверная логика, РП-механики",
  },
  {
    nick: "Ilya20120132",
    role: "Главный разработчик",
    color: "var(--neon-cyan)",
    badge: "💎",
    desc: "Игровой баланс, контент, системы фракций",
  },
  {
    nick: "Helivek34",
    role: "Младший разработчик",
    color: "var(--neon-gold)",
    badge: "⭐",
    desc: "Поддержка сервера, тикеты, работа с игроками",
  },
];

/* ─── COMPONENT ─────────────────────────────────────────────────────────────── */
export default function Index() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-rubik" style={{ background: "var(--dark-bg)", color: "white" }}>

      {/* ── TICKER ── */}
      <div className="overflow-hidden py-2 border-b"
        style={{ borderColor: "rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.07)" }}>
        <div className="flex animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-oswald tracking-widest" style={{ color: "var(--neon-cyan)" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl"
        style={{ borderColor: "rgba(168,85,247,0.2)", background: "rgba(8,12,20,0.9)" }}>
        <div className="flex items-center gap-3">
          {/* Avatar — Собор Василия Блаженного */}
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 shrink-0"
            style={{ borderColor: "rgba(168,85,247,0.5)" }}>
            <img
              src="https://cdn.poehali.dev/projects/fdbcb214-b12b-4a90-8d07-0043200875ef/files/5226f5cf-0d81-4989-bd2c-987e2d4afacd.jpg"
              alt="КМРП"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-oswald font-bold text-lg tracking-widest text-white leading-none">КМРП</div>
            <div className="text-xs font-oswald tracking-widest" style={{ color: "var(--neon-purple)", fontSize: 10 }}>
              КРИМИНАЛЬНЫЙ МИР
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-5">
          {[["hero","Главная"],["factions-section","Фракции"],["laws-section","Законы"],["devs-section","Разработчики"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-link">{label}</button>
          ))}
          <button onClick={() => navigate("/forum")} className="nav-link">Форум</button>
        </div>
        <button className="btn-grad text-sm">Войти</button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "var(--neon-purple)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ background: "var(--neon-cyan)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
            style={{ background: "var(--neon-gold)" }} />
        </div>

        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${3 + (i % 4)}px`,
            height: `${3 + (i % 4)}px`,
            left: `${8 + i * 7.5}%`,
            top: `${15 + (i * 13) % 70}%`,
            background: i % 3 === 0 ? "var(--neon-purple)" : i % 3 === 1 ? "var(--neon-cyan)" : "var(--neon-gold)",
            animationDuration: `${3 + (i % 4)}s`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}

        <div className="relative z-10 animate-slide-up">
          {/* Big avatar */}
          <div className="w-28 h-28 rounded-2xl overflow-hidden mx-auto mb-6 border-2 glow-purple"
            style={{ borderColor: "rgba(168,85,247,0.6)" }}>
            <img
              src="https://cdn.poehali.dev/projects/fdbcb214-b12b-4a90-8d07-0043200875ef/files/5226f5cf-0d81-4989-bd2c-987e2d4afacd.jpg"
              alt="КМРП"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="section-tag mb-3">Группа: Rusfirst</div>
          <h1 className="font-oswald font-bold mb-4 leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}>
            <span className="grad-text">КРИМИНАЛЬНЫЙ</span>
            <br />
            <span className="text-white">МИР</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Добро пожаловать на КМРП — криминально-ролевой проект группы <span style={{ color: "var(--neon-cyan)" }}>Rusfirst</span>.
            Полноценный ролевой опыт: фракции, территории, государственные структуры.
            Играй по правилам — или создавай свои.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-grad text-base px-8 py-3">Начать игру</button>
            <button onClick={() => scrollTo("factions-section")}
              className="px-8 py-3 rounded-lg font-oswald font-medium tracking-wider text-base transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
              Фракции →
            </button>
            <button onClick={() => navigate("/laws")}
              className="px-8 py-3 rounded-lg font-oswald font-medium tracking-wider text-base transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(34,211,238,0.3)", color: "var(--neon-cyan)" }}>
              Законодательство →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
          {[
            { label: "Игроков онлайн",   value: "847",  color: "var(--neon-cyan)" },
            { label: "Фракций",           value: "7",    color: "var(--neon-purple)" },
            { label: "Дней на сервере",   value: "463",  color: "var(--neon-gold)" },
            { label: "Разработчиков",     value: "3",    color: "var(--neon-red)" },
          ].map(s => (
            <div key={s.label} className="card-dark p-4 text-center">
              <div className="text-3xl font-oswald font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ФРАКЦИИ ── */}
      <section id="factions-section" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-tag mb-3">Государственные и криминальные структуры</div>
            <h2 className="font-oswald font-bold text-5xl text-white">ФРАКЦИИ</h2>
            <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Требования к возрасту и ограничения по званиям для вступления
            </p>
          </div>

          <div className="space-y-3">
            {FACTION_ITEMS.map((f, i) => (
              <div key={i} className="card-dark p-5 flex items-center gap-5"
                style={{ borderColor: `${f.color}25` }}>
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}35` }}>
                  <Icon name={f.icon} size={22} style={{ color: f.color }} />
                </div>

                {/* Code + name */}
                <div className="w-28 shrink-0">
                  <div className="font-oswald font-bold text-xs mb-0.5" style={{ color: f.color }}>
                    {f.code}
                  </div>
                  <div className="font-oswald font-bold text-xl text-white leading-tight">{f.name}</div>
                  {f.sub && (
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{f.sub}</div>
                  )}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px self-stretch" style={{ background: `${f.color}25` }} />

                {/* Age */}
                <div className="flex-1 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                    <span className="font-oswald font-bold text-lg" style={{ color: f.color }}>{f.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name={f.limited ? "Lock" : "Unlock"} size={14}
                      style={{ color: f.limited ? "var(--neon-gold)" : "rgba(255,255,255,0.4)" }} />
                    <span className="text-sm" style={{ color: f.limited ? "var(--neon-gold)" : "rgba(255,255,255,0.6)" }}>
                      {f.limit}
                    </span>
                  </div>
                </div>

                {/* Badge */}
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
          </div>

          {/* Note */}
          <div className="mt-6 p-4 rounded-xl text-sm flex items-start gap-3"
            style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <Icon name="Info" size={16} className="shrink-0 mt-0.5" style={{ color: "var(--neon-gold)" }} />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              Все возрастные требования являются минимальными. Финальное решение о вступлении принимает командование фракции.
              Для подачи заявки перейдите в раздел{" "}
              <button onClick={() => navigate("/forum")} className="underline" style={{ color: "var(--neon-cyan)" }}>Форума</button>.
            </span>
          </div>
        </div>
      </section>

      {/* ── ЗАКОНЫ ── */}
      <section id="laws-section" className="py-24 px-6" style={{ background: "rgba(168,85,247,0.03)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="section-tag mb-3">Обязательно к ознакомлению</div>
          <h2 className="font-oswald font-bold text-5xl text-white mb-4">ЗАКОНОДАТЕЛЬСТВО</h2>
          <p className="max-w-xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
            Упрощённое-дополненное издание. Содержит 8 разделов: ПДД, полномочия сотрудников,
            уголовный кодекс, взятки, оскорбления и рецидив.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: "Car",             label: "ПДД",                  num: "Раздел 1", color: "#22d3ee" },
              { icon: "Shield",          label: "Полномочия сотрудников",num: "Раздел 2", color: "#3b82f6" },
              { icon: "Gavel",           label: "Уголовный кодекс",     num: "Раздел 4", color: "#f43f5e" },
              { icon: "Banknote",        label: "Коррупция и взятки",   num: "Раздел 6", color: "#fbbf24" },
            ].map(c => (
              <div key={c.num} className="card-dark p-5 text-center"
                style={{ borderColor: `${c.color}25` }}>
                <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${c.color}18`, border: `1px solid ${c.color}35` }}>
                  <Icon name={c.icon} size={20} style={{ color: c.color }} />
                </div>
                <div className="text-xs font-oswald tracking-wider mb-1" style={{ color: c.color }}>{c.num}</div>
                <div className="text-sm font-medium text-white">{c.label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/laws")} className="btn-grad px-10 py-3 text-base">
            Открыть законодательство →
          </button>
        </div>
      </section>

      {/* ── РАЗРАБОТЧИКИ ── */}
      <section id="devs-section" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-tag mb-3">Группа Rusfirst</div>
            <h2 className="font-oswald font-bold text-5xl text-white">РАЗРАБОТЧИКИ</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DEVS.map(d => (
              <div key={d.nick} className="card-dark p-7 text-center"
                style={{ borderColor: `${d.color}30` }}>
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl font-oswald font-bold"
                  style={{ background: `color-mix(in srgb, ${d.color} 15%, transparent)`, border: `2px solid color-mix(in srgb, ${d.color} 40%, transparent)` }}>
                  {d.badge}
                </div>
                <div className="font-oswald font-bold text-xl text-white mb-1">{d.nick}</div>
                <div className="text-sm font-medium mb-3 px-3 py-1 rounded-full inline-block"
                  style={{ background: `color-mix(in srgb, ${d.color} 12%, transparent)`, color: d.color, border: `1px solid color-mix(in srgb, ${d.color} 30%, transparent)` }}>
                  {d.role}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{d.desc}</p>
              </div>
            ))}
          </div>

          {/* Group tag */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
              style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
              <Icon name="Users" size={18} style={{ color: "var(--neon-purple)" }} />
              <span className="font-oswald font-bold text-lg tracking-widest" style={{ color: "var(--neon-purple)" }}>
                RUSFIRST
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>—</span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>официальная группа разработчиков КМРП</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center border-t"
        style={{ borderColor: "rgba(168,85,247,0.2)", background: "rgba(8,12,20,0.8)" }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/fdbcb214-b12b-4a90-8d07-0043200875ef/files/5226f5cf-0d81-4989-bd2c-987e2d4afacd.jpg"
              alt="КМРП"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-oswald font-bold text-lg tracking-widest">КМРП</span>
          <span className="text-xs font-oswald tracking-wider" style={{ color: "var(--neon-purple)" }}>× RUSFIRST</span>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2024 Криминальный Мир РП · Группа Rusfirst · Все права защищены
        </p>
        <div className="flex justify-center gap-6 mt-4">
          {["Discord", "Telegram", "VK"].map(s => (
            <a key={s} href="#" className="nav-link">{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
