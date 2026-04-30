import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const FACTIONS = [
  { id: 1, name: "Семья Коста", tag: "[COSTA]", color: "#f43f5e", members: 24, rank: 1, desc: "Итальянская мафия. Элегантность и жёсткость в одном флаконе.", icon: "Crown" },
  { id: 2, name: "Ночные Волки", tag: "[WOLVES]", color: "#a855f7", members: 31, rank: 2, desc: "Байкерский клуб с железными принципами и стальными нервами.", icon: "Bike" },
  { id: 3, name: "Триада Дракона", tag: "[TRIAD]", color: "#22d3ee", members: 19, rank: 3, desc: "Восточный синдикат. Честь — превыше всего.", icon: "Flame" },
  { id: 4, name: "Картель Норте", tag: "[NORTE]", color: "#fbbf24", members: 27, rank: 4, desc: "Южный картель. Быстрые деньги, быстрые решения.", icon: "Zap" },
  { id: 5, name: "Улица 7-я", tag: "[SEVEN]", color: "#22c55e", members: 42, rank: 5, desc: "Уличные банды с огромным влиянием в гетто.", icon: "Users" },
  { id: 6, name: "Корпорация ЧВК", tag: "[PMC]", color: "#64748b", members: 15, rank: 6, desc: "Частная военная компания. Нейтралитет — оружие.", icon: "Shield" },
];

const TICKETS = [
  { id: "#2847", title: "Вопрос по механике ограбления", status: "open",   category: "Геймплей", time: "5 мин назад",  priority: "high" },
  { id: "#2846", title: "Проблема с недвижимостью",      status: "review", category: "Баги",     time: "23 мин назад", priority: "medium" },
  { id: "#2845", title: "Предложение: новый район",      status: "open",   category: "Идеи",     time: "1 ч назад",    priority: "low" },
  { id: "#2844", title: "Неправомерный бан игрока",      status: "closed", category: "Апелляция",time: "2 ч назад",    priority: "high" },
  { id: "#2843", title: "Запрос на создание фракции",    status: "review", category: "Фракции",  time: "3 ч назад",    priority: "medium" },
];

const SCREENSHOTS = [
  { id: 1, title: "Ночной Лос-Сантос", author: "Тёмный_Волк", likes: 247, gradient: "from-purple-900 via-blue-900 to-black", icon: "Moon" },
  { id: 2, title: "Перестрелка в доках", author: "CostaBoss", likes: 189, gradient: "from-red-900 via-orange-900 to-black", icon: "Crosshair" },
  { id: 3, title: "Встреча картеля", author: "NorteJefe", likes: 312, gradient: "from-yellow-900 via-amber-900 to-black", icon: "Users" },
  { id: 4, title: "Погоня по хайвею", author: "SpeedKing", likes: 156, gradient: "from-cyan-900 via-teal-900 to-black", icon: "Car" },
  { id: 5, title: "Рассвет в гетто",   author: "Seven_7",   likes: 203, gradient: "from-green-900 via-emerald-900 to-black", icon: "Sunrise" },
  { id: 6, title: "Клуб «Андеграунд»", author: "NightOwl",  likes: 278, gradient: "from-pink-900 via-purple-900 to-black", icon: "Music" },
];

const RATINGS = [
  { rank: 1, name: "Тёмный_Волк",   faction: "Ночные Волки",      xp: 98420, level: 87, badge: "👑" },
  { rank: 2, name: "CostaBoss",     faction: "Семья Коста",        xp: 91200, level: 82, badge: "💎" },
  { rank: 3, name: "DragonMaster",  faction: "Триада Дракона",     xp: 87650, level: 79, badge: "🔥" },
  { rank: 4, name: "NorteJefe",     faction: "Картель Норте",      xp: 82100, level: 75, badge: "⭐" },
  { rank: 5, name: "IronGhost",     faction: "ЧВК «Корпорация»",  xp: 79800, level: 72, badge: "🌟" },
  { rank: 6, name: "Seven_7",       faction: "Улица 7-я",          xp: 71200, level: 68, badge: "🌀" },
  { rank: 7, name: "ShadowKing",    faction: "Семья Коста",        xp: 68900, level: 65, badge: "⚡" },
];

