import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateNote from '../components/CreateNote';
import { MemoryRouter } from 'react-router-dom';

// Mockear axios
jest.mock('axios');

const mockUsers = [{ username: 'TestUser' }];
const mockNote = {
  title: 'Test Note',
  content: 'Test content',
  date: new Date().toISOString(),
  author: 'TestUser'
};

// Mock de router (simulación de parámetro id)
const mockRouter = {
  params: {}
};

jest.mock('../utils/withRouter', () => ({
  withRouter: (Component) => (props) => <Component {...props} router={mockRouter} />
}));

describe('CreateNote Component', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === '/api/users') return Promise.resolve({ data: mockUsers });
      if (url.startsWith('/api/notes/')) return Promise.resolve({ data: mockNote });
    });

    axios.post.mockResolvedValue({});
    axios.put.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza correctamente el formulario', async () => {
    render(
      <MemoryRouter>
        <CreateNote />
      </MemoryRouter>
    );

    // Esperar a que se cargue el select de usuarios
    await waitFor(() => screen.getByDisplayValue('TestUser'));

    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('Envía el formulario correctamente', async () => {
    render(
      <MemoryRouter>
        <CreateNote />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByDisplayValue('TestUser'));

    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'New Note' },
    });
    fireEvent.change(screen.getByPlaceholderText('Content'), {
      target: { value: 'Some content' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/notes', expect.objectContaining({
        title: 'New Note',
        content: 'Some content',
        author: 'TestUser'
      }));
    });
  });
});
