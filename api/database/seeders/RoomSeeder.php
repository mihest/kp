<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\RoomsType;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $price = 12000;
        for ($i = 0; $i < 20; $i++){
            Room::create([
                'title' => 'Люкс 3-комнатная',
                'description' => 'Погрузитесь в уют и комфорт в нашем просторном двухместном номере с потрясающим видом на окружающие горы. Здесь вы найдете идеальное пристанище для уединенного отдыха в окружении величественной природы. Этот номер создан для пары, желающей проникнуться романтикой и уединением, а также для индивидуального путешественника, который ценит спокойствие и гармонию с собой и миром.',
                'price' => $price,
                'square' => 16,
                'sleeping_places' => 3,
                'conditioner' => true,
                'wi_fi' => true,
                'amenities' => json_encode([
                    'Кондиционер',
                    'Двуспальная кровать',
                    'Массажное кресло'
                ]),
                'room_type_id' => RoomsType::first()->id,
                'room_number' => 111,
                'floor_number' => 1,
            ]);

            $price += 499;
        }

    }
}
