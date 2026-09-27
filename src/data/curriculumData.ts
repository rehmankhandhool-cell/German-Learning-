import { RealLifeCard, VocabItem, GrammarTopic, QuizQuestion, LessonUnit } from '../types';

export const REAL_LIFE_CARDS: RealLifeCard[] = [
  {
    id: 'wohnung',
    emoji: '🏠',
    title: 'Wohnung & Anmeldung',
    germanTitle: 'Wohnungssuche & Einwohnermeldeamt',
    subtitle: 'Flat hunting, rental contracts & registering your address within 14 days.',
    level: 'A1',
    phrasesCount: 14,
    cultureTip: 'In Germany, you legally must register your residential address (Anmeldung) at the Bürgeramt within 14 days of moving in. You need the "Wohnungsgeberbestätigung" signed by your landlord!',
    keyPhrases: [
      {
        german: 'Ich möchte meinen Wohnsitz anmelden.',
        english: 'I would like to register my address / residence.',
        phonetic: 'Ikh merkh-teh my-nen Vohn-zits an-mel-den.',
        usageNote: 'Crucial first sentence at the Bürgeramt appointment.'
      },
      {
        german: 'Hier ist die Wohnungsgeberbestätigung von meinem Vermieter.',
        english: 'Here is the landlord confirmation from my landlord.',
        phonetic: 'Heer ist dee Vohn-ungs-gay-ber-be-shte-tee-gung...',
        usageNote: 'Without this document, the official cannot complete your registration.'
      },
      {
        german: 'Wie hoch ist die Warmmiete inklusive Nebenkosten?',
        english: 'How much is the warm rent including utility costs?',
        phonetic: 'Vee hokh ist dee Varm-mee-teh...',
        usageNote: 'Kaltmiete = base rent. Warmmiete = base rent + heating & water.'
      },
      {
        german: 'Gibt es eine Kaution? Wie viele Monatsmieten?',
        english: 'Is there a deposit? How many months rent?',
        phonetic: 'Gibt es eye-neh Kow-tsee-ohn?',
        usageNote: 'Security deposits in Germany are legally capped at maximum 3 Kaltmieten.'
      }
    ],
    dialogue: [
      {
        speaker: 'Beamter (Official)',
        german: 'Guten Tag! Haben Sie einen Termin und Ihren Reisepass dabei?',
        english: 'Good day! Do you have an appointment and your passport with you?'
      },
      {
        speaker: 'Du (You)',
        german: 'Ja, hier ist meine Terminbestätigung und mein Pass.',
        english: 'Yes, here is my appointment confirmation and my passport.'
      },
      {
        speaker: 'Beamter (Official)',
        german: 'Haben Sie auch das Formular vom Vermieter ausgefüllt?',
        english: 'Have you also had the landlord confirmation form filled out?'
      },
      {
        speaker: 'Du (You)',
        german: 'Ja, bitte sehr. Alles ist unterschrieben.',
        english: 'Yes, here you go. Everything is signed.'
      },
      {
        speaker: 'Beamter (Official)',
        german: 'Perfekt. Hier ist Ihre Meldebestätigung. Willkommen in Deutschland!',
        english: 'Perfect. Here is your registration certificate. Welcome to Germany!'
      }
    ]
  },
  {
    id: 'bank',
    emoji: '🏦',
    title: 'Bank & Finanzen',
    germanTitle: 'Kontoeröffnung & Geldüberweisung',
    subtitle: 'Opening a current account (Girokonto), EC card & SEPA transfers.',
    level: 'A1',
    phrasesCount: 12,
    cultureTip: 'Most German employers and rental agencies require a German IBAN. Ask for a "Girokonto" with an EC-Karte (Girocard), as some small bakeries and shops do not accept Mastercard/Visa.',
    keyPhrases: [
      {
        german: 'Ich möchte ein Girokonto eröffnen.',
        english: 'I would like to open a checking / current account.',
        phonetic: 'Ikh merkh-teh eye-n Jee-ro-kon-to er-erf-nen.'
      },
      {
        german: 'Welche Dokumente und Nachweise brauchen Sie?',
        english: 'Which documents and proofs do you need?',
        phonetic: 'Vel-khe Doh-koo-men-teh brow-khen Zee?'
      },
      {
        german: 'Ich muss eine Überweisung per SEPA tätigen.',
        english: 'I need to make a bank transfer via SEPA.',
        phonetic: 'Ikh moos eye-neh Oo-ber-vye-zoong tay-tee-gen.'
      },
      {
        german: 'Kann ich mit Karte kontaktlos bezahlen?',
        english: 'Can I pay with card contactlessly?',
        phonetic: 'Kahn ikh mit Kar-teh kon-takt-lohs be-tsah-len?'
      }
    ],
    dialogue: [
      {
        speaker: 'Bankberater',
        german: 'Guten Tag, wie kann ich Ihnen heute helfen?',
        english: 'Good day, how can I help you today?'
      },
      {
        speaker: 'Du (You)',
        german: 'Guten Tag. Ich bin neu in Deutschland und möchte ein Girokonto eröffnen.',
        english: 'Good day. I am new in Germany and would like to open a checking account.'
      },
      {
        speaker: 'Bankberater',
        german: 'Gerne! Haben Sie Ihre Meldebescheinigung und Ihre Steuer-ID dabei?',
        english: 'Gladly! Do you have your registration certificate and tax ID with you?'
      },
      {
        speaker: 'Du (You)',
        german: 'Ja, hier sind meine Unterlagen und mein Pass.',
        english: 'Yes, here are my documents and my passport.'
      }
    ]
  },
  {
    id: 'doctor',
    emoji: '🏥',
    title: 'Doctor & Health',
    germanTitle: 'Beim Arzt & in der Apotheke',
    subtitle: 'Making appointments with a Hausarzt, describing symptoms & getting prescriptions.',
    level: 'A2',
    phrasesCount: 16,
    cultureTip: 'In Germany, always go to a "Hausarzt" (general practitioner) first before a specialist. Bring your health insurance card ("Gesundheitskarte"). For medication, a pink prescription is covered by public insurance, while a blue or green one is private/self-paid.',
    keyPhrases: [
      {
        german: 'Ich brauche einen Termin beim Arzt.',
        english: 'I need an appointment with the doctor.',
        phonetic: 'Ikh brow-kheh eye-nen Ter-meen bym Artst.'
      },
      {
        german: 'Ich habe seit zwei Tagen starke Halsschmerzen und Fieber.',
        english: 'I have had a severe sore throat and fever for two days.',
        phonetic: 'Ikh hah-beh zyt tsvye Tah-gen shtar-keh Hahls-shmer-tsen...'
      },
      {
        german: 'Ich brauche eine Arbeitsunfähigkeitsbescheinigung (Krankschreibung).',
        english: 'I need a sick leave certificate for my employer.',
        phonetic: 'Ikh brow-kheh eye-neh Ar-byts-oon-fay-hig-kyts-be-shy-nee-goong.'
      },
      {
        german: 'Gibt es dieses Medikament rezeptfrei in der Apotheke?',
        english: 'Is this medicine available over the counter without a prescription?',
        phonetic: 'Gibt es dee-zes Meh-dee-kah-ment reh-tsept-fry?'
      }
    ],
    dialogue: [
      {
        speaker: 'Arzthelferin',
        german: 'Praxis Dr. Weber, guten Morgen! Was kann ich für Sie tun?',
        english: 'Doctor Weber clinic, good morning! What can I do for you?'
      },
      {
        speaker: 'Du (You)',
        german: 'Guten Morgen. Ich fühle mich sehr krank und brauche heute einen Termin.',
        english: 'Good morning. I feel very sick and need an appointment today.'
      },
      {
        speaker: 'Arzthelferin',
        german: 'Sind Sie gesetzlich versichert? Bitte kommen Sie um 11:30 Uhr in unsere Akutsprechstunde.',
        english: 'Are you publicly insured? Please come at 11:30 AM to our walk-in hours.'
      }
    ]
  },
  {
    id: 'job',
    emoji: '💼',
    title: 'Job & Interview',
    germanTitle: 'Bewerbung & Arbeitsplatz',
    subtitle: 'German CV standards (Lebenslauf), interviews & understanding contracts.',
    level: 'B1',
    phrasesCount: 18,
    cultureTip: 'German CVs are typically chronological, concise, and professional. In interviews, punctuality is absolute—arriving 5-10 minutes early is standard German courtesy.',
    keyPhrases: [
      {
        german: 'Ich bewerbe mich um die Stelle als Softwareentwickler.',
        english: 'I am applying for the position as a software developer.',
        phonetic: 'Ikh be-ver-beh mikh oom dee Shtel-leh...'
      },
      {
        german: 'In meiner bisherigen Position habe ich Teams geleitet.',
        english: 'In my previous position, I led teams.',
        phonetic: 'In my-ner bis-hay-ree-gen Poh-zee-tsee-ohn...'
      },
      {
        german: 'Wie lange dauert die Probezeit im Arbeitsvertrag?',
        english: 'How long is the probationary period in the employment contract?',
        phonetic: 'Vee lahng-eh dow-ert dee Proh-be-tsyt...'
      },
      {
        german: 'Ich freue mich auf die Zusammenarbeit mit Ihrem Team.',
        english: 'I look forward to working with your team.',
        phonetic: 'Ikh froy-eh mikh owf dee Tsoo-zahm-men-ar-byt...'
      }
    ],
    dialogue: [
      {
        speaker: 'Personalchef (HR Manager)',
        german: 'Willkommen! Erzählen Sie uns bitte kurz über Ihren Werdegang.',
        english: 'Welcome! Please tell us briefly about your professional background.'
      },
      {
        speaker: 'Du (You)',
        german: 'Sehr gerne. Nach meinem Studium habe ich drei Jahre in internationalen Projekten gearbeitet.',
        english: 'With pleasure. After my studies, I worked three years in international projects.'
      },
      {
        speaker: 'Personalchef',
        german: 'Das klingt sehr gut. Warum möchten Sie gerade bei unserem Unternehmen in Frankfurt arbeiten?',
        english: 'That sounds very good. Why would you like to work specifically for our company in Frankfurt?'
      }
    ]
  },
  {
    id: 'transport',
    emoji: '🚆',
    title: 'Bus & Train',
    germanTitle: 'Öffentlicher Nahverkehr & Bahn',
    subtitle: 'Navigating Deutsche Bahn, S-Bahn, delays & buying the Deutschlandticket.',
    level: 'A1',
    phrasesCount: 14,
    cultureTip: 'The "Deutschlandticket" (€49/€58) grants unlimited travel on all local buses, trams, U-Bahns, and Regional trains (RE/RB) nationwide! Note: It does not cover long-distance ICE or IC trains.',
    keyPhrases: [
      {
        german: 'Fährt dieser Zug direkt nach München Hauptbahnhof?',
        english: 'Does this train go directly to Munich Central Station?',
        phonetic: 'Fairt dee-zer Tsoog dee-rekt nahkh Myun-khen Howpt-bahn-hohf?'
      },
      {
        german: 'Von welchem Gleis fährt die Regionalbahn ab?',
        english: 'From which track / platform does the regional train depart?',
        phonetic: 'Fon vel-khem Glys fairt dee Reh-gee-oh-nahl-bahn ahb?'
      },
      {
        german: 'Der Zug hat leider 20 Minuten Verspätung.',
        english: 'Unfortunately the train has a 20-minute delay.',
        phonetic: 'Dair Tsoog haht ly-der tsvahn-tsikh Mee-noo-ten Fair-shpay-toong.'
      },
      {
        german: 'Muss ich in Hannover umsteigen?',
        english: 'Do I have to transfer / change trains in Hannover?',
        phonetic: 'Moos ikh in Hah-noh-ver oom-shty-gen?'
      }
    ],
    dialogue: [
      {
        speaker: 'Fahrkartenkontrollleur',
        german: 'Guten Tag, Ihre Fahrscheine bitte!',
        english: 'Good day, tickets please!'
      },
      {
        speaker: 'Du (You)',
        german: 'Hier bitte, mein Deutschlandticket auf dem Smartphone.',
        english: 'Here you go, my Deutschlandticket on my smartphone.'
      },
      {
        speaker: 'Fahrkartenkontrollleur',
        german: 'Danke schön, alles in Ordnung. Gute Weiterfahrt!',
        english: 'Thank you very much, everything is in order. Have a good onward journey!'
      }
    ]
  },
  {
    id: 'shopping',
    emoji: '🛒',
    title: 'Shopping & Supermarket',
    germanTitle: 'Einkaufen & Supermarkt',
    subtitle: 'Pfand bottles, payment etiquette, bakery orders & grocery essentials.',
    level: 'A1',
    phrasesCount: 15,
    cultureTip: 'In Germany, glass and plastic bottles usually have a "Pfand" (deposit of €0.08 to €0.25). Return them at the automatic Pfandautomat at the supermarket entrance for a cash voucher!',
    keyPhrases: [
      {
        german: 'Ich möchte bitte zwei Brötchen und ein Vollkornbrot.',
        english: 'I would like two bread rolls and one whole grain bread, please.',
        phonetic: 'Ikh merkh-teh bit-teh tsvye Brert-khen oond eye-n Foll-korn-broht.'
      },
      {
        german: 'Wo finde ich den Pfandautomaten?',
        english: 'Where can I find the bottle deposit machine?',
        phonetic: 'Voh fin-deh ikh dain Pfahnd-ow-toh-mah-ten?'
      },
      {
        german: 'Zahlen Sie bar oder mit Karte?',
        english: 'Are you paying cash or by card?',
        phonetic: 'Tsah-len Zee bahr oh-der mit Kar-teh?'
      },
      {
        german: 'Brauchen Sie den Kassenbon?',
        english: 'Do you need the receipt?',
        phonetic: 'Brow-khen Zee dain Kahs-sen-bon?'
      }
    ],
    dialogue: [
      {
        speaker: 'Kassiererin (Cashier)',
        german: 'Hallo! Haben Sie eine Kundenkarte?',
        english: 'Hello! Do you have a loyalty card?'
      },
      {
        speaker: 'Du (You)',
        german: 'Nein, habe ich nicht. Ich habe hier noch einen Pfandbon.',
        english: 'No, I don’t. I also have a bottle deposit voucher here.'
      },
      {
        speaker: 'Kassiererin',
        german: 'Sehr gut, das macht dann zusammen 14 Euro 20.',
        english: 'Very good, that comes to a total of 14 euros and 20 cents.'
      },
      {
        speaker: 'Du (You)',
        german: 'Mit Karte, bitte.',
        english: 'With card, please.'
      }
    ]
  },
  {
    id: 'university',
    emoji: '🎓',
    title: 'University & Campus',
    germanTitle: 'Universität & Studentenleben',
    subtitle: 'Enrollment (Immatrikulation), Mensa, lectures & exams.',
    level: 'B1',
    phrasesCount: 14,
    cultureTip: 'German university lectures ("Vorlesungen") have a tradition: at the end of class, students knock on the wooden desks ("auf den Tisch klopfen") instead of clapping to thank the professor!',
    keyPhrases: [
      {
        german: 'Wo kann ich mich für das Wintersemester immatrikulieren?',
        english: 'Where can I enroll for the winter semester?',
        phonetic: 'Voh kahn ikh mikh fur dahs Vin-ter-zeh-mes-ter im-mah-tree-koo-lee-ren?'
      },
      {
        german: 'Wie lade ich meine Mensakarte mit Guthaben auf?',
        english: 'How do I top up my cafeteria card with credit?',
        phonetic: 'Vee lah-deh ikh my-neh Men-zah-kar-teh owf?'
      },
      {
        german: 'Wann ist die Anmeldefrist für die Klausur?',
        english: 'When is the registration deadline for the exam?',
        phonetic: 'Vahn ist dee Ahn-mel-deh-frist fur dee Klow-zoor?'
      },
      {
        german: 'Können wir eine Lerngruppe in der Universitätsbibliothek bilden?',
        english: 'Can we form a study group in the university library?',
        phonetic: 'Kern-nen veer eye-neh Lairn-groop-peh bil-den?'
      }
    ],
    dialogue: [
      {
        speaker: 'Kommilitone (Fellow Student)',
        german: 'Hi! Gehst du nach der Vorlesung mit in die Mensa?',
        english: 'Hi! Are you coming to the cafeteria after the lecture?'
      },
      {
        speaker: 'Du (You)',
        german: 'Sehr gerne! Gibt es heute eine vegetarische Option?',
        english: 'With pleasure! Is there a vegetarian option today?'
      },
      {
        speaker: 'Kommilitone',
        german: 'Ja, das Curry soll heute super sein. Lass uns um 12 treffen!',
        english: 'Yes, the curry is supposed to be great today. Let’s meet at 12!'
      }
    ]
  },
  {
    id: 'phone',
    emoji: '📞',
    title: 'Phone Calls',
    germanTitle: 'Telefonieren auf Deutsch',
    subtitle: 'Formal greetings, asking someone to repeat & customer service.',
    level: 'A2',
    phrasesCount: 15,
    cultureTip: 'When answering the phone in Germany, it is polite to state your surname first (e.g. "Müller, guten Tag!") rather than just saying "Hallo".',
    keyPhrases: [
      {
        german: 'Guten Tag, mein Name ist [Nachname]. Ich rufe wegen Ihrer Anzeige an.',
        english: 'Good day, my name is [Surname]. I am calling regarding your advertisement.',
        phonetic: 'Goo-ten Tahg, my-n Nah-meh ist... Ikh roo-feh veh-gen...'
      },
      {
        german: 'Könnten Sie das bitte etwas langsamer wiederholen?',
        english: 'Could you please repeat that a little more slowly?',
        phonetic: 'Kern-ten Zee dahs bit-teh et-vahs lahng-zah-mer vee-der-hoh-len?'
      },
      {
        german: 'Ich habe Sie leider akustisch nicht verstanden.',
        english: 'Unfortunately, I did not catch that acoustically.',
        phonetic: 'Ikh hah-beh Zee ly-der ah-koos-teesh nikht fair-shtahn-den.'
      },
      {
        german: 'Können Sie mich bitte mit Frau Schmidt verbinden?',
        english: 'Could you please connect me with Ms. Schmidt?',
        phonetic: 'Kern-nen Zee mikh bit-teh mit Frow Shmit fair-bin-den?'
      }
    ],
    dialogue: [
      {
        speaker: 'Kundenservice',
        german: 'Kundenservice Telekom, mein Name ist Meier. Was kann ich für Sie tun?',
        english: 'Telekom Customer Service, my name is Meier. What can I do for you?'
      },
      {
        speaker: 'Du (You)',
        german: 'Guten Tag Herr Meier. Mein Internetanschluss funktioniert seit heute Morgen leider nicht mehr.',
        english: 'Good day Mr. Meier. Unfortunately my internet connection stopped working this morning.'
      },
      {
        speaker: 'Kundenservice',
        german: 'Kein Problem, nennen Sie mir bitte Ihre Kundennummer.',
        english: 'No problem, please tell me your customer number.'
      }
    ]
  },
  {
    id: 'auslaenderbehoerde',
    emoji: '🏛️',
    title: 'Ausländerbehörde',
    germanTitle: 'Ausländerbehörde & Aufenthaltstitel',
    subtitle: 'Residence permits, visa extensions, appointments & required paperwork.',
    level: 'B1',
    phrasesCount: 16,
    cultureTip: 'Appointments at the immigration office (Ausländerbehörde) can take months to secure in major cities like Berlin or Munich. Always bring originals plus paper copies of all bank statements, work contracts, and insurance policies in a dedicated folder.',
    keyPhrases: [
      {
        german: 'Ich bin hier für meinen Termin zur Verlängerung meines Aufenthaltstitels.',
        english: 'I am here for my appointment to extend my residence permit.',
        phonetic: 'Ikh bin heer fur my-nen Ter-meen tsoor Fair-layng-eh-roong...'
      },
      {
        german: 'Hier sind mein Arbeitsvertrag und die Gehaltsabrechnungen der letzten drei Monate.',
        english: 'Here are my employment contract and the salary slips of the last three months.',
        phonetic: 'Heer zint my-n Ar-byts-fair-trahg...'
      },
      {
        german: 'Wann erhalte ich die elektronische Aufenthaltskarte (eAT)?',
        english: 'When will I receive the electronic residence card?',
        phonetic: 'Vahn er-hahl-teh ikh dee eh-lek-troh-nee-sheh...'
      },
      {
        german: 'Bekomme ich eine Fiktionsbescheinigung, während der Antrag bearbeitet wird?',
        english: 'Will I get a fictitious certificate (provisional extension) while the application is processed?',
        phonetic: 'Be-kom-meh ikh eye-neh Fik-tsee-ohns-be-shy-nee-goong...?'
      }
    ],
    dialogue: [
      {
        speaker: 'Sachbearbeiterin',
        german: 'Nummer 412 bitte an Schalter 4. Guten Tag, Ihre Unterlagen bitte.',
        english: 'Number 412 please to window 4. Good day, your documents please.'
      },
      {
        speaker: 'Du (You)',
        german: 'Guten Tag. Hier ist meine Mappe mit Pass, Foto, Mietvertrag und Arbeitsvertrag.',
        english: 'Good day. Here is my folder with passport, biometric photo, rental contract, and work contract.'
      },
      {
        speaker: 'Sachbearbeiterin',
        german: 'Vielen Dank. Wir nehmen jetzt Ihre Fingerabdrücke für den elektronischen Aufenthaltstitel.',
        english: 'Thank you. We will now take your fingerprints for the electronic residence title.'
      }
    ]
  },
  {
    id: 'restaurant',
    emoji: '🍽️',
    title: 'Restaurant & Café',
    germanTitle: 'Im Restaurant & Bestellen',
    subtitle: 'Ordering, paying separately ("Zusammen oder getrennt?"), and German tipping etiquette.',
    level: 'A1',
    phrasesCount: 15,
    cultureTip: 'In Germany, tap water is not automatically served free. Also, tipping is usually 5-10% rounded up to the nearest whole euro. When paying, state the total with tip directly to the waiter: e.g. if the bill is €27.40, say "Machen wir 30 Euro, bitte" or "Stimmt so!"',
    keyPhrases: [
      {
        german: 'Haben Sie einen Tisch für zwei Personen frei?',
        english: 'Do you have a table for two people free?',
        phonetic: 'Hah-ben Zee eye-nen Teesh fur tsvye Pair-zoh-nen fry?'
      },
      {
        german: 'Ich hätte gern das Schnitzel mit Kartoffelsalat und ein Mineralwasser mit Kohlensäure.',
        english: 'I would like the schnitzel with potato salad and sparkling mineral water.',
        phonetic: 'Ikh het-teh gairn dahs Shnit-tsel...'
      },
      {
        german: 'Wir möchten bitte zahlen. Zusammen oder getrennt? – Getrennt, bitte!',
        english: 'We would like to pay, please. Together or separately? – Separately, please!',
        phonetic: 'Veer merkh-ten bit-teh tsah-len. Tsoo-zahm-men oh-der geh-trent?'
      },
      {
        german: 'Stimmt so, danke!',
        english: 'Keep the change / that is fine, thank you!',
        phonetic: 'Shteemt zoh, dahn-keh!'
      }
    ],
    dialogue: [
      {
        speaker: 'Kellner (Waiter)',
        german: 'Guten Abend! Was darf ich Ihnen zu trinken bringen?',
        english: 'Good evening! What may I bring you to drink?'
      },
      {
        speaker: 'Du (You)',
        german: 'Guten Abend. Ein großes Apfelschorle bitte.',
        english: 'Good evening. A large apple spritzer, please.'
      },
      {
        speaker: 'Kellner',
        german: 'Sehr gern. Haben Sie sich schon für ein Hauptgericht entschieden?',
        english: 'Very gladly. Have you already decided on a main dish?'
      },
      {
        speaker: 'Du (You)',
        german: 'Ja, die Käsespätzle mit Röstzwiebeln bitte.',
        english: 'Yes, the cheese spaetzle with roasted onions, please.'
      }
    ]
  }
];

