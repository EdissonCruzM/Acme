<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];
    protected $primaryKey = 'id';

    protected $hidden = [
        'created_at', 'updated_at',
    ];


    // Un propietario podria tener varios vehiculos
    public function vehicle(){
        return $this->hasMany(Vehicle::Class);
    }
}
