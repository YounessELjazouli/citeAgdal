<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Decisions extends Model
{
    use HasFactory;

    public function punitions()
    {
        return $this->hasMany(Punitions::class);
    }

    public function residents()
    {
        return $this->hasMany(ListResident::class);
    }

    public function violations()
    {
        return $this->hasMany(Violations::class);
    }
}
