import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/transfer/route';
import { NextRequest } from 'next/server';

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    isAxiosError: vi.fn(),
  },
}));

describe('Transfer API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns error when API key is not configured', async () => {
    const originalEnv = process.env.CHIMONEY_API_KEY;
    delete process.env.CHIMONEY_API_KEY;

    const request = new NextRequest('http://localhost:3000/api/transfer', {
      method: 'POST',
      body: JSON.stringify({
        recipientWalletAddress: '$ilp.example.wallet/test',
        amount: 50,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toContain('CHIMONEY_API_KEY');

    process.env.CHIMONEY_API_KEY = originalEnv;
  });

  it('validates required fields', async () => {
    process.env.CHIMONEY_API_KEY = 'test-api-key';

    const request = new NextRequest('http://localhost:3000/api/transfer', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('required');
  });

  it('validates amount is greater than 0', async () => {
    process.env.CHIMONEY_API_KEY = 'test-api-key';

    const request = new NextRequest('http://localhost:3000/api/transfer', {
      method: 'POST',
      body: JSON.stringify({
        recipientWalletAddress: '$ilp.example.wallet/test',
        amount: -10,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('greater than 0');
  });

  it('validates wallet address format', async () => {
    process.env.CHIMONEY_API_KEY = 'test-api-key';

    const request = new NextRequest('http://localhost:3000/api/transfer', {
      method: 'POST',
      body: JSON.stringify({
        recipientWalletAddress: 'invalid-address',
        amount: 50,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('payment pointer');
  });
});
