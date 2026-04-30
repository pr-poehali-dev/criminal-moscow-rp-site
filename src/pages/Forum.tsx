import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

/* ─── TYPES ─────────────────────────────────────────────────────────────────── */
interface Post {
  id: number;
  title: string;
  author: string;
  time: string;
  replies: number;
  views: number;
  pinned?: boolean;
  hot?: boolean;
  tag?: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  desc: string;
  posts: Post[];
}

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const FACTIONS: Category[] = [
  {
    id: "opg",
    name: "ОПГ Московское",
    color: "#f43f5e",
    icon: "Swords",
    desc: "Организованная преступная группировка столицы. Только для участников.",
    posts: [
      { id: 1, title: "📌 Устав ОПГ Московское — обязательно к прочтению", author: "Смотрящий_Иван", time: "2 дня назад", replies: 47, views: 1240, pinned: true },
      { id: 2, title: "Набор новых участников — требования и анкета", author: "Борис_К", time: "5 ч назад", replies: 23, views: 580, hot: true, tag: "Набор" },
      { id: 3, title: "Операция «Ночной рынок» — итоги", author: "Смотрящий_Иван", time: "1 день назад", replies: 12, views: 340, tag: "Операции" },
      { id: 4, title: "Раздел территорий после встречи с Картелем", author: "Дмитрий_Г", time: "3 дня назад", replies: 34, views: 890 },
    ],
  },
  {
    id: "mvd",
    name: "МВД",
    color: "#3b82f6",
    icon: "Shield",
    desc: "Министерство внутренних дел. Порядок и закон.",
    posts: [
      { id: 10, title: "📌 Должностные инструкции сотрудников МВД 2024", author: "Полковник_Орлов", time: "1 нед назад", replies: 89, views: 3200, pinned: true },
      { id: 11, title: "Разбор дела №2847 — незаконное задержание", author: "Следователь_Нина", time: "3 ч назад", replies: 18, views: 420, hot: true, tag: "Дела" },
      { id: 12, title: "Рапорт: массовая перестрелка в порту 28.04", author: "Сержант_Кузьмин", time: "1 день назад", replies: 55, views: 1100, tag: "Рапорты" },
      { id: 13, title: "Плановые учения — расписание на май", author: "Полковник_Орлов", time: "4 дня назад", replies: 8, views: 210 },
    ],
  },
  {
    id: "fsb",
    name: "ФСБ",
    color: "#8b5cf6",
    icon: "Eye",
    desc: "Федеральная служба безопасности. Засекреченные операции.",
    posts: [
      { id: 20, title: "📌 Протокол работы оперативников — СЕКРЕТНО", author: "Агент_Тень", time: "2 нед назад", replies: 12, views: 890, pinned: true },
      { id: 21, title: "Наружное наблюдение за ОПГ — сводка", author: "Агент_Тень", time: "6 ч назад", replies: 5, views: 180, hot: true, tag: "Оперативная работа" },
      { id: 22, title: "Внедрение в Картель — статус операции", author: "Офицер_Р", time: "2 дня назад", replies: 3, views: 120, tag: "Операции" },
      { id: 23, title: "Запрос на санкцию прослушки — дело №441", author: "Агент_Тень", time: "5 дней назад", replies: 7, views: 300 },
    ],
  },
  {
    id: "prokuratura",
    name: "Прокуратура",
    color: "#f59e0b",
    icon: "Scale",
    desc: "Надзор за соблюдением законов. Государственное обвинение.",
    posts: [
      { id: 30, title: "📌 Регламент подачи исков и заявлений", author: "Прокурор_Соколов", time: "3 нед назад", replies: 34, views: 1560, pinned: true },
      { id: 31, title: "Дело о взятке — сотрудник МВД под следствием", author: "Прокурор_Соколов", time: "8 ч назад", replies: 29, views: 740, hot: true, tag: "Расследование" },
      { id: 32, title: "Апелляция по делу №2844 — неправомерный бан", author: "Адвокат_Пётр", time: "2 дня назад", replies: 14, views: 390, tag: "Апелляции" },
      { id: 33, title: "Ходатайство о смягчении приговора — Иванов А.", author: "Адвокат_Пётр", time: "1 нед назад", replies: 6, views: 180 },
    ],
  },
  {
    id: "government",
    name: "Правительство",
    color: "#22d3ee",
    icon: "Building2",
    desc: "Исполнительная власть. Законодательство и управление городом.",
    posts: [
      { id: 40, title: "📌 Конституция города — основной закон", author: "Мэр_Власов", time: "1 мес назад", replies: 128, views: 5400, pinned: true },
      { id: 41, title: "Законопроект: налог на игорный бизнес", author: "Депутат_Зимин", time: "4 ч назад", replies: 42, views: 980, hot: true, tag: "Законопроект" },
      { id: 42, title: "Выделение земли под новый жилой район", author: "Мэр_Власов", time: "1 день назад", replies: 19, views: 560, tag: "Решения" },
      { id: 43, title: "Бюджет города на 2й квартал — обсуждение", author: "Министр_Финансов", time: "3 дня назад", replies: 37, views: 1200 },
    ],
  },
];

