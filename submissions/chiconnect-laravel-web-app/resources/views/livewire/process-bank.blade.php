<div class="min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
    <div class="w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <div class="w-full items-center flex justify-end mb-5">
            <div class="justify-self-end font-semibold text-base tracking-wide text-slate-500">Balance:
                <span
                    class="{{ !$balance ? 'text-red-500' : 'text-green-700' }}">${{ number_format($balance ?? 0, 2) }}</span>
            </div>
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

        <form method="POST" wire:submit.prevent="submit()" autocomplete="off" wire:loading.attr="disable">
            @csrf
            <!-- Select a country -->
            <div class="mt-4">
                <x-input-label for="country" :value="__('Country')" />
                <select wire:loading.attr="disabled" wire:model="country" name="country" class="block mt-1 w-full"
                    required autofocus>
                    <option>-- Select a country --</option>
                    @foreach ($countries as $code => $name)
                        <option value="{{ $code }}">{{ $name }}</option>
                    @endforeach
                </select>
                <p wire:loading wire:target="country" class="my-1 font-bold text-sm text-green-900">Fetching supported
                    banks...</p>
                <x-input-error wire:loading.remove wire:target="country" :messages="$errors->get('country')" class="mt-2" />
            </div>

            @if (count($country_banks))
                <!-- Select a bank -->
                <div class="mt-4">
                    <x-input-label for="Bank" :value="__('Bank')" />
                    <select wire:model="bank" name="bank" class="block mt-1 w-full" required autofocus>
                        <option>-- Select a bank --</option>
                        @foreach ($country_banks as $country_bank)
                            @php $country_bank = (array)$country_bank; @endphp
                            <option value="{{ $country_bank['code'] }}">{{ $country_bank['name'] }}</option>
                        @endforeach
                    </select>
                    <p wire:loading wire:target="bank" class="my-1 font-bold text-sm text-green-900">Processing ...</p>
                    <x-input-error wire:loading.remove wire:target="bank" :messages="$errors->get('bank')" class="mt-2" />
                </div>
            @endif


            @if ($bank)
                <!-- Account Number -->
                <div class="mt-4">
                    <x-input-label for="account" :value="__('Account number')" />
                    <input wire:model.debounce.750ms="account" type="text" id="account" class="block mt-1 w-full"
                        name="account" value="{{ old('account') }}" required placeholder="0234566789" />
                    <p class="my-1 font-bold text-sm text-green-900">{{ $account_holder }}</p>
                    <p wire:loading wire:target="account" class="my-1 font-bold text-sm text-green-900">Verifying
                        account...</p>
                    <x-input-error wire:loading.remove wire:target="account" :messages="$errors->get('account')" class="mt-2" />
                </div>
            @endif

            @if ($account_holder)
                <!-- Amount in USD -->
                <div class="mt-4">
                    <x-input-label for="amount" :value="__('Amount (in USD)')" />
                    <input wire:model="amount" type="number" id="amount" class="block mt-1 w-full" name="amount"
                        value="{{ old('amount') }}" max="{{ $balance }}" required />
                    <x-input-error :messages="$errors->get('amount')" class="mt-2" />
                </div>
            @endif

            <div wire:loading.remove wire:target="submit" class="flex items-center justify-end mt-4">
                <a class="justify-self-end underline text-sm text-gray-600 hover:text-gray-900"
                    href="{{ route('dashboard') }}">
                    {{ __('Cancel') }}
                </a>

                @if ($balance && $country && $amount)
                    <x-primary-button wire:loading.attr="disabled" class="ml-4">
                        {{ __('Send') }}
                    </x-primary-button>
                @endif
            </div>
            <div wire:loading wire:target="submit" class="flex justify-end mt-4 font-bold text-green-600">
                <span class="justify-self-end text-sm">
                    Processing Transfer...
                </span>
            </div>
        </form>
    </div>
</div>
