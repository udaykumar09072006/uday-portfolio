import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Terminal, Search, CheckCircle, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.name)];

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (selectedCategory !== 'All' && cat.name !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredSkills.length === 0) return null;
    return {
      ...cat,
      skills: filteredSkills,
    };
  }).filter(Boolean) as typeof SKILL_CATEGORIES;

  return (
    <section id="skills" className="py-20 relative bg-[#070a11]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
              <span>&gt; TECHNICAL_CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cyber font-bold text-white tracking-wide">
              ENGINEERING SKILLS MATRIX
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl font-sans">
              Strong grounding in low-level languages, distributed backend services, reactive UI architectures, core computer science theory, and generative AI models.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((catName) => (
            <button
              key={catName}
              onClick={() => setSelectedCategory(catName)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-150 ${
                selectedCategory === catName
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-white hover:bg-slate-850'
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.name}
              className="cyber-glass rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="font-cyber font-bold text-base text-white tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {cat.name}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {cat.skills.length} TECHNOLOGIES
                  </span>
                </div>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center justify-between gap-2 text-xs font-mono group/item"
                    >
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          skill.level === 'Expert'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                            : skill.level === 'Advanced'
                            ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/20'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom indicator */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>VERIFIED STACK</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  PROD-READY
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
