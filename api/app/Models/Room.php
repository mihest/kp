<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Mehradsadeghi\FilterQueryString\FilterQueryString;

class Room extends Model
{
    use FilterQueryString;

    protected array $filters = [
        'sort',
        'between',
        'like',
        'price',
        'conditioner',
        'wi_fi',
        'floor_number',
    ];

    protected $fillable = [
        'title',
        'description',
        'price',
        'square',
        'sleeping_places',
        'conditioner',
        'wi_fi',
        'amenities',
        'room_type_id',
        'room_number',
        'floor_number',
    ];
}
