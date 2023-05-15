<?php

namespace App\Http\Controllers;

use App\Models\Punitions;
use Illuminate\Http\Request;

class PunitionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allP = Punitions::all();
        return response()->json($allP);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nomP' => 'required|string',
        ]);

        $punition = new Punitions();
        $punition->nomP = $validatedData['nomP'];
        $punition->save();

        return response()->json([
            'message' => 'Punition :  '.$validatedData['nomP'].' a été crée avec success',
            'data' => $punition
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Punitions  $punitions
     * @return \Illuminate\Http\Response
     */
    public function show(Punitions $punitions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Punitions  $punitions
     * @return \Illuminate\Http\Response
     */
    public function edit(Punitions $punitions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Punitions  $punitions
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Punitions $punitions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Punitions  $punitions
     * @return \Illuminate\Http\Response
     */
    public function destroy(Punitions $punitions)
    {
        //
    }
}
