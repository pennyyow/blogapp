<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GuestController extends Controller
{
	
   public function home(){
   	return view('blogs.posts');
   }

   public function categories(){
   	return view('blogs.categories');
   }
}
