<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            // Llaves primarias y foraneas
            $table->engine = 'InnoDB';
            $table->string('car_plate', 60)->unique();
            $table->primary('car_plate');
            $table->string('owner_id', 55);
            $table->string('driver_id', 55);

            // Atributos de la relación
            $table->string('colour',30);
            $table->string('trade_mark',30)->nullable();
            $table->string('type',60);

            $table->timestamps();
            
            // Referencia a llave foranea
            $table->foreign('owner_id')->references('id')->on('owners')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            
            $table->foreign('driver_id')->references('id')->on('drivers')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
