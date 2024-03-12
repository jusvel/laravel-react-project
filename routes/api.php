<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConferenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/conferences', [ConferenceController::class, 'index']);
Route::get('/conferences/{conference}', [ConferenceController::class, 'show']);

Route::middleware("auth:sanctum")->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);

    Route::get("/user", function (Request $request) {
        return $request->user();
    });

    Route::post("/conferences", [ConferenceController::class, "store"]);
    Route::patch("/conferences/{conference}", [ConferenceController::class, "update"]);
    Route::delete("/conferences/{conference}", [ConferenceController::class, "delete"]);
});

Route::post("/login", [AuthController::class, "login"]);
