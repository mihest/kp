<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoomController extends Controller
{
    public function index()
    {

        return Room::filter()->get();

    }

    public function store(Request $request)
    {
        $data = $request->validate([

        ]);

        return Room::create($data);
    }

    public function show(Room $room)
    {
        return $room;
    }

    public function update(Request $request, Room $room)
    {
        $data = $request->validate([

        ]);

        $room->update($data);

        return $room;
    }

    public function destroy(Room $room)
    {
        $room->delete();

        return response()->json();
    }
}
