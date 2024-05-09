<?php

namespace App\Http\Controllers;

use App\Models\AdditionalServices;
use Illuminate\Http\Request;

class AdditionalServicesController extends Controller
{
    public function index()
    {
        return AdditionalServices::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([

        ]);

        return AdditionalServices::create($data);
    }

    public function show(AdditionalServices $additionalServices)
    {
        return $additionalServices;
    }

    public function update(Request $request, AdditionalServices $additionalServices)
    {
        $data = $request->validate([

        ]);

        $additionalServices->update($data);

        return $additionalServices;
    }

    public function destroy(AdditionalServices $additionalServices)
    {
        $additionalServices->delete();

        return response()->json();
    }
}
