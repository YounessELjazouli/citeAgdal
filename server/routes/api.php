<?php

use App\Http\Controllers\AnnoncesController;
use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListDemandesController;
use App\Http\Controllers\ListPrincipaleController;
use App\Http\Controllers\ListAttenteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ListResidentController;
use App\Http\Controllers\ChambresController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\ViolationsController;
use App\Http\Controllers\PunitionsController;
use App\Http\Controllers\DecisionsController;


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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Route::middleware('auth:api')->group(function () {
//     //  routes that require authentification : 
    
// });
Route::view('/','welcome');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout/{email}', [AuthController::class, 'logout']);
Route::post('/addUser', [AuthController::class, 'addUser']);
Route::get('/checkAuth', [AuthController::class, 'checkAuth']);
Route::get('/listUsers', [AuthController::class, 'listUsers']);
Route::get('/photos/{photoName}', [AuthController::class, 'getPhoto']);



Route::middleware('auth:sanctum')->get('/protected', function (Request $request) {
    return response()->json([
        'message' => 'This is a protected resource!',
        'user' => $request->user()
    ]);
});


Route::resource('listeDemandes',ListDemandesController::class);
Route::resource('listP',ListPrincipaleController::class);
Route::resource('listA',ListAttenteController::class);
Route::resource('listR',ListResidentController::class);
Route::resource('listC',ChambresController::class);
Route::resource('listV',ViolationsController::class);
Route::resource('listPu',PunitionsController::class);
Route::resource('listD',DecisionsController::class);
Route::resource('contacts',ContactController::class);

Route::post('/data',[ListDemandesController::class,'storeAllData']);

Route::get('/addToListP/{id}',[ListDemandesController::class,'addToListeP']);
Route::get('/addToListA/{id}',[ListDemandesController::class,'addToListeA']);
Route::get('/listeDemandes/deleteFD/{a1}',[ListDemandesController::class,'deleteFalseDemandes']);
Route::get('/listeDemandes/gestionAuto/{a1}',[ListDemandesController::class,'gestionAuto']);

Route::get('/returnTodemandes/{id}',[ListPrincipaleController::class,'returnTodemandes']);
Route::get('/transferAuListeAttente/{id}',[ListPrincipaleController::class,'transferAuListeAttente']);
Route::get('/listPall',[ListPrincipaleController::class,'all']);

Route::get('/returnTodemandes1/{id}',[ListAttenteController::class,'returnTodemandes1']);
Route::get('/transferAuListePrincipale/{id}',[ListAttenteController::class,'transferAuListePrincipale']);


Route::get('/validerResident/{cin}',[ListResidentController::class,'validerResident']);
Route::get('/getResidentData/{cin}',[ListResidentController::class,'getResidentData']);
Route::get('/deleteResident/{id}',[ListResidentController::class,'deleteResident']);
Route::get('/listRall',[ListResidentController::class,'all']);
Route::get('/listRall1',[ListResidentController::class,'all1']);
Route::get('/findIdREtud/{cin}',[ListResidentController::class,'findIdEtud']);


Route::get('/addRooms',[ChambresController::class,'addRooms']);
Route::get('/chambres',[ChambresController::class,'listDispo']);
Route::get('/findIdEtud/{cin}',[ChambresController::class,'findIdEtud']);
Route::get('/validerInscreption/{idC}/{idR}',[ChambresController::class,'validerInscreption']);
Route::get('/changerChambre/{idC}/{idR}',[ChambresController::class,'changerChambre']);


Route::get('/insertVPData',[ViolationsController::class,'insertData']);


Route::get('/statsAa',[StatsController::class,'statsAa']);
Route::get('/cityRes',[StatsController::class,'residencesPerCity']);
Route::get('/cycleEtudes',[StatsController::class,'cycleEtudes']);

Route::post('/postAnnonce',[AnnoncesController::class,'postAnnonce']);
Route::get('/annonces',[AnnoncesController::class,'index']);
Route::get('/annonces/{id}',[AnnoncesController::class,'show']);



Route::get('/dd',function(Request $request) {
    dd(getdate());
});



// Route::middleware('auth:api')->group(function () {
//     // Protected routes go here
//     Route::resource('listeDemandes',ListDemandesController::class);
//     Route::post('/data',[ListDemandesController::class,'storeAllData']);
// });