const NEWS = [
  { id: 1, date: "28 апр", category: "Обновление", title: "Открылся новый район — Порт Эль-Сан", text: "Масштабное обновление добавляет полностью живой портовый район с контрабандой, доками и тайными складами.", hot: true },
  { id: 2, date: "25 апр", category: "Событие",    title: "Турнир фракций — Кубок Теней 2024",  text: "Грандиозный турнир между всеми фракциями. Победитель получает эксклюзивную территорию на 30 дней.", hot: true },
  { id: 3, date: "22 апр", category: "Правила",    title: "Обновлены правила ролевых взаимодействий", text: "Уточнены механики захвата территорий и условия объявления войны между фракциями.", hot: false },
  { id: 4, date: "18 апр", category: "Набор",      title: "Семья Коста открывает набор в ряды",  text: "Элитная итальянская семья ищет достойных игроков с опытом РП от 100 часов.", hot: false },
];

const STATS = [
  { label: "Игроков онлайн", value: "847",  icon: "Users",          color: "var(--neon-cyan)"   },
  { label: "Фракций",        value: "12",   icon: "Shield",         color: "var(--neon-purple)" },
  { label: "Открытых тикетов",value: "23",  icon: "MessageSquare",  color: "var(--neon-gold)"   },
  { label: "Дней на сервере", value: "463", icon: "Calendar",       color: "var(--neon-red)"    },
];

const TICKER_ITEMS = [
  "🔴 ЖИВОЙ СЕРВЕР • ОНЛАЙН 847",
  "👑 ТОП ФРАКЦИЯ: СЕМЬЯ КОСТА",
  "⚡ НОВЫЙ РАЙОН — ПОРТ ЭЛЬ-САН",
  "🎯 ТУРНИР ФРАКЦИЙ — СТАРТ 1 МАЯ",
  "🔫 СЕЗОН 12 — УЖЕ В ЭФИРЕ",
  "💎 УНИКАЛЬНЫЕ РП-МЕХАНИКИ",
];

