<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ListResident;

class ListResidentController extends Controller
{
    public function validerResident($cin){
        $etudiant = DB::table('list_principales')->where('cin',"=",$cin)->get();
        return response()->json($etudiant);
    }
    public function getResidentData($cin){
        $etudiant = DB::table('list_residents')->join('chambres','list_residents.chambres_id','chambres.id')->where('cin',"=",$cin)->get();
        return response()->json($etudiant);
    }

    public function findIdEtud($cin){
        $id = DB::table('list_residents')->where('cin', $cin)->value('id');
        return $id;
    }

    public function deleteResident($id){
        $idChambre = DB::table('list_residents')->where('id', $id)->value('chambres_id');
        DB::table('list_residents')->where('id', '=', $id)->delete();
        DB::table('chambres')->where("id", (integer) $idChambre)->increment('placesLeft');
    }
    public function index()
    {
        $users = DB::table('list_residents')->join('chambres','list_residents.chambres_id','chambres.id')->paginate(10);
        return response()->json($users);
    }

    public function all()
    {
        $users = DB::table('list_residents')->get();
        return response()->json($users);
    }
    public function all1()
    {
        $users = DB::table('list_residents')->join('chambres','list_residents.chambres_id','chambres.id')->get();
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
