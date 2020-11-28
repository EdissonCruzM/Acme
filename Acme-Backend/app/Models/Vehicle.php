<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];
    protected $primaryKey = 'car_plate';

    protected $hidden = [
        'created_at', 'updated_at',
    ];

    // un Vehiculo tiene propietario unico
    public function owner(){
        return $this->belongsTo(Owner::class);
    }
    
    // Un vehiculo tiene un conductor
    public function Driver(){
        return $this->belongsTo(Driver::class);
    }

}
