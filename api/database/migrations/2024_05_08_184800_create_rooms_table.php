<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('price');
            $table->unsignedInteger('square');
            $table->unsignedInteger('sleeping_places');
            $table->boolean('conditioner');
            $table->boolean('wi_fi');
            $table->json('amenities');
            $table->unsignedBigInteger('room_type_id');
            $table->unsignedInteger('room_number');
            $table->unsignedInteger('floor_number');
            $table->timestamps();

            $table->foreign('room_type_id')->references('id')->on('rooms_types');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
