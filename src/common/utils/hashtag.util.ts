export function extractHashtags(text?: string | null): string[] {
  if (!text) return [];
  // Match # followed by word characters (letters, digits, underscores)
  const regex = /#[\w]+/g;
  const matches = text.match(regex);
  if (!matches) return [];
  
  // Convert to lowercase and remove the '#' prefix
  const tags = matches.map((tag) => tag.toLowerCase().replace('#', ''));
  // Remove duplicates and empty strings
  return [...new Set(tags)].filter(Boolean);
}

export function mergeHashtags(extracted: string[], provided?: string[] | null): string[] {
  const allTags = [...extracted];
  
  if (provided && Array.isArray(provided)) {
    // Normalize provided tags: strip '#' if present, lowercase
    const normalizedProvided = provided.map(tag => 
      tag.toLowerCase().replace(/^#/, '')
    );
    allTags.push(...normalizedProvided);
  }
  
  // Return unique tags
  return [...new Set(allTags)].filter(Boolean);
}
