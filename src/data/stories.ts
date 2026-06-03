export type Chapter = {
  number: number;
  title: string;
  excerpt: string;
  imageUrl?: string;
  readingTime: number;
  contentWarnings: string[];
  content: string;
};

export type Character = {
  name: string;
  role: string;
  portrait?: string;
  bio: string;
};

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  status: 'ongoing' | 'complete' | 'hiatus';
  genre: string[];
  description: string;
  contentWarnings: string[];
  characters: Character[];
  chapters: Chapter[];
};

export const stories: Story[] = [
  {
    id: 'tales-of-berrinmoore',
    title: 'Tales of Berrinmoore',
    subtitle: 'Where old grief learns new names',
    coverImage: '/images/berrinmoore-cover.jpg',
    status: 'ongoing',
    genre: ['Romance', 'Melancholy', 'Literary'],
    description:
      'A woman arrives at a coastal house she has inherited from someone she barely knew. The house has its own memory. So does the town.',
    contentWarnings: ['grief', 'loss', 'slow burn'],
    characters: [
      {
        name: 'Maren Ashford',
        role: 'Protagonist — the inheritor',
        portrait: '/images/characters/maren.jpg',
        bio: 'Maren is thirty-four and has spent most of her adult life moving. She arrived in Berrinmoore with two suitcases and a letter she has read so many times the crease has worn through. She does not think of herself as someone who stays. The house disagrees.',
      },
      {
        name: 'Elliot Vane',
        role: 'Supporting — the neighbour',
        portrait: '/images/characters/elliot.jpg',
        bio: 'Elliot has lived next door to the old Ashford house for eleven years. He watched it stand empty. He watched the lights come on the night Maren arrived, and he told himself it was none of his business. He has been telling himself that ever since.',
      },
    ],
    chapters: [
      {
        number: 1,
        title: 'The House on the Hill',
        excerpt:
          'The key was smaller than she expected. Everything about Berrinmoore was smaller than she expected, and somehow larger at the same time.',
        imageUrl: '/images/chapters/ch1-cover.jpg',
        readingTime: 7,
        contentWarnings: ['grief', 'loss'],
        content: `The key was smaller than she expected. Everything about Berrinmoore was smaller than she expected, and somehow larger at the same time.

Maren stood at the end of the gravel path and looked up at the house. It was old in the way that coastal things get old — salt-worn, patient, slightly tilted against whatever winds had pressed against it over the years. The paint on the window frames had gone the colour of old cream. The garden had made its own decisions for long enough that calling it a garden felt generous.

She had been told it was hers, and she did not know what to do with that.

The solicitor had been kind about it in the practised way of solicitors — *a remarkable property, Miss Ashford, quite unique positioning, the view alone* — and she had nodded through all of it, the letter still folded in her coat pocket where she had been keeping it for three weeks. Not reading it again. Just knowing it was there.

The sea was visible from here. She had not expected that. A slice of grey-green water between two hills to the west, the horizon thin as a thread. She looked at it for longer than she meant to.

The house waited.

Inside, it smelled of old paper and something faintly floral — lavender, perhaps, or the ghost of it. The rooms were dim and low-ceilinged and full of objects she did not recognise: a cabinet of blue-and-white china, a painting of a woman whose face she could not quite make out in the grey afternoon light, stacks of books on every surface. Someone had lived here. Someone had lived here thoroughly, the way people live who do not expect to leave.

She set her bag down in the hallway and stood very still.

*I am here*, she thought. *That is all I have to know right now.*

The light through the front window was the particular gold of late afternoon, the kind that makes ordinary rooms look briefly sacred. She watched it move across the floor as the clouds shifted, and she felt something she could not name — not quite longing, not quite peace. Something older than both.

She did not cry. She had been crying for three weeks, in small careful amounts, in private. She was done with that for the day.

She found the kitchen and put the kettle on.

Outside, through the kitchen window, she could see the neighbouring house — closer than she had realised, separated only by a low stone wall and an overgrown hedge of something that might once have been lavender. There was a light on upstairs. Someone was home.

She thought about that, and then she thought about the cup of tea she was going to make, and she chose the tea.

*One thing at a time*, she told herself. *One thing at a time.*`,
      },
      {
        number: 2,
        title: 'What the Water Keeps',
        excerpt:
          'The town remembered things that people tried to forget. That was the nature of small places by the sea — the water kept what the land let go.',
        imageUrl: '/images/chapters/ch2-cover.jpg',
        readingTime: 8,
        contentWarnings: ['grief', 'family conflict'],
        content: `The town remembered things that people tried to forget. That was the nature of small places by the sea — the water kept what the land let go.

Maren found this out on her third day in Berrinmoore, when she went to the small post office on the high street to redirect her mail and the woman behind the counter said: *You're the one who's moved into the Ashford house, then* — not a question, a confirmation — and then said nothing more, just looked at her with an expression of measured assessment that Maren had been receiving from strangers all week.

She was becoming fluent in that expression. It meant: *we knew her, and now here you are, and we are deciding what to make of you.*

She collected her redirected post and walked back along the seafront. The morning was cold and salt-bright, the kind of coastal day that scrubs you clean whether you want it to or not. Gulls. A fishing boat on the water. A man sitting on a low wall reading a newspaper, who looked up as she passed and then looked away.

She had not yet spoken to the neighbour.

She was aware of this in the way she was aware of the letter still in her coat pocket — as a thing she was circling rather than approaching. The light in the upstairs window had been on both nights since she arrived. Once, returning from a walk along the cliff path, she had seen a figure in the garden — male, she thought, and tall, doing something with a wheelbarrow — but he had gone inside before she reached the gate, and she had been relieved and then unsettled by the relief.

The house was beginning to speak to her in the way that old houses do — not in words but in details. She had found, in the bedroom she was sleeping in, a row of paperback novels with the spines cracked open at specific pages. She had found, in the kitchen drawer, a letter half-written, stopped mid-sentence: *I have been thinking about what you said, and I think you were right that I —*

Right that she what.

She had put the letter back in the drawer and closed it, and then she had opened it again and read it once more, and then she had put it back and made herself leave the kitchen.

The dead were not hers to read. But the house made it difficult to maintain that position.

On the fourth evening, the knock came.

She was in the sitting room with a book she had found on the shelves — a novel about a woman who inherits an orchard and does not know what to do with it, which felt pointed in a way that could not be intentional — when she heard it: two knocks, unhurried. Not aggressive. Not apologetic either. Just present.

She opened the door.

The man from the garden was taller than she had estimated and older than she had somehow expected — her age, perhaps a few years beyond it. He was holding a dish covered with foil.

"I'm Elliot," he said. "From next door. I brought soup." A pause. "I didn't know what else to bring."

She looked at him. He looked at her. The evening air between them was cool and smelled of the sea.

"That's very kind," she said, and meant it, and stepped back to let him in.`,
      },
    ],
  },
];

export function getStory(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

export function getChapter(storyId: string, number: number): Chapter | undefined {
  const story = getStory(storyId);
  return story?.chapters.find((c) => c.number === number);
}
