import { A1Lesson } from '../types';

export const A1_COURSE_LESSONS: A1Lesson[] = [
  // LESSON 1: Greetings and Introductions
  {
    lessonNumber: 1,
    id: 'a1_lesson_01',
    germanTitle: 'Begrüßung und Kennenlernen',
    englishTitle: 'Greetings and Introductions',
    shortExplanation: 'Learn how to greet people warmly, introduce yourself, and ask someone for their name in formal and casual German.',
    vocabulary: [
      { german: 'Hallo', english: 'Hello', pronunciation: 'HAH-loh', exampleSentence: 'Hallo, wie geht es dir?', exampleTranslation: 'Hello, how are you?' },
      { german: 'Guten Tag', english: 'Good day / Hello (polite)', pronunciation: 'GOO-ten TAHK', exampleSentence: 'Guten Tag, Herr Müller!', exampleTranslation: 'Good day, Mr. Müller!' },
      { german: 'Guten Morgen', english: 'Good morning', pronunciation: 'GOO-ten MOR-gen', exampleSentence: 'Guten Morgen allerseits!', exampleTranslation: 'Good morning everyone!' },
      { german: 'Auf Wiedersehen', english: 'Goodbye (formal)', pronunciation: 'owf VEE-der-zay-en', exampleSentence: 'Auf Wiedersehen und schönen Tag!', exampleTranslation: 'Goodbye and have a nice day!' },
      { german: 'Tschüss', english: 'Bye (informal)', pronunciation: 'CHOOSS', exampleSentence: 'Tschüss, bis morgen!', exampleTranslation: 'Bye, see you tomorrow!' },
      { german: 'der Name', english: 'the name', article: 'der', pronunciation: 'dayr NAH-muh', exampleSentence: 'Mein Name ist Alex.', exampleTranslation: 'My name is Alex.' }
    ],
    exampleSentences: [
      { german: 'Ich heiße Sarah und komme aus London.', english: 'My name is Sarah and I come from London.' },
      { german: 'Wie heißen Sie? (formal)', english: 'What is your name? (formal)' },
      { german: 'Wie heißt du? (informal)', english: 'What is your name? (informal)' },
      { german: 'Freut mich, Sie kennenzulernen!', english: 'Pleased to meet you!' }
    ],
    dialogue: [
      { speaker: 'Lukas', german: 'Guten Tag! Mein Name ist Lukas Weber. Wie heißen Sie?', english: 'Good day! My name is Lukas Weber. What is your name?' },
      { speaker: 'Elena', german: 'Guten Tag, Herr Weber! Ich heiße Elena Rossi.', english: 'Good day, Mr. Weber! My name is Elena Rossi.' },
      { speaker: 'Lukas', german: 'Freut mich, Frau Rossi! Wie geht es Ihnen?', english: 'Pleased to meet you, Ms. Rossi! How are you?' },
      { speaker: 'Elena', german: 'Sehr gut, danke! Und Ihnen?', english: 'Very good, thank you! And you?' },
      { speaker: 'Lukas', german: 'Auch gut, danke. Schönen Tag noch!', english: 'Also good, thanks. Have a great rest of the day!' },
      { speaker: 'Elena', german: 'Danke, gleichfalls! Auf Wiedersehen!', english: 'Thank you, likewise! Goodbye!' }
    ],
    grammarFocus: {
      title: 'Formal "Sie" vs. Informal "du" & Verb "heißen"',
      explanation: 'In Germany, use "Sie" (capitalized) with strangers, officials, shopkeepers, and colleagues. Use "du" with friends, family, and fellow students. The verb changes based on the person.',
      rules: [
        { rule: 'Ich heiße (I am called)', example: 'Ich heiße Michael.' },
        { rule: 'Du heißt (You are called - informal)', example: 'Wie heißt du?' },
        { rule: 'Sie heißen (You are called - formal)', example: 'Wie heißen Sie?' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q1_1',
        question: 'Which greeting is the standard polite greeting during daytime in Germany?',
        options: ['Gute Nacht', 'Guten Tag', 'Tschüss', 'Schlaf gut'],
        correctIndex: 1,
        explanation: '"Guten Tag" is the standard respectful greeting used throughout the morning and afternoon.'
      },
      {
        id: 'q1_2',
        question: 'How do you ask a professor or bank teller "What is your name?" in polite formal German?',
        options: ['Wie heißt du?', 'Wer bist du?', 'Wie heißen Sie?', 'Wie geht es dir?'],
        correctIndex: 2,
        explanation: '"Wie heißen Sie?" uses the capitalized formal polite pronoun "Sie".'
      },
      {
        id: 'q1_3',
        question: 'What is the correct German verb form for "Ich ... Sarah."?',
        options: ['heißt', 'heiße', 'heißen', 'heiß'],
        correctIndex: 1,
        explanation: 'Verbs paired with the first-person singular pronoun "ich" end in "-e": "Ich heiße".'
      },
      {
        id: 'q1_4',
        question: 'What does "Freut mich!" mean when meeting someone?',
        options: ['I am leaving', 'Nice to meet you / Pleased to meet you', 'How much is it?', 'Excuse me'],
        correctIndex: 1,
        explanation: '"Freut mich" is a friendly and polite phrase meaning "Pleased to meet you".'
      },
      {
        id: 'q1_5',
        question: 'How do friends say "Goodbye" informally in Germany?',
        options: ['Guten Morgen', 'Tschüss', 'Bitte schön', 'Danke schön'],
        correctIndex: 1,
        explanation: '"Tschüss" is the everyday casual way to say "Bye".'
      }
    ],
    usefulPhrases: [
      { german: 'Wie geht es Ihnen?', english: 'How are you? (formal)', note: 'Polite question for professors, doctors, and professionals.' },
      { german: 'Sehr gut, danke!', english: 'Very good, thank you!', note: 'Universal positive response.' },
      { german: 'Freut mich!', english: 'Pleased to meet you!', note: 'Used upon being introduced to someone new.' },
      { german: 'Schönen Tag noch!', english: 'Have a nice rest of the day!', note: 'Common farewell in shops and bakeries.' },
      { german: 'Danke, gleichfalls!', english: 'Thank you, likewise / same to you!', note: 'Polite return greeting.' }
    ],
    xpReward: 100
  },

  // LESSON 2: Alphabet and German Pronunciation
  {
    lessonNumber: 2,
    id: 'a1_lesson_02',
    germanTitle: 'Das Alphabet und Aussprache',
    englishTitle: 'Alphabet and German Pronunciation',
    shortExplanation: 'Master the 26 standard letters plus the four special German characters: ä, ö, ü (Umlaute) and the ß (Eszett / sharp S).',
    vocabulary: [
      { german: 'der Buchstabe', english: 'the letter (alphabet)', article: 'der', pronunciation: 'dayr BOOKH-shtah-buh', exampleSentence: 'Wie schreibt man das?', exampleTranslation: 'How do you spell that?' },
      { german: 'das Alphabet', english: 'the alphabet', article: 'das', pronunciation: 'dahs al-fah-BAYT', exampleSentence: 'Das deutsche Alphabet hat 26 Buchstaben.', exampleTranslation: 'The German alphabet has 26 letters.' },
      { german: 'ä (Umlaut a)', english: 'sounds like "e" in bed', pronunciation: 'ay / eh', exampleSentence: 'Die Äpfel sind frisch.', exampleTranslation: 'The apples are fresh.' },
      { german: 'ö (Umlaut o)', english: 'round lips, pronounce "ay"', pronunciation: 'er / eu', exampleSentence: 'Ich möchte ein Brötchen.', exampleTranslation: 'I would like a bread roll.' },
      { german: 'ü (Umlaut u)', english: 'round lips like whistling, pronounce "ee"', pronunciation: 'ue', exampleSentence: 'Über 100 Menschen.', exampleTranslation: 'Over 100 people.' },
      { german: 'ß (Eszett)', english: 'sharp "ss" sound', pronunciation: 'ess-tset', exampleSentence: 'Ich wohne in der Goethestraße.', exampleTranslation: 'I live in Goethe Street.' }
    ],
    exampleSentences: [
      { german: 'Können Sie das bitte buchstabieren?', english: 'Can you please spell that?' },
      { german: 'Man schreibt das mit scharfem S (ß).', english: 'One writes that with a sharp S (ß).' },
      { german: 'M-Ü-L-L-E-R, mit Umlaut Ü.', english: 'M-U-L-L-E-R, with Umlaut U.' }
    ],
    dialogue: [
      { speaker: 'Beamter', german: 'Guten Tag! Wie ist Ihr Nachname?', english: 'Good day! What is your last name?' },
      { speaker: 'Student', german: 'Mein Nachname ist Schneider.', english: 'My last name is Schneider.' },
      { speaker: 'Beamter', german: 'Können Sie das bitte buchstabieren?', english: 'Could you please spell that?' },
      { speaker: 'Student', german: 'Ja, gerne: S - C - H - N - E - I - D - E - R.', english: 'Yes, gladly: S - C - H - N - E - I - D - E - R.' },
      { speaker: 'Beamter', german: 'Vielen Dank, Herr Schneider.', english: 'Thank you very much, Mr. Schneider.' }
    ],
    grammarFocus: {
      title: 'German Umlauts (Ä, Ö, Ü) and Diphthongs',
      explanation: 'In German, "ei" sounds like the English word "eye" (e.g., mein, nein), while "ie" sounds like "ee" (e.g., Sie, wie). Umlauts change the meaning of words completely!',
      rules: [
        { rule: 'ei = sounds like "eye"', example: 'nein (no), mein (my)' },
        { rule: 'ie = sounds like "ee"', example: 'Sie (you), wie (how)' },
        { rule: 'w = sounds like English "v"', example: 'Wasser (vah-ser), wir (veer)' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q2_1',
        question: 'How is the letter combination "ei" pronounced in words like "nein"?',
        options: ['Like "ee" in see', 'Like "eye" in bike', 'Like "ay" in day', 'Like "oo" in moon'],
        correctIndex: 1,
        explanation: 'In German, "ei" always produces the "eye" sound, as in "mein" or "nein".'
      },
      {
        id: 'q2_2',
        question: 'What letter does the German "W" sound like in spoken English?',
        options: ['English W (water)', 'English V (victory)', 'English B (boat)', 'Silent'],
        correctIndex: 1,
        explanation: 'The German "W" sounds like the English "V". For example, "Wo" sounds like "Voh".'
      },
      {
        id: 'q2_3',
        question: 'Which of the following contains the German sharp S (Eszett)?',
        options: ['Straße', 'Strasse', 'Haus', 'Garten'],
        correctIndex: 0,
        explanation: '"Straße" contains the German character "ß" which represents a sharp unvoiced double "s".'
      },
      {
        id: 'q2_4',
        question: 'How do you say "Can you spell that please?" in German?',
        options: ['Können Sie das bitte lesen?', 'Können Sie das bitte buchstabieren?', 'Wo ist der Bahnhof?', 'Was ist das?'],
        correctIndex: 1,
        explanation: '"Buchstabieren" specifically means "to spell out letter by letter".'
      },
      {
        id: 'q2_5',
        question: 'How is "ie" pronounced in the word "Bier"?',
        options: ['Like "beer" (long "ee")', 'Like "buyer" (eye)', 'Like "bear"', 'Like "bar"'],
        correctIndex: 0,
        explanation: '"ie" is pronounced as a long "ee" sound: "Bier" sounds like "beer".'
      }
    ],
    usefulPhrases: [
      { german: 'Können Sie das bitte buchstabieren?', english: 'Could you please spell that?', note: 'Crucial for doctor and registration appointments.' },
      { german: 'Wie spricht man das aus?', english: 'How do you pronounce that?', note: 'Ask native speakers to repeat words.' },
      { german: 'Wie schreibt man das?', english: 'How do you write/spell that?', note: 'Useful when taking notes or filling forms.' },
      { german: 'Noch einmal bitte!', english: 'Once again, please!', note: 'Polite request to repeat.' },
      { german: 'Langsamer bitte!', english: 'Slower, please!', note: 'Great when Germans speak too quickly.' }
    ],
    xpReward: 100
  },

  // LESSON 3: Numbers and Age
  {
    lessonNumber: 3,
    id: 'a1_lesson_03',
    germanTitle: 'Zahlen und Alter',
    englishTitle: 'Numbers and Age',
    shortExplanation: 'Count from 0 to 100, give your phone number, say your age, and master German price tags.',
    vocabulary: [
      { german: 'die Zahl', english: 'the number', article: 'die', pronunciation: 'dee TSAHL', exampleSentence: 'Welche Zahl ist das?', exampleTranslation: 'Which number is that?' },
      { german: 'eins, zwei, drei', english: 'one, two, three', pronunciation: 'eyns, tsvy, dry', exampleSentence: 'Ich habe zwei Brüder.', exampleTranslation: 'I have two brothers.' },
      { german: 'zehn, zwanzig', english: 'ten, twenty', pronunciation: 'tsehn, TSVAN-tsikh', exampleSentence: 'Das kostet zwanzig Euro.', exampleTranslation: 'That costs twenty euros.' },
      { german: 'das Alter', english: 'the age', article: 'das', pronunciation: 'dahs AHL-ter', exampleSentence: 'Wie alt bist du?', exampleTranslation: 'How old are you?' },
      { german: 'das Jahr', english: 'the year', article: 'das', pronunciation: 'dahs YAHR', exampleSentence: 'Ich bin 25 Jahre alt.', exampleTranslation: 'I am 25 years old.' },
      { german: 'die Handynummer', english: 'the mobile phone number', article: 'die', pronunciation: 'dee HEN-dee-noo-mer', exampleSentence: 'Wie ist deine Handynummer?', exampleTranslation: 'What is your mobile number?' }
    ],
    exampleSentences: [
      { german: 'Wie alt sind Sie? (formal)', english: 'How old are you? (formal)' },
      { german: 'Ich bin achtundzwanzig Jahre alt.', english: 'I am twenty-eight years old.' },
      { german: 'Meine Telefonnummer ist null-eins-sieben-zwei...', english: 'My phone number is 0172...' },
      { german: 'Ein Kaffee kostet drei Euro fünfzig.', english: 'A coffee costs 3 euros 50.' }
    ],
    dialogue: [
      { speaker: 'Arzthelferin', german: 'Guten Tag! Wie alt sind Sie?', english: 'Good day! How old are you?' },
      { speaker: 'Patient', german: 'Ich bin 24 Jahre alt.', english: 'I am 24 years old.' },
      { speaker: 'Arzthelferin', german: 'Und wie ist Ihre Telefonnummer?', english: 'And what is your telephone number?' },
      { speaker: 'Patient', german: '0151 45 67 89.', english: '0151 45 67 89.' },
      { speaker: 'Arzthelferin', german: 'Vielen Dank, bitte nehmen Sie im Zimmer drei Platz.', english: 'Thank you very much, please take a seat in room three.' }
    ],
    grammarFocus: {
      title: 'German Numbers Above 20 & "sein" (to be)',
      explanation: 'In German, numbers 21–99 are said "units first, then tens" connected with "und" (and). For example: 21 = einundzwanzig (one-and-twenty). Use the verb "sein" to state your age.',
      rules: [
        { rule: '21 = einundzwanzig', example: 'ein-und-zwanzig (1 and 20)' },
        { rule: 'Ich bin [X] Jahre alt', example: 'Ich bin 20 Jahre alt (use "sein", not "haben")' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q3_1',
        question: 'How do you say the number 25 in German?',
        options: ['zwanzigfünf', 'fünfundzwanzig', 'fünfzehn', 'fünfzig'],
        correctIndex: 1,
        explanation: 'In German numbers above 20, the single digit comes first: "fünfundzwanzig" (five-and-twenty).'
      },
      {
        id: 'q3_2',
        question: 'Which verb is used to say "I am 30 years old" in German?',
        options: ['haben (to have)', 'sein (to be)', 'machen (to do)', 'wohnen (to live)'],
        correctIndex: 1,
        explanation: 'In German, you use "sein" (to be): "Ich bin dreißig Jahre alt". Never use "haben".'
      },
      {
        id: 'q3_3',
        question: 'What is the German word for "zero"?',
        options: ['null', 'eins', 'nichts', 'kein'],
        correctIndex: 0,
        explanation: '"null" is the German number zero.'
      },
      {
        id: 'q3_4',
        question: 'Translate: "Wie alt bist du?"',
        options: ['Where do you live?', 'How old are you?', 'What is your job?', 'What is your name?'],
        correctIndex: 1,
        explanation: '"Wie alt bist du?" means "How old are you?" (informal).'
      },
      {
        id: 'q3_5',
        question: 'How much is "drei Euro fünfzig"?',
        options: ['€35.00', '€3.50', '€3.15', '€5.30'],
        correctIndex: 1,
        explanation: '"Drei Euro fünfzig" translates directly to €3.50.'
      }
    ],
    usefulPhrases: [
      { german: 'Wie alt bist du?', english: 'How old are you? (informal)', note: 'Common among students and friends.' },
      { german: 'Ich bin ... Jahre alt.', english: 'I am ... years old.', note: 'Standard way to state age.' },
      { german: 'Wie viel kostet das?', english: 'How much does that cost?', note: 'Essential in every shop or supermarket.' },
      { german: 'Das macht zusammen ... Euro.', english: 'That comes to ... euros altogether.', note: 'What cashiers say at checkout.' },
      { german: 'Stimmt so!', english: 'Keep the change!', note: 'Common tip phrase in German cafes and taxis.' }
    ],
    xpReward: 100
  },

  // LESSON 4: Countries and Nationalities
  {
    lessonNumber: 4,
    id: 'a1_lesson_04',
    germanTitle: 'Länder und Nationalitäten',
    englishTitle: 'Countries and Nationalities',
    shortExplanation: 'Talk about where you come from, where you live right now, and which languages you speak.',
    vocabulary: [
      { german: 'das Land', english: 'the country', article: 'das', pronunciation: 'dahs LAHNT', exampleSentence: 'Deutschland ist ein schönes Land.', exampleTranslation: 'Germany is a beautiful country.' },
      { german: 'Deutschland', english: 'Germany', pronunciation: 'DOYTCH-lahnt', exampleSentence: 'Ich lebe in Deutschland.', exampleTranslation: 'I live in Germany.' },
      { german: 'die Sprache', english: 'the language', article: 'die', pronunciation: 'dee SHPRAH-khuh', exampleSentence: 'Ich lerne die deutsche Sprache.', exampleTranslation: 'I am learning the German language.' },
      { german: 'woher', english: 'from where', pronunciation: 'voh-HAYR', exampleSentence: 'Woher kommen Sie?', exampleTranslation: 'Where do you come from?' },
      { german: 'wo', english: 'where', pronunciation: 'VOH', exampleSentence: 'Wo wohnst du?', exampleTranslation: 'Where do you live?' },
      { german: 'sprechen', english: 'to speak', pronunciation: 'SHPRAY-khen', exampleSentence: 'Ich spreche Englisch und ein bisschen Deutsch.', exampleTranslation: 'I speak English and a bit of German.' }
    ],
    exampleSentences: [
      { german: 'Woher kommen Sie? — Ich komme aus Spanien.', english: 'Where do you come from? — I come from Spain.' },
      { german: 'Wo wohnst du? — Ich wohne in Berlin.', english: 'Where do you live? — I live in Berlin.' },
      { german: 'Ich lerne seit drei Monaten Deutsch.', english: 'I have been learning German for three months.' },
      { german: 'Sprechen Sie Englisch?', english: 'Do you speak English?' }
    ],
    dialogue: [
      { speaker: 'Anna', german: 'Hallo! Woher kommst du?', english: 'Hello! Where do you come from?' },
      { speaker: 'Mateo', german: 'Hallo Anna! Ich komme aus Kolumbien, und du?', english: 'Hello Anna! I come from Colombia, and you?' },
      { speaker: 'Anna', german: 'Ich komme aus Deutschland, aus München.', english: 'I come from Germany, from Munich.' },
      { speaker: 'Mateo', german: 'Toll! Ich wohne jetzt in Frankfurt und lerne Deutsch.', english: 'Great! I live in Frankfurt now and learn German.' },
      { speaker: 'Anna', german: 'Du sprichst schon sehr gut Deutsch!', english: 'You already speak German very well!' }
    ],
    grammarFocus: {
      title: 'Prepositions: "aus" (origin) vs. "in" (location)',
      explanation: 'Use "aus" when stating country or city of origin ("Ich komme aus..."). Use "in" when stating your current city or residence ("Ich wohne in..."). Note: Most countries have no article, but a few do (die Schweiz, die Türkei, die USA).',
      rules: [
        { rule: 'kommen aus + Dat', example: 'Ich komme aus Indien / aus Deutschland.' },
        { rule: 'wohnen in + Dat', example: 'Ich wohne in Hamburg / in Köln.' },
        { rule: 'Exception countries with articles', example: 'Ich komme aus der Schweiz / aus den USA.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q4_1',
        question: 'Complete the sentence: "Ich komme _____ Italien."',
        options: ['in', 'aus', 'nach', 'bei'],
        correctIndex: 1,
        explanation: 'We use the preposition "aus" to express origin (coming from).'
      },
      {
        id: 'q4_2',
        question: 'Complete the sentence: "Ich wohne _____ München."',
        options: ['aus', 'von', 'in', 'zu'],
        correctIndex: 2,
        explanation: 'We use the preposition "in" to state the city where you currently reside.'
      },
      {
        id: 'q4_3',
        question: 'What does "Woher kommen Sie?" ask?',
        options: ['Where are you going?', 'Where do you come from?', 'What language do you speak?', 'What is your job?'],
        correctIndex: 1,
        explanation: '"Woher" specifically asks for origin (from where).'
      },
      {
        id: 'q4_4',
        question: 'How do you say "I speak a little German"?',
        options: ['Ich spreche kein Deutsch.', 'Ich spreche ein bisschen Deutsch.', 'Ich verstehe alles.', 'Ich lerne schnell.'],
        correctIndex: 1,
        explanation: '"Ein bisschen" translates to "a little / a bit".'
      },
      {
        id: 'q4_5',
        question: 'Which country requires a feminine article in German ("aus der ...")?',
        options: ['Deutschland', 'Frankreich', 'die Schweiz', 'Spanien'],
        correctIndex: 2,
        explanation: 'Switzerland is feminine in German ("die Schweiz"), so you say "aus der Schweiz".'
      }
    ],
    usefulPhrases: [
      { german: 'Woher kommen Sie?', english: 'Where do you come from? (formal)', note: 'Everyday question in international offices.' },
      { german: 'Ich komme aus...', english: 'I come from...', note: 'State your home country.' },
      { german: 'Ich wohne in...', english: 'I live in...', note: 'State your German city.' },
      { german: 'Ich spreche ein bisschen Deutsch.', english: 'I speak a little German.', note: 'Polite and disarming phrase for beginners.' },
      { german: 'Sprechen Sie Englisch?', english: 'Do you speak English?', note: 'Lifesaver when paperwork gets complicated.' }
    ],
    xpReward: 100
  },

  // LESSON 5: Family
  {
    lessonNumber: 5,
    id: 'a1_lesson_05',
    germanTitle: 'Die Familie',
    englishTitle: 'Family',
    shortExplanation: 'Learn terms for family members, possessive pronouns (mein/meine), and how to talk about relationships.',
    vocabulary: [
      { german: 'die Familie', english: 'the family', article: 'die', pronunciation: 'dee fah-MEE-lee-uh', exampleSentence: 'Meine Familie lebt in Hamburg.', exampleTranslation: 'My family lives in Hamburg.' },
      { german: 'der Vater', english: 'the father', article: 'der', pronunciation: 'dayr FAH-ter', exampleSentence: 'Mein Vater heißt Thomas.', exampleTranslation: 'My father is named Thomas.' },
      { german: 'die Mutter', english: 'the mother', article: 'die', pronunciation: 'dee MOOT-ter', exampleSentence: 'Meine Mutter ist Lehrerin.', exampleTranslation: 'My mother is a teacher.' },
      { german: 'die Eltern', english: 'the parents (plural)', pronunciation: 'dee EL-tern', exampleSentence: 'Meine Eltern wohnen in Wien.', exampleTranslation: 'My parents live in Vienna.' },
      { german: 'der Bruder', english: 'the brother', article: 'der', pronunciation: 'dayr BROO-der', exampleSentence: 'Ich habe einen Bruder.', exampleTranslation: 'I have a brother.' },
      { german: 'die Schwester', english: 'the sister', article: 'die', pronunciation: 'dee SHVES-ter', exampleSentence: 'Meine Schwester studiert Medizin.', exampleTranslation: 'My sister studies medicine.' }
    ],
    exampleSentences: [
      { german: 'Das ist mein Bruder Max und das ist meine Schwester Julia.', english: 'This is my brother Max and this is my sister Julia.' },
      { german: 'Sind Sie verheiratet? — Ja, ich bin verheiratet.', english: 'Are you married? — Yes, I am married.' },
      { german: 'Haben Sie Kinder? — Ja, wir haben zwei Kinder.', english: 'Do you have children? — Yes, we have two children.' }
    ],
    dialogue: [
      { speaker: 'Markus', german: 'Hast du Geschwister, Sarah?', english: 'Do you have siblings, Sarah?' },
      { speaker: 'Sarah', german: 'Ja, ich habe einen älteren Bruder und eine kleine Schwester.', english: 'Yes, I have an older brother and a little sister.' },
      { speaker: 'Markus', german: 'Schön! Und wohnen deine Eltern auch in Berlin?', english: 'Nice! And do your parents also live in Berlin?' },
      { speaker: 'Sarah', german: 'Nein, meine Eltern wohnen in Bonn. Und deine Familie?', english: 'No, my parents live in Bonn. And your family?' },
      { speaker: 'Markus', german: 'Meine Familie ist klein, nur mein Vater und ich.', english: 'My family is small, just my father and me.' }
    ],
    grammarFocus: {
      title: 'Possessive Pronouns: "mein" vs. "meine"',
      explanation: 'Use "mein" for masculine (der) and neuter (das) nouns. Add an "-e" ("meine") for feminine (die) and all plural nouns.',
      rules: [
        { rule: 'der Bruder -> mein Bruder', example: 'Mein Bruder arbeitet hier.' },
        { rule: 'das Kind -> mein Kind', example: 'Das ist mein Kind.' },
        { rule: 'die Mutter -> meine Mutter', example: 'Meine Mutter kocht gern.' },
        { rule: 'die Eltern -> meine Eltern', example: 'Meine Eltern sind nett.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q5_1',
        question: 'Which is the correct possessive form for "father" (der Vater)?',
        options: ['meine Vater', 'mein Vater', 'meinen Vater', 'meiner Vater'],
        correctIndex: 1,
        explanation: '"der Vater" is masculine nominative, so we use "mein Vater".'
      },
      {
        id: 'q5_2',
        question: 'Which is the correct possessive form for "sister" (die Schwester)?',
        options: ['mein Schwester', 'meine Schwester', 'meines Schwester', 'meinem Schwester'],
        correctIndex: 1,
        explanation: '"die Schwester" is feminine, so we add "-e": "meine Schwester".'
      },
      {
        id: 'q5_3',
        question: 'What does "Hast du Geschwister?" mean?',
        options: ['Do you have children?', 'Do you have siblings?', 'Are you married?', 'Where is your brother?'],
        correctIndex: 1,
        explanation: '"Geschwister" is the German collective noun for siblings.'
      },
      {
        id: 'q5_4',
        question: 'What is the German word for "parents"?',
        options: ['die Kinder', 'die Eltern', 'die Großeltern', 'die Verwandten'],
        correctIndex: 1,
        explanation: '"Die Eltern" means "the parents".'
      },
      {
        id: 'q5_5',
        question: 'How do you say "I am married"?',
        options: ['Ich bin ledig.', 'Ich bin geschieden.', 'Ich bin verheiratet.', 'Ich bin allein.'],
        correctIndex: 2,
        explanation: '"Verheiratet" means married.'
      }
    ],
    usefulPhrases: [
      { german: 'Das ist meine Familie.', english: 'This is my family.', note: 'When showing photos.' },
      { german: 'Hast du Geschwister?', english: 'Do you have siblings?', note: 'Great conversation starter.' },
      { german: 'Ich bin verheiratet.', english: 'I am married.', note: 'Common question on administrative forms.' },
      { german: 'Ich habe keine Kinder.', english: 'I have no children.', note: 'Negative expression with "keine".' },
      { german: 'Meine Eltern leben in...', english: 'My parents live in...', note: 'Talking about home origins.' }
    ],
    xpReward: 100
  },

  // LESSON 6: Daily Routine
  {
    lessonNumber: 6,
    id: 'a1_lesson_06',
    germanTitle: 'Tagesablauf',
    englishTitle: 'Daily Routine',
    shortExplanation: 'Describe your typical day from waking up, going to work or university, to evening relaxation using separable verbs.',
    vocabulary: [
      { german: 'aufstehen', english: 'to get up / wake up', pronunciation: 'OWF-shtay-en', exampleSentence: 'Ich stehe um sieben Uhr auf.', exampleTranslation: 'I get up at seven o\'clock.' },
      { german: 'frühstücken', english: 'to eat breakfast', pronunciation: 'FROO-shtoo-ken', exampleSentence: 'Ich frühstücke mit Kaffee.', exampleTranslation: 'I have breakfast with coffee.' },
      { german: 'anfangen', english: 'to start / begin', pronunciation: 'AHN-fahng-en', exampleSentence: 'Die Arbeit fängt um neun an.', exampleTranslation: 'Work starts at nine.' },
      { german: 'einkaufen', english: 'to shop for groceries', pronunciation: 'EYN-kow-fen', exampleSentence: 'Am Nachmittag kaufe ich ein.', exampleTranslation: 'In the afternoon I go grocery shopping.' },
      { german: 'fernsehen', english: 'to watch TV', pronunciation: 'FAIRN-zay-en', exampleSentence: 'Abends sehe ich gern fern.', exampleTranslation: 'In the evening I like to watch TV.' },
      { german: 'schlafen gehen', english: 'to go to sleep', pronunciation: 'SHLAH-fen GAY-en', exampleSentence: 'Um elf Uhr gehe ich schlafen.', exampleTranslation: 'At eleven o\'clock I go to sleep.' }
    ],
    exampleSentences: [
      { german: 'Jeden Morgen stehe ich früh auf.', english: 'Every morning I wake up early.' },
      { german: 'Wann fängt dein Unterricht an?', english: 'When does your class start?' },
      { german: 'Nach der Arbeit koche ich das Abendessen.', english: 'After work I cook dinner.' }
    ],
    dialogue: [
      { speaker: 'Felix', german: 'Wann stehst du normalerweise auf, Laura?', english: 'When do you normally get up, Laura?' },
      { speaker: 'Laura', german: 'Ich stehe um sieben Uhr auf und trinke zuerst einen Kaffee.', english: 'I get up at seven o\'clock and first drink a coffee.' },
      { speaker: 'Felix', german: 'Und wann fängt deine Arbeit an?', english: 'And when does your work start?' },
      { speaker: 'Laura', german: 'Meine Arbeit fängt um halb neun an. Um siebzehn Uhr habe ich Feierabend.', english: 'My work starts at half past eight. At 5 PM I finish work (Feierabend).' },
      { speaker: 'Felix', german: 'Feierabend ist die schönste Zeit!', english: 'Feierabend is the best time!' }
    ],
    grammarFocus: {
      title: 'German Separable Verbs (Trennbare Verben)',
      explanation: 'Verbs like aufstehen, einkaufen, and anfangen split in present tense main clauses. The prefix (auf-, ein-, an-) jumps to the very end of the sentence!',
      rules: [
        { rule: 'aufstehen -> Ich stehe ... auf', example: 'Ich stehe jeden Tag um 7 Uhr auf.' },
        { rule: 'einkaufen -> Ich kaufe ... ein', example: 'Ich kaufe heute im Supermarkt ein.' },
        { rule: 'anrufen -> Ich rufe ... an', example: 'Ich rufe dich später an.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q6_1',
        question: 'Where does the prefix go in a present tense sentence with "aufstehen"?',
        options: ['At the start', 'Right after the subject', 'At the very end of the sentence', 'Before the main verb'],
        correctIndex: 2,
        explanation: 'In German separable verbs, the prefix splits and moves to the very end: "Ich stehe um 7 Uhr auf."'
      },
      {
        id: 'q6_2',
        question: 'Complete the sentence: "Ich kaufe im Supermarkt _____."',
        options: ['auf', 'ein', 'an', 'ab'],
        correctIndex: 1,
        explanation: 'The verb is "einkaufen" (to shop), so the prefix is "ein".'
      },
      {
        id: 'q6_3',
        question: 'What is the culturally beloved German word "Feierabend"?',
        options: ['A birthday party', 'The end of the workday / evening leisure time', 'Weekend holiday', 'Lunch break'],
        correctIndex: 1,
        explanation: '"Feierabend" is the treasured German concept of having finished work for the day.'
      },
      {
        id: 'q6_4',
        question: 'How do you say "I watch TV in the evening"?',
        options: ['Ich sehe abends fern.', 'Ich fernsehe abends.', 'Ich blicke fern abends.', 'Ich schaue TV an.'],
        correctIndex: 0,
        explanation: '"fernsehen" splits into "Ich sehe ... fern".'
      },
      {
        id: 'q6_5',
        question: 'Translate: "Wann fängt der Kurs an?"',
        options: ['Where is the course?', 'When does the course end?', 'When does the course start?', 'Who is teaching the course?'],
        correctIndex: 2,
        explanation: '"anfangen" means to begin/start. "Wann fängt ... an?" means "When does ... start?".'
      }
    ],
    usefulPhrases: [
      { german: 'Schönen Feierabend!', english: 'Have a great evening after work!', note: 'Universal phrase when leaving the office.' },
      { german: 'Ich stehe um ... Uhr auf.', english: 'I get up at ... o\'clock.', note: 'Describing schedule.' },
      { german: 'Ich habe keine Zeit.', english: 'I have no time.', note: 'When in a hurry.' },
      { german: 'Ich mache eine Pause.', english: 'I am taking a break.', note: 'Crucial for coffee breaks.' },
      { german: 'Gute Nacht, schlaf gut!', english: 'Good night, sleep well!', note: 'Evening farewell.' }
    ],
    xpReward: 100
  },

  // LESSON 7: Time and Dates
  {
    lessonNumber: 7,
    id: 'a1_lesson_07',
    germanTitle: 'Uhrzeit und Datum',
    englishTitle: 'Time and Dates',
    shortExplanation: 'Tell the time using formal and colloquial styles, days of the week, months, and schedule appointments (Termine).',
    vocabulary: [
      { german: 'die Uhrzeit', english: 'the clock time', article: 'die', pronunciation: 'dee OOR-tsyt', exampleSentence: 'Wie viel Uhr ist es?', exampleTranslation: 'What time is it?' },
      { german: 'der Termin', english: 'the appointment', article: 'der', pronunciation: 'dayr tair-MEEN', exampleSentence: 'Ich habe einen Termin beim Arzt.', exampleTranslation: 'I have an appointment at the doctor\'s.' },
      { german: 'halb', english: 'half past (literally half before)', pronunciation: 'HAHLP', exampleSentence: 'Es ist halb drei (2:30).', exampleTranslation: 'It is half past two (2:30).' },
      { german: 'Viertel', english: 'quarter', article: 'das', pronunciation: 'FEER-tel', exampleSentence: 'Viertel nach vier.', exampleTranslation: 'Quarter past four.' },
      { german: 'der Montag', english: 'Monday', article: 'der', pronunciation: 'dayr MOHN-tahk', exampleSentence: 'Am Montag habe ich frei.', exampleTranslation: 'On Monday I have time off.' },
      { german: 'heute, morgen, gestern', english: 'today, tomorrow, yesterday', pronunciation: 'HOY-tuh, MOR-gen, GES-tairn', exampleSentence: 'Heute ist schönes Wetter.', exampleTranslation: 'Today the weather is nice.' }
    ],
    exampleSentences: [
      { german: 'Wie spät ist es? — Es ist punkt vierzehn Uhr.', english: 'What time is it? — It is exactly 2:00 PM.' },
      { german: 'Können wir uns am Freitag um fünfzehn Uhr treffen?', english: 'Can we meet on Friday at 3:00 PM?' },
      { german: 'Der Zug fährt um Viertel vor acht ab.', english: 'The train departs at quarter to eight.' }
    ],
    dialogue: [
      { speaker: 'Sekretariat', german: 'Bürgeramt Mitte, guten Tag! Wie kann ich helfen?', english: 'Citizens Registration Office Center, good day! How can I help?' },
      { speaker: 'Bürger', german: 'Guten Tag, ich brauche einen Termin für die Anmeldung.', english: 'Good day, I need an appointment for registration.' },
      { speaker: 'Sekretariat', german: 'Haben Sie am Donnerstag um halb zehn Zeit?', english: 'Do you have time on Thursday at 9:30 AM?' },
      { speaker: 'Bürger', german: 'Ja, Donnerstag um neun Uhr dreißig passt mir sehr gut.', english: 'Yes, Thursday at 9:30 suits me very well.' },
      { speaker: 'Sekretariat', german: 'Perfekt, der Termin ist bestätigt. Bis Donnerstag!', english: 'Perfect, the appointment is confirmed. See you Thursday!' }
    ],
    grammarFocus: {
      title: 'Telling Time: "halb" Warning & Prepositions "um" and "am"',
      explanation: 'WARNING: In German, "halb drei" means 2:30 (halfway TO three), NOT 3:30! Always subtract 30 minutes. Use "um" for clock times ("um 8 Uhr") and "am" for days of the week and dates ("am Montag").',
      rules: [
        { rule: 'halb vier = 3:30', example: 'halb vier = half an hour until four (3:30)' },
        { rule: 'um + time', example: 'Der Kurs beginnt um 9 Uhr.' },
        { rule: 'am + day/date', example: 'Am Montag, am 15. Mai.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q7_1',
        question: 'What time is "halb acht" in German?',
        options: ['8:30', '7:30', '8:15', '7:45'],
        correctIndex: 1,
        explanation: '"Halb acht" means halfway to 8:00, which is 7:30!'
      },
      {
        id: 'q7_2',
        question: 'Which preposition is used for specific clock times (e.g., 10 o\'clock)?',
        options: ['am', 'im', 'um', 'bei'],
        correctIndex: 2,
        explanation: 'We always use "um" for clock times: "um 10 Uhr".'
      },
      {
        id: 'q7_3',
        question: 'Which preposition is used for days of the week (e.g., Monday)?',
        options: ['am', 'um', 'in', 'von'],
        correctIndex: 0,
        explanation: 'We use "am" (an + dem) for days: "am Montag", "am Dienstag".'
      },
      {
        id: 'q7_4',
        question: 'Translate: "Wie spät ist es?"',
        options: ['Why are you late?', 'What time is it?', 'How far is it?', 'When does it start?'],
        correctIndex: 1,
        explanation: '"Wie spät ist es?" (literally "how late is it?") is the universal German way to ask the time.'
      },
      {
        id: 'q7_5',
        question: 'What does "Viertel nach sechs" mean?',
        options: ['6:15', '6:45', '5:45', '6:30'],
        correctIndex: 0,
        explanation: '"Viertel nach sechs" means quarter past six (6:15).'
      }
    ],
    usefulPhrases: [
      { german: 'Wie viel Uhr ist es?', english: 'What time is it?', note: 'Standard polite question on the street.' },
      { german: 'Ich habe einen Termin.', english: 'I have an appointment.', note: 'Vital when arriving at doctors or offices.' },
      { german: 'Das passt mir gut.', english: 'That suits me well.', note: 'Confirming proposed meeting time.' },
      { german: 'Können wir den Termin verschieben?', english: 'Could we reschedule the appointment?', note: 'Polite rescheduling phrase.' },
      { german: 'Ich bin gleich da!', english: 'I will be right there / almost there!', note: 'When running slightly late.' }
    ],
    xpReward: 100
  },

  // LESSON 8: Food and Drinks
  {
    lessonNumber: 8,
    id: 'a1_lesson_08',
    germanTitle: 'Essen und Trinken',
    englishTitle: 'Food and Drinks',
    shortExplanation: 'Learn staple foods, German bakery treats, drinks, expressing hunger and thirst, and using "möchten".',
    vocabulary: [
      { german: 'das Brot', english: 'the bread', article: 'das', pronunciation: 'dahs BROHT', exampleSentence: 'Deutsches Brot ist weltberühmt.', exampleTranslation: 'German bread is world-famous.' },
      { german: 'das Brötchen', english: 'the bread roll', article: 'das', pronunciation: 'dahs BRUHT-khen', exampleSentence: 'Zwei Brötchen bitte!', exampleTranslation: 'Two bread rolls please!' },
      { german: 'der Käse', english: 'the cheese', article: 'der', pronunciation: 'dayr KAY-zuh', exampleSentence: 'Ich mag Käse.', exampleTranslation: 'I like cheese.' },
      { german: 'das Wasser', english: 'the water', article: 'das', pronunciation: 'dahs VAH-ser', exampleSentence: 'Ein Glas Wasser bitte.', exampleTranslation: 'A glass of water please.' },
      { german: 'der Kaffee', english: 'the coffee', article: 'der', pronunciation: 'dayr KAH-fay', exampleSentence: 'Ich trinke morgens Kaffee.', exampleTranslation: 'I drink coffee in the morning.' },
      { german: 'möchten', english: 'would like', pronunciation: 'MURKH-ten', exampleSentence: 'Was möchten Sie trinken?', exampleTranslation: 'What would you like to drink?' }
    ],
    exampleSentences: [
      { german: 'Ich habe Hunger und Durst.', english: 'I am hungry and thirsty.' },
      { german: 'Ich esse gern Obst und Gemüse.', english: 'I like eating fruit and vegetables.' },
      { german: 'Was isst du zum Frühstück?', english: 'What do you eat for breakfast?' }
    ],
    dialogue: [
      { speaker: 'Bäcker', german: 'Guten Morgen! Was darf es sein?', english: 'Good morning! What can I get for you?' },
      { speaker: 'Kunde', german: 'Guten Morgen! Ich möchte bitte drei Vollkornbrötchen.', english: 'Good morning! I would like three whole-wheat rolls, please.' },
      { speaker: 'Bäcker', german: 'Gerne. Darf es noch etwas sein?', english: 'Gladly. Anything else?' },
      { speaker: 'Kunde', german: 'Ja, noch ein Stück Apfelkuchen bitte.', english: 'Yes, one piece of apple cake please.' },
      { speaker: 'Bäcker', german: 'Das macht zusammen 4 Euro 80, bitte.', english: 'That comes to 4 euros 80 altogether, please.' }
    ],
    grammarFocus: {
      title: 'Polite Requests with "möchte" & Accusative Case Intro',
      explanation: 'Use "ich möchte" (I would like) instead of demanding "ich will" (I want). Masculine nouns in the direct object (accusative) change: der -> den, ein -> einen (e.g., "Ich möchte einen Kaffee").',
      rules: [
        { rule: 'der Kaffee -> einen Kaffee', example: 'Ich möchte einen Kaffee (accusative).' },
        { rule: 'das Wasser -> ein Wasser', example: 'Ich trinke ein Wasser (neuter stays unchanged).' },
        { rule: 'die Pizza -> eine Pizza', example: 'Ich esse eine Pizza (feminine stays unchanged).' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q8_1',
        question: 'How do you politely say "I would like a coffee" in German?',
        options: ['Ich will Kaffee.', 'Ich möchte einen Kaffee.', 'Kaffee her.', 'Ich brauche Kaffee sofort.'],
        correctIndex: 1,
        explanation: '"Ich möchte einen Kaffee" uses the polite subjunctive "möchte" and correct accusative masculine article "einen".'
      },
      {
        id: 'q8_2',
        question: 'How do you say "I am hungry" in German?',
        options: ['Ich bin Hunger.', 'Ich habe Hunger.', 'Ich mache Hunger.', 'Ich esse Hunger.'],
        correctIndex: 1,
        explanation: 'In German, you say you "have hunger": "Ich habe Hunger".'
      },
      {
        id: 'q8_3',
        question: 'What is a "Brötchen"?',
        options: ['A full loaf of bread', 'A small bread roll', 'A sandwich', 'A cookie'],
        correctIndex: 1,
        explanation: 'A "Brötchen" (or Semmel in Bavaria) is the ubiquitous German breakfast bread roll.'
      },
      {
        id: 'q8_4',
        question: 'What does a baker say when asking "Anything else?" in a German bakery?',
        options: ['Auf Wiedersehen!', 'Darf es noch etwas sein?', 'Wie heißt du?', 'Wer ist da?'],
        correctIndex: 1,
        explanation: '"Darf es noch etwas sein?" is the classic polite question: "May there be anything else?".'
      },
      {
        id: 'q8_5',
        question: 'What is the German word for "mineral water with carbonation / gas"?',
        options: ['Stilles Wasser', 'Wasser mit Kohlensäure / Sprudel', 'Leitungswasser', 'Warmes Wasser'],
        correctIndex: 1,
        explanation: 'Germans love sparkling water: "mit Kohlensäure" or "Sprudelwasser". Still water is "stilles Wasser".'
      }
    ],
    usefulPhrases: [
      { german: 'Guten Appetit!', english: 'Enjoy your meal!', note: 'Said before everyone starts eating.' },
      { german: 'Ich möchte bitte...', english: 'I would like ... please.', note: 'Essential polite order phrase.' },
      { german: 'Ich habe Hunger / Durst.', english: 'I am hungry / thirsty.', note: 'State physiological needs.' },
      { german: 'Sonst noch etwas?', english: 'Anything else?', note: 'Frequent question from grocery cashiers.' },
      { german: 'Danke, das ist alles.', english: 'Thank you, that is all.', note: 'Signals you are finished ordering.' }
    ],
    xpReward: 100
  },

  // LESSON 9: Shopping
  {
    lessonNumber: 9,
    id: 'a1_lesson_09',
    germanTitle: 'Einkaufen im Supermarkt',
    englishTitle: 'Shopping',
    shortExplanation: 'Navigate German supermarkets (Aldi, Lidl, Rewe, Edeka), pay with card or cash, and understand the Pfand system.',
    vocabulary: [
      { german: 'der Supermarkt', english: 'the supermarket', article: 'der', pronunciation: 'dayr ZOO-per-markt', exampleSentence: 'Ich gehe in den Supermarkt.', exampleTranslation: 'I am going to the supermarket.' },
      { german: 'die Kasse', english: 'the checkout register', article: 'die', pronunciation: 'dee KAH-suh', exampleSentence: 'An der Kasse muss man warten.', exampleTranslation: 'At the checkout one must wait.' },
      { german: 'die Tüte', english: 'the shopping bag', article: 'die', pronunciation: 'dee TOO-tuh', exampleSentence: 'Brauchen Sie eine Tüte?', exampleTranslation: 'Do you need a bag?' },
      { german: 'der Kassenbon', english: 'the receipt', article: 'der', pronunciation: 'dayr KAH-sen-bong', exampleSentence: 'Brauchen Sie den Kassenbon?', exampleTranslation: 'Do you need the receipt?' },
      { german: 'das Pfand', english: 'bottle deposit', article: 'das', pronunciation: 'dahs PFAHNT', exampleSentence: 'Vergiss nicht das Pfand!', exampleTranslation: 'Don\'t forget the bottle deposit!' },
      { german: 'zahlen / bezahlen', english: 'to pay', pronunciation: 'TSAH-len / buh-TSAH-len', exampleSentence: 'Kann ich mit Karte zahlen?', exampleTranslation: 'Can I pay by card?' }
    ],
    exampleSentences: [
      { german: 'Zahlen Sie bar oder mit Karte?', english: 'Are you paying in cash or by card?' },
      { german: 'Ich bezahle mit EC-Karte.', english: 'I pay with debit card.' },
      { german: 'Wo finde ich Milch und Eier?', english: 'Where do I find milk and eggs?' }
    ],
    dialogue: [
      { speaker: 'Kassiererin', german: 'Hallo! Haben Sie eine Kundenkarte?', english: 'Hello! Do you have a loyalty card?' },
      { speaker: 'Käufer', german: 'Nein, habe ich nicht.', english: 'No, I don\'t.' },
      { speaker: 'Kassiererin', german: 'Das macht 18 Euro 40. Zahlen Sie bar oder mit Karte?', english: 'That comes to 18 euros 40. Are you paying cash or card?' },
      { speaker: 'Käufer', german: 'Mit Karte, bitte.', english: 'With card, please.' },
      { speaker: 'Kassiererin', german: 'Bitte auflegen. Brauchen Sie den Bon?', english: 'Please tap. Do you need the receipt?' },
      { speaker: 'Käufer', german: 'Nein, danke. Schönen Tag noch!', english: 'No, thank you. Have a nice day!' }
    ],
    grammarFocus: {
      title: 'Modal Verb "können" (can/to be able to) in Questions',
      explanation: 'Use "Kann ich..." to ask for permission or capability. The second verb moves to the very end of the question in the infinitive form.',
      rules: [
        { rule: 'Kann ich ... zahlen?', example: 'Kann ich mit Karte zahlen?' },
        { rule: 'Können Sie mir helfen?', example: 'Could you help me?' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q9_1',
        question: 'How do you ask "Can I pay by card?" in German?',
        options: ['Kann ich mit Karte zahlen?', 'Muss ich Karte haben?', 'Wo ist Geld?', 'Geben Sie mir Karte!'],
        correctIndex: 0,
        explanation: '"Kann ich mit Karte zahlen?" is the standard question at checkouts.'
      },
      {
        id: 'q9_2',
        question: 'What is the German "Pfand" system?',
        options: ['A discount coupon', 'A refundable bottle deposit returned at machine kiosks', 'A lottery ticket', 'A sales tax'],
        correctIndex: 1,
        explanation: 'In Germany, bottles and cans have a deposit (usually 0.15€ or 0.25€) refunded when returned to a machine.'
      },
      {
        id: 'q9_3',
        question: 'What does the cashier ask when saying: "Brauchen Sie den Kassenbon?"',
        options: ['Do you need a shopping bag?', 'Do you want the receipt?', 'Do you have coins?', 'Are you a student?'],
        correctIndex: 1,
        explanation: '"Der Kassenbon" is the paper checkout receipt.'
      },
      {
        id: 'q9_4',
        question: 'How do you say you want to pay with cash?',
        options: ['Ich zahle bar.', 'Ich zahle mit Karte.', 'Ich habe kein Geld.', 'Später bitte.'],
        correctIndex: 0,
        explanation: '"Bar zahlen" specifically means paying with physical cash.'
      },
      {
        id: 'q9_5',
        question: 'Why do you need a 1€ coin or shopping token (Chip) in German supermarkets?',
        options: ['To enter the store', 'To unlock the shopping cart (Einkaufswagen)', 'To pay the parking guard', 'To buy a plastic bag'],
        correctIndex: 1,
        explanation: 'German shopping carts require a 1€ or 50-cent coin to unlock from the chain.'
      }
    ],
    usefulPhrases: [
      { german: 'Mit Karte, bitte.', english: 'With card, please.', note: 'Said when cashier states total.' },
      { german: 'Bar, bitte.', english: 'Cash, please.', note: 'Said when paying with notes/coins.' },
      { german: 'Den Bon brauche ich nicht.', english: 'I don\'t need the receipt.', note: 'Saves paper at checkout.' },
      { german: 'Wo finde ich...?', english: 'Where do I find...?', note: 'Ask supermarket staff for items.' },
      { german: 'Brauche ich eine Tüte?', english: 'Do I need a bag?', note: 'Remember German supermarkets charge for bags!' }
    ],
    xpReward: 100
  },

  // LESSON 10: Restaurant
  {
    lessonNumber: 10,
    id: 'a1_lesson_10',
    germanTitle: 'Im Restaurant bestellen',
    englishTitle: 'Restaurant',
    shortExplanation: 'Reserve a table, order food and drinks, ask for the bill, and learn German restaurant etiquette and tipping (Trinkgeld).',
    vocabulary: [
      { german: 'die Speisekarte', english: 'the menu', article: 'die', pronunciation: 'dee SHPY-zuh-kar-tuh', exampleSentence: 'Die Speisekarte, bitte!', exampleTranslation: 'The menu, please!' },
      { german: 'der Kellner / die Kellnerin', english: 'the waiter / waitress', article: 'der', pronunciation: 'dayr KEL-ner', exampleSentence: 'Der Kellner ist sehr freundlich.', exampleTranslation: 'The waiter is very friendly.' },
      { german: 'die Rechnung', english: 'the bill / check', article: 'die', pronunciation: 'dee REKH-noong', exampleSentence: 'Wir möchten bitte zahlen.', exampleTranslation: 'We would like to pay, please.' },
      { german: 'das Trinkgeld', english: 'the tip', article: 'das', pronunciation: 'dahs TRINK-gelt', exampleSentence: 'Trinkgeld ist etwa 5 bis 10 Prozent.', exampleTranslation: 'Tip is about 5 to 10 percent.' },
      { german: 'zusammen oder getrennt', english: 'together or separately', pronunciation: 'tsoo-ZAH-men oh-der geh-TRENT', exampleSentence: 'Zahlen Sie zusammen oder getrennt?', exampleTranslation: 'Are you paying together or separately?' },
      { german: 'lecker', english: 'delicious / tasty', pronunciation: 'LEK-er', exampleSentence: 'Das Essen war sehr lecker!', exampleTranslation: 'The food was very delicious!' }
    ],
    exampleSentences: [
      { german: 'Einen Tisch für zwei Personen, bitte.', english: 'A table for two people, please.' },
      { german: 'Ich nehme die Gemüsesuppe und ein Schnitzel.', english: 'I will take the vegetable soup and a schnitzel.' },
      { german: 'Hat es Ihnen geschmeckt? — Ja, es war ausgezeichnet!', english: 'Did you enjoy your meal? — Yes, it was excellent!' }
    ],
    dialogue: [
      { speaker: 'Kellner', german: 'Guten Abend! Haben Sie reserviert?', english: 'Good evening! Have you reserved?' },
      { speaker: 'Gast', german: 'Guten Abend! Nein, haben Sie einen Tisch für zwei?', english: 'Good evening! No, do you have a table for two?' },
      { speaker: 'Kellner', german: 'Ja gerne, hier am Fenster. Was möchten Sie trinken?', english: 'Yes gladly, here by the window. What would you like to drink?' },
      { speaker: 'Gast', german: 'Ein großes Mineralwasser und ein Apfelschorle, bitte.', english: 'A large mineral water and an apple spritzer, please.' },
      { speaker: 'Kellner', german: 'Sehr gerne. Kommt sofort!', english: 'Very gladly. Coming right up!' }
    ],
    grammarFocus: {
      title: 'The Verb "nehmen" (to take / choose) with Vowel Change',
      explanation: 'When ordering food, "nehmen" is commonly used ("Ich nehme..."). Note that "nehmen" has a stem vowel change in 2nd and 3rd person: du nimmst, er/sie/es nimmt.',
      rules: [
        { rule: 'Ich nehme ...', example: 'Ich nehme den Fisch.' },
        { rule: 'Du nimmst ...', example: 'Was nimmst du?' },
        { rule: 'Wir möchten bitte zahlen.', example: 'Standard phrase to ask for the bill.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q10_1',
        question: 'How do you ask for the check in a German restaurant?',
        options: ['Ich will gehen.', 'Wir möchten bitte zahlen / Die Rechnung, bitte.', 'Wo ist Geld?', 'Schluss jetzt!'],
        correctIndex: 1,
        explanation: '"Wir möchten bitte zahlen" or "Die Rechnung, bitte" are the polite standard requests.'
      },
      {
        id: 'q10_2',
        question: 'What does the waiter mean by "Zusammen oder getrennt?"',
        options: ['Inside or outside?', 'Paying on one bill or splitting separately?', 'Cash or card?', 'Starters or desserts?'],
        correctIndex: 1,
        explanation: 'In Germany, splitting the bill individually ("getrennt") is very customary and standard.'
      },
      {
        id: 'q10_3',
        question: 'What is "Apfelschorle"?',
        options: ['Apple pie', 'Apple juice mixed with sparkling mineral water', 'Hard cider', 'Hot apple tea'],
        correctIndex: 1,
        explanation: 'Apfelschorle is Germany\'s most popular refreshing non-alcoholic beverage.'
      },
      {
        id: 'q10_4',
        question: 'If a bill is 27.50€ and you want to leave a normal tip, what do you say when handing a 30€ bill?',
        options: ['Gib mir 2.50€ zurück.', 'Machen Sie dreißig.', 'Kein Geld.', 'Danke für nichts.'],
        correctIndex: 1,
        explanation: 'You state the rounded amount you wish to pay: "Machen Sie dreißig (Make it thirty)".'
      },
      {
        id: 'q10_5',
        question: 'How do you compliment the food to the server?',
        options: ['Es war sehr lecker!', 'Es war billig.', 'Ich habe gegessen.', 'Mehr Brot bitte.'],
        correctIndex: 0,
        explanation: '"Es war sehr lecker!" means "It was very delicious!".'
      }
    ],
    usefulPhrases: [
      { german: 'Wir möchten bitte zahlen.', english: 'We would like to pay, please.', note: 'Call the waiter to pay.' },
      { german: 'Getrennt, bitte.', english: 'Separately, please.', note: 'When splitting with colleagues or friends.' },
      { german: 'Machen Sie ... Euro.', english: 'Make it ... euros.', note: 'How to include tip when paying.' },
      { german: 'Entschuldigung, bitte!', english: 'Excuse me, please!', note: 'Call server politely.' },
      { german: 'Ein Glas Leitungswasser, bitte.', english: 'A glass of tap water, please.', note: 'Note: tap water is not always free in Germany.' }
    ],
    xpReward: 100
  },

  // LESSON 11: Home and Apartment
  {
    lessonNumber: 11,
    id: 'a1_lesson_11',
    germanTitle: 'Wohnung und Zuhause',
    englishTitle: 'Home and Apartment',
    shortExplanation: 'Describe rooms, furniture, warm vs. cold rent (Kaltmiete vs. Warmmiete), and apartment hunting in Germany.',
    vocabulary: [
      { german: 'die Wohnung', english: 'the apartment / flat', article: 'die', pronunciation: 'dee VOH-noong', exampleSentence: 'Ich suche eine 2-Zimmer-Wohnung.', exampleTranslation: 'I am looking for a 2-room apartment.' },
      { german: 'die Miete', english: 'the rent', article: 'die', pronunciation: 'dee MEE-tuh', exampleSentence: 'Wie hoch ist die Miete?', exampleTranslation: 'How high is the rent?' },
      { german: 'die Kaltmiete', english: 'base rent (excluding heating/utilities)', article: 'die', pronunciation: 'dee KAHLT-mee-tuh', exampleSentence: 'Die Kaltmiete beträgt 700 Euro.', exampleTranslation: 'The base rent is 700 euros.' },
      { german: 'die Warmmiete', english: 'total rent (including heating/utilities)', article: 'die', pronunciation: 'dee VARM-mee-tuh', exampleSentence: 'Die Warmmiete ist 850 Euro.', exampleTranslation: 'The total warm rent is 850 euros.' },
      { german: 'das Zimmer', english: 'the room', article: 'das', pronunciation: 'dahs TSIM-mer', exampleSentence: 'Die Wohnung hat drei Zimmer.', exampleTranslation: 'The apartment has three rooms.' },
      { german: 'die Küche', english: 'the kitchen', article: 'die', pronunciation: 'dee KOO-khuh', exampleSentence: 'Die Küche ist modern.', exampleTranslation: 'The kitchen is modern.' }
    ],
    exampleSentences: [
      { german: 'Das Wohnzimmer ist sehr hell und gemütlich.', english: 'The living room is very bright and cozy.' },
      { german: 'Gibt es einen Balkon oder Garten?', english: 'Is there a balcony or garden?' },
      { german: 'Die Kaution beträgt drei Monatsmieten.', english: 'The security deposit is three months\' rent.' }
    ],
    dialogue: [
      { speaker: 'Vermieter', german: 'Guten Tag! Das ist die 2-Zimmer-Wohnung im 3. Stock.', english: 'Good day! This is the 2-room apartment on the 3rd floor.' },
      { speaker: 'Mieter', german: 'Guten Tag! Das Wohnzimmer ist wirklich sehr schön und hell.', english: 'Good day! The living room is really very beautiful and bright.' },
      { speaker: 'Mieter', german: 'Sind die Nebenkosten in der Warmmiete enthalten?', english: 'Are the utilities included in the warm rent?' },
      { speaker: 'Vermieter', german: 'Ja, Heizung und Wasser sind inklusive. Nur Strom zahlen Sie extra.', english: 'Yes, heating and water are included. Only electricity you pay separately.' },
      { speaker: 'Mieter', german: 'Das klingt perfekt für mich.', english: 'That sounds perfect for me.' }
    ],
    grammarFocus: {
      title: 'There is / There are with "Es gibt" + Accusative',
      explanation: 'In German, "there is" or "there are" is expressed by "es gibt". "Es gibt" ALWAYS triggers the accusative case for the noun that follows.',
      rules: [
        { rule: 'der Balkon -> Es gibt einen Balkon.', example: 'Masculine takes "einen".' },
        { rule: 'die Küche -> Es gibt eine Küche.', example: 'Feminine takes "eine".' },
        { rule: 'das Bad -> Es gibt ein Bad.', example: 'Neuter takes "ein".' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q11_1',
        question: 'What is the difference between "Kaltmiete" and "Warmmiete"?',
        options: ['Kaltmiete is in winter, Warmmiete in summer', 'Kaltmiete is base rent; Warmmiete includes heating and building utilities', 'Kaltmiete is for students', 'There is no difference'],
        correctIndex: 1,
        explanation: 'Kaltmiete is bare rent; Warmmiete includes heating, water, trash collection, and building maintenance (Nebenkosten).'
      },
      {
        id: 'q11_2',
        question: 'Complete the sentence with "es gibt": "In der Wohnung gibt es _____ großen Balkon (der Balkon)."',
        options: ['ein', 'eine', 'einen', 'einem'],
        correctIndex: 2,
        explanation: '"Es gibt" requires the accusative case. For masculine "der Balkon", it becomes "einen großen Balkon".'
      },
      {
        id: 'q11_3',
        question: 'What is a "WG" (Wohngemeinschaft) in Germany?',
        options: ['A luxury penthouse', 'A shared apartment where flatmates have private bedrooms and share kitchen/bath', 'A hotel room', 'A homeless shelter'],
        correctIndex: 1,
        explanation: 'A WG (flatshare) is the most popular form of living for university students and young professionals in Germany.'
      },
      {
        id: 'q11_4',
        question: 'What is "die Kaution"?',
        options: ['The monthly electricity bill', 'The rental security deposit (usually up to 3 cold rents)', 'The key fee', 'The agent commission'],
        correctIndex: 1,
        explanation: 'Die Kaution is the refundable rental deposit held in an escrow account.'
      },
      {
        id: 'q11_5',
        question: 'What is "das Badezimmer"?',
        options: ['The bedroom', 'The bathroom', 'The kitchen', 'The cellar'],
        correctIndex: 1,
        explanation: '"Das Badezimmer" (or short "das Bad") is the bathroom.'
      }
    ],
    usefulPhrases: [
      { german: 'Ich suche eine Wohnung.', english: 'I am looking for an apartment.', note: 'Apartment searching.' },
      { german: 'Wie hoch ist die Warmmiete?', english: 'How high is the total rent?', note: 'Crucial cost question.' },
      { german: 'Gibt es eine Einbauküche (EBK)?', english: 'Is there a fitted kitchen?', note: 'Many German apartments come without kitchens!' },
      { german: 'Ab wann ist die Wohnung frei?', english: 'From when is the apartment available?', note: 'Move-in date inquiry.' },
      { german: 'Sind Haustiere erlaubt?', english: 'Are pets allowed?', note: 'Clarify with landlord before signing.' }
    ],
    xpReward: 100
  },

  // LESSON 12: Anmeldung and Address
  {
    lessonNumber: 12,
    id: 'a1_lesson_12',
    germanTitle: 'Anmeldung und Bürgeramt',
    englishTitle: 'Anmeldung and Address',
    shortExplanation: 'Understand Germany\'s mandatory residential registration (Anmeldung), postal addresses, and official appointments.',
    vocabulary: [
      { german: 'die Anmeldung', english: 'the official address registration', article: 'die', pronunciation: 'dee AHN-mel-doong', exampleSentence: 'Die Anmeldung beim Bürgeramt ist Pflicht.', exampleTranslation: 'Registration at the citizens\' office is mandatory.' },
      { german: 'das Bürgeramt', english: 'the citizens\' administrative office', article: 'das', pronunciation: 'dahs BOOR-ger-ahmt', exampleSentence: 'Ich habe einen Termin im Bürgeramt.', exampleTranslation: 'I have an appointment at the Bürgeramt.' },
      { german: 'die Meldebestätigung', english: 'the registration certificate', article: 'die', pronunciation: 'dee MEL-duh-buh-shtay-ti-goong', exampleSentence: 'Hier ist Ihre Meldebestätigung.', exampleTranslation: 'Here is your registration certificate.' },
      { german: 'die Wohnungsgeberbestätigung', english: 'landlord confirmation slip', article: 'die', pronunciation: 'VOH-noongs-gay-ber-buh-shtay-ti-goong', exampleSentence: 'Der Vermieter muss das Formular unterschreiben.', exampleTranslation: 'The landlord must sign the form.' },
      { german: 'der Reisepass', english: 'the passport', article: 'der', pronunciation: 'dayr RY-zuh-pahs', exampleSentence: 'Zeigen Sie bitte Ihren Reisepass.', exampleTranslation: 'Please show your passport.' },
      { german: 'die Postleitzahl (PLZ)', english: 'the postal code (5 digits in Germany)', article: 'die', pronunciation: 'dee POST-lyt-tsahl', exampleSentence: 'Wie lautet Ihre Postleitzahl?', exampleTranslation: 'What is your postal code?' }
    ],
    exampleSentences: [
      { german: 'Sie müssen sich innerhalb von 14 Tagen anmelden.', english: 'You must register within 14 days.' },
      { german: 'Bringen Sie bitte Ihren Mietvertrag und Pass mit.', english: 'Please bring your rental contract and passport.' },
      { german: 'Meine Adresse ist Hauptstraße 12, 10115 Berlin.', english: 'My address is Hauptstraße 12, 10115 Berlin.' }
    ],
    dialogue: [
      { speaker: 'Sachbearbeiter', german: 'Guten Tag! Sie möchten sich anmelden?', english: 'Good day! You would like to register your address?' },
      { speaker: 'Bürger', german: 'Guten Tag! Ja, genau. Hier sind mein Pass und die Bestätigung vom Vermieter.', english: 'Good day! Yes, exactly. Here are my passport and the confirmation from the landlord.' },
      { speaker: 'Sachbearbeiter', german: 'Sehr gut, alles ist vollständig. Sind Sie ledig oder verheiratet?', english: 'Very good, everything is complete. Are you single or married?' },
      { speaker: 'Bürger', german: 'Ich bin ledig.', english: 'I am single.' },
      { speaker: 'Sachbearbeiter', german: 'Wunderbar. Hier ist Ihre offizielle Meldebestätigung.', english: 'Wonderful. Here is your official registration certificate.' }
    ],
    grammarFocus: {
      title: 'Modal Verb "müssen" (must / have to)',
      explanation: 'In German bureaucratic contexts, "müssen" indicates a legal obligation. "Sie müssen..." (You must...). The conjugated form takes position 2, and the second verb sits at the end.',
      rules: [
        { rule: 'Ich muss (I must)', example: 'Ich muss mich anmelden.' },
        { rule: 'Sie müssen (You must - formal)', example: 'Sie müssen das Formular ausfüllen.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q12_1',
        question: 'Within how many days are newcomers legally required to register their address (Anmeldung) in Germany?',
        options: ['Within 14 days', 'Within 6 months', 'Within 1 year', 'Never required'],
        correctIndex: 0,
        explanation: 'Under German federal law (Bundesmeldegesetz), you must register your address within 14 days of moving in.'
      },
      {
        id: 'q12_2',
        question: 'Which document from your landlord is mandatory to present at the Bürgeramt?',
        options: ['Wohnungsgeberbestätigung', 'A letter from your parents', 'Bank statement', 'A utility bill'],
        correctIndex: 0,
        explanation: 'The landlord must sign a "Wohnungsgeberbestätigung" confirming you officially moved into the property.'
      },
      {
        id: 'q12_3',
        question: 'How many digits do German postal codes (Postleitzahl / PLZ) have?',
        options: ['4 digits', '5 digits', '6 digits', '3 digits'],
        correctIndex: 1,
        explanation: 'All German postal codes consist of exactly 5 digits (e.g., 10115 Berlin, 80331 München).'
      },
      {
        id: 'q12_4',
        question: 'What is the "Meldebestätigung" required for in Germany?',
        options: ['Opening a bank account, getting a tax ID, and signing internet contracts', 'Booking train tickets', 'Going to a restaurant', 'Buying groceries'],
        correctIndex: 0,
        explanation: 'The Meldebestätigung is the fundamental legal document needed for bank accounts, work permits, and German tax IDs.'
      },
      {
        id: 'q12_5',
        question: 'Translate: "Ich habe einen Termin um zehn Uhr."',
        options: ['I have ten euros.', 'I have an appointment at ten o\'clock.', 'I want to sleep at ten.', 'I will arrive in ten minutes.'],
        correctIndex: 1,
        explanation: '"Termin" means appointment. "Um zehn Uhr" means at ten o\'clock.'
      }
    ],
    usefulPhrases: [
      { german: 'Ich möchte mich anmelden.', english: 'I would like to register my residence.', note: 'Say this upon entering the Bürgeramt.' },
      { german: 'Hier sind meine Unterlagen.', english: 'Here are my documents.', note: 'Handing over papers to the clerk.' },
      { german: 'Wo muss ich unterschreiben?', english: 'Where do I need to sign?', note: 'Signing official registration forms.' },
      { german: 'Wie lautet Ihre Adresse?', english: 'What is your address?', note: 'Common question at banks and clinics.' },
      { german: 'Haben Sie eine Wartenummer?', english: 'Do you have a waiting queue ticket?', note: 'In waiting rooms with display screens.' }
    ],
    xpReward: 100
  },

  // LESSON 13: Doctor and Health
  {
    lessonNumber: 13,
    id: 'a1_lesson_13',
    germanTitle: 'Beim Arzt und Gesundheit',
    englishTitle: 'Doctor and Health',
    shortExplanation: 'Make medical appointments, describe body parts, symptoms, pain, and visit the pharmacy (Apotheke).',
    vocabulary: [
      { german: 'der Arzt / die Ärztin', english: 'the doctor', article: 'der', pronunciation: 'dayr AHRTST', exampleSentence: 'Ich muss zum Arzt gehen.', exampleTranslation: 'I must go to the doctor.' },
      { german: 'die Versichertenkarte', english: 'health insurance chip card', article: 'die', pronunciation: 'fair-ZIKH-er-ten-kar-tuh', exampleSentence: 'Haben Sie Ihre Versichertenkarte dabei?', exampleTranslation: 'Do you have your health insurance card with you?' },
      { german: 'das Rezept', english: 'the medical prescription', article: 'das', pronunciation: 'dahs reh-TSEPT', exampleSentence: 'Der Arzt gibt mir ein Rezept.', exampleTranslation: 'The doctor gives me a prescription.' },
      { german: 'die Apotheke', english: 'the pharmacy', article: 'die', pronunciation: 'dee ah-poh-TAY-kuh', exampleSentence: 'Ich hole Medikamente in der Apotheke.', exampleTranslation: 'I get medications at the pharmacy.' },
      { german: 'die Schmerzen (pl.)', english: 'the pain / aches', pronunciation: 'dee SHMAIR-tsen', exampleSentence: 'Ich habe Kopfschmerzen.', exampleTranslation: 'I have a headache.' },
      { german: 'das Fieber', english: 'the fever', article: 'das', pronunciation: 'dahs FEE-ber', exampleSentence: 'Das Kind hat hohes Fieber.', exampleTranslation: 'The child has high fever.' }
    ],
    exampleSentences: [
      { german: 'Mein Kopf tut weh.', english: 'My head hurts.' },
      { german: 'Ich habe seit zwei Tagen Halsschmerzen und Husten.', english: 'I have had a sore throat and cough for two days.' },
      { german: 'Nehmen Sie diese Tablette dreimal täglich nach dem Essen.', english: 'Take this tablet three times daily after meals.' }
    ],
    dialogue: [
      { speaker: 'Arzthelferin', german: 'Guten Tag! Was fehlt Ihnen denn?', english: 'Good day! What is troubling you?' },
      { speaker: 'Patient', german: 'Guten Tag, mir geht es nicht gut. Ich habe Fieber und starke Halsschmerzen.', english: 'Good day, I do not feel well. I have a fever and severe sore throat.' },
      { speaker: 'Arzthelferin', german: 'Haben Sie Ihre Versicherungskarte dabei?', english: 'Do you have your health insurance card with you?' },
      { speaker: 'Patient', german: 'Ja, hier bitte sehr.', english: 'Yes, here you go.' },
      { speaker: 'Arzthelferin', german: 'Danke. Bitte nehmen Sie im Wartezimmer Platz, Dr. Becker ruft Sie gleich auf.', english: 'Thank you. Please take a seat in the waiting room, Dr. Becker will call you shortly.' }
    ],
    grammarFocus: {
      title: 'Expressing Pain with "wehtun" and "Schmerzen haben"',
      explanation: 'You can express pain in two ways: 1) "Ich habe [Körperteil]schmerzen" (e.g. Bauchschmerzen, Kopfschmerzen), or 2) "Mein [Körperteil] tut weh" (singular) / "Meine Beine tun weh" (plural).',
      rules: [
        { rule: 'tut weh (singular)', example: 'Mein Bauch tut weh.' },
        { rule: 'tun weh (plural)', example: 'Meine Augen tun weh.' },
        { rule: 'Ich habe Kopfschmerzen.', example: 'I have a headache.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q13_1',
        question: 'How do you say "My head hurts" in German?',
        options: ['Mein Kopf tut weh.', 'Mein Kopf ist kaputt.', 'Mein Kopf macht Schmerz.', 'Mein Kopf geht nicht.'],
        correctIndex: 0,
        explanation: '"Mein Kopf tut weh" or "Ich habe Kopfschmerzen" are the natural expressions.'
      },
      {
        id: 'q13_2',
        question: 'What card must you always hand over at a German doctor\'s reception?',
        options: ['Library card', 'Die Versichertenkarte / Krankenkassenkarte', 'Credit card', 'Driver\'s license'],
        correctIndex: 1,
        explanation: 'You must present your German health insurance chip card (Versichertenkarte).'
      },
      {
        id: 'q13_3',
        question: 'Where do you take a doctor\'s prescription ("Rezept") to collect prescription medicine?',
        options: ['Supermarket', 'Die Apotheke (marked with red stylized "A")', 'Drogerie Markt', 'Post office'],
        correctIndex: 1,
        explanation: 'Prescription medications in Germany can only be dispensed at an "Apotheke".'
      },
      {
        id: 'q13_4',
        question: 'What does "Gute Besserung!" mean?',
        options: ['Good morning!', 'Get well soon!', 'Have a safe trip!', 'Congratulations!'],
        correctIndex: 1,
        explanation: '"Gute Besserung!" is the universal German wish for "Get well soon!".'
      },
      {
        id: 'q13_5',
        question: 'What does the doctor ask when saying "Was fehlt Ihnen?"',
        options: ['What are your symptoms / What is bothering you?', 'What did you lose?', 'How much money do you have?', 'Where is your home?'],
        correctIndex: 0,
        explanation: '"Was fehlt Ihnen?" is the standard German medical idiom for "What seems to be the problem?".'
      }
    ],
    usefulPhrases: [
      { german: 'Gute Besserung!', english: 'Get well soon!', note: 'Say to anyone feeling sick.' },
      { german: 'Ich fühle mich nicht gut.', english: 'I don\'t feel well.', note: 'General malaise expression.' },
      { german: 'Ich brauche eine Krankschreibung.', english: 'I need a sick note for work/employer.', note: 'Mandatory for German employers.' },
      { german: 'Haben Sie etwas gegen Kopfschmerzen?', english: 'Do you have something against headaches?', note: 'Ask the pharmacist.' },
      { german: 'Gibt es Nebenwirkungen?', english: 'Are there side effects?', note: 'Medication inquiry.' }
    ],
    xpReward: 100
  },

  // LESSON 14: Bus, Train and Transportation
  {
    lessonNumber: 14,
    id: 'a1_lesson_14',
    germanTitle: 'Bus, Bahn und Verkehr',
    englishTitle: 'Bus, Train and Transportation',
    shortExplanation: 'Master public transit in Germany: U-Bahn, S-Bahn, Deutsche Bahn trains, platforms (Gleis), and ticket validations (Entwerten).',
    vocabulary: [
      { german: 'der Bahnhof', english: 'the train station', article: 'der', pronunciation: 'dayr BAHN-hohf', exampleSentence: 'Wir treffen uns am Hauptbahnhof.', exampleTranslation: 'We meet at the central station.' },
      { german: 'der Zug', english: 'the train', article: 'der', pronunciation: 'dayr TSOOK', exampleSentence: 'Der Zug hat zehn Minuten Verspätung.', exampleTranslation: 'The train has 10 minutes delay.' },
      { german: 'die Fahrkarte', english: 'the transit ticket', article: 'die', pronunciation: 'dee FAHR-kar-tuh', exampleSentence: 'Haben Sie eine gültige Fahrkarte?', exampleTranslation: 'Do you have a valid ticket?' },
      { german: 'das Gleis', english: 'the track / platform', article: 'das', pronunciation: 'dahs GLYS', exampleSentence: 'Der Zug fährt auf Gleis 4 ein.', exampleTranslation: 'The train is arriving on track 4.' },
      { german: 'umsteigen', english: 'to change trains / transfer', pronunciation: 'OOM-shtyg-en', exampleSentence: 'Sie müssen in Köln umsteigen.', exampleTranslation: 'You have to transfer in Cologne.' },
      { german: 'die Verspätung', english: 'the delay', article: 'die', pronunciation: 'dee fair-SHPAY-toong', exampleSentence: 'Wegen Verspätung verpasse ich den Anschluss.', exampleTranslation: 'Because of delay I miss the connection.' }
    ],
    exampleSentences: [
      { german: 'Eine einfache Fahrt nach Frankfurt, bitte.', english: 'A one-way trip to Frankfurt, please.' },
      { german: 'Fährt dieser Bus zum Flughafen?', english: 'Does this bus go to the airport?' },
      { german: 'Vorsicht an der Bahnsteigkante!', english: 'Caution at the platform edge!' }
    ],
    dialogue: [
      { speaker: 'Reisender', german: 'Entschuldigung, wann fährt der nächste ICE nach Hamburg?', english: 'Excuse me, when does the next ICE to Hamburg leave?' },
      { speaker: 'Bahnbeamter', german: 'Der nächste ICE fährt um 14 Uhr 22 von Gleis 7 ab.', english: 'The next ICE departs at 2:22 PM from track 7.' },
      { speaker: 'Reisender', german: 'Muss ich umsteigen?', english: 'Do I have to change trains?' },
      { speaker: 'Bahnbeamter', german: 'Nein, das ist eine Direktverbindung.', english: 'No, that is a direct connection.' },
      { speaker: 'Reisender', german: 'Vielen Dank für Ihre Hilfe!', english: 'Thank you very much for your help!' }
    ],
    grammarFocus: {
      title: 'Transportation Preposition: "mit dem / mit der" (Dative)',
      explanation: 'When traveling by a vehicle, use "mit" followed by the dative case. Masculine and neuter vehicles become "mit dem", feminine becomes "mit der".',
      rules: [
        { rule: 'der Bus -> mit dem Bus', example: 'Ich fahre mit dem Bus.' },
        { rule: 'der Zug -> mit dem Zug', example: 'Er fährt mit dem Zug.' },
        { rule: 'die U-Bahn -> mit der U-Bahn', example: 'Wir fahren mit der U-Bahn.' },
        { rule: 'das Auto / Fahrrad -> mit dem Auto / Rad', example: 'Sie fährt mit dem Fahrrad.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q14_1',
        question: 'Which is the correct German sentence for "I travel by bus"?',
        options: ['Ich fahre mit den Bus.', 'Ich fahre mit dem Bus.', 'Ich fahre durch Bus.', 'Ich fahre in Bus.'],
        correctIndex: 1,
        explanation: 'The preposition "mit" takes the dative case: "der Bus" becomes "mit dem Bus".'
      },
      {
        id: 'q14_2',
        question: 'What is the German word for train platform/track?',
        options: ['der Bahnsteig / das Gleis', 'die Straße', 'die Station', 'der Flughafen'],
        correctIndex: 0,
        explanation: 'Train departures are listed by "Gleis" (track) on platforms.'
      },
      {
        id: 'q14_3',
        question: 'What does "umsteigen" mean when traveling by train?',
        options: ['To buy a ticket', 'To change trains / transfer', 'To cancel the trip', 'To miss the train'],
        correctIndex: 1,
        explanation: '"Umsteigen" means transferring from one train/bus line to another.'
      },
      {
        id: 'q14_4',
        question: 'What does "Deutschlandticket" (or 49-Euro-Ticket) cover?',
        options: ['Only high-speed ICE trains', 'All regional trains, buses, trams, S-Bahn, and U-Bahn across all Germany', 'Only flights in Germany', 'Only taxis'],
        correctIndex: 1,
        explanation: 'The nationwide Deutschlandticket covers all local and regional public transit across the entire country.'
      },
      {
        id: 'q14_5',
        question: 'Why do paper single transit tickets often need to be validated ("entwertet") in stamping machines?',
        options: ['To stamp the date and time so the ticket is activated', 'To fold them', 'To get a refund', 'To check for counterfeit ink'],
        correctIndex: 0,
        explanation: 'In many German cities, a pre-purchased single ticket is invalid until stamped in the little red/yellow "Entwerter" validator.'
      }
    ],
    usefulPhrases: [
      { german: 'Fährt dieser Zug nach...?', english: 'Does this train go to...?', note: 'Check before boarding.' },
      { german: 'Von welchem Gleis fährt der Zug ab?', english: 'From which track does the train depart?', note: 'Finding your departure platform.' },
      { german: 'Einzelfahrt oder Hin- und Rückfahrt?', english: 'One-way or round-trip?', note: 'Ticket vending machine option.' },
      { german: 'Nächster Halt:...', english: 'Next stop:...', note: 'Public transit audio announcement.' },
      { german: 'Zurückbleiben bitte!', english: 'Stand back please!', note: 'Subway doors closing warning.' }
    ],
    xpReward: 100
  },

  // LESSON 15: University
  {
    lessonNumber: 15,
    id: 'a1_lesson_15',
    germanTitle: 'An der Universität',
    englishTitle: 'University',
    shortExplanation: 'Campus life in Germany: lectures (Vorlesung), the student cafeteria (Mensa), library (Bibliothek), and exams (Prüfung).',
    vocabulary: [
      { german: 'die Universität (die Uni)', english: 'the university', article: 'die', pronunciation: 'dee oo-nee-vair-zee-TAYT', exampleSentence: 'Ich studiere an der Universität Heidelberg.', exampleTranslation: 'I study at Heidelberg University.' },
      { german: 'der Student / die Studentin', english: 'the university student', article: 'der', pronunciation: 'dayr shtoo-DENT', exampleSentence: 'In Berlin gibt es viele internationale Studenten.', exampleTranslation: 'In Berlin there are many international students.' },
      { german: 'die Vorlesung', english: 'the university lecture', article: 'die', pronunciation: 'dee FOHR-lay-zoong', exampleSentence: 'Die Vorlesung beginnt um zehn Uhr c.t.', exampleTranslation: 'The lecture begins at 10:15.' },
      { german: 'die Mensa', english: 'the student cafeteria', article: 'die', pronunciation: 'dee MEN-zah', exampleSentence: 'Gehen wir zusammen in die Mensa?', exampleTranslation: 'Shall we go to the cafeteria together?' },
      { german: 'die Bibliothek (die Bib)', english: 'the library', article: 'die', pronunciation: 'dee bee-blee-oh-TAYK', exampleSentence: 'Ich lerne heute in der Bibliothek.', exampleTranslation: 'I am studying in the library today.' },
      { german: 'die Prüfung', english: 'the examination / test', article: 'die', pronunciation: 'dee PROO-foong', exampleSentence: 'Ich habe morgen eine schwere Prüfung.', exampleTranslation: 'I have a difficult exam tomorrow.' }
    ],
    exampleSentences: [
      { german: 'Was studierst du? — Ich studiere Informatik.', english: 'What do you study? — I study Computer Science.' },
      { german: 'Das Essen in der Mensa ist günstig für Studenten.', english: 'The food in the student cafeteria is cheap for students.' },
      { german: 'Wo ist der Hörsaal 1?', english: 'Where is lecture hall 1?' }
    ],
    dialogue: [
      { speaker: 'Jonas', german: 'Hallo Maria! Gehst du auch zur Vorlesung in Mathematik?', english: 'Hello Maria! Are you also going to the lecture in Mathematics?' },
      { speaker: 'Maria', german: 'Hi Jonas! Ja, die fängt gleich im Hörsaal 3 an.', english: 'Hi Jonas! Yes, it starts right away in lecture hall 3.' },
      { speaker: 'Jonas', german: 'Hast du danach Zeit für ein Mittagessen in der Mensa?', english: 'Do you have time afterwards for lunch in the Mensa?' },
      { speaker: 'Maria', german: 'Sehr gerne, heute gibt es Pasta und vegetarische Bowls.', english: 'Very gladly, today there is pasta and vegetarian bowls.' },
      { speaker: 'Jonas', german: 'Klasse, treffen wir uns um zwölf Uhr vor der Bibliothek.', english: 'Great, let\'s meet at 12 o\'clock in front of the library.' }
    ],
    grammarFocus: {
      title: 'The Verb "studieren" vs. "lernen"',
      explanation: 'In German, "studieren" strictly means attending a university or majoring in an academic discipline. For studying for an exam or doing school homework, Germans use "lernen" (e.g., "Ich lerne für die Prüfung").',
      rules: [
        { rule: 'Ich studiere Medizin.', example: 'I major in medicine at university.' },
        { rule: 'Ich lerne Deutsch / für die Prüfung.', example: 'I am learning German / studying for the test.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q15_1',
        question: 'When a German student says "Ich studiere Maschinenbau", what does it mean?',
        options: ['I am fixing machines', 'I study / major in Mechanical Engineering at university', 'I dislike machines', 'I work in a car factory'],
        correctIndex: 1,
        explanation: '"Studieren" specifically means pursuing a university academic degree in a subject.'
      },
      {
        id: 'q15_2',
        question: 'What is the "Mensa" on a German university campus?',
        options: ['The gym', 'The student cafeteria providing subsidized meals', 'The dean\'s office', 'The dormitory'],
        correctIndex: 1,
        explanation: 'The Mensa is the official student dining hall on every German university campus.'
      },
      {
        id: 'q15_3',
        question: 'What does the academic timing abbreviation "c.t." (cum tempore) mean in Germany?',
        options: ['Exactly on the dot', '15 minutes after the hour ("the academic quarter")', 'Cancelled', 'Online only'],
        correctIndex: 1,
        explanation: 'At German universities, a lecture scheduled at "10 Uhr c.t." actually begins 15 minutes later, at 10:15.'
      },
      {
        id: 'q15_4',
        question: 'What is a "Hörsaal"?',
        options: ['Lecture hall / Auditorium', 'Listening room for music', 'Cafeteria table', 'Computer lab'],
        correctIndex: 0,
        explanation: 'A Hörsaal (literally hearing hall) is an academic lecture hall.'
      },
      {
        id: 'q15_5',
        question: 'How do you say "I study in the library"?',
        options: ['Ich lerne in der Bibliothek.', 'Ich studiere in der Buchladen.', 'Ich lese am Haus.', 'Ich schreibe im Zimmer.'],
        correctIndex: 0,
        explanation: 'For preparing or revising in the library, the verb "lernen" is used: "Ich lerne in der Bibliothek".'
      }
    ],
    usefulPhrases: [
      { german: 'Was studierst du?', english: 'What do you study / what is your major?', note: 'Classic icebreaker at uni.' },
      { german: 'Gehen wir in die Mensa?', english: 'Shall we go to the cafeteria?', note: 'Standard lunchtime invitation.' },
      { german: 'Viel Erfolg bei der Prüfung!', english: 'Good luck with the exam!', note: 'Wish fellow students success.' },
      { german: 'Ich bin im ersten Semester.', english: 'I am in my first semester.', note: 'Introducing your study year.' },
      { german: 'Wo finde ich das Prüfungsamt?', english: 'Where do I find the examination office?', note: 'For administrative university questions.' }
    ],
    xpReward: 100
  },

  // LESSON 16: Work and Job
  {
    lessonNumber: 16,
    id: 'a1_lesson_16',
    germanTitle: 'Arbeit und Beruf',
    englishTitle: 'Work and Job',
    shortExplanation: 'Professions, workplace communication, work schedules, colleagues, and describing your occupation.',
    vocabulary: [
      { german: 'die Arbeit', english: 'the work', article: 'die', pronunciation: 'dee AHR-byt', exampleSentence: 'Ich mag meine Arbeit.', exampleTranslation: 'I like my work.' },
      { german: 'der Beruf', english: 'the profession / occupation', article: 'der', pronunciation: 'dayr beh-ROOF', exampleSentence: 'Was sind Sie von Beruf?', exampleTranslation: 'What is your profession?' },
      { german: 'der Kollege / die Kollegin', english: 'the colleague / coworker', article: 'der', pronunciation: 'dayr kol-LAY-guh', exampleSentence: 'Meine Kollegen sind sehr hilfsbereit.', exampleTranslation: 'My colleagues are very helpful.' },
      { german: 'das Büro', english: 'the office', article: 'das', pronunciation: 'dahs boo-ROH', exampleSentence: 'Ich arbeite heute im Büro.', exampleTranslation: 'I am working in the office today.' },
      { german: 'das Homeoffice', english: 'working from home / home office', article: 'das', pronunciation: 'dahs HOHM-of-fis', exampleSentence: 'Freitags mache ich Homeoffice.', exampleTranslation: 'On Fridays I work from home.' },
      { german: 'arbeiten', english: 'to work', pronunciation: 'AHR-by-ten', exampleSentence: 'Ich arbeite bei Siemens als Entwickler.', exampleTranslation: 'I work at Siemens as a developer.' }
    ],
    exampleSentences: [
      { german: 'Was machen Sie beruflich?', english: 'What do you do for a living?' },
      { german: 'Ich arbeite als Softwareentwicklerin in Berlin.', english: 'I work as a software engineer in Berlin.' },
      { german: 'Wir haben um 11 Uhr ein wichtiges Meeting.', english: 'We have an important meeting at 11 o\'clock.' }
    ],
    dialogue: [
      { speaker: 'Herr Schmidt', german: 'Guten Tag, Frau Meyer! Willkommen im Team.', english: 'Good day, Ms. Meyer! Welcome to the team.' },
      { speaker: 'Frau Meyer', german: 'Guten Tag, Herr Schmidt! Vielen Dank, ich freue mich sehr.', english: 'Good day, Mr. Schmidt! Thank you very much, I am very pleased.' },
      { speaker: 'Herr Schmidt', german: 'Hier ist Ihr Arbeitsplatz. Um zehn Uhr haben wir ein Team-Meeting.', english: 'Here is your workstation. At ten o\'clock we have a team meeting.' },
      { speaker: 'Frau Meyer', german: 'Prima. Brauche ich dafür meinen Laptop?', english: 'Great. Do I need my laptop for that?' },
      { speaker: 'Herr Schmidt', german: 'Ja bitte. Danach zeige ich Ihnen die Kaffeeküche.', english: 'Yes please. Afterwards I will show you the coffee kitchen.' }
    ],
    grammarFocus: {
      title: 'Job Titles: Masculine vs. Feminine with "-in" & "als"',
      explanation: 'In German, professions have gendered forms. Most feminine professions add "-in" (and sometimes an Umlaut). When stating your job, use "arbeiten als..." WITHOUT an article.',
      rules: [
        { rule: 'der Lehrer / die Lehrerin', example: 'Er ist Lehrer, sie ist Lehrerin.' },
        { rule: 'der Arzt / die Ärztin', example: 'Er ist Arzt, sie ist Ärztin.' },
        { rule: 'Ich arbeite als Ingenieur.', example: 'Never say "als ein Ingenieur" — omit the article!' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q16_1',
        question: 'How do you say "I work as an engineer" (masculine) correctly in German?',
        options: ['Ich arbeite als ein Ingenieur.', 'Ich arbeite als Ingenieur.', 'Ich mache Ingenieur.', 'Ich bin für Ingenieur.'],
        correctIndex: 1,
        explanation: 'In German, you omit the indefinite article when stating your profession: "Ich arbeite als Ingenieur".'
      },
      {
        id: 'q16_2',
        question: 'What is the feminine form of "der Student"?',
        options: ['die Studentin', 'die Studentfrau', 'die Student', 'die Studentesse'],
        correctIndex: 0,
        explanation: 'Feminine profession and status nouns typically add "-in": "die Studentin".'
      },
      {
        id: 'q16_3',
        question: 'What does "Was machen Sie beruflich?" ask?',
        options: ['Where do you live?', 'What is your hobby?', 'What do you do for a living / career?', 'Are you busy today?'],
        correctIndex: 2,
        explanation: '"Was machen Sie beruflich?" is the standard respectful way to ask someone\'s line of work.'
      },
      {
        id: 'q16_4',
        question: 'What is "Homeoffice" in Germany?',
        options: ['Buying furniture for home', 'Remote work from home', 'A real estate office', 'Retirement'],
        correctIndex: 1,
        explanation: '"Homeoffice" is the widespread loanword used across Germany for remote work.'
      },
      {
        id: 'q16_5',
        question: 'What does "die Kaffeeküche" represent in German offices?',
        options: ['The executive board room', 'The office kitchen/breakroom where colleagues socialize around the coffee machine', 'The entrance hall', 'The copy room'],
        correctIndex: 1,
        explanation: 'The Kaffeeküche is the social heart of every German office.'
      }
    ],
    usefulPhrases: [
      { german: 'Was sind Sie von Beruf?', english: 'What is your profession? (formal)', note: 'Professional inquiry.' },
      { german: 'Ich arbeite als...', english: 'I work as...', note: 'State your job title.' },
      { german: 'Ich habe heute Homeoffice.', english: 'I am working from home today.', note: 'Notify team of remote presence.' },
      { german: 'Ich bin auf der Suche nach einer Stelle.', english: 'I am looking for a job position.', note: 'Job-seeking expression.' },
      { german: 'Schöne Mittagspause!', english: 'Have a nice lunch break!', note: 'Said to colleagues around noon.' }
    ],
    xpReward: 100
  },

  // LESSON 17: Phone Calls
  {
    lessonNumber: 17,
    id: 'a1_lesson_17',
    germanTitle: 'Am Telefon sprechen',
    englishTitle: 'Phone Calls',
    shortExplanation: 'Answering the phone in Germany with your name, asking for someone, leaving a message, and spelling tricky words.',
    vocabulary: [
      { german: 'das Telefon', english: 'the telephone', article: 'das', pronunciation: 'dahs tay-lay-FOHN', exampleSentence: 'Das Telefon klingelt.', exampleTranslation: 'The telephone is ringing.' },
      { german: 'anrufen', english: 'to call (on phone)', pronunciation: 'AHN-roo-fen', exampleSentence: 'Ich rufe dich morgen an.', exampleTranslation: 'I will call you tomorrow.' },
      { german: 'verbinden', english: 'to connect / transfer a call', pronunciation: 'fair-BIN-den', exampleSentence: 'Ich verbinde Sie mit Herrn Müller.', exampleTranslation: 'I will connect you with Mr. Müller.' },
      { german: 'die Nachricht', english: 'the message', article: 'die', pronunciation: 'dee NAH-khrikht', exampleSentence: 'Kann ich eine Nachricht hinterlassen?', exampleTranslation: 'Can I leave a message?' },
      { german: 'zurückrufen', english: 'to call back', pronunciation: 'tsoo-ROOK-roo-fen', exampleSentence: 'Können Sie mich bitte zurückrufen?', exampleTranslation: 'Could you please call me back?' },
      { german: 'besetzt', english: 'busy / engaged (line)', pronunciation: 'buh-ZETST', exampleSentence: 'Die Leitung ist leider besetzt.', exampleTranslation: 'The line is unfortunately busy.' }
    ],
    exampleSentences: [
      { german: 'Schmidt, guten Tag! Was kann ich für Sie tun?', english: 'Schmidt, good day! What can I do for you?' },
      { german: 'Könnte ich bitte mit Frau Wagner sprechen?', english: 'Could I please speak with Ms. Wagner?' },
      { german: 'Er ist gerade in einer Besprechung.', english: 'He is currently in a meeting.' }
    ],
    dialogue: [
      { speaker: 'Sekretärin', german: 'Firma Müller & Partner, Meier am Apparat, guten Tag!', english: 'Company Müller & Partner, Meier speaking, good day!' },
      { speaker: 'Anrufer', german: 'Guten Tag, hier spricht David Smith. Kann ich bitte Herrn Müller sprechen?', english: 'Good day, David Smith speaking here. Can I please speak with Mr. Müller?' },
      { speaker: 'Sekretärin', german: 'Herr Müller ist leider zu Tisch. Möchten Sie eine Nachricht hinterlassen?', english: 'Mr. Müller is unfortunately at lunch. Would you like to leave a message?' },
      { speaker: 'Anrufer', german: 'Ja bitte, er soll mich unter 0170 123456 zurückrufen.', english: 'Yes please, could he call me back at 0170 123456.' },
      { speaker: 'Sekretärin', german: 'Sehr gerne, Herr Smith. Ich richte es ihm aus. Auf Wiederhören!', english: 'Very gladly, Mr. Smith. I will pass it on to him. Goodbye (on phone)!' }
    ],
    grammarFocus: {
      title: 'Telephone Farewell: "Auf Wiederhören" & Answering with Your Last Name',
      explanation: 'In Germany, answering the phone by saying "Hallo" is considered informal or unprofessional. Instead, Germans state their last name first (e.g., "Müller, guten Tag"). When ending a call, say "Auf Wiederhören" (until we hear each other again) instead of "Auf Wiedersehen".',
      rules: [
        { rule: 'Greeting on phone', example: '[Nachname], guten Tag!' },
        { rule: 'Farewell on phone', example: 'Auf Wiederhören! (specifically for phone calls)' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q17_1',
        question: 'What is the correct formal farewell exclusively used at the end of a phone call?',
        options: ['Auf Wiedersehen', 'Auf Wiederhören', 'Guten Morgen', 'Bis gleich'],
        correctIndex: 1,
        explanation: '"Auf Wiederhören" (until we hear each other again) is specifically used for phone conversations.'
      },
      {
        id: 'q17_2',
        question: 'How do Germans traditionally answer a business or professional phone call?',
        options: ['By shouting "Hallo?"', 'By stating their last name and greeting (e.g. "Weber, guten Tag")', 'By asking "Wer bist du?"', 'By staying silent until the other speaks'],
        correctIndex: 1,
        explanation: 'German etiquette dictates stating your last name immediately upon answering.'
      },
      {
        id: 'q17_3',
        question: 'How do you ask "Could you please call me back?" in German?',
        options: ['Können Sie mich bitte zurückrufen?', 'Rufen Sie nie an.', 'Wer ruft an?', 'Gehen Sie weg.'],
        correctIndex: 0,
        explanation: '"Können Sie mich bitte zurückrufen?" politely asks for a callback.'
      },
      {
        id: 'q17_4',
        question: 'What does "Er ist gerade in einer Besprechung" mean?',
        options: ['He went home', 'He is currently in a meeting', 'He is sleeping', 'He left the country'],
        correctIndex: 1,
        explanation: '"In einer Besprechung" means in a meeting or conference.'
      },
      {
        id: 'q17_5',
        question: 'How do you say "Can I leave a message?" on the phone?',
        options: ['Kann ich eine Nachricht hinterlassen?', 'Ich schreibe einen Brief.', 'Geben Sie mir Post.', 'Lesen Sie das!'],
        correctIndex: 0,
        explanation: '"Kann ich eine Nachricht hinterlassen?" is the standard phrase.'
      }
    ],
    usefulPhrases: [
      { german: 'Auf Wiederhören!', english: 'Goodbye (on the phone)!', note: 'Standard phone closing.' },
      { german: 'Hier spricht...', english: '... speaking here.', note: 'Identifying yourself on the line.' },
      { german: 'Einen Moment bitte, ich verbinde.', english: 'One moment please, I will transfer you.', note: 'Switchboard phrase.' },
      { german: 'Ich rufe später noch einmal an.', english: 'I will call again later.', note: 'When person is unavailable.' },
      { german: 'Ich habe Sie akustisch nicht verstanden.', english: 'I couldn\'t hear/understand you acoustically.', note: 'Polite way to ask for repetition when line is bad.' }
    ],
    xpReward: 100
  },

  // LESSON 18: Bank
  {
    lessonNumber: 18,
    id: 'a1_lesson_18',
    germanTitle: 'Auf der Bank und Finanzen',
    englishTitle: 'Bank',
    shortExplanation: 'Open a checking account (Girokonto), understand IBAN, transfer money (Überweisung), and use ATMs (Geldautomat).',
    vocabulary: [
      { german: 'die Bank', english: 'the bank', article: 'die', pronunciation: 'dee BAHNK', exampleSentence: 'Ich gehe zur Bank.', exampleTranslation: 'I am going to the bank.' },
      { german: 'das Girokonto', english: 'the checking account / current account', article: 'das', pronunciation: 'dahs zhee-roh-KOHN-toh', exampleSentence: 'Ich möchte ein Girokonto eröffnen.', exampleTranslation: 'I would like to open a checking account.' },
      { german: 'der Geldautomat (ATM)', english: 'the cash machine / ATM', article: 'der', pronunciation: 'dayr GELT-ow-toh-maht', exampleSentence: 'Wo ist der nächste Geldautomat?', exampleTranslation: 'Where is the nearest ATM?' },
      { german: 'die Überweisung', english: 'the bank wire transfer', article: 'die', pronunciation: 'dee oo-ber-VY-zoong', exampleSentence: 'Ich mache eine Überweisung für die Miete.', exampleTranslation: 'I make a wire transfer for rent.' },
      { german: 'Geld abheben', english: 'to withdraw cash', pronunciation: 'GELT AHP-hay-ben', exampleSentence: 'Ich möchte 50 Euro abheben.', exampleTranslation: 'I would like to withdraw 50 euros.' },
      { german: 'die PIN-Nummer', english: 'the PIN code', article: 'die', pronunciation: 'dee PIN-noo-mer', exampleSentence: 'Geben Sie bitte Ihre PIN ein.', exampleTranslation: 'Please enter your PIN.' }
    ],
    exampleSentences: [
      { german: 'Ich möchte ein deutsches Bankkonto eröffnen.', english: 'I would like to open a German bank account.' },
      { german: 'Miete zahlt man in Deutschland meist per Dauerauftrag.', english: 'In Germany, rent is usually paid via standing order.' },
      { german: 'Wie lautet Ihre IBAN und BIC?', english: 'What are your IBAN and BIC?' }
    ],
    dialogue: [
      { speaker: 'Bankberater', german: 'Guten Tag! Wie kann ich Ihnen helfen?', english: 'Good day! How can I help you?' },
      { speaker: 'Kunde', german: 'Guten Tag, ich bin neu in Deutschland und möchte ein Girokonto eröffnen.', english: 'Good day, I am new to Germany and would like to open a checking account.' },
      { speaker: 'Bankberater', german: 'Sehr gerne. Haben Sie Ihren Pass und Ihre Meldebestätigung dabei?', english: 'Very gladly. Do you have your passport and registration certificate with you?' },
      { speaker: 'Kunde', german: 'Ja, hier sind die Dokumente und meine Steuer-ID.', english: 'Yes, here are the documents and my tax ID.' },
      { speaker: 'Bankberater', german: 'Hervorragend. Ihre EC-Karte und PIN kommen per Post in wenigen Tagen.', english: 'Outstanding. Your debit card and PIN will arrive by mail in a few days.' }
    ],
    grammarFocus: {
      title: 'Modal Verb "dürfen" (may / to be permitted) & Bank Terms',
      explanation: '"Dürfen" expresses permission or rules. In financial forms you will frequently see "Hier dürfen Sie unterschreiben" (You may sign here) or "Man darf nicht..." (One is not allowed to...).',
      rules: [
        { rule: 'Ich darf (I am permitted)', example: 'Darf ich hier unterschreiben?' },
        { rule: 'Geld abheben', example: 'Ich hebe Geld am Automaten ab (separable verb).' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q18_1',
        question: 'What is a "Girokonto" in Germany?',
        options: ['A stock trading account', 'A standard day-to-day checking account for salary and rent', 'A credit card debt', 'A mortgage loan'],
        correctIndex: 1,
        explanation: 'A Girokonto is the essential checking account required in Germany for receiving salaries and paying rent.'
      },
      {
        id: 'q18_2',
        question: 'What is the German term for a cash machine / ATM?',
        options: ['der Geldautomat', 'die Geldkiste', 'der Bankschalter', 'die Kasse'],
        correctIndex: 0,
        explanation: '"Der Geldautomat" is the standard word for an ATM.'
      },
      {
        id: 'q18_3',
        question: 'What two documents are strictly mandatory to open a traditional bank account in Germany?',
        options: ['Bus ticket and library card', 'Passport and Meldebestätigung (address registration)', 'High school diploma and photo', 'Gym membership and electricity bill'],
        correctIndex: 1,
        explanation: 'German banking compliance requires a valid government passport and official Meldebestätigung.'
      },
      {
        id: 'q18_4',
        question: 'What is a "Dauerauftrag"?',
        options: ['A temporary loan', 'A standing recurring automatic bank transfer (e.g. monthly rent)', 'A cancelled check', 'A cash withdrawal'],
        correctIndex: 1,
        explanation: 'A Dauerauftrag automatically transfers fixed recurring expenses like rent on a set date each month.'
      },
      {
        id: 'q18_5',
        question: 'How do you say "to withdraw cash" in German?',
        options: ['Geld einwerfen', 'Geld abheben', 'Geld verschenken', 'Geld verlieren'],
        correctIndex: 1,
        explanation: '"Geld abheben" means withdrawing money from an ATM or teller.'
      }
    ],
    usefulPhrases: [
      { german: 'Ich möchte ein Konto eröffnen.', english: 'I would like to open an account.', note: 'First request at a bank.' },
      { german: 'Wo ist der nächste Geldautomat?', english: 'Where is the nearest ATM?', note: 'Handy when needing cash.' },
      { german: 'Ich möchte Geld überweisen.', english: 'I want to transfer money.', note: 'Initiating a bank transfer.' },
      { german: 'Meine Karte ist gesperrt.', english: 'My card is blocked.', note: 'Urgent banking issue.' },
      { german: 'Bitte PIN eingeben.', english: 'Please enter PIN.', note: 'Display prompt on card terminals.' }
    ],
    xpReward: 100
  },

  // LESSON 19: Asking for Directions
  {
    lessonNumber: 19,
    id: 'a1_lesson_19',
    germanTitle: 'Nach dem Weg fragen',
    englishTitle: 'Asking for Directions',
    shortExplanation: 'Ask for directions on the street, understand left/right/straight ahead, distance, and orientation landmarks.',
    vocabulary: [
      { german: 'der Weg', english: 'the way / path', article: 'der', pronunciation: 'dayr VAYK', exampleSentence: 'Kennen Sie den Weg zum Rathaus?', exampleTranslation: 'Do you know the way to city hall?' },
      { german: 'geradeaus', english: 'straight ahead', pronunciation: 'geh-RAH-duh-owss', exampleSentence: 'Gehen Sie immer geradeaus.', exampleTranslation: 'Go straight ahead.' },
      { german: 'links / rechts', english: 'left / right', pronunciation: 'LINKS / REKHTS', exampleSentence: 'Biegen Sie an der Ampel links ab.', exampleTranslation: 'Turn left at the traffic light.' },
      { german: 'die Ampel', english: 'the traffic light', article: 'die', pronunciation: 'dee AHM-pel', exampleSentence: 'An der Ampel rechts.', exampleTranslation: 'Right at the traffic light.' },
      { german: 'die Kreuzung', english: 'the intersection / crossroads', article: 'die', pronunciation: 'dee KROY-tsoong', exampleSentence: 'An der nächsten Kreuzung.', exampleTranslation: 'At the next intersection.' },
      { german: 'in der Nähe', english: 'nearby', pronunciation: 'in dayr NAY-uh', exampleSentence: 'Gibt es hier eine Apotheke in der Nähe?', exampleTranslation: 'Is there a pharmacy nearby?' }
    ],
    exampleSentences: [
      { german: 'Entschuldigung, wie komme ich zum Hauptbahnhof?', english: 'Excuse me, how do I get to the central station?' },
      { german: 'Biegen Sie die zweite Straße links ab.', english: 'Turn into the second street on the left.' },
      { german: 'Das Museum ist auf der rechten Seite, gegenüber der Kirche.', english: 'The museum is on the right side, opposite the church.' }
    ],
    dialogue: [
      { speaker: 'Tourist', german: 'Entschuldigung, wissen Sie, wo der Marktplatz ist?', english: 'Excuse me, do you know where the market square is?' },
      { speaker: 'Passant', german: 'Ja, das ist ganz einfach. Gehen Sie diese Straße geradeaus bis zur Ampel.', english: 'Yes, that is quite simple. Walk straight ahead down this street until the traffic light.' },
      { speaker: 'Tourist', german: 'Bis zur Ampel, und dann?', english: 'Until the traffic light, and then?' },
      { speaker: 'Passant', german: 'An der Ampel biegen Sie rechts ab. Nach 200 Metern sehen Sie den Marktplatz.', english: 'At the light turn right. After 200 meters you will see the market square.' },
      { speaker: 'Tourist', german: 'Vielen herzlichen Dank für Ihre Hilfe!', english: 'Thank you very much indeed for your help!' },
      { speaker: 'Passant', german: 'Gern geschehen! Schönen Tag!', english: 'You are welcome! Have a nice day!' }
    ],
    grammarFocus: {
      title: 'Imperative Form for Directions: "Gehen Sie..." / "Biegen Sie... ab"',
      explanation: 'To give polite instructions or directions, put the verb first, followed by formal "Sie": "Gehen Sie..." (Walk...), "Biegen Sie ... ab" (Turn...). Notice the separable prefix "ab" moves to the end.',
      rules: [
        { rule: 'Gehen Sie geradeaus.', example: 'Walk straight ahead.' },
        { rule: 'Biegen Sie links ab.', example: 'Turn left.' },
        { rule: 'Nehmen Sie die erste Straße.', example: 'Take the first street.' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q19_1',
        question: 'How do you say "straight ahead" in German?',
        options: ['links', 'rechts', 'geradeaus', 'zurück'],
        correctIndex: 2,
        explanation: '"Geradeaus" means straight ahead.'
      },
      {
        id: 'q19_2',
        question: 'What does "Biegen Sie an der Kreuzung links ab" mean?',
        options: ['Turn right at the station', 'Turn left at the intersection', 'Go straight past the church', 'Stop at the red light'],
        correctIndex: 1,
        explanation: '"Die Kreuzung" is the intersection, and "links abbiegen" means to turn left.'
      },
      {
        id: 'q19_3',
        question: 'How do you politely ask a stranger "Excuse me, where is the subway station?"',
        options: ['Wo ist U-Bahn?', 'Entschuldigung, wo ist hier die nächste U-Bahn-Station?', 'Ich will U-Bahn.', 'Fahr mich U-Bahn.'],
        correctIndex: 1,
        explanation: '"Entschuldigung, wo ist hier die nächste U-Bahn-Station?" is polite and natural.'
      },
      {
        id: 'q19_4',
        question: 'What does "auf der linken Seite" mean?',
        options: ['On the right side', 'On the left side', 'In the middle', 'Far away'],
        correctIndex: 1,
        explanation: '"Links" is left, so "auf der linken Seite" means on the left side.'
      },
      {
        id: 'q19_5',
        question: 'What is the German response "Gern geschehen"?',
        options: ['You\'re welcome / Gladly done', 'Goodbye', 'I disagree', 'No problem at all'],
        correctIndex: 0,
        explanation: '"Gern geschehen" is the classic German equivalent of "You\'re very welcome".'
      }
    ],
    usefulPhrases: [
      { german: 'Entschuldigung, wie komme ich zu...?', english: 'Excuse me, how do I get to...?', note: 'The standard direction question.' },
      { german: 'Ist es weit von hier?', english: 'Is it far from here?', note: 'Ask about walking distance.' },
      { german: 'Es ist gleich um die Ecke.', english: 'It is just around the corner.', note: 'Very close by.' },
      { german: 'Gern geschehen!', english: 'You are welcome!', note: 'Polite answer to thank you.' },
      { german: 'Ich habe mich verlaufen.', english: 'I have lost my way / I am lost.', note: 'Asking for help when lost.' }
    ],
    xpReward: 100
  },

  // LESSON 20: Everyday German in Germany
  {
    lessonNumber: 20,
    id: 'a1_lesson_20',
    germanTitle: 'Alltag in Deutschland',
    englishTitle: 'Everyday German in Germany',
    shortExplanation: 'Essential cultural customs, recycling (Mülltrennung), Sunday shop closures (Sonntagsruhe), quiet hours (Ruhezeit), and living comfortably in Germany.',
    vocabulary: [
      { german: 'der Alltag', english: 'everyday life / daily routine', article: 'der', pronunciation: 'dayr AHL-tahk', exampleSentence: 'Mein Alltag in Deutschland ist spannend.', exampleTranslation: 'My daily life in Germany is exciting.' },
      { german: 'die Mülltrennung', english: 'waste separation / recycling', article: 'die', pronunciation: 'dee MOOL-tren-noong', exampleSentence: 'Mülltrennung ist in Deutschland sehr wichtig.', exampleTranslation: 'Waste separation is very important in Germany.' },
      { german: 'die Ruhezeit', english: 'quiet hours (often 22:00–06:00 and all Sunday)', article: 'die', pronunciation: 'dee ROO-uh-tsyt', exampleSentence: 'Ab 22 Uhr gilt die Nachtruhe.', exampleTranslation: 'From 10 PM nighttime quiet hours apply.' },
      { german: 'die Pünktlichkeit', english: 'punctuality', article: 'die', pronunciation: 'dee POONKT-likh-kyt', exampleSentence: 'Pünktlichkeit wird in Deutschland geschätzt.', exampleTranslation: 'Punctuality is valued in Germany.' },
      { german: 'geschlossen', english: 'closed', pronunciation: 'geh-SHLOS-sen', exampleSentence: 'Am Sonntag sind die Geschäfte geschlossen.', exampleTranslation: 'On Sunday the shops are closed.' },
      { german: 'geöffnet', english: 'open', pronunciation: 'geh-UHF-net', exampleSentence: 'Die Bäckerei ist ab 7 Uhr geöffnet.', exampleTranslation: 'The bakery is open from 7 AM.' }
    ],
    exampleSentences: [
      { german: 'In Deutschland sind Supermärkte am Sonntag geschlossen.', english: 'In Germany, supermarkets are closed on Sundays.' },
      { german: 'Papier kommt in die blaue Tonne, Plastik in den gelben Sack.', english: 'Paper goes into the blue bin, plastic into the yellow sack.' },
      { german: 'Seien Sie bitte pünktlich zum Termin!', english: 'Please be punctual for the appointment!' }
    ],
    dialogue: [
      { speaker: 'Nachbar', german: 'Guten Tag, Herr Keller! Sie sind neu im Haus eingezogen?', english: 'Good day, Mr. Keller! You newly moved into the building?' },
      { speaker: 'Herr Keller', german: 'Guten Tag, Frau Weber! Ja, ich lerne gerade die Hausordnung kennen.', english: 'Good day, Ms. Weber! Yes, I am currently getting to know the building house rules.' },
      { speaker: 'Nachbar', german: 'Wunderbar! Wichtig ist die Mülltrennung im Hof und die Ruhezeit ab 22 Uhr.', english: 'Wonderful! Important is the waste separation in the courtyard and quiet hours from 10 PM.' },
      { speaker: 'Herr Keller', german: 'Vielen Dank für den Hinweis, ich achte sehr darauf.', english: 'Thank you very much for the note, I will pay close attention to it.' },
      { speaker: 'Nachbar', german: 'Sehr gerne. Wenn Sie Fragen haben, klingeln Sie einfach bei mir!', english: 'Very gladly. If you have questions, just ring my doorbell!' }
    ],
    grammarFocus: {
      title: 'A1 German Milestones Review: Word Order in Main Clauses',
      explanation: 'In standard German main clauses, the conjugated verb ALWAYS stands in Position 2! Even if you start the sentence with time ("Heute lerne ich...") or location ("In Berlin wohne ich..."), the verb remains stubbornly second.',
      rules: [
        { rule: 'Standard: Subject + Verb + Object', example: 'Ich lerne jeden Tag Deutsch.' },
        { rule: 'Time first: Time + Verb + Subject', example: 'Heute lerne ich Deutsch (Verb stays in Position 2!).' },
        { rule: 'Congratulations on completing A1!', example: 'Herzlichen Glückwunsch zum A1-Kurs!' }
      ]
    },
    practiceQuestions: [
      {
        id: 'q20_1',
        question: 'Are regular supermarkets and clothing stores open on Sundays in Germany?',
        options: ['Yes, 24/7', 'No, shops are legally closed on Sundays (Sonntagsruhe), except in major train stations', 'Only in the evening', 'Only for tourists'],
        correctIndex: 1,
        explanation: 'Under Germany\'s Ladenschlussgesetz, virtually all supermarkets and retail shops are closed on Sundays.'
      },
      {
        id: 'q20_2',
        question: 'Which bin is used for clean paper and cardboard (Papier) in German residential recycling?',
        options: ['Die gelbe Tonne', 'Die blaue Tonne', 'Die Biotonne', 'Der Restmüll'],
        correctIndex: 1,
        explanation: 'In Germany, paper and cardboard are recycled in the blue bin ("blaue Tonne").'
      },
      {
        id: 'q20_3',
        question: 'What time does the standard evening "Ruhezeit" (nighttime quiet hours) begin in residential buildings?',
        options: ['18:00 (6 PM)', '20:00 (8 PM)', '22:00 (10 PM)', 'Midnight'],
        correctIndex: 2,
        explanation: 'At 22:00 (10 PM), legal quiet hours (Nachtruhe) begin; loud music, washing machines, and vacuuming are prohibited.'
      },
      {
        id: 'q20_4',
        question: 'In a German main clause, which position does the conjugated verb ALWAYS occupy?',
        options: ['Position 1', 'Position 2', 'At the very end', 'Any position freely'],
        correctIndex: 1,
        explanation: 'The fundamental golden rule of German grammar: in a normal main clause statement, the conjugated verb is strictly in Position 2.'
      },
      {
        id: 'q20_5',
        question: 'How do you say "Congratulations!" in German?',
        options: ['Gute Nacht!', 'Herzlichen Glückwunsch!', 'Auf Wiedersehen!', 'Entschuldigung!'],
        correctIndex: 1,
        explanation: '"Herzlichen Glückwunsch!" is the universal German exclamation for "Warmest congratulations!".'
      }
    ],
    usefulPhrases: [
      { german: 'Herzlichen Glückwunsch!', english: 'Congratulations!', note: 'Celebrate milestone accomplishments.' },
      { german: 'Schönen Sonntag!', english: 'Have a nice Sunday!', note: 'Classic weekend greeting.' },
      { german: 'Ich wünsche Ihnen alles Gute!', english: 'I wish you all the best!', note: 'Warm well wishes.' },
      { german: 'Alles klar!', english: 'All clear / Got it!', note: 'Universal acknowledgment in conversation.' },
      { german: 'Auf jeden Fall!', english: 'Definitely / By all means!', note: 'Strong enthusiastic agreement.' }
    ],
    xpReward: 100
  }
];
