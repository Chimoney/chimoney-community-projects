import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('px-4 py-2', 'bg-blue-500');
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('handles conflicting Tailwind classes', () => {
    const result = cn('px-4', 'px-8');
    expect(result).toBe('px-8');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class active-class');
  });

  it('filters out falsy values', () => {
    const result = cn('valid', false, null, undefined, 'also-valid');
    expect(result).toBe('valid also-valid');
  });
});
