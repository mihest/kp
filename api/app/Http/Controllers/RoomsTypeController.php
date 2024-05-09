<?php

namespace App\Http\Controllers;

use App\Models\RoomsType;
use Illuminate\Http\Request;

class RoomsTypeController extends Controller
{
    public function index()
    {
        return RoomsType::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
        ]);

        return RoomsType::create($data);
    }

    public function show(RoomsType $roomsType)
    {
        return $roomsType;
    }

    public function update(Request $request, RoomsType $roomsType)
    {
        $data = $request->validate([
            'name' => ['required'],
        ]);

        $roomsType->update($data);

        return $roomsType;
    }

    public function destroy(RoomsType $roomsType)
    {
        $roomsType->delete();

        return response()->json();
    }
}
