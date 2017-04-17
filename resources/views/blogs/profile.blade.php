@extends('layouts.master')

@section('content')
@section('styles')
    <!-- Sweet Alert -->
    <link href="{{ asset('css/plugins/sweetalert/sweetalert.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/profile.css') }}" rel="stylesheet">
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
                                <img src="{{ $image ? asset('img/avatar/' . $image) : asset('img/avatar/152.jpg') }}" alt="image" class="img-responsive">                                
                            </div>
                            <div class="ibox-content profile-content">
                                <h3><p><i class="fa fa-user"></i><strong> {{ $firstName }} {{ $lastName }}</strong></p></h3>
                                <p><i class="fa fa-envelope"></i> {{ $email }}</p>
                                @if(!auth()->guest())
                                    @if(auth()->user()->_id == $_id)
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
                                    @endif
                                @endif
                            </div>
                        </div>
                    </div>
                    @if(!auth()->guest())
                        @if(auth()->user()->_id == $_id)
                            <div id="modal-form" class="modal fade" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-sm-6 b-r">
                                                    <h3 class="m-t-none m-b">Edit Profile</h3>
                                                    {!! Form::open(array('action' => array('BlogController@updateProfile'), 'method' => 'POST', 'id' => 'form1', 'class' => 'form-vertical', 'files' => 'true', 'enctype' => 'multipart/form-data')) !!}
                                                        <div class="form-group">
                                                            <input type="text" placeholder="Enter First Name" name="firstName" class="form-control" value="{{ $firstName }}">
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" placeholder="Enter Last Name" name="lastName" class="form-control" value="{{ $lastName }}">
                                                        </div>
                                                        <div class="form-group"> 
                                                            <input type="email" placeholder="Enter email" name="email" class="form-control" value="{{ $email }}">
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
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <img alt="image" class="img-responsive" id="profile-image-edit" name="file" 
                                                        src="{{ asset('img/profile_big.jpg') }}">
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
                        @endif
                    @endif
                </div>
                <div class="col-md-8">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Blogs</h5>
                        </div>
                        <div class="ibox-content">
                            <div id="blogs"></div>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <!-- Sweet alert -->
    <script src="{{ asset('js/plugins/sweetalert/sweetalert.min.js') }}"></script>

    <script>
        var Url = {
            listBlogs: '{{ !auth()->guest() ? url('/listBlogs') : url('/pub_listBlogs')  }}',
            react: '{{ url('/react') }}',
            view: '{{ !auth()->guest() ? url('/view-blog') : url('/pub-view-blog')  }}',
            profile: '{{ url('/profile') }}',
            listBlogsByUser: '{{ !auth()->guest() ? url('/listBlogsByUser') : url('/pub-listBlogsByUser') }}',
            editBlog: '{{ url('/edit-blog') }}',
            deleteBlog: '{{ url('/delete-blog') }}'
        };

        var isGuest = (Url.listBlogs == '{{url('/listBlogs')}}' ? false : true);
        var userProfile = '{{ $_id }}';

        var token = '{{ csrf_token() }}';
    </script>

    <script src="{{ asset('js/blogs/profile.js') }}"></script>
@stop
