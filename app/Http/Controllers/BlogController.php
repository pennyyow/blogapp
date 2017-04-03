<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends Controller
{

	public function __construct()
    {
        $this->middleware('auth');
    }

    public function home(){
    	return view('blogs.posts');
    }

    public function profile(){
    	return view('blogs.profile');
    }

    public function categories(){
    	return view('blogs.categories');
    }
}
