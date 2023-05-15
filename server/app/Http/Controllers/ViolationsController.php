<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Violations;
use Illuminate\Support\Facades\DB;

class ViolationsController extends Controller
{
    public function index() {
        $violations = Violations::all();
        return response()->json($violations);
    }

    public function insertData() {
        DB::table('punitions')->insert([
            ["nomP" => "Blâme"],
            ["nomP" => "Avertissement"],
            ["nomP" => "Amende"],
            ["nomP" => "Explusion"]
        ]);

        DB::table('violations')->insert([
            ["typeViolation" => "Vol"],
            ["typeViolation" => "Bagarre"],
            ["typeViolation" => "Non Respect de l'horaire"],
            ["typeViolation" => "Incendie Volontaire"],
            ["typeViolation" => "Violation de la politique des objets interdits"]
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'typeViolation' => 'required|string',
        ]);

        $violation = new Violations();
        $violation->typeViolation = $validatedData['typeViolation'];
        $violation->save();

        return response()->json([
            'message' => 'Violation de type '.$validatedData['typeViolation'].' a été crée avec success',
            'data' => $violation
        ], 201);
    }
}
