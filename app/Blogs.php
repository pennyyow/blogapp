<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use App\User;
use DB;
use Input;

class Blogs extends Eloquent
{
   protected $connection = 'mongodb';
   protected $collection = 'blogs';

   public function user()
		{
		    return $this->belongsTo('user');
		}
}
