import { Question, TenseTag } from '../types';

export const TENSE_NOTES: Record<TenseTag, string> = {
  present_continuous: "Present Continuous describes actions happening right now at the moment of speaking or temporary ongoing situations.",
  past_continuous: "Past Continuous describes an action that was in progress at a specific past moment or duration.",
  future_continuous: "Future Continuous describes an action that will be in progress at a specific time in the future.",
  present_perfect: "Present Perfect connects past actions to the present, emphasizing results, experiences, or recent completion.",
  past_perfect: "Past Perfect describes an action completed before another past event or specific time in the past.",
  future_perfect: "Future Perfect describes an action that will be completed prior to a designated deadline in the future.",
  present_perfect_continuous: "Present Perfect Continuous describes an ongoing action that began in the past and continues up to the present.",
  past_perfect_continuous: "Past Perfect Continuous describes an ongoing action that continued up until another event in the past.",
  future_perfect_continuous: "Future Perfect Continuous describes an ongoing action that will continue up until a specific milestone in the future.",
  phrasal_verbs: "Phrasal Verbs combine verbs with particles (prepositions/adverbs) to create unique meanings. They can be separable or inseparable, transitive or intransitive.",
  prepositions: "In English, specific verbs, adjectives, and nouns require exact prepositions (e.g. 'absorbed in', 'accused of', 'depend on', 'married to', 'prefer to').",
  confused_words: "English has many easily confused pairs of words (e.g. 'borrow' vs 'lend', 'steal' vs 'rob', 'make' vs 'do', 'lie' vs 'lay', 'say' vs 'tell').",
  common_errors: "Common English mistakes often involve uncountable nouns (advice, information, furniture), unnecessary prepositions/words, or incorrect word forms.",
  pv_particles: "Particles in phrasal verbs give core directional or abstract meanings (e.g. 'up' = completion/increase, 'out' = leaving/disappearing, 'off' = departure/stopping, 'down' = decreasing/recording).",
  pv_life_work: "Phrasal verbs express essential everyday concepts across career, finance, time, emotions, socialising, travel, and communication.",
  pv_in_use_foundations: "English Phrasal Verbs in Use: Master phrasal verb basics, grammar patterns, concrete/abstract meanings, particle positions, phrasal nouns/adjectives, metaphor/register, and key verbs (come, get, go, look, make, put, take, up, out, off).",
  conditionals_wishes: "Conditionals express hypotheses, results, and unreal past/present situations. Wish clauses expressing desire, regret ('I wish', 'If only') use past tenses.",
  passive_voice: "Passive voice emphasizes the action or object rather than the agent. Causatives ('have/get something done') show actions performed by someone else on one's behalf.",
  idioms_collocations: "English idioms and collocations are natural word combinations and figurative expressions used by native speakers.",
  advanced_grammar: "Advanced grammar includes negative inversion ('Hardly had I...'), cleft sentences ('It was John who...'), and formal subjunctive constructions.",
  business_academic: "Business & Academic English focuses on professional register, precise linking phrases, formal discourse markers, and concise vocabulary.",
  reported_speech: "Reported speech converts direct statements into indirect discourse using tense backshifting, reporting verbs (admit, claim, insist), and indirect word order.",
  relative_clauses: "Relative clauses give essential or extra information using relative pronouns (who, which, that, whose, whom). Reduced clauses use active/passive participle phrases.",
  modal_verbs: "Modal verbs express certainty, permission, ability, obligation, and deduction. Past modals (must have, should have, could have) express past deductions or regrets.",
  articles_determiners: "English articles (a/an, the, zero article) and quantifiers (much/many, few/a few, little/a little, each/every) control noun definiteness and quantity.",
  gerunds_infinitives: "Verb patterns dictate whether a verb takes a gerund (-ing) or to-infinitive. Certain verbs change meaning depending on the form chosen (stop, remember, regret)."
};

