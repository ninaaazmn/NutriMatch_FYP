<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();

            $table->string('recipe_name');
            $table->text('ingredients'); // list of ingredients
            $table->string('category')->nullable(); // Breakfast, Keto, etc.
            $table->integer('nutrition_calories')->nullable();
            $table->string('diet_type')->nullable(); // High-Protein, Keto, etc.
            $table->text('instructions');
            $table->string('image_url')->nullable(); // path to image

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
