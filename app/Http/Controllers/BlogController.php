<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Input;
use App\Blogs;
use App\Profile;
use DB;
use Carbon\Carbon;

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

    public function categories(){
    	return view('blogs.categories');
    }

    public function blog(){
        return view('blogs.blog');
    }

    public function createBlog(){
        return view('blogs.create-blog');
    }

    public function deleteBlog() {
        //delete process
        return 'deleting blog: '.Input::get('blog'); //magreturn ka dito ng kahit ano;
    }

    public function editBlog($id) {
        //render edit page
        return 'editing blog: ' . $id;
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
        $res = Blogs::orderBy('updated_at', 'desc')->raw(
            function($collection) use($user) {
                return $collection->find([
                    'user._id' => $user
                    ], 
                    ['sort' => ['updated_at' => -1]]);
            })->take($max);

        return [
            'total' => $res->count(),
            'blogs' => $res
        ];
    }

    public function react() {
        $blogId = Input::get('blog');
        $reaction = (int) Input::get('reaction');

        $blog = Blogs::find($blogId);
        $reactions = $blog->reactions ? $blog->reactions : [];
        
        $searched = false;
        $count = 0;
        foreach ($reactions as $value) { 
            if($value['_id'] == auth()->user()->_id) {
                $searched = true;
                if($value['reaction'] == $reaction) {
                    array_splice($reactions, $count);
                    break;
                } else {
                    $reactions[$count]['reaction'] = $reaction;
                    break;
                }
            }
            $count++;
        }

        if(!$searched) {
            array_push($reactions, [
                '_id' => auth()->user()->_id,
                'reaction' => $reaction
            ]);
        }

        $blog->reactions = $reactions;
        $blog->save();

        return $blog; 
    }

    public function comment() {
        $blogId = Input::get('blog');
        $comment = Input::get('comment');

        $blog = Blogs::find($blogId);
        $comments = $blog->comments ? $blog->comments : [];

        array_push($comments, [
            'content' => $comment,
            'user' => [
                '_id' => auth()->user()->_id,
                'image' => auth()->user()->image,
                'firstName' => auth()->user()->firstName,
                'lastName' => auth()->user()->lastName
            ],
            'dateAdded' => Carbon::now()
        ]);

        $blog->comments = $comments;
        $blog->save();

        return $blog;
    }

    public function updateProfile(Request $request){
        //get & move thumbnail
     
        $new = Blogs::select('user')->get();

        $fileImage = $request->file('file');
        $destination_path = 'img/avatar';
        if($fileImage == null) {
            $avatar = \Auth::user()->image;
        }else{
            $avatar = $fileImage->getClientOriginalName();
            $fileImage->move($destination_path, $avatar);     
        }

        $firstName = Input::get('firstName');
        $lastName = Input::get('lastName');
        $name = $firstName.' '.$lastName;
        $email = Input::get('email');
        $image = $avatar;

        $updateProfile = Profile::updateProfile($firstName, $lastName, $email, $name, $image);
       
        $blog = Blogs::select('user')->update(array(
                    'firstName' => $firstName,
                    'lastName' => $lastName,
                    'email' => $email,
                    'name' => $firstName.' '.$lastName,
                    'image' => $image
                ));




        return redirect('/profile/' . \Auth::user()->id);
    }
    
    public function create(Request $request){
        $categ = Input::get('category');
        if($request->file('file') == null){
            //TODO: Improve, change the filename of images according to its category or change this to switch case
            if($categ == 'Adventure'){
                $avatar = 'category8.jpeg';
            }
            if($categ == 'Entertainment'){
                $avatar = 'category1.jpeg';
            }
            if($categ == 'Politics'){
                $avatar = 'category2.jpeg';
            }
            if($categ == 'Nature'){
                $avatar = 'category3.jpeg';
            }
            if($categ == 'Education'){
                $avatar = 'category4.jpeg';
            }
            if($categ == 'Fashion'){
                $avatar = 'category5.jpeg';
            }
            if($categ == 'Technology'){
                $avatar = 'category6.jpeg';
            }
            if($categ == 'Sports'){
                $avatar = 'category7.jpeg';
            }
            if($categ == 'Others'){
                $avatar = 'profile_big.jpg';
            }

        }else{

            $fileImage = $request->file('file');
            $destination_path = 'img/company';

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
            "name" => auth()->user()->firstName.' '.auth()->user()->lastName,
            "email" => auth()->user()->email,
            "image" => auth()->user()->image
        ];
        $blog->save();

        return redirect('/posts');
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

    public function search() {
        $keyword = Input::get('search');
        
        return view('blogs.search', compact('keyword'));
    }

    public function filterBlogs() {
        $keyword = Input::get('keyword');

        $result = Blogs::where('title', 'regex', "/". $keyword ."/i" )->get();

        return $result;

    }

    public function filterUsers() {
        $keyword = Input::get('keyword');

        $result = User::where('name', 'regex', "/". $keyword ."/i" )->get();
        return $result; 
    }

    public function filterTags() {
        $keyword = Input::get('keyword');

        $result = Blogs::where('tags', 'regex', "/". $keyword ."/i" )->get();

        return $result;
    }
}
