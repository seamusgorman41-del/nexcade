import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, Filter, TrendingUp, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-sans selection:bg-black selection:text-white">
      {/* Header */}
      <header className="border-b-2 border-black bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black flex items-center justify-center rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Gamepad2 className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">Nexus Games</h1>
          </div>

          <div className="hidden md:flex items-center gap-8 font-bold uppercase text-sm tracking-widest">
            <a href="#" className="hover:underline underline-offset-4">New</a>
            <a href="#" className="hover:underline underline-offset-4">Popular</a>
            <a href="#" className="hover:underline underline-offset-4">About</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="SEARCH GAMES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-2 border-transparent focus:border-black focus:bg-white outline-none transition-all font-bold text-xs uppercase tracking-wider w-64"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
                Featured Collection
              </div>
              <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8">
                Play <span className="text-gray-400">Without</span> Limits.
              </h2>
              <p className="text-xl text-gray-600 max-w-md mb-10 font-medium leading-relaxed">
                A curated vault of the web's best unblocked games. No downloads, no blocks, just pure gameplay.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 group">
                  Start Playing
                  <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-black px-8 py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                  View Leaderboard
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden group"
            >
              <img
                src="https://picsum.photos/seed/gaming/800/450"
                alt="Featured Game"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white p-4 border-2 border-black flex justify-between items-center">
                  <div>
                    <h3 className="font-black uppercase tracking-tight">Weekly Highlight</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase">Retro Arcade 2024</p>
                  </div>
                  <Trophy className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b-2 border-black pb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-white border-2 border-transparent hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-400">
            <Filter className="w-4 h-4" />
            <span>{filteredGames.length} Games Found</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setActiveGame(game)}
              >
                <div className="aspect-[4/3] overflow-hidden border-b-2 border-black relative">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white border-2 border-black px-2 py-1 text-[10px] font-black uppercase tracking-widest">
                    {game.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:underline underline-offset-4">
                    {game.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium line-clamp-2 mb-6 flex-1">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Play Now
                    </span>
                    <Maximize2 className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 border-2 border-dashed border-gray-300">
              <p className="text-2xl font-black uppercase text-gray-300 tracking-tighter">
                No games found matching your criteria
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-black py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black flex items-center justify-center">
                <Gamepad2 className="text-white w-5 h-5" />
              </div>
              <span className="font-black uppercase tracking-tighter">Nexus Games</span>
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Contact</a>
              <a href="#" className="hover:underline">Discord</a>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              © 2024 Nexus Gaming Network
            </div>
          </div>
        </div>
      </footer>

      {/* Game Modal */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-4 border-black w-full max-w-6xl h-full max-h-[90vh] flex flex-col relative shadow-[20px_20px_0px_0px_rgba(255,255,255,0.2)]"
            >
              {/* Modal Header */}
              <div className="p-4 border-b-4 border-black flex items-center justify-between bg-white">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-black uppercase tracking-tight">{activeGame.title}</h2>
                  <div className="hidden sm:block bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                    {activeGame.category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(activeGame.url, '_blank')}
                    className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveGame(null)}
                    className="p-2 hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Game Frame */}
              <div className="flex-1 bg-black relative overflow-hidden">
                <iframe
                  src={activeGame.url}
                  className="w-full h-full border-none"
                  title={activeGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t-4 border-black flex items-center justify-between">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:block">
                  {activeGame.description}
                </p>
                <div className="flex items-center gap-4 ml-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Press ESC to close
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
