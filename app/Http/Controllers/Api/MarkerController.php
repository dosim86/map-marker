<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\MarkerResource;
use App\Marker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MarkerController extends Controller
{
    public function index()
    {
        return MarkerResource::collection(Marker::all());
    }

    public function add(Request $request)
    {
        $data = $request->validate([
            'coords' => 'required',
            'category_id' => 'required',
            'comment' => 'nullable',
        ]);

        $marker = new Marker($data);
        $marker->save();

        return new MarkerResource($marker);
    }
}
