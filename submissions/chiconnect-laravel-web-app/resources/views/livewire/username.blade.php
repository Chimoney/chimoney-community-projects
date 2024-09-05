<div class="mb-4">
    <x-input-label for="username" :value="__('Username')" />

    <input wire:model.debounce.200ms="search" type="text" class="block mt-1 w-full" name="search" required autofocus
        placeholder="search username" value="{{ $search }}" />
    <div class="block mt-1 w-full max-h-32 bg-gray-100 overflow-y-auto">
        @forelse ($users as $user)
            <button wire:click="selectUser('{{ $user->username }}')" type="button"
                class="hover:bg-indigo-400 hover:text-white block my-1 w-full">{{ $user->username }}</button>
        @empty
            @if ($search && !$username)
                <center class="bg-white">No user found</center>
            @endif
        @endforelse
    </div>

    <x-input-error :messages="$errors->get('username')" class="mt-2" />
    <input type="hidden" name="username" value="{{ $username }}" />
</div>
