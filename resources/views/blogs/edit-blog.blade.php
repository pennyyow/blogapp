@extends('layouts.master')

@section('content')
@section('styles')
    <link href="{{ asset('css/plugins/summernote/summernote.css') }}" rel="stylesheet">
    <link href="{{ asset('css/plugins/summernote/summernote-bs3.css') }}" rel="stylesheet">
    <link href="{{ asset('css/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.css') }}" rel="stylesheet" />

    <link href="{{ asset('css/custom/create-blog.css') }}" rel="stylesheet">
@stop
<title>BlogMoTo | Edit Blog</title>

	<div class="wrapper wrapper-content">
        <div class="row animated fadeInRight">
            <div class="col-md-8 col-md-offset-2">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h3>Edit Blog</h3>
                    </div>
                    <div class="ibox-content">
                        {!! Form::open(array('action' => array('BlogController@create'), 'method' => 'POST', 'id' => 'createForm', 'class' => 'form-vertical create-form', 'files' => 'true', 'enctype' => 'multipart/form-data')) !!}
                            <div class="row">
                                <div class="col-sm-6 b-r">
                                    <div class="form-group title">
                                        <input type="hidden" name="id" value="{{ $blog->_id }}">
                                        <label class="control-label title-label">Title&nbsp;&nbsp;</label>
                                        <input type="text" name="title" placeholder="Enter Title" class="form-control" value="{{ $blog->title }}">
                                    </div>
                                    <div class="form-group">
                                        <label>Category</label>
                                        <select name="category" class="form-control" id="selectCategory">
                                            @foreach (['Education', 'Technology', 'Politics', 'Adventure', 'Sports', 'Fashion', 'Entertainment', 'Nature', 'Others'] as $category)
                                                <option value="{{ $category }}" {{ $category == $blog->category ? 'selected' : '' }}>
                                                    {{ $category }}
                                                </option>
                                            @endforeach
                                            <!-- <option value="Education" selected="selected">Education</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Politics">Politics</option>
                                            <option value="Adventure">Adventure</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Nature">Nature</option>
                                            <option value="Others">Others</option> -->
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Tags</label>
                                        <select multiple name="tags[]" data-role="tagsinput" placeholder="Add tags" id="tags">
                                            @if($blog->tags)
                                            @foreach ($blog->tags as $tag)
                                                <option value='{{ $tag }}'>{{ $tag }}</option>
                                            @endforeach
                                            @endif
                                        </select>
                                    </div>
                                    <div class="form-group description">
                                        <!-- <label class="control-label description-label">
                                            Description&nbsp;&nbsp;
                                        </label>
                                        <textarea placeholder="Enter Description" class="form-control" 
                                            id="description" name="description" rows="5">{{ $blog->description }}</textarea> -->
                                        <input type="hidden" id="description" name="description">
                                        <div class="form-group description">
                                            <label class="control-label description-label">Description&nbsp;&nbsp;</label>
                                            <div class="form-control description-textbox" 
                                            data-text="Enter description" contenteditable="true">
                                            </div>
                                        </div>
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
                                <div class="col-md-12 summernote-container form-group">
                                    <label class="control-label content-label">Content</label>
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
                        {!! Form::close() !!}
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
    <script type="text/javascript">
        var Url = {
            posts: '{{ url('/posts') }}',
            editBlogContents: '{{ url('/editBlogContents') }}',
            profile: '{{ url('/profile') }}'
        };

        var category = '{{ $blog->category }}';
        var image = '{{ $blog->image }}';

        $('.summernote').summernote();
        $('.description-textbox').html("{!! $blog->description !!}");
        $('.note-editable').html("{!! $blog->content !!}");
    </script>
    <script src="{{ asset('js/blogs/edit.js') }}"></script>
@stop
