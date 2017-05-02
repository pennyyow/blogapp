@extends('layouts.master')

@section('content')
@section('styles')
    <link href="{{ asset('css/import/core.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/search.css') }}" rel="stylesheet">
@stop
    <title>BlogMoTo | Search</title>
	<div class="wrapper wrapper-content">
        <div class="row animated fadeInRight">
            <div class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs tabs">
                    <li class="active tab" >
                        <a href="#search-user" id="tab-user" data-toggle="tab" aria-expanded="false">
                            <span class="visible-xs"><i class="fa fa-home"></i></span>
                            <span class="hidden-xs">Users</span>
                        </a>
                    </li>
                    <li class="tab" >
                        <a href="#search-blog" id="tab-blog" data-toggle="tab" aria-expanded="false">
                            <span class="visible-xs"><i class="fa fa-user"></i></span>
                            <span class="hidden-xs">Blogs</span>
                        </a>
                    </li>
                    <li class="tab" >
                        <a href="#search-tag" id="tab-tag" data-toggle="tab" aria-expanded="true">
                            <span class="visible-xs"><i class="fa fa-envelope-o"></i></span>
                            <span class="hidden-xs">Tags</span>
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="search-user">
                    </div>
                    <div class="tab-pane" id="search-blog">
                    </div>
                    <div class="tab-pane" id="search-tag">
                    </div>
                </div>
            </div>
			
		</div>
	</div>
@endsection
@section('scripts')
    <script type="text/javascript">
        var Url = {
            filterBlogs: '{{ !auth()->guest() ? url('/filterBlogs') : url('/pub_filterBlogs')  }}',
            filterUsers: '{{ !auth()->guest() ? url('/filterUsers') : url('/pub_filterUsers')  }}',
            filterTags: '{{ !auth()->guest()  ? url('/filterTags') : url('/pub_filterTags') }}'
        };

        var token = '{{ csrf_token() }}';
        var keyword = '{{ $keyword }}';
    </script>
    <script src="{{ asset('css/import/waves.js') }}"></script>
    <script src="{{ asset('js/blogs/search.js') }}"></script>
@stop