<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListResidentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('list_residents', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nom");
            $table->string("prenom");
            $table->string("cin");
            $table->string("codeMassar");
            $table->string("dateNaissance");
            $table->string("gender");
            $table->string("nationalite");
            $table->string("provinceParents");
            $table->string("etablissement");
            $table->string("diplomePrepare");
            $table->string("cycleEtudes");
            $table->string("niveauEtudes");
            $table->string("nouvelResident");
            $table->integer("nombreAnnee");
            $table->integer("revenueAnuelle");
            $table->string("handicapé");
            $table->foreignId("chambres_id")->constrained()->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('list_residents');
    }
}
