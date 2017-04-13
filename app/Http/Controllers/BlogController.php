<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Input;
use App\Blogs;
use App\Profile;
use DB;

class BlogController extends Controller
{

	public function __construct()
    {
        $this->middleware('auth');
    }

    public function home(){
        $blogs = Blogs::all();
    	return view('blogs.posts', compact('blogs'));
    }

    public function categories(){
    	return view('blogs.categories');
    }

    public function blog(){
        return view('blogs.blog');
    }

    public function createBlog(){
        return view('blogs.create-blog');
    }
    
    /*public function listBlogs(){
        $blogs = Blogs::all();
        return redirect('/posts', compact('blogs'));
    }*/
    public function create(Request $request){
        $categ = Input::get('category');
        if($request->file('file') == null){
            //TODO: Improve, change the filename of images according to its category or change this to switch case
            if($categ == 'Adventure'){
                $avatar = 'category8';
            }
            if($categ == 'Entertainment'){
                $avatar = 'category1';
            }
            if($categ == 'Politics'){
                $avatar = 'category2';
            }
            if($categ == 'Nature'){
                $avatar = 'category3';
            }
            if($categ == 'Education'){
                $avatar = 'category4';
            }
            if($categ == 'Fashion'){
                $avatar = 'category5';
            }
            if($categ == 'Technology'){
                $avatar = 'category6';
            }
            if($categ == 'Sports'){
                $avatar = 'category7';
            }
            if($categ == 'Others'){
                $avatar = 'img_profile_big';
            }

        }else{

            $fileImage = $request->file('file');
            $destination_path = 'img/avatar';

            //TODO: Change filename of uplodaed thumbnail to id of article
            $avatar = $fileImage->getClientOriginalName();
            $fileImage->move($destination_path, $avatar);
        }

        $blog = new Blogs();

        $blog->title = Input::get('title');
        $blog->category = Input::get('category');
        $blog->tags = $request->tags;
        $blog->description = Input::get('description');
        $blog->content = Input::get('content');
        $blog->image = $avatar;
        $blog->user = [
            "_id" => auth()->user()->_id,
            "firstName" => auth()->user()->firstName,
            "lastName" => auth()->user()->lastName,
            "email" => auth()->user()->email,
            "image" => auth()->user()->image
        ];
        $blog->save();

        return redirect('/posts');
    }
}
