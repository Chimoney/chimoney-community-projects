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

        <form method="POST" wire:submit.prevent="submit()" autocomplete="off">
            @csrf
            <!-- Select a country -->
            <div class="mt-4">
                <x-input-label for="country" :value="__('Country')" />
                <select wire:model.lazy="country" name="country" class="block mt-1 w-full" required autofocus>
                    <option>-- Select a country --</option>
                    @foreach ($countries as $airtime_country)
                        <option value="{{ $airtime_country }}">{{ $airtime_country }}</option>
                    @endforeach
                </select>
                <x-input-error :messages="$errors->get('country')" class="mt-2" />
            </div>
            @if ($country)
                <!-- Phone number -->
                <div class="mt-4">
                    <x-input-label for="phone" :value="__('Phone number')" />

                    <input wire:model.lazy="phone" type="tel" id="phone" class="block mt-1 w-full"
                        name="phone" value="{{ old('phone') }}" required placeholder="+12388888888" />

                    <x-input-error :messages="$errors->get('phone')" class="mt-2" />
                </div>

                <!-- Amount in USD -->
                <div class="mt-4">
                    <x-input-label for="amount" :value="__('Amount (in USD)')" />

                    <input wire:model="amount" type="number" id="amount" class="block mt-1 w-full" name="amount"
                        value="{{ old('amount') }}" required />

                    <x-input-error :messages="$errors->get('amount')" class="mt-2" />
                </div>
            @endif

            <div wire:loading.remove wire:target="submit" class="flex items-center justify-end mt-4">
                <a class="justify-self-end underline text-sm text-gray-600 hover:text-gray-900"
                    href="{{ route('payment.payout.history') }}">
                    {{ __('Go back') }}
                </a>

                @if ($balance && $country && $amount)
                    <x-primary-button wire:loading.attr="disabled" class="ml-4">
                        {{ __('Send') }}
                    </x-primary-button>
                @endif
            </div>
            <div wire:loading wire:target="submit" class="flex justify-end mt-4 font-bold text-green-600">
                <span class="justify-self-end text-sm">
                    Processing Payment...
                </span>
            </div>
        </form>
    </div>
</div>