export const CEFR_LEVELS = [
  {
    level: 'A1' as const,
    name: 'Beginner / Einstieg',
    target: 'Survival German',
    hours: '80-100 Hours',
    description: 'Understand and use familiar everyday expressions and very basic phrases for everyday survival in Germany.',
    topics: ['Alphabet & Pronunciation', 'Personal Introductions', 'Numbers & Time', 'Shopping & Prices', 'Food & Ordering', 'Basic Directions'],
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    milestones: 'Register address, buy groceries, ask for directions, introduce yourself to neighbors.'
  },
  {
    level: 'A2' as const,
    name: 'Elementary / Grundlagen',
    target: 'Daily Routine German',
    hours: '120-150 Hours',
    description: 'Communicate in simple, routine tasks requiring a direct exchange of information on familiar matters.',
    topics: ['Doctor & Symptoms', 'Past Tense (Perfekt)', 'Housing & Furniture', 'Public Transport', 'Modal Verbs', 'Weather & Travel'],
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    milestones: 'Handle appointments with doctors, understand train announcements, speak with bank clerks.'
  },
  {
    level: 'B1' as const,
    name: 'Intermediate / Selbstständig',
    target: 'Independent Living',
    hours: '150-200 Hours',
    description: 'The golden threshold for German citizenship and permanent residency! Speak fluently on familiar topics and work.',
    topics: ['Job Applications & CVs', 'Ausländerbehörde & Visas', 'Subordinate Clauses (Nebensätze)', 'Expressing Opinions', 'Dative & Accusative Mastery', 'Workplace Culture'],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    milestones: 'Pass official Goethe / Telc B1 exam, qualify for citizenship/PR, manage professional emails.'
  },
  {
    level: 'B2' as const,
    name: 'Upper Intermediate / Beruflich',
    target: 'Professional & Academic',
    hours: '200-240 Hours',
    description: 'Understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in your field.',
    topics: ['Complex Business Negotiations', 'University Lectures', 'Passiv & Konjunktiv II', 'Idiomatic Expressions', 'Formal Written Reports', 'Nuanced Debate'],
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    milestones: 'Study at German universities without language barrier, lead client meetings, negotiate contracts.'
  }
];

