import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "l", emoji: "💕", label: "Любовь" },
  { id: "c", emoji: "💼", label: "Карьера" },
  { id: "h", emoji: "🌿", label: "Здоровье" },
  { id: "m", emoji: "💰", label: "Деньги" },
  { id: "r", emoji: "✨", label: "Удача" },
];

const PREDICTIONS: Record<string, { text: string; wisdom: string }[]> = {
  l: [
    { text: "Судьбоносная встреча изменит всё", wisdom: "Тот, кто войдёт в твою жизнь, изменит её навсегда" },
    { text: "Старая любовь вернётся с признанием", wisdom: "Сердце уже знает, что выбрать" },
    { text: "Романтическое путешествие станет началом чего-то великого", wisdom: "Звёзды благоволят влюблённым" },
  ],
  c: [
    { text: "Крупный проект принесёт признание коллег", wisdom: "Твои усилия наконец замечены теми, кто важен" },
    { text: "Неожиданное предложение откроет новый путь", wisdom: "Не бойся перемен — они ведут к вершине" },
    { text: "Переговоры завершатся в твою пользу", wisdom: "Уверенность — твой главный союзник" },
  ],
  h: [
    { text: "Новая привычка изменит твоё самочувствие", wisdom: "Тело благодарит за каждый маленький шаг" },
    { text: "Долгожданное выздоровление наступит", wisdom: "Природа лечит терпение" },
    { text: "Прилив сил откроет второе дыхание", wisdom: "Твоя энергия — твоя крепость" },
  ],
  m: [
    { text: "Неожиданный источник дохода появится", wisdom: "Деньги текут к тем, кто их не боится" },
    { text: "Инвестиция принесёт щедрые плоды", wisdom: "Посеянное сегодня — урожай завтра" },
    { text: "Старый долг вернётся с лихвой", wisdom: "Вселенная всегда возвращает данное честно" },
  ],
  r: [
    { text: "Случайная встреча перевернёт планы к лучшему", wisdom: "Удача любит открытые сердца" },
    { text: "Число 7 принесёт тебе особую удачу", wisdom: "Следи за знаками — они рядом" },
    { text: "Потеря обернётся неожиданным приобретением", wisdom: "Вселенная не забирает, она меняет" },
  ],
};

