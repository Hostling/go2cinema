<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Cinema\FilmsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('cinema/films/{year}/{month}/{day}', [FilmsController::class, 'getFilmsByDay']);
Route::get('cinema/filminfo/{id}', [FilmsController::class, 'filmInfo']);
Route::get('cinema/sessioninfo/{id}', [FilmsController::class, 'getSessionInfo']);
Route::get('cinema/getHallInfo/{id}', [FilmsController::class, 'getHallInfo']);

Route::middleware('auth:api')->group(function() {
    Route::get('check', [AuthController::class, 'check']);
});

