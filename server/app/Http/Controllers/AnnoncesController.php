<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Annonces;
use Illuminate\Support\Facades\Auth;

class AnnoncesController extends Controller
{
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

}