export const VOCABULARY_ITEMS: VocabItem[] = [
  {
    id: 'v1',
    article: 'die',
    word: 'Anmeldung',
    plural: 'die Anmeldungen',
    translation: 'city address registration',
    category: 'Housing',
    level: 'A1',
    exampleGerman: 'Haben Sie die Anmeldung beim Bürgeramt gemacht?',
    exampleEnglish: 'Did you complete the address registration at the citizens office?'
  },
  {
    id: 'v2',
    article: 'das',
    word: 'Girokonto',
    plural: 'die Girokonten',
    translation: 'checking / current bank account',
    category: 'Bank',
    level: 'A1',
    exampleGerman: 'Mein Gehalt wird direkt auf das Girokonto überwiesen.',
    exampleEnglish: 'My salary is transferred directly to the checking account.'
  },
  {
    id: 'v3',
    article: 'der',
    word: 'Arbeitsvertrag',
    plural: 'die Arbeitsverträge',
    translation: 'employment contract',
    category: 'Work',
    level: 'B1',
    exampleGerman: 'Ich habe gestern meinen neuen Arbeitsvertrag unterschrieben.',
    exampleEnglish: 'I signed my new employment contract yesterday.'
  },
  {
    id: 'v4',
    article: 'die',
    word: 'Krankenkasse',
    plural: 'die Krankenkassen',
    translation: 'health insurance provider',
    category: 'Health',
    level: 'A2',
    exampleGerman: 'Die Krankenkasse übernimmt die Kosten für den Arztbesuch.',
    exampleEnglish: 'The health insurance covers the costs for the doctor visit.'
  },
  {
    id: 'v5',
    article: 'der',
    word: 'Pfandautomat',
    plural: 'die Pfandautomaten',
    translation: 'bottle return machine',
    category: 'Everyday',
    level: 'A1',
    exampleGerman: 'Der Pfandautomat steht gleich am Eingang des Supermarkts.',
    exampleEnglish: 'The bottle return machine is right at the entrance of the supermarket.'
  },
  {
    id: 'v6',
    article: 'das',
    word: 'Vorstellungsgespräch',
    plural: 'die Vorstellungsgespräche',
    translation: 'job interview',
    category: 'Work',
    level: 'B1',
    exampleGerman: 'Ich bereite mich auf mein Vorstellungsgespräch am Montag vor.',
    exampleEnglish: 'I am preparing for my job interview on Monday.'
  },
  {
    id: 'v7',
    article: 'die',
    word: 'Verspätung',
    plural: 'die Verspätungen',
    translation: 'delay',
    category: 'Travel',
    level: 'A1',
    exampleGerman: 'Wegen einer Signalstörung hat der Zug 15 Minuten Verspätung.',
    exampleEnglish: 'Due to a signal fault, the train has a 15-minute delay.'
  },
  {
    id: 'v8',
    article: 'der',
    word: 'Aufenthaltstitel',
    plural: 'die Aufenthaltstitel',
    translation: 'residence permit / visa card',
    category: 'Bureaucracy',
    level: 'B1',
    exampleGerman: 'Mein Aufenthaltstitel ist für zwei Jahre gültig.',
    exampleEnglish: 'My residence permit is valid for two years.'
  },
  {
    id: 'v9',
    article: 'das',
    word: 'Rezept',
    plural: 'die Rezepte',
    translation: 'medical prescription / recipe',
    category: 'Health',
    level: 'A2',
    exampleGerman: 'Der Arzt hat mir ein Rezept für Antibiotika gegeben.',
    exampleEnglish: 'The doctor gave me a prescription for antibiotics.'
  },
  {
    id: 'v10',
    article: 'die',
    word: 'Warmmiete',
    plural: 'die Warmmieten',
    translation: 'total rent including heating/utilities',
    category: 'Housing',
    level: 'A1',
    exampleGerman: 'Die Warmmiete beträgt 850 Euro im Monat.',
    exampleEnglish: 'The total rent with heating is 850 euros per month.'
  },
  {
    id: 'v11',
    article: 'der',
    word: 'Kassenbon',
    plural: 'die Kassenbons',
    translation: 'purchase receipt / checkout slip',
    category: 'Everyday',
    level: 'A1',
    exampleGerman: 'Möchten Sie den Kassenbon mitnehmen?',
    exampleEnglish: 'Would you like to take the receipt with you?'
  },
  {
    id: 'v12',
    article: 'das',
    word: 'Trinkgeld',
    plural: 'die Trinkgelder',
    translation: 'tip / gratuity',
    category: 'Food',
    level: 'A1',
    exampleGerman: 'In Deutschland gibt man im Restaurant üblicherweise 5 bis 10 Prozent Trinkgeld.',
    exampleEnglish: 'In Germany one usually gives 5 to 10 percent tip in restaurants.'
  }
];

