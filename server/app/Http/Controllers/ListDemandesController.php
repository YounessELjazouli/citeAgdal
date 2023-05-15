<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListDemandes;
use Illuminate\Support\Facades\DB;


class ListDemandesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function storeAllData(Request $request){
        $rows = $request->all();
        error_log($request);
        foreach ($rows as $row) {
            foreach($row as $demande){
                ListDemandes::create($demande);
            }
            
        }
        return response()->json(['message' => 'Les demandes sont enregistrés avec success']);
    }

    public function addToListeP(Request $request,$id){
        $row = DB::table('list_demandes')->find($id);
        DB::table('list_principales')->insert((array) $row);
        DB::table('list_demandes')->where('id', '=', $id)->delete();
    }

    public function addToListeA(Request $request,$id){
        $row = DB::table('list_demandes')->find($id);
        DB::table('list_attentes')->insert((array) $row);
        DB::table('list_demandes')->where('id', '=', $id)->delete();
    }

    public function deleteFalseDemandes($id){
        //DB::table('list_demandes')->where('gender','=','M')->whereIn('provinceParents', ['Rabat', 'Salé', 'Temara', 'Skhirate'])->delete();
        DB::delete("delete from list_demandes where gender = ? OR provinceParents in ('Rabat', 'Salé', 'Temara', 'Skhirate')",['M']);
        return response()->json(['message' => 'Les demandes non éligible sont supprimés avec success']);

    }
    public function gestionAuto($id){
        $first150rows = DB::table('list_demandes')->orderBy('revenueAnuelle', 'asc')->limit(150)->get()->toArray();
        foreach ($first150rows as $row) {
            DB::table('list_principales')->insert(json_decode(json_encode($row),true));
        }
        DB::table('list_demandes')->orderBy('revenueAnuelle', 'asc')->limit(150)->delete();

        $whatsleft = DB::table('list_demandes')->orderBy('revenueAnuelle', 'asc')->get()->toArray();
        foreach ($whatsleft as $row) {
            DB::table('list_attentes')->insert(json_decode(json_encode($row),true));
        }
        DB::table('list_demandes')->delete();
        return response()->json(['message' => 'Le traitement de demande est terminé avecc success']);

        
    }

    public function index()
    {
        $users = ListDemandes::paginate(10);
        return response()->json($users);
        // return ListDemandes::all();
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
        $request->validate([
            'Nom'=>'required',
            'Prenom'=>'required',
        ]);

        try{

            ListDemandes::create($request->post());

            return response()->json([
                'message'=>'Product Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a product!!'
            ],500);
        }
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
        return DB::table('list_demandes')->where('id', $id)->delete();

    }


}
