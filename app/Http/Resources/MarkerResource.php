<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MarkerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'coords' => $this->coords,
            'comment' => $this->comment,
            'created_at' => $this->created_at->format('d.m.Y'),
            'category_id' => $this->category_id,
        ];
    }
}
