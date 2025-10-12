import 'dotenv/config';
import { createChimoneyClient } from '../index';

async function main() {
  const apiKey = process.env.CHIMONEY_API_KEY;
  if (!apiKey) {
    throw new Error('Set CHIMONEY_API_KEY in a .env file or environment variable');
  }

  const chimoney = createChimoneyClient({ apiKey, sandbox: true });

  console.log('=== Chimoney TypeScript SDK Examples ===\n');

  try {
    // 1. Info Module Examples
    console.log('1. Getting available assets...');
    const assets = await chimoney.info.assets();
    console.log('Assets:', assets.status, 'Count:', assets.data?.length || 0);

    console.log('\n2. Getting supported countries for airtime...');
    const countries = await chimoney.info.airtimeCountries();
    console.log('Countries:', countries.status, 'Count:', countries.data?.length || 0);

    console.log('\n3. Getting banks in Nigeria...');
    const banks = await chimoney.info.banks('NG');
    console.log('Banks:', banks.status, 'Count:', banks.data?.length || 0);

    console.log('\n4. Converting USD to local currency...');
    const conversion = await chimoney.info.usdInLocalAmount({ destinationCurrency: 'NGN', amountInUSD: 10 });
    console.log('Conversion:', conversion.status, 'Amount:', conversion.data?.amountInDestinationCurrency);

    // 2. Wallet Module Examples
    console.log('\n5. Getting wallet list...');
    const wallets = await chimoney.wallet.list();
    console.log('Wallets:', wallets.status, 'Count:', wallets.data?.length || 0);

    // 3. Account Module Examples
    console.log('\n6. Getting all transactions...');
    const transactions = await chimoney.account.getAllTransactions();
    console.log('Transactions:', transactions.status, 'Count:', transactions.data?.length || 0);

    // 4. SubAccount Module Examples
    console.log('\n7. Getting all sub-accounts...');
    const subAccounts = await chimoney.subAccount.getAll();
    console.log('Sub-accounts:', subAccounts.status, 'Count:', subAccounts.data?.length || 0);

    console.log('\n=== All examples completed successfully! ===');
    console.log('\nNote: Some operations may require specific permissions or data to exist.');
    console.log('For payout operations, you would use:');
    console.log('- chimoney.payouts.airtime([{ countryToSend: "Nigeria", phoneNumber: "+234...", valueInUSD: 3 }])');
    console.log('- chimoney.payouts.chimoney([{ valueInUSD: 5, email: "user@example.com" }])');
    console.log('- chimoney.payouts.bank([{ countryToSend: "Nigeria", account_bank: "044", account_number: "...", valueInUSD: 10 }])');

  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
