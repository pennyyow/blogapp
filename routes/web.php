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
	Route::get('/profile/{id}', 'BlogController@profile');
	Route::get('/categories', 'BlogController@categories');
	Route::get('/blog', 'BlogController@blog');
	Route::get('/create-blog', 'BlogController@createBlog');
	Route::get('/view-blog/{id}', 'BlogController@view');
	Route::get('/edit-blog/{id}', 'BlogController@editBlog');
	Route::post('/delete-blog', 'BlogController@deleteBlog');
	Route::post('/profile/update', 'BlogController@updateProfile');
	Route::post('/create', 'BlogController@create');
	Route::post('/listBlogs', 'BlogController@listBlogs');
	Route::post('/react', 'BlogController@react');
	Route::post('/comment', 'BlogController@comment');
	Route::post('/get-blog', 'BlogController@getBlog');
	Route::post('/listBlogsByUser', 'BlogController@listBlogsByUser');

    //only guests can access these routes
	Route::get('/profile/{id}', 'GuestController@profile');
	Route::post('/pub-get-blog', 'GuestController@getBlog');
	Route::get('/pub-view-blog/{id}', 'GuestController@view');
  Route::get('/pub_posts', 'GuestController@home');
  Route::post('/pub_listBlogs', 'GuestController@listBlogs');
	Route::get('/pub_categories', 'GuestController@categories');
	Route::post('/pub-listBlogsByUser', 'GuestController@listBlogsByUser');
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