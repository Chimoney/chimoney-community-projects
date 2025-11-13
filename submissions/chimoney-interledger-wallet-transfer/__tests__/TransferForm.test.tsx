import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TransferForm } from '@/components/TransferForm';

// Create a wrapper for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('TransferForm', () => {
  it('renders transfer form with all fields', () => {
    render(<TransferForm />, { wrapper: createWrapper() });

    expect(screen.getByLabelText(/recipient wallet address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send money/i })).toBeInTheDocument();
  });

  it('shows validation message for wallet address format', () => {
    render(<TransferForm />, { wrapper: createWrapper() });

    const helpText = screen.getByText(/enter a valid interledger payment pointer/i);
    expect(helpText).toBeInTheDocument();
  });

  it('enables submit button when form is filled correctly', async () => {
    const user = userEvent.setup();
    render(<TransferForm />, { wrapper: createWrapper() });

    const walletInput = screen.getByLabelText(/recipient wallet address/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const submitButton = screen.getByRole('button', { name: /send money/i });

    // Initially, button should be disabled if fields are empty
    await user.clear(walletInput);
    await user.clear(amountInput);

    // Fill in the form
    await user.type(walletInput, '$ilp.example.wallet/test');
    await user.type(amountInput, '50');

    // Button should be enabled
    expect(submitButton).not.toBeDisabled();
  });

  it('shows confirmation dialog when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TransferForm />, { wrapper: createWrapper() });

    const walletInput = screen.getByLabelText(/recipient wallet address/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const submitButton = screen.getByRole('button', { name: /send money/i });

    await user.type(walletInput, '$ilp.example.wallet/test');
    await user.type(amountInput, '50');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/confirm transfer/i)).toBeInTheDocument();
    });
  });
});
