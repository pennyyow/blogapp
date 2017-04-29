<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use App\User;

class Profile extends Eloquent
{
	 protected $connection = 'mongodb';
     protected $collection = 'users';

    public static function updateProfile($firstName, $lastName, $email, $name, $image){
        $query = User::where('_id', \Auth::user()->id)
               ->update([
                    'firstName' => $firstName,
                    'lastName' => $lastName,
                    'email' => $email,
                    'name' => $firstName.' '.$lastName,
                    'image' => $image
                  ]);            
        return $query;
      }
}
