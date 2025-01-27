/*
  # Add Initial Test Questions

  1. Content Added
    - Grammar questions (multiple choice)
    - Vocabulary questions (multiple choice)
    - Reading comprehension questions (multiple choice)
    - Writing prompts (open-ended)
    - Speaking prompts (voice recording)

  2. Structure
    - Each question includes:
      - Section identifier
      - Difficulty level (1-5)
      - Question content
      - Options (for multiple choice)
      - Correct answer (for multiple choice)
*/

-- Grammar Questions
INSERT INTO questions (section, difficulty, content, options, correct_answer) VALUES
('grammar', 1, 'Choose the correct form of the verb: "She _____ to the store yesterday."', 
  '["went", "gone", "going", "goes"]'::jsonb, 
  'went'),
('grammar', 2, 'Select the correct relative pronoun: "The book _____ I bought yesterday is interesting."',
  '["which", "who", "whom", "whose"]'::jsonb,
  'which'),
('grammar', 3, 'Choose the correct conditional form: "If I _____ rich, I would buy a house."',
  '["were", "was", "am", "be"]'::jsonb,
  'were'),
('grammar', 4, 'Select the correct passive voice: "The letter _____ by John last week."',
  '["was written", "was wrote", "was writing", "had written"]'::jsonb,
  'was written');

-- Vocabulary Questions
INSERT INTO questions (section, difficulty, content, options, correct_answer) VALUES
('vocabulary', 1, 'Which word is a synonym for "happy"?',
  '["joyful", "angry", "sad", "tired"]'::jsonb,
  'joyful'),
('vocabulary', 2, 'Choose the correct meaning of "ubiquitous":',
  '["present everywhere", "rare", "beautiful", "dangerous"]'::jsonb,
  'present everywhere'),
('vocabulary', 3, 'Select the antonym of "benevolent":',
  '["malevolent", "kind", "generous", "friendly"]'::jsonb,
  'malevolent'),
('vocabulary', 4, 'What does "ephemeral" mean?',
  '["lasting a very short time", "permanent", "ancient", "meaningful"]'::jsonb,
  'lasting a very short time');

-- Reading Comprehension Questions
INSERT INTO questions (section, difficulty, content, options, correct_answer) VALUES
('reading', 1, 'Read the passage: "The sun was setting behind the mountains, casting long shadows across the valley. A cool breeze rustled through the trees, carrying the sweet scent of wildflowers." What time of day is described?',
  '["evening", "morning", "noon", "midnight"]'::jsonb,
  'evening'),
('reading', 2, 'Read the passage: "Despite numerous attempts to solve the puzzle, Sarah remained stumped. She had tried every combination she could think of, but the solution eluded her." How did Sarah feel?',
  '["frustrated", "happy", "excited", "indifferent"]'::jsonb,
  'frustrated'),
('reading', 3, 'Read the academic passage: "The phenomenon of bioluminescence, while relatively rare on land, is surprisingly common in marine environments. Various species of fish, bacteria, and other marine organisms produce their own light through chemical reactions." What is the main topic?',
  '["light production in marine life", "chemical reactions", "marine biology", "rare phenomena"]'::jsonb,
  'light production in marine life');

-- Writing Prompts
INSERT INTO questions (section, difficulty, content) VALUES
('writing', 1, 'Write about your favorite childhood memory. Include details about what happened and why it is meaningful to you.'),
('writing', 2, 'Describe a significant challenge you have faced and how you overcame it.'),
('writing', 3, 'Do you think technology has made people more or less connected? Support your argument with specific examples.'),
('writing', 4, 'Write an essay discussing the impact of climate change on future generations. Include potential solutions and their feasibility.');

-- Speaking Prompts
INSERT INTO questions (section, difficulty, content) VALUES
('speaking', 1, 'Describe your daily routine. What do you typically do from morning to evening?'),
('speaking', 2, 'Talk about a movie or book that had a significant impact on you. Why did it affect you so much?'),
('speaking', 3, 'If you could change one thing about your country''s education system, what would it be and why?'),
('speaking', 4, 'Present your views on whether artificial intelligence will have a positive or negative impact on society. Support your argument with examples.');