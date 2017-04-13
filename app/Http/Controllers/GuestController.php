<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blogs;

class GuestController extends Controller
{
	
   public function home(){
   	$blogs = Blogs::all();
   	return view('blogs.posts', compact('blogs'));
   }

   public function categories(){
   	return view('blogs.categories');
   }
}
