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
        try {
            \Illuminate\Support\Facades\Log::info('Preference update request:', $request->all());

            $user = auth()->user();
            if (!$user) {
                \Illuminate\Support\Facades\Log::error('User not found in updatePreferences');
                return back()->withErrors(['msg' => 'User not authenticated']);
            }

            // Handle string-encoded JSON if present (fix for "tak bolehh" issue)
            $input = $request->all();
            if ($request->has('allergies') && is_string($request->input('allergies'))) {
                $decoded = json_decode($request->input('allergies'), true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $input['allergies'] = $decoded;
                }
            }
            if ($request->has('cuisine') && is_string($request->input('cuisine'))) {
                $decoded = json_decode($request->input('cuisine'), true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $input['cuisine'] = $decoded;
                }
            }
            $request->replace($input);

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

            \Illuminate\Support\Facades\Log::info('Preferences saved successfully');

            return back()->with('success', 'Preferences updated successfully.');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Preference update failed: ' . $e->getMessage());
            return back()->withErrors(['msg' => 'Update failed: ' . $e->getMessage()]);
        }
    }

    public function updatePhoto(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Photo upload request received');

        $request->validate([
            'photo' => ['required', 'image', 'max:5120'], // 5MB Max
        ]);

        $user = auth()->user();

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('profile-photos', 'public');
            $user->profile_photo_path = $path;
            $user->save();
            \Illuminate\Support\Facades\Log::info('Photo uploaded successfully: ' . $path);
        } else {
            \Illuminate\Support\Facades\Log::error('No photo file found in request');
        }

        return back()->with('success', 'Profile photo updated successfully.');
    }
}