const GENERAL_SECTIONS = [
  {
    id: "announcements",
    name: "Объявления",
    color: "var(--neon-gold)",
    icon: "Bell",
    desc: "Официальные объявления администрации",
    count: 12,
    lastPost: "Обновление сервера 2.4.1 — патч-ноты",
    lastAuthor: "Admin",
    lastTime: "1 ч назад",
  },
  {
    id: "introductions",
    name: "Знакомства",
    color: "var(--neon-cyan)",
    icon: "UserPlus",
    desc: "Представьтесь сообществу",
    count: 341,
    lastPost: "Привет! Меня зовут Максим, только начинаю РП",
    lastAuthor: "MaxRP",
    lastTime: "15 мин назад",
  },
  {
    id: "laws",
    name: "Уголовный кодекс",
    color: "var(--neon-purple)",
    icon: "BookOpen",
    desc: "Законодательство сервера — обязательно к ознакомлению",
    count: 8,
    lastPost: "УК — Упрощённое-дополненное издание 2024",
    lastAuthor: "Прокурор_Соколов",
    lastTime: "3 дня назад",
    special: "/laws",
  },
  {
    id: "reports",
    name: "Жалобы на игроков",
    color: "var(--neon-red)",
    icon: "AlertTriangle",
    desc: "Подайте жалобу на нарушителя",
    count: 87,
    lastPost: "Жалоба на игрока CostaBoss — пкт 4.1.3",
    lastAuthor: "Пострадавший_23",
    lastTime: "40 мин назад",
  },
];

/* ─── SHARED NAV ─────────────────────────────────────────────────────────────── */
function NavBar({ currentPath }: { currentPath: string }) {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl"
      style={{ borderColor: "rgba(168,85,247,0.2)", background: "rgba(8,12,20,0.9)" }}>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-oswald font-bold text-white"
            style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))" }}>К</div>
          <span className="font-oswald font-bold text-lg tracking-widest text-white hidden sm:block">КМРП</span>
        </button>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
        <span className="font-oswald tracking-wider text-sm" style={{ color: "var(--neon-cyan)" }}>
          {currentPath}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/forum")}
          className="nav-link text-sm" style={currentPath === "Форум" ? { color: "var(--neon-cyan)" } : {}}>
          Форум
        </button>
        <button onClick={() => navigate("/laws")}
          className="nav-link text-sm" style={currentPath === "Законы" ? { color: "var(--neon-cyan)" } : {}}>
          Законы
        </button>
        <button onClick={() => navigate("/")} className="nav-link text-sm">Главная</button>
        <button className="btn-grad text-sm px-4 py-2">Войти</button>
      </div>
    </nav>
  );
}

