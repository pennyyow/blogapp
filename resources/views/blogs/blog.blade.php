@extends('layouts.master')

@section('content')
@section('styles')
    <link href="{{ asset('css/custom/blog.css') }}" rel="stylesheet">
@stop
<title>BlogMoTo | Blog</title>

    <div class="wrapper wrapper-content  animated fadeInRight article">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="ibox">
                    <div id="blog"></div>
                </div>
            </div>
        </div>
    </div>


@endsection

@section('scripts')
    <script type="text/javascript">
        var Url = {
            react: '{{ url('/react') }}',
            comment: '{{ url('/comment') }}',
            getBlog: '{{ !auth()->guest() ? url('/get-blog') : url('/pub-get-blog')  }}',
            profile: '{{ !auth()->guest() ? url('/profile') : url('/pub_profile')  }}',
            posts: '{{ !auth()->guest() ? url('/posts') : url('/pub_posts')  }}'
        }; 

        var isGuest = ('{{auth()->guest()}}' != '1' ? false : true);
        var blogId = '{{ $blog->_id }}';
        var tags = '{{ $tags }}';
        var token = '{{ csrf_token() }}';
    </script>
    <script src="{{ asset('js/blogs/view.js') }}"></script>
@stop