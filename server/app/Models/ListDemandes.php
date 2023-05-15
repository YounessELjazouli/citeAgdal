<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListDemandes extends Model
{
    use HasFactory;

    protected $table = 'list_demandes';

    protected $fillable = [
        'Nom',
        'Prenom',
        'cin',
        'codeMassar',
        'dateNaissance',
        'gender',
        'nationalite',
        'provinceParents',
        'etablissement',
        'diplomePrepare',
        'cycleEtudes',
        'niveauEtudes',
        'nouvelResident',
        'nombreAnnee',
        'revenueAnuelle',
        'handicapé'
    ];

}
