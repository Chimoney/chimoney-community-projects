<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Users') }} <small> > {{$user->name}}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <ul>
                        <li class="text-base font-bold p-2">Name: <span class="text-gray-600">{{$user->name}}</span></li>
                        <li class="text-base font-bold p-2">ID: <span class="text-gray-600">{{$user->uuid}}</span></li>
                        <li class="text-base font-bold p-2">Email: <span class="text-gray-600">{{$user->email}}</span></li>
                        <li class="text-base font-bold p-2">Sub Account: <span class="text-gray-600">{{$user->sub_account_id}}</span></li>
                        <li class="text-base font-bold p-2">Account Type: <span class="text-gray-600">{{$user->type}}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
