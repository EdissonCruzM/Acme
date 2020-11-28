<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOwnersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('owners', function (Blueprint $table) {
            // Llaves primarias y foraneas
            $table->engine = 'InnoDB';
            $table->string('id', 55)->unique();
            $table->primary('id');

            // Atributos de la relación
            $table->string('first_name',30);
            $table->string('second_name',30)->nullable();
            $table->string('surnames',60);
            $table->string('address', 55);
            $table->string('phone', 25);
            $table->string('city', 45);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('owners');
    }
}
