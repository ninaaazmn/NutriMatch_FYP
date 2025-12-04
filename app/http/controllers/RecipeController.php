<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;

class RecipeController extends Controller
{
    public function toggleSave(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $recipeId = $request->recipe_id;

        $user->savedRecipes()->toggle($recipeId);

        return back();
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        $recipes = Recipe::where('recipe_name', 'like', "%{$query}%")
            ->orWhere('ingredients', 'like', "%{$query}%")
            ->get();

        return response()->json($recipes);
    }
}
