@extends('layouts.master')

@section('content')
@section('styles')
    <link href="css/plugins/summernote/summernote.css" rel="stylesheet">
    <link href="css/plugins/summernote/summernote-bs3.css" rel="stylesheet">
    <link href="css/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.css" rel="stylesheet" />

    <link href="css/custom/create-blog.css" rel="stylesheet">
@stop
<title>BlogMoTo | Create Blog</title>

	<div class="wrapper wrapper-content">
        <div class="row animated fadeInRight">
            <div class="col-md-8 col-md-offset-2">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h3>Create Blog</h3>
                    </div>
                    <div class="ibox-content">
                    {!! Form::open(array('action' => array('BlogController@create'), 'method' => 'POST', 'id' => 'createForm', 'class' => 'form-vertical', 'files' => 'true', 'enctype' => 'multipart/form-data')) !!}
                        <!-- <form role="form"> -->
                            <div class="row">
                                <div class="col-sm-6 b-r">
                                    <div class="form-group">
                                        <label>Title</label>
                                        <input type="text" name="title" placeholder="Enter Title" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Category</label>
                                        <select name="category" class="form-control" id="selectCategory">
                                            <option value="Education">Education</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Politics">Politics</option>
                                            <option value="Adventure">Adventure</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Nature">Nature</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Tags</label>
                                        <select multiple name="tags[]" data-role="tagsinput" placeholder="Add tags">
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea placeholder="Enter Description" class="form-control" id="description" name="description" rows="5"></textarea>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                      <label for="formImg" class="border-dash" id="divAddImg">
                                        <div class="row">
                                          <div class="col-md-12 text-center">
                                            <span class="glyphicon glyphicon-plus-sign font-gray glyph-button">
                                            </span>
                                            <h3 class="font-gray mt-0">
                                              Upload thumbnail
                                            </h3>
                                          </div>
                                        </div>
                                      </label>
                                      <input type="file" name="file" id="formImg" accept="image/*" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 summernote-container">
                                    <h4>Content</h4>
                                    <input type="hidden" id="content" name="content">
                                    <div>
                                        <div class="summernote">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <button class="btn btn-white btn-sm m-t-n-xs" type="button">
                                        <i class="fa fa-times"></i>
                                        Cancel
                                    </button>
                                        <button class="btn btn-sm btn-primary m-t-n-xs" 
                                            type="submit" id="btn-create">
                                            <strong>
                                            <i class="fa fa-save"></i>
                                            Save Changes
                                            </strong>
                                        </button>
                                </div>
                            </div>
                        <!-- </form> -->
                        {!! Form::close() !!}
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
    <script src="js/blogs/create.js"></script>
@stop
