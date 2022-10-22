<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="w-full flex justify-end space-x-1">
                        <a href="{{ route('payment.payout.history') }}"
                            class="text-center hover:bg-slate-600 bg-slate-700 text-white font-bold p-1 px-2 rounded-lg">Payouts</a>
                        <a href="{{ route('payment.transfer.history') }}"
                            class="text-center hover:bg-slate-600 bg-slate-700 text-white font-bold p-1 px-2 rounded-lg">Transfers</a>
                    </div>
                    <div class="mt-4 w-full flex justify-center">
                        <div
                            class="mx-auto w-full sm:w-1/2 lg:w-1/3 mt-4 rounded-lg shadow-lg px-2 py-4 space-y-6 text-center">
                            <h4 class="font-bold text-lg">Balance</h4>
                            <p class="text-3xl text-slate-600">${{ number_format($balance ?? 0, 2) }}</p>
                            <div class="w-full flex space-x-3 sm:space-x-4 md:space-x-5 lg:space-x-7 justify-center">
                                <div>
                                    <a href="{{ route('payment.transfer.create') }}"
                                        class="flex text-center hover:bg-purple-600 bg-purple-700 text-white font-bold p-1 px-2 rounded-lg">Send
                                        Money</a>
                                </div>
                                <div class="dropdown relative">
                                    <button
                                        class="text-center hover:bg-purple-600 bg-purple-700 text-white font-bold p-1 px-3 rounded-lg"
                                        onclick="toggle_payout_menu()">New
                                        payout</button>
                                    <ul id="payout-menu"
                                        class="hidden absolute bottom-8 text-base z-auto py-2 list-none rounded-lg border mt-1 m-0 w-full text-center bg-white">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