export const GRAMMAR_LESSONS: GrammarTopic[] = [
  {
    id: 'cases',
    title: 'The 4 German Cases Made Simple',
    germanTitle: 'Die 4 Fälle (Kasus)',
    level: 'A1',
    summary: 'Master Nominativ (Subject), Akkusativ (Direct Object), Dativ (Indirect Object/Location), and Genitiv (Possession).',
    rules: [
      {
        label: '1. Nominativ (Who is doing the action?)',
        explanation: 'The subject of the sentence. Articles: der, die, das, die (pl).',
        exampleGerman: 'Der Lehrer erklärt die Grammatik.',
        exampleEnglish: 'The teacher explains the grammar.'
      },
      {
        label: '2. Akkusativ (What or whom is directly affected?)',
        explanation: 'Only masculine changes: der becomes DEN! (die, das, die pl stay identical).',
        exampleGerman: 'Ich trinke den Kaffee und esse den Apfel.',
        exampleEnglish: 'I drink the coffee and eat the apple.'
      },
      {
        label: '3. Dativ (To whom? Or static position with an, auf, in...)',
        explanation: 'der → dem, das → dem, die → der, die (pl) → den + n.',
        exampleGerman: 'Ich helfe dem Studenten mit der Wohnung.',
        exampleEnglish: 'I help the student with the apartment.'
      },
      {
        label: '4. Genitiv (Whose? Possession)',
        explanation: 'der → des (+s), das → des (+s), die → der, die (pl) → der.',
        exampleGerman: 'Das Auto des Chefs parkt vor der Tür.',
        exampleEnglish: 'The car of the boss is parked in front of the door.'
      }
    ],
    cheatSheetTable: {
      headers: ['Case', 'Masculine (Maskulin)', 'Feminine (Feminin)', 'Neuter (Neutral)', 'Plural'],
      rows: [
        ['Nominativ', 'der / ein', 'die / eine', 'das / ein', 'die / keine'],
        ['Akkusativ', 'den / einen', 'die / eine', 'das / ein', 'die / keine'],
        ['Dativ', 'dem / einem', 'der / einer', 'dem / einem', 'den (+n) / keinen'],
        ['Genitiv', 'des (+s) / eines', 'der / einer', 'des (+s) / eines', 'der / keiner']
      ]
    }
  },
  {
    id: 'word-order',
    title: 'Word Order & The Verb Second (V2) Rule',
    germanTitle: 'Satzbau & Verbstellung',
    level: 'A1',
    summary: 'In standard German main clauses, the conjugated verb is ALWAYS in Position 2! In subordinate clauses with "weil" or "dass", it goes to the very end.',
    rules: [
      {
        label: 'Main Clause: Verb in Position 2',
        explanation: 'No matter what comes first (time, subject, place), the verb stays locked in Position 2.',
        exampleGerman: 'Heute lerne ich Deutsch. / Ich lerne heute Deutsch.',
        exampleEnglish: 'Today I learn German. / I learn German today.'
      },
      {
        label: 'Subordinate Clauses (Nebensätze) with "weil", "dass", "ob"',
        explanation: 'These conjunctions kick the conjugated verb to the very end of the sentence!',
        exampleGerman: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.',
        exampleEnglish: 'I am learning German because I would like to work in Germany.'
      }
    ]
  },
  {
    id: 'modal-verbs',
    title: 'Modal Verbs (können, müssen, wollen, dürfen)',
    germanTitle: 'Die Modalverben',
    level: 'A2',
    summary: 'Express ability (können), necessity (müssen), permission (dürfen), and desire (wollen/möchten).',
    rules: [
      {
        label: 'Verb Bracket Structure',
        explanation: 'The modal verb takes Position 2, and the second action verb goes in infinitive form to the very end!',
        exampleGerman: 'Wir müssen heute die Anmeldung beim Amt machen.',
        exampleEnglish: 'We have to do the registration at the office today.'
      },
      {
        label: 'Dürfen vs Müssen in Germany',
        explanation: '"Hier darf man nicht parken" = parking is prohibited. "Man muss" = mandatory.',
        exampleGerman: 'Hier dürfen Sie kostenlos parken.',
        exampleEnglish: 'You are allowed to park here for free.'
      }
    ]
  },
  {
    id: 'separable-verbs',
    title: 'Separable Verbs (Trennbare Verben)',
    germanTitle: 'Trennbare Verben',
    level: 'A2',
    summary: 'Verbs with prefixes like auf-, an-, ab-, mit-, ein- split apart in simple present tense!',
    rules: [
      {
        label: 'Prefix goes to the end!',
        explanation: 'Base verb conjugates at Position 2, while the prefix moves to the very end of the clause.',
        exampleGerman: 'Der Zug kommt um 14 Uhr in Berlin an. (ankommen)',
        exampleEnglish: 'The train arrives in Berlin at 2 PM. (to arrive)'
      },
      {
        label: 'Common examples in daily German',
        explanation: 'anrufen (to call), einkaufen (to shop), mitbringen (to bring along), umsteigen (to transfer).',
        exampleGerman: 'Ich rufe morgen bei der Bank an.',
        exampleEnglish: 'I will call the bank tomorrow.'
      }
    ]
  }
];

