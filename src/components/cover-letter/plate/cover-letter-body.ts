import type { Value } from 'platejs';

export function parseCoverLetterBodyState(bodyState: string): Value | undefined {
  if (!bodyState.trim()) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(bodyState);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as Value;
    }

    return undefined;
  } catch {
    return undefined;
  }
}
