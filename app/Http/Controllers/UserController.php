<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use App\User;
use App\Profile;
use Input;

class UserController extends Controller
{
    public function profile(){
        $user = User::get();
    	return view('blogs.profile', compact('user'));
    }

    public function updateProfile(Request $request){
        //get & move thumbnail
	    $fileImage = $request->file('file');
        $destination_path = 'img/avatar';
        if($fileImage == null){
        	$avatar = \Auth::user()->image;
        }else{
        	$avatar = $fileImage->getClientOriginalName();
        	$fileImage->move($destination_path, $avatar);
        }

        $firstName = Input::get('firstName');
        $lastName = Input::get('lastName');
        $email = Input::get('email');
        $image = $avatar;   

        $updateProfile = Profile::updateProfile($firstName, $lastName, $image);
        return redirect('/profile');
    }
}
