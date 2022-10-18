<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Transactions ({{ $wallet }})
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="overflow-x-auto">
                        <table class="table table-auto w-full text-center">
                            <thead>
                                <tr class="border-b">
                                    <th class="p-2">#</th>
                                    <th class="p-2">Transaction ID</th>
                                    <th class="p-2">Amount ($)</th>
                                    <th class="p-2">Receiver</th>
                                    <th class="p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($transactions as $transaction)
                                    <tr class="hover:bg-gray-200 hover:cursor-pointer">
                                        <td class="p-2">
                                            {{ ($transactions->currentPage() - 1) * $transactions->perPage() + $loop->iteration }}
                                        </td>
                                        <td class="p-2">{{ $transaction->tnxID }}</td>
                                        <td class="p-2">{{ number_format($transaction->amount ?? 0, 2) }}</td>
                                        <td class="p-2">{{ $transaction->recipient->username }}</td>
                                        <td class="p-2">{{ $transaction->created_at }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td class="p-2" colspan="5">
                                            <center>No transactions yet!</center>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                        <div class="my-3">
                            {{ $transactions->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
