<div class="mb-4">
    <x-input-label for="username" :value="__('Username')" />

    <input wire:model="search" type="text" class="block mt-1 w-full" name="search" required autofocus
        placeholder="search username" value="{{ $search }}" />
    <div class="block mt-1 w-full max-h-48 overflow-y-auto">
        @foreach ($users as $user)
            <button wire:click="selectUser('{{ $user->username }}')" type="button"
                class="hover:bg-gray-300 block my-1 w-full">{{ $user->username }}</button>
        @endforeach
    </div>

    <x-input-error :messages="$errors->get('username')" class="mt-2" />
    <input type="hidden" name="username" value="{{ $username }}" />
</div>
