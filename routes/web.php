<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/', function () {
	    return view('auth.login');
	});


    //only authorized users can access these routes
    Route::get('/posts', 'BlogController@home');
	Route::get('/categories', 'BlogController@categories');
	Route::get('/blog', 'BlogController@blog');
	Route::get('/create-blog', 'BlogController@createBlog');
	Route::post('/create', 'BlogController@create');

	Route::get('/profile', 'UserController@profile');
	Route::post('/profile/update', 'UserController@updateProfile');

	




    //only guests can access these routes
    Route::get('/pub_posts', 'GuestController@home');
	Route::get('/pub_categories', 'GuestController@categories');
	// Route::get('/create-blog', 'BlogController@createBlog');


	/*Route::group(['middleware' =>  'web'], function () {
		
		Route::get('auth/facebook', [
			'as' => 'auth-facebook',
			'uses' => '\App\Http\Controllers\UserController@redirectToProvider'
		]);

		Route::get('auth/facebook/callback', [
			'as' => 'facebook-callback',
			'uses' => '\App\Http\Controllers\UserController@handleProviderCallback'
		]);
	});*/

	Route::get('auth/facebook', 'Auth\RegisterController@redirectToProvider');
	Route::get('auth/facebook/callback', 'Auth\RegisterController@handleProviderCallback');