<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RegisterController;
use App\Models\Recipe;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/test-dashboard', function () {
    return Inertia::render('testDashboard');
});

Route::get('/test-home', function () {
    return Inertia::render('testHome');
});

Route::get('/test-login', function () {
    return Inertia::render('testLogin');
});

Route::get('/test-profile', function () {
    $user = auth()->user();
    
    if (!$user) {
        return redirect('/test-login');
    }

    // Ensure preferences/cuisine is mapped correctly for the frontend if needed, 
    // but since we cast it in model, $user->preferences should be an array.
    // We might need to map 'preferences' to 'cuisine' in the response if the frontend expects 'cuisine'.
    // Let's modify the response to include 'cuisine' alias for 'preferences'
    $userData = $user->toArray();
    $userData['cuisine'] = $user->preferences; 
    
    return Inertia::render('testProfile', [
        'user' => $userData
    ]);
});

Route::post('/test-profile/update', [ProfileController::class, 'update'])->name('profile.update');
Route::post('/test-profile/preferences', [ProfileController::class, 'updatePreferences'])->name('profile.preferences.update');

Route::get('/test-register', function () {
    return Inertia::render('testRegister');

    
});



Route::get('/search', function () {
    $q = request('q');

    return DB::table('recipes')
    ->where('title', 'LIKE', "%$q%")
    ->orWhere('tags', 'LIKE', "%$q%")
    ->get();


    return response()->json($recipes);
});
Route::get('/search-suggest', function () {
    $q = request('q');

    return DB::table('recipes')
        ->where('title', 'LIKE', "%$q%")
        ->limit(5)
        ->pluck('title'); // return only list of titles
});

Route::get('/recipes', function () {
return Recipe::limit(20)->get();});




Route::get('/recommended', function () {
    return DB::table('recipes')
        ->inRandomOrder()
        ->limit(3)
        ->get();
});



Route::post('/register-save', [RegisterController::class, 'store']);



Route::post('/login-check', [LoginController::class, 'login']);

Route::post('/login-process', [LoginController::class, 'authenticate'])->name('login.process');

require __DIR__.'/settings.php';
