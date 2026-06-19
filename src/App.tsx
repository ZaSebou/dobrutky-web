import { Menu, X, ArrowRight, ChevronRight, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      {/* Navbar - Glassmorphism */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-2 shadow-sm' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 flex items-center"
            >
              <a href="/">
                <img className={`w-auto transition-all duration-300 ${scrolled ? 'h-12' : 'h-16'}`} src="/logo.webp" alt="Dobrůtky u Obra" />
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex space-x-10"
            >
              <a href="#" className="text-brand-text font-medium hover:text-brand-teal transition-colors">Domů</a>
              <a href="#menu" className="text-brand-text font-medium hover:text-brand-teal transition-colors">Naše nabídka</a>
              <a href="#kontakt" className="text-brand-text font-medium hover:text-brand-teal transition-colors">Kontakt</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex"
            >
               <a href="#kontakt" className="bg-brand-brown hover:bg-brand-brown-light text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-brand-brown/30 hover:shadow-brand-brown/50 transform hover:-translate-y-0.5">
                 Objednat
               </a>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-text focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass absolute top-full left-0 w-full overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-brand-text hover:bg-brand-teal/10 hover:text-brand-teal font-medium rounded-xl transition-colors">Domů</a>
                <a href="#menu" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-brand-text hover:bg-brand-teal/10 hover:text-brand-teal font-medium rounded-xl transition-colors">Naše nabídka</a>
                <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-brand-text hover:bg-brand-teal/10 hover:text-brand-teal font-medium rounded-xl transition-colors">Kontakt</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-brand-teal-light/40 to-transparent blur-3xl opacity-60"></div>
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-brand-brown-light/20 to-transparent blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-brand-teal/10 text-brand-teal font-semibold text-sm mb-6 border border-brand-teal/20">
                Tradiční cukrárna s moderním nádechem
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-brand-text leading-tight mb-6 tracking-tight"
            >
              Poctivé dobroty <br/>
              <span className="gradient-text">přímo od Obra.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-brand-text-muted mb-10 leading-relaxed max-w-2xl"
            >
              Skvělé slané i sladké dobrůtky pro všechny mlsné jazýčky. 
              Klademe důraz na ruční výrobu, kvalitní suroviny a radost z každého kousku.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#menu" className="flex items-center justify-center bg-brand-brown hover:bg-brand-brown-light text-white px-8 py-4 rounded-full font-medium transition-all shadow-xl shadow-brand-brown/20 group">
                Ukázat nabídku
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#kontakt" className="flex items-center justify-center bg-white hover:bg-gray-50 text-brand-text border border-gray-200 px-8 py-4 rounded-full font-medium transition-all shadow-sm">
                Kontaktujte nás
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase (Menu Placeholder) */}
      <section id="menu" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-extrabold text-brand-text mb-4"
            >
              Vyberte si z naší nabídky
            </motion.h2>
            <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
              Ukázka našich nejoblíbenějších produktů. Kompletní katalog brzy propojíme přímo s naším systémem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-brand-surface rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-brand-teal/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-56 bg-brand-bg relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <span className="text-brand-teal font-medium z-0 flex flex-col items-center gap-2">
                    <span className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center backdrop-blur-sm">🍰</span>
                    Obrázek z CRM
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-brand-text group-hover:text-brand-brown transition-colors">Prémiový dezert {item}</h3>
                  </div>
                  <p className="text-brand-text-muted mb-6 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-bold text-2xl text-brand-teal">85 Kč</span>
                    <button className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-brown group-hover:bg-brand-brown group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="kontakt" className="py-24 relative overflow-hidden">
        {/* Subtle background decorative element */}
        <div className="absolute bottom-0 right-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-brown/5 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl shadow-brand-brown/5 p-8 md:p-12 border border-gray-100 relative overflow-hidden"
          >
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-brown to-brand-teal"></div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-4">Napište nám</h2>
              <p className="text-brand-text-muted text-lg">Máte speciální přání nebo si chcete objednat? Jsme tu pro vás.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <textarea
                  id="message"
                  rows={5}
                  className="peer w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-brand-teal focus:ring-0 transition-all bg-gray-50 focus:bg-white text-brand-text resize-none outline-none placeholder-transparent"
                  placeholder="Vaše zpráva..."
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-5 -top-2.5 bg-white px-2 text-sm font-medium text-brand-text-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:left-5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-5 peer-focus:text-sm peer-focus:text-brand-teal peer-focus:bg-white"
                >
                  Vaše zpráva (poptávka)
                </label>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-brand-brown hover:bg-brand-brown-light text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-brown/20 flex items-center justify-center mx-auto group"
              >
                Odeslat zprávu
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img src="/logo.webp" alt="Logo Footer" className="h-16 mb-6" />
              <p className="text-brand-text-muted max-w-xs">
                Cukrárna Hradec Králové - skvělé slané i sladké dobrůtky pro všechny mlsné jazýčky.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold text-brand-text mb-4">Kontakt</h4>
              <p className="text-brand-text-muted mb-2 flex items-center">
                <span className="font-medium mr-2 text-brand-brown">Tel:</span> 
                <a href="tel:+420495515065" className="hover:text-brand-teal transition-colors">495 515 065</a>
              </p>
              <p className="text-brand-text-muted flex items-center">
                <span className="font-medium mr-2 text-brand-brown">E-mail:</span> 
                <a href="mailto:info@dobrutky-u-obra.cz" className="hover:text-brand-teal transition-colors">info@dobrutky-u-obra.cz</a>
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold text-brand-text mb-4">Rychlé odkazy</h4>
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-brand-text-muted hover:text-brand-teal transition-colors">Domů</a>
                <a href="#menu" className="text-brand-text-muted hover:text-brand-teal transition-colors">Naše nabídka</a>
                <a href="#kontakt" className="text-brand-text-muted hover:text-brand-teal transition-colors">Napište nám</a>
              </nav>
            </div>
          </div>
          
          <div className="w-full h-px bg-gray-100 my-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-brand-text-muted">
            <p>&copy; {new Date().getFullYear()} Dobrůtky u Obra. Všechna práva vyhrazena.</p>
            <p className="mt-2 md:mt-0">Vytvořeno s ❤️ pro moderní web</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
