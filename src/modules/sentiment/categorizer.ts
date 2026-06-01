/**
 * Facebook-like Content Categorization mock
 * In a production system, this would be an ML model.
 * Here we use a keyword-based heuristic to assign topics.
 */

const CATEGORY_MAP: Record<string, string[]> = {
  Sports: [
    'game',
    'score',
    'team',
    'play',
    'goal',
    'football',
    'soccer',
    'basketball',
    'tennis',
    'match',
    'player',
    'athlete',
    'win',
    'lose',
    'championship',
  ],
  Technology: [
    'code',
    'tech',
    'software',
    'hardware',
    'programming',
    'developer',
    'startup',
    'innovation',
    'app',
    'web',
    'ai',
    'computer',
    'data',
    'cloud',
    'blockchain',
    'algorithm',
  ],
  Comedy: [
    'laugh',
    'joke',
    'funny',
    'hilarious',
    'humor',
    'comedy',
    'lol',
    'lmao',
    'rofl',
    'meme',
    'prank',
  ],
  News: [
    'news',
    'breaking',
    'update',
    'world',
    'local',
    'report',
    'journalist',
    'article',
    'headline',
    'politics',
    'economy',
  ],
  Gaming: [
    'esports',
    'twitch',
    'stream',
    'gamer',
    'console',
    'xbox',
    'playstation',
    'nintendo',
    'pc',
    'rpg',
    'fps',
    'mmo',
    'gameplay',
    'gaming',
  ],
  Music: [
    'song',
    'album',
    'artist',
    'concert',
    'band',
    'guitar',
    'piano',
    'vocals',
    'track',
    'playlist',
    'rap',
    'pop',
    'rock',
    'jazz',
  ],
  Education: [
    'learn',
    'study',
    'school',
    'college',
    'university',
    'student',
    'teacher',
    'class',
    'course',
    'degree',
    'book',
    'read',
  ],
  Food: [
    'recipe',
    'cook',
    'chef',
    'restaurant',
    'delicious',
    'tasty',
    'meal',
    'dinner',
    'lunch',
    'breakfast',
    'snack',
    'dessert',
  ],
  Travel: [
    'trip',
    'vacation',
    'journey',
    'flight',
    'hotel',
    'resort',
    'beach',
    'mountain',
    'explore',
    'adventure',
    'tourist',
    'destination',
  ],
};

export function extractCategories(text: string): string[] {
  if (!text) return [];

  const normalizedText = text.toLowerCase();
  const foundCategories = new Set<string>();

  for (const [category, keywords] of Object.entries(CATEGORY_MAP)) {
    for (const keyword of keywords) {
      // Basic word boundary check
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(normalizedText)) {
        foundCategories.add(category);
        break; // Once we know it matches this category, move to the next category
      }
    }
  }

  return Array.from(foundCategories);
}
