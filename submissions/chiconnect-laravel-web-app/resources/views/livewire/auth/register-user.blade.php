<div class="mt-4">
    <x-input-label for="username" :value="__('Username')" />

    <x-text-input wire:model="username" id="username" class="block mt-1 w-full" type="text" name="username" value="{{$username}}" required autofocus />

    <x-input-error :messages="$errors->get('username')" class="mt-2" />
</div>