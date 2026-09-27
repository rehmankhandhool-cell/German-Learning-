import { Vocabulary } from '../types';

export const VOCABULARY_CATEGORIES = [
  'Greetings',
  'Family',
  'Food & Drinks',
  'Shopping',
  'Home & Apartment',
  'Anmeldung & Bureaucracy',
  'Doctor & Health',
  'Transportation',
  'University',
  'Work & Jobs',
  'Bank & Money',
  'Restaurant',
  'Everyday German'
] as const;

export type VocabularyCategory = typeof VOCABULARY_CATEGORIES[number];

export const COMPREHENSIVE_VOCABULARY_BANK: Vocabulary[] = [
  // ========================================================
  // 1. GREETINGS
  // ========================================================
  {
    vocabularyId: 'voc_greet_01',
    germanWord: 'Guten Tag',
    englishMeaning: 'Good day / Hello (formal)',
    pronunciation: 'GOO-ten TAHK',
    exampleSentence: 'Guten Tag, wie kann ich Ihnen heute helfen?',
    exampleTranslation: 'Good day, how can I help you today?',
    germanLevel: 'A1',
    category: 'Greetings'
  },
  {
    vocabularyId: 'voc_greet_02',
    germanWord: 'Guten Morgen',
    englishMeaning: 'Good morning',
    pronunciation: 'GOO-ten MOR-gen',
    exampleSentence: 'Guten Morgen! Hast du gut geschlafen?',
    exampleTranslation: 'Good morning! Did you sleep well?',
    germanLevel: 'A1',
    category: 'Greetings'
  },
  {
    vocabularyId: 'voc_greet_03',
    germanWord: 'Guten Abend',
    englishMeaning: 'Good evening',
    pronunciation: 'GOO-ten AH-bent',
    exampleSentence: 'Guten Abend, meine Damen und Herren!',
    exampleTranslation: 'Good evening, ladies and gentlemen!',
    germanLevel: 'A1',
    category: 'Greetings'
  },
  {
    vocabularyId: 'voc_greet_04',
    germanWord: 'Auf Wiedersehen',
    englishMeaning: 'Goodbye (formal)',
    pronunciation: 'owf VEE-der-zay-en',
    exampleSentence: 'Vielen Dank für Ihre Hilfe und auf Wiedersehen!',
    exampleTranslation: 'Thank you very much for your help and goodbye!',
    germanLevel: 'A1',
    category: 'Greetings'
  },
  {
    vocabularyId: 'voc_greet_05',
    germanWord: 'Tschüss',
    englishMeaning: 'Bye / See you (informal)',
    pronunciation: 'tchooss',
    exampleSentence: 'Tschüss! Bis morgen um zehn Uhr.',
    exampleTranslation: 'Bye! See you tomorrow at ten o\'clock.',
    germanLevel: 'A1',
    category: 'Greetings'
  },
  {
    vocabularyId: 'voc_greet_06',
    germanWord: 'der Abschied',
    article: 'der',
    plural: 'die Abschiede',
    englishMeaning: 'Farewell / Goodbye',
    pronunciation: 'der AHP-sheet',
    exampleSentence: 'Der Abschied von den Kollegen fiel ihm schwer.',
    exampleTranslation: 'Saying farewell to his colleagues was difficult for him.',
    germanLevel: 'B1',
    category: 'Greetings'
  },

  // ========================================================
  // 2. FAMILY
  // ========================================================
  {
    vocabularyId: 'voc_fam_01',
    germanWord: 'die Familie',
    article: 'die',
    plural: 'die Familien',
    englishMeaning: 'Family',
    pronunciation: 'dee fah-MEE-lyeh',
    exampleSentence: 'Meine Familie wohnt in Frankfurt am Main.',
    exampleTranslation: 'My family lives in Frankfurt am Main.',
    germanLevel: 'A1',
    category: 'Family'
  },
  {
    vocabularyId: 'voc_fam_02',
    germanWord: 'die Mutter',
    article: 'die',
    plural: 'die Mütter',
    englishMeaning: 'Mother',
    pronunciation: 'dee MOOT-ter',
    exampleSentence: 'Meine Mutter kocht am Sonntag für alle.',
    exampleTranslation: 'My mother cooks for everyone on Sunday.',
    germanLevel: 'A1',
    category: 'Family'
  },
  {
    vocabularyId: 'voc_fam_03',
    germanWord: 'der Vater',
    article: 'der',
    plural: 'die Väter',
    englishMeaning: 'Father',
    pronunciation: 'der FAH-ter',
    exampleSentence: 'Mein Vater arbeitet als Ingenieur in Stuttgart.',
    exampleTranslation: 'My father works as an engineer in Stuttgart.',
    germanLevel: 'A1',
    category: 'Family'
  },
  {
    vocabularyId: 'voc_fam_04',
    germanWord: 'die Geschwister',
    plural: 'die Geschwister',
    englishMeaning: 'Siblings (brothers and sisters)',
    pronunciation: 'dee geh-SHVIS-ter',
    exampleSentence: 'Ich habe zwei Geschwister: einen Bruder und eine Schwester.',
    exampleTranslation: 'I have two siblings: a brother and a sister.',
    germanLevel: 'A1',
    category: 'Family'
  },
  {
    vocabularyId: 'voc_fam_05',
    germanWord: 'die Großeltern',
    plural: 'die Großeltern',
    englishMeaning: 'Grandparents',
    pronunciation: 'dee GROHS-el-tern',
    exampleSentence: 'Im Sommer besuchen wir unsere Großeltern auf dem Land.',
    exampleTranslation: 'In summer we visit our grandparents in the countryside.',
    germanLevel: 'A2',
    category: 'Family'
  },
  {
    vocabularyId: 'voc_fam_06',
    germanWord: 'die Verwandtschaft',
    article: 'die',
    englishMeaning: 'Relatives / Kinship',
    pronunciation: 'dee fer-VANT-shaft',
    exampleSentence: 'Die ganze Verwandtschaft hat zur Hochzeit gratuliert.',
    exampleTranslation: 'All the relatives congratulated on the wedding.',
    germanLevel: 'B1',
    category: 'Family'
  },

  // ========================================================
  // 3. FOOD & DRINKS
  // ========================================================
  {
    vocabularyId: 'voc_food_01',
    germanWord: 'das Brot',
    article: 'das',
    plural: 'die Brote',
    englishMeaning: 'Bread',
    pronunciation: 'das BROHT',
    exampleSentence: 'Frisches Vollkornbrot aus der Bäckerei schmeckt fantastisch.',
    exampleTranslation: 'Fresh whole-grain bread from the bakery tastes fantastic.',
    germanLevel: 'A1',
    category: 'Food & Drinks'
  },
  {
    vocabularyId: 'voc_food_02',
    germanWord: 'das Brötchen',
    article: 'das',
    plural: 'die Brötchen',
    englishMeaning: 'Bread roll / Bun',
    pronunciation: 'das BRERT-khen',
    exampleSentence: 'Zum Frühstück esse ich zwei Brötchen mit Käse.',
    exampleTranslation: 'For breakfast I eat two bread rolls with cheese.',
    germanLevel: 'A1',
    category: 'Food & Drinks'
  },
  {
    vocabularyId: 'voc_food_03',
    germanWord: 'das Wasser',
    article: 'das',
    englishMeaning: 'Water',
    pronunciation: 'das VAHS-ser',
    exampleSentence: 'Ich trinke gerne Mineralwasser mit Kohlensäure.',
    exampleTranslation: 'I like drinking sparkling mineral water.',
    germanLevel: 'A1',
    category: 'Food & Drinks'
  },
  {
    vocabularyId: 'voc_food_04',
    germanWord: 'der Kaffee',
    article: 'der',
    englishMeaning: 'Coffee',
    pronunciation: 'der KAH-fay',
    exampleSentence: 'Morgens brauche ich immer eine große Tasse Kaffee mit Milch.',
    exampleTranslation: 'In the morning I always need a big cup of coffee with milk.',
    germanLevel: 'A1',
    category: 'Food & Drinks'
  },
  {
    vocabularyId: 'voc_food_05',
    germanWord: 'das Gemüse',
    article: 'das',
    englishMeaning: 'Vegetables',
    pronunciation: 'das geh-MYOO-zeh',
    exampleSentence: 'Frisches Obst und Gemüse kaufe ich samstags auf dem Markt.',
    exampleTranslation: 'I buy fresh fruit and vegetables on Saturdays at the market.',
    germanLevel: 'A2',
    category: 'Food & Drinks'
  },
  {
    vocabularyId: 'voc_food_06',
    germanWord: 'die Ernährung',
    article: 'die',
    englishMeaning: 'Nutrition / Diet',
    pronunciation: 'dee er-NAY-roong',
    exampleSentence: 'Eine ausgewogene Ernährung fördert die Konzentration.',
    exampleTranslation: 'A balanced diet promotes concentration.',
    germanLevel: 'B1',
    category: 'Food & Drinks'
  },

  // ========================================================
  // 4. SHOPPING
  // ========================================================
  {
    vocabularyId: 'voc_shop_01',
    germanWord: 'der Supermarkt',
    article: 'der',
    plural: 'die Supermärkte',
    englishMeaning: 'Supermarket',
    pronunciation: 'der ZOO-per-markt',
    exampleSentence: 'Der Supermarkt schließt heute schon um zwanzig Uhr.',
    exampleTranslation: 'The supermarket already closes at 8 PM today.',
    germanLevel: 'A1',
    category: 'Shopping'
  },
  {
    vocabularyId: 'voc_shop_02',
    germanWord: 'der Kassenbon',
    article: 'der',
    plural: 'die Kassenbons',
    englishMeaning: 'Register receipt',
    pronunciation: 'der KAS-sen-bong',
    exampleSentence: 'Brauchen Sie den Kassenbon oder kann ich ihn wegwerfen?',
    exampleTranslation: 'Do you need the receipt or can I discard it?',
    germanLevel: 'A1',
    category: 'Shopping'
  },
  {
    vocabularyId: 'voc_shop_03',
    germanWord: 'das Pfand',
    article: 'das',
    englishMeaning: 'Deposit on bottles/cans',
    pronunciation: 'das PFANT',
    exampleSentence: 'Auf diese Mehrwegflasche gibt es 25 Cent Pfand zurück.',
    exampleTranslation: 'You get 25 cents deposit back on this recyclable bottle.',
    germanLevel: 'A1',
    category: 'Shopping'
  },
  {
    vocabularyId: 'voc_shop_04',
    germanWord: 'der Einkaufswagen',
    article: 'der',
    plural: 'die Einkaufswagen',
    englishMeaning: 'Shopping cart / trolley',
    pronunciation: 'der EYN-kowfs-vah-gen',
    exampleSentence: 'Für den Einkaufswagen brauchst du eine Ein-Euro-Münze.',
    exampleTranslation: 'You need a one-euro coin for the shopping cart.',
    germanLevel: 'A2',
    category: 'Shopping'
  },
  {
    vocabularyId: 'voc_shop_05',
    germanWord: 'die Quittung',
    article: 'die',
    plural: 'die Quittungen',
    englishMeaning: 'Formal written receipt',
    pronunciation: 'dee KVIT-toong',
    exampleSentence: 'Könnten Sie mir bitte eine Quittung mit Firmenname ausstellen?',
    exampleTranslation: 'Could you please issue a receipt with company name for me?',
    germanLevel: 'A2',
    category: 'Shopping'
  },
  {
    vocabularyId: 'voc_shop_06',
    germanWord: 'die Rückerstattung',
    article: 'die',
    plural: 'die Rückerstattungen',
    englishMeaning: 'Refund / Reimbursement',
    pronunciation: 'dee RYUK-er-shtaht-toong',
    exampleSentence: 'Bei Umtausch innerhalb von 14 Tagen erhalten Sie die volle Rückerstattung.',
    exampleTranslation: 'On returns within 14 days you receive a full refund.',
    germanLevel: 'B1',
    category: 'Shopping'
  },

  // ========================================================
  // 5. HOME & APARTMENT
  // ========================================================
  {
    vocabularyId: 'voc_home_01',
    germanWord: 'die Wohnung',
    article: 'die',
    plural: 'die Wohnungen',
    englishMeaning: 'Apartment / Flat',
    pronunciation: 'dee VOHN-oong',
    exampleSentence: 'Wir haben eine helle Dreizimmerwohnung in Köln gefunden.',
    exampleTranslation: 'We found a bright three-room apartment in Cologne.',
    germanLevel: 'A1',
    category: 'Home & Apartment'
  },
  {
    vocabularyId: 'voc_home_02',
    germanWord: 'die Warmmiete',
    article: 'die',
    plural: 'die Warmmieten',
    englishMeaning: 'Total rent including heating and utilities',
    pronunciation: 'dee VARM-mee-teh',
    exampleSentence: 'Die Warmmiete beträgt monatlich 920 Euro.',
    exampleTranslation: 'The total rent including heating is 920 euros per month.',
    germanLevel: 'A1',
    category: 'Home & Apartment'
  },
  {
    vocabularyId: 'voc_home_03',
    germanWord: 'die Kaltmiete',
    article: 'die',
    plural: 'die Kaltmieten',
    englishMeaning: 'Base rent excluding utilities',
    pronunciation: 'dee KALT-mee-teh',
    exampleSentence: 'Die Kaltmiete ist günstig, aber die Heizkosten sind gestiegen.',
    exampleTranslation: 'The base rent is affordable, but heating costs have risen.',
    germanLevel: 'A1',
    category: 'Home & Apartment'
  },
  {
    vocabularyId: 'voc_home_04',
    germanWord: 'die Kaution',
    article: 'die',
    plural: 'die Kautionen',
    englishMeaning: 'Security deposit',
    pronunciation: 'dee kow-tsee-OHN',
    exampleSentence: 'Die Mietkaution von drei Kaltmieten wird auf ein Sparkonto überwiesen.',
    exampleTranslation: 'The rental security deposit of three net rents is transferred to a savings account.',
    germanLevel: 'A2',
    category: 'Home & Apartment'
  },
  {
    vocabularyId: 'voc_home_05',
    germanWord: 'der Vermieter',
    article: 'der',
    plural: 'die Vermieter',
    englishMeaning: 'Landlord',
    pronunciation: 'der fer-MEE-ter',
    exampleSentence: 'Der Vermieter hat die Reparatur der Heizung sofort beauftragt.',
    exampleTranslation: 'The landlord promptly commissioned the heating repair.',
    germanLevel: 'A2',
    category: 'Home & Apartment'
  },
  {
    vocabularyId: 'voc_home_06',
    germanWord: 'die Nebenkostenabrechnung',
    article: 'die',
    plural: 'die Nebenkostenabrechnungen',
    englishMeaning: 'Annual utility bill statement',
    pronunciation: 'dee NAY-ben-kos-ten-ahp-rekh-noong',
    exampleSentence: 'In der jährlichen Nebenkostenabrechnung hatten wir ein kleines Guthaben.',
    exampleTranslation: 'In the annual utility statement we had a small credit balance.',
    germanLevel: 'B2',
    category: 'Home & Apartment'
  },

  // ========================================================
  // 6. ANMELDUNG & BUREAUCRACY
  // ========================================================
  {
    vocabularyId: 'voc_bur_01',
    germanWord: 'die Anmeldung',
    article: 'die',
    plural: 'die Anmeldungen',
    englishMeaning: 'Official address registration',
    pronunciation: 'dee an-MEL-doong',
    exampleSentence: 'Die Anmeldung muss innerhalb von 14 Tagen nach dem Einzug erfolgen.',
    exampleTranslation: 'The address registration must take place within 14 days after moving in.',
    germanLevel: 'A1',
    category: 'Anmeldung & Bureaucracy'
  },
  {
    vocabularyId: 'voc_bur_02',
    germanWord: 'das Bürgeramt',
    article: 'das',
    plural: 'die Bürgerämter',
    englishMeaning: 'Citizens\' Registration Office',
    pronunciation: 'das BYOOR-ger-ahmt',
    exampleSentence: 'Für die Meldebestätigung braucht man einen Termin beim Bürgeramt.',
    exampleTranslation: 'For the registration confirmation one needs an appointment at the Citizens\' Office.',
    germanLevel: 'A1',
    category: 'Anmeldung & Bureaucracy'
  },
  {
    vocabularyId: 'voc_bur_03',
    germanWord: 'die Wohnungsgeberbestätigung',
    article: 'die',
    plural: 'die Wohnungsgeberbestätigungen',
    englishMeaning: 'Landlord confirmation certificate',
    pronunciation: 'dee VOHN-oongs-gay-ber-be-shte-tee-goong',
    exampleSentence: 'Ohne die unterschriebene Wohnungsgeberbestätigung kann man sich nicht anmelden.',
    exampleTranslation: 'Without the signed landlord confirmation certificate you cannot register.',
    germanLevel: 'A2',
    category: 'Anmeldung & Bureaucracy'
  },
  {
    vocabularyId: 'voc_bur_04',
    germanWord: 'die Steueridentifikationsnummer',
    article: 'die',
    plural: 'die Steueridentifikationsnummern',
    englishMeaning: 'Tax identification number (Steuer-ID)',
    pronunciation: 'dee SHTOY-er-ee-den-tee-fee-kah-tsee-ohns-noom-mer',
    exampleSentence: 'Das Bundeszentralamt schickt die Steuer-ID per Post nach der Anmeldung.',
    exampleTranslation: 'The Federal Tax Office sends the tax ID by mail after registration.',
    germanLevel: 'A2',
    category: 'Anmeldung & Bureaucracy'
  },
  {
    vocabularyId: 'voc_bur_05',
    germanWord: 'der Aufenthaltstitel',
    article: 'der',
    plural: 'die Aufenthaltstitel',
    englishMeaning: 'Residence permit / title',
    pronunciation: 'der OWF-ent-halts-tee-tel',
    exampleSentence: 'Mein Aufenthaltstitel wurde um zwei weitere Jahre verlängert.',
    exampleTranslation: 'My residence permit was extended by two more years.',
    germanLevel: 'B1',
    category: 'Anmeldung & Bureaucracy'
  },
  {
    vocabularyId: 'voc_bur_06',
    germanWord: 'die Bescheinigung',
    article: 'die',
    plural: 'die Bescheinigungen',
    englishMeaning: 'Official certificate / Attestation',
    pronunciation: 'dee be-SHY-nee-goong',
    exampleSentence: 'Bitte legen Sie eine schriftliche Bescheinigung der Behörde vor.',
    exampleTranslation: 'Please present a written attestation from the authority.',
    germanLevel: 'B1',
    category: 'Anmeldung & Bureaucracy'
  },

  // ========================================================
  // 7. DOCTOR & HEALTH
  // ========================================================
  {
    vocabularyId: 'voc_doc_01',
    germanWord: 'der Arzt',
    article: 'der',
    plural: 'die Ärzte',
    englishMeaning: 'Doctor / Physician (male)',
    pronunciation: 'der AHRTST',
    exampleSentence: 'Ich habe morgen früh einen Termin beim Arzt.',
    exampleTranslation: 'I have an appointment with the doctor tomorrow morning.',
    germanLevel: 'A1',
    category: 'Doctor & Health'
  },
  {
    vocabularyId: 'voc_doc_02',
    germanWord: 'das Rezept',
    article: 'das',
    plural: 'die Rezepte',
    englishMeaning: 'Medical prescription',
    pronunciation: 'das reh-TSEPT',
    exampleSentence: 'Mit diesem Rezept können Sie das Medikament in der Apotheke abholen.',
    exampleTranslation: 'With this prescription you can pick up the medication at the pharmacy.',
    germanLevel: 'A1',
    category: 'Doctor & Health'
  },
  {
    vocabularyId: 'voc_doc_03',
    germanWord: 'die Krankenversicherungskarte',
    article: 'die',
    plural: 'die Krankenversicherungskarten',
    englishMeaning: 'Health insurance card (Gesundheitskarte)',
    pronunciation: 'dee KRANK-en-fer-zikh-e-roongs-kar-teh',
    exampleSentence: 'Bitte legen Sie Ihre elektronische Krankenversicherungskarte am Empfang vor.',
    exampleTranslation: 'Please present your electronic health insurance card at reception.',
    germanLevel: 'A2',
    category: 'Doctor & Health'
  },
  {
    vocabularyId: 'voc_doc_04',
    germanWord: 'die Krankschreibung',
    article: 'die',
    plural: 'die Krankschreibungen',
    englishMeaning: 'Official doctor\'s sick certificate (AU-Bescheinigung)',
    pronunciation: 'dee KRANK-shry-boong',
    exampleSentence: 'Die Krankschreibung wird elektronisch an den Arbeitgeber und die Kasse übermittelt.',
    exampleTranslation: 'The sick note is transmitted electronically to the employer and health fund.',
    germanLevel: 'A2',
    category: 'Doctor & Health'
  },
  {
    vocabularyId: 'voc_doc_05',
    germanWord: 'die Notaufnahme',
    article: 'die',
    plural: 'die Notaufnahmen',
    englishMeaning: 'Hospital emergency room (ER)',
    pronunciation: 'dee NOHT-owf-nah-meh',
    exampleSentence: 'Bei akuten Notfällen am Wochenende fährt man in die Notaufnahme.',
    exampleTranslation: 'In acute emergencies on weekends, one goes to the emergency room.',
    germanLevel: 'B1',
    category: 'Doctor & Health'
  },
  {
    vocabularyId: 'voc_doc_06',
    germanWord: 'die Überweisung',
    article: 'die',
    plural: 'die Überweisungen',
    englishMeaning: 'Referral to a specialist doctor',
    pronunciation: 'dee oo-ber-VYE-zoong',
    exampleSentence: 'Der Hausarzt hat mir eine Überweisung zum Kardiologen ausgestellt.',
    exampleTranslation: 'The family doctor issued me a referral to the cardiologist.',
    germanLevel: 'B1',
    category: 'Doctor & Health'
  },

  // ========================================================
  // 8. TRANSPORTATION
  // ========================================================
  {
    vocabularyId: 'voc_tra_01',
    germanWord: 'der Zug',
    article: 'der',
    plural: 'die Züge',
    englishMeaning: 'Train',
    pronunciation: 'der TSOOG',
    exampleSentence: 'Der Zug nach Berlin Hauptbahnhof fährt auf Gleis vier ab.',
    exampleTranslation: 'The train to Berlin Central Station departs on track four.',
    germanLevel: 'A1',
    category: 'Transportation'
  },
  {
    vocabularyId: 'voc_tra_02',
    germanWord: 'die Fahrkarte',
    article: 'die',
    plural: 'die Fahrkarten',
    englishMeaning: 'Transit ticket',
    pronunciation: 'dee FAHR-kar-teh',
    exampleSentence: 'Sie müssen die Fahrkarte vor Fahrtantritt entwerten.',
    exampleTranslation: 'You must validate the transit ticket before starting your journey.',
    germanLevel: 'A1',
    category: 'Transportation'
  },
  {
    vocabularyId: 'voc_tra_03',
    germanWord: 'das Gleis',
    article: 'das',
    plural: 'die Gleise',
    englishMeaning: 'Platform / Track',
    pronunciation: 'das GLYS',
    exampleSentence: 'Vorsicht an Gleis zwei: Der Intercity fährt ein.',
    exampleTranslation: 'Caution on track two: The Intercity train is arriving.',
    germanLevel: 'A1',
    category: 'Transportation'
  },
  {
    vocabularyId: 'voc_tra_04',
    germanWord: 'die Verspätung',
    article: 'die',
    plural: 'die Verspätungen',
    englishMeaning: 'Delay',
    pronunciation: 'dee fer-SHPAY-toong',
    exampleSentence: 'Wegen einer technischen Störung hat der Zug 20 Minuten Verspätung.',
    exampleTranslation: 'Due to a technical malfunction the train has a 20-minute delay.',
    germanLevel: 'A2',
    category: 'Transportation'
  },
  {
    vocabularyId: 'voc_tra_05',
    germanWord: 'das Deutschlandticket',
    article: 'das',
    englishMeaning: 'Nationwide monthly public transit pass (€49 ticket)',
    pronunciation: 'das DOYTCH-lant-tik-ket',
    exampleSentence: 'Mit dem Deutschlandticket kann man alle Regionalzüge und Busse nutzen.',
    exampleTranslation: 'With the Deutschlandticket you can use all regional trains and buses.',
    germanLevel: 'A2',
    category: 'Transportation'
  },
  {
    vocabularyId: 'voc_tra_06',
    germanWord: 'der Schienenersatzverkehr',
    article: 'der',
    englishMeaning: 'Rail replacement bus service (SEV)',
    pronunciation: 'der SHEE-nen-er-zahts-fer-kayr',
    exampleSentence: 'Wegen Bauarbeiten verkehrt am Wochenende ein Schienenersatzverkehr mit Bussen.',
    exampleTranslation: 'Due to construction, a rail replacement bus service runs on the weekend.',
    germanLevel: 'B1',
    category: 'Transportation'
  },

  // ========================================================
  // 9. UNIVERSITY
  // ========================================================
  {
    vocabularyId: 'voc_uni_01',
    germanWord: 'die Universität',
    article: 'die',
    plural: 'die Universitäten',
    englishMeaning: 'University',
    pronunciation: 'dee oo-nee-ver-zee-TAYT',
    exampleSentence: 'Die Ludwig-Maximilians-Universität in München hat einen exzellenten Ruf.',
    exampleTranslation: 'The Ludwig Maximilian University in Munich has an excellent reputation.',
    germanLevel: 'A1',
    category: 'University'
  },
  {
    vocabularyId: 'voc_uni_02',
    germanWord: 'die Vorlesung',
    article: 'die',
    plural: 'die Vorlesungen',
    englishMeaning: 'University lecture',
    pronunciation: 'dee FOR-lay-zoong',
    exampleSentence: 'Die Vorlesung in Volkswirtschaft beginnt montags um acht Uhr c.t.',
    exampleTranslation: 'The economics lecture begins on Mondays at 8 AM c.t. (quarter past).',
    germanLevel: 'A2',
    category: 'University'
  },
  {
    vocabularyId: 'voc_uni_03',
    germanWord: 'die Mensa',
    article: 'die',
    plural: 'die Mensen',
    englishMeaning: 'Student university cafeteria',
    pronunciation: 'dee MEN-zah',
    exampleSentence: 'In der Mensa gibt es täglich preiswerte Gerichte für Studierende.',
    exampleTranslation: 'In the student cafeteria there are inexpensive daily meals for students.',
    germanLevel: 'A1',
    category: 'University'
  },
  {
    vocabularyId: 'voc_uni_04',
    germanWord: 'die Klausur',
    article: 'die',
    plural: 'die Klausuren',
    englishMeaning: 'Written university exam',
    pronunciation: 'dee klow-ZOOR',
    exampleSentence: 'Am Ende des Semesters schreiben wir drei schwere Klausuren.',
    exampleTranslation: 'At the end of the semester we write three difficult exams.',
    germanLevel: 'A2',
    category: 'University'
  },
  {
    vocabularyId: 'voc_uni_05',
    germanWord: 'die Immatrikulation',
    article: 'die',
    plural: 'die Immatrikulationen',
    englishMeaning: 'University enrolment / matriculation',
    pronunciation: 'dee im-mah-tree-koo-lah-tsee-OHN',
    exampleSentence: 'Nach der Immatrikulation erhalten Sie den Studentenausweis und das Semesterticket.',
    exampleTranslation: 'After enrolment you receive the student ID and the semester ticket.',
    germanLevel: 'B1',
    category: 'University'
  },
  {
    vocabularyId: 'voc_uni_06',
    germanWord: 'die Abschlussarbeit',
    article: 'die',
    plural: 'die Abschlussarbeiten',
    englishMeaning: 'Graduation thesis (Bachelor / Master thesis)',
    pronunciation: 'dee AHP-shloos-ahr-bayt',
    exampleSentence: 'Sie schreibt gerade ihre Master-Abschlussarbeit über künstliche Intelligenz.',
    exampleTranslation: 'She is currently writing her Master\'s thesis on artificial intelligence.',
    germanLevel: 'B2',
    category: 'University'
  },

  // ========================================================
  // 10. WORK & JOBS
  // ========================================================
  {
    vocabularyId: 'voc_wrk_01',
    germanWord: 'die Arbeit',
    article: 'die',
    plural: 'die Arbeiten',
    englishMeaning: 'Work / Job',
    pronunciation: 'dee AHR-bayt',
    exampleSentence: 'Ich gehe jeden Morgen um acht Uhr zur Arbeit.',
    exampleTranslation: 'I go to work every morning at eight o\'clock.',
    germanLevel: 'A1',
    category: 'Work & Jobs'
  },
  {
    vocabularyId: 'voc_wrk_02',
    germanWord: 'der Arbeitsvertrag',
    article: 'der',
    plural: 'die Arbeitsverträge',
    englishMeaning: 'Employment contract',
    pronunciation: 'der AHR-bayts-fer-trahk',
    exampleSentence: 'Vor dem ersten Arbeitstag habe ich den unbefristeten Arbeitsvertrag unterschrieben.',
    exampleTranslation: 'Before the first working day I signed the permanent employment contract.',
    germanLevel: 'A2',
    category: 'Work & Jobs'
  },
  {
    vocabularyId: 'voc_wrk_03',
    germanWord: 'das Vorstellungsgespräch',
    article: 'das',
    plural: 'die Vorstellungsgespräche',
    englishMeaning: 'Job interview',
    pronunciation: 'das FOR-shte-loongs-ge-shprekh',
    exampleSentence: 'Das Vorstellungsgespräch findet per Video-Konferenz statt.',
    exampleTranslation: 'The job interview takes place via video conference.',
    germanLevel: 'B1',
    category: 'Work & Jobs'
  },
  {
    vocabularyId: 'voc_wrk_04',
    germanWord: 'das Gehalt',
    article: 'das',
    plural: 'die Gehälter',
    englishMeaning: 'Salary',
    pronunciation: 'das geh-HAHLT',
    exampleSentence: 'Das Gehalt wird am letzten Werktag des Monats überwiesen.',
    exampleTranslation: 'The salary is transferred on the last working day of the month.',
    germanLevel: 'A2',
    category: 'Work & Jobs'
  },
  {
    vocabularyId: 'voc_wrk_05',
    germanWord: 'die Probezeit',
    article: 'die',
    englishMeaning: 'Probationary period',
    pronunciation: 'dee PROH-beh-tsayt',
    exampleSentence: 'Die gesetzliche Probezeit beträgt in der Regel sechs Monate.',
    exampleTranslation: 'The legal probation period is usually six months.',
    germanLevel: 'B1',
    category: 'Work & Jobs'
  },
  {
    vocabularyId: 'voc_wrk_06',
    germanWord: 'die Kündigungsfrist',
    article: 'die',
    plural: 'die Kündigungsfristen',
    englishMeaning: 'Notice period for termination',
    pronunciation: 'dee KYOON-dee-goongs-frist',
    exampleSentence: 'Die Kündigungsfrist beträgt drei Monate zum Quartalsende.',
    exampleTranslation: 'The notice period is three months to the end of the quarter.',
    germanLevel: 'B2',
    category: 'Work & Jobs'
  },

  // ========================================================
  // 11. BANK & MONEY
  // ========================================================
  {
    vocabularyId: 'voc_bnk_01',
    germanWord: 'das Geld',
    article: 'das',
    englishMeaning: 'Money',
    pronunciation: 'das GELT',
    exampleSentence: 'Ich habe leider nicht genug Bargeld dabei.',
    exampleTranslation: 'Unfortunately I do not have enough cash with me.',
    germanLevel: 'A1',
    category: 'Bank & Money'
  },
  {
    vocabularyId: 'voc_bnk_02',
    germanWord: 'das Girokonto',
    article: 'das',
    plural: 'die Girokonten',
    englishMeaning: 'Current / Checking account',
    pronunciation: 'das ZHEE-roh-kon-toh',
    exampleSentence: 'Für Gehaltszahlungen benötigen Sie ein deutsches Girokonto mit IBAN.',
    exampleTranslation: 'For salary payments you need a German checking account with IBAN.',
    germanLevel: 'A1',
    category: 'Bank & Money'
  },
  {
    vocabularyId: 'voc_bnk_03',
    germanWord: 'die Überweisung',
    article: 'die',
    plural: 'die Überweisungen',
    englishMeaning: 'Bank transfer (SEPA transfer)',
    pronunciation: 'dee oo-ber-VYE-zoong',
    exampleSentence: 'Ich tätige die Überweisung für die Miete per Online-Banking.',
    exampleTranslation: 'I make the transfer for the rent via online banking.',
    germanLevel: 'A2',
    category: 'Bank & Money'
  },
  {
    vocabularyId: 'voc_bnk_04',
    germanWord: 'der Geldautomat',
    article: 'der',
    plural: 'die Geldautomaten',
    englishMeaning: 'ATM / Cash machine',
    pronunciation: 'der GELT-ow-toh-maht',
    exampleSentence: 'Am Geldautomaten der Sparkasse kann man gebührenfrei abheben.',
    exampleTranslation: 'At the Sparkasse ATM you can withdraw cash free of charges.',
    germanLevel: 'A1',
    category: 'Bank & Money'
  },
  {
    vocabularyId: 'voc_bnk_05',
    germanWord: 'der Dauerauftrag',
    article: 'der',
    plural: 'die Daueraufträge',
    englishMeaning: 'Standing order (recurring payment)',
    pronunciation: 'der DOW-er-owf-trahk',
    exampleSentence: 'Richten Sie einen Dauerauftrag ein, damit die Miete immer pünktlich ankommt.',
    exampleTranslation: 'Set up a standing order so that the rent always arrives on time.',
    germanLevel: 'B1',
    category: 'Bank & Money'
  },
  {
    vocabularyId: 'voc_bnk_06',
    germanWord: 'das Lastschriftverfahren',
    article: 'das',
    englishMeaning: 'Direct debit mandate (SEPA-Lastschrift)',
    pronunciation: 'das LAHST-shrift-fer-fah-ren',
    exampleSentence: 'Der Stromanbieter bucht den Monatsbeitrag per SEPA-Lastschriftverfahren ab.',
    exampleTranslation: 'The electricity provider debits the monthly fee via SEPA direct debit.',
    germanLevel: 'B2',
    category: 'Bank & Money'
  },

  // ========================================================
  // 12. RESTAURANT
  // ========================================================
  {
    vocabularyId: 'voc_res_01',
    germanWord: 'die Speisekarte',
    article: 'die',
    plural: 'die Speisekarten',
    englishMeaning: 'Menu (food menu)',
    pronunciation: 'dee SHPY-zeh-kar-teh',
    exampleSentence: 'Könnten wir bitte die Speisekarte bekommen?',
    exampleTranslation: 'Could we please get the menu?',
    germanLevel: 'A1',
    category: 'Restaurant'
  },
  {
    vocabularyId: 'voc_res_02',
    germanWord: 'die Rechnung',
    article: 'die',
    plural: 'die Rechnungen',
    englishMeaning: 'Restaurant bill / Check',
    pronunciation: 'dee REKH-noong',
    exampleSentence: 'Wir möchten bitte zahlen. Bringen Sie uns die Rechnung?',
    exampleTranslation: 'We would like to pay, please. Could you bring us the bill?',
    germanLevel: 'A1',
    category: 'Restaurant'
  },
  {
    vocabularyId: 'voc_res_03',
    germanWord: 'das Trinkgeld',
    article: 'das',
    plural: 'die Trinkgelder',
    englishMeaning: 'Tip / Gratuity',
    pronunciation: 'das TRINK-gelt',
    exampleSentence: 'In Deutschland gibt man üblicherweise 5 bis 10 Prozent Trinkgeld.',
    exampleTranslation: 'In Germany one usually gives 5 to 10 percent tip.',
    germanLevel: 'A1',
    category: 'Restaurant'
  },
  {
    vocabularyId: 'voc_res_04',
    germanWord: 'die Reservierung',
    article: 'die',
    plural: 'die Reservierungen',
    englishMeaning: 'Reservation',
    pronunciation: 'dee reh-zer-VEE-roong',
    exampleSentence: 'Ich habe eine Reservierung auf den Namen Müller für zwanzig Uhr.',
    exampleTranslation: 'I have a reservation under the name Müller for 8 PM.',
    germanLevel: 'A2',
    category: 'Restaurant'
  },
  {
    vocabularyId: 'voc_res_05',
    germanWord: 'die Bedienung',
    article: 'die',
    plural: 'die Bedienungen',
    englishMeaning: 'Service / Waiter or Waitress',
    pronunciation: 'dee be-DEE-noong',
    exampleSentence: 'Die Bedienung in diesem Restaurant war äußerst freundlich und aufmerksam.',
    exampleTranslation: 'The service in this restaurant was exceptionally friendly and attentive.',
    germanLevel: 'A2',
    category: 'Restaurant'
  },
  {
    vocabularyId: 'voc_res_06',
    germanWord: 'die Unverträglichkeit',
    article: 'die',
    plural: 'die Unverträglichkeiten',
    englishMeaning: 'Food intolerance / Allergy sensitivity',
    pronunciation: 'dee OON-fer-trayk-likh-kayt',
    exampleSentence: 'Haben Sie glutenfreie Gerichte? Ich habe eine Gluten-Unverträglichkeit.',
    exampleTranslation: 'Do you have gluten-free dishes? I have a gluten intolerance.',
    germanLevel: 'B1',
    category: 'Restaurant'
  },

  // ========================================================
  // 13. EVERYDAY GERMAN
  // ========================================================
  {
    vocabularyId: 'voc_evr_01',
    germanWord: 'bitte',
    englishMeaning: 'Please / You are welcome',
    pronunciation: 'BIT-teh',
    exampleSentence: 'Ein Glas Wasser bitte, vielen Dank!',
    exampleTranslation: 'A glass of water please, thank you very much!',
    germanLevel: 'A1',
    category: 'Everyday German'
  },
  {
    vocabularyId: 'voc_evr_02',
    germanWord: 'danke schön',
    englishMeaning: 'Thank you very much',
    pronunciation: 'DAHN-keh shern',
    exampleSentence: 'Danke schön für die freundliche Auskunft.',
    exampleTranslation: 'Thank you very much for the kind information.',
    germanLevel: 'A1',
    category: 'Everyday German'
  },
  {
    vocabularyId: 'voc_evr_03',
    germanWord: 'Entschuldigung',
    englishMeaning: 'Excuse me / Sorry',
    pronunciation: 'ent-SHOOL-dee-goong',
    exampleSentence: 'Entschuldigung, wissen Sie, wo der nächste Bahnhof ist?',
    exampleTranslation: 'Excuse me, do you know where the nearest train station is?',
    germanLevel: 'A1',
    category: 'Everyday German'
  },
  {
    vocabularyId: 'voc_evr_04',
    germanWord: 'der Feierabend',
    article: 'der',
    plural: 'die Feierabende',
    englishMeaning: 'End of workday / Free evening time',
    pronunciation: 'der FY-er-ah-bent',
    exampleSentence: 'Schönen Feierabend! Bis morgen im Büro.',
    exampleTranslation: 'Have a great evening after work! See you tomorrow at the office.',
    germanLevel: 'A2',
    category: 'Everyday German'
  },
  {
    vocabularyId: 'voc_evr_05',
    germanWord: 'die Mülltrennung',
    article: 'die',
    englishMeaning: 'Waste separation / Recycling sorting',
    pronunciation: 'dee MYOOL-tren-noong',
    exampleSentence: 'In Deutschland ist die Mülltrennung in Papier, Plastik und Biomüll Standard.',
    exampleTranslation: 'In Germany waste separation into paper, plastic, and organic waste is standard.',
    germanLevel: 'A2',
    category: 'Everyday German'
  },
  {
    vocabularyId: 'voc_evr_06',
    germanWord: 'die Sonntagsruhe',
    article: 'die',
    englishMeaning: 'Sunday quiet hours / Rest day law',
    pronunciation: 'dee ZON-tahks-roo-eh',
    exampleSentence: 'Wegen der Sonntagsruhe sind die meisten Geschäfte in Deutschland sonntags geschlossen.',
    exampleTranslation: 'Due to Sunday quiet hours, most shops in Germany are closed on Sundays.',
    germanLevel: 'B1',
    category: 'Everyday German'
  },
  {
    vocabularyId: 'voc_evr_07',
    germanWord: 'die Pünktlichkeit',
    article: 'die',
    englishMeaning: 'Punctuality',
    pronunciation: 'dee PYUINKT-likh-kayt',
    exampleSentence: 'Pünktlichkeit gilt in Deutschland als wichtiges Zeichen von Respekt.',
    exampleTranslation: 'Punctuality is considered an important sign of respect in Germany.',
    germanLevel: 'B2',
    category: 'Everyday German'
  }
];
