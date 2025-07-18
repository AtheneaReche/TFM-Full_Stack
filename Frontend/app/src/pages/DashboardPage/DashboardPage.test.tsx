import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserDataProvider } from '../../contexts/UserDataProvider';
import DashboardPage from './DashboardPage';
import { describe, it, expect, beforeEach } from 'vitest';

const renderComponent = () => {
  render(
    <MemoryRouter>
      <UserDataProvider>
        <DashboardPage />
      </UserDataProvider>
    </MemoryRouter>
  );
};

describe('DashboardPage', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mock-test-token');
  });

  it('should display the fetched books after the loading state', async () => {
    renderComponent();

    const favBookTitle = await screen.findByText('Favorite Book 1');
    const readingBookTitle = await screen.findByText('Reading Book 1');
    const finishedBookTitle = await screen.findByText('Finished Book 1');

    expect(favBookTitle).toBeInTheDocument();
    expect(readingBookTitle).toBeInTheDocument();
    expect(finishedBookTitle).toBeInTheDocument();

    expect(screen.getByText(/Favorites \(1\)/)).toBeInTheDocument();
    expect(screen.getByText(/Read \(1\)/)).toBeInTheDocument();
  });
});

