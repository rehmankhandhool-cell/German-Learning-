import { ConversationScenario } from '../types';

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'wohnung',
    title: 'Wohnung / Landlord',
    subtitle: 'Apartment Search, Viewings & Landlord Requests',
    category: 'Housing & Living',
    iconName: 'Home',
    explanation: 'Practice communicating with your German landlord (Vermieter) or estate agent (Makler). Learn how to request an apartment viewing (Besichtigungstermin), ask about the warm rent (Warmmiete), clarify utility costs (Nebenkosten), and report household repairs.',
    usefulPhrases: [
      {
        german: 'Guten Tag, ist die Wohnung in der Hauptstraße noch frei?',
        english: 'Hello, is the apartment on Hauptstraße still available?'
      },
      {
        german: 'Wie hoch ist die Warmmiete inklusive Nebenkosten und Heizung?',
        english: 'How much is the warm rent including utilities and heating?'
      },
      {
        german: 'Wie viele Monatsmieten beträgt die Mietkaution?',
        english: 'How many months of rent is the security deposit?'
      },
      {
        german: 'Könnten wir einen Termin für eine Besichtigung vereinbaren?',
        english: 'Could we arrange an appointment for a flat viewing?'
      },
      {
        german: 'Die Heizung im Wohnzimmer funktioniert leider seit gestern nicht mehr.',
        english: 'Unfortunately the heating in the living room has not worked since yesterday.'
      }
    ],
    initialDialogue: {
      partnerName: 'Herr Weber',
      partnerRole: 'Vermieter (Landlord)',
      partnerMessage: 'Guten Tag! Schön, dass Sie sich für die 2-Zimmer-Wohnung interessieren. Haben Sie vorab Fragen zur Lage oder zur Warmmiete?',
      partnerEnglishHint: 'Hello! Nice that you are interested in the 2-room apartment. Do you have questions in advance regarding location or warm rent?'
    },
    sampleResponses: [
      {
        partnerMessage: 'Die Warmmiete beträgt 820 Euro pro Monat inklusive Heizung und Wasser. Strom und Internet müssen Sie separat anmelden.',
        partnerEnglishHint: 'The warm rent is 820 euros per month including heating and water. Electricity and internet must be registered separately.'
      },
      {
        partnerMessage: 'Sehr gerne! Passt Ihnen Donnerstag um 17:30 Uhr für eine Besichtigung? Bitte bringen Sie die letzten Gehaltsnachweise mit.',
        partnerEnglishHint: 'With pleasure! Does Thursday at 5:30 PM suit you for a viewing? Please bring your recent proof of salary.'
      },
      {
        partnerMessage: 'Vielen Dank für Ihre Rückmeldung. Ich notiere Ihren Termin und erwarte Sie pünktlich an der Hauseingangstür!',
        partnerEnglishHint: 'Thank you very much for your feedback. I have noted your appointment and will expect you punctually at the front door!'
      }
    ]
  },
  {
    id: 'anmeldung',
    title: 'Anmeldung / Bürgeramt',
    subtitle: 'City Registration, Resident Services & Bureaucracy',
    category: 'Official Bureaucracy',
    iconName: 'Building2',
    explanation: 'Every resident in Germany must complete the address registration (Wohnsitzanmeldung) at the Bürgeramt within 14 days of moving. Master how to present your appointment ticket, hand over your landlord certificate (Wohnungsgeberbestätigung), and request your Tax ID (Steuer-ID).',
    usefulPhrases: [
      {
        german: 'Guten Tag, ich habe einen Termin zur Wohnsitzanmeldung.',
        english: 'Hello, I have an appointment for address registration.'
      },
      {
        german: 'Hier sind mein Reisepass und die Wohnungsgeberbestätigung.',
        english: 'Here are my passport and the landlord confirmation certificate.'
      },
      {
        german: 'Wann und wie erhalte ich meine Steuer-Identifikationsnummer?',
        english: 'When and how will I receive my Tax Identification Number?'
      },
      {
        german: 'Könnten Sie mir bitte die amtliche Meldebestätigung ausstellen?',
        english: 'Could you please issue me the official registration confirmation?'
      },
      {
        german: 'Muss ich mich auch bei der Ausländerbehörde melden?',
        english: 'Do I also need to register with the Immigration Office?'
      }
    ],
    initialDialogue: {
      partnerName: 'Frau Hoffmann',
      partnerRole: 'Sachbearbeiterin (Bürgeramt Officer)',
      partnerMessage: 'Guten Morgen! Sie sind Aufrufnummer 142? Bitte nehmen Sie Platz. Haben Sie das ausgefüllte Anmeldeformular und Ihre Dokumente dabei?',
      partnerEnglishHint: 'Good morning! Are you ticket number 142? Please take a seat. Do you have the completed registration form and your documents with you?'
    },
    sampleResponses: [
      {
        partnerMessage: 'Ausgezeichnet. Ich prüfe Ihre Wohnungsgeberbestätigung und trage Ihre neue Wohnadresse in das Melderegister ein.',
        partnerEnglishHint: 'Excellent. I am checking your landlord certificate and entering your new residential address into the register.'
      },
      {
        partnerMessage: 'Hier ist Ihre amtliche Meldebestätigung. Bitte bewahren Sie dieses Original sorgfältig für die Bank und Krankenkasse auf.',
        partnerEnglishHint: 'Here is your official registration confirmation. Please keep this original document safely for your bank and health insurance.'
      },
      {
        partnerMessage: 'Ihre deutsche Steuer-ID wird Ihnen automatisch innerhalb von 2 bis 3 Wochen per Post zugeschickt. Schönen Tag noch!',
        partnerEnglishHint: 'Your German Tax ID will automatically be sent to you by post within 2 to 3 weeks. Have a great day!'
      }
    ]
  },
  {
    id: 'doctor',
    title: 'Doctor',
    subtitle: 'Medical Appointments, Symptoms & Pharmacy',
    category: 'Healthcare & Medicine',
    iconName: 'Stethoscope',
    explanation: 'Navigate visiting a German general practitioner (Hausarzt) or specialist. Learn how to describe physical symptoms, clarify health insurance coverage (Krankenkasse), understand prescriptions (Rezept), and request sick leave certificates (AU-Bescheinigung).',
    usefulPhrases: [
      {
        german: 'Guten Tag, ich habe starke Halsschmerzen und seit gestern hohes Fieber.',
        english: 'Hello, I have a severe sore throat and a high fever since yesterday.'
      },
      {
        german: 'Ich brauche eine Arbeitsunfähigkeitsbescheinigung (Krankmeldung) für meinen Arbeitgeber.',
        english: 'I need a certificate of incapacity for work (sick note) for my employer.'
      },
      {
        german: 'Wie oft und zu welchen Zeiten soll ich dieses Medikament einnehmen?',
        english: 'How often and at what times should I take this medication?'
      },
      {
        german: 'Ich bin bei einer gesetzlichen Krankenkasse versichert. Hier ist meine Versichertenkarte.',
        english: 'I am insured with a public health insurer. Here is my insurance health card.'
      },
      {
        german: 'Gibt es bekannte Nebenwirkungen bei diesen Tabletten?',
        english: 'Are there any known side effects with these tablets?'
      }
    ],
    initialDialogue: {
      partnerName: 'Dr. Schneider',
      partnerRole: 'Hausarzt (General Practitioner)',
      partnerMessage: 'Guten Tag! Nehmen Sie bitte Platz. Was führt Sie heute zu mir und welche Beschwerden machen Ihnen zu schaffen?',
      partnerEnglishHint: 'Good day! Please take a seat. What brings you to see me today and what symptoms are troubling you?'
    },
    sampleResponses: [
      {
        partnerMessage: 'Ich verstehe. Ich schaue mir jetzt kurz Ihren Hals an und höre Ihre Lunge ab. Bitte einmal tief ein- und ausatmen.',
        partnerEnglishHint: 'I understand. I will now inspect your throat and listen to your lungs. Please take a deep breath in and out.'
      },
      {
        partnerMessage: 'Sie haben eine akute Mandelentzündung. Ich verschreibe Ihnen ein Antibiotikum und ein Schmerzmittel für die ersten Tage.',
        partnerEnglishHint: 'You have an acute tonsillitis. I will prescribe you an antibiotic and a pain reliever for the first few days.'
      },
      {
        partnerMessage: 'Ich schreibe Sie für diese Woche bis Freitag krank. Die eAU übermitteln wir digital an Ihre Krankenkasse. Gute Besserung!',
        partnerEnglishHint: 'I am putting you on sick leave for this week until Friday. We transmit the electronic sick note digitally. Get well soon!'
      }
    ]
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    subtitle: 'Career, Qualifications, Work Culture & Questions',
    category: 'Career & Employment',
    iconName: 'Briefcase',
    explanation: 'Prepare for job interviews (Vorstellungsgespräche) in Germany. Practice presenting your qualifications, answering common recruiter questions about your teamwork and strengths, and asking professional questions about company culture and onboarding.',
    usefulPhrases: [
      {
        german: 'Vielen Dank für die Einladung zum Vorstellungsgespräch. Ich freue mich auf das Gespräch.',
        english: 'Thank you very much for the invitation to the interview. I look forward to our conversation.'
      },
      {
        german: 'In meiner letzten Tätigkeit habe ich mich auf modernes Projektmanagement spezialisiert.',
        english: 'In my previous position I specialized in modern project management.'
      },
      {
        german: 'Ich schätze eine transparente Kommunikation und konstruktive Zusammenarbeit im Team.',
        english: 'I value transparent communication and constructive collaboration in the team.'
      },
      {
        german: 'Welche Weiterbildungsmöglichkeiten und Einarbeitungspläne gibt es für diese Position?',
        english: 'What training opportunities and onboarding plans exist for this position?'
      },
      {
        german: 'Ich könnte die Stelle flexibel zum nächsten Monat oder nach Vereinbarung antreten.',
        english: 'I could start the position flexibly next month or by arrangement.'
      }
    ],
    initialDialogue: {
      partnerName: 'Frau Becker',
      partnerRole: 'Personalabteilung (HR Manager)',
      partnerMessage: 'Guten Tag und herzlich willkommen bei uns! Schön, dass Sie sich die Zeit nehmen. Erzählen Sie uns bitte kurz, warum Sie sich für diese Stelle entschieden haben.',
      partnerEnglishHint: 'Good day and welcome to our company! Nice that you take the time. Please tell us briefly why you decided on this position.'
    },
    sampleResponses: [
      {
        partnerMessage: 'Das passt hervorragend zu unserem Profil! Wie gehen Sie typischerweise mit engen Fristen oder unerwarteten Änderungen im Projekt um?',
        partnerEnglishHint: 'That matches our profile outstandingly! How do you typically deal with tight deadlines or unexpected project changes?'
      },
      {
        partnerMessage: 'Sehr guter Ansatz. Bei uns arbeiten wir mit agilen Sprints und zwei Tagen Homeoffice pro Woche. Klingt das für Sie passend?',
        partnerEnglishHint: 'Very good approach. We work with agile sprints and two days of home office per week. Does that sound fitting for you?'
      },
      {
        partnerMessage: 'Vielen Dank für den sehr positiven Austausch! Wir stimmen uns intern ab und geben Ihnen bis Ende nächster Woche Bescheid.',
        partnerEnglishHint: 'Thank you very much for the very positive exchange! We will coordinate internally and let you know by the end of next week.'
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping',
    subtitle: 'Supermarket, Bakeries, Returns & Customer Inquiries',
    category: 'Daily Errands',
    iconName: 'ShoppingBag',
    explanation: 'Practice everyday shopping in German supermarkets (Supermarkt), bakeries (Bäckerei), and department stores. Master asking for product locations, returning items (Umtausch), weighing produce, and paying by cash or card.',
    usefulPhrases: [
      {
        german: 'Entschuldigung, wo finde ich frische Milch und Haferflocken?',
        english: 'Excuse me, where can I find fresh milk and rolled oats?'
      },
      {
        german: 'Ich möchte gerne zwei Dinkelbrötchen und ein Roggenbrot, bitte.',
        english: 'I would like two spelt bread rolls and one rye bread, please.'
      },
      {
        german: 'Kann ich diesen Pullover umtauschen, wenn er nicht passt?',
        english: 'Can I exchange this sweater if it does not fit?'
      },
      {
        german: 'Kann ich mit Karte oder kontaktlos mit dem Smartphone bezahlen?',
        english: 'Can I pay with card or contactlessly with my smartphone?'
      },
      {
        german: 'Ich brauche keinen Kassenbon, vielen Dank!',
        english: 'I do not need a paper receipt, thank you very much!'
      }
    ],
    initialDialogue: {
      partnerName: 'Lukas',
      partnerRole: 'Mitarbeiter (Store Associate)',
      partnerMessage: 'Hallo! Kann ich Ihnen behilflich sein, oder suchen Sie eine bestimmte Zutat in unserem Sortiment?',
      partnerEnglishHint: 'Hello! Can I help you, or are you looking for a specific ingredient in our assortment?'
    },
    sampleResponses: [
      {
        partnerMessage: 'Selbstverständlich! Die Bio-Milchprodukte und Haferflocken stehen gleich in Gang 3 bei den Frühstückswaren.',
        partnerEnglishHint: 'Of course! The organic dairy products and oats are right in aisle 3 by the breakfast goods.'
      },
      {
        partnerMessage: 'Ja, kontaktlose Kartenzahlung mit EC-Karte, Visa oder Apple Pay ist an allen Kassen möglich.',
        partnerEnglishHint: 'Yes, contactless card payment with debit card, Visa, or Apple Pay is possible at all checkouts.'
      },
      {
        partnerMessage: 'Gern geschehen! Wenn Sie sonst noch etwas brauchen, fragen Sie mich einfach. Einen schönen Tag noch!',
        partnerEnglishHint: 'You are welcome! If you need anything else, just ask me. Have a nice day!'
      }
    ]
  },
  {
    id: 'bus-train',
    title: 'Bus / Train',
    subtitle: 'Public Transit, Ticket Machines & Train Delays',
    category: 'Mobility & Transit',
    iconName: 'Train',
    explanation: 'Navigate the German train and bus network (Deutsche Bahn, S-Bahn, U-Bahn, Bus). Practice checking platform departures (Gleis), asking about connections (Anschlusszug), understanding delay announcements (Verspätung), and ticket controls.',
    usefulPhrases: [
      {
        german: 'Von welchem Gleis fährt der ICE nach Frankfurt am Main ab?',
        english: 'From which platform does the ICE to Frankfurt am Main depart?'
      },
      {
        german: 'Gilt das Deutschlandticket auch in diesem Regionalexpress?',
        english: 'Is the Deutschlandticket also valid on this Regional Express?'
      },
      {
        german: 'Erreiche ich in Hannover meinen Anschlusszug nach Hamburg noch?',
        english: 'Will I still catch my connecting train to Hamburg in Hanover?'
      },
      {
        german: 'Wegen welcher Störung hat der Zug heute 20 Minuten Verspätung?',
        english: 'Due to which disruption is the train delayed by 20 minutes today?'
      },
      {
        german: 'Muss ich diesen Fahrschein vor dem Einsteigen entwerten?',
        english: 'Do I need to validate (stamp) this ticket before boarding?'
      }
    ],
    initialDialogue: {
      partnerName: 'Herr Meyer',
      partnerRole: 'Zugbegleiter (DB Conductor)',
      partnerMessage: 'Guten Tag! Die Fahrscheine zur Kontrolle, bitte. Haben Sie Ihr Ticket oder das Handyticket zur Hand?',
      partnerEnglishHint: 'Good day! Tickets for inspection, please. Do you have your paper ticket or mobile app ticket ready?'
    },
    sampleResponses: [
      {
        partnerMessage: 'Vielen Dank, Ihr Ticket ist gültig! Der Zug erreicht Mannheim pünktlich um 14:15 Uhr an Gleis 4.',
        partnerEnglishHint: 'Thank you very much, your ticket is valid! The train will reach Mannheim on time at 2:15 PM on platform 4.'
      },
      {
        partnerMessage: 'Ihr Anschlusszug nach München wartet heute am gegenüberliegenden Gleis 5 auf uns. Sie haben 8 Minuten Umsteigezeit.',
        partnerEnglishHint: 'Your connecting train to Munich is waiting for us today on the opposite platform 5. You have 8 minutes transfer time.'
      },
      {
        partnerMessage: 'Gute Weiterfahrt durch Deutschland! Bei Fragen stehen wir Ihnen im Bordrestaurant gerne zur Verfügung.',
        partnerEnglishHint: 'Have a pleasant onward journey through Germany! For any questions, we are available in the onboard bistro.'
      }
    ]
  },
  {
    id: 'university',
    title: 'University',
    subtitle: 'Campus Life, Lectures, Seminars & Student Canteen',
    category: 'Education & Academia',
    iconName: 'GraduationCap',
    explanation: 'Engage with fellow students and university administration. Learn how to ask for lecture halls (Hörsaal), discuss seminar topics and exams (Klausuren), navigate the student canteen (Mensa), and top up your Campus Card.',
    usefulPhrases: [
      {
        german: 'Entschuldige, weißt du wo der Hörsaal 4 für die Vorlesung ist?',
        english: 'Excuse me, do you know where lecture hall 4 is for the lecture?'
      },
      {
        german: 'Hast du dich schon für die Klausur im Prüfungsportal angemeldet?',
        english: 'Have you already registered for the written exam on the examination portal?'
      },
      {
        german: 'Wollen wir nach der Vorlesung zusammen in die Mensa zum Mittagessen gehen?',
        english: 'Do we want to go to the student canteen together for lunch after the lecture?'
      },
      {
        german: 'Kannst du mir die Notizen aus dem letzten Seminar ausleihen?',
        english: 'Can you lend me the notes from the last seminar?'
      },
      {
        german: 'Wo befindet sich das Büro des Fachbereichs und die Sprechstunde?',
        english: 'Where is the departmental faculty office and consultation hours?'
      }
    ],
    initialDialogue: {
      partnerName: 'Sophie',
      partnerRole: 'Kommilitonin (Fellow Student)',
      partnerMessage: 'Hey! Suchst du auch den Seminarraum für Einführung in die Informatik? Der Raum wurde kurzfristig verlegt!',
      partnerEnglishHint: 'Hey! Are you also looking for the seminar room for Introduction to Computer Science? The room was moved at short notice!'
    },
    sampleResponses: [
      {
        partnerMessage: 'Ja, genau! Der Professor hat gerade eine Rundmail geschickt: Wir sind jetzt in Gebäude B, Raum 102. Komm mit!',
        partnerEnglishHint: 'Yes, exactly! The professor just sent an email announcement: We are now in Building B, room 102. Come along!'
      },
      {
        partnerMessage: 'Hast du schon die Übungsblätter für die Abgabe fertig? Wir haben eine Lerngruppe in der Bibliothek gegründet.',
        partnerEnglishHint: 'Have you already finished the assignment exercise sheets? We formed a study group in the library.'
      },
      {
        partnerMessage: 'Super! Lass uns nach der Vorlesung direkt einen Kaffee in der Mensa holen und zusammen lernen.',
        partnerEnglishHint: 'Awesome! Let us grab a coffee in the student canteen right after the lecture and study together.'
      }
    ]
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    subtitle: 'Dining Out, Ordering, Dietary Needs & Splitting Bills',
    category: 'Food & Hospitality',
    iconName: 'Utensils',
    explanation: 'Feel confident dining at German restaurants, cafés, and beer gardens (Biergarten). Learn how to request a table, order dishes and regional beverages, ask about vegetarian or gluten-free options, and pay separately (getrennt zahlen).',
    usefulPhrases: [
      {
        german: 'Guten Abend, haben Sie einen freien Tisch für zwei Personen?',
        english: 'Good evening, do you have a free table for two people?'
      },
      {
        german: 'Könnten wir bitte die Speisekarte und die Getränkekarte bekommen?',
        english: 'Could we please get the food menu and the drinks menu?'
      },
      {
        german: 'Haben Sie auch vegetarische oder laktosefreie Gerichte?',
        english: 'Do you also have vegetarian or lactose-free dishes?'
      },
      {
        german: 'Wir möchten gerne zahlen, bitte getrennt oder zusammen.',
        english: 'We would like to pay, please separately or together.'
      },
      {
        german: 'Stimmt so, vielen Dank! Das Essen war wirklich ausgezeichnet.',
        english: 'Keep the change, thank you very much! The food was truly excellent.'
      }
    ],
    initialDialogue: {
      partnerName: 'Moritz',
      partnerRole: 'Kellner (Restaurant Server)',
      partnerMessage: 'Guten Abend! Herzlich willkommen im Gasthaus zur Linde. Haben Sie reserviert oder darf ich Ihnen einen schönen freien Tisch anbieten?',
      partnerEnglishHint: 'Good evening! Welcome to Gasthaus zur Linde. Have you reserved or may I offer you a nice free table?'
    },
    sampleResponses: [
      {
        partnerMessage: 'Sehr gerne, hier am Fenster ist ein gemütlicher Zweiertisch frei. Darf ich Ihnen vorab schon ein frisches Mineralwasser oder Bier bringen?',
        partnerEnglishHint: 'With pleasure, here by the window is a cozy table for two available. May I bring you a fresh mineral water or beer beforehand?'
      },
      {
        partnerMessage: 'Eine wunderbare Wahl! Die hausgemachten Käsespätzle sind unsere Spezialität und komplett vegetarisch zubereitet.',
        partnerEnglishHint: 'A wonderful choice! The homemade Käsespätzle is our specialty and prepared completely vegetarian.'
      },
      {
        partnerMessage: 'Guten Appetit! Lassen Sie es sich schmecken. Wenn Sie noch Wünsche haben, geben Sie mir einfach ein Zeichen.',
        partnerEnglishHint: 'Enjoy your meal! Let it taste good. If you have any further wishes, simply give me a sign.'
      }
    ]
  }
];
