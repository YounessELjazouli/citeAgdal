<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class StatsController extends Controller
{
    public function statsAa() {
        $nbResidents = DB::table('list_residents')->count();
        $nbChambres = DB::table('chambres')->count();
        $nbPlaces = DB::table('chambres')->sum('totalCapacity');
        $nbPlacesDisponible = DB::table('chambres')->sum('placesLeft');
        $data = [
            'nbResidents' => $nbResidents,
            'nbChambres' => $nbChambres,
            'nbPlaces' => $nbPlaces,
            'nbPlacesDisponible' => $nbPlacesDisponible
        ];
        return response()->json($data);
    }

    public function residencesPerCity(){
        $res = DB::table('list_residents')->selectRaw('count(id) as number_of_res, provinceParents')->groupBy('provinceParents')->get();
        $demandes = DB::table('list_demandes')->selectRaw('count(id) as number_of_res, provinceParents')->groupBy('provinceParents')->get();
        $listP = DB::table('list_principales')->selectRaw('count(id) as number_of_res, provinceParents')->groupBy('provinceParents')->get();
        $listA = DB::table('list_attentes')->selectRaw('count(id) as number_of_res, provinceParents')->groupBy('provinceParents')->get();
        return response()->json(['data'=> [$res,$demandes,$listP,$listA]]);
    }

    public function cycleEtudes(){
        $res = DB::table('list_residents')->selectRaw('count(id) as number_of_resd, cycleEtudes')->groupBy('cycleEtudes')->get();
        $demandes = DB::table('list_principales')->selectRaw('count(id) as number_of_resd, cycleEtudes')->groupBy('cycleEtudes')->get();
        $listP = DB::table('list_demandes')->selectRaw('count(id) as number_of_resd, cycleEtudes')->groupBy('cycleEtudes')->get();
        $listA = DB::table('list_attentes')->selectRaw('count(id) as number_of_resd, cycleEtudes')->groupBy('cycleEtudes')->get();
        return response()->json(['data'=> ["resident" => $res, "list des demandes" => $demandes, "list principale" =>$listP,"list attente" => $listA]]);

    }
}
