import { render, screen, waitFor } from '@testing-library/react';
import FetchComponent from './FetchComponent';
// import axios from 'axios';
// import FetchComponent from './FetchComponent';
// import { fetchData } from './api';

// Mock API call (e.g., with Jest)
jest.mock('../src/api', () => ({
  fetchData: () => Promise.resolve('Data loaded'),
}));

test('loads data correctly', async () => {
  render(<FetchComponent />);
  // See what's actually rendered
  screen.debug();
  
  // Or log the mock calls
  // console.log(axios.get.mock.calls);
  // Wait for async data to load http://localhost:5000/api
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
  
  // Alternative: findByText (auto-waits)
  expect(await screen.findByText('Data loaded')).toBeInTheDocument();
});