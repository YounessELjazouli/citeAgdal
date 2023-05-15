<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Decisions;
use Illuminate\Support\Facades\DB;

class DecisionsController extends Controller
{
    public function index(){
        //$allP = Decisions::all()->residents();
        $allP = DB::table('decisions')
            ->join('list_residents', 'decisions.list_residents_id', '=', 'list_residents.id')
            ->join('violations', 'decisions.violations_id', '=', 'violations.id')
            ->join('punitions', 'decisions.punitions_id', '=', 'punitions.id')
            ->join('chambres', 'list_residents.chambres_id', '=', 'chambres.id')
            ->get();
        return response()->json($allP);
    }

    public function store(Request $request){
        $idV = $request->idV;
        $idR = $request->idR;
        $idP = $request->idP;
        
        DB::table('decisions')->insert([
            'violations_id' => $idV,
            'dateV' => now()->format('Y-m-d'),
            'list_residents_id' => $idR,
            'punitions_id' => $idP
        ]);
        

        
    }
}