export const PRACTICE_QUIZZES: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Which article is correct for "Wohnung" (Apartment)?',
    contextGerman: 'Ich suche ___ günstige Wohnung in Köln.',
    options: ['der', 'die', 'das', 'den'],
    correctIndex: 1,
    explanation: 'Words ending in -ung are always feminine in German: "die Wohnung".',
    category: 'Articles'
  },
  {
    id: 'q2',
    prompt: 'You are at the doctor. How do you say "I have a sore throat"?',
    contextGerman: 'Beim Hausarzt:',
    options: [
      'Ich habe Halsschmerzen.',
      'Mein Hals ist verboten.',
      'Ich mache Halsschmerzen.',
      'Ich trinke meinen Hals.'
    ],
    correctIndex: 0,
    explanation: '"Ich habe Halsschmerzen" is the natural, polite German expression to report a sore throat.',
    category: 'Real-Life Doctor'
  },
  {
    id: 'q3',
    prompt: 'Complete with correct Akkusativ case: "Ich trinke ___ Kaffee."',
    contextGerman: 'Kaffee is masculine (der Kaffee). In Akkusativ:',
    options: ['der', 'den', 'dem', 'des'],
    correctIndex: 1,
    explanation: 'Masculine articles in the direct object (Akkusativ) change from "der" to "den" (or "einen").',
    category: 'Grammar Cases'
  },
  {
    id: 'q4',
    prompt: 'What should you say in a German restaurant to tell the waiter to keep the change?',
    contextGerman: 'Rechnung ist 18,50 Euro, du gibst 20 Euro:',
    options: [
      'Stimmt so, danke!',
      'Geld ist weg!',
      'Nehmen Sie alles.',
      'Wiedersehen bitte.'
    ],
    correctIndex: 0,
    explanation: '"Stimmt so!" (That is fine / keep the change) is the universal polite German phrase when rounding up.',
    category: 'Cultural Etiquette'
  },
  {
    id: 'q5',
    prompt: 'Where does the verb go after the conjunction "weil" (because)?',
    contextGerman: 'Ich lerne Deutsch, weil ich in Deutschland ___ (leben).',
    options: [
      'Position 1 (am Anfang)',
      'Position 2 (nach weil)',
      'At the very end of the subordinate clause (lebe)',
      'Anywhere you prefer'
    ],
    correctIndex: 2,
    explanation: '"Weil" is a subordinating conjunction (Kausalsatz) and sends the conjugated verb straight to the end.',
    category: 'Word Order'
  }
];

