import { TransferForm } from '@/components/TransferForm';
import { TransactionHistory } from '@/components/TransactionHistory';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Chimoney Wallet Transfer
          </h1>
          <p className="text-muted-foreground text-lg">
            Send money instantly using Interledger payment pointers
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <TransferForm />
          <TransactionHistory />
        </div>
      </div>
    </main>
  );
}