/* ─── FORUM PAGE ─────────────────────────────────────────────────────────────── */
export default function Forum() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const activeFaction = FACTIONS.find(f => f.id === activeCategory);

  return (
    <div className="min-h-screen font-rubik" style={{ background: "var(--dark-bg)", color: "white" }}>
      <NavBar currentPath="Форум" />

      {/* Hero */}
      <div className="relative py-16 px-6 overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: "var(--neon-purple)" }} />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10"
            style={{ background: "var(--neon-cyan)" }} />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="section-tag mb-3">Общение и жизнь сервера</div>
          <h1 className="font-oswald font-bold text-6xl text-white mb-3">ФОРУМ</h1>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Обсуждения, заявки, рапорты и новости всех структур</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* General sections */}
        <div className="mb-10">
          <h2 className="font-oswald font-bold text-xl text-white mb-4 tracking-wider">ОБЩИЕ РАЗДЕЛЫ</h2>
          <div className="space-y-2">
            {GENERAL_SECTIONS.map(s => (
              <div key={s.id}
                onClick={() => s.special ? navigate(s.special) : undefined}
                className={`card-dark p-4 flex items-center gap-4 ${s.special ? "cursor-pointer" : ""}`}
                style={s.special ? { borderColor: "rgba(168,85,247,0.4)" } : {}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)`, border: `1px solid color-mix(in srgb, ${s.color} 30%, transparent)` }}>
                  <Icon name={s.icon} size={18} style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-oswald font-bold text-white">{s.name}</span>
                    {s.special && (
                      <span className="text-xs px-2 py-0.5 rounded font-oswald tracking-wider"
                        style={{ background: "rgba(168,85,247,0.15)", color: "var(--neon-purple)" }}>
                        Открыть →
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</div>
                </div>
                <div className="hidden md:block text-right shrink-0">
                  <div className="text-xs truncate max-w-48 mb-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{s.lastPost}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {s.lastAuthor} · {s.lastTime}
                  </div>
                </div>
                <div className="shrink-0 text-right ml-4">
                  <div className="font-oswald font-bold text-lg" style={{ color: s.color }}>{s.count}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>тем</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faction categories */}
        <div>
          <h2 className="font-oswald font-bold text-xl text-white mb-4 tracking-wider">РАЗДЕЛЫ ФРАКЦИЙ</h2>

          {/* Faction tabs */}
          <div className="flex gap-2 mb-5 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className="px-4 py-2 rounded-lg text-sm font-oswald tracking-wider transition-all"
              style={activeCategory === null
                ? { background: "var(--neon-purple)", color: "white" }
                : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
              Все
            </button>
            {FACTIONS.map(f => (
              <button key={f.id}
                onClick={() => setActiveCategory(f.id === activeCategory ? null : f.id)}
                className="px-4 py-2 rounded-lg text-sm font-oswald tracking-wider transition-all"
                style={activeCategory === f.id
                  ? { background: f.color, color: "white" }
                  : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {f.name}
              </button>
            ))}
          </div>

          {/* Category cards when not expanded */}
          {activeCategory === null && (
            <div className="space-y-3">
              {FACTIONS.map(f => (
                <div key={f.id} className="card-dark overflow-hidden"
                  style={{ borderColor: `${f.color}20` }}>
                  {/* Category header */}
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-white/5"
                    onClick={() => setActiveCategory(f.id)}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                      <Icon name={f.icon} size={18} style={{ color: f.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-oswald font-bold text-white">{f.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{f.desc}</div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-center hidden sm:block">
                        <div className="font-oswald font-bold" style={{ color: f.color }}>{f.posts.length}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>тем</div>
                      </div>
                      <Icon name="ChevronDown" size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                    </div>
                  </div>
                  {/* Latest post preview */}
                  <div className="px-4 pb-4 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${f.color}20` }}>
                      <Icon name="FileText" size={12} style={{ color: f.color }} />
                    </div>
                    <div className="text-sm truncate" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {f.posts[1]?.title}
                    </div>
                    <span className="text-xs shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {f.posts[1]?.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Expanded faction view */}
          {activeFaction && (
            <div>
              {/* Faction header */}
              <div className="rounded-xl p-5 mb-4"
                style={{ background: `${activeFaction.color}10`, border: `1px solid ${activeFaction.color}30` }}>
                <div className="flex items-center gap-3 mb-1">
                  <Icon name={activeFaction.icon} size={22} style={{ color: activeFaction.color }} />
                  <h3 className="font-oswald font-bold text-2xl text-white">{activeFaction.name}</h3>
                </div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{activeFaction.desc}</p>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {["Все темы", "Закреплённые", "Горячие"].map((tab, i) => (
                    <button key={tab} className="px-3 py-1.5 rounded-lg text-xs font-oswald tracking-wider transition-all"
                      style={i === 0
                        ? { background: activeFaction.color, color: "white" }
                        : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {tab}
                    </button>
                  ))}
                </div>
                <button className="btn-grad text-xs px-4 py-2">+ Новая тема</button>
              </div>

              {/* Posts list */}
              <div className="space-y-2">
                {activeFaction.posts.map(post => (
                  <div key={post.id} className="card-dark p-4 cursor-pointer flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={post.pinned
                        ? { background: `${activeFaction.color}20`, border: `1px solid ${activeFaction.color}40` }
                        : { background: "rgba(255,255,255,0.05)" }}>
                      <Icon name={post.pinned ? "Pin" : "MessageSquare"} size={14}
                        style={{ color: post.pinned ? activeFaction.color : "rgba(255,255,255,0.4)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-medium text-white truncate">{post.title}</span>
                        {post.hot && (
                          <span className="text-xs px-2 py-0.5 rounded animate-pulse-glow"
                            style={{ background: "rgba(244,63,94,0.15)", color: "var(--neon-red)" }}>🔥</span>
                        )}
                        {post.tag && (
                          <span className="text-xs px-2 py-0.5 rounded"
                            style={{ background: `${activeFaction.color}15`, color: activeFaction.color }}>
                            {post.tag}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      <div className="flex items-center gap-1 hidden sm:flex">
                        <Icon name="MessageSquare" size={12} />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center gap-1 hidden sm:flex">
                        <Icon name="Eye" size={12} />
                        <span>{post.views}</span>
                      </div>
                      <Icon name="ChevronRight" size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t mt-10"
        style={{ borderColor: "rgba(168,85,247,0.2)" }}>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2024 КМРП — Криминальный Мир РП
        </p>
      </footer>
    </div>
  );
}
