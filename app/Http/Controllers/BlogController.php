<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Input;
use App\Blogs;
use App\Profile;
use DB;
use Carbon\Carbon;
use Response;
use File;
use DateTime;

class BlogController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function home(){
        $category = Input::get('category');
        return view('blogs.posts')->with([
           'category' => $category 
        ]);
    }

    public function profile($id){
        $user = User::find($id);
        $blogs = count(Blogs::where('user', '=', $id)->get());
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
            'blogs' => $blogs
        ]);
        }
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
        $blog = Blogs::find(Input::get('blog'));
        File::delete('img/company/'.$blog->image);
        $blog->delete();

        return 'deleting blog: '.Input::get('blog'); //magreturn ka dito ng kahit ano;
    }

    public function editBlog($id) {
        //render edit page
        $blog = Blogs::find($id);
        //return 'editing blog: ' . $blog;
        return view('blogs.edit-blog', compact('blog'));
    }

    public function listBlogs() {
        $max = (int) Input::get('max');
        $category = Input::get('category');
        $result = [];
        if($category) {
            $result = Blogs::orderBy('updated_at', 'desc')->raw(
            function($collection) use($category) {
                return $collection->find([
                    'category' => $category
                    ], 
                    ['sort' => ['updated_at' => -1]]);
            })->take($max);
        }
        else {
            $result = Blogs::orderBy('updated_at', 'desc')->take($max)->get();
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
                    ['sort' => ['updated_at' => -1]]);
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
            'user' => auth()->user()->_id,
            'dateAdded' => Carbon::now()
        ]);

        $blog->comments = $comments;
        $blog->save();

        return $blog;
    }

    public function updateProfile(Request $request){
        $user = auth()->user();
        $errors = [];
        if(Input::get('firstName') == '') {
            $errors['firstname'] = 'Please enter your first name';
        }

        if(Input::get('lastName') == '') {
            $errors['lastname'] = 'Please enter your last name';
        }

        $email = Input::get('email');
        if($email == null) {
            $errors['email'] = 'Please enter your email';
        } else {
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors['email'] = 'Please enter a valid email address';
            }

            $userByEmail = User::where('email', $email)->get();
            if(count($userByEmail) > 0) {
                if($userByEmail[0]->id != $user->id) {
                    $errors['email'] = 'Email is already in use';
                }
            }
        }

        if(count($errors) > 0) {
            return Response::json([
                'errors' => $errors
            ], 400);
        }

        $user->firstName = Input::get('firstName');
        $user->lastName = Input::get('lastName');
        $user->name = $user->firstName . ' ' . $user->lastName;
        $user->email = Input::get('email');

        $file = Input::get('file');

        if($file != null) {
            $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $file));
            $destination_path = 'img/avatar'; 
            file_put_contents('img/avatar/'.$user->id.'.png', $image);

            $user->image = $user->id.'.png';
        }

        $user->save();

        return $user;
    }

    public function editBlogContents(Request $request) {
        $errors = [];
        if(Input::get('title') == '') {
            $errors['title'] = '(Please enter a title)';
        }

        if(Input::get('description') == '') {
            $errors['description'] = '(Please enter a description)';
        }

        if(Input::get('content') == null) {
            $errors['content'] = '(Please enter a content)';
        }

        if(count($errors) > 0) {
            return Response::json([
                'errors' => $errors
            ], 400);
        }

        $blog = Blogs::find(Input::get('id'));
        $file = Input::get('file');

        if($file != '') {
            $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $file));
            $destination_path = 'img/company'; 
            file_put_contents('img/company/'.$blog->id.'.png', $image);

            $blog->image = $blog->id.'.png';
        }

        $blog->title = Input::get('title');
        $blog->category = Input::get('category');
        // $blog->tags = [];
        $blog->tags = $request->tags;
        if($blog->tags == $request->tags){
            $blog->tags = $request->tags;
        }else{
            $blog->tags = Input::get('tags');
        }
        $blog->description = Input::get('description');
        $blog->content = Input::get('content');
        $blog->save();

        return $blog;
    }
    
    public function create(Request $request) {
        $errors = [];
        if(Input::get('title') == '') {
            $errors['title'] = '(Please enter a title)';
        }

        if(Input::get('description') == '') {
            $errors['description'] = '(Please enter a description)';
        }

        if(Input::get('content') == null) {
            $errors['content'] = '(Please enter a content)';
        }

        if(count($errors) > 0) {
            return Response::json([
                'errors' => $errors
            ], 400);
        }

        $blog = new Blogs();

        $blog->title = Input::get('title');
        $blog->category = Input::get('category');
        $blog->tags = $request->tags;
        $blog->description = Input::get('description');
        $blog->content = Input::get('content');
        $blog->comments = [];
        $blog->user = auth()->user()->_id;
        $blog->save();

        if(!Input::get('file')) {
            $oldPath = 'img/company/'.Input::get('category').'.jpeg';
            $newPath = 'img/company/'.$blog->id.'.jpeg';

            if(\File::copy($oldPath, $newPath)) {
                $blog->image = $blog->id.'.jpeg';
                $blog->save();
            }
        }
        else {
            $file = Input::get('file');
            $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $file));
            $destination_path = 'img/company'; 
            file_put_contents('img/company/'.$blog->id.'.png', $image);

            $blog->image = $blog->id.'.png';
            $blog->save();
        }
        
        return $blog->_id;
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

    public function search() {
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
