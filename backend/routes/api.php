<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\API;

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

Route::post('login', [AccountController::class, 'login']);
Route::post('register', [AccountController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
	Route::get('user', [AccountController::class, 'user']);

	Route::post('change-password', [AccountController::class, 'changePassword']);

    Route::get('logout', [AccountController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
	Route::prefix('contacts')->group(function () {
		Route::get('{skip}', [ContactController::class, 'getContacts'])->where('skip', '^[0-9]+');
		Route::get('users/{skip}', [ContactController::class, 'getUsers'])->where('skip', '^[0-9]+');
		Route::post('/', [ContactController::class, 'postContact']);
		Route::patch('{contract}', [ContactController::class, 'patchContact'])->where('id', '^[0-9]+');
		Route::delete('{contract}', [ContactController::class, 'deleteContact'])->where('id', '^[0-9]+');
	});
	
	Route::prefix('rooms')->group(function () {
		Route::get('{skip}', [RoomController::class, 'getRooms'])->where('skip', '^[0-9]+');
		Route::get('users/{skip}', [RoomController::class, 'getUsers'])->where('skip', '^[0-9]+');
		Route::post('/', [RoomController::class, 'postRoom']);
		Route::patch('{room}', [RoomController::class, 'updateRoom'])->where('room', '^[0-9]+');
		
		Route::get('{room}/messages', [MessageController::class, 'getMessage'])->where('room', '^[0-9]+');
		Route::post('{room}/messages', [MessageController::class, 'postMessage'])->where('room', '^[0-9]+');
	});
});
