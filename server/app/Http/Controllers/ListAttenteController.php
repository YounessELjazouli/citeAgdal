<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListAttente;
use Illuminate\Support\Facades\DB;

class ListAttenteController extends Controller
{
    public function returnTodemandes1(Request $request,$id){
        $row = DB::table('list_attentes')->find($id);
        DB::table('list_demandes')->insert((array) $row);
        DB::table('list_attentes')->where('id', '=', $id)->delete();
    }

    public function transferAuListePrincipale(Request $request,$id){
        $row = DB::table('list_attentes')->find($id);
        DB::table('list_principales')->insert((array) $row);
        DB::table('list_attentes')->where('id', '=', $id)->delete();
    }

    public function index()
    {
        $users = ListAttente::paginate(10);
        return response()->json($users);
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
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

