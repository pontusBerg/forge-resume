import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CoverLetterPlateEditor } from '@/components/cover-letter/plate/CoverLetterPlateEditor';

describe('CoverLetterPlateEditor', () => {
  it('renders the cover letter editor', () => {
    render(<CoverLetterPlateEditor bodyState="" onBodyStateChange={vi.fn()} />);

    expect(screen.getByLabelText('Cover letter')).toBeInTheDocument();
  });
});
