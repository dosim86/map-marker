<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'category_id', 'coords', 'comment',
    ];

    protected $dates = ['created_at'];

    protected $casts = [
        'coords' => 'array'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($query) {
            $query->created_at = new \DateTime();
        });
    }
}
