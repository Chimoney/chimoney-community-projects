<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Payouts
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="w-full flex justify-end mb-5 relative">
                        <div class="flex justify-center">
                            <div class="dropdown relative">
                                <button
                                    class="text-center hover:bg-purple-600 bg-purple-700 text-white font-bold p-1 px-3 rounded-lg"
                                    onclick="toggle_payout_menu()">New
                                    payout</button>
                                <ul id="payout-menu"
                                    class="hidden absolute text-base z-50 py-2 list-none rounded-lg border mt-1 m-0 w-full text-center bg-white">
                                    <li>
                                        <a class="dropdown-item text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            href="{{ route('payment.payout.airtime.create') }}">Airtime</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            href="{{ route('payment.payout.bank.create') }}">Bank</a>
                                    </li>
                                </ul>
                            </div>
                            <script>
                                function toggle_payout_menu() {
                                    let payout_menu = document.getElementById('payout-menu');
                                    if (payout_menu.classList.contains('hidden')) {
                                        payout_menu.classList.remove('hidden');
                                    } else {
                                        payout_menu.classList.add('hidden');
                                    }
                                }
                            </script>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="table table-auto w-full text-center">
                            <thead>
                                <tr class="border-b">
                                    <th class="p-2">#</th>
                                    <th class="p-2">Transaction ID</th>
                                    <th class="p-2">Type</th>
                                    <th class="p-2">Amount</th>
                                    <th class="p-2">Recipient</th>
                                    <th class="p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($payouts as $payout)
                                    <tr class="hover:bg-gray-200 hover:cursor-pointer">
                                        <td class="p-2">
                                            {{ ($payouts->currentPage() - 1) * $payouts->perPage() + $loop->iteration }}
                                        </td>
                                        <td class="p-2">{{ $payout->chiRef }}</td>
                                        <td class="p-2">{{ $payout->type }}</td>
                                        <td class="p-2">{{ number_format($payout->amount ?? 0, 2) }}</td>
                                        <td class="p-2">{{ $payout->recipient }}</td>
                                        <td class="p-2">{{ $payout->created_at }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td class="p-2" colspan="6">
                                            <center>No payouts initiated !</center>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                        <div class="my-3">
                            {{ $payouts->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
