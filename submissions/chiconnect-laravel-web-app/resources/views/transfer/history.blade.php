<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Transfers
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="w-full flex justify-end mb-5">
                        <a href="{{ route('payment.transfer.create') }}"
                            class="text-center hover:bg-purple-600 bg-purple-700 text-white font-bold p-1 px-3 rounded-lg">New transfer</a>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="table table-auto w-full text-center">
                            <thead>
                                <tr class="border-b">
                                    <th class="p-2">#</th>
                                    <th class="p-2">Transaction ID</th>
                                    <th class="p-2">Amount ($)</th>
                                    <th class="p-2">From</th>
                                    <th class="p-2">To</th>
                                    <th class="p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($transfers as $transfer)
                                    <tr class="hover:bg-gray-200 hover:cursor-pointer">
                                        <td class="p-2">
                                            {{ ($transfers->currentPage() - 1) * $transfers->perPage() + $loop->iteration }}
                                        </td>
                                        <td class="p-2">{{ $transfer->tnxID }}</td>
                                        <td class="p-2">{{ number_format($transfer->amount ?? 0, 2) }}</td>
                                        <td class="p-2">
                                            @php
                                                $from = $transfer->from->username ?? 'unknown';
                                                echo $from == auth()->user()->username ? 'me' : $from;
                                            @endphp
                                        </td>
                                        <td class="p-2">
                                            @php
                                                $from = $transfer->to->username ?? 'unknown';
                                                echo $from == auth()->user()->username ? 'me' : $from;
                                            @endphp
                                        </td>
                                        <td class="p-2">{{ $transfer->created_at }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td class="p-2" colspan="6">
                                            <center>No transfers yet!</center>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                        <div class="my-3">
                            {{ $transfers->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