/* ─── COMPONENT ─────────────────────────────────────────────────────────────── */
export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [activeTicketFilter, setActiveTicketFilter] = useState("all");
  const [activeFaction, setActiveFaction] = useState<number | null>(null);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredTickets = activeTicketFilter === "all"
    ? TICKETS
    : TICKETS.filter(t => t.status === activeTicketFilter);

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
        style={{ borderColor: "rgba(168,85,247,0.2)", background: "rgba(8,12,20,0.85)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-oswald font-bold text-lg"
            style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))" }}>К</div>
          <span className="font-oswald font-bold text-xl tracking-widest text-white">КМРП</span>
          <span className="hidden sm:block text-xs px-2 py-1 rounded font-oswald tracking-widest"
            style={{ background: "rgba(168,85,247,0.15)", color: "var(--neon-purple)", border: "1px solid rgba(168,85,247,0.3)" }}>
            КРИМИНАЛЬНЫЙ МИР
          </span>
        </div>
        <div className="hidden md:flex items-center gap-5">
          {[["hero","Главная"],["factions","Фракции"],["tickets","Тикеты"],["gallery","Галерея"],["rating","Рейтинг"],["news","Новости"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`nav-link ${activeSection === id ? "active" : ""}`}>{label}</button>
          ))}
          <button onClick={() => navigate("/forum")} className="nav-link">Форум</button>
          <button onClick={() => navigate("/laws")} className="nav-link">Законы</button>
        </div>
        <button className="btn-grad text-sm">Войти</button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden grid-bg">
        {/* bg orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "var(--neon-purple)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ background: "var(--neon-cyan)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
            style={{ background: "var(--neon-gold)" }} />
        </div>

        {/* floating particles */}
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
          <div className="section-tag mb-4">Криминально-ролевой проект</div>
          <h1 className="font-oswald font-bold mb-6 leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
            <span className="grad-text">КРИМИНАЛЬНЫЙ</span>
            <br />
            <span className="text-white">МИР</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Полноценный ролевой опыт. Фракции, территории,
            криминальные схемы — всё как в жизни, только лучше.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-grad text-base px-8 py-3">Начать игру</button>
            <button onClick={() => scrollTo("factions")}
              className="px-8 py-3 rounded-lg font-oswald font-medium tracking-wider text-base transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
              Фракции →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
          {STATS.map(s => (
            <div key={s.label} className="card-dark p-4 text-center">
              <div className="text-3xl font-oswald font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FACTIONS ── */}
      <section id="factions" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-tag mb-3">Организованная преступность</div>
            <h2 className="font-oswald font-bold text-5xl text-white">ФРАКЦИИ</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACTIONS.map(f => (
              <div key={f.id}
                className="card-dark p-6 cursor-pointer"
                style={activeFaction === f.id
                  ? { borderColor: f.color, boxShadow: `0 0 30px ${f.color}40` }
                  : {}}
                onClick={() => setActiveFaction(activeFaction === f.id ? null : f.id)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                    <Icon name={f.icon} size={22} style={{ color: f.color }} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-oswald tracking-widest mb-1" style={{ color: f.color }}>{f.tag}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>#{f.rank} место</div>
                  </div>
                </div>
                <h3 className="font-oswald font-bold text-xl text-white mb-2">{f.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>{f.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <Icon name="Users" size={14} />
                    <span>{f.members} членов</span>
                  </div>
                  <button className="text-xs font-oswald tracking-wider px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}40` }}>
                    Подать заявку
                  </button>
                </div>
                {activeFaction === f.id && (
                  <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${f.color}30` }}>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center flex-1">
                        <div className="font-oswald font-bold text-lg" style={{ color: f.color }}>74%</div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Активность</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className="font-oswald font-bold text-lg" style={{ color: f.color }}>{f.rank * 2 - 1}</div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Территорий</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className="font-oswald font-bold text-lg" style={{ color: f.color }}>4.{f.rank}</div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Рейтинг</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKETS ── */}
      <section id="tickets" className="py-24 px-6" style={{ background: "rgba(168,85,247,0.03)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="section-tag mb-3">Поддержка игроков</div>
              <h2 className="font-oswald font-bold text-5xl text-white">ТИКЕТЫ</h2>
            </div>
            <button className="btn-grad self-start md:self-auto">+ Новый тикет</button>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {[["all","Все"],["open","Открытые"],["review","На рассмотрении"],["closed","Закрытые"]].map(([v, l]) => (
              <button key={v} onClick={() => setActiveTicketFilter(v)}
                className="px-4 py-2 rounded-lg text-sm font-oswald tracking-wider transition-all"
                style={activeTicketFilter === v
                  ? { background: "var(--neon-purple)", color: "white" }
                  : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {l}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTickets.map(t => (
              <div key={t.id} className="card-dark p-5 flex items-center gap-4 cursor-pointer">
                <div className="font-oswald text-sm font-bold w-16 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {t.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white mb-1 truncate">{t.title}</div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
                      {t.category}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.time}</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <span className={`badge-${t.status} text-xs px-3 py-1 rounded-full font-oswald tracking-wider`}>
                    {t.status === "open" ? "Открыт" : t.status === "review" ? "Рассмотрение" : "Закрыт"}
                  </span>
                  <div className="w-2 h-2 rounded-full" style={{
                    background: t.priority === "high" ? "var(--neon-red)" : t.priority === "medium" ? "var(--neon-gold)" : "var(--neon-cyan)"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-tag mb-3">Лучшие моменты сервера</div>
            <h2 className="font-oswald font-bold text-5xl text-white">ГАЛЕРЕЯ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SCREENSHOTS.map((s, i) => (
              <div key={s.id}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                style={{ minHeight: i === 0 ? 320 : 180 }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} transition-all duration-500`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-all">
                  <Icon name={s.icon} size={i === 0 ? 80 : 48} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="font-oswald font-bold text-white text-lg leading-tight">{s.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>@{s.author}</span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--neon-gold)" }}>
                      <Icon name="Heart" size={12} /> {s.likes}
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon name="Maximize2" size={14} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="btn-grad px-8">Смотреть все скриншоты</button>
          </div>
        </div>
      </section>

      {/* ── RATING ── */}
      <section id="rating" className="py-24 px-6" style={{ background: "rgba(34,211,238,0.03)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-tag mb-3">Топ игроков</div>
            <h2 className="font-oswald font-bold text-5xl text-white">РЕЙТИНГ</h2>
          </div>

          {/* Podium top-3 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 0, 2].map((idx, col) => {
              const p = RATINGS[idx];
              const colors = ["var(--neon-gold)", "var(--neon-purple)", "var(--neon-cyan)"];
              const heights = ["h-28", "h-36", "h-24"];
              return (
                <div key={p.rank}
                  className={`card-dark p-5 text-center flex flex-col items-center justify-end ${heights[col]}`}
                  style={{ borderColor: `${colors[col]}40` }}>
                  <div className="text-2xl mb-1">{p.badge}</div>
                  <div className="font-oswald font-bold text-white text-sm">{p.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: colors[col] }}>#{p.rank}</div>
                </div>
              );
            })}
          </div>

          <div className="card-dark overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.05)" }}>
                  {["#", "Игрок", "Фракция", "Уровень", "Опыт"].map((h, i) => (
                    <th key={h} className={`p-4 text-left text-xs font-oswald tracking-widest ${i === 2 ? "hidden md:table-cell" : ""}`}
                      style={{ color: "rgba(255,255,255,0.4)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RATINGS.map((p, i) => (
                  <tr key={p.rank} className="transition-colors hover:bg-white/5"
                    style={{ borderBottom: i < RATINGS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <td className="p-4">
                      <span className="text-lg mr-2">{p.badge}</span>
                      <span className="font-oswald font-bold text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{p.rank}</span>
                    </td>
                    <td className="p-4 font-medium text-white">{p.name}</td>
                    <td className="p-4 hidden md:table-cell text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{p.faction}</td>
                    <td className="p-4 font-oswald font-bold text-sm" style={{ color: "var(--neon-cyan)" }}>LVL {p.level}</td>
                    <td className="p-4">
                      <div className="font-oswald font-bold text-sm mb-1.5" style={{ color: "var(--neon-purple)" }}>
                        {p.xp.toLocaleString()}
                      </div>
                      <div className="progress-bar w-24">
                        <div className="progress-fill" style={{ width: `${(p.xp / 100000) * 100}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="section-tag mb-3">Жизнь проекта</div>
              <h2 className="font-oswald font-bold text-5xl text-white">НОВОСТИ</h2>
            </div>
            <button className="btn-grad self-start md:self-auto">Все новости</button>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {NEWS.map(n => (
              <div key={n.id} className="card-dark p-6 cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 rounded-full font-oswald tracking-wider"
                      style={{ background: "rgba(168,85,247,0.15)", color: "var(--neon-purple)", border: "1px solid rgba(168,85,247,0.3)" }}>
                      {n.category}
                    </span>
                    {n.hot && (
                      <span className="text-xs px-2 py-1 rounded-full font-oswald tracking-wider animate-pulse-glow"
                        style={{ background: "rgba(244,63,94,0.15)", color: "var(--neon-red)", border: "1px solid rgba(244,63,94,0.3)" }}>
                        🔥 HOT
                      </span>
                    )}
                  </div>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{n.date}</span>
                </div>
                <h3 className="font-oswald font-bold text-xl text-white mb-3 leading-tight">{n.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{n.text}</p>
                <div className="flex items-center gap-2 mt-5 text-sm font-oswald tracking-wider transition-colors"
                  style={{ color: "var(--neon-cyan)" }}>
                  <span>Читать далее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-10 p-8 rounded-2xl text-center"
            style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,211,238,0.1))", border: "1px solid rgba(168,85,247,0.3)" }}>
            <div className="text-3xl mb-2">📩</div>
            <h3 className="font-oswald font-bold text-2xl text-white mb-2">Подпишись на рассылку</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
              Первым узнавай об обновлениях, ивентах и важных событиях сервера
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Твой Discord или Email"
                className="flex-1 px-4 py-3 rounded-lg text-white text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }} />
              <button className="btn-grad px-6 py-3 whitespace-nowrap">Подписаться</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center border-t"
        style={{ borderColor: "rgba(168,85,247,0.2)", background: "rgba(8,12,20,0.8)" }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-oswald font-bold"
            style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))" }}>К</div>
          <span className="font-oswald font-bold text-lg tracking-widest">КМРП</span>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2024 Криминальный Мир РП · Все права защищены
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