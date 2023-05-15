<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListPrincipale;
use Illuminate\Support\Facades\DB;


class ListPrincipaleController extends Controller
{
    public function returnTodemandes(Request $request,$id){
        $row = DB::table('list_principales')->find($id);
        DB::table('list_demandes')->insert((array) $row);
        DB::table('list_principales')->where('id', '=', $id)->delete();
    }

    public function transferAuListeAttente(Request $request,$id) {
        $row = DB::table('list_principales')->find($id);
        DB::table('list_attentes')->insert((array) $row);
        DB::table('list_principales')->where('id', '=', $id)->delete();
    }

    public function index()
    {
        $users = ListPrincipale::paginate(25);
        return response()->json($users);
    }
    public function all()
    {
        // $users = ListPrincipale::all(10);
        // return response()->json($users);
        $row = DB::table('list_principales')->get();
        return response()->json($row);
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
