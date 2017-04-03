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

/*Route::get('/', function () {
    return view('welcome');
});*/

// Route::get('/check', 'CheckController@check');
/*Route::get('/index', 'CheckController@index');
Route::get('/create', 'CheckController@create');
Route::post('/storeBlog', 'CheckController@store');
Route::post('/blogs/{id}', 'CheckController@show');*/


Auth::routes();

Route::get('/posts', 'BlogController@home');
Route::get('/profile', 'BlogController@profile');
Route::get('/categories', 'BlogController@categories');
Route::get('/', function () {
    return view('auth.login');
});