<?php

use App\Http\Middleware\CheckAdminMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('register', 'App\Http\Controllers\AuthController@register');
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout')->middleware('jwt.auth');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('user', 'App\Http\Controllers\AuthController@me')->middleware('jwt.auth');

});

Route::get('rooms', 'App\Http\Controllers\RoomController@index');
Route::post('rooms', 'App\Http\Controllers\RoomController@store');
Route::get('rooms/{room}', 'App\Http\Controllers\RoomController@show');
Route::delete('rooms/{room}', 'App\Http\Controllers\RoomController@destroy');

Route::group([
    'middleware' => ['jwt.auth', 'checkAdmin']
], function ($router) {

    Route::get('/test', function () {
        return 1;
    });

});