export const SPEAKING_DRILLS = [
  {
    id: 's1',
    title: 'Mastering the German "CH" Sounds (Ich-Laut vs Ach-Laut)',
    description: 'Learn the difference between the soft "ich" (after e, i, ä, ö, ü) and hard throat "ach" (after a, o, u).',
    phrases: [
      { text: 'Ich möchte ein Glas Milch trinken.', translation: 'I would like to drink a glass of milk.' },
      { text: 'Achtung auf dem Bahnsteig!', translation: 'Attention on the train platform!' },
      { text: 'Kochen macht mich glücklich.', translation: 'Cooking makes me happy.' }
    ]
  },
  {
    id: 's2',
    title: 'The German Umlauts (Ä, Ö, Ü)',
    description: 'Shape your lips for "O" but try saying "E" to produce the famous German "Ö" sound!',
    phrases: [
      { text: 'Schöne Grüße aus München!', translation: 'Warm greetings from Munich!' },
      { text: 'Können Sie die Tür öffnen?', translation: 'Could you open the door?' },
      { text: 'Fünf Brötchen für das Frühstück.', translation: 'Five bread rolls for breakfast.' }
    ]
  },
  {
    id: 's3',
    title: 'German Tongue Twisters (Zungenbrecher)',
    description: 'The ultimate speech workout used by German actors and news anchors to build crisp articulation.',
    phrases: [
      { text: 'Fischers Fritz fischt frische Fische, frische Fische fischt Fischers Fritz.', translation: 'Fisherman Fritz fishes fresh fish, fresh fish fishes fisherman Fritz.' },
      { text: 'Braune Bären brummen beim Beerenpflücken.', translation: 'Brown bears growl while picking berries.' }
    ]
  }
];

