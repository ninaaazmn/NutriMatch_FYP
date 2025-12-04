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
    return Inertia::render('testHome');
})->name('home');



Route::get('/test-dashboard', function () {
    $user = auth()->user();
    $savedRecipes = $user ? $user->savedRecipes()->get() : [];
    return Inertia::render('testDashboard', [
        'savedRecipes' => $savedRecipes,
        'user' => $user
    ]);
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
    
    \Illuminate\Support\Facades\Log::info('Web.php test-profile data:', [
        'preferences_type' => gettype($user->preferences),
        'preferences_value' => $user->preferences,
        'cuisine_in_userData' => $userData['cuisine']
    ]); 
    
    $savedRecipes = $user->savedRecipes()->orderByPivot('created_at', 'desc')->get();

    return Inertia::render('testProfile', [
        'user' => $userData,
        'savedRecipes' => $savedRecipes
    ]);
});

Route::post('/test-profile/update', [ProfileController::class, 'update'])->name('profile.update');
Route::post('/test-profile/preferences', [ProfileController::class, 'updatePreferences'])->name('profile.preferences.update');
Route::post('/user/profile-photo', [ProfileController::class, 'updatePhoto'])->name('user.profile-photo.update');
Route::post('/recipes/toggle-save', [RecipeController::class, 'toggleSave'])->name('recipes.toggle-save');

Route::get('/test-register', function () {
    return Inertia::render('testRegister');

    
});



Route::get('/search', [RecipeController::class, 'search'])->name('recipes.search');
Route::get('/search-suggest', function () {
    $q = request('q');

    return DB::table('recipes')
        ->where('recipe_name', 'LIKE', "%$q%")
        ->limit(5)
        ->select('recipe_name', 'image_url')
        ->get();
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
