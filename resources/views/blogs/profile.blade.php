@extends('layouts.master')

@section('content')
@section('styles')
    <link href="css/custom/profile.css" rel="stylesheet">
@stop
<title>BlogMoTo | Profile</title>

    <div class="wrapper wrapper-content">
        <div class="col-md-offset-1 col-md-10">
            <div class="row animated fadeInRight">
                <div class="col-md-4">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Profile Detail</h5>
                        </div>
                        <div>
                            <div class="ibox-content no-padding border-left-right">
                                <!-- <img alt="image" class="img-responsive" src="img/profile_big.jpg"> -->
                                @if(!auth()->user()->image == null)
                                <img src="{{ asset('img/avatar/' . auth()->user()->image) }}" alt="image" class="img-responsive">
                                @else
                                <img src="{{ asset('img/avatar/152.jpg') }}" alt="image" class="img-responsive">
                                @endif
                            </div>
                            <div class="ibox-content profile-content">
                                <h3><p><i class="fa fa-user"></i><strong> {{ auth()->user()->firstName }} {{ auth()->user()->lastName }}</strong></p></h3>
                                <p><i class="fa fa-envelope"></i> {{ auth()->user()->email }}</p>
                                
                                <div class="user-button">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-primary btn-sm btn-block" 
                                            data-toggle="modal" href="#modal-form">
                                                <i class="fa fa-edit"></i> Edit Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="modal-form" class="modal fade" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-sm-6 b-r">
                                            <h3 class="m-t-none m-b">Edit Profile</h3>
                                            {!! Form::open(array('action' => array('BlogController@updateProfile'), 'method' => 'POST', 'id' => 'form1', 'class' => 'form-vertical', 'files' => 'true', 'enctype' => 'multipart/form-data')) !!}

                                            <!-- <form role="form" action="" method="post" enctype="multipart/form-data"> -->
                                                <div class="form-group">
                                                    <input type="text" placeholder="Enter First Name" name="firstName" class="form-control" value="{{ auth()->user()->firstName }}">
                                                </div>
                                                <div class="form-group">
                                                    <input type="text" placeholder="Enter Last Name" name="lastName" class="form-control" value="{{ auth()->user()->lastName }}">
                                                </div>
                                                <div class="form-group"> 
                                                    <input type="email" placeholder="Enter email" name="email" class="form-control" value="{{ auth()->user()->email }}">
                                                </div>
                                                <div>
                                                    <button class="btn btn-white btn-sm" type="button" data-dismiss="modal">
                                                        <i class="fa fa-times"></i>
                                                        Cancel
                                                    </button>
                                                        <button class="btn btn-sm btn-primary" 
                                                            type="submit">
                                                            <strong>
                                                            <i class="fa fa-save"></i>
                                                            Save Changes
                                                            </strong>
                                                        </button>
                                                </div>
                                            <!-- </form> -->

                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <img alt="image" class="img-responsive" id="profile-image-edit" name="file" src="img/profile_big.jpg">
                                            </div>
                                            <div>
                                                <label id="btnInputImage" for="inputImage" class="btn btn-sm btn-info block m-t-n-xs">
                                                    <input type="file" name="file" id="inputImage" class="hidden">
                                                    <strong> 
                                                    <i class="fa fa-upload"></i>
                                                    Upload Profile Picture
                                                    </strong>
                                                </label>
                                            </div>
                                        </div>
                                    {!! Form::close() !!}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Blogs</h5>
                        </div>
                        <div class="ibox-content">
                            <div class="ibox float-e-margins blog-posts">
                                <div class="ibox-title blog-content">
                                    <div class="ibox-tools">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                                            <i class="fa fa-chevron-down"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-user">
                                            <li><a href="#"><i class="fa fa-edit"></i> Edit</a>
                                            </li>
                                            <li><a href="#"><i class="fa fa-trash"></i> Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ibox-content">
                                    <div class="row">
                                        <div class="col-md-4 no-padding">
                                            <img alt="image" class="img-responsive" src="img/company/gal3.jpg">
                                        </div>
                                        <div class="col-md-8">
                                            <a href="#" class="btn-link">
                                                <h1><strong>Caleb | 1st Birthday</strong></h1>
                                            </a>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <div>
                                                Posted by 
                                                <a href="#" class="btn-link">
                                                    <strong>
                                                        John Patrick S. Bagacina
                                                    </strong>
                                                </a> 
                                                <span class="text-muted">
                                                    <i class="fa fa-clock-o"></i> 04 Jan 2017
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ibox-footer">
                                    <div class="pull-right">
                                        <p>
                                            <i class="fa fa-thumbs-up"></i> 100 Likes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-thumbs-down"></i> 80 Dislikes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-comments"></i> 50 Comments
                                        </p>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like
                                        </button>
                                        <button class="btn btn-white btn-xs dislike-on"><i class="fa fa-thumbs-down"></i> Dislike
                                        </button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
                                    </div>
                                </div>
                            </div>
                            <div class="ibox float-e-margins blog-posts">
                                <div class="ibox-title blog-content">
                                    <div class="ibox-tools">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                                            <i class="fa fa-chevron-down"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-user">
                                            <li><a href="#"><i class="fa fa-edit"></i> Edit</a>
                                            </li>
                                            <li><a href="#"><i class="fa fa-trash"></i> Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ibox-content">
                                    <div class="row">
                                        <div class="col-md-4 no-padding">
                                            <img alt="image" class="img-responsive" src="img/company/gal3.jpg">
                                        </div>
                                        <div class="col-md-8">
                                            <a href="#" class="btn-link">
                                                <h1><strong>Caleb | 1st Birthday</strong></h1>
                                            </a>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <div>
                                                Posted by 
                                                <a href="#" class="btn-link">
                                                    <strong>
                                                        John Patrick S. Bagacina
                                                    </strong>
                                                </a> 
                                                <span class="text-muted">
                                                    <i class="fa fa-clock-o"></i> 04 Jan 2017
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ibox-footer">
                                    <div class="pull-right">
                                        <p>
                                            <i class="fa fa-thumbs-up"></i> 100 Likes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-thumbs-down"></i> 80 Dislikes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-comments"></i> 50 Comments
                                        </p>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like
                                        </button>
                                        <button class="btn btn-white btn-xs dislike-on"><i class="fa fa-thumbs-down"></i> Dislike
                                        </button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
                                    </div>
                                </div>
                            </div>
                            <div class="ibox float-e-margins blog-posts">
                                <div class="ibox-title blog-content">
                                    <div class="ibox-tools">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                                            <i class="fa fa-chevron-down"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-user">
                                            <li><a href="#"><i class="fa fa-edit"></i> Edit</a>
                                            </li>
                                            <li><a href="#"><i class="fa fa-trash"></i> Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ibox-content">
                                    <div class="row">
                                        <div class="col-md-4 no-padding">
                                            <img alt="image" class="img-responsive" src="img/company/gal3.jpg">
                                        </div>
                                        <div class="col-md-8">
                                            <a href="#" class="btn-link">
                                                <h1><strong>Caleb | 1st Birthday</strong></h1>
                                            </a>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <div>
                                                Posted by 
                                                <a href="#" class="btn-link">
                                                    <strong>
                                                        John Patrick S. Bagacina
                                                    </strong>
                                                </a> 
                                                <span class="text-muted">
                                                    <i class="fa fa-clock-o"></i> 04 Jan 2017
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ibox-footer">
                                    <div class="pull-right">
                                        <p>
                                            <i class="fa fa-thumbs-up"></i> 100 Likes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-thumbs-down"></i> 80 Dislikes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-comments"></i> 50 Comments
                                        </p>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like
                                        </button>
                                        <button class="btn btn-white btn-xs dislike-on"><i class="fa fa-thumbs-down"></i> Dislike
                                        </button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
                                    </div>
                                </div>
                            </div>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready( function()  {
            var $inputImage = $("#inputImage");
            if (window.FileReader) {
                $inputImage.change(function() {
                    var fileReader = new FileReader(),
                            files = this.files,
                            file;
                    if (!files.length) {
                        return;
                    }

                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function () {
                            $('#profile-image-edit').attr('src', this.result);
                        };
                    } else {
                        showMessage("Please choose an image file.");
                    }
                });
            } 
        });

    </script>
@endsection