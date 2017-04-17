<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blogs;
use Input;
use App\User;

class GuestController extends Controller
{
   public function home(){
   	$blogs = Blogs::all();
   	return view('blogs.posts', compact('blogs'));
   }

   public function categories(){
   	return view('blogs.categories');
   }

   public function listBlogs() {
      $max = (int) Input::get('max');
      $result = Blogs::orderBy('updated_at', 'desc')->take($max)->get();
      return [
          'total' => $result->count(),
          'blogs' => $result
      ];
 	 }

 	 public function listBlogsByUser() {
        $user = Input::get('user');
        $max = (int) Input::get('max');
        $result = Blogs::orderBy('updated_at', 'desc')->take($max)->get();
        return [
            'total' => $result->count(),
            'blogs' => $result
        ];
    }


 	 public function profile($id){
        $user = User::find($id);
    	return view('blogs.profile')->with([
            '_id' => $user->_id,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'image' => $user->image
        ]);
    }

 	 public function view($id) {
        $blog = Blogs::find($id);
        $views = $blog->views ? $blog->views : 0;
        $views++;
        $blog->views = $views;
        $blog->save();
        return view('blogs.blog', compact('blog'));
    }

    public function getBlog() {
        return Blogs::find(Input::get('blog'));
    }
}
