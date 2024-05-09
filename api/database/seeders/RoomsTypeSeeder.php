<?php

namespace Database\Seeders;

use App\Models\RoomsType;
use Illuminate\Database\Seeder;

class RoomsTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            'Люкс', 'Стандарт', 'Семейный', 'Призедентский'
        ];

        foreach ($types as $type) {
            RoomsType::create([
                'name' => $type
            ]);
        }
    }
}
