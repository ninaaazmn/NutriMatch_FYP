<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }

    public function updatePreferences(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'diet' => ['nullable', 'string'],
            'allergies' => ['nullable', 'array'],
            'cuisine' => ['nullable', 'array'],
        ]);

        $user->diet = $validated['diet'] ?? null;
        $user->allergies = $validated['allergies'] ?? [];
        // Map cuisine to preferences column
        $user->preferences = $validated['cuisine'] ?? [];

        $user->save();

        return back()->with('success', 'Preferences updated successfully.');
    }
}
