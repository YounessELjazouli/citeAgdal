<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Chambres;


class ChambresController extends Controller
{
    public function index()
    {
        $rooms = DB::table('chambres')->where('placesLeft', '>', 0)->paginate(10);
        return response()->json($rooms);
    }

    public function addRooms(){
        $data = [ "RC" => 60 , "ET1" => 115, "ET2" => 102, "ET3" => 70];
        foreach ($data as $key => $value){
            $i = 1;
            $tc = null;
            while ($i < $value) {
                if($key === "RC") $tc = 2;
                if($key === "ET1") $tc = 3;
                if($key === "ET2") $tc = 3;
                if($key === "ET3") $tc = 2;
                DB::table('chambres')->insert([
                    "codeChambre" => $key."N".$i,
                    "totalCapacity" => $tc ,
                    "placesLeft" => $tc
                ]);
                $i++;
            }
        }
    }

    public function listDispo(){
        $rooms = DB::select('select * from chambres where placesLeft > 0');
        return response()->json($rooms);
    }

    public function findIdEtud($cin){
        $id = DB::table('list_principales')->where('cin', $cin)->value('id');
        return $id;
    }

    public function validerInscreption($idC,$idR){
        $idC =(integer) $idC ;
        $idR =(integer) $idR ;
        $row = DB::table('list_principales')->find($idR);
        $row = (array) $row;
        $row["chambres_id"] = $idC;
        DB::table('list_residents')->insert((array) $row);
        DB::table('list_principales')->where('id', '=', $idR)->delete();
        DB::table('chambres')->where("id", $idC)->decrement('placesLeft');
    }

    public function changerChambre($idC,$idR){
        $old = DB::table('list_residents')->where('id', '=', $idR)->value('chambres_id');
        DB::table('chambres')->where("id", (integer) $old)->increment('placesLeft');

        DB::table('list_residents')->where('id', '=', $idR)->update([
            "chambres_id" => $idC
        ]);
        DB::table('chambres')->where("id", $idC)->decrement('placesLeft');

    }


}
