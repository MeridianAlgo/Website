import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    name: 'meridianalgo.org',
    url: 'https://github.com/MeridianAlgo/meridianalgo.org',
    description: 'The source code for this website — React, TypeScript, Tailwind.',
    language: 'TypeScript',
    license: '—',
    category: 'Documentation'
  },
  {
    name: 'Python-Packages',
    url: 'https://github.com/MeridianAlgo/Python-Packages',
    description: 'Our PyPI packages. Install with pip install meridianalgo, or read the source.',
    language: 'Python',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Javascript-Packages',
    url: 'https://github.com/MeridianAlgo/Javascript-Packages',
    description: 'Our NPM packages — a quantitative finance framework for Node and TypeScript.',
    language: 'TypeScript',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Learn-Quant',
    url: 'https://github.com/MeridianAlgo/Learn-Quant',
    description: 'The utilities behind our programs, commented line by line so beginners can follow them.',
    language: 'Python',
    license: '—',
    category: 'Libraries'
  },
  {
    name: 'AraAI',
    url: 'https://github.com/MeridianAlgo/AraAI',
    description: 'Stock volatility prediction, market trend forecasting, and portfolio optimization.',
    language: 'Python',
    license: 'Custom',
    category: 'Machine Learning'
  },
  {
    name: 'FinAI',
    url: 'https://github.com/MeridianAlgo/FinAI',
    description: 'Our in-house LLM research, aimed at finance-based chat and financial requests.',
    language: 'Python',
    license: '—',
    category: 'Machine Learning'
  },
  {
    name: 'Midnight.AI',
    url: 'https://github.com/MeridianAlgo/Midnight.AI',
    description: 'Multi-objective trading engine with a pretrained model, Alpaca paper trading, and a backtester.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Basic-Sentiment-Analysis',
    url: 'https://github.com/MeridianAlgo/Basic-Sentiment-Analysis',
    description: 'FinBERT sentiment classification of financial news: positive, negative, neutral.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Cryptvault',
    url: 'https://github.com/MeridianAlgo/Cryptvault',
    description: 'Cryptocurrency analysis with ML predictions, 50+ pattern recognition, and terminal charting.',
    language: 'Python',
    license: 'BSD 3-Clause',
    category: 'Analysis Tools'
  },
  {
    name: 'Apex-Analysis',
    url: 'https://github.com/MeridianAlgo/Apex-Analysis',
    description: 'Beginner-friendly stock analysis and research, built for accessibility.',
    language: 'Python',
    license: 'MIT',
    category: 'Analysis Tools'
  },
  {
    name: 'FinDB',
    url: 'https://github.com/MeridianAlgo/FinDB',
    description: 'Multi-source financial data scraper and database, updated automatically every day.',
    language: 'Python',
    license: 'MIT',
    category: 'Data'
  },
  {
    name: 'No-Ticker-Left-Behind',
    url: 'https://github.com/MeridianAlgo/No-Ticker-Left-Behind',
    description: 'Every ticker for every world stock, refreshed regularly and exported in common formats.',
    language: 'Python',
    license: '—',
    category: 'Data'
  },
  {
    name: 'Pine-A-Script',
    url: 'https://github.com/MeridianAlgo/Pine-A-Script',
    description: 'Transpiler converting TradingView Pine Script (v5/v6) indicators to JavaScript for Node.',
    language: 'JavaScript',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'Interlink',
    url: 'https://github.com/MeridianAlgo/Interlink',
    description: 'Interoperability protocol bridging blockchain ecosystems with zero-knowledge proofs.',
    language: 'Rust',
    license: 'MIT',
    category: 'Infrastructure'
  },
  {
    name: 'UniGroth',
    url: 'https://github.com/MeridianAlgo/UniGroth',
    description: 'A Rust implementation of the Groth16 zkSNARK — faster, safer, more adaptable.',
    language: 'Rust',
    license: '—',
    category: 'Infrastructure'
  },
  {
    name: 'LiteLayer',
    url: 'https://github.com/MeridianAlgo/LiteLayer',
    description: 'A lightweight, secure storage layer for self-hosted NAS.',
    language: 'Python',
    license: '—',
    category: 'Infrastructure'
  }
];

const CATEGORIES = ['All', 'Machine Learning', 'Analysis Tools', 'Libraries', 'Data', 'Tools', 'Infrastructure', 'Documentation'];

const OpenSource = () => {
  const [category, setCategory] = useState('All');

  useEffect(() => {
    document.title = 'MeridianAlgo | Source';
  }, []);

  const filtered = category === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === category);

  return (
    <>
      <section className="sheet py-14 lg:py-20">
        <p className="lbl"></p>
        <h1 className="display-1 mt-3 max-w-[18ch]">Read it, run it, take it.</h1>
        <p className="lede mt-6">
          Sixteen repositories: the models behind our tools, the research we
          publish, and this website. Most are MIT licensed, so you can copy them
          into your own work without asking.
        </p>
        <p className="mt-8">
          <a
            href="https://github.com/MeridianAlgo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            All repositories on GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </p>
      </section>

      <section className="sheet pb-20">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink pt-4">
          <span className="lbl">Filter</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`lbl border-b-2 py-1 transition-colors duration-150 hover:text-ink ${
                category === cat ? 'border-stamp text-ink' : 'border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="lbl ml-auto">
            {filtered.length} of {PROJECTS.length}
          </span>
        </div>

        <ul className="mt-6 list-none border-t border-rule p-0">
          {filtered.map((project, i) => (
            <li key={project.name} className={i % 2 === 1 ? 'bg-band' : ''}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-6 gap-y-1 border-b border-rule px-2 py-4 transition-colors duration-150 hover:bg-ink hover:text-paper sm:grid-cols-[3rem_15rem_1fr_auto] sm:items-baseline sm:px-4"
              >
                <span className="fig hidden text-[0.6875rem] text-steel group-hover:text-paper/70 sm:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="fig text-[0.9375rem] font-medium">
                  {project.name}
                  <ArrowUpRight
                    className="ml-1 inline h-3.5 w-3.5 align-[-1px] text-steel group-hover:text-paper"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[0.9375rem] leading-snug text-steel group-hover:text-paper/80">
                  {project.description}
                </span>
                <span className="lbl shrink-0 group-hover:text-paper/70">
                  {project.language} · {project.license}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default OpenSource;
