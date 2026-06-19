import { Menu, X, Phone, Mail, MapPin, Clock, ChevronRight, ArrowRight, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const NAV_LINKS = [
  { label: 'Domů', href: '#home' },
  { label: 'Sladké', href: '#sladke' },
  { label: 'Slané', href: '#slane' },
  { label: 'O nás', href: '#o-nas' },
  { label: 'Kontakt', href: '#kontakt' },
];

const SWEET_ITEMS = [
  { name: 'Dorty na objednávku', desc: 'Narozeninové, svatební i tematické dorty přesně podle vašeho přání.', emoji: '🎂', href: '#kontakt' },
  { name: 'Zákusky & dezerty', desc: 'Krémové, ovocné, čokoládové i jogurtové – stálá i sezónní nabídka.', emoji: '🍰', href: '#kontakt' },
  { name: 'Pečivo & koláče', desc: 'Koblihy, metýnky, záviny, croissanty, muffiny a buchty každý den čerstvé.', emoji: '🥐', href: '#kontakt' },
  { name: 'Poháry & zmrzlina', desc: 'Ledové poháry a dezerty pro horké letní dny.', emoji: '🍨', href: '#kontakt' },
];

const SAVORY_ITEMS = [
  { name: 'Chlebíčky', desc: 'Čerstvé obložené chlebíčky – klasické i sezónní varianty.', emoji: '🥪', href: '#kontakt' },
  { name: 'Aspiky & saláty', desc: 'Lahodné masové i zeleninové aspiky a pestré saláty.', emoji: '🥗', href: '#kontakt' },
  { name: 'Slané dortíky', desc: 'Originální slané dortíky a obložené pečivo na každou akci.', emoji: '🫓', href: '#kontakt' },
  { name: 'Rauty & oslavy', desc: 'Kompletní občerstvení na firemní i soukromé akce.', emoji: '🎉', href: '#kontakt' },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CategorySection({
  id,
  title,
  subtitle,
  items,
  accent,
}: {
  id: string;
  title: string;
  subtitle: string;
  items: typeof SWEET_ITEMS;
  accent: 'brown' | 'teal';
}) {
  const accentClass = accent === 'brown'
    ? 'bg-brand-brown text-white hover:bg-brand-brown-light'
    : 'bg-brand-teal text-white hover:bg-brand-teal-dark';
  const tagClass = accent === 'brown'
    ? 'bg-brand-brown/10 text-brand-brown border-brand-brown/20'
    : 'bg-brand-teal/10 text-brand-teal border-brand-teal/20';
  const emojiBg = accent === 'brown' ? 'bg-brand-brown/8' : 'bg-brand-teal/8';

  return (
    <section id={id} className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="mb-12">
            <span className={`inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wide uppercase border ${tagClass} mb-4`}>
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text">{title}</h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <FadeUp key={item.name} delay={i * 0.08}>
              <a
                href={item.href}
                className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-0.5 transition-all duration-250"
              >
                <div className={`w-12 h-12 rounded-xl ${emojiBg} flex items-center justify-center text-2xl mb-5`}>
                  {item.emoji}
                </div>
                <h3 className="font-semibold text-brand-text mb-2 leading-snug">{item.name}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed flex-1">{item.desc}</p>
                <div className="mt-4 flex items-center text-xs font-medium text-brand-text-muted group-hover:text-brand-brown transition-colors">
                  Zjistit více <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.35}>
          <div className="mt-10 flex justify-start">
            <a href="#kontakt" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${accentClass} shadow-sm`}>
              Objednat <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden bg-brand-bg">

      {/* ── NAV ── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'nav-glass py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#home">
            <img
              src="/logo.webp"
              alt="Dobrůtky u Obra"
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-10' : 'h-14'}`}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-brand-text hover:text-brand-brown transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="tel:+420495515065" className="inline-flex items-center gap-2 bg-brand-brown hover:bg-brand-brown-light text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm">
              <Phone className="w-3.5 h-3.5" />
              495 515 065
            </a>
          </div>

          <button className="md:hidden text-brand-text" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden nav-glass border-t border-white/20 overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
                {NAV_LINKS.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-brand-text hover:text-brand-brown hover:bg-brand-brown/5 rounded-xl transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="tel:+420495515065"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-brand-brown"
                >
                  <Phone className="w-4 h-4" /> 495 515 065
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-gradient-radial from-brand-cream to-transparent opacity-70" />
          <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-radial from-brand-teal/15 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block py-1 px-3 rounded-full bg-brand-brown/10 text-brand-brown text-xs font-semibold tracking-wide uppercase border border-brand-brown/20 mb-6">
                Cukrárna v Hradci Králové od roku 1990
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight tracking-tight mb-6"
            >
              Poctivé sladké<br />
              <span className="text-brand-brown">i slané dobrůtky</span><br />
              <span className="text-brand-text-muted font-normal text-3xl sm:text-4xl lg:text-5xl">přímo od Obra.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-brand-text-muted mb-8 leading-relaxed"
            >
              Ručně vyráběné dobroty z kvalitních surovin. Najdete nás na Gočárově třídě v centru Hradce Králové — otevřeno každý pracovní den od 6:45.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a href="#sladke" className="inline-flex items-center justify-center gap-2 bg-brand-brown hover:bg-brand-brown-light text-white font-medium px-7 py-3.5 rounded-xl transition-all shadow-md shadow-brand-brown/20">
                Prohlédnout nabídku <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#kontakt" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-text font-medium px-7 py-3.5 rounded-xl border border-gray-200 transition-all">
                Objednat doprůtky
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm text-brand-text-muted"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-brown" />
                <span>Po–Pá: <strong className="text-brand-text">6:45–16:00</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-brown" />
                <span>Gočárova třída 687/11, HK</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SLADKÉ ── */}
      <div className="bg-white">
        <CategorySection
          id="sladke"
          title="Sladké dobrůtky"
          subtitle="Sladká nabídka"
          items={SWEET_ITEMS}
          accent="brown"
        />
      </div>

      {/* ── SLANÉ ── */}
      <CategorySection
        id="slane"
        title="Slané pochutiny"
        subtitle="Slaná nabídka"
        items={SAVORY_ITEMS}
        accent="teal"
      />

      {/* ── O NÁS ── */}
      <section id="o-nas" className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-brand-brown/10 text-brand-brown text-xs font-semibold tracking-wide uppercase border border-brand-brown/20 mb-5">
                  Příběh Obra
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
                  Oslazujeme si s vámi život od roku 1990
                </h2>
                <p className="text-brand-text-muted leading-relaxed mb-5">
                  Dobrůtky u Obra jsou pohádkově-pohodové místo v centru Hradce Králové. Cukrárna na Gočárově třídě otevřela v roce 2015 v novém příjemném prostředí — Denis Obermajer, přezdívaný Obr, každý den připravuje čerstvé sladké i slané speciality.
                </p>
                <p className="text-brand-text-muted leading-relaxed mb-8">
                  Přijďte si posedět u dobré kávy a zákusku, přečíst noviny nebo se jen zastavit pro svačinu. Pohádkově-pohodová atmosféra zaručena.
                </p>
                <a href="#kontakt" className="inline-flex items-center gap-2 text-brand-brown font-medium hover:underline underline-offset-4">
                  Napište nám <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '1990', label: 'Rok vzniku' },
                  { value: '6:45', label: 'Otevíráme každý všední den' },
                  { value: '100%', label: 'Ruční výroba' },
                  { value: '★★★★★', label: 'Spokojení zákazníci' },
                ].map(stat => (
                  <div key={stat.label} className="bg-brand-bg rounded-2xl p-6 border border-gray-100">
                    <div className="text-2xl font-bold text-brand-brown mb-1">{stat.value}</div>
                    <div className="text-sm text-brand-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <section id="kontakt" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-12">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-semibold tracking-wide uppercase border border-brand-teal/20 mb-4">
                Kontakt & objednávky
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text">Napište nebo zavolejte</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Info */}
            <FadeUp delay={0.05}>
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xs font-semibold text-brand-text-muted uppercase tracking-wide mb-4">Provozovna</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-brand-brown mt-0.5 shrink-0" />
                      <div className="text-sm text-brand-text">
                        Gočárova třída 687/11<br />Hradec Králové 500 02
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-brand-brown shrink-0" />
                      <a href="tel:+420495515065" className="text-sm text-brand-text hover:text-brand-brown transition-colors">+420 495 515 065</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-brand-brown shrink-0" />
                      <a href="mailto:info@dobrutky-u-obra.cz" className="text-sm text-brand-text hover:text-brand-brown transition-colors">info@dobrutky-u-obra.cz</a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-brand-text-muted uppercase tracking-wide mb-4">Otevírací doba</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-text font-medium">Pondělí – Pátek</span>
                      <span className="text-brand-text">6:45 – 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-muted">Sobota</span>
                      <span className="text-brand-text-muted">Zavřeno</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-muted">Neděle</span>
                      <span className="text-brand-text-muted">Zavřeno</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-brand-text-muted uppercase tracking-wide mb-4">Fakturační údaje</h3>
                  <div className="text-sm text-brand-text-muted space-y-1">
                    <p>Dobrůtky u Obra s.r.o.</p>
                    <p>IČ: 07131968 | DIČ: CZ07131968</p>
                    <p>Účet: 283906047/0300</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Form */}
            <FadeUp delay={0.1}>
              <div className="lg:col-span-3">
                {sent ? (
                  <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-brand-text mb-2">Zpráva odeslána!</h3>
                    <p className="text-brand-text-muted text-sm">Ozveme se vám co nejdříve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-brand-text-muted mb-1.5">Jméno</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                          placeholder="Vaše jméno"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-teal focus:ring-0 outline-none text-sm text-brand-text placeholder-gray-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-brand-text-muted mb-1.5">E-mail</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                          placeholder="vas@email.cz"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-teal focus:ring-0 outline-none text-sm text-brand-text placeholder-gray-400 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-brand-text-muted mb-1.5">Zpráva / Poptávka</label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                        placeholder="Popište vaši objednávku nebo dotaz..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-teal focus:ring-0 outline-none text-sm text-brand-text placeholder-gray-400 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-brown hover:bg-brand-brown-light text-white font-medium px-6 py-3.5 rounded-xl transition-all shadow-sm shadow-brand-brown/20"
                    >
                      Odeslat zprávu <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <img src="/logo.webp" alt="Dobrůtky u Obra" className="h-12 mb-4" />
              <p className="text-sm text-brand-text-muted leading-relaxed max-w-xs">
                Tradiční cukrárna v centru Hradce Králové. Sladké i slané pochutiny s láskou od roku 1990.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wide mb-4">Otevírací doba</h4>
              <p className="text-sm text-brand-text mb-1"><strong>Po – Pá:</strong> 6:45 – 16:00</p>
              <p className="text-sm text-brand-text-muted">So – Ne: Zavřeno</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wide mb-4">Kontakt</h4>
              <div className="space-y-2">
                <a href="tel:+420495515065" className="flex items-center gap-2 text-sm text-brand-text-muted hover:text-brand-brown transition-colors">
                  <Phone className="w-3.5 h-3.5" /> +420 495 515 065
                </a>
                <a href="mailto:info@dobrutky-u-obra.cz" className="flex items-center gap-2 text-sm text-brand-text-muted hover:text-brand-brown transition-colors">
                  <Mail className="w-3.5 h-3.5" /> info@dobrutky-u-obra.cz
                </a>
                <p className="flex items-start gap-2 text-sm text-brand-text-muted">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> Gočárova třída 687/11, Hradec Králové
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-text-muted">
            <p>&copy; {new Date().getFullYear()} Dobrůtky u Obra s.r.o. Všechna práva vyhrazena.</p>
            <p>IČ: 07131968 | DIČ: CZ07131968</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
