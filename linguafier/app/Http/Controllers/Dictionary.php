<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class Dictionary extends Controller
{
    public function __invoke(){
        return Inertia::render('Dictionary', [
            'pageUser'=>'User',
        ]);
    }
}
