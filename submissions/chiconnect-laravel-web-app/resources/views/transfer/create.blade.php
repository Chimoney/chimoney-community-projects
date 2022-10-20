<x-app-layout>
    <div class="min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div class="w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <div class="w-full items-center flex justify-between mb-5">
                <div class="justify-self-start">
                    @if (!$balance)
                        <p class="font-bold text-red-500">Insufficient funds !!!</p>
                    @endif
                </div>
                <div class="justify-self-end font-semibold text-base tracking-wide text-slate-500">Balance:
                    ${{ number_format($balance ?? 0, 2) }}</div>
            </div>

            <!-- Session Status -->
            <div class="my-2">
                @if ($status = session('status'))
                    <div class='font-bold text-base text-green-600'>
                        {{ $status }}
                    </div>
                @endif
            </div>

            <!-- Error -->
            <div class="my-2">
                @if ($error = session('error'))
                    <div class='font-bold text-base text-red-600'>
                        {{ $error }}
                    </div>
                @endif
            </div>

            <form method="POST" action="{{ route('payment.transfer.process') }}" autocomplete="off">
                @csrf
                <!-- Receiver -->
                <livewire:styles />
                <livewire:username />
                <livewire:scripts />

                <!-- Amount -->
                <div>
                    <x-input-label for="amount" :value="__('Amount')" />

                    <input type="number" id="amount" class="block mt-1 w-full" name="amount"
                        value="{{ old('amount') }}" min="1"
                        @if ($balance) max="{{ $balance }}" @endif required autofocus />

                    <x-input-error :messages="$errors->get('name')" class="mt-2" />
                </div>

                <div class="flex items-center justify-end mt-4">
                    <a class="justify-self-end underline text-sm text-gray-600 hover:text-gray-900"
                        href="{{ route('dashboard') }}">
                        {{ __('Go back') }}
                    </a>

                    @if ($balance)
                        <x-primary-button class="ml-4">
                            {{ __('Send') }}
                        </x-primary-button>
                    @endif
                </div>
            </form>
        </div>
    </div>
</x-app-layout>
