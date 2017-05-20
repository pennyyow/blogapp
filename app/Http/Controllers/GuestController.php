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
      $tags = Input::get('tags');

      return view('blogs.posts')->with([
         'category' => $category,
         'tags' => $tags
      ]);
   }

   public function categories(){
   	return view('blogs.categories');
   }

   public function listBlogs() {
      $max = (int) Input::get('max');
        $category = Input::get('category');
        $tags = Input::get('tags');
        $result = [];
        if($category) {
            $result = Blogs::orderBy('updated_at', 'desc')->raw(
            function($collection) use($category) {
                return $collection->find([
                    'category' => $category
                    ], 
                    ['sort' => ['updated_at' => -1]]);
            })->take($max);
        }else if($tags){
            $result = Blogs::orderBy('updated_at', 'desc')->raw(
            function($collection) use($tags) {
                return $collection->find([
                    'tags' => $tags
                    ], 
                    ['sort' => ['updated_at' => -1]]);
            })->take($max);
        }
        else {
            $result = Blogs::orderBy('created_at', 'desc')->take($max)->get();
        }

      $blogs = $result->toArray();
        for ($i=0; $i < count($blogs) ; $i++) { 
            $blogs[$i]['user'] = User::find($blogs[$i]['user']);
        }

        return [
            'total' => $result->count(),
            'blogs' => $blogs
        ];
 	 }

 	 public function listBlogsByUser() {
         $user = Input::get('user');
        $max = (int) Input::get('max');
        $res = Blogs::orderBy('updated_at', 'desc')->raw(
            function($collection) use($user) {
                return $collection->find([
                    'user' => $user
                    ], 
                    ['sort' => ['created_at' => -1]]);
            })->take($max);

        $blogs = $res->toArray();
        for ($i=0; $i < count($blogs) ; $i++) { 
            $blogs[$i]['user'] = User::find($blogs[$i]['user']);
        }


        return [
            'total' => $res->count(),
            'blogs' => $blogs
        ];
    }


 	 public function profile($id){
        $user = User::find($id);
        $blogs = count(Blogs::where('user', '=', $id)->get());
        $tags = Input::get('tags');
        if($user == null){
            return view('errors.404');
        }else{
    	return view('blogs.profile')->with([
            '_id' => $user->_id,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'name' => $user->name,
            'email' => $user->email,
            'image' => $user->image,
            'facebook_id' => $user->facebook_id,
            'blogs' => $blogs,
            'tags' => $tags,
            'user' => $user
        ]);
        }
    }

 	 public function view($id) {
        $blog = Blogs::find($id);
        $tags = Input::get('tags');
        if($blog == null){
            return view('errors.404');
        }else{
            $views = $blog->views ? $blog->views : 0;
            $views++;
            $blog->views = $views;
            $blog->save();
            return view('blogs.blog', compact('blog', 'tags'));
        }
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
