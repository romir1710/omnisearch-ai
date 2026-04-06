/**
 * mockResults.js - Mocked Search Result Data (Multi-Query)
 *
 * WHY MULTI-QUERY MOCK DATA:
 * A realistic prototype should respond differently to different queries.
 * We maintain multiple result sets keyed by topic, and use keyword matching
 * to select the best set. For unrecognized queries, we return null so the
 * UI can show a helpful "try a demo query" message.
 *
 * Each result's `aiContent` is written at B1 reading level (CEFR) with:
 * - Short sentences (max ~15 words)
 * - Common vocabulary (no jargon)
 * - Bullet points for scanability
 * - Clear action steps
 */

const resultSets = {
    /* ------------------------------------------------------------------
       QUERY SET 1: University of Greenwich
       Matches: greenwich, university, uni greenwich, UoG, courses
       ------------------------------------------------------------------ */
    greenwich: {
        label: "University of Greenwich",
        keywords: [
            "university of greenwich",
            "greenwich",
            "uni greenwich",
            "uog",
            "greenwich university",
            "greenwich courses",
            "greenwich admissions",
            "greenwich campus",
        ],
        results: [
            {
                id: "greenwich-1",
                title: "University of Greenwich - Home",
                url: "https://www.gre.ac.uk",
                snippet:
                    "The University of Greenwich is a public university in London and Kent. Explore our courses, campuses, and student life across three beautiful campuses.",
                aiContent: {
                    heading: "University of Greenwich - Overview",
                    summary:
                        "The University of Greenwich is a public university with campuses in London and Kent. Here is what you need to know.",
                    steps: [
                        "The university has three campuses: Greenwich, Avery Hill, and Medway.",
                        "The main campus is in the Old Royal Naval College in Greenwich, London.",
                        "It offers over 200 undergraduate and postgraduate courses.",
                        "Popular subjects include Computing, Business, Engineering, and Education.",
                        "The university was founded in 1890 and became a university in 1992.",
                        "It has about 28,000 students from over 160 countries.",
                    ],
                    importantNotes: [
                        "Open days are held several times a year - check the website for dates.",
                        "The Greenwich campus is a UNESCO World Heritage Site.",
                        "The university is in the top 40 in the UK for research quality.",
                    ],
                },
            },
            {
                id: "greenwich-2",
                title: "Undergraduate Courses - University of Greenwich",
                url: "https://www.gre.ac.uk/undergraduate-courses",
                snippet:
                    "Browse all undergraduate degree courses at the University of Greenwich. Find entry requirements, UCAS codes, and funding information.",
                aiContent: {
                    heading: "Undergraduate Courses at Greenwich",
                    summary:
                        "The University of Greenwich offers many undergraduate degree courses. Here is how to find and apply for one.",
                    steps: [
                        "Go to gre.ac.uk and click 'Courses' at the top of the page.",
                        "You can search by subject, like Computing, Business, or Nursing.",
                        "Each course page shows the entry requirements (usually UCAS points or grades).",
                        "Most courses are three years full-time, or four years with a placement year.",
                        "You apply through UCAS - the national university application system.",
                        "The UCAS code for the University of Greenwich is G70.",
                        "Tuition fees for UK students are £9,250 per year (2024/25).",
                    ],
                    importantNotes: [
                        "The UCAS deadline for most courses is 31 January each year.",
                        "Some courses like Nursing may have additional requirements or interviews.",
                        "You can apply for Student Finance to help pay for your course.",
                    ],
                },
            },
            {
                id: "greenwich-3",
                title: "Student Life at Greenwich - University of Greenwich",
                url: "https://www.gre.ac.uk/student-life",
                snippet:
                    "Discover what it's like to study at Greenwich. Student accommodation, clubs and societies, support services, and campus facilities.",
                aiContent: {
                    heading: "Student Life at the University of Greenwich",
                    summary:
                        "Being a student at Greenwich is more than just studying. Here is what campus life looks like.",
                    steps: [
                        "There are over 100 clubs and societies to join, from sports to music to volunteering.",
                        "Student accommodation is available on or near each campus.",
                        "The Students' Union runs events, support, and social activities throughout the year.",
                        "There are libraries, computer labs, and study spaces on every campus.",
                        "Free counselling, disability support, and careers advice are available.",
                        "Greenwich has good transport links - the campus is near Cutty Sark DLR station.",
                    ],
                    importantNotes: [
                        "Apply for accommodation early - spaces fill up fast.",
                        "The Students' Union can help if you have any problems during your course.",
                        "Greenwich is close to central London, which is great for nights out and jobs.",
                    ],
                },
            },
            {
                id: "greenwich-4",
                title: "How to Apply - University of Greenwich",
                url: "https://www.gre.ac.uk/apply",
                snippet:
                    "Step-by-step guide on how to apply for undergraduate and postgraduate courses at the University of Greenwich through UCAS or directly.",
                aiContent: {
                    heading: "How to Apply to the University of Greenwich",
                    summary:
                        "Applying to university can feel complicated. Here is a simple guide to help you.",
                    steps: [
                        "For undergraduate courses, apply through UCAS at ucas.com.",
                        "You will need your GCSE and A-level results (or equivalent qualifications).",
                        "Write a personal statement explaining why you want to study the subject.",
                        "Ask a teacher or advisor to write a reference for you.",
                        "For postgraduate courses (Masters), apply directly on the Greenwich website.",
                        "International students may need to show English language qualifications like IELTS.",
                        "You will receive a decision by email - usually within a few weeks.",
                    ],
                    importantNotes: [
                        "The UCAS application fee is £27.50 for one choice or £28.50 for multiple choices.",
                        "You can apply for up to 5 courses on UCAS.",
                        "If you need help with your application, contact the Greenwich admissions team.",
                    ],
                },
            },
        ],
    },

    /* ------------------------------------------------------------------
       QUERY SET 2: Formula One
       Matches: formula one, F1, formula 1, grand prix, racing, motorsport
       ------------------------------------------------------------------ */
    f1: {
        label: "Formula One",
        keywords: [
            "formula one",
            "formula 1",
            "f1",
            "grand prix",
            "racing",
            "motorsport",
            "f1 calendar",
            "f1 standings",
            "f1 drivers",
            "lewis hamilton",
            "max verstappen",
        ],
        results: [
            {
                id: "f1-1",
                title: "Formula 1 - The Official Home of F1 Racing",
                url: "https://www.formula1.com",
                snippet:
                    "The official website of Formula 1. Get the latest F1 news, race results, standings, schedules, and highlights from every Grand Prix.",
                aiContent: {
                    heading: "What is Formula 1?",
                    summary:
                        "Formula 1 (F1) is the most popular car racing sport in the world. Here is what you need to know.",
                    steps: [
                        "F1 is a series of car races called Grand Prix, held in different countries.",
                        "There are about 24 races per season, from March to December.",
                        "Ten teams compete, each with two drivers. That means 20 drivers in total.",
                        "Cars can reach speeds over 230 mph (370 km/h).",
                        "Points are given based on finishing position - first place gets 25 points.",
                        "The driver with the most points at the end of the season becomes World Champion.",
                        "Famous teams include Mercedes, Red Bull, Ferrari, and McLaren.",
                    ],
                    importantNotes: [
                        "You can watch races live on Sky Sports F1 or Channel 4 (highlights) in the UK.",
                        "The F1 season usually starts in March with the Bahrain Grand Prix.",
                        "F1 cars are the fastest regulated road-course racing cars in the world.",
                    ],
                },
            },
            {
                id: "f1-2",
                title: "2025 F1 Season Calendar - Race Dates and Circuits",
                url: "https://www.formula1.com/en/racing/2025",
                snippet:
                    "View the full 2025 Formula 1 race calendar with all Grand Prix dates, circuits, start times, and ticket information.",
                aiContent: {
                    heading: "2025 Formula 1 Race Calendar",
                    summary:
                        "The 2025 F1 season has 24 races around the world. Here are the key dates and locations.",
                    steps: [
                        "The season starts in March with the Australian Grand Prix in Melbourne.",
                        "Popular races include Monaco (May), Silverstone in the UK (July), and Monza in Italy (September).",
                        "Races are usually held on Sundays, with practice on Friday and qualifying on Saturday.",
                        "Each race weekend is called a Grand Prix.",
                        "Some weekends have a shorter format called 'Sprint' with an extra short race on Saturday.",
                        "The season finishes in December with the Abu Dhabi Grand Prix.",
                    ],
                    importantNotes: [
                        "Race start times vary because the races are in different time zones.",
                        "Tickets for popular races like Monaco and Silverstone sell out fast.",
                        "All race times are listed on the official formula1.com website.",
                    ],
                },
            },
            {
                id: "f1-3",
                title: "F1 Driver Standings and Team Rankings - Formula1.com",
                url: "https://www.formula1.com/en/results",
                snippet:
                    "Check the current Formula 1 World Championship standings for drivers and constructors. Updated after every race.",
                aiContent: {
                    heading: "F1 Standings - Drivers and Teams",
                    summary:
                        "The standings show which drivers and teams are winning the championship. They update after every race.",
                    steps: [
                        "The Drivers' Championship ranks all 20 drivers by their total points.",
                        "The Constructors' Championship ranks the 10 teams by combined driver points.",
                        "First place in a race gives 25 points, second gives 18, third gives 15.",
                        "The fastest lap in a race gives 1 extra point if you finish in the top 10.",
                        "You can see the full standings on formula1.com under 'Results'.",
                        "At the end of the season, the top driver and top team win the World Championship.",
                    ],
                    importantNotes: [
                        "Standings change every race weekend - check regularly for updates.",
                        "If two drivers have the same points, the one with more wins ranks higher.",
                        "The Constructors' Championship is very important for teams' prize money.",
                    ],
                },
            },
            {
                id: "f1-4",
                title: "How to Watch Formula 1 in the UK - TV and Streaming Guide",
                url: "https://www.skysports.com/f1",
                snippet:
                    "Find out how to watch live Formula 1 races in the UK, including Sky Sports, Channel 4 highlights, and streaming options.",
                aiContent: {
                    heading: "How to Watch F1 in the UK",
                    summary:
                        "There are several ways to watch Formula 1 races if you live in the UK. Here are your options.",
                    steps: [
                        "Sky Sports F1 shows all races live. You need a Sky Sports subscription.",
                        "Channel 4 shows highlights of selected races for free.",
                        "F1 TV Pro is an online streaming service - it costs about £25 per month.",
                        "Some pubs and sports bars show F1 races on big screens.",
                        "The Silverstone British Grand Prix is one race that Channel 4 usually shows live.",
                        "You can also listen to live radio commentary on BBC Radio 5 Live for free.",
                    ],
                    importantNotes: [
                        "Sky Sports F1 is included in some broadband and mobile bundles.",
                        "F1 TV Pro may have a delay compared to the live TV broadcast.",
                        "Race times in the UK can be early morning for races in Asia or Australia.",
                    ],
                },
            },
        ],
    },

    /* ------------------------------------------------------------------
       QUERY SET 3: Doctor / NHS / Healthcare
       Matches: doctor, GP, NHS, appointment, health, hospital, prescription
       ------------------------------------------------------------------ */
    doctor: {
        label: "Doctor & NHS Healthcare",
        keywords: [
            "doctor",
            "nhs",
            "gp",
            "appointment",
            "health",
            "hospital",
            "prescription",
            "dentist",
            "register",
            "medical",
            "clinic",
        ],
        results: [
            {
                id: "doctor-1",
                title: "Register with a GP Surgery - NHS",
                url: "https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/",
                snippet:
                    "How to find and register with a local GP surgery. Everyone in England can register with a GP for free.",
                aiContent: {
                    heading: "How to Register with a Doctor (GP)",
                    summary:
                        "A GP is your local doctor. You need to register with one before you can get an appointment. It is free.",
                    steps: [
                        "Find a GP near your home. You can search on the NHS website.",
                        "Go to the GP surgery in person, or register online if they allow it.",
                        "Fill in a registration form called a 'GMS1' form.",
                        "You may be asked for proof of address, like a utility bill.",
                        "You do NOT need a passport or visa to register - healthcare is for everyone.",
                        "Once registered, you can book appointments by phone or online.",
                    ],
                    importantNotes: [
                        "A GP surgery cannot refuse to register you because of your immigration status.",
                        "If you cannot find a GP, call NHS England on 0300 311 22 33.",
                        "You can register even if you do not have a fixed address.",
                    ],
                },
            },
            {
                id: "doctor-2",
                title: "Book a GP Appointment - NHS",
                url: "https://www.nhs.uk/nhs-services/gps/gp-appointments-and-referrals/",
                snippet:
                    "Find out how to book, cancel, or change a GP appointment, including online booking through the NHS App.",
                aiContent: {
                    heading: "How to Book a Doctor's Appointment",
                    summary:
                        "Once you are registered with a GP, you can book appointments. Here is how.",
                    steps: [
                        "Call your GP surgery during opening hours - usually 8am to 6pm, Monday to Friday.",
                        "You can also book online using the NHS App or your surgery's website.",
                        "Tell the receptionist what the appointment is about. They need this to give you the right type of appointment.",
                        "If it is urgent, say so - they can often see you the same day.",
                        "If you cannot make your appointment, cancel it as soon as possible.",
                        "You can also call 111 for free NHS advice 24 hours a day.",
                    ],
                    importantNotes: [
                        "If it is an emergency, call 999 or go to A&E.",
                        "The NHS App lets you see your records, order prescriptions, and more.",
                        "If you need an interpreter, tell the surgery when you book.",
                    ],
                },
            },
            {
                id: "doctor-3",
                title: "Get Help with Prescription Costs - NHS",
                url: "https://www.nhs.uk/nhs-services/prescriptions-and-pharmacies/",
                snippet:
                    "Find out if you're entitled to free prescriptions or how to get a prepayment certificate to save money.",
                aiContent: {
                    heading: "Help with Medicine Costs",
                    summary:
                        "Prescriptions in England cost £9.90 each. But many people can get free prescriptions. Check if you can.",
                    steps: [
                        "Prescriptions are free if you are under 16 or over 60.",
                        "They are also free if you are pregnant or had a baby in the last 12 months.",
                        "If you get certain benefits like Universal Credit, you may get free prescriptions.",
                        "If you need lots of prescriptions, buy a prepayment certificate (PPC).",
                        "A 3-month PPC costs £32.05, a 12-month PPC costs £111.60.",
                        "You can buy a PPC online at the NHS website.",
                    ],
                    importantNotes: [
                        "In Scotland, Wales, and Northern Ireland, all prescriptions are free.",
                        "Ask the pharmacist if you are not sure whether you qualify for free prescriptions.",
                        "Do not tick the 'free prescriptions' box unless you qualify - you can be fined.",
                    ],
                },
            },
            {
                id: "doctor-4",
                title: "NHS 111 Online - Check Your Symptoms",
                url: "https://111.nhs.uk/",
                snippet:
                    "Use NHS 111 online to check your symptoms and find out what to do next. Available 24 hours a day.",
                aiContent: {
                    heading: "Check Your Symptoms Online with NHS 111",
                    summary:
                        "If you feel unwell but it is not an emergency, you can check your symptoms online for free.",
                    steps: [
                        "Go to 111.nhs.uk on your computer or phone.",
                        "Answer questions about how you are feeling.",
                        "The website will tell you what to do next.",
                        "It may tell you to see your GP, go to a pharmacy, or go to A&E.",
                        "You can also call 111 on the phone - it is free and available 24 hours.",
                        "Trained advisors will help you decide what to do.",
                    ],
                    importantNotes: [
                        "NHS 111 is NOT for emergencies. If someone is in danger, call 999.",
                        "You do not need to be registered with a GP to use NHS 111.",
                        "The service is available in other languages - ask when you call.",
                    ],
                },
            },
        ],
    },

    /* ------------------------------------------------------------------
       QUERY SET 4: AI and Tech News
       Matches: AI, artificial intelligence, tech, technology, ChatGPT, etc.
       ------------------------------------------------------------------ */
    tech: {
        label: "AI & Tech News",
        keywords: [
            "ai",
            "artificial intelligence",
            "tech",
            "technology",
            "tech news",
            "chatgpt",
            "machine learning",
            "ai news",
            "computer science",
            "robots",
            "automation",
            "gadgets",
            "software",
            "coding",
            "programming",
        ],
        results: [
            {
                id: "tech-1",
                title: "What Is Artificial Intelligence (AI)? - A Simple Explanation",
                url: "https://www.bbc.co.uk/news/technology-ai",
                snippet:
                    "Artificial intelligence is when computers are trained to think and learn like humans. Learn what AI is, how it works, and how it is changing the world.",
                aiContent: {
                    heading: "What Is AI? A Simple Guide",
                    summary:
                        "AI stands for Artificial Intelligence. It means teaching computers to do things that normally need a human brain. Here is what you should know.",
                    steps: [
                        "AI is software that can learn from examples and make decisions.",
                        "You already use AI every day - like voice assistants (Siri, Alexa) and spell check.",
                        "ChatGPT is a popular AI tool that can have conversations and answer questions.",
                        "AI can help with many things: translating languages, diagnosing illnesses, and driving cars.",
                        "AI is trained using large amounts of data - the more data it gets, the smarter it becomes.",
                        "Some people worry about AI replacing jobs, but it also creates new types of work.",
                    ],
                    importantNotes: [
                        "AI is a tool - it is not perfect and can sometimes give wrong answers.",
                        "Always double-check important information from AI tools.",
                        "AI cannot truly 'think' like a human - it finds patterns in data.",
                    ],
                },
            },
            {
                id: "tech-2",
                title: "Latest Technology News - BBC Technology",
                url: "https://www.bbc.co.uk/news/technology",
                snippet:
                    "Get the latest technology news, reviews, and analysis from the BBC. Covers AI, social media, cybersecurity, gadgets, and the tech industry.",
                aiContent: {
                    heading: "Where to Read Tech News",
                    summary:
                        "Keeping up with technology news helps you understand how the digital world is changing. Here are the best places to read tech news.",
                    steps: [
                        "The BBC Technology section covers major tech stories in plain language.",
                        "The Verge (theverge.com) has detailed articles about gadgets, AI, and software.",
                        "Wired (wired.com) covers how technology impacts society and culture.",
                        "TechCrunch (techcrunch.com) focuses on start-ups and new technology companies.",
                        "You can also follow tech news on social media or YouTube.",
                        "Most tech news sites are free to read, but some have paywalls for premium content.",
                    ],
                    importantNotes: [
                        "Be careful of clickbait headlines - read the full article before sharing.",
                        "Look for trusted sources and fact-check surprising claims.",
                        "Technology changes fast - news from a few months ago may already be outdated.",
                    ],
                },
            },
            {
                id: "tech-3",
                title: "How to Stay Safe Online - National Cyber Security Centre",
                url: "https://www.ncsc.gov.uk/cyberaware",
                snippet:
                    "Essential tips from the UK's National Cyber Security Centre on how to protect yourself online, including passwords, scams, and software updates.",
                aiContent: {
                    heading: "How to Stay Safe Online",
                    summary:
                        "The internet is amazing, but there are risks. Here is how to keep yourself safe online.",
                    steps: [
                        "Use strong, unique passwords for every account. A good password has 12+ characters.",
                        "Turn on two-factor authentication (2FA) - this adds an extra security step when you log in.",
                        "Keep your phone and computer software up to date. Updates fix security problems.",
                        "Do not click on links in emails or texts unless you are sure they are real.",
                        "If something looks too good to be true (like winning a prize), it is probably a scam.",
                        "Use a password manager app to help you remember all your different passwords.",
                    ],
                    importantNotes: [
                        "Never share your passwords with anyone, even people you trust.",
                        "If you think you have been scammed, contact your bank immediately.",
                        "Report scams to Action Fraud: actionfraud.police.uk or call 0300 123 2040.",
                    ],
                },
            },
            {
                id: "tech-4",
                title: "AI Tools You Can Use Today - Free and Beginner-Friendly",
                url: "https://www.techradar.com/best/ai-tools",
                snippet:
                    "Explore the best free AI tools available right now, including ChatGPT, Google Gemini, Microsoft Copilot, and more. No coding required.",
                aiContent: {
                    heading: "Free AI Tools You Can Try Right Now",
                    summary:
                        "There are many AI tools you can use for free. You do not need to know how to code. Here are some of the best ones.",
                    steps: [
                        "ChatGPT (chat.openai.com) - talk to an AI that can answer questions, write text, and help you learn.",
                        "Google Gemini (gemini.google.com) - Google's AI that can search the web and create images.",
                        "Microsoft Copilot (copilot.microsoft.com) - a free AI assistant built into Microsoft products.",
                        "Canva AI (canva.com) - helps you design images, presentations, and social media posts.",
                        "Grammarly (grammarly.com) - an AI that checks your writing for spelling and grammar mistakes.",
                        "Most of these tools have a free version. You can pay for extra features if you want.",
                    ],
                    importantNotes: [
                        "Do not share personal or sensitive information with AI chatbots.",
                        "AI tools can make mistakes - always check their answers.",
                        "Some AI tools store your conversations - check their privacy policy.",
                    ],
                },
            },
        ],
    },
};

/**
 * findResultsForQuery - Keyword-matching function
 *
 * WHY: For a realistic prototype, we match the user's query against
 * keywords in each result set. This gives the demo a natural feel -
 * different queries return different results. If no keyword matches,
 * we return null so the UI can show a helpful fallback message.
 *
 * @param {string} query - the user's search query
 * @returns {{ label: string, results: Array } | null}
 */
export function findResultsForQuery(query) {
    const normalised = query.toLowerCase().trim();

    if (!normalised) return null;

    // Score each result set by how many keywords match the query
    let bestMatch = null;
    let bestScore = 0;

    for (const [, set] of Object.entries(resultSets)) {
        let score = 0;
        for (const keyword of set.keywords) {
            if (normalised.includes(keyword)) {
                // Longer keyword matches are more specific → higher score
                score += keyword.length;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = set;
        }
    }

    return bestMatch;
}

/**
 * Suggested demo queries that users can click to see results.
 * Exported so the results page and no-results state can show these.
 */
export const suggestedQueries = [
    "University of Greenwich",
    "Formula One",
    "Doctor",
    "AI and tech news",
];

export default resultSets;
