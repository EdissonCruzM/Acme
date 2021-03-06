<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $owners = Owner::OrderBy('surnames','ASC')->get();

        return response()->json([
            'code'   => 200,
            'status' => 'succes',
            'owners' => $owners
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
            // Registrar propietario

            //validar datos
            $validate = \Validator::make($params_array, [
                'id'         => 'required|unique:owners,id|regex:/^[\s\ 0123456789]+$/u',
                'firstName'  => 'required|regex:/^[\pL\s]+$/u',
                'secondName' => 'nullable|regex:/^[\pL\s]+$/u',
                'surnames'   => 'required|regex:/^[\pL\s\ .]+$/u',
                'address'    => 'required|regex:/^[\pL\s\-0123456789.°#]+$/u',
                'phone'      => 'required|regex:/^[\s\-0123456789+]+$/u',
                'city'       => 'required|regex:/^[\pL\s\ .]+$/u'
            ]);
            
            if($validate->fails()){
                // Validacion ha fallado
                $data = array(
                    'status'    => 'error',
                    'code'      => 400,
                    'message'   => 'Datos incorrectos',
                    'errors'    => $validate->errors()
                );
            }else{
                // Registrar propietario
                owner::create([
                    'id' => $params_array['id'],
                    'first_name' => $params_array['firstName'],
                    'second_name' => $params_array['secondName'],
                    'surnames' => $params_array['surnames'],
                    'address' => $params_array['address'],
                    'phone' => $params_array['phone'],
                    'city' => $params_array['city'],
                ]);

                // Devolver array de respuesta
                $data = array(
                    'status'  => 'success',
                    'code'    => 200,
                    'message' => 'Propietario registrado'
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
     * @param  \App\Models\Owner  $owner
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request){
        
        // Obtener propietario que se elimina
        $owner = Owner::where('id', $id)->first();

        if(!empty($owner)){

            // Borra el registro
            $owner->delete();

            // Devolver el array de respuesta
            $data = array(
                'code'    => 200,
                'status'  => 'success',
                'message' => 'Propietario eliminado',
                'owner'   => $owner
            );
        }else{
            $data = array(
                'code'      => 404,
                'status'    => 'error',
                'message'   => 'Propietario no existe',
            );
        }

        return response()->json($data, $data['code']);
    }
}
