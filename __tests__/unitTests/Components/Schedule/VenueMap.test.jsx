// __tests__/Components/Schedule/VenueMap.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { VenueMap } from '../../../../src/Components/Schedule/VenueMap';


describe('VenueMap Component', () => {
  const testMapLink = 'https://www.google.com/maps/embed?pb=test-map-link';

  it('test-id: 34,renders the Venue Map heading', () => {
    render(<VenueMap link={testMapLink} />);
    expect(screen.getByText(/venue map/i)).toBeInTheDocument();
  });

  it('test-id: 35,renders the iframe with the correct src', () => {
    render(<VenueMap link={testMapLink} />);
    const iframe = screen.getByTitle(/conference venue map/i);
    expect(iframe).toBeInTheDocument();
  });

  it('test-id: 36,applies correct iframe styles and attributes', () => {
    render(<VenueMap link={testMapLink} />);
    const iframe = screen.getByTitle(/conference venue map/i);

    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '800');
    expect(iframe.hasAttribute('allowfullscreen')).toBe(false);

    expect(iframe).toHaveAttribute('loading', 'lazy');

    expect(iframe.style.position).toBe('absolute');
    expect(iframe.style.top).toBe('0px');
    expect(iframe.style.left).toBe('0px');
  });
});
