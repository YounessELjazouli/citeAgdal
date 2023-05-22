<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Annonces;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class AnnoncesController extends Controller
{
    public function index() {
        $currentDate = date('Y-m-d'); // Get the current date

        $annonces = Annonces::where('startDate', '<=', $currentDate)
            ->where('endDate', '>=', $currentDate)
            ->get();
        foreach ($annonces as $annonce) {
            $attachement = $annonce->attachements;
            $path = storage_path('app/public/' . $attachement);

            if (!File::exists($path)) {
                abort(404);
            }
    
            $annonce['media'] = asset('storage/' . $attachement); // Assign the photo link directly to the 'media' attribute

        }
        return response()->json(["annonces" => $annonces ]);
    }
    public function postAnnonce(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|max:255',
                'body' => 'required',
                'attachment' => 'required|max:2048',
                'dateOfAnnouncement' => 'required|date',
                'dateExpired' => 'required|date|after:dateOfAnnouncement'
            ]);
    
            $file = $request->file('attachment');
            $name = time() . '.' . $file->extension();
            $file->storeAs('public', $name);
            

            $annonce = new Annonces;
            $annonce->title = $validatedData['title'];
            $annonce->body = $validatedData['body'];
            $annonce->attachements = $name;
            $annonce->startDate = $validatedData['dateOfAnnouncement'];
            $annonce->endDate = $validatedData['dateExpired'];
            $annonce->users_id = 3;
            $annonce->save();
    
            return response()->json([
                'url' => asset('storage/' . $name),
            ]);
        } catch (\Throwable $th) {
            error_log($th);
        }
    }

    public function show($id) {
        $annonceDetails = Annonces::where('id',$id)->get();
        return response()->json(["details" => $annonceDetails ]);
    }

}