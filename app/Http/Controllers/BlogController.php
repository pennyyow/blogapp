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
    	return view('blogs.posts');
    }

    public function profile(){
        $image = User::get();
    	return view('blogs.profile', compact('image'));
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

    public function updateProfile(Request $request){
        //get & move thumbnail
        $fileImage = $request->file('file');
        $destination_path = 'img/avatar';
        $avatar = $fileImage->getClientOriginalName();
        $fileImage->move($destination_path, $avatar);

        $firstName = Input::get('firstName');
        $lastName = Input::get('lastName');
        $email = Input::get('email');
        $image = $avatar;   

        $updateProfile = Profile::updateProfile($firstName, $lastName, $image);
        return redirect('/profile');
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

            $blog = new Blogs();

            $blog->title = Input::get('title');
            $blog->category = Input::get('category');
            $blog->tags = $request->tags;
            $blog->description = Input::get('description');
            $blog->content = Input::get('content');
            $blog->image = $avatar;
            $blog->user = auth()->user();
            $blog->save();

        }else{

            $fileImage = $request->file('file');
            $destination_path = 'img/avatar';

            //TODO: Change filename of uplodaed thumbnail to id of article
            $avatar = $fileImage->getClientOriginalName();
            $fileImage->move($destination_path, $avatar);

            $blog = new Blogs();

            $blog->title = Input::get('title');
            $blog->category = Input::get('category');
            $blog->tags = $request->tags;
            $blog->description = Input::get('description');
            $blog->content = Input::get('content');
            $blog->image = $avatar;
            $blog->user = auth()->user();
            $blog->save();
        }

        return redirect('/posts');
    }
}
