import React, { useState } from 'react';
import { REAL_LIFE_CARDS } from '../data/curriculumData';
import { RealLifeCard } from '../types';
import { speakGerman } from '../utils/audio';
import { 
  Volume2, 
  X, 
  Lightbulb, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface RealLifeSectionProps {
  onSelectTopicForPractice?: (topicId: string) => void;
}

export const RealLifeSection: React.FC<RealLifeSectionProps> = ({
  onSelectTopicForPractice
}) => {
  const [activeCard, setActiveCard] = useState<RealLifeCard | null>(null);
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

  const handleSpeak = async (text: string) => {
    setPlayingPhrase(text);
    await speakGerman(text);
    setPlayingPhrase(null);
  };

  return (
    <section id="real-life-german-section" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>🇩🇪 Practical German for Everyday Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            Learn What You Actually Need in Germany
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            No archaic poetry or irrelevant theory. Master the 10 most critical real-world situations every international student, newcomer, and professional faces in Germany.
          </p>
        </div>

        {/* 10 Real Life Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {REAL_LIFE_CARDS.map((card) => {
            return (
              <div
                key={card.id}
                id={`real-life-card-${card.id}`}
                onClick={() => setActiveCard(card)}
                className="group relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Emoji & Level */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 group-hover:scale-110 group-hover:bg-red-50 transition-all">
                      {card.emoji}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      card.level === 'A1' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : card.level === 'A2'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {card.level}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-extrabold text-base text-slate-900 font-['Outfit'] group-hover:text-red-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5 line-clamp-1">
                    {card.germanTitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                {/* Footer of Card */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-red-600">
                  <span>{card.phrasesCount} Key Phrases</span>
                  <span className="p-1 rounded-lg bg-slate-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative German Culture Note Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl flex-shrink-0">
              💡
            </div>
            <div>
              <h4 className="font-bold text-base text-white">Bureaucracy & Daily Etiquette Survival Guide</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Every topic includes German legal tips, official appointment checklists, and pronunciation recordings.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveCard(REAL_LIFE_CARDS[0])}
            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs whitespace-nowrap transition-colors"
          >
            Explore Wohnung & Anmeldung Guide
          </button>
        </div>

      </div>

      {/* Expanded Modal for Selected Real Life Card */}
      {activeCard && (
        <div 
          id="real-life-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveCard(null);
          }}
        >
          <div 
            id="real-life-modal-container"
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2.5 rounded-2xl bg-white shadow-xs">
                  {activeCard.emoji}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                      {activeCard.title}
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700">
                      Level {activeCard.level}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500">{activeCard.germanTitle}</p>
                </div>
              </div>
              <button
                id="close-real-life-modal"
                onClick={() => setActiveCard(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              
              {/* Insider Germany Cultural Tip */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex gap-3 text-xs text-amber-950">
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block text-amber-900 mb-1">
                    German Culture & Legal Insight:
                  </span>
                  <p className="leading-relaxed">{activeCard.cultureTip}</p>
                </div>
              </div>

              {/* Essential Key Phrases */}
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>Essential German Phrases (Wichtige Sätze)</span>
                  <span className="text-xs text-slate-400 font-normal">Click audio to listen</span>
                </h4>
                <div className="space-y-2.5">
                  {activeCard.keyPhrases.map((phrase, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-extrabold text-slate-900">
                            {phrase.german}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5 font-medium">
                            {phrase.english}
                          </div>
                          {phrase.phonetic && (
                            <div className="text-[11px] text-slate-400 font-mono mt-1">
                              Pronunciation: {phrase.phonetic}
                            </div>
                          )}
                          {phrase.usageNote && (
                            <div className="text-[11px] text-red-600 font-medium mt-1">
                              Note: {phrase.usageNote}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleSpeak(phrase.german)}
                          disabled={playingPhrase === phrase.german}
                          className="p-2 rounded-xl bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs transition-all active:scale-95 flex-shrink-0"
                          title="Listen in German"
                        >
                          <Volume2 className={`w-4 h-4 ${playingPhrase === phrase.german ? 'text-red-600 animate-pulse' : ''}`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Realistic Dialogue */}
              {activeCard.dialogue && activeCard.dialogue.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-slate-600" />
                    <span>Real Life Dialogue (Dialog im Alltag)</span>
                  </h4>
                  <div className="space-y-2.5 p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80">
                    {activeCard.dialogue.map((turn, i) => (
                      <div key={i} className="text-xs space-y-0.5">
                        <span className="font-bold text-slate-700 block">
                          {turn.speaker}:
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-slate-900">{turn.german}</p>
                          <button
                            onClick={() => handleSpeak(turn.german)}
                            className="text-slate-400 hover:text-slate-700 p-1"
                            title="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-500 italic">{turn.english}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Unit {activeCard.id.toUpperCase()} · German Teacher Curriculum
              </span>
              <button
                onClick={() => {
                  const topic = activeCard.id;
                  setActiveCard(null);
                  if (onSelectTopicForPractice) onSelectTopicForPractice(topic);
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Practice this Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
