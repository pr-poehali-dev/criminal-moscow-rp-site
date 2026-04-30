import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

/* ─── TYPES ─────────────────────────────────────────────────────────────────── */
interface Article {
  num: string;
  text: string;
  punishment: string;
  severe?: boolean;
}

interface Chapter {
  num: string;
  title: string;
  articles: Article[];
}

interface Section {
  id: string;
  num: string;
  title: string;
  color: string;
  icon: string;
  chapters: Chapter[];
}

/* ─── LAW DATA ─────────────────────────────────────────────────────────────── */
const SECTIONS: Section[] = [
  {
    id: "pdd",
    num: "1",
    title: "О безопасности дорожного движения (ПДД)",
    color: "#22d3ee",
    icon: "Car",
    chapters: [
      {
        num: "1.1",
        title: "Нарушения правил разметки",
        articles: [
          { num: "1.1.1", text: "Пересечение сплошной линии разметки.", punishment: "Штраф 5 000 руб." },
          { num: "1.1.2", text: "Движение по встречной полосе.", punishment: "Лишение прав 6 мес." },
          { num: "1.1.3", text: "Остановка на пешеходном переходе.", punishment: "Штраф 2 000 руб." },
        ],
      },
      {
        num: "1.2",
        title: "Дорожные знаки и сигналы светофора",
        articles: [
          { num: "1.2.1", text: "Проезд на красный свет.", punishment: "Штраф 3 000 руб. Повторно — 3 мин ареста" },
          { num: "1.2.2", text: "Движение под знак «Кирпич».", punishment: "Штраф 5 000 руб. или 3 мин ареста" },
        ],
      },
      {
        num: "1.3",
        title: "Действия после ДТП",
        articles: [
          { num: "1.3.1", text: "Оставление места ДТП (без пострадавших).", punishment: "Лишение прав 12 мес. или 4 мин ареста" },
          { num: "1.3.2", text: "Невыполнение обязанностей при ДТП (не остановился, но вернулся).", punishment: "Штраф 5 000 руб." },
        ],
      },
      {
        num: "1.4",
        title: "ДТП с тяжкими последствиями",
        articles: [
          { num: "1.4.1", text: "ДТП с тяжким вредом здоровью.", punishment: "30 мин лишения свободы", severe: true },
          { num: "1.4.2", text: "ДТП со смертью человека (неумышленно).", punishment: "60 мин лишения свободы", severe: true },
          { num: "1.4.3", text: "ДТП со смертью двух и более лиц (неумышленно).", punishment: "90 мин лишения свободы", severe: true },
        ],
      },
      {
        num: "1.5",
        title: "Скрытие с места ДТП с тяжкими последствиями",
        articles: [
          { num: "1.5.1", text: "Оставление места ДТП с пострадавшим/погибшим (умышленно).", punishment: "180 мин лишения свободы + лишение прав навсегда", severe: true },
          { num: "1.5.2", text: "Оставление места ДТП с пострадавшим/погибшим (не заметил + сам признался + есть доказательства).", punishment: "60 мин лишения свободы", severe: true },
        ],
      },
    ],
  },
  {
    id: "polномочия",
    num: "2",
    title: "Полномочия сотрудников",
    color: "#3b82f6",
    icon: "Shield",
    chapters: [
      {
        num: "2.1",
        title: "Остановка и проверка",
        articles: [
          { num: "2.1.1", text: "Остановка ТС или пешехода.", punishment: "Законно. Максимум 7 мин. Если подозрений нет — отпустить на 5 мин" },
          { num: "2.1.2", text: "Требование выйти из машины.", punishment: "Законно только при запахе алкоголя, опьянении, угрозе или розыске машины" },
          { num: "2.1.3", text: "Проведение досмотра. Законно только при наличии повода: машина в розыске, видимое оружие/наркотики, запах наркотиков/химикатов/трупный, свидетели, сработка детектора.", punishment: "Наказание за досмотр без повода: 9 мин лишения свободы сотруднику + 20 000 руб компенсации", severe: true },
        ],
      },
      {
        num: "2.2",
        title: "Удостоверение",
        articles: [
          { num: "2.2.1", text: "Обязан предъявить удостоверение (фото, фамилия, звание, печать). При отказе гражданин вправе не подчиняться.", punishment: "Обязанность сотрудника" },
          { num: "2.2.2", text: "Отказ показать удостоверение или показ «в пролете».", punishment: "Штраф 5 000 руб. или 3 мин ареста сотруднику" },
          { num: "2.2.3", text: "Использование удостоверения в личных целях.", punishment: "12 мин лишения свободы + изъятие удостоверения на 30 дней. При повторе — на 90 дней", severe: true },
        ],
      },
      {
        num: "2.3",
        title: "Форма и символика",
        articles: [
          { num: "2.3.1", text: "Отсутствие нашивок на форме.", punishment: "Штраф 3 000 руб." },
          { num: "2.3.2", text: "Ношение чужих нашивок.", punishment: "6 мин ареста" },
          { num: "2.3.3", text: "Выдача себя за высшее звание.", punishment: "Понижение в звании + 9 мин ареста" },
          { num: "2.3.4", text: "Выдача себя за другую структуру (ФСБ, МЧС и т.д.).", punishment: "30 мин лишения свободы + увольнение", severe: true },
        ],
      },
      {
        num: "2.4",
        title: "Задержание",
        articles: [
          { num: "2.4.1", text: "Задержание без доказательств и свидетелей.", punishment: "9 мин лишения свободы сотруднику + 20 000 руб компенсации", severe: true },
          { num: "2.4.2", text: "Арест за нарушение, которое карается только штрафом.", punishment: "6 мин лишения свободы сотруднику", severe: true },
        ],
      },
    ],
  },
  {
    id: "police",
    num: "3",
    title: "Для сотрудников полиции",
    color: "#22c55e",
    icon: "UserCheck",
    chapters: [
      {
        num: "3",
        title: "Дисциплинарные нормы",
        articles: [
          { num: "3.1", text: "Невыполнение приказа командира.", punishment: "9 мин ареста" },
          { num: "3.2", text: "Оскорбление командира при подчинённых.", punishment: "6 мин ареста" },
          { num: "3.3", text: "Применение служебного оружия в личных целях.", punishment: "75 мин лишения свободы + увольнение", severe: true },
          { num: "3.4", text: "Езда на служебной машине без разрешения.", punishment: "Штраф 20 000 руб. или 4 мин ареста" },
        ],
      },
    ],
  },
  {
    id: "criminal",
    num: "4",
    title: "Уголовный кодекс",
    color: "#f43f5e",
    icon: "Gavel",
    chapters: [
      {
        num: "4.1",
        title: "Преступления против жизни (общие)",
        articles: [
          { num: "4.1.1", text: "Угроза убийством или причинением тяжкого вреда здоровью с демонстрацией оружия (ножа, пистолета, биты, молотка, предмета, используемого как оружие).", punishment: "30 мин лишения свободы" },
          { num: "4.1.2", text: "Умышленное причинение тяжкого вреда здоровью (опасного для жизни: внутреннее кровотечение, потеря органа, кома, инвалидность).", punishment: "75 мин лишения свободы", severe: true },
          { num: "4.1.3", text: "Убийство умышленное (прямой умысел: хотел убить и убил).", punishment: "225 мин лишения свободы", severe: true },
          { num: "4.1.4", text: "Убийство по неосторожности (неумышленное: не хотел, но случайно получилось, например, толкнул, ударил один раз, не рассчитал силу).", punishment: "30 мин лишения свободы" },
          { num: "4.1.4.1", text: "Убийство по неосторожности при явке с повинной (сам пришел в полицию, признался).", punishment: "20 мин лишения свободы" },
          { num: "4.1.4.2", text: "Убийство по неосторожности при наличии неопровержимых доказательств случайности (видео, экспертиза, свидетели подтверждают, что убивать не хотел).", punishment: "15 мин лишения свободы" },
        ],
      },
      {
        num: "4.2",
        title: "Преступления против сотрудников государственных структур",
        articles: [
          { num: "4.2.1", text: "Посягательство на жизнь сотрудника правоохранительных органов (попытка убийства полицейского, военного, судебного пристава, следователя, сотрудника ФСБ при исполнении).", punishment: "270 мин лишения свободы", severe: true },
          { num: "4.2.2", text: "Убийство сотрудника правоохранительных органов при исполнении (умышленное).", punishment: "300 мин лишения свободы", severe: true },
          { num: "4.2.3", text: "Убийство сотрудника правоохранительных органов по неосторожности (случайно, например, сбил на переходе, случайно выстрелил, когда не целился).", punishment: "120 мин лишения свободы", severe: true },
          { num: "4.2.4", text: "Причинение тяжкого вреда здоровью сотрудника при исполнении (умышленно).", punishment: "150 мин лишения свободы", severe: true },
          { num: "4.2.5", text: "Причинение тяжкого вреда здоровью сотрудника при исполнении по неосторожности.", punishment: "30 мин лишения свободы" },
          { num: "4.2.6", text: "Угроза убийством в адрес сотрудника при исполнении (с демонстрацией оружия).", punishment: "60 мин лишения свободы" },
        ],
      },
      {
        num: "4.3",
        title: "Преступления против общественной безопасности",
        articles: [
          { num: "4.3.1", text: "Захват заложников (удержание людей с требованием выкупа, освобождения, политических уступок).", punishment: "150 мин лишения свободы", severe: true },
          { num: "4.3.2", text: "Захват заложников, повлекший смерть человека по неосторожности.", punishment: "225 мин лишения свободы", severe: true },
          { num: "4.3.3", text: "Захват заложников с умышленным убийством.", punishment: "300 мин лишения свободы", severe: true },
        ],
      },
      {
        num: "4.4",
        title: "Наркотические средства",
        articles: [
          { num: "4.4.1", text: "Хранение малого количества (для себя, без цели сбыта).", punishment: "от 3 до 15 мин лишения свободы — срок определяет судья" },
          { num: "4.4.2", text: "Хранение крупного размера (для себя или без доказательств сбыта).", punishment: "от 30 до 60 мин лишения свободы — срок определяет судья", severe: true },
          { num: "4.4.3", text: "Сбыт наркотических средств (продажа, дарение, передача другому лицу) — даже малого количества.", punishment: "от 120 до 225 мин лишения свободы — срок определяет судья", severe: true },
          { num: "4.4.4", text: "Сбыт наркотических средств несовершеннолетнему.", punishment: "300 мин лишения свободы", severe: true },
        ],
      },
      {
        num: "4.5",
        title: "Отягощение наказания (рецидив)",
        articles: [
          { num: "4.5.1", text: "Если лицо уже было дважды осуждено за любое преступление из Раздела 4 в течение последних 3 лет.", punishment: "+7,5 мин к сроку" },
          { num: "4.5.2", text: "Если лицо ранее судимо за особо тяжкое преступление (умышленное убийство, убийство сотрудника, захват заложников с гибелью, сбыт наркотиков).", punishment: "+15 мин к сроку" },
          { num: "4.5.3", text: "Третье и каждое последующее преступление из Раздела 4.", punishment: "Срок удваивается от базовой нормы", severe: true },
        ],
      },
    ],
  },
  {
    id: "libel",
    num: "5",
    title: "Клевета",
    color: "#f59e0b",
    icon: "MessageCircleWarning",
    chapters: [
      {
        num: "5",
        title: "Статьи о клевете",
        articles: [
          { num: "5.1", text: "Клевета сотруднику.", punishment: "Штраф 30 000 руб. или 6 мин ареста" },
          { num: "5.2", text: "Клевета в суде (ложные показания).", punishment: "12 мин лишения свободы", severe: true },
          { num: "5.3", text: "Клевета, приведшая к аресту невиновного.", punishment: "30 мин лишения свободы", severe: true },
        ],
      },
    ],
  },
  {
    id: "bribe",
    num: "6",
    title: "Взятка",
    color: "#fbbf24",
    icon: "Banknote",
    chapters: [
      {
        num: "6",
        title: "Статьи о коррупции",
        articles: [
          { num: "6.1", text: "Передача взятки сотруднику.", punishment: "30 мин лишения свободы", severe: true },
          { num: "6.2", text: "Получение взятки сотрудником.", punishment: "60 мин + увольнение", severe: true },
          { num: "6.3", text: "Взятка за незаконные действия.", punishment: "120 мин обеим сторонам", severe: true },
        ],
      },
    ],
  },
  {
    id: "insult",
    num: "7",
    title: "Оскорбления",
    color: "#a855f7",
    icon: "MessageSquareX",
    chapters: [
      {
        num: "7.1",
        title: "Оскорбление гражданина",
        articles: [
          { num: "7.1.1", text: "Оскорбление гражданина словом или жестом в общественном месте.", punishment: "Штраф 5 000 руб." },
          { num: "7.1.2", text: "Оскорбление гражданина в интернете.", punishment: "Штраф 15 000 руб. или 6 мин исправительных работ" },
        ],
      },
      {
        num: "7.2",
        title: "Оскорбление сотрудника",
        articles: [
          { num: "7.2.1", text: "Оскорбление сотрудника при исполнении (мат, жест, глумление).", punishment: "Штраф 40 000 руб. или 6 мин ареста" },
          { num: "7.2.2", text: "Оскорбление личной жизни сотрудника (религия, семья, национальность) — не связано со службой.", punishment: "Квалифицируется как оскорбление гражданина по ст. 7.1.1" },
        ],
      },
    ],
  },
  {
    id: "recidiv",
    num: "8",
    title: "Отягощение (рецидив)",
    color: "#ef4444",
    icon: "RefreshCw",
    chapters: [
      {
        num: "8",
        title: "Общий рецидив",
        articles: [
          { num: "8.1", text: "Дважды судим за однотипное нарушение за 3 года.", punishment: "+7,5 мин к сроку" },
          { num: "8.2", text: "Ранее судим за тяжкое преступление.", punishment: "+15 мин к сроку" },
          { num: "8.3", text: "Третье и каждое последующее нарушение одной категории.", punishment: "Срок удваивается", severe: true },
        ],
      },
    ],
  },
];

