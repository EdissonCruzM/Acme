<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VehicleController extends Controller{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        
        $vehicles = Vehicle::orderBy('created_at','DESC')
        ->select('car_plate as plate','owner_id','driver_id','colour','trade_mark','type')
        ->get();

        return response()->json([
            'code'      => 200,
            'status'    => 'succes',
            'news'      => $vehicles
        ], 200);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        //Recoger datos por post
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if(!empty($params_array)){
            // Registrar vehiculo

            // validar datos
            $validate = \Validator::make($params_array, [
                'carPlate'  => 'required|unique:owners,id',
                'ownerId'   => 'required|exists:owners,id|regex:/^[\s\ 0123456789]+$/u',
                'driverId'  => 'required|exists:drivers,id|regex:/^[\s\ 0123456789]+$/u',
                'colour'     => 'required|regex:/^[\pL\s\ .]+$/u',
                'tradeMark' => 'required|regex:/^[\pL\s]+$/u',
                'type'       => 'required|regex:/^[\pL\s]+$/u'
            ]);

            if($validate->fails()){
                // validacion ha fallado
                $data = array(
                    'status'    => 'error',
                    'code'      => 400,
                    'message'   => 'Datos incorrectos',
                    'errors'    => $validate->errors()
                );
            }else{
                // Registrar vehiculo
                vehicle::create([
                    'car_plate'  => $params_array['carPlate'],
                    'owner_id'   => $params_array['ownerId'],
                    'driver_id'  => $params_array['driverId'],
                    'colour'     => $params_array['colour'],
                    'trade_mark' => $params_array['tradeMark'],
                    'type'       => $params_array['type']
                ]);

                // Devolver Array de respuesta
                $data = array(
                    'status'  => 'success',
                    'code'    => 200,
                    'message' => 'Vehiculo registrado'
                );
            }
        }else{
            // error en el json
            $data = array(
                'status'    => 'error',
                'code'      => 400,
                'message'   => 'Los datos enviados no son correctos'
            );
        }
        return response()->json($data, $data['code']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
        //Obtener vehiculo que se elimina
        $vehicle = Vehicle::where('car_plate', $id)->first();

        if(!empty($vehicle)){

            // Borra el registro
            $vehicle->delete();

            // Devolver el array de respuesta
            $data = array(
                'code'    => 200,
                'status'  => 'success',
                'message' => 'vehiculo eliminado',
                'driver'   => $vehicle
            );
        }else{
            $data = array(
                'code'      => 404,
                'status'    => 'error',
                'message'   => 'vehiculo no existe',
            );
        }
        return response()->json($data, $data['code']);
    }

    public function ownerVehicle(){
        // Cosultar vehicula asignado a cada propietario
        $ownerVehicle = Vehicle::join('owners','owner_id','=','owners.id')
        ->select('car_plate as plate','colour','trade_mark','type','owners.id','owners.first_name','owners.second_name','owners.surnames','owners.phone','owners.city')->get();

        return response()->json([
            'code'         => 200,
            'status'       => 'succes',
            'ownerVehicle' => $ownerVehicle
        ], 200);
    }
    
    public function driverVehicle(){
        // Cosultar conductor asignado a cada vehiculo
        $dirverVehicle = Vehicle::join('drivers','driver_id','=','drivers.id')
        ->select('car_plate as plate','colour','trade_mark','type','drivers.id','drivers.first_name','drivers.second_name','drivers.surnames','drivers.phone','drivers.city')->get();

        return response()->json([
            'code'         => 200,
            'status'       => 'succes',
            'dirverVehicle' => $dirverVehicle
        ], 200);
    }
}
