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
                    <div class="w-full flex justify-between">
                        <h3 class="text-xl font-bold text-indigo-800">Wallet</h3>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between space-x-4 mt-2">
                        @foreach ($wallets as $wallet)
                            <div
                                class="rounded-lg shadow-lg p-3 space-y-4 {{ $wallet->type == 'chi' ? 'order-first' : '' }} ">
                                <h4 class="font-bold text-lg">{{ $wallet_type[$wallet->type] }}</h4>
                                <p class="text-lg">${{ $wallet->balance }}</p>
                                @if ($wallet->type == 'chi')
                                    <div>
                                        <a href="{{ route('user.account.send-money-form') }}"
                                            class="bg-purple-600 hover:bg-purple-700 text-white font-bold p-2 px-3 rounded-full">Send
                                            Money</a>
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
