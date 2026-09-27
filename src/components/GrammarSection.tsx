import React, { useState } from 'react';
import { GRAMMAR_LESSONS } from '../data/curriculumData';
import { GrammarTopic } from '../types';
import { speakGerman } from '../utils/audio';
import { 
  GraduationCap, 
  CheckCircle2, 
  Volume2, 
  Table, 
  Sparkles, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const GrammarSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('cases');
  const [playingExample, setPlayingExample] = useState<string | null>(null);

  const activeTopic = GRAMMAR_LESSONS.find((t) => t.id === selectedTopicId) || GRAMMAR_LESSONS[0];

  const handleSpeak = async (text: string) => {
    setPlayingExample(text);
    await speakGerman(text);
    setPlayingExample(null);
  };

  return (
    <section id="grammar-section" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Structured German Grammar Lessons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            German Grammar Explained Without Confusion
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Forget 500-page textbooks. We distill German grammar into visual rules, formula tables, and real-life examples you can use immediately.
          </p>
        </div>

        {/* Grammar Topics Navigation Bar */}
        <div className="flex items-center sm:justify-center justify-start gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar w-full max-w-full px-1">
          {GRAMMAR_LESSONS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                id={`grammar-tab-${topic.id}`}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{topic.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  isSelected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {topic.level}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Lesson Content Container */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-md">
          
          {/* Header of Active Lesson */}
          <div className="pb-6 border-b border-slate-200 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                {activeTopic.title}
              </h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                Level {activeTopic.level} Essential
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              {activeTopic.summary}
            </p>
          </div>

          {/* Interactive Cheat Sheet Table if available */}
          {activeTopic.cheatSheetTable && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <Table className="w-4 h-4 text-red-600" />
                <span>Definite & Indefinite Article Matrix</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs w-full max-w-full">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                    <tr>
                      {activeTopic.cheatSheetTable.headers.map((h, i) => (
                        <th key={i} className="p-3.5 sm:p-4 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {activeTopic.cheatSheetTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                          {row[0]}
                        </td>
                        <td className="p-3.5 sm:p-4 text-blue-700 font-bold">{row[1]}</td>
                        <td className="p-3.5 sm:p-4 text-red-700 font-bold">{row[2]}</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">{row[3]}</td>
                        <td className="p-3.5 sm:p-4 text-purple-700 font-bold">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Rules and Examples Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {activeTopic.rules.map((rule, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {rule.label}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {rule.explanation}
                  </p>
                </div>

                {/* Example sentence box */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {rule.exampleGerman}
                    </div>
                    <div className="text-xs text-slate-500 italic mt-0.5">
                      {rule.exampleEnglish}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSpeak(rule.exampleGerman)}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs flex-shrink-0"
                    title="Pronounce example"
                  >
                    <Volume2 className={`w-4 h-4 ${playingExample === rule.exampleGerman ? 'text-red-600 animate-pulse' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
