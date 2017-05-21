@extends('layouts.master')

@section('content')
@section('styles')
    <link href="{{ asset('css/import/core.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/search.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/badge.css') }}" rel="stylesheet">
@stop

</style>
    <title>BlogMoTo | Search</title>
    <div class="wrapper wrapper-content">
        <div class="row animated fadeInRight">
            <div class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs tabs">
                    <li class="active tab" >
                        <a href="#search-user" id="tab-user" data-toggle="tab" aria-expanded="false">
                            <span class="visible-xs badge1" data-badge="{{ $filteredUsers }}"><i class="fa fa-home"></i></span>
                            <span class="label label-info">{{ $filteredUsers }}</span>  <span class="hidden-xs badge1">Users</span>
                        </a>
                    </li>
                    <li class="tab" >
                        <a href="#search-blog" id="tab-blog" data-toggle="tab" aria-expanded="false">
                            <span class="visible-xs badge1" data-badge="{{ $filteredBlogs }}"><i class="fa fa-user"></i></span>
                            <span class="label label-info">{{ $filteredBlogs }}</span>  <span class="hidden-xs badge1">Blogs</span>
                        </a>
                    </li>
                    <li class="tab" >
                        <a href="#search-tag" id="tab-tag" data-toggle="tab" aria-expanded="true">
                            <span class="visible-xs badge1" data-badge="{{ $filteredTags }}"><i class="fa fa-envelope-o"></i></span>
                            <span class="label label-info">{{ $filteredTags }}</span>  <span class="hidden-xs badge1">Tags</span>
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
            filterTags: '{{ !auth()->guest()  ? url('/filterTags') : url('/pub_filterTags') }}',
            view: '{{ !auth()->guest() ? url('/view-blog') : url('/pub-view-blog')  }}',
            profile: '{{ !auth()->guest() ? url('/profile') : url('/pub_profile')  }}',
            posts: '{{ !auth()->guest() ? url('/posts') : url('/pub_posts') }}'
        };

        var isGuest = '{{ (!auth()->guest() ? url('/listBlogs') : url('/pub_listBlogs')) }}' == '{{url('/listBlogs')}}' ? false : true;
        var token = '{{ csrf_token() }}';
        var keyword = '{{ $keyword }}';
        var tags = '{{ $tags }}'
    </script>
    <script src="{{ asset('css/import/waves.js') }}"></script>
    <script src="{{ asset('js/blogs/search.js') }}"></script>
@stop