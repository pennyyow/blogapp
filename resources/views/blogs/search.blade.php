@extends('layouts.master')

@section('content')
@section('styles')
    <link href="{{ asset('css/custom/posts.css') }}" rel="stylesheet">
@stop
	<div class="wrapper wrapper-content">
        <div class="row animated fadeInRight">
			<h1>Searching for: {{ $keyword }}</h1>
            <div class="btn-group">
                <button class="btn-white" id="btnSearchUsers">
                    Users
                </button>
                <button class="btn-white" id="btnSearchBlogs">
                    Blogs
                </button>
                <button class="btn-white" id="btnSearchTags">
                    Tags
                </button>
            </div>
			<div id="results"></div>
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
    
    <script src="{{ asset('js/blogs/search.js') }}"></script>
@stop