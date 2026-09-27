import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Building2, 
  GraduationCap, 
  Compass, 
  MessageSquareText, 
  ArrowRight 
} from 'lucide-react';
import { NavSection } from '../Navbar';

export interface SEOGuideItem {
  id: string;
  path: string;
  section: NavSection;
  title: string;
  shortDesc: string;
  tag: string;
  icon: React.ReactNode;
}

export const SEO_GUIDES: SEOGuideItem[] = [
  {
    id: 'a1',
    path: '/learn-german-a1',
    section: 'public-a1',
    title: 'Learn German A1',
    shortDesc: 'Beginner German grammar, 500+ core words, greetings, numbers, and CEFR roadmap.',
    tag: 'Beginner A1',
    icon: <BookOpen className="w-5 h-5 text-blue-600" />
  },
  {
    id: 'vocabulary',
    path: '/german-vocabulary',
    section: 'public-vocabulary',
    title: 'German Vocabulary & Articles',
    shortDesc: 'Master der, die, das gender articles with everyday words, example sentences, and audio.',
    tag: 'Vocabulary Bank',
    icon: <Layers className="w-5 h-5 text-amber-500" />
  },
  {
    id: 'anmeldung',
    path: '/german-for-anmeldung',
    section: 'public-anmeldung',
    title: 'Anmeldung & Bürgeramt German',
    shortDesc: 'Essential phrases, required documents, and appointment dialogue for city registration in Germany.',
    tag: 'Bureaucracy',
    icon: <Building2 className="w-5 h-5 text-red-600" />
  },
  {
    id: 'students',
    path: '/german-for-international-students',
    section: 'public-students',
    title: 'German for International Students',
    shortDesc: 'Campus vocabulary, professors, Mensa, WG living, and student jobs (Werkstudent/Minijob).',
    tag: 'University Life',
    icon: <GraduationCap className="w-5 h-5 text-indigo-600" />
  },
  {
    id: 'living',
    path: '/german-for-living-in-germany',
    section: 'public-living',
    title: 'German for Living in Germany',
    shortDesc: 'Everyday German for apartments, doctors, banking, supermarkets, transport, and emergencies.',
    tag: 'Daily Living',
    icon: <Compass className="w-5 h-5 text-emerald-600" />
  },
  {
    id: 'conversation',
    path: '/german-conversation-practice',
    section: 'public-conversation',
    title: 'German Conversation Practice',
    shortDesc: 'Roleplay real German scenarios with instant AI feedback, speech recognition, and corrections.',
    tag: 'Roleplay & Speaking',
    icon: <MessageSquareText className="w-5 h-5 text-purple-600" />
  }
];

interface PublicSEOCrossLinksProps {
  currentPath: string;
  onNavigate: (section: NavSection) => void;
}

export const PublicSEOCrossLinks: React.FC<PublicSEOCrossLinksProps> = ({
  currentPath,
  onNavigate
}) => {
  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
          <span>📚</span>
          <span>Free Public Guides</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
          Explore More Practical German Guides
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Everything you need to navigate everyday life, studies, and bureaucracy in Germany.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SEO_GUIDES.map((guide) => {
          const isActive = guide.path === currentPath;
          return (
            <a
              key={guide.id}
              href={guide.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(guide.section);
              }}
              className={`group p-5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-white border-slate-200 hover:border-red-500/50 hover:shadow-sm text-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isActive ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    {guide.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-700'}`}>
                    {guide.tag}
                  </span>
                </div>
                <h4 className={`text-base font-bold mb-1.5 ${isActive ? 'text-white' : 'text-slate-900 group-hover:text-red-600 transition-colors'}`}>
                  {guide.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                  {guide.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100/10 flex items-center gap-1 text-xs font-semibold">
                <span className={isActive ? 'text-amber-300' : 'text-red-600 group-hover:underline'}>
                  {isActive ? 'Currently Viewing' : 'Read Guide'}
                </span>
                {!isActive && <ArrowRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-0.5 transition-transform" />}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
