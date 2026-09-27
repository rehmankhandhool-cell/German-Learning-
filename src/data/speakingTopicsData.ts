import { SpeakingTopic } from '../types';

export const SPEAKING_TOPICS_DATA: SpeakingTopic[] = [
  {
    id: 'introduce-yourself',
    title: 'Introduce Yourself',
    subtitle: 'Name, origin, profession & hobbies',
    category: 'A1 Basics',
    iconName: 'UserCheck',
    instruction: 'Introduce yourself politely in German by stating your name, home country, and where you live or work.',
    phrases: [
      {
        id: 'iy-1',
        german: 'Hallo, mein Name ist Alex und ich komme aus Spanien.',
        english: 'Hello, my name is Alex and I come from Spain.',
        phoneticHint: 'hah-lo, mine NAH-muh ist ah-leks oont ikh KOM-muh ows SHPAH-nee-en'
      },
      {
        id: 'iy-2',
        german: 'Ich wohne seit sechs Monaten in Berlin und lerne fleißig Deutsch.',
        english: 'I have been living in Berlin for six months and am diligently learning German.',
        phoneticHint: 'ikh VOH-nuh zyt zeks MOH-nah-ten in bare-LEEN oont LAIR-nuh FLY-sikh doytsh'
      },
      {
        id: 'iy-3',
        german: 'Ich arbeite als Softwareentwickler und spreche fließend Englisch.',
        english: 'I work as a software developer and speak fluent English.',
        phoneticHint: 'ikh AHR-by-tuh ahls ZOFT-wair-ent-vik-ler oont SHPREKH-uh FLEE-sent ENG-lish'
      }
    ]
  },
  {
    id: 'at-the-restaurant',
    title: 'At the Restaurant',
    subtitle: 'Reservations, ordering & paying',
    category: 'Dining & Food',
    iconName: 'UtensilsCrossed',
    instruction: 'Practice ordering your meal, asking for the menu, and requesting the bill with standard polite phrasing.',
    phrases: [
      {
        id: 'ar-1',
        german: 'Guten Abend, ich hätte gerne einen Tisch für zwei Personen, bitte.',
        english: 'Good evening, I would like a table for two people, please.',
        phoneticHint: 'GOO-ten AH-bent, ikh HET-tuh GAIR-nuh EYE-nen tish feur tsvy pair-ZOH-nen, BIT-tuh'
      },
      {
        id: 'ar-2',
        german: 'Könnte ich bitte die Speisekarte und ein Glas stilles Wasser bekommen?',
        english: 'Could I please get the menu and a glass of still water?',
        phoneticHint: 'KEURN-tuh ikh BIT-tuh dee SHPY-zuh-kar-tuh oont eye-n glahs SHTIL-les VAH-ser buh-KOM-men'
      },
      {
        id: 'ar-3',
        german: 'Entschuldigung, wir möchten gerne zahlen. Zusammen oder getrennt?',
        english: 'Excuse me, we would like to pay. Together or separately?',
        phoneticHint: 'ent-SHOOL-dee-goong, veer MEURKH-ten GAIR-nuh TSAH-len. tsoo-ZAHM-men OH-der guh-TRENT'
      }
    ]
  },
  {
    id: 'at-the-doctor',
    title: 'At the Doctor',
    subtitle: 'Symptoms, health card & sick notes',
    category: 'Healthcare',
    iconName: 'Stethoscope',
    instruction: 'Explain your symptoms clearly to the doctor and request a medical certificate of incapacity (AU-Bescheinigung).',
    phrases: [
      {
        id: 'ad-1',
        german: 'Guten Tag, ich habe seit drei Tagen starke Halsschmerzen und Fieber.',
        english: 'Hello, I have had a severe sore throat and fever for three days.',
        phoneticHint: 'GOO-ten tahk, ikh HAH-buh zyt dry TAH-gen SHTAR-kuh HAHLS-shmair-tsen oont FEE-ber'
      },
      {
        id: 'ad-2',
        german: 'Ich brauche bitte eine Arbeitsunfähigkeitsbescheinigung für meinen Arbeitgeber.',
        english: 'I need a certificate of incapacity for work for my employer, please.',
        phoneticHint: 'ikh BROW-khuh BIT-tuh EYE-nuh AHR-byts-oon-fay-ikh-kyts-buh-shy-nee-goong feur MY-nen AHR-byt-gay-ber'
      },
      {
        id: 'ad-3',
        german: 'Können Sie mir bitte ein Rezept für dieses Schmerzmittel aufschreiben?',
        english: 'Could you please write me a prescription for this pain reliever?',
        phoneticHint: 'KEUN-nen zee meer BIT-tuh eye-n reh-TSEPT feur DEE-zes SHMAIRTS-mit-tel OWF-shry-ben'
      }
    ]
  },
  {
    id: 'at-the-buergeramt',
    title: 'At the Bürgeramt',
    subtitle: 'Anmeldung, tax ID & official registration',
    category: 'Bureaucracy',
    iconName: 'Building2',
    instruction: 'Complete your residence registration (Wohnsitzanmeldung) and present your paperwork confidently.',
    phrases: [
      {
        id: 'ab-1',
        german: 'Guten Tag, ich habe einen Termin und möchte meinen Wohnsitz anmelden.',
        english: 'Good day, I have an appointment and would like to register my residence.',
        phoneticHint: 'GOO-ten tahk, ikh HAH-buh EYE-nen tair-MEEN oont MEURKH-tuh MY-nen VOHN-zits AHN-mel-den'
      },
      {
        id: 'ab-2',
        german: 'Hier sind mein Reisepass und die Wohnungsgeberbestätigung vom Vermieter.',
        english: 'Here are my passport and the landlord confirmation from the landlord.',
        phoneticHint: 'heer zint mine RYE-zuh-pahs oont dee VOH-noongs-gay-ber-buh-SHTAY-tee-goong fom fair-MEE-ter'
      },
      {
        id: 'ab-3',
        german: 'Wann erhalte ich meine deutsche Steuer-Identifikationsnummer per Post?',
        english: 'When will I receive my German tax identification number by mail?',
        phoneticHint: 'vahn air-HAHL-tuh ikh MY-nuh DOYT-shuh SHTOY-er-ee-den-tee-fee-kah-TSIOHN-noom-mer pair post'
      }
    ]
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    subtitle: 'Experience, strengths & motivation',
    category: 'Career & Work',
    iconName: 'Briefcase',
    instruction: 'Articulate your professional experience, key strengths, and motivation for the role in formal German.',
    phrases: [
      {
        id: 'ji-1',
        german: 'Ich habe drei Jahre Berufserfahrung im Projektmanagement gesammelt.',
        english: 'I have gained three years of professional experience in project management.',
        phoneticHint: 'ikh HAH-buh dry YAH-ruh buh-ROOFS-air-fah-roong im proh-YEKT-mah-nahzh-ment guh-ZAHM-melt'
      },
      {
        id: 'ji-2',
        german: 'Ich freue mich sehr über die Einladung zu diesem Vorstellungsgespräch.',
        english: 'I am very pleased with the invitation to this job interview.',
        phoneticHint: 'ikh FROY-uh mikh zair EW-ber dee EYE-n-lah-doong tsoo DEE-zem FOR-shtel-loongs-guh-shprekh'
      },
      {
        id: 'ji-3',
        german: 'Meine größten Stärken sind Teamfähigkeit und lösungsorientiertes Arbeiten.',
        english: 'My greatest strengths are teamwork and solution-oriented work.',
        phoneticHint: 'MY-nuh GREURS-ten SHTAIR-ken zint TEEM-fay-ikh-kyt oont LEU-zoongs-oh-ree-en-TEER-tes AHR-by-ten'
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping',
    subtitle: 'Supermarket, bakery & checkout payment',
    category: 'Daily Errands',
    iconName: 'ShoppingBag',
    instruction: 'Inquire about grocery items, ask for sizes or receipts, and clarify card payment methods.',
    phrases: [
      {
        id: 'sh-1',
        german: 'Entschuldigung, wo finde ich frische Vollmilch und Bio-Eier?',
        english: 'Excuse me, where can I find fresh whole milk and organic eggs?',
        phoneticHint: 'ent-SHOOL-dee-goong, voh FIN-duh ikh FRISH-uh FOL-milkh oont BEE-oh EYE-er'
      },
      {
        id: 'sh-2',
        german: 'Kann ich hier mit Girokarte oder Kreditkarte kontaktlos zahlen?',
        english: 'Can I pay here contactlessly with debit card or credit card?',
        phoneticHint: 'kahn ikh heer mit JEE-roh-kar-tuh OH-der kreh-DIT-kar-tuh kon-TAHKT-lohs TSAH-len'
      },
      {
        id: 'sh-3',
        german: 'Ich hätte gerne noch zwei frische Roggenbrötchen und ein Laugengebäck.',
        english: 'I would like two fresh rye bread rolls and a pretzel pastry, please.',
        phoneticHint: 'ikh HET-tuh GAIR-nuh nokh tsvy FRISH-uh ROG-gen-breurt-khen oont eye-n LOW-gen-guh-bek'
      }
    ]
  },
  {
    id: 'university',
    title: 'University',
    subtitle: 'Lecture halls, exams & library study',
    category: 'Academics',
    iconName: 'GraduationCap',
    instruction: 'Ask directions to lecture halls, coordinate group projects, and ask questions about exams.',
    phrases: [
      {
        id: 'un-1',
        german: 'Entschuldigung, wissen Sie, wo sich der Hörsaal drei im Hauptgebäude befindet?',
        english: 'Excuse me, do you know where lecture hall three is located in the main building?',
        phoneticHint: 'ent-SHOOL-dee-goong, VIS-sen zee, voh zikh dair HEUR-zahl dry im HOWPT-guh-boy-duh buh-FIN-det'
      },
      {
        id: 'un-2',
        german: 'Können wir uns diese Woche in der Universitätsbibliothek zur Gruppenarbeit treffen?',
        english: 'Can we meet in the university library this week for our group work?',
        phoneticHint: 'KEUN-nen veer oons DEE-zuh VOH-khuh in dair oo-nee-vair-zee-TAYTS-beeb-lee-oh-tayk tsoor GROOP-pen-ahr-byt TREF-fen'
      },
      {
        id: 'un-3',
        german: 'Wann und wo findet die Klausureinsicht für dieses Semester statt?',
        english: 'When and where does the exam review session for this semester take place?',
        phoneticHint: 'vahn oont voh FIN-det dee klow-ZOOR-eye-n-zikht feur DEE-zes zay-MES-ter shtaht'
      }
    ]
  },
  {
    id: 'everyday-conversation',
    title: 'Everyday Conversation',
    subtitle: 'Small talk, weather & making plans',
    category: 'Socializing',
    iconName: 'MessagesSquare',
    instruction: 'Engage in friendly small talk with German colleagues or neighbors about daily life and the weekend.',
    phrases: [
      {
        id: 'ec-1',
        german: 'Hallo! Wie geht es dir heute? Hast du ein schönes Wochenende gehabt?',
        english: 'Hello! How are you today? Did you have a nice weekend?',
        phoneticHint: 'HAH-lo! vee gayt es deer HOY-tuh? hahst doo eye-n SHEUR-nes VOH-khen-en-duh guh-HAHBT'
      },
      {
        id: 'ec-2',
        german: 'Das Wetter ist heute wirklich wunderschön für einen Spaziergang im Park.',
        english: 'The weather is really wonderful today for a walk in the park.',
        phoneticHint: 'dahs VET-ter ist HOY-tuh VEERK-likh VOON-der-sheurn feur EYE-nen shpah-TSEER-gahng im park'
      },
      {
        id: 'ec-3',
        german: 'Wollen wir in der Mittagspause zusammen in die Mensa oder ein Café gehen?',
        english: 'Shall we go together to the cafeteria or a café during the lunch break?',
        phoneticHint: 'VOL-len veer in dair MIT-tahgs-pow-zuh tsoo-ZAHM-men in dee MEN-zah OH-der eye-n kah-FAY GAY-en'
      }
    ]
  }
];
