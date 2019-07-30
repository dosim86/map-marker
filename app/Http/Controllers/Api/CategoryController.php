<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CategoryResource;
use App\Category;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }
}