function getDate(daysOffset: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function StarsBackground() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.1,
  }));

  return (
    <div className="stars-bg">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            "--duration": `${s.duration}s`,
            "--delay": `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function OrbVisual() {
  return (
    <div className="relative w-56 h-56 mx-auto flex items-center justify-center animate-float">
      <div
        className="orb-ring absolute w-56 h-56"
        style={{ "--spin-duration": "12s" } as React.CSSProperties}
      />
      <div
        className="orb-ring absolute w-44 h-44"
        style={{ "--spin-duration": "8s", animationDirection: "reverse" } as React.CSSProperties}
      />
      <div
        className="orb-ring absolute w-32 h-32"
        style={{ "--spin-duration": "5s" } as React.CSSProperties}
      />
      <div
        className="absolute w-28 h-28 rounded-full animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(216,180,254,0.9), rgba(139,92,246,0.7) 40%, rgba(67,20,120,0.95) 80%)",
          boxShadow:
            "0 0 60px rgba(139,92,246,0.5), inset 0 0 30px rgba(255,255,255,0.15)",
        }}
      />
      <div className="absolute text-3xl z-10" style={{ textShadow: "0 0 20px rgba(139,92,246,0.8)" }}>
        🔮
      </div>
    </div>
  );
}

interface PredictionResult {
  text: string;
  wisdom: string;
  date: string;
  category: string;
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const predictionRef = useRef<HTMLDivElement>(null);

  const handlePredict = () => {
    if (!selectedCategory || isRevealing) return;
    setIsRevealing(true);
    setPrediction(null);

    setTimeout(() => {
      const preds = PREDICTIONS[selectedCategory];
      const chosen = preds[getRandomInt(0, preds.length - 1)];
      const daysOffset = getRandomInt(3, 90);
      const cat = CATEGORIES.find((c) => c.id === selectedCategory);

      setPrediction({
        text: chosen.text,
        wisdom: chosen.wisdom,
        date: getDate(daysOffset),
        category: cat?.label || "",
      });
      setIsRevealing(false);
      setTimeout(
        () => predictionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
        100
      );
    }, 1800);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Предсказание", id: "main" },
    { label: "О нас", id: "about" },
    { label: "История", id: "history" },
    { label: "Контакты", id: "contacts" },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: "hsl(240 30% 4%)" }}>
      <StarsBackground />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: "linear-gradient(to bottom, rgba(10,6,26,0.95), transparent)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("main")}>
          <span className="text-2xl">🔮</span>
          <span
            className="text-xl text-purple-200"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.15em" }}
          >
            ОРАКУЛ
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="relative z-10 pt-20">
        {/* HERO */}
        <section
          id="main"
          className="min-h-screen flex flex-col items-center justify-center px-4 text-center pb-20"
        >
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
          >
            <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-8 font-medium">
              ✦ Древнее искусство предвидения ✦
            </p>
          </div>

          <div
            className="animate-fade-in-up mb-8"
            style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            <OrbVisual />
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
          >
            <h1
              className="text-7xl md:text-9xl font-light mb-4 leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="shimmer-text">Оракул</span>
            </h1>
            <p className="text-purple-300/70 text-lg font-light mb-12 max-w-md mx-auto tracking-wide leading-relaxed">
              Звёзды знают всё. Узнай точную дату, когда судьба исполнит предначертанное.
            </p>
          </div>

          {/* Category selector */}
          <div
            className="animate-fade-in-up w-full max-w-2xl"
            style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
          >
            <p className="text-purple-400/60 text-xs uppercase tracking-[0.35em] mb-5 font-medium">
              Выбери сферу жизни
            </p>
            <div className="grid grid-cols-5 gap-3 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-btn rounded-2xl py-5 px-2 flex flex-col items-center gap-2 ${
                    selectedCategory === cat.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-xs font-medium tracking-wide">{cat.label}</span>
                </button>
              ))}
            </div>

            <button
              className="predict-btn rounded-2xl px-12 py-4 text-sm w-full max-w-sm mx-auto block disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={handlePredict}
              disabled={!selectedCategory || isRevealing}
            >
              <span className="flex items-center justify-center gap-3">
                {isRevealing ? (
                  <>
                    <span className="inline-block animate-spin">✦</span>
                    Звёзды открывают тайну…
                  </>
                ) : (
                  <>🔮 Узнать предсказание</>
                )}
              </span>
            </button>
          </div>

          {/* Prediction result */}
          {prediction && (
            <div
              ref={predictionRef}
              className="mt-14 w-full max-w-xl mx-auto animate-reveal"
            >
              <div className="mystic-card rounded-3xl p-10 text-center">
                <div className="text-xs tracking-[0.35em] text-purple-400/60 uppercase mb-3">
                  {prediction.category}
                </div>
                <p
                  className="text-4xl font-light text-white mb-7 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  «{prediction.text}»
                </p>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400/30" />
                  <span className="text-purple-400/50 text-xs">✦</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400/30" />
                </div>

                <div
                  className="inline-flex items-center gap-3 rounded-full px-6 py-2.5 mb-6"
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.25)",
                  }}
                >
                  <span className="text-purple-300/60 text-xs uppercase tracking-widest">
                    Сбудется
                  </span>
                  <span className="gold-accent font-semibold text-sm">{prediction.date}</span>
                </div>

                <p className="text-purple-300/50 text-sm italic font-light">{prediction.wisdom}</p>

                <button
                  className="mt-7 text-purple-400/40 text-xs uppercase tracking-widest hover:text-purple-300 transition-colors"
                  onClick={() => {
                    setPrediction(null);
                    setSelectedCategory(null);
                  }}
                >
                  ← Спросить снова
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="section-divider mx-8" />

        {/* ABOUT */}
        <section id="about" className="py-24 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-4">✦ О нас ✦</p>
            <h2
              className="text-5xl font-light text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Хранители звёздного знания
            </h2>
            <p className="text-purple-300/60 max-w-2xl mx-auto leading-relaxed">
              Оракул — место, где древняя мудрость встречается с современным пониманием человеческой
              природы. Мы верим, что каждый человек достоин знать, что его ждёт.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                emoji: "🌌",
                title: "Космическая мудрость",
                text: "Наши предсказания основаны на многовековых астральных картах и природных циклах Вселенной",
              },
              {
                emoji: "🕯️",
                title: "Точные даты",
                text: "Каждое предсказание содержит конкретную дату, когда событие войдёт в вашу жизнь",
              },
              {
                emoji: "🌙",
                title: "Личный подход",
                text: "Пять сфер жизни — любовь, карьера, здоровье, деньги и удача — охватывают всё важное",
              },
            ].map((card, i) => (
              <div key={i} className="mystic-card rounded-2xl p-7 text-center">
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3
                  className="text-xl font-light text-white mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-purple-300/60 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="mystic-card rounded-3xl p-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3
                className="text-3xl font-light text-white mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Наша миссия
              </h3>
              <p className="text-purple-300/60 leading-relaxed mb-4">
                Мы помогаем людям обрести уверенность в завтрашнем дне. Стоите ли вы перед важным
                решением или просто ищете знак — Оракул укажет путь.
              </p>
              <p className="text-purple-300/40 text-sm leading-relaxed">
                С 2019 года мы даём предсказания более чем 500 000 человек по всему миру.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "500К+", label: "Предсказаний" },
                { num: "94%", label: "Точность" },
                { num: "5", label: "Сфер жизни" },
                { num: "7 лет", label: "Опыта" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-5 rounded-2xl"
                  style={{ background: "rgba(139,92,246,0.08)" }}
                >
                  <div
                    className="text-3xl font-light gold-accent mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-purple-400/50 text-xs uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider mx-8" />

        {/* HISTORY */}
        <section id="history" className="py-24 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-4">✦ История ✦</p>
            <h2
              className="text-5xl font-light text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Путь сквозь века
            </h2>
            <p className="text-purple-300/60 max-w-xl mx-auto">
              От древних оракулов Дельф до современного цифрового предвидения — история мистического знания
            </p>
          </div>

          <div className="space-y-10">
            {[
              {
                year: "~500 до н.э.",
                era: "Дельфийский оракул",
                text: "Жрицы Пифии вещали слова Аполлона. Цари и полководцы приходили за советом перед каждым важным решением. Оракул был голосом богов на земле.",
              },
              {
                year: "XIV век",
                era: "Эпоха провидцев",
                text: "Нострадамус составил 942 катрена, предсказав события на столетия вперёд. Его тексты читают и интерпретируют по сей день, находя поразительные совпадения.",
              },
              {
                year: "XIX век",
                era: "Спиритизм и карты",
                text: "Таро вышло за пределы закрытых салонов. Гадалки и медиумы стали частью культуры. Предсказание будущего стало доступно каждому.",
              },
              {
                year: "2019 год",
                era: "Рождение Оракула",
                text: "Объединив тысячелетние традиции с современным пониманием психологии и астрологии, мы создали Оракул — предсказатель нового времени с точными датами.",
              },
              {
                year: "Сегодня",
                era: "Вы здесь",
                text: "Более полумиллиона человек нашли ответы на свои вопросы. Звёзды продолжают говорить, и мы слышим их голос для вас.",
              },
            ].map((item, i) => (
              <div key={i} className="history-card">
                <div className="flex items-center gap-3 mb-2">
                  <span className="gold-accent text-sm font-semibold">{item.year}</span>
                  <span className="text-purple-400/30">·</span>
                  <span className="text-purple-300/50 text-xs uppercase tracking-wider">{item.era}</span>
                </div>
                <p className="text-purple-200/60 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider mx-8" />

        {/* CONTACTS */}
        <section id="contacts" className="py-24 px-4 max-w-4xl mx-auto pb-32">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-4">✦ Контакты ✦</p>
            <h2
              className="text-5xl font-light text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Связаться с Оракулом
            </h2>
            <p className="text-purple-300/60 max-w-xl mx-auto">
              Есть вопросы или хочешь личное предсказание — пиши нам, и звёзды ответят
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              {[
                { icon: "Mail", label: "Email", value: "oracle@orakul.ru" },
                { icon: "MessageCircle", label: "Telegram", value: "@orakul_ru" },
                { icon: "Clock", label: "Время ответа", value: "В течение 24 часов" },
              ].map((contact, i) => (
                <div key={i} className="mystic-card rounded-2xl p-5 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(139,92,246,0.2)" }}
                  >
                    <Icon name={contact.icon as "Mail"} size={18} className="text-purple-300" />
                  </div>
                  <div>
                    <p className="text-purple-400/50 text-xs uppercase tracking-wider mb-0.5">
                      {contact.label}
                    </p>
                    <p className="text-purple-100 text-sm font-medium">{contact.value}</p>
                  </div>
                </div>
              ))}

              <div className="mystic-card rounded-2xl p-7 mt-4">
                <p
                  className="text-purple-300/50 italic leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
                >
                  «Звёзды молчат лишь для тех, кто не умеет слушать. Задай вопрос — и Вселенная ответит.»
                </p>
              </div>
            </div>

            <div className="mystic-card rounded-3xl p-7">
              <h3
                className="text-2xl font-light text-white mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Написать сообщение
              </h3>
              <div className="space-y-4">
                <input
                  className="contact-input"
                  placeholder="Ваше имя"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
                <input
                  className="contact-input"
                  placeholder="Email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
                <textarea
                  className="contact-input resize-none"
                  rows={4}
                  placeholder="Ваш вопрос звёздам…"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                />
                <button className="predict-btn w-full rounded-2xl py-4 text-sm">
                  <span>Отправить послание ✦</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="border-t py-8 px-8 text-center"
          style={{ borderColor: "rgba(139,92,246,0.15)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-xl">🔮</span>
            <span
              className="text-purple-400/50 tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.2em" }}
            >
              Оракул
            </span>
          </div>
          <p className="text-purple-500/35 text-xs">
            © 2024 Оракул. Предсказания носят развлекательный характер. Звёзды подсказывают — выбор за вами.
          </p>
        </footer>
      </div>
    </div>
  );
}
