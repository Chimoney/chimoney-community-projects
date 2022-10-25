<x-app-layout>
    <div class="min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div class="w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">

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

            <form method="POST" action="{{ route('user.account.top-up') }}">
                @csrf

                <!-- Amount -->
                <div>
                    <x-input-label for="amount" :value="__('Amount')" />

                    <input type="number" id="amount" class="block mt-1 w-full" name="amount"
                        value="{{ old('amount') }}" min="1" required autofocus />

                    <x-input-error :messages="$errors->get('name')" class="mt-2" />
                </div>

                <input type="hidden" name="receiver" value="{{ $user->sub_account_id }}" />

                <div class="flex items-center justify-end mt-4">
                    <a class="underline text-sm text-gray-600 hover:text-gray-900"
                        href="{{ route('user.profile.show', $user->uuid) }}">
                        {{ __('Go back') }}
                    </a>

                    <x-primary-button class="ml-4">
                        {{ __('Top-up') }}
                    </x-primary-button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>