export const RAW_QUESTIONS: Question[] = [
  // --- 1. Present Continuous (10 items) ---
  {
    id: "pc-1",
    tag: "present_continuous",
    text: "Look at the sky! It ____ right now, so take an umbrella.",
    opts: ["is raining", "was raining", "has been raining", "rains"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-2",
    tag: "present_continuous",
    text: "Listen! Sarah ____ the violin in her bedroom.",
    opts: ["is playing", "plays", "was playing", "has been playing"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-3",
    tag: "present_continuous",
    text: "The engineers ____ on the new bridge design this week.",
    opts: ["are working", "were working", "have worked", "worked"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-4",
    tag: "present_continuous",
    text: "Quiet, please! The baby ____ upstairs.",
    opts: ["is sleeping", "was sleeping", "has slept", "sleeps"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-5",
    tag: "present_continuous",
    text: "Why ____ you ____ your thick winter coat inside?",
    opts: ["are ... wearing", "were ... wearing", "have ... worn", "do ... wear"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-6",
    tag: "present_continuous",
    text: "David ____ a fascinating novel about space exploration these days.",
    opts: ["is reading", "was reading", "has been reading", "reads"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-7",
    tag: "present_continuous",
    text: "Right now, the chef ____ a special dinner for tonight's guests.",
    opts: ["is preparing", "was preparing", "has prepared", "prepares"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-8",
    tag: "present_continuous",
    text: "The children ____ in the backyard at this very moment.",
    opts: ["are playing", "were playing", "have played", "played"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-9",
    tag: "present_continuous",
    text: "We ____ a team workshop today to discuss our quarterly goals.",
    opts: ["are attending", "were attending", "have attended", "attended"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },
  {
    id: "pc-10",
    tag: "present_continuous",
    text: "Look, the express train ____ into the platform right now!",
    opts: ["is pulling", "was pulling", "has pulled", "pulls"],
    correct: 0,
    note: TENSE_NOTES.present_continuous
  },

  // --- 2. Past Continuous (10 items) ---
  {
    id: "pasc-1",
    tag: "past_continuous",
    text: "At 8 PM yesterday, I ____ dinner with my family.",
    opts: ["was having", "is having", "had been having", "had"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-2",
    tag: "past_continuous",
    text: "While Maria was studying, her brother ____ loud music upstairs.",
    opts: ["was playing", "is playing", "had played", "played"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-3",
    tag: "past_continuous",
    text: "They ____ across the park when it suddenly started to snow.",
    opts: ["were walking", "are walking", "had been walking", "walked"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-4",
    tag: "past_continuous",
    text: "What ____ you ____ when the fire alarm rang yesterday?",
    opts: ["were ... doing", "are ... doing", "had ... done", "did ... do"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-5",
    tag: "past_continuous",
    text: "The mechanic ____ the car engine all morning yesterday.",
    opts: ["was repairing", "is repairing", "has been repairing", "repaired"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-6",
    tag: "past_continuous",
    text: "At midnight last night, it ____ heavily outside.",
    opts: ["was raining", "is raining", "had rained", "rained"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-7",
    tag: "past_continuous",
    text: "We ____ the championship game on TV when the power cut off.",
    opts: ["were watching", "are watching", "had watched", "watched"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-8",
    tag: "past_continuous",
    text: "She ____ her bicycle down the path when she tripped over a tree root.",
    opts: ["was riding", "is riding", "had been riding", "rode"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-9",
    tag: "past_continuous",
    text: "The students ____ close attention when the teacher wrote the problem.",
    opts: ["were paying", "are paying", "have been paying", "paid"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },
  {
    id: "pasc-10",
    tag: "past_continuous",
    text: "Mark ____ his presentation slides all evening prior to the meeting.",
    opts: ["was drafting", "is drafting", "has drafted", "drafted"],
    correct: 0,
    note: TENSE_NOTES.past_continuous
  },

  // --- 3. Future Continuous (10 items) ---
  {
    id: "fc-1",
    tag: "future_continuous",
    text: "At 10 AM tomorrow, our team ____ a video conference with regional directors.",
    opts: ["will be holding", "is holding", "will have held", "will hold"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-2",
    tag: "future_continuous",
    text: "Don't call me at 7 PM because I ____ dinner then.",
    opts: ["will be cooking", "will cook", "will have cooked", "am cooking"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-3",
    tag: "future_continuous",
    text: "This time next week, we ____ on a sunny beach in Hawaii!",
    opts: ["will be relaxing", "will relax", "will have relaxed", "are relaxing"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-4",
    tag: "future_continuous",
    text: "Professor Vance ____ a keynote lecture on genetics at 2 PM on Friday.",
    opts: ["will be delivering", "will deliver", "will have delivered", "delivers"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-5",
    tag: "future_continuous",
    text: "What ____ you ____ at noon tomorrow when the VIP shuttle arrives?",
    opts: ["will ... be doing", "will ... do", "will ... have done", "are ... doing"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-6",
    tag: "future_continuous",
    text: "They ____ their new product line at the tech expo all afternoon tomorrow.",
    opts: ["will be showcasing", "will showcase", "will have showcased", "are showcasing"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-7",
    tag: "future_continuous",
    text: "At midnight, the IT crew ____ the main database servers.",
    opts: ["will be updating", "will update", "will have updated", "are updating"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-8",
    tag: "future_continuous",
    text: "She ____ for her final exam during the entire flight tomorrow.",
    opts: ["will be studying", "will study", "will have studied", "is studying"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-9",
    tag: "future_continuous",
    text: "The astronomers ____ solar flare activity throughout the evening.",
    opts: ["will be monitoring", "will monitor", "will have monitored", "monitor"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },
  {
    id: "fc-10",
    tag: "future_continuous",
    text: "By this time tomorrow, the tour bus ____ through the mountain pass.",
    opts: ["will be driving", "will drive", "will have driven", "drives"],
    correct: 0,
    note: TENSE_NOTES.future_continuous
  },

  // --- 4. Present Perfect (10 items) ---
  {
    id: "pp-1",
    tag: "present_perfect",
    text: "She ____ her passport, so she cannot board the airplane right now.",
    opts: ["has lost", "lost", "had lost", "has been losing"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-2",
    tag: "present_perfect",
    text: "We ____ this documentary three times already, but we still enjoy it.",
    opts: ["have seen", "saw", "had seen", "have been seeing"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-3",
    tag: "present_perfect",
    text: "The author ____ five best-selling novels so far in her career.",
    opts: ["has written", "wrote", "had written", "has been writing"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-4",
    tag: "present_perfect",
    text: "Have you heard the news? Alex ____ the national marathon!",
    opts: ["has won", "won", "had won", "has been winning"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-5",
    tag: "present_perfect",
    text: "The technicians ____ fixing the server error, so the website is back online.",
    opts: ["have finished", "finished", "had finished", "have been finishing"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-6",
    tag: "present_perfect",
    text: "I ____ to Tokyo before, so I know a few great local spots.",
    opts: ["have traveled", "traveled", "had traveled", "have been traveling"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-7",
    tag: "present_perfect",
    text: "The scientists ____ a promising new compound in their recent trials.",
    opts: ["have discovered", "discovered", "had discovered", "have been discovering"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-8",
    tag: "present_perfect",
    text: "My grandparents ____ in this coastal town for over thirty years.",
    opts: ["have lived", "lived", "had lived", "are living"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-9",
    tag: "present_perfect",
    text: "The company ____ its brand emblem three times since its inception.",
    opts: ["has changed", "changed", "had changed", "is changing"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },
  {
    id: "pp-10",
    tag: "present_perfect",
    text: "I ____ already ____ my homework, so I can go outside to play.",
    opts: ["have ... completed", "had ... completed", "was ... completing", "did ... complete"],
    correct: 0,
    note: TENSE_NOTES.present_perfect
  },

  // --- 5. Past Perfect (10 items) ---
  {
    id: "pasp-1",
    tag: "past_perfect",
    text: "When the police arrived, the burglar ____ already ____ through the window.",
    opts: ["had ... escaped", "has ... escaped", "was ... escaping", "escaped"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-2",
    tag: "past_perfect",
    text: "She realized she ____ her purse at home when she reached the store register.",
    opts: ["had left", "has left", "was leaving", "left"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-3",
    tag: "past_perfect",
    text: "By the time the express train pulled in, we ____ on the cold platform for forty minutes.",
    opts: ["had waited", "have waited", "were waiting", "waited"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-4",
    tag: "past_perfect",
    text: "The film ____ by the time we found our assigned seats in the cinema.",
    opts: ["had started", "has started", "was starting", "started"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-5",
    tag: "past_perfect",
    text: "He ____ never ____ authentic sushi prior to his trip to Japan last summer.",
    opts: ["had ... eaten", "has ... eaten", "was ... eating", "ate"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-6",
    tag: "past_perfect",
    text: "Before she published her article, the research team ____ the findings thoroughly.",
    opts: ["had verified", "has verified", "was verifying", "verified"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-7",
    tag: "past_perfect",
    text: "They could not enter the cottage because they ____ the master key inside.",
    opts: ["had forgotten", "have forgotten", "were forgetting", "forgot"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-8",
    tag: "past_perfect",
    text: "The lawn was completely dry because it ____ for two straight months.",
    opts: ["had not rained", "has not rained", "was not raining", "did not rain"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-9",
    tag: "past_perfect",
    text: "Clara ____ French for four years before she moved to Paris.",
    opts: ["had studied", "has studied", "was studying", "studied"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },
  {
    id: "pasp-10",
    tag: "past_perfect",
    text: "The concert organizers ____ all tickets before venue doors even opened.",
    opts: ["had sold", "have sold", "were selling", "sold"],
    correct: 0,
    note: TENSE_NOTES.past_perfect
  },

  // --- 6. Future Perfect (10 items) ---
  {
    id: "fp-1",
    tag: "future_perfect",
    text: "By next June, Dr. Miller ____ the clinical research project.",
    opts: ["will have completed", "will complete", "will be completing", "completes"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-2",
    tag: "future_perfect",
    text: "They ____ construction of the new tower before the end of this year.",
    opts: ["will have built", "will build", "will be building", "are building"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-3",
    tag: "future_perfect",
    text: "By 9 PM tonight, I ____ all thirty math problem sets.",
    opts: ["will have solved", "will solve", "will be solving", "have solved"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-4",
    tag: "future_perfect",
    text: "When you return from vacation, we ____ all apartment renovations.",
    opts: ["will have finished", "will finish", "will be finishing", "finished"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-5",
    tag: "future_perfect",
    text: "She ____ her bachelor's degree by the time she turns twenty-two.",
    opts: ["will have earned", "will earn", "will be earning", "earns"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-6",
    tag: "future_perfect",
    text: "By sunrise tomorrow morning, the thunderstorm ____ away completely.",
    opts: ["will have passed", "will pass", "will be passing", "passes"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-7",
    tag: "future_perfect",
    text: "The committee ____ on a final budget by next Friday afternoon.",
    opts: ["will have decided", "will decide", "will be deciding", "decides"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-8",
    tag: "future_perfect",
    text: "In two years' time, our company ____ its international branch network.",
    opts: ["will have expanded", "will expand", "will be expanding", "expands"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-9",
    tag: "future_perfect",
    text: "By the time the head chef arrives, his assistants ____ all fresh ingredients.",
    opts: ["will have prepped", "will prep", "will be prepping", "prep"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },
  {
    id: "fp-10",
    tag: "future_perfect",
    text: "You ____ all required credit hours before commencement day.",
    opts: ["will have accumulated", "will accumulate", "will be accumulating", "accumulate"],
    correct: 0,
    note: TENSE_NOTES.future_perfect
  },

  // --- 7. Present Perfect Continuous (10 items) ---
  {
    id: "ppc-1",
    tag: "present_perfect_continuous",
    text: "She is exhausted because she ____ all morning without a rest.",
    opts: ["has been running", "is running", "has run", "ran"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-2",
    tag: "present_perfect_continuous",
    text: "The mechanics ____ on my car engine for three hours now.",
    opts: ["have been working", "are working", "have worked", "worked"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-3",
    tag: "present_perfect_continuous",
    text: "How long ____ you ____ English at this language academy?",
    opts: ["have ... been learning", "are ... learning", "have ... learned", "did ... learn"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-4",
    tag: "present_perfect_continuous",
    text: "It ____ continuously since early this morning.",
    opts: ["has been raining", "is raining", "has rained", "rained"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-5",
    tag: "present_perfect_continuous",
    text: "We ____ for the shuttle bus since 2 PM; where could it be?",
    opts: ["have been waiting", "are waiting", "have waited", "waited"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-6",
    tag: "present_perfect_continuous",
    text: "The botanist ____ rare orchids in the rainforest for six months.",
    opts: ["has been researching", "is researching", "has researched", "researched"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-7",
    tag: "present_perfect_continuous",
    text: "They ____ their house all day and their clothes are covered in paint.",
    opts: ["have been painting", "are painting", "have painted", "painted"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-8",
    tag: "present_perfect_continuous",
    text: "My eyes hurt because I ____ at this monitor screen since breakfast.",
    opts: ["have been staring", "am staring", "have stared", "stared"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-9",
    tag: "present_perfect_continuous",
    text: "The symphony orchestra ____ the new movement for three straight hours.",
    opts: ["has been practicing", "is practicing", "has practiced", "practiced"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },
  {
    id: "ppc-10",
    tag: "present_perfect_continuous",
    text: "Why are your hands dirty? ____ you ____ in the soil garden?",
    opts: ["Have ... been working", "Are ... working", "Have ... worked", "Did ... work"],
    correct: 0,
    note: TENSE_NOTES.present_perfect_continuous
  },

  // --- 8. Past Perfect Continuous (10 items) ---
  {
    id: "pasp c-1",
    tag: "past_perfect_continuous",
    text: "When the power went out, I ____ on my computer for four hours.",
    opts: ["had been working", "was working", "have been working", "worked"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-2",
    tag: "past_perfect_continuous",
    text: "The football field was muddy because it ____ heavily for two days prior.",
    opts: ["had been pouring", "was pouring", "has been pouring", "poured"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-3",
    tag: "past_perfect_continuous",
    text: "She was breathless when she arrived because she ____ up the steep hill.",
    opts: ["had been sprinting", "was sprinting", "has been sprinting", "sprinted"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-4",
    tag: "past_perfect_continuous",
    text: "They ____ for over an hour before the taxi finally pulled up.",
    opts: ["had been waiting", "were waiting", "have been waiting", "waited"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-5",
    tag: "past_perfect_continuous",
    text: "How long ____ you ____ the firm before you decided to resign?",
    opts: ["had ... been managing", "were ... managing", "have ... been managing", "did ... manage"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-6",
    tag: "past_perfect_continuous",
    text: "The musician ____ for ten years before he secured a major recording deal.",
    opts: ["had been performing", "was performing", "has been performing", "performed"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-7",
    tag: "past_perfect_continuous",
    text: "The furnace ____ strange rattling noises for days before it broke.",
    opts: ["had been making", "was making", "has been making", "made"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-8",
    tag: "past_perfect_continuous",
    text: "Her throat was sore because she ____ at the rally all afternoon.",
    opts: ["had been shouting", "was shouting", "has been shouting", "shouted"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-9",
    tag: "past_perfect_continuous",
    text: "The detectives ____ the suspect for weeks before making the arrest.",
    opts: ["had been tracking", "were tracking", "have been tracking", "tracked"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },
  {
    id: "pasp c-10",
    tag: "past_perfect_continuous",
    text: "We ____ for a new apartment for months before discovering this studio.",
    opts: ["had been searching", "were searching", "have been searching", "searched"],
    correct: 0,
    note: TENSE_NOTES.past_perfect_continuous
  },

  // --- 9. Future Perfect Continuous (10 items) ---
  {
    id: "fpc-1",
    tag: "future_perfect_continuous",
    text: "By next December, Professor Smith ____ at this university for thirty years.",
    opts: ["will have been teaching", "will be teaching", "will have taught", "is teaching"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-2",
    tag: "future_perfect_continuous",
    text: "When Sarah completes this flight, she ____ for over sixteen hours straight.",
    opts: ["will have been flying", "will be flying", "will have flown", "flies"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-3",
    tag: "future_perfect_continuous",
    text: "By 5 PM today, the marathon runners ____ for five consecutive hours.",
    opts: ["will have been running", "will be running", "will have run", "are running"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-4",
    tag: "future_perfect_continuous",
    text: "In two months, they ____ on this software codebase for a full year.",
    opts: ["will have been coding", "will be coding", "will have coded", "code"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-5",
    tag: "future_perfect_continuous",
    text: "By midnight, we ____ the eclipse through the telescope for six hours.",
    opts: ["will have been observing", "will be observing", "will have observed", "observe"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-6",
    tag: "future_perfect_continuous",
    text: "She ____ violin for a decade when she performs at Carnegie Hall next month.",
    opts: ["will have been playing", "will be playing", "will have played", "plays"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-7",
    tag: "future_perfect_continuous",
    text: "By the time the bus arrives, we ____ at this remote stop for two hours.",
    opts: ["will have been standing", "will be standing", "will have stood", "stand"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-8",
    tag: "future_perfect_continuous",
    text: "Next spring, my parents ____ in that heritage home for forty years.",
    opts: ["will have been living", "will be living", "will have lived", "live"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-9",
    tag: "future_perfect_continuous",
    text: "By the time the shift finishes, the nurse ____ patients for twelve hours.",
    opts: ["will have been treating", "will be treating", "will have treated", "treats"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },
  {
    id: "fpc-10",
    tag: "future_perfect_continuous",
    text: "How long ____ you ____ at the firm when your promotion takes effect?",
    opts: ["will ... have been working", "will ... be working", "will ... have worked", "are ... working"],
    correct: 0,
    note: TENSE_NOTES.future_perfect_continuous
  },

  // --- 10. Phrasal Verbs (60 items) ---
  {
    id: "pv-1",
    tag: "phrasal_verbs",
    text: "The client rejected our first proposal, so we need to ____ a completely different strategy before Friday.",
    opts: ["come across", "come up with", "call on", "get by"],
    correct: 1,
    note: "Phrasal Verb (Business): \"Come up with\" means to produce or think of an idea, plan, or solution."
  },
  {
    id: "pv-2",
    tag: "phrasal_verbs",
    text: "Despite earning very little, he manages to ____ each month.",
    opts: ["get over", "get along", "get by", "get through"],
    correct: 2,
    note: "Phrasal Verb (Finance): \"Get by\" means to manage or survive with the minimum resources needed."
  },
  {
    id: "pv-3",
    tag: "phrasal_verbs",
    text: "I called her yesterday, but she still hasn't ____ to me.",
    opts: ["got back", "got by", "got along", "got over"],
    correct: 0,
    note: "Phrasal Verb (Workplace): \"Get back (to someone)\" means to respond or return contact."
  },
  {
    id: "pv-4",
    tag: "phrasal_verbs",
    text: "We have received approval from the client, so we can ____ with the project.",
    opts: ["go over", "go against", "go ahead", "go for"],
    correct: 2,
    note: "Phrasal Verb (Business): \"Go ahead (with)\" means to proceed with a plan or project."
  },
  {
    id: "pv-5",
    tag: "phrasal_verbs",
    text: "I should ____ my notes before the exam.",
    opts: ["go on", "go over", "go for", "go ahead"],
    correct: 1,
    note: "Phrasal Verb (Education): \"Go over\" means to review carefully."
  },
  {
    id: "pv-6",
    tag: "phrasal_verbs",
    text: "While cleaning the attic, I ____ several old photographs I'd forgotten about.",
    opts: ["came up with", "came across", "came down with", "came between"],
    correct: 1,
    note: "Phrasal Verb (Events): \"Come across\" means to find or encounter something by chance."
  },
  {
    id: "pv-7",
    tag: "phrasal_verbs",
    text: "The coaches ____ the game because of the rain.",
    opts: ["called back", "called for", "called off", "called on"],
    correct: 2,
    note: "Phrasal Verb (Events): \"Call off\" means to cancel an event."
  },
  {
    id: "pv-8",
    tag: "phrasal_verbs",
    text: "After weeks of delays, the team finally ____ the most difficult phase of the project.",
    opts: ["got through", "got back", "got along", "got by"],
    correct: 0,
    note: "Phrasal Verb (Solutions): \"Get through\" means to complete or survive something difficult."
  },
  {
    id: "pv-9",
    tag: "phrasal_verbs",
    text: "After comparing both suppliers, the committee decided to ____ the one with faster delivery times.",
    opts: ["go on", "go over", "go for", "go against"],
    correct: 2,
    note: "Phrasal Verb (Decision-making): \"Go for\" means to choose or select."
  },
  {
    id: "pv-10",
    tag: "phrasal_verbs",
    text: "After reviewing the revised safety procedures, the supervisor decided to ____ several recommendations that were no longer relevant.",
    opts: ["call for", "rule out", "go over", "get through"],
    correct: 1,
    note: "Phrasal Verb (Presentations): \"Rule out\" means to eliminate as a possibility."
  },
  {
    id: "pv-11",
    tag: "phrasal_verbs",
    text: "She cancelled her flight after she ____ a nasty stomach bug the night before.",
    opts: ["came down with", "came across", "came up with", "came between"],
    correct: 0,
    note: "Phrasal Verb (Social): \"Come down with\" means to become ill with a disease or illness."
  },
  {
    id: "pv-12",
    tag: "phrasal_verbs",
    text: "The developers ____ a compatibility issue while testing the new update.",
    opts: ["ran into", "ran along", "ran through", "ran up"],
    correct: 0,
    note: "Phrasal Verb (Technology): \"Run into\" means to encounter a problem or unexpected issue."
  },
  {
    id: "pv-13",
    tag: "phrasal_verbs",
    text: "\"The manager called off the meeting.\" Is call off separable or inseparable?",
    opts: ["Separable — the object can go between call and off", "Inseparable — the object must follow off", "It has no object", "It cannot be used with a noun object"],
    correct: 0,
    note: "Phrasal Verb Grammar: \"Call off\" is separable: both \"called off the meeting\" and \"called the meeting off\" are correct."
  },
  {
    id: "pv-14",
    tag: "phrasal_verbs",
    text: "Which of these is a correct sentence with call up?",
    opts: ["He called up his old friend.", "He called his old friend up.", "Both of the above are correct.", "Neither is correct; call up cannot take a noun object."],
    correct: 2,
    note: "Phrasal Verb Grammar: \"Call up\" is separable, so the noun object can appear after the particle or between verb and particle."
  },
  {
    id: "pv-15",
    tag: "phrasal_verbs",
    text: "Which sentence is INCORRECT?",
    opts: ["Pick up the children.", "Pick the children up.", "Pick up them.", "Pick them up."],
    correct: 2,
    note: "Phrasal Verb Grammar: With separable phrasal verbs, a pronoun object MUST go between the verb and particle (\"pick them up\")."
  },
  {
    id: "pv-16",
    tag: "phrasal_verbs",
    text: "\"Put down\" (meaning to set something down) is:",
    opts: ["Inseparable only", "Separable", "Intransitive only", "A literal verb + preposition, never phrasal"],
    correct: 1,
    note: "Phrasal Verb Grammar: \"Put down\" is a separable transitive phrasal verb."
  },
  {
    id: "pv-17",
    tag: "phrasal_verbs",
    text: "Which pair is both grammatically correct?",
    opts: ["put on her jacket / put her jacket on", "put on her jacket / put jacket her on", "put her on jacket / put on her jacket", "put jacket on her / put on her jacket"],
    correct: 0,
    note: "Phrasal Verb Grammar: \"Put on\" is separable: the noun object can follow the particle or sit between verb and particle."
  },
  {
    id: "pv-18",
    tag: "phrasal_verbs",
    text: "\"She took off her shoes.\" Which alternative word order is also correct?",
    opts: ["She took her shoes off.", "She took off them.", "She off took her shoes.", "She took shoes her off."],
    correct: 0,
    note: "Phrasal Verb Grammar: \"Take off\" is separable, so \"took her shoes off\" is correct."
  },
  {
    id: "pv-19",
    tag: "phrasal_verbs",
    text: "Could you turn on the projector? Which rewrite keeps the same grammar pattern?",
    opts: ["Could you turn the projector on?", "Could you turn on it?", "Could you on turn the projector?", "Could you turn projector on the?"],
    correct: 0,
    note: "Phrasal Verb Grammar: \"Turn on\" is separable, so the noun object may move between verb and particle."
  },
  {
    id: "pv-20",
    tag: "phrasal_verbs",
    text: "Which sentence correctly uses a pronoun with turn off?",
    opts: ["She turned off it.", "She turned it off.", "She turned off the it.", "She off turned it."],
    correct: 1,
    note: "Phrasal Verb Grammar: With separable phrasal verbs, a pronoun object MUST split the verb and particle (\"turned it off\")."
  },
  {
    id: "pv-21",
    tag: "phrasal_verbs",
    text: "\"Turn up\" (meaning to increase volume) is separable. Which sentence breaks the rule?",
    opts: ["Turn up the volume.", "Turn the volume up.", "Turn up it.", "Turn it up."],
    correct: 2,
    note: "Phrasal Verb Grammar: A pronoun object cannot follow the particle in a separable phrasal verb (\"turn up it\" is ungrammatical)."
  },
  {
    id: "pv-22",
    tag: "phrasal_verbs",
    text: "\"She turned down the job offer.\" Which is also correct?",
    opts: ["She turned the job offer down.", "She turned down it.", "She down turned the offer.", "She turned offer the down."],
    correct: 0,
    note: "Phrasal Verb Grammar: \"Turn down\" is separable, so the noun object can be placed after the particle or between verb and particle."
  },
  {
    id: "pv-23",
    tag: "phrasal_verbs",
    text: "\"The manager ruled out the proposal.\" Is rule out separable or inseparable?",
    opts: ["Separable", "Inseparable", "Intransitive", "It has two different particles"],
    correct: 0,
    note: "Phrasal Verb Grammar: \"Rule out\" is separable and transitive."
  },
  {
    id: "pv-24",
    tag: "phrasal_verbs",
    text: "\"We need to look into the complaint.\" Is look into separable or inseparable?",
    opts: ["Separable — the object may go before into", "Inseparable — the object must always follow into", "Neither; look into has no object", "It depends on formality"],
    correct: 1,
    note: "Phrasal Verb Grammar: \"Look into\" is inseparable. The object must always follow the full phrasal verb."
  },
  {
    id: "pv-25",
    tag: "phrasal_verbs",
    text: "She turned off the computer. Rewrite with a pronoun: She turned ____.",
    opts: ["it off", "off it", "it out", "off them"],
    correct: 0,
    note: "Pronoun Placement: Separable phrasal verbs require a pronoun object to split the verb and particle (\"turned it off\")."
  },
  {
    id: "pv-26",
    tag: "phrasal_verbs",
    text: "Pick up the children. Rewrite with a pronoun: Pick ____.",
    opts: ["them up", "up them", "up they", "they up"],
    correct: 0,
    note: "Pronoun Placement: \"Pick up\" is separable, and with a pronoun object the split order is mandatory (\"pick them up\")."
  },
  {
    id: "pv-27",
    tag: "phrasal_verbs",
    text: "He put on his coat. Rewrite with a pronoun: He put ____.",
    opts: ["it on", "on it", "it in", "on him"],
    correct: 0,
    note: "Pronoun Placement: \"Put on\" is separable; a pronoun object must sit between the verb and particle (\"put it on\")."
  },
  {
    id: "pv-28",
    tag: "phrasal_verbs",
    text: "She took off her jacket. Rewrite with a pronoun: She took ____.",
    opts: ["it off", "off it", "it out", "off her"],
    correct: 0,
    note: "Pronoun Placement: With separable verbs and a pronoun object, the split form is required (\"took it off\")."
  },
  {
    id: "pv-29",
    tag: "phrasal_verbs",
    text: "She looked into the problem. Rewrite with a pronoun: She looked into ____.",
    opts: ["it", "it into", "into it", "them"],
    correct: 0,
    note: "Pronoun Placement: \"Look into\" is inseparable, so the pronoun simply follows the whole phrasal verb (\"looked into it\")."
  },
  {
    id: "pv-30",
    tag: "phrasal_verbs",
    text: "They called off the wedding. Rewrite with a pronoun: They called ____.",
    opts: ["it off", "off it", "it out", "off them"],
    correct: 0,
    note: "Pronoun Placement: \"Call off\" is separable, so a pronoun object must split verb and particle (\"called it off\")."
  },
  {
    id: "pv-31",
    tag: "phrasal_verbs",
    text: "The manager ruled out the proposal. Rewrite with a pronoun: The manager ruled ____.",
    opts: ["it out", "out it", "it off", "out them"],
    correct: 0,
    note: "Pronoun Placement: \"Rule out\" is separable, so with a pronoun object it must be \"ruled it out\"."
  },
  {
    id: "pv-32",
    tag: "phrasal_verbs",
    text: "Could you turn on the projector? Rewrite with a pronoun: Could you turn ____?",
    opts: ["it on", "on it", "it up", "on them"],
    correct: 0,
    note: "Pronoun Placement: \"Turn on\" is separable; a pronoun object must go between verb and particle (\"turn it on\")."
  },
  {
    id: "pv-33",
    tag: "phrasal_verbs",
    text: "Which noun-object placements are BOTH correct for \"pick up\"?",
    opts: ["Pick up the toys. / Pick the toys up.", "Pick up the toys. / Pick up them.", "Pick the toys up. / Pick up them.", "Only one order is ever correct."],
    correct: 0,
    note: "Noun Placement: With a noun object, separable phrasal verbs allow either order: before or after the particle."
  },
  {
    id: "pv-34",
    tag: "phrasal_verbs",
    text: "Which sentence is INCORRECT?",
    opts: ["She put down her bag.", "She put her bag down.", "She put down it.", "Both A and B are correct."],
    correct: 2,
    note: "Noun Placement: \"She put down it\" is wrong because a pronoun object cannot follow the particle in a separable verb."
  },
  {
    id: "pv-35",
    tag: "phrasal_verbs",
    text: "Which noun placement is correct for \"turn up\" (increase volume)?",
    opts: ["Turn up the volume. / Turn the volume up.", "Turn up the volume only.", "Turn the volume up only.", "Neither order is correct."],
    correct: 0,
    note: "Noun Placement: \"Turn up\" is separable, so a noun object may appear in either position."
  },
  {
    id: "pv-36",
    tag: "phrasal_verbs",
    text: "Which is the odd one out?",
    opts: ["Turn down the offer.", "Turn the offer down.", "Turn down it.", "All three are grammatical."],
    correct: 2,
    note: "Noun Placement: \"Turn down it\" is ungrammatical — pronoun objects can never follow the particle of a separable phrasal verb."
  },
  {
    id: "pv-37",
    tag: "phrasal_verbs",
    text: "Which noun placement is correct for the inseparable verb \"look into\"?",
    opts: ["Look into the complaint.", "Look the complaint into.", "Both orders are correct.", "Neither order is correct."],
    correct: 0,
    note: "Noun Placement: Inseparable phrasal verbs never allow the object between the verb and particle."
  },
  {
    id: "pv-38",
    tag: "phrasal_verbs",
    text: "Which noun-object sentence is INCORRECT for \"call up\"?",
    opts: ["He called up his sister.", "He called his sister up.", "He called up them.", "All are correct."],
    correct: 2,
    note: "Noun Placement: \"Call up\" is separable and takes noun objects in either order, but a pronoun (\"them\") must split verb and particle."
  },
  {
    id: "pv-39",
    tag: "phrasal_verbs",
    text: "\"He dropped out of college.\" Is \"drop out\" transitive or intransitive?",
    opts: ["Transitive — it always needs a direct object", "Intransitive — it does not take a direct object", "Both, depending on formality", "It is only used with pronouns"],
    correct: 1,
    note: "Transitivity: \"Drop out\" is intransitive; it doesn't take a direct object."
  },
  {
    id: "pv-40",
    tag: "phrasal_verbs",
    text: "\"The siblings get along well.\" Is \"get along\" transitive or intransitive?",
    opts: ["Transitive", "Intransitive", "It requires two objects", "It is only used in questions"],
    correct: 1,
    note: "Transitivity: \"Get along\" describes a relationship or state and takes no direct object — it is intransitive."
  },
  {
    id: "pv-41",
    tag: "phrasal_verbs",
    text: "\"We can go ahead with the plan.\" Is \"go ahead\" transitive or intransitive?",
    opts: ["Transitive — \"the plan\" is its direct object", "Intransitive — \"with the plan\" is a prepositional phrase, not a direct object", "Both equally common", "Neither; it cannot be followed by anything"],
    correct: 1,
    note: "Transitivity: \"Go ahead\" is intransitive. \"With the plan\" is an optional prepositional phrase."
  },
  {
    id: "pv-42",
    tag: "phrasal_verbs",
    text: "\"We decided to stay in tonight.\" Is \"stay in\" transitive or intransitive?",
    opts: ["Transitive", "Intransitive", "Ditransitive", "Cannot be determined"],
    correct: 1,
    note: "Transitivity: \"Stay in\" takes no object — it simply describes remaining at home, so it is intransitive."
  },
  {
    id: "pv-43",
    tag: "phrasal_verbs",
    text: "\"They went out for dinner.\" Is \"go out\" transitive or intransitive?",
    opts: ["Transitive", "Intransitive", "It requires a pronoun object", "It is only used with people's names"],
    correct: 1,
    note: "Transitivity: \"Go out\" is intransitive; \"for dinner\" is a prepositional phrase explaining purpose."
  },
  {
    id: "pv-44",
    tag: "phrasal_verbs",
    text: "\"Something urgent came up.\" Is \"come up\" transitive or intransitive here?",
    opts: ["Transitive", "Intransitive", "Transitive only in questions", "Cannot be phrasal in this sentence"],
    correct: 1,
    note: "Transitivity: In this sense (\"to arise\"), \"come up\" takes no object and is intransitive."
  },
  {
    id: "pv-45",
    tag: "phrasal_verbs",
    text: "Which sentence contains \"look up\" used as a genuine PHRASAL verb (idiomatic meaning)?",
    opts: ["She looked up the word in the dictionary.", "She looked up at the ceiling.", "The children looked up at the airplane.", "He looked up toward the balcony."],
    correct: 0,
    note: "Literal vs Idiomatic: \"Looked up the word\" means searched for information — the idiomatic phrasal verb."
  },
  {
    id: "pv-46",
    tag: "phrasal_verbs",
    text: "Which sentence uses \"look into\" literally (not as a phrasal verb)?",
    opts: ["We need to look into the complaint.", "Investigators are looking into the fraud allegations.", "The children looked into the toy store window.", "Management agreed to look into the delays."],
    correct: 2,
    note: "Literal vs Idiomatic: \"Looked into the toy store window\" is literal — directed eyes through the window."
  },
  {
    id: "pv-47",
    tag: "phrasal_verbs",
    text: "Which sentence uses \"come up\" idiomatically rather than literally?",
    opts: ["He came up the stairs slowly.", "A problem came up during the meeting.", "She came up to the second floor.", "The dog came up the hill to greet us."],
    correct: 1,
    note: "Literal vs Idiomatic: \"A problem came up\" means \"arose unexpectedly\" — the idiomatic meaning."
  },
  {
    id: "pv-48",
    tag: "phrasal_verbs",
    text: "Which sentence uses \"get over\" literally?",
    opts: ["She got over the disappointment quickly.", "He needs to get over his fear of flying.", "The cat got over the fence in one leap.", "It took months to get over the loss."],
    correct: 2,
    note: "Literal vs Idiomatic: \"Got over the fence\" is literal physical movement over an obstacle."
  },
  {
    id: "pv-49",
    tag: "phrasal_verbs",
    text: "Which sentence uses \"take off\" idiomatically?",
    opts: ["She took off her shoes at the door.", "He took off his jacket in the heat.", "The plane took off an hour late.", "They took off their gloves before eating."],
    correct: 2,
    note: "Literal vs Idiomatic: \"The plane took off\" is the idiomatic intransitive meaning \"to leave the ground\"."
  },
  {
    id: "pv-50",
    tag: "phrasal_verbs",
    text: "\"My manager called off it.\" What is the correct version?",
    opts: ["My manager called it off.", "My manager called off the it.", "My manager off called it.", "My manager it called off."],
    correct: 0,
    note: "Error Correction: With a separable phrasal verb, a pronoun object must sit between the verb and particle (\"called it off\")."
  },
  {
    id: "pv-51",
    tag: "phrasal_verbs",
    text: "\"I looked the issue into.\" What is the correct version?",
    opts: ["I looked into the issue.", "I looked the issue in to.", "I looked into it the issue.", "I into looked the issue."],
    correct: 0,
    note: "Error Correction: \"Look into\" is inseparable — the object must always follow the complete phrasal verb."
  },
  {
    id: "pv-52",
    tag: "phrasal_verbs",
    text: "\"The manager ruled out it.\" What is the correct version?",
    opts: ["The manager ruled it out.", "The manager out ruled it.", "The manager ruled the it out.", "The manager it ruled out."],
    correct: 0,
    note: "Error Correction: \"Rule out\" is separable, and a pronoun object must go between verb and particle (\"ruled it out\")."
  },
  {
    id: "pv-53",
    tag: "phrasal_verbs",
    text: "\"She turned off it before leaving.\" What is the correct version?",
    opts: ["She turned it off before leaving.", "She off turned it before leaving.", "She turned it before off leaving.", "She turned off the it before leaving."],
    correct: 0,
    note: "Error Correction: A pronoun object with a separable phrasal verb must appear between verb and particle (\"turned it off\")."
  },
  {
    id: "pv-54",
    tag: "phrasal_verbs",
    text: "\"Please pick up them from school.\" What is the correct version?",
    opts: ["Please pick them up from school.", "Please pick up they from school.", "Please up pick them from school.", "Please pick up the them from school."],
    correct: 0,
    note: "Error Correction: \"Pick up\" is separable; the pronoun object \"them\" must be placed between \"pick\" and \"up\"."
  },
  {
    id: "pv-55",
    tag: "phrasal_verbs",
    text: "The coaches ____ the game because of the rain.",
    opts: ["called back the game", "called for the game", "called off the game", "called on the game"],
    correct: 2,
    note: "Verb Family: Only \"called off\" means cancelled."
  },
  {
    id: "pv-56",
    tag: "phrasal_verbs",
    text: "While cleaning the attic, I ____ several old photographs.",
    opts: ["came between", "came down with", "came across", "came up with"],
    correct: 2,
    note: "Verb Family: \"Came across\" means found by chance."
  },
  {
    id: "pv-57",
    tag: "phrasal_verbs",
    text: "We have received approval from the client, so we can ____ with the project.",
    opts: ["go against the project", "go for the project", "go ahead with the project", "go over the project"],
    correct: 2,
    note: "Verb Family: \"Go ahead with\" means to proceed."
  },
  {
    id: "pv-58",
    tag: "phrasal_verbs",
    text: "It was getting cold, so she ____ her jacket.",
    opts: ["took off", "put on", "turned on", "picked up"],
    correct: 1,
    note: "Opposite Pairs: \"Put on\" means placing clothing on the body."
  },
  {
    id: "pv-59",
    tag: "phrasal_verbs",
    text: "When she arrived home, she ____ her jacket.",
    opts: ["put on", "took off", "turned off", "put down"],
    correct: 1,
    note: "Opposite Pairs: \"Take off\" (remove clothing) is the opposite of \"put on\"."
  },
  {
    id: "pv-60",
    tag: "phrasal_verbs",
    text: "After a tiring week, they decided to ____ rather than go to the party.",
    opts: ["go out", "stay in", "turn up", "drop out"],
    correct: 1,
    note: "Opposite Pairs: \"Stay in\" (remain at home) is the direct opposite of \"go out\"."
  },

  // --- 11. Preposition Errors (Fitikides) ---
  {
    id: "prep-1",
    tag: "prepositions",
    text: "The scientist was completely absorbed ____ his research on renewable energy.",
    opts: ["in", "at", "with", "on"],
    correct: 0,
    note: "Don't say 'absorbed at'. Say 'absorbed in' (= very much interested in)."
  },
  {
    id: "prep-2",
    tag: "prepositions",
    text: "The security guard accused the man ____ stealing the bicycle.",
    opts: ["of", "for", "with", "about"],
    correct: 0,
    note: "Don't say 'accuse for'. Say 'accuse of' (e.g. accused him of stealing)."
  },
  {
    id: "prep-3",
    tag: "prepositions",
    text: "I am not accustomed ____ such humid summer weather.",
    opts: ["to", "with", "for", "in"],
    correct: 0,
    note: "Don't say 'accustomed with'. Say 'accustomed to' (e.g. accustomed to hot weather)."
  },
  {
    id: "prep-4",
    tag: "prepositions",
    text: "Laura is afraid ____ large barking dogs.",
    opts: ["of", "from", "with", "about"],
    correct: 0,
    note: "Don't say 'afraid from'. Say 'afraid of' (e.g. afraid of the dog)."
  },
  {
    id: "prep-5",
    tag: "prepositions",
    text: "The teacher was angry ____ the noisy student.",
    opts: ["with", "against", "at", "on"],
    correct: 0,
    note: "Don't say 'angry against'. Say 'angry with a person' (or 'angry at a thing')."
  },
  {
    id: "prep-6",
    tag: "prepositions",
    text: "The parents were very anxious ____ their child's health.",
    opts: ["about", "for", "of", "with"],
    correct: 0,
    note: "Don't say 'anxious for'. Say 'anxious about' when meaning troubled/worried."
  },
  {
    id: "prep-7",
    tag: "prepositions",
    text: "We arrived ____ the village late at night.",
    opts: ["at", "to", "on", "into"],
    correct: 0,
    note: "Use 'arrive at' for places/buildings/villages, and 'arrive in' for countries/large cities. Don't say 'arrive to'."
  },
  {
    id: "prep-8",
    tag: "prepositions",
    text: "He felt ashamed ____ his rude behaviour at the meeting.",
    opts: ["of", "from", "with", "for"],
    correct: 0,
    note: "Don't say 'ashamed from'. Say 'ashamed of' (e.g. ashamed of his conduct)."
  },
  {
    id: "prep-9",
    tag: "prepositions",
    text: "Do you believe ____ miracles and fate?",
    opts: ["in", "to", "at", "on"],
    correct: 0,
    note: "Don't say 'believe to'. Say 'believe in' (to have faith in)."
  },
  {
    id: "prep-10",
    tag: "prepositions",
    text: "James boasted ____ winning first place in the tournament.",
    opts: ["of", "for", "with", "from"],
    correct: 0,
    note: "Don't say 'boast for'. Say 'boast of' or 'boast about'."
  },
  {
    id: "prep-11",
    tag: "prepositions",
    text: "You should be more careful ____ your health and spending.",
    opts: ["of", "for", "from", "to"],
    correct: 0,
    note: "Don't say 'careful for'. Say 'careful of/with/about' (e.g. careful of your health)."
  },
  {
    id: "prep-12",
    tag: "prepositions",
    text: "Annette complained ____ the poor service at the restaurant.",
    opts: ["about", "for", "from", "with"],
    correct: 0,
    note: "Don't say 'complain for'. Say 'complain about' (or 'complain of' an illness)."
  },
  {
    id: "prep-13",
    tag: "prepositions",
    text: "Our school choir is composed ____ thirty talented singers.",
    opts: ["of", "from", "with", "by"],
    correct: 0,
    note: "Don't say 'composed from'. Say 'composed of' (e.g. composed of thirty students)."
  },
  {
    id: "prep-14",
    tag: "prepositions",
    text: "I congratulated her ____ passing her final driving exam.",
    opts: ["on", "for", "with", "about"],
    correct: 0,
    note: "Don't say 'congratulate for'. Say 'congratulate on' (e.g. congratulate you on your success)."
  },
  {
    id: "prep-15",
    tag: "prepositions",
    text: "A year consists ____ twelve calendar months.",
    opts: ["of", "from", "with", "in"],
    correct: 0,
    note: "Don't say 'consist from'. Say 'consist of' (e.g. consists of twelve months)."
  },
  {
    id: "prep-16",
    tag: "prepositions",
    text: "The mountain range was covered ____ deep white snow.",
    opts: ["with", "by", "from", "of"],
    correct: 0,
    note: "Don't say 'covered by'. Say 'covered with' or 'covered in'."
  },
  {
    id: "prep-17",
    tag: "prepositions",
    text: "The patient was cured ____ his skin disease after treatment.",
    opts: ["of", "from", "with", "against"],
    correct: 0,
    note: "Don't say 'cured from'. Say 'cured of' (e.g. cured of his illness)."
  },
  {
    id: "prep-18",
    tag: "prepositions",
    text: "Our picnic plans depend ____ the weather tomorrow morning.",
    opts: ["on", "from", "of", "with"],
    correct: 0,
    note: "Don't say 'depends from'. Say 'depends on' or 'depends upon'."
  },
  {
    id: "prep-19",
    tag: "prepositions",
    text: "The prisoner was deprived ____ his basic human rights.",
    opts: ["of", "from", "with", "by"],
    correct: 0,
    note: "Don't say 'deprived from'. Say 'deprived of' (e.g. deprived of his freedom)."
  },
  {
    id: "prep-20",
    tag: "prepositions",
    text: "Many people in the region died ____ cholera during the epidemic.",
    opts: ["of", "from", "with", "by"],
    correct: 0,
    note: "Don't say 'died from cholera'. Say 'died of an illness/disease'."
  },
  {
    id: "prep-21",
    tag: "prepositions",
    text: "My new phone is quite different ____ the old model.",
    opts: ["from", "than", "with", "to"],
    correct: 0,
    note: "Don't say 'different than'. Say 'different from' (e.g. different from yours)."
  },
  {
    id: "prep-22",
    tag: "prepositions",
    text: "Phillipa was disappointed ____ her exam test score.",
    opts: ["with", "from", "of", "against"],
    correct: 0,
    note: "Don't say 'disappointed from'. Say 'disappointed with/about/at' a result."
  },
  {
    id: "prep-23",
    tag: "prepositions",
    text: "The teacher divided the cake ____ four equal parts.",
    opts: ["into", "in", "to", "between"],
    correct: 0,
    note: "Don't say 'divided in four parts'. Say 'divided into four parts'."
  },
  {
    id: "prep-24",
    tag: "prepositions",
    text: "Steven failed ____ his chemistry examination last year.",
    opts: ["in", "from", "at", "on"],
    correct: 0,
    note: "Don't say 'failed from maths'. Say 'failed in'."
  },
  {
    id: "prep-25",
    tag: "prepositions",
    text: "The glass jar was full ____ fresh milk.",
    opts: ["of", "with", "from", "by"],
    correct: 0,
    note: "Don't say 'full with milk'. Say 'full of milk'."
  },
  {
    id: "prep-26",
    tag: "prepositions",
    text: "My sister is extremely good ____ solving mathematics puzzles.",
    opts: ["at", "in", "with", "for"],
    correct: 0,
    note: "Don't say 'good in maths'. Say 'good at maths'."
  },
  {
    id: "prep-27",
    tag: "prepositions",
    text: "You must guard ____ developing bad habits.",
    opts: ["against", "from", "of", "with"],
    correct: 0,
    note: "Don't say 'guard from bad habits'. Say 'guard against'."
  },
  {
    id: "prep-28",
    tag: "prepositions",
    text: "The jury found the suspect guilty ____ fraud.",
    opts: ["of", "for", "with", "from"],
    correct: 0,
    note: "Don't say 'guilty for murder'. Say 'guilty of murder'."
  },
  {
    id: "prep-29",
    tag: "prepositions",
    text: "They remained completely indifferent ____ local politics.",
    opts: ["to", "for", "with", "about"],
    correct: 0,
    note: "Don't say 'indifferent for politics'. Say 'indifferent to'."
  },
  {
    id: "prep-30",
    tag: "prepositions",
    text: "He always insisted ____ paying for everyone's dinner.",
    opts: ["on", "to", "with", "for"],
    correct: 0,
    note: "Don't say 'insisted to pay'. Say 'insisted on paying'."
  },
  {
    id: "prep-31",
    tag: "prepositions",
    text: "She is very interested ____ computer programming.",
    opts: ["in", "for", "with", "about"],
    correct: 0,
    note: "Don't say 'interested for work'. Say 'interested in'."
  },
  {
    id: "prep-32",
    tag: "prepositions",
    text: "He is jealous ____ his colleague's promotion.",
    opts: ["of", "from", "with", "for"],
    correct: 0,
    note: "Don't say 'jealous from him'. Say 'jealous of'."
  },
  {
    id: "prep-33",
    tag: "prepositions",
    text: "They are leaving ____ Paris tomorrow on the early flight.",
    opts: ["for", "to", "towards", "into"],
    correct: 0,
    note: "Don't say 'leaving to France'. Say 'leaving for France'."
  },
  {
    id: "prep-34",
    tag: "prepositions",
    text: "Look ____ that beautiful bird sitting on the branch!",
    opts: ["at", "to", "on", "towards"],
    correct: 0,
    note: "Don't say 'look to this picture'. Say 'look at'."
  },
  {
    id: "prep-35",
    tag: "prepositions",
    text: "Angela was married ____ a famous scientist.",
    opts: ["to", "with", "by", "from"],
    correct: 0,
    note: "Don't say 'married with a man'. Say 'married to'."
  },

  // --- 12. Confused Words (Fitikides) ---
  {
    id: "cw-1",
    tag: "confused_words",
    text: "May I ____ your grammar book for a few days?",
    opts: ["borrow", "lend", "keep", "take out"],
    correct: 0,
    note: "You 'borrow' something from someone, whereas someone 'lends' something to you."
  },
  {
    id: "cw-2",
    tag: "confused_words",
    text: "Will you please ____ me your bicycle for the afternoon?",
    opts: ["lend", "borrow", "hire", "provide"],
    correct: 0,
    note: "'Lend' means to give something to someone temporarily."
  },
  {
    id: "cw-3",
    tag: "confused_words",
    text: "Someone has ____ my wallet from my coat pocket.",
    opts: ["stolen", "robbed", "taken off", "plundered"],
    correct: 0,
    note: "'Steal' takes the object taken (stole a wallet); 'rob' takes the person or place (robbed a bank)."
  },
  {
    id: "cw-4",
    tag: "confused_words",
    text: "Masked thieves ____ the central bank yesterday.",
    opts: ["robbed", "stole", "took away", "burgled out"],
    correct: 0,
    note: "Don't say 'stole the bank'. Say 'robbed the bank'."
  },
  {
    id: "cw-5",
    tag: "confused_words",
    text: "The carpenter ____ a sturdy dining table.",
    opts: ["made", "did", "performed", "executed"],
    correct: 0,
    note: "'Make' means construct or build. 'Do' means perform an action or task."
  },
  {
    id: "cw-6",
    tag: "confused_words",
    text: "Students must ____ their homework before watching television.",
    opts: ["do", "make", "create", "construct"],
    correct: 0,
    note: "Don't say 'make homework'. Say 'do homework'."
  },
  {
    id: "cw-7",
    tag: "confused_words",
    text: "I am exhausted and want to ____ down on the bed for an hour.",
    opts: ["lie", "lay", "laid", "lied"],
    correct: 0,
    note: "'Lie' (intransitive) means recline. 'Lay' (transitive) requires a direct object."
  },
  {
    id: "cw-8",
    tag: "confused_words",
    text: "Please ____ the exam papers neatly on the teacher's desk.",
    opts: ["lay", "lie", "lain", "lying"],
    correct: 0,
    note: "'Lay' means put or place something down."
  },
  {
    id: "cw-9",
    tag: "confused_words",
    text: "He hopes he will succeed when he ____ for his final exams.",
    opts: ["sits", "seats", "settles", "sits down"],
    correct: 0,
    note: "Don't say 'seat for an exam'. Say 'sit for an exam' or 'take an exam'."
  },
  {
    id: "cw-10",
    tag: "confused_words",
    text: "Val ____ very early every morning to go jogging.",
    opts: ["rises", "raises", "arouses", "lifts"],
    correct: 0,
    note: "'Rise' (intransitive) means to get up or go up without an object."
  },
  {
    id: "cw-11",
    tag: "confused_words",
    text: "The company plans to ____ the workers' salaries next month.",
    opts: ["raise", "rise", "arise", "elevate"],
    correct: 0,
    note: "'Raise' (transitive) requires an object (raise salaries/prices)."
  },
  {
    id: "cw-12",
    tag: "confused_words",
    text: "Columbus ____ America in 1492.",
    opts: ["discovered", "invented", "found out", "created"],
    correct: 0,
    note: "'Discover' means find something existing that was unknown. 'Invent' means create a new device."
  },
  {
    id: "cw-13",
    tag: "confused_words",
    text: "Thomas Edison ____ the electric light bulb.",
    opts: ["invented", "discovered", "found", "explored"],
    correct: 0,
    note: "'Invent' means produce or design something that did not exist before."
  },
  {
    id: "cw-14",
    tag: "confused_words",
    text: "The graduation ceremony will ____ in the main hall.",
    opts: ["take place", "take part", "take care", "take over"],
    correct: 0,
    note: "'Take place' means happen or be held."
  },
  {
    id: "cw-15",
    tag: "confused_words",
    text: "Many students decided to ____ in the sports competition.",
    opts: ["take part", "take place", "take hold", "take away"],
    correct: 0,
    note: "'Take part in' means participate in an activity."
  },
  {
    id: "cw-16",
    tag: "confused_words",
    text: "This window bowl is ____ glass.",
    opts: ["made of", "made from", "made by", "made with"],
    correct: 0,
    note: "'Made of' is used when the original material does not change its form completely."
  },
  {
    id: "cw-17",
    tag: "confused_words",
    text: "Paper is ____ wood pulp.",
    opts: ["made from", "made of", "made out", "made by"],
    correct: 0,
    note: "'Made from' is used when the material undergoes a complete transformation."
  },
  {
    id: "cw-18",
    tag: "confused_words",
    text: "She works hard to ____ her living by writing stories.",
    opts: ["earn", "win", "gain", "achieve"],
    correct: 0,
    note: "Don't say 'win her living'. Say 'earn her living'."
  },
  {
    id: "cw-19",
    tag: "confused_words",
    text: "Our school football team ____ the final championship match.",
    opts: ["won", "earned", "gained", "beat"],
    correct: 0,
    note: "You 'win' a match, game, or prize, but you 'beat' an opposing team or opponent."
  },
  {
    id: "cw-20",
    tag: "confused_words",
    text: "Our team ____ the visiting team 3-1.",
    opts: ["beat", "won", "earned", "gained"],
    correct: 0,
    note: "'Beat' takes the defeated opponent or team as its direct object."
  },
  {
    id: "cw-21",
    tag: "confused_words",
    text: "Graham ____ us how to solve the difficult equation.",
    opts: ["taught", "learned", "studied", "read"],
    correct: 0,
    note: "Teachers 'teach' students; students 'learn' from teachers."
  },
  {
    id: "cw-22",
    tag: "confused_words",
    text: "Please ____ me to call the doctor at 4 o'clock.",
    opts: ["remind", "remember", "recollect", "memorize"],
    correct: 0,
    note: "'Remind' means cause someone to remember something."
  },
  {
    id: "cw-23",
    tag: "confused_words",
    text: "I cannot ____ where I parked my car yesterday.",
    opts: ["remember", "remind", "recollect to", "memorize"],
    correct: 0,
    note: "'Remember' means keep or recall in mind."
  },
  {
    id: "cw-24",
    tag: "confused_words",
    text: "The doctor advised the patient to ____ in bed for three days.",
    opts: ["stay", "remain", "rest at", "stand"],
    correct: 0,
    note: "'Stay' or 'remain' means continue in a place or state."
  },
  {
    id: "cw-25",
    tag: "confused_words",
    text: "The criminal was ____ for his crimes at dawn.",
    opts: ["hanged", "hung", "hanging", "hung up"],
    correct: 0,
    note: "Use 'hanged' for execution of a person; use 'hung' for objects."
  },
  {
    id: "cw-26",
    tag: "confused_words",
    text: "She ____ her coat on the hook behind the door.",
    opts: ["hung", "hanged", "hanging", "hunged"],
    correct: 0,
    note: "Use 'hung' when suspending clothes or pictures on a wall."
  },
  {
    id: "cw-27",
    tag: "confused_words",
    text: "Kathy always ____ dark shoes to school.",
    opts: ["wears", "puts on", "dresses", "clothes"],
    correct: 0,
    note: "'Wear' denotes the continuous state of having clothes on; 'put on' denotes the action."
  },
  {
    id: "cw-28",
    tag: "confused_words",
    text: "The refugees tried to ____ from the war zone.",
    opts: ["flee", "fly", "flow", "flew"],
    correct: 0,
    note: "'Flee' means run away from danger or pursuers."
  },
  {
    id: "cw-29",
    tag: "confused_words",
    text: "The river has ____ its banks after heavy torrential rainfall.",
    opts: ["overflowed", "overflown", "overflew", "flown"],
    correct: 0,
    note: "The past participle of 'flow' is 'flowed' (overflowed)."
  },
  {
    id: "cw-30",
    tag: "confused_words",
    text: "The wood-cutter ____ the tall pine tree with an axe.",
    opts: ["felled", "fell", "fallen", "falled"],
    correct: 0,
    note: "'Fell' (transitive verb, past tense 'felled') means cut or knock down."
  },
  {
    id: "cw-31",
    tag: "confused_words",
    text: "She managed to ____ her lost ring under the couch.",
    opts: ["find", "found", "founded", "locate for"],
    correct: 0,
    note: "'Find' means discover something lost. 'Found' means establish."
  },
  {
    id: "cw-32",
    tag: "confused_words",
    text: "The university was ____ in 1890 by a wealthy benefactor.",
    opts: ["founded", "found", "finded", "discovered"],
    correct: 0,
    note: "'Found' means establish an institution or organization."
  },
  {
    id: "cw-33",
    tag: "confused_words",
    text: "Fiona always ____ the truth, so everybody trusts her.",
    opts: ["tells", "says", "speaks", "talks"],
    correct: 0,
    note: "Don't say 'says the truth'. Say 'tells the truth'."
  },
  {
    id: "cw-34",
    tag: "confused_words",
    text: "Did you ____ the football match on television last night?",
    opts: ["watch", "look", "see", "view"],
    correct: 0,
    note: "Use 'watch' for matches, games, or shows."
  },
  {
    id: "cw-35",
    tag: "confused_words",
    text: "Chris ____ his jacket as soon as he entered the warm house.",
    opts: ["took off", "took out", "pulled out", "put off"],
    correct: 0,
    note: "'Take off' (remove clothing) is the opposite of 'put on'."
  },

  // --- 13. Common Mistakes & Omissions (Fitikides) ---
  {
    id: "err-1",
    tag: "common_errors",
    text: "The teacher gave me some very valuable ____.",
    opts: ["advice", "advices", "piece of advices", "advises"],
    correct: 0,
    note: "'Advice' is an uncountable noun. Never say 'advices'."
  },
  {
    id: "err-2",
    tag: "common_errors",
    text: "Can you give me any ____ about the upcoming exam schedule?",
    opts: ["information", "informations", "informational", "item of informations"],
    correct: 0,
    note: "'Information' is uncountable. Never add an '-s'."
  },
  {
    id: "err-3",
    tag: "common_errors",
    text: "Their new ____ was delivered to the apartment yesterday.",
    opts: ["furniture", "furnitures", "pieces of furnitures", "items of furnitures"],
    correct: 0,
    note: "'Furniture' is an uncountable singular noun."
  },
  {
    id: "err-4",
    tag: "common_errors",
    text: "Her ____ is already at the station waiting for the train.",
    opts: ["luggage", "luggages", "baggages", "items of luggages"],
    correct: 0,
    note: "'Luggage' and 'baggage' are uncountable nouns without plural forms."
  },
  {
    id: "err-5",
    tag: "common_errors",
    text: "Mathematics ____ my favorite subject when I was at school.",
    opts: ["was", "were", "are", "have been"],
    correct: 0,
    note: "Subjects ending in -ics (mathematics, physics) take a singular verb."
  },
  {
    id: "err-6",
    tag: "common_errors",
    text: "The news about the recovery ____ very encouraging today.",
    opts: ["is", "are", "were", "have been"],
    correct: 0,
    note: "'News' is a singular uncountable noun and takes a singular verb."
  },
  {
    id: "err-7",
    tag: "common_errors",
    text: "This pair of scissors ____ not sharp enough to cut cloth.",
    opts: ["is", "are", "were", "have been"],
    correct: 0,
    note: "'A pair of scissors' takes a singular verb ('is')."
  },
  {
    id: "err-8",
    tag: "common_errors",
    text: "The sharp scissors ____ lying on the desk.",
    opts: ["are", "is", "was", "has been"],
    correct: 0,
    note: "'Scissors' alone takes a plural verb ('are')."
  },
  {
    id: "err-9",
    tag: "common_errors",
    text: "Ten ____ were grazing peacefully in the green pasture.",
    opts: ["sheep", "sheeps", "lambs of sheep", "sheepes"],
    correct: 0,
    note: "The plural of 'sheep' is 'sheep' (no '-s')."
  },
  {
    id: "err-10",
    tag: "common_errors",
    text: "Karen has a sound ____ of world geography.",
    opts: ["knowledge", "knowledges", "knowings", "knowledgeability"],
    correct: 0,
    note: "'Knowledge' is an uncountable noun."
  },
  {
    id: "err-11",
    tag: "common_errors",
    text: "He bought three ____ eggs at the grocery store.",
    opts: ["dozen", "dozens", "dozens of", "dozenses"],
    correct: 0,
    note: "When preceded by a specific numeral (three), use 'dozen' without an '-s'."
  },
  {
    id: "err-12",
    tag: "common_errors",
    text: "The small town has fifty ____ inhabitants.",
    opts: ["thousand", "thousands", "thousands of", "thousand of"],
    correct: 0,
    note: "Use 'fifty thousand' (no '-s' when preceded by a number)."
  },
  {
    id: "err-13",
    tag: "common_errors",
    text: "Thousands ____ fans attended the outdoor rock concert.",
    opts: ["of", "for", "with", "from"],
    correct: 0,
    note: "When not preceded by an exact number, use 'thousands of'."
  },
  {
    id: "err-14",
    tag: "common_errors",
    text: "My younger sister is fifteen years ____.",
    opts: ["old", "of age", "from age", "older"],
    correct: 0,
    note: "Don't say 'fifteen years'. Say 'fifteen years old' or 'fifteen'."
  },
  {
    id: "err-15",
    tag: "common_errors",
    text: "Although it was raining heavily, ____ he decided to go jogging.",
    opts: ["he", "yet he", "still he", "but he"],
    correct: 0,
    note: "Don't use 'although' and 'but/yet' together in the same sentence."
  },
  {
    id: "err-16",
    tag: "common_errors",
    text: "I came to the language school ____ English.",
    opts: ["to learn", "for to learn", "for learning", "to learning"],
    correct: 0,
    note: "Don't say 'for to learn'. Use the simple infinitive 'to learn' to show purpose."
  },
  {
    id: "err-17",
    tag: "common_errors",
    text: "The student ____ his final examination yesterday afternoon.",
    opts: ["took", "gave", "passed", "offered"],
    correct: 0,
    note: "A student 'takes' an exam; a teacher 'gives' or 'sets' an exam."
  },
  {
    id: "err-18",
    tag: "common_errors",
    text: "We went for a ride ____ a bicycle along the river path.",
    opts: ["on", "in", "with", "by"],
    correct: 0,
    note: "Say 'on a bicycle' or 'on horseback', but 'by car' or 'by bus'."
  },
  {
    id: "err-19",
    tag: "common_errors",
    text: "The boy made a mistake ____ dictation class.",
    opts: ["in", "at", "with", "on"],
    correct: 0,
    note: "Don't say 'did a mistake'. Say 'made a mistake in...'"
  },
  {
    id: "err-20",
    tag: "common_errors",
    text: "Please turn ____ the lights before leaving the classroom.",
    opts: ["off", "out", "down", "away"],
    correct: 0,
    note: "Say 'turn off the light' or 'switch off the light'."
  },
  {
    id: "err-21",
    tag: "common_errors",
    text: "He is much ____ than his older brother.",
    opts: ["stronger", "more stronger", "most strong", "much stronger"],
    correct: 0,
    note: "Avoid double comparatives like 'more stronger'."
  },
  {
    id: "err-22",
    tag: "common_errors",
    text: "She has returned ____ to school after her sick leave.",
    opts: ["to school", "back to school", "again to school", "reverse to school"],
    correct: 0,
    note: "Don't say 'return back'. 'Return' already means 'come back'."
  },
  {
    id: "err-23",
    tag: "common_errors",
    text: "I am so tired ____ I can barely walk another mile.",
    opts: ["that", "so that", "because", "as"],
    correct: 0,
    note: "Use 'so + adjective + that clause' to express result."
  },
  {
    id: "err-24",
    tag: "common_errors",
    text: "From now ____ I promise to complete my homework on time.",
    opts: ["on", "from", "forward", "away"],
    correct: 0,
    note: "The correct English idiom is 'from now on'."
  },
  {
    id: "err-25",
    tag: "common_errors",
    text: "Yesterday we went to the cinema ____ night.",
    opts: ["at", "in", "on", "during"],
    correct: 0,
    note: "Say 'at night', but 'in the morning / afternoon / evening'."
  },
  {
    id: "err-26",
    tag: "common_errors",
    text: "Listen to the teacher ____ carefully.",
    opts: ["attentively", "listen attentive", "listening careful", "listen attentively"],
    correct: 0,
    note: "Use an adverb (attentively/carefully) to qualify a verb."
  },
  {
    id: "err-27",
    tag: "common_errors",
    text: "The price of this coat is twenty ____.",
    opts: ["pounds", "pound", "poundings", "poundes"],
    correct: 0,
    note: "Currencies take plural forms when preceded by numbers (twenty pounds)."
  },
  {
    id: "err-28",
    tag: "common_errors",
    text: "I don't think ____ he will arrive on time today.",
    opts: ["that", "what", "how", "so"],
    correct: 0,
    note: "Use 'that' to introduce subordinate clauses after verbs of thinking."
  },
  {
    id: "err-29",
    tag: "common_errors",
    text: "Neither Mark nor John ____ present at the meeting yesterday.",
    opts: ["was", "were", "have been", "are"],
    correct: 0,
    note: "'Neither ... nor' connecting singular subjects takes a singular verb ('was')."
  },
  {
    id: "err-30",
    tag: "common_errors",
    text: "Both of the boys ____ to the library every afternoon.",
    opts: ["go", "goes", "is going", "has gone"],
    correct: 0,
    note: "'Both' takes a plural verb ('go')."
  },
  {
    id: "err-31",
    tag: "common_errors",
    text: "He is taller than ____ in his class.",
    opts: ["any other boy", "any boy", "all boys", "all the boy"],
    correct: 0,
    note: "When comparing a person to others in the same group, say 'any other boy'."
  },
  {
    id: "err-32",
    tag: "common_errors",
    text: "The boy who works hard ____ succeed in the end.",
    opts: ["will", "would", "shall be", "will be"],
    correct: 0,
    note: "Use 'will' to express simple future result."
  },
  {
    id: "err-33",
    tag: "common_errors",
    text: "She was so angry ____ she refused to speak to anyone.",
    opts: ["that", "so", "because", "and"],
    correct: 0,
    note: "Use 'so + adjective + that clause'."
  },
  {
    id: "err-34",
    tag: "common_errors",
    text: "We have been living in this town ____ five years.",
    opts: ["for", "since", "from", "during"],
    correct: 0,
    note: "Use 'for' with a duration of time (five years)."
  },
  {
    id: "err-35",
    tag: "common_errors",
    text: "They have been living here ____ 2018.",
    opts: ["since", "for", "from", "in"],
    correct: 0,
    note: "Use 'since' with a specific starting point in time (2018)."
  },

  // --- 14. Phrasal Verb Particles (McCarthy & O'Dell) ---
  {
    id: "pvp-1",
    tag: "pv_particles",
    text: "Can you help me clear ____ the kitchen after dinner?",
    opts: ["up", "out", "off", "away"],
    correct: 0,
    note: "The particle 'up' adds the meaning of thoroughness or completion (tidy up, clear up)."
  },
  {
    id: "pvp-2",
    tag: "pv_particles",
    text: "The company decided to phase ____ the old computers and introduce new laptops.",
    opts: ["out", "off", "away", "down"],
    correct: 0,
    note: "'Phase out' means to gradually stop using something."
  },
  {
    id: "pvp-3",
    tag: "pv_particles",
    text: "We should head ____ early tomorrow to avoid the morning traffic.",
    opts: ["off", "out", "away", "up"],
    correct: 0,
    note: "'Head off' combines with 'off' to express leaving or starting a journey."
  },
  {
    id: "pvp-4",
    tag: "pv_particles",
    text: "You can always count ____ Sarah to help when you are in trouble.",
    opts: ["on", "in", "up", "with"],
    correct: 0,
    note: "'Count on / rely on / depend on' uses 'on' to convey dependence."
  },
  {
    id: "pvp-5",
    tag: "pv_particles",
    text: "Please call ____ and see us whenever you are next in town.",
    opts: ["in", "on", "up", "out"],
    correct: 0,
    note: "'Call in' means to visit a place or person for a short time."
  },
  {
    id: "pvp-6",
    tag: "pv_particles",
    text: "The factory had to shut ____ after losing its major contract.",
    opts: ["down", "off", "out", "away"],
    correct: 0,
    note: "'Shut down' or 'close down' uses 'down' to express stopping an activity."
  },
  {
    id: "pvp-7",
    tag: "pv_particles",
    text: "I usually flick ____ a magazine before deciding to buy it.",
    opts: ["through", "over", "across", "along"],
    correct: 0,
    note: "'Flick through' or 'flip through' means to look briefly at pages from start to end."
  },
  {
    id: "pvp-8",
    tag: "pv_particles",
    text: "Don't read too much ____ his comment; he was only joking.",
    opts: ["into", "in", "to", "onto"],
    correct: 0,
    note: "'Read into' means to attribute special meaning or importance to something."
  },
  {
    id: "pvp-9",
    tag: "pv_particles",
    text: "Make sure you pack ____ your camping gear before it starts raining.",
    opts: ["away", "out", "off", "up"],
    correct: 0,
    note: "'Pack away' or 'tidy away' means to put things in containers or cupboards after use."
  },
  {
    id: "pvp-10",
    tag: "pv_particles",
    text: "The scandal eventually blew ____ and people forgot all about it.",
    opts: ["over", "off", "away", "out"],
    correct: 0,
    note: "'Blow over' uses 'over' to describe a situation or storm becoming less intense and ending."
  },

  // --- 15. Phrasal Verbs: Work & Life (McCarthy & O'Dell) ---
  {
    id: "pvwl-1",
    tag: "pv_life_work",
    text: "I have to clock ____ at 8:30 a.m. every weekday morning.",
    opts: ["on", "in", "up", "over"],
    correct: 0,
    note: "'Clock on' (or 'clock in') means to record the time you arrive at work."
  },
  {
    id: "pvwl-2",
    tag: "pv_life_work",
    text: "When his work contract ran ____, he moved back to his hometown.",
    opts: ["out", "off", "down", "away"],
    correct: 0,
    note: "'Run out' means to come to an end or expire (of a period or agreement)."
  },
  {
    id: "pvwl-3",
    tag: "pv_life_work",
    text: "After a stressful day at the office, she likes to wind ____ with music.",
    opts: ["down", "off", "away", "out"],
    correct: 0,
    note: "'Wind down' means to gradually relax after hard work."
  },
  {
    id: "pvwl-4",
    tag: "pv_life_work",
    text: "Due to the economic recession, fifty workers were laid ____.",
    opts: ["off", "out", "away", "down"],
    correct: 0,
    note: "'Lay off' means to stop employing workers because there is no work available."
  },
  {
    id: "pvwl-5",
    tag: "pv_life_work",
    text: "I'm completely snowed ____ with paperwork this week.",
    opts: ["under", "over", "down", "in"],
    correct: 0,
    note: "'Snowed under' is an idiom meaning having too much work to deal with."
  },
  {
    id: "pvwl-6",
    tag: "pv_life_work",
    text: "They had to fork ____ $500 for emergency car repairs.",
    opts: ["out", "off", "over", "up"],
    correct: 0,
    note: "'Fork out' means to pay for something, especially reluctantly."
  },
  {
    id: "pvwl-7",
    tag: "pv_life_work",
    text: "The concert tickets sold ____ within fifteen minutes.",
    opts: ["out", "off", "down", "away"],
    correct: 0,
    note: "'Sell out' means to have no tickets or products left to sell."
  },
  {
    id: "pvwl-8",
    tag: "pv_life_work",
    text: "We should book in advance because the hotel is fully booked ____.",
    opts: ["up", "out", "in", "over"],
    correct: 0,
    note: "'Booked up' means having no space or rooms remaining."
  },
  {
    id: "pvwl-9",
    tag: "pv_life_work",
    text: "The plane touched ____ safely at London Heathrow Airport.",
    opts: ["down", "off", "out", "in"],
    correct: 0,
    note: "'Touch down' means to land on the ground (of an aircraft)."
  },
  {
    id: "pvwl-10",
    tag: "pv_life_work",
    text: "Let's chill ____ this weekend and watch a movie.",
    opts: ["out", "off", "down", "away"],
    correct: 0,
    note: "'Chill out' is a modern phrasal verb meaning to relax completely."
  },

  // --- 16. Phrasal Verbs in Use (60 items) ---
  // Basics: Phrasal verbs
  {
    id: "pvu1_15-1",
    tag: "pv_in_use_foundations",
    text: "When the pronoun is an object (e.g. 'them'), which word order is correct for separable phrasal verbs?",
    opts: ["I dropped them off at the station.", "I dropped off them at the station.", "I off dropped them at the station.", "I them dropped off at the station."],
    correct: 0,
    note: "With separable phrasal verbs, if the object is a pronoun (e.g. it, them, me), it MUST go between the verb and particle ('dropped them off')."
  },
  {
    id: "pvu1_15-2",
    tag: "pv_in_use_foundations",
    text: "I couldn't hear what he was saying because the music was too loud; I couldn't ____ what he said.",
    opts: ["make out", "look up", "get through", "eat out"],
    correct: 0,
    note: "'Make out' means to hear, see, or understand something with difficulty."
  },
  {
    id: "pvu1_15-3",
    tag: "pv_in_use_foundations",
    text: "Can you ____ the kids from school at 3:00 PM today?",
    opts: ["drop off", "ring back", "bring back", "ask out"],
    correct: 0,
    note: "'Drop off' means to take someone/something to a place and leave them there."
  },
  {
    id: "pvu1_15-4",
    tag: "pv_in_use_foundations",
    text: "I tried to call the receptionist three times, but I couldn't ____.",
    opts: ["get through", "make out", "look after", "eat out"],
    correct: 0,
    note: "'Get through' means to connect with someone on the phone."
  },

  // What phrasal verbs mean
  {
    id: "pvu1_15-5",
    tag: "pv_in_use_foundations",
    text: "Which formal single-word verb corresponds to the phrasal verb 'put off'?",
    opts: ["postpone", "arrive", "remove", "reject"],
    correct: 0,
    note: "'Put off' means to postpone or delay an event."
  },
  {
    id: "pvu1_15-6",
    tag: "pv_in_use_foundations",
    text: "After hours of continuous debate, the negotiator finally ____ to their demands.",
    opts: ["gave in", "got on", "came round", "took off"],
    correct: 0,
    note: "'Give in' means to stop resisting and agree or surrender."
  },
  {
    id: "pvu1_15-7",
    tag: "pv_in_use_foundations",
    text: "The plane was delayed, but it finally took ____ at midnight.",
    opts: ["off", "up", "out", "away"],
    correct: 0,
    note: "'Take off' (literal/concrete meaning) means to leave the ground and begin to fly."
  },
  {
    id: "pvu1_15-8",
    tag: "pv_in_use_foundations",
    text: "I was unconscious for a few minutes, but then I slowly came ____.",
    opts: ["round", "off", "up", "over"],
    correct: 0,
    note: "'Come round' (or come around) means to regain consciousness."
  },

  // Particles in phrasal verbs
  {
    id: "pvu1_15-9",
    tag: "pv_in_use_foundations",
    text: "If someone invites you to stay at their house for the weekend, they invite you ____.",
    opts: ["over", "out", "away", "off"],
    correct: 0,
    note: "'Invite over/round' means to invite someone to your home."
  },
  {
    id: "pvu1_15-10",
    tag: "pv_in_use_foundations",
    text: "You should read ____ your written essay before handing it to the teacher.",
    opts: ["over", "out", "away", "off"],
    correct: 0,
    note: "'Read over' (or read through) means to read something carefully from start to finish."
  },
  {
    id: "pvu1_15-11",
    tag: "pv_in_use_foundations",
    text: "Are you trying to trick me? Are you having me ____?",
    opts: ["on", "out", "over", "up"],
    correct: 0,
    note: "'Have someone on' means to deceive someone playfully or tease them."
  },
  {
    id: "pvu1_15-12",
    tag: "pv_in_use_foundations",
    text: "Which of the following sentences has INCORRECT word order?",
    opts: ["He woke up them early in the morning.", "He woke them up early in the morning.", "He woke the children up early.", "He woke up the children early."],
    correct: 0,
    note: "Pronoun objects must go between the verb and particle ('woke them up'), never after ('woke up them')."
  },

  // Nouns and adjectives based on phrasal verbs
  {
    id: "pvu1_15-13",
    tag: "pv_in_use_foundations",
    text: "That second-hand computer broke after two days; it was a total ____.",
    opts: ["rip-off", "break-in", "handout", "leftover"],
    correct: 0,
    note: "A 'rip-off' is a noun meaning something that is over-priced or bad value."
  },
  {
    id: "pvu1_15-14",
    tag: "pv_in_use_foundations",
    text: "The police are currently investigating a nocturnal ____ at the jewelry store.",
    opts: ["break-in", "checkout", "dropout", "outset"],
    correct: 0,
    note: "A 'break-in' is an illegal entry into a building, usually to steal."
  },
  {
    id: "pvu1_15-15",
    tag: "pv_in_use_foundations",
    text: "His arrogance and refusal to listen was the main cause of his ____.",
    opts: ["downfall", "check-in", "onlooker", "getaway"],
    correct: 0,
    note: "A 'downfall' (particle + verb noun) means a sudden loss of power, status, or success."
  },
  {
    id: "pvu1_15-16",
    tag: "pv_in_use_foundations",
    text: "The noise from the construction site was very ____ and disturbed my focus.",
    opts: ["off-putting", "broken-down", "throwaway", "bygone"],
    correct: 0,
    note: "'Off-putting' is an adjective derived from 'put off', meaning unpleasant or discouraging."
  },

  // Metaphor and register
  {
    id: "pvu1_15-17",
    tag: "pv_in_use_foundations",
    text: "When someone suddenly loses their temper and starts shouting, we say they ____.",
    opts: ["blow up", "slip up", "let up", "call off"],
    correct: 0,
    note: "Metaphorical meaning of 'blow up' = to suddenly become very angry."
  },
  {
    id: "pvu1_15-18",
    tag: "pv_in_use_foundations",
    text: "The meeting was ____ because the director was unwell.",
    opts: ["called off", "got on", "blown up", "slipped up"],
    correct: 0,
    note: "'Call off' is an informal phrasal verb meaning to cancel (formal synonym: cancel)."
  },
  {
    id: "pvu1_15-19",
    tag: "pv_in_use_foundations",
    text: "I made a careless mistake on the tax form; I really ____ there.",
    opts: ["slipped up", "let up", "missed out", "got out of"],
    correct: 0,
    note: "'Slip up' means to make a minor, careless mistake."
  },
  {
    id: "pvu1_15-20",
    tag: "pv_in_use_foundations",
    text: "After a long lunch break, let's get ____ to business.",
    opts: ["down", "up", "out", "over"],
    correct: 0,
    note: "'Get down to' means to start giving serious attention to a task."
  },

  // Verb: Come
  {
    id: "pvu1_15-21",
    tag: "pv_in_use_foundations",
    text: "How did this awkward situation ____ in the first place?",
    opts: ["come about", "come apart", "come off", "come across"],
    correct: 0,
    note: "'Come about' means to happen or occur."
  },
  {
    id: "pvu1_15-22",
    tag: "pv_in_use_foundations",
    text: "While clearing out the attic, I ____ an old photograph of my grandparents.",
    opts: ["came across", "came around", "came out", "came to"],
    correct: 0,
    note: "'Come across' means to find or meet by chance."
  },
  {
    id: "pvu1_15-23",
    tag: "pv_in_use_foundations",
    text: "The old book was so fragile that it started to ____ in my hands.",
    opts: ["come apart", "come off", "come about", "come up"],
    correct: 0,
    note: "'Come apart' means to separate into several pieces."
  },
  {
    id: "pvu1_15-24",
    tag: "pv_in_use_foundations",
    text: "Her new album is going to ____ next month.",
    opts: ["come out", "come off", "come down to", "come to"],
    correct: 0,
    note: "'Come out' means to be published, released, or made available to the public."
  },

  // Verb: Get
  {
    id: "pvu1_15-25",
    tag: "pv_in_use_foundations",
    text: "We should all ____ for dinner sometime next week.",
    opts: ["get together", "get away", "get by", "get behind"],
    correct: 0,
    note: "'Get together' means to meet socially."
  },
  {
    id: "pvu1_15-26",
    tag: "pv_in_use_foundations",
    text: "I don't earn a huge salary, but it's enough to ____.",
    opts: ["get by", "get away with", "get at", "get over"],
    correct: 0,
    note: "'Get by' means to manage or survive financially."
  },
  {
    id: "pvu1_15-27",
    tag: "pv_in_use_foundations",
    text: "The thief managed to ____ with the stolen cash.",
    opts: ["get away", "get behind", "get round", "get on"],
    correct: 0,
    note: "'Get away' means to escape."
  },
  {
    id: "pvu1_15-28",
    tag: "pv_in_use_foundations",
    text: "I haven't got ____ to fixing the leaky tap yet.",
    opts: ["round", "over", "away", "at"],
    correct: 0,
    note: "'Get round/around to' means to find the time to do something."
  },

  // Verb: Go
  {
    id: "pvu1_15-29",
    tag: "pv_in_use_foundations",
    text: "The milk smells sour; I think it has ____.",
    opts: ["gone off", "gone out", "gone in for", "gone along with"],
    correct: 0,
    note: "'Go off' means to spoil or decay (for food/drink)."
  },
  {
    id: "pvu1_15-30",
    tag: "pv_in_use_foundations",
    text: "They had to ____ a lot of hardship during the war.",
    opts: ["go through", "go without", "go about", "go for"],
    correct: 0,
    note: "'Go through' means to experience or suffer a difficult period."
  },
  {
    id: "pvu1_15-31",
    tag: "pv_in_use_foundations",
    text: "I don't really ____ team sports; I prefer running alone.",
    opts: ["go in for", "go along with", "go together", "go off"],
    correct: 0,
    note: "'Go in for' means to enjoy or participate in an activity."
  },
  {
    id: "pvu1_15-32",
    tag: "pv_in_use_foundations",
    text: "That tie doesn't ____ with your shirt at all.",
    opts: ["go together", "go about", "go off", "go through"],
    correct: 0,
    note: "'Go together' means to match or complement each other well."
  },

  // Verb: Look
  {
    id: "pvu1_15-33",
    tag: "pv_in_use_foundations",
    text: "Young students often ____ their teachers as role models.",
    opts: ["look up to", "look down on", "look out for", "look into"],
    correct: 0,
    note: "'Look up to' means to admire and respect someone."
  },
  {
    id: "pvu1_15-34",
    tag: "pv_in_use_foundations",
    text: "You shouldn't ____ people just because they have less money than you.",
    opts: ["look down on", "look up to", "look ahead", "look through"],
    correct: 0,
    note: "'Look down on' means to consider someone inferior."
  },
  {
    id: "pvu1_15-35",
    tag: "pv_in_use_foundations",
    text: "The detective promised to ____ the mysterious disappearance.",
    opts: ["look into", "look after", "look round", "look forward to"],
    correct: 0,
    note: "'Look into' means to investigate or examine the facts."
  },
  {
    id: "pvu1_15-36",
    tag: "pv_in_use_foundations",
    text: "I'm really ____ seeing you at the family reunion.",
    opts: ["looking forward to", "looking out for", "looking up to", "looking through"],
    correct: 0,
    note: "'Look forward to' means to feel excited about something in the future."
  },

  // Verb: Make
  {
    id: "pvu1_15-37",
    tag: "pv_in_use_foundations",
    text: "It was so foggy that I couldn't ____ the house numbers.",
    opts: ["make out", "make up", "make for", "make up for"],
    correct: 0,
    note: "'Make out' means to distinguish or see clearly."
  },
  {
    id: "pvu1_15-38",
    tag: "pv_in_use_foundations",
    text: "The story he told wasn't true at all; he ____ the whole thing!",
    opts: ["made up", "made for", "made out", "made off"],
    correct: 0,
    note: "'Make up' means to invent or fabricate a story/excuse."
  },
  {
    id: "pvu1_15-39",
    tag: "pv_in_use_foundations",
    text: "I sent her flowers to ____ forgetting her birthday.",
    opts: ["make up for", "make out", "make for", "make it"],
    correct: 0,
    note: "'Make up for' means to compensate for a mistake or bad situation."
  },
  {
    id: "pvu1_15-40",
    tag: "pv_in_use_foundations",
    text: "As soon as the bell rang, the students ____ the exit.",
    opts: ["made for", "made up", "made out", "made over"],
    correct: 0,
    note: "'Make for' means to move towards a direction or place."
  },

  // Verb: Put
  {
    id: "pvu1_15-41",
    tag: "pv_in_use_foundations",
    text: "Never ____ until tomorrow what you can do today.",
    opts: ["put off", "put on", "put out", "put up"],
    correct: 0,
    note: "'Put off' means to delay or postpone."
  },
  {
    id: "pvu1_15-42",
    tag: "pv_in_use_foundations",
    text: "The firefighters worked heroically to ____ the blaze.",
    opts: ["put out", "put in", "put up", "put down"],
    correct: 0,
    note: "'Put out' means to extinguish a fire or cigarette."
  },
  {
    id: "pvu1_15-43",
    tag: "pv_in_use_foundations",
    text: "I can't ____ with his noisy behavior any longer!",
    opts: ["put up with", "put off", "put in", "put on"],
    correct: 0,
    note: "'Put up with' means to tolerate or endure something unpleasant."
  },
  {
    id: "pvu1_15-44",
    tag: "pv_in_use_foundations",
    text: "She ____ a brilliant proposal at the staff meeting.",
    opts: ["put forward", "put down", "put back", "put on"],
    correct: 0,
    note: "'Put forward' means to offer or suggest an idea/proposal."
  },

  // Verb: Take
  {
    id: "pvu1_15-45",
    tag: "pv_in_use_foundations",
    text: "The mechanic had to ____ the engine to find the fault.",
    opts: ["take apart", "take back", "take off", "take in"],
    correct: 0,
    note: "'Take apart' means to dismantle or separate into pieces."
  },
  {
    id: "pvu1_15-46",
    tag: "pv_in_use_foundations",
    text: "He has recently ____ painting as a relaxing hobby.",
    opts: ["taken up", "taken off", "taken in", "taken away"],
    correct: 0,
    note: "'Take up' means to start a new hobby, activity, or habit."
  },
  {
    id: "pvu1_15-47",
    tag: "pv_in_use_foundations",
    text: "Don't be ____ by his polite manners; he is actually very dishonest.",
    opts: ["taken in", "taken off", "taken back", "taken to"],
    correct: 0,
    note: "'Take in' (passive: be taken in) means to be deceived or tricked."
  },
  {
    id: "pvu1_15-48",
    tag: "pv_in_use_foundations",
    text: "I was wrong about him; I ____ everything I said.",
    opts: ["take back", "take aside", "take out", "take after"],
    correct: 0,
    note: "'Take back' means to retract a statement or admit one was wrong."
  },

  // Particle: Up
  {
    id: "pvu1_15-49",
    tag: "pv_in_use_foundations",
    text: "Please ____ your bedroom before the guests arrive.",
    opts: ["tidy up", "jumble up", "clog up", "use up"],
    correct: 0,
    note: "'Tidy up' (or clear up) means to make a place clean and orderly."
  },
  {
    id: "pvu1_15-50",
    tag: "pv_in_use_foundations",
    text: "The fallen leaves have ____ the garden drain.",
    opts: ["clogged up", "tidied up", "hung up", "used up"],
    correct: 0,
    note: "'Clog up' means to block a pipe or passage completely."
  },
  {
    id: "pvu1_15-51",
    tag: "pv_in_use_foundations",
    text: "Don't ____ all the milk; save some for breakfast tomorrow.",
    opts: ["use up", "tidy up", "open up", "show up"],
    correct: 0,
    note: "'Use up' means to finish or consume the entire supply of something."
  },
  {
    id: "pvu1_15-52",
    tag: "pv_in_use_foundations",
    text: "We waited for an hour, but he didn't ____ at the restaurant.",
    opts: ["show up", "liven up", "chop up", "jumble up"],
    correct: 0,
    note: "'Show up' (or turn up) means to arrive or appear at an event."
  },

  // Particle: Out
  {
    id: "pvu1_15-53",
    tag: "pv_in_use_foundations",
    text: "Make sure you don't ____ any important details from the application form.",
    opts: ["leave out", "cut out", "sort out", "try out"],
    correct: 0,
    note: "'Leave out' means to omit or exclude something."
  },
  {
    id: "pvu1_15-54",
    tag: "pv_in_use_foundations",
    text: "We have ____ printer paper, so someone needs to buy more.",
    opts: ["run out of", "worn out", "spread out", "cleared out"],
    correct: 0,
    note: "'Run out of' means to have no more left of something."
  },
  {
    id: "pvu1_15-55",
    tag: "pv_in_use_foundations",
    text: "I accidentally locked myself ____ of the flat yesterday.",
    opts: ["out", "off", "in", "away"],
    correct: 0,
    note: "'Lock oneself out' means to accidentally shut oneself outside without keys."
  },
  {
    id: "pvu1_15-56",
    tag: "pv_in_use_foundations",
    text: "We need to ____ these files into alphabetical order.",
    opts: ["sort out", "see out", "let out", "wear out"],
    correct: 0,
    note: "'Sort out' means to organize or resolve a problem."
  },

  // Particle: Off
  {
    id: "pvu1_15-57",
    tag: "pv_in_use_foundations",
    text: "The rocket ____ at precisely 08:00 GMT.",
    opts: ["lifted off", "headed off", "sent off", "dozed off"],
    correct: 0,
    note: "'Lift off' means to leave the ground and rise into the air (of a rocket/spacecraft)."
  },
  {
    id: "pvu1_15-58",
    tag: "pv_in_use_foundations",
    text: "The lecture was so boring that several students ____.",
    opts: ["dozed off", "headed off", "slips off", "holds off"],
    correct: 0,
    note: "'Doze off' means to fall asleep unintentionally."
  },
  {
    id: "pvu1_15-59",
    tag: "pv_in_use_foundations",
    text: "The referee ____ two players after a violent fight on the pitch.",
    opts: ["sent off", "see off", "sold off", "laughed off"],
    correct: 0,
    note: "'Send off' means to order a sports player to leave the field/court."
  },
  {
    id: "pvu1_15-60",
    tag: "pv_in_use_foundations",
    text: "He tried to ____ his blunder with a light joke, but nobody laughed.",
    opts: ["laugh off", "break off", "hold off", "clear off"],
    correct: 0,
    note: "'Laugh off' means to dismiss an embarrassing situation or insult lightheartedly."
  },

  // --- 11. Conditionals & Wish Clauses ---
  {
    id: "cw-1",
    tag: "conditionals_wishes",
    text: "If I ____ you, I would consult a legal professional immediately.",
    opts: ["were", "was", "am", "have been"],
    correct: 0,
    note: TENSE_NOTES.conditionals_wishes
  },
  {
    id: "cw-2",
    tag: "conditionals_wishes",
    text: "If it rains tomorrow, we ____ the outdoor concert.",
    opts: ["will cancel", "would cancel", "cancelled", "had cancelled"],
    correct: 0,
    note: TENSE_NOTES.conditionals_wishes
  },
  {
    id: "cw-3",
    tag: "conditionals_wishes",
    text: "I wish I ____ more attention during the physics lecture yesterday.",
    opts: ["had paid", "have paid", "pay", "would pay"],
    correct: 0,
    note: TENSE_NOTES.conditionals_wishes
  },
  {
    id: "cw-4",
    tag: "conditionals_wishes",
    text: "If they had left ten minutes earlier, they ____ the train.",
    opts: ["would not have missed", "will not miss", "did not miss", "had not missed"],
    correct: 0,
    note: TENSE_NOTES.conditionals_wishes
  },
  {
    id: "cw-5",
    tag: "conditionals_wishes",
    text: "If only we ____ a bigger apartment in the city center!",
    opts: ["had", "have", "will have", "are having"],
    correct: 0,
    note: TENSE_NOTES.conditionals_wishes
  },
  {
    id: "cw-6",
    tag: "conditionals_wishes",
    text: "Had I known about your arrival, I ____ you at the airport.",
    opts: ["would have met", "will meet", "met", "have met"],
    correct: 0,
    note: TENSE_NOTES.conditionals_wishes
  },
  {
    id: "cw-7",
    tag: "conditionals_wishes",
    text: "Water boils if you ____ it to 100 degrees Celsius.",
    opts: ["heat", "will heat", "heated", "had heated"],
    correct: 0,
    note: TENSE_NOTES.conditionals_wishes
  },
  {
    id: "cw-8",
    tag: "conditionals_wishes",
    text: "If she studied harder, she ____ top marks in the examination.",
    opts: ["would achieve", "will achieve", "achieves", "had achieved"],
    correct: 0,
    note: TENSE_NOTES.conditionals_wishes
  },

  // --- 12. Passive Voice & Causatives ---
  {
    id: "pv-1",
    tag: "passive_voice",
    text: "The historic cathedral ____ by millions of tourists every year.",
    opts: ["is visited", "visited", "is visiting", "has visited"],
    correct: 0,
    note: TENSE_NOTES.passive_voice
  },
  {
    id: "pv-2",
    tag: "passive_voice",
    text: "A new central hospital ____ in our district right now.",
    opts: ["is being built", "is building", "built", "has built"],
    correct: 0,
    note: TENSE_NOTES.passive_voice
  },
  {
    id: "pv-3",
    tag: "passive_voice",
    text: "We need to ____ our roof repaired before the heavy winter rains arrive.",
    opts: ["get", "make", "do", "let"],
    correct: 0,
    note: TENSE_NOTES.passive_voice
  },
  {
    id: "pv-4",
    tag: "passive_voice",
    text: "The annual financial report must ____ to the board before noon tomorrow.",
    opts: ["be submitted", "submit", "be submitting", "submitting"],
    correct: 0,
    note: TENSE_NOTES.passive_voice
  },
  {
    id: "pv-5",
    tag: "passive_voice",
    text: "She had her wallet and passport ____ while traveling abroad.",
    opts: ["stolen", "steal", "stealing", "to steal"],
    correct: 0,
    note: TENSE_NOTES.passive_voice
  },
  {
    id: "pv-6",
    tag: "passive_voice",
    text: "The suspect is believed to ____ the country late last night.",
    opts: ["have left", "leave", "be leaving", "left"],
    correct: 0,
    note: TENSE_NOTES.passive_voice
  },
  {
    id: "pv-7",
    tag: "passive_voice",
    text: "All confidential records ____ after five years according to corporate policy.",
    opts: ["are destroyed", "destroy", "are destroying", "destroyed"],
    correct: 0,
    note: TENSE_NOTES.passive_voice
  },
  {
    id: "pv-8",
    tag: "passive_voice",
    text: "I am getting my car engine ____ at the service garage this afternoon.",
    opts: ["inspected", "inspect", "inspecting", "to inspect"],
    correct: 0,
    note: TENSE_NOTES.passive_voice
  },

  // --- 13. Idioms & Natural Expressions ---
  {
    id: "ic-1",
    tag: "idioms_collocations",
    text: "After hours of heated debate, we finally saw ____ and reached an agreement.",
    opts: ["eye to eye", "hand in hand", "face to face", "back to back"],
    correct: 0,
    note: TENSE_NOTES.idioms_collocations
  },
  {
    id: "ic-2",
    tag: "idioms_collocations",
    text: "Don't burn the ____ at both ends, or you will suffer from severe exhaustion.",
    opts: ["candle", "match", "lamp", "fire"],
    correct: 0,
    note: TENSE_NOTES.idioms_collocations
  },
  {
    id: "ic-3",
    tag: "idioms_collocations",
    text: "The team managed to hit the ____ running as soon as funding was approved.",
    opts: ["ground", "floor", "street", "road"],
    correct: 0,
    note: TENSE_NOTES.idioms_collocations
  },
  {
    id: "ic-4",
    tag: "idioms_collocations",
    text: "She accidentally spilled the ____ about the surprise anniversary party.",
    opts: ["beans", "tea", "coffee", "water"],
    correct: 0,
    note: TENSE_NOTES.idioms_collocations
  },
  {
    id: "ic-5",
    tag: "idioms_collocations",
    text: "Passing the basic driving test was a piece of ____ for him.",
    opts: ["cake", "pie", "bread", "candy"],
    correct: 0,
    note: TENSE_NOTES.idioms_collocations
  },
  {
    id: "ic-6",
    tag: "idioms_collocations",
    text: "We need to bite the ____ and make the difficult financial decision today.",
    opts: ["bullet", "apple", "nail", "coin"],
    correct: 0,
    note: TENSE_NOTES.idioms_collocations
  },
  {
    id: "ic-7",
    tag: "idioms_collocations",
    text: "His analysis hit the ____ on the head; it addressed the exact problem.",
    opts: ["nail", "hammer", "target", "pin"],
    correct: 0,
    note: TENSE_NOTES.idioms_collocations
  },
  {
    id: "ic-8",
    tag: "idioms_collocations",
    text: "I feel a bit under the ____ today, so I am taking a rest.",
    opts: ["weather", "cloud", "rain", "storm"],
    correct: 0,
    note: TENSE_NOTES.idioms_collocations
  },

  // --- 14. Advanced Grammar & Inversion ---
  {
    id: "ag-1",
    tag: "advanced_grammar",
    text: "Hardly ____ home when the severe thunderstorm broke out.",
    opts: ["had I arrived", "I had arrived", "did I arrive", "I arrived"],
    correct: 0,
    note: TENSE_NOTES.advanced_grammar
  },
  {
    id: "ag-2",
    tag: "advanced_grammar",
    text: "Not only ____ the grand prize, but she also delivered an inspiring speech.",
    opts: ["did she win", "she won", "she did win", "won she"],
    correct: 0,
    note: TENSE_NOTES.advanced_grammar
  },
  {
    id: "ag-3",
    tag: "advanced_grammar",
    text: "Seldom ____ such breathtaking mountain scenery in all my travels.",
    opts: ["have I seen", "I have seen", "I saw", "saw I"],
    correct: 0,
    note: TENSE_NOTES.advanced_grammar
  },
  {
    id: "ag-4",
    tag: "advanced_grammar",
    text: "Under no circumstances ____ open this emergency door while the vehicle is moving.",
    opts: ["should you", "you should", "you ought to", "you will"],
    correct: 0,
    note: TENSE_NOTES.advanced_grammar
  },
  {
    id: "ag-5",
    tag: "advanced_grammar",
    text: "It was not until yesterday ____ the true background story.",
    opts: ["that I learned", "when I learned", "did I learn", "before I learned"],
    correct: 0,
    note: TENSE_NOTES.advanced_grammar
  },
  {
    id: "ag-6",
    tag: "advanced_grammar",
    text: "Little ____ how much dedication organizing the conference would require.",
    opts: ["did we realize", "we realized", "we did realize", "realized we"],
    correct: 0,
    note: TENSE_NOTES.advanced_grammar
  },
  {
    id: "ag-7",
    tag: "advanced_grammar",
    text: "Were I ____ in your situation, I would accept the international offer.",
    opts: ["to be", "being", "been", "be"],
    correct: 0,
    note: TENSE_NOTES.advanced_grammar
  },
  {
    id: "ag-8",
    tag: "advanced_grammar",
    text: "Only after the meeting concluded ____ the full impact of his statements.",
    opts: ["did I grasp", "I grasped", "I did grasp", "grasped I"],
    correct: 0,
    note: TENSE_NOTES.advanced_grammar
  },

  // --- 15. Business & Academic English ---
  {
    id: "ba-1",
    tag: "business_academic",
    text: "The executive committee decided to ____ the motion until the next quarterly session.",
    opts: ["table", "shelf", "chair", "bench"],
    correct: 0,
    note: TENSE_NOTES.business_academic
  },
  {
    id: "ba-2",
    tag: "business_academic",
    text: "In light of recent market fluctuations, we must ____ our strategic objectives.",
    opts: ["reassess", "rebound", "relocate", "reimburse"],
    correct: 0,
    note: TENSE_NOTES.business_academic
  },
  {
    id: "ba-3",
    tag: "business_academic",
    text: "Please find the audited financial statement ____ to this email.",
    opts: ["attached", "enclosed", "affixed", "adhered"],
    correct: 0,
    note: TENSE_NOTES.business_academic
  },
  {
    id: "ba-4",
    tag: "business_academic",
    text: "The two parties reached a mutually advantageous ____ on intellectual property rights.",
    opts: ["compromise", "contention", "concession", "compliance"],
    correct: 0,
    note: TENSE_NOTES.business_academic
  },
  {
    id: "ba-5",
    tag: "business_academic",
    text: "Notwithstanding the initial delays, the research yields ____ evidence.",
    opts: ["compelling", "compelled", "compulsively", "compulsion"],
    correct: 0,
    note: TENSE_NOTES.business_academic
  },
  {
    id: "ba-6",
    tag: "business_academic",
    text: "We need to streamline operational processes to maximize overall ____.",
    opts: ["efficiency", "efficacy", "effective", "efficiently"],
    correct: 0,
    note: TENSE_NOTES.business_academic
  },
  {
    id: "ba-7",
    tag: "business_academic",
    text: "The updated safety policy will take ____ effect across all regional branches.",
    opts: ["immediate", "promptly", "instantaneous", "direct"],
    correct: 0,
    note: TENSE_NOTES.business_academic
  },
  {
    id: "ba-8",
    tag: "business_academic",
    text: "Her research findings are completely consistent ____ empirical data collected last year.",
    opts: ["with", "to", "for", "on"],
    correct: 0,
    note: TENSE_NOTES.business_academic
  }
];

/**
 * Shuffles questions array and options within each question randomly.
 */
export function prepareQuizQuestions(
  count: number,
  category:
    | 'all'
    | 'continuous'
    | 'perfect'
    | 'perfect_continuous'
    | 'phrasal_verbs'
    | 'prepositions'
    | 'confused_words'
    | 'common_errors'
    | 'pv_particles'
    | 'pv_life_work'
    | 'pv_in_use_foundations'
    | 'conditionals_wishes'
    | 'passive_voice'
    | 'idioms_collocations'
    | 'advanced_grammar'
    | 'business_academic' = 'all'
): { shuffledQuestions: { question: Question; shuffledOpts: string[]; correctText: string }[] } {
  // Fisher-Yates shuffle array
  const shuffleArray = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Filter pool based on category
  let pool = RAW_QUESTIONS;
  if (category === 'continuous') {
    pool = RAW_QUESTIONS.filter((q) => q.tag.includes('continuous') && !q.tag.includes('perfect'));
  } else if (category === 'perfect') {
    pool = RAW_QUESTIONS.filter((q) => q.tag.includes('perfect') && !q.tag.includes('continuous'));
  } else if (category === 'perfect_continuous') {
    pool = RAW_QUESTIONS.filter((q) => q.tag.includes('perfect_continuous'));
  } else if (category === 'phrasal_verbs') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'phrasal_verbs');
  } else if (category === 'prepositions') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'prepositions');
  } else if (category === 'confused_words') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'confused_words');
  } else if (category === 'common_errors') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'common_errors');
  } else if (category === 'pv_particles') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'pv_particles');
  } else if (category === 'pv_life_work') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'pv_life_work');
  } else if (category === 'pv_in_use_foundations') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'pv_in_use_foundations');
  } else if (category === 'conditionals_wishes') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'conditionals_wishes');
  } else if (category === 'passive_voice') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'passive_voice');
  } else if (category === 'idioms_collocations') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'idioms_collocations');
  } else if (category === 'advanced_grammar') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'advanced_grammar');
  } else if (category === 'business_academic') {
    pool = RAW_QUESTIONS.filter((q) => q.tag === 'business_academic');
  }

  // 1. Shuffle question pool
  const shuffledRaw = shuffleArray(pool);

  // 2. Take requested slice count (or max available)
  const countToTake = Math.min(count, shuffledRaw.length);
  const selectedRaw = shuffledRaw.slice(0, countToTake);

  // 3. For each selected question, shuffle the 4 option strings independently
  const prepared = selectedRaw.map((q) => {
    const correctText = q.opts[q.correct];
    const shuffledOpts = shuffleArray(q.opts);
    return {
      question: q,
      shuffledOpts,
      correctText
    };
  });

  return { shuffledQuestions: prepared };
}

/**
 * Returns the total number of questions available for a given category.
 */
export function getCategoryQuestionCount(
  category:
    | 'all'
    | 'continuous'
    | 'perfect'
    | 'perfect_continuous'
    | 'phrasal_verbs'
    | 'prepositions'
    | 'confused_words'
    | 'common_errors'
    | 'pv_particles'
    | 'pv_life_work'
    | 'pv_in_use_foundations'
    | 'conditionals_wishes'
    | 'passive_voice'
    | 'idioms_collocations'
    | 'advanced_grammar'
    | 'business_academic' = 'all'
): number {
  if (category === 'continuous') return RAW_QUESTIONS.filter((q) => q.tag.includes('continuous') && !q.tag.includes('perfect')).length;
  if (category === 'perfect') return RAW_QUESTIONS.filter((q) => q.tag.includes('perfect') && !q.tag.includes('continuous')).length;
  if (category === 'perfect_continuous') return RAW_QUESTIONS.filter((q) => q.tag.includes('perfect_continuous')).length;
  if (category === 'phrasal_verbs') return RAW_QUESTIONS.filter((q) => q.tag === 'phrasal_verbs').length;
  if (category === 'prepositions') return RAW_QUESTIONS.filter((q) => q.tag === 'prepositions').length;
  if (category === 'confused_words') return RAW_QUESTIONS.filter((q) => q.tag === 'confused_words').length;
  if (category === 'common_errors') return RAW_QUESTIONS.filter((q) => q.tag === 'common_errors').length;
  if (category === 'pv_particles') return RAW_QUESTIONS.filter((q) => q.tag === 'pv_particles').length;
  if (category === 'pv_life_work') return RAW_QUESTIONS.filter((q) => q.tag === 'pv_life_work').length;
  if (category === 'pv_in_use_foundations') return RAW_QUESTIONS.filter((q) => q.tag === 'pv_in_use_foundations').length;
  if (category === 'conditionals_wishes') return RAW_QUESTIONS.filter((q) => q.tag === 'conditionals_wishes').length;
  if (category === 'passive_voice') return RAW_QUESTIONS.filter((q) => q.tag === 'passive_voice').length;
  if (category === 'idioms_collocations') return RAW_QUESTIONS.filter((q) => q.tag === 'idioms_collocations').length;
  if (category === 'advanced_grammar') return RAW_QUESTIONS.filter((q) => q.tag === 'advanced_grammar').length;
  if (category === 'business_academic') return RAW_QUESTIONS.filter((q) => q.tag === 'business_academic').length;
  return RAW_QUESTIONS.length;
}
