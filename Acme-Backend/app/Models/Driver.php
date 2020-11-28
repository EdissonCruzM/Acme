<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];
    protected $primaryKey = 'id';

    protected $hidden = [
        'created_at', 'updated_at',
    ];

    // Un conductor esta asociado a un vehiculo
    public function vehicle(){

        return $this->hasOne(Vehicle::class);
    }

}
