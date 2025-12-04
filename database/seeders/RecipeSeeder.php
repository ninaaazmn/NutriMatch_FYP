<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('recipes')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('recipes')->insert([
            [
                'recipe_name' => 'Grilled Chicken Salad',
                'ingredients' => 'chicken breast, lettuce, olive oil, lemon, salt, pepper',
                'category' => 'Healthy',
                'nutrition_calories' => 420,
                'diet_type' => 'High-Protein',
                'instructions' => 'Grill chicken, toss with lettuce and dressing, serve chilled.',
                'image_url' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Avocado Egg Toast',
                'ingredients' => 'bread, avocado, egg, salt, pepper, olive oil',
                'category' => 'Breakfast',
                'nutrition_calories' => 350,
                'diet_type' => 'Balanced',
                'instructions' => 'Toast bread, mash avocado, top with fried egg.',
                'image_url' => 'https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Stir-Fried Veggie Noodles',
                'ingredients' => 'noodles, carrot, broccoli, soy sauce, garlic, sesame oil',
                'category' => 'Asian',
                'nutrition_calories' => 480,
                'diet_type' => 'Vegetarian',
                'instructions' => 'Stir-fry veggies, add noodles and sauce, mix well.',
                'image_url' => 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Keto Beef Bowl',
                'ingredients' => 'minced beef, cauliflower rice, olive oil, garlic, salt, pepper',
                'category' => 'Keto',
                'nutrition_calories' => 520,
                'diet_type' => 'Keto',
                'instructions' => 'Cook beef with seasoning, serve with cauliflower rice.',
                'image_url' => 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Tomato Basil Pasta',
                'ingredients' => 'pasta, tomato, basil, olive oil, garlic, parmesan',
                'category' => 'Italian',
                'nutrition_calories' => 560,
                'diet_type' => 'Vegetarian',
                'instructions' => 'Boil pasta, sauté tomatoes, mix with basil and cheese.',
                'image_url' => 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Chicken Fried Rice',
                'ingredients' => 'rice, chicken, egg, soy sauce, peas, carrots',
                'category' => 'Asian',
                'nutrition_calories' => 590,
                'diet_type' => 'Balanced',
                'instructions' => 'Stir-fry chicken, add rice and veggies, add soy sauce.',
                'image_url' => 'https://images.unsplash.com/photo-1603133872878-684f208fb74b?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Garlic Butter Salmon',
                'ingredients' => 'salmon, garlic, butter, lemon, salt, pepper',
                'category' => 'High-Protein',
                'nutrition_calories' => 460,
                'diet_type' => 'High-Protein',
                'instructions' => 'Pan-sear salmon with garlic butter until crisp.',
                'image_url' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a277d?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Vegetable Omelette',
                'ingredients' => 'egg, tomato, onion, capsicum, spinach, olive oil',
                'category' => 'Breakfast',
                'nutrition_calories' => 300,
                'diet_type' => 'Low-Carb',
                'instructions' => 'Beat eggs, cook with chopped vegetables.',
                'image_url' => 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Banana Oat Smoothie',
                'ingredients' => 'banana, oats, milk, honey, chia seeds',
                'category' => 'Drink',
                'nutrition_calories' => 280,
                'diet_type' => 'Balanced',
                'instructions' => 'Blend all ingredients until smooth.',
                'image_url' => 'https://images.unsplash.com/photo-1553530666-ba11a90654f3?auto=format&fit=crop&w=800&q=80'
            ],
            [
                'recipe_name' => 'Spicy Tuna Bowl',
                'ingredients' => 'tuna, rice, cucumber, soy sauce, sriracha, mayo, sesame',
                'category' => 'High-Protein',
                'nutrition_calories' => 510,
                'diet_type' => 'High-Protein',
                'instructions' => 'Mix tuna with sauce, serve over rice with veggies.',
                'image_url' => 'https://images.unsplash.com/photo-1542355727-1f63d599a86e?auto=format&fit=crop&w=800&q=80'
            ]
        ]);
    }
}