export const RECENT_LESSONS: LessonUnit[] = [
  {
    id: 'l1',
    level: 'A1',
    title: 'Lesson 1: Greetings & Saying Where You Are From',
    germanTitle: 'Begrüßung & Herkunft',
    durationMinutes: 12,
    completed: true,
    description: 'Master Guten Tag, Hallo, Grüß Gott, and "Ich komme aus..."',
    topics: ['Begrüßung', 'Höflichkeit', 'Ländernamen']
  },
  {
    id: 'l2',
    level: 'A1',
    title: 'Lesson 2: Numbers, Money & Supermarket Checkout',
    germanTitle: 'Zahlen, Preise & Pfand',
    durationMinutes: 15,
    completed: true,
    description: 'Counting in German (einundzwanzig!), euros, and cash vs card.',
    topics: ['Zahlen 1-100', 'Preise', 'Pfandsystem']
  },
  {
    id: 'l3',
    level: 'A1',
    title: 'Lesson 3: Apartment Hunting & The Anmeldung Process',
    germanTitle: 'Wohnungssuche & Bürgeramt',
    durationMinutes: 18,
    completed: true,
    description: 'Key vocabulary for renting and registering at the Einwohnermeldeamt.',
    topics: ['Kaltmiete', 'Kaution', 'Termin buchen']
  },
  {
    id: 'l4',
    level: 'A1',
    title: 'Lesson 4: Ordering at a German Bakery & Restaurant',
    germanTitle: 'Im Restaurant & Bäckerei',
    durationMinutes: 15,
    completed: false,
    description: 'Ordering rolls, pretzels, coffee, and paying with tip.',
    topics: ['Bestellen', 'Speisekarte', 'Trinkgeld']
  },
  {
    id: 'l5',
    level: 'A2',
    title: 'Lesson 5: Visiting the Doctor & Pharmacy Essentials',
    germanTitle: 'Beim Hausarzt & Apotheke',
    durationMinutes: 20,
    completed: false,
    description: 'Explaining symptoms, Krankschreibung, and picking up medication.',
    topics: ['Symptome', 'Krankenkasse', 'Rezept']
  }
];
