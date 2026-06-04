export type BlogCategory = 'sims-4' | 'simlit' | 'cc-mods' | 'gaming' | 'behind-the-story';

export const categoryLabels: Record<BlogCategory, string> = {
  'sims-4': 'Sims 4',
  simlit: 'SimLit',
  'cc-mods': 'CC & Mods',
  gaming: 'Gaming',
  'behind-the-story': 'Behind the Story',
};

export const categoryDescriptions: Record<BlogCategory, string> = {
  'sims-4':
    'Posts about The Sims 4 — gameplay, updates, stories, and the peculiar magic of a life simulator that keeps surprising me.',
  simlit:
    'Writing about SimLit as a form — what it is, how it works, and why stories told through a life simulator can carry genuine emotional weight.',
  'cc-mods':
    'Custom content and mods that shape the visual world of my stories. The tools behind the pictures, credited where I can trace them.',
  gaming:
    'Occasional thoughts on games beyond The Sims — the ones that made me feel something, or think differently about storytelling.',
  'behind-the-story':
    'Process notes, decisions, and the small quiet things that happen between chapters. What I was thinking. What changed.',
};
