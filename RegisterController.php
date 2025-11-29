<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController extends Controller
{
   public function store(Request $request)
{
    $data = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:8',
        'gender' => 'nullable|string',
        'weight' => 'nullable|integer',
        'height' => 'nullable|integer',
        'activity_level' => 'nullable|string',
        'primary_goal' => 'nullable|string',
        'diet' => 'nullable|string',
        'preferences' => 'nullable',
        'allergies' => 'nullable',
        'calorie_target' => 'nullable|integer'
    ]);

    // Hash password
    $data['password'] = bcrypt($data['password']);

    // Create user
    \App\Models\User::create($data);

    return redirect('/test-login')->with('success', 'Account created!');
}

}