/* ─── NAV ─────────────────────────────────────────────────────────────────── */
function NavBar() {
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
        <span className="font-oswald tracking-wider text-sm" style={{ color: "var(--neon-cyan)" }}>Законы</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/forum")} className="nav-link text-sm">Форум</button>
        <button onClick={() => navigate("/")} className="nav-link text-sm">Главная</button>
        <button className="btn-grad text-sm px-4 py-2">Войти</button>
      </div>
    </nav>
  );
}

/* ─── MAIN ─────────────────────────────────────────────────────────────────── */
export default function Laws() {
  const [activeSection, setActiveSection] = useState<string>("pdd");
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(["1.1", "4.1"]));
  const [search, setSearch] = useState("");

  const toggleChapter = (key: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(key)) { next.delete(key); } else { next.add(key); }
      return next;
    });
  };

  const currentSection = SECTIONS.find(s => s.id === activeSection)!;

  const filteredChapters = search.trim()
    ? currentSection.chapters.map(ch => ({
        ...ch,
        articles: ch.articles.filter(a =>
          a.text.toLowerCase().includes(search.toLowerCase()) ||
          a.punishment.toLowerCase().includes(search.toLowerCase()) ||
          a.num.includes(search)
        ),
      })).filter(ch => ch.articles.length > 0)
    : currentSection.chapters;

  const totalArticles = SECTIONS.reduce((sum, s) =>
    sum + s.chapters.reduce((cs, ch) => cs + ch.articles.length, 0), 0);

  return (
    <div className="min-h-screen font-rubik" style={{ background: "var(--dark-bg)", color: "white" }}>
      <NavBar />

      {/* Hero */}
      <div className="relative py-14 px-6 overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10"
            style={{ background: "var(--neon-purple)" }} />
        </div>
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="section-tag mb-3">Упрощённое-дополненное издание</div>
            <h1 className="font-oswald font-bold text-6xl text-white mb-2">ЗАКОНОДАТЕЛЬСТВО</h1>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>
              {SECTIONS.length} разделов · {totalArticles} статей · обязательно к ознакомлению
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(255,255,255,0.4)" }} />
              <input
                type="text"
                placeholder="Поиск по статьям..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-lg text-sm text-white outline-none w-56"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-6">

        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden md:block">
          <div className="sticky top-24 space-y-1">
            <div className="text-xs font-oswald tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              РАЗДЕЛЫ
            </div>
            {SECTIONS.map(s => (
              <button key={s.id}
                onClick={() => { setActiveSection(s.id); setSearch(""); }}
                className="w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2.5"
                style={activeSection === s.id
                  ? { background: `${s.color}20`, borderLeft: `3px solid ${s.color}`, color: "white" }
                  : { color: "rgba(255,255,255,0.5)", borderLeft: "3px solid transparent" }}>
                <Icon name={s.icon} size={14} style={{ color: activeSection === s.id ? s.color : "rgba(255,255,255,0.3)" }} />
                <span className="text-sm leading-tight">
                  <span className="font-oswald font-bold mr-1" style={{ color: activeSection === s.id ? s.color : "rgba(255,255,255,0.4)" }}>
                    §{s.num}
                  </span>
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Mobile section selector */}
        <div className="md:hidden w-full mb-4 flex gap-2 overflow-x-auto pb-2">
          {SECTIONS.map(s => (
            <button key={s.id}
              onClick={() => { setActiveSection(s.id); setSearch(""); }}
              className="px-3 py-1.5 rounded-lg text-xs font-oswald tracking-wider whitespace-nowrap shrink-0 transition-all"
              style={activeSection === s.id
                ? { background: s.color, color: "white" }
                : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
              §{s.num} {s.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6 p-5 rounded-xl"
            style={{ background: `${currentSection.color}10`, border: `1px solid ${currentSection.color}30` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${currentSection.color}20`, border: `1px solid ${currentSection.color}40` }}>
              <Icon name={currentSection.icon} size={22} style={{ color: currentSection.color }} />
            </div>
            <div>
              <div className="text-xs font-oswald tracking-widest mb-1" style={{ color: currentSection.color }}>
                РАЗДЕЛ {currentSection.num}
              </div>
              <h2 className="font-oswald font-bold text-2xl text-white">{currentSection.title}</h2>
            </div>
          </div>

          {search && filteredChapters.length === 0 && (
            <div className="text-center py-12" style={{ color: "rgba(255,255,255,0.4)" }}>
              <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-40" />
              <p>Ничего не найдено по запросу «{search}»</p>
            </div>
          )}

          {/* Chapters */}
          <div className="space-y-3">
            {filteredChapters.map(ch => (
              <div key={ch.num} className="card-dark overflow-hidden">
                {/* Chapter header */}
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
                  onClick={() => toggleChapter(ch.num)}>
                  <div className="flex items-center gap-3">
                    <span className="font-oswald font-bold text-sm px-2.5 py-1 rounded"
                      style={{ background: `${currentSection.color}20`, color: currentSection.color }}>
                      {ch.num}
                    </span>
                    <span className="font-oswald font-bold text-white">{ch.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
                      {ch.articles.length} ст.
                    </span>
                  </div>
                  <Icon name={expandedChapters.has(ch.num) ? "ChevronUp" : "ChevronDown"} size={16}
                    style={{ color: "rgba(255,255,255,0.4)" }} />
                </button>

                {/* Articles */}
                {(expandedChapters.has(ch.num) || search) && (
                  <div className="divide-y" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {ch.articles.map(a => (
                      <div key={a.num} className="px-4 py-4 flex gap-4 hover:bg-white/3 transition-colors">
                        {/* Article number */}
                        <div className="shrink-0 pt-0.5">
                          <span className="font-oswald font-bold text-xs"
                            style={{ color: a.severe ? "var(--neon-red)" : currentSection.color }}>
                            {a.num}
                          </span>
                        </div>
                        {/* Text */}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                            {a.text}
                          </p>
                          {/* Punishment badge */}
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={a.severe
                              ? { background: "rgba(244,63,94,0.12)", color: "var(--neon-red)", border: "1px solid rgba(244,63,94,0.3)" }
                              : { background: `${currentSection.color}12`, color: currentSection.color, border: `1px solid ${currentSection.color}30` }}>
                            <Icon name={a.severe ? "AlertTriangle" : "Scale"} size={12} />
                            {a.punishment}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t mt-6"
        style={{ borderColor: "rgba(168,85,247,0.2)" }}>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2024 КМРП — Криминальный Мир РП · Законодательство сервера
        </p>
      </footer>
    </div>
  );
}