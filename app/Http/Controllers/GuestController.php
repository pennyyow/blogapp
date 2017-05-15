<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blogs;
use Input;
use App\User;

class GuestController extends Controller
{
   public function home(){
      $category = Input::get('category');
      return view('blogs.posts')->with([
         'category' => $category 
      ]);
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
            'name' => $user->name,
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
        $blog = Blogs::find(Input::get('blog'))->toArray();

        $blog['user'] = User::find($blog['user']);

        for ($i=0; $i < count($blog['comments']) ; $i++) { 
            $blog['comments'][$i]['user'] = User::find($blog['comments'][$i]['user']);
        }

        return $blog;
    }

    public function pubSearch() {
        $keyword = Input::get('search');
        
        $filteredBlogs = count(Blogs::where('title', 'regex', "/". $keyword ."/i" )->get());
        $filteredUsers = count(User::where('name', 'regex', "/". $keyword ."/i" )->get());
        $filteredTags = count(Blogs::where('tags', 'regex', "/". $keyword ."/i" )->get());

        return view('blogs.search', compact('keyword', 'filteredBlogs', 'filteredUsers', 'filteredTags'));
    }

    public function filterBlogs() {
        $keyword = Input::get('keyword');
        $max = (int) Input::get('max');

        $result = Blogs::where('title', 'regex', "/". $keyword ."/i" )->take($max)->get();
        return [
            'total' => $result->count(),
            'result' => $result
        ];
    }

    public function filterUsers() {
        $keyword = Input::get('keyword');
        $max = (int) Input::get('max');

        $result = User::where('name', 'regex', "/". $keyword ."/i" )->take($max)->get();
        return [
            'total' => $result->count(),
            'result' => $result
        ];
    }

    public function filterTags() {
        $keyword = Input::get('keyword');
        $max = (int) Input::get('max');

        $result = Blogs::where('tags', 'regex', "/". $keyword ."/i" )->take($max)->get();
        return [
            'total' => $result->count(),
            'result' => $result
        ];
    }
}
