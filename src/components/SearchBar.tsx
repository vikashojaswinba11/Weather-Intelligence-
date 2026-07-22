import React, { useState, useEffect } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { Location } from '../types';
import { searchCity } from '../api';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onSelect: (location: Location) => void;
}

export const SearchBar: React.FC<Props> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const data = await searchCity(query);
        setResults(data);
        setIsOpen(true);
        if (data.length === 0) {
          setError('City not found');
        }
      } catch (err) {
        setError('Failed to search');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 pl-12 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-sm transition-all"
        />
        <Search className="absolute left-4 top-3.5 text-slate-400 h-5 w-5" />
        {loading && <Loader2 className="absolute right-4 top-3.5 text-blue-500 h-5 w-5 animate-spin" />}
      </div>

      <AnimatePresence>
        {isOpen && (results.length > 0 || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
          >
            {error ? (
              <div className="p-4 text-center text-slate-500">{error}</div>
            ) : (
              <ul className="max-h-60 overflow-auto">
                {results.map((loc) => (
                  <li key={loc.id}>
                    <button
                      onClick={() => {
                        onSelect(loc);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors text-slate-700"
                    >
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <div>
                        <div className="font-medium text-slate-800">{loc.name}</div>
                        <div className="text-xs text-slate-500">
                          {loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
