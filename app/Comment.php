<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use App\User;
use DB;
use Input;

class Comment extends Eloquent
{
   protected $connection = 'mongodb';
   protected $collection = 'comments';
}
