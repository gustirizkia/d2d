<?php

use App\Http\Controllers\Admin\AdminRelawanController;
use App\Http\Controllers\Admin\BankSoalController;
use App\Http\Controllers\Admin\CalonController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LokasiController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('admin')->group(function(){
    Route::get('/', [DashboardController::class, 'index']);
    Route::resource('bank-soal', BankSoalController::class);
    Route::resource('user', UserController::class);
    Route::resource('lokasi', LokasiController::class);
    Route::get('detailSoal/{soal_id}', [LokasiController::class, "detailSoal"])->name("detailSoal");

    Route::resource("calon-legislatif", CalonController::class);
    Route::get("calon-legislatif-soal/{id}", [CalonController::class, 'bankSoalCalon'])->name("bankSoalCalon");
    Route::get("getSoal/{calon}", [CalonController::class, 'getSoal'])->name("getSoal");
    Route::get("deleteHasSoal/{id}", [CalonController::class, 'deleteHasSoal'])->name("deleteHasSoal");
    Route::post('insertSoalCalon', [CalonController::class, 'insertSoalCalon'])->name("insertSoalCalon");

    Route::resource('relawan', AdminRelawanController::class);


});
