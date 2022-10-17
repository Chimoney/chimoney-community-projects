<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Users') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="overflow-x-auto">
                        <table class="table table-auto w-full text-center">
                            <thead>
                                <tr class="border-b">
                                    <th class="p-2">#</th>
                                    <th class="p-2">Name</th>
                                    <th class="p-2">Email</th>
                                    <th class="p-2">User ID</th>
                                    <th class="p-2">Sub Account ID</th>
                                    <th class="p-2">Type</th>
                                    <th class="p-2">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($users as $user)
                                    <tr class="hover:bg-gray-200 hover:cursor-pointer"
                                        onclick="document.location = '{{ route('user.profile.show', $user->uuid) }}';">
                                        <td class="p-2">
                                            {{ ($users->currentPage() - 1) * $users->perPage() + $loop->iteration }}
                                        </td>
                                        <td class="p-2">{{ ucwords($user->name) }}</td>
                                        <td class="p-2">{{ $user->email }}</td>
                                        <td class="p-2">{{ $user->uuid }}</td>
                                        <td class="p-2">{{ $user->sub_account_id ?? 'null' }}</td>
                                        <td class="p-2">{{ ucfirst($user->type) }}</td>
                                        <td class="p-2">{{ $user->created_at }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td class="p-2" colspan="6">
                                            <center>No users yet!</center>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                        <div class="my-3">
                            {{ $users->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
