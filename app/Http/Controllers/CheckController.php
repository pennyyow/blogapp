<?php

namespace App\Http\Controllers;
use DB;
use App\Blogs;

use Illuminate\Http\Request;

class CheckController extends Controller
{
   /* public function check(){
    	// $test = Blogs::all();
    	if(DB::connection()->getDatabaseName()){
    		echo "connected";
    	}else{
    		echo "not connected";
    	}
    }*/

    public function index(){
        $blogs = Blogs::all();
        return view('blogs.index', compact('blogs'));
    }

    public function create(){
    	return view('blogs.create');
    }


    public function store(Request $request){
    	$blogs = new Blogs();
    	$blogs->name = $request->blogName;
    	$blogs->save();
        dd($blogs);
    	return redirect('blogs.index');
    }

    public function show($id){
        $blogs = Blogs::find($id);
    }


}
