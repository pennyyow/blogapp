@extends('layouts.master')

@section('content')
@section('styles')
    <link href="{{ asset('css/custom/posts.css') }}" rel="stylesheet">
    <link href="{{ asset('css/plugins/slick/slick.css') }}" rel="stylesheet">
    <link href="{{ asset('css/plugins/slick/slick-theme.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/badge.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/index.css') }}" rel="stylesheet">
@stop


<title>BlogMoTo | Posts</title>
        <div class="row animated fadeInRight">
            <ul class="ul-style">
                <li class="li-style">
                    <div class="m-t">
                        @if(!auth()->guest())
                           <a href="{{ url('/posts?category=Adventure') }}" class="my-font hvr-grow">Adventure</a>
                        @else
                            <a href="{{ url('/pub_posts?category=Adventure') }}" class="my-font hvr-grow">Adventure</a>
                        @endif
                    </div>
                </li>
                <li class="li-style"> | </li>
                <li class="li-style">
                    <div class="m-t">
                    @if(!auth()->guest())
                        <a href="{{ url('/posts?category=Sports') }}" class="my-font hvr-grow">Sports</a>
                    @else
                        <a href="{{ url('/pub_posts?category=Sports') }}" class="my-font hvr-grow">Sports</a>
                    @endif
                    </div>
                </li>
                <li class="li-style"> | </li>
                <li class="li-style">
                    <div class="m-t">
                        @if(!auth()->guest())
                           <a href="{{ url('/posts?category=Entertainment') }}" class="my-font hvr-grow">Entertainment</a>
                        @else
                            <a href="{{ url('/pub_posts?category=Entertainment') }}" class="my-font hvr-grow">Entertainment</a>
                        @endif
                    </div>
                </li>
                <li class="li-style"> | </li>
                <li class="li-style">
                    <div class="m-t">
                        @if(!auth()->guest())
                            <a href="{{ url('/posts?category=Education') }}" class="my-font hvr-grow">Education</a>
                        @else
                            <a href="{{ url('/pub_posts?category=Education') }}" class="my-font hvr-grow">Education</a>
                        @endif
                    </div>
                </li>
                <li class="li-style"> | </li>
                <li class="li-style">
                    <div class="m-t">
                        @if(!auth()->guest())
                            <a href="{{ url('/posts?category=Technology') }}" class="my-font hvr-grow">Technology</a>
                        @else
                            <a href="{{ url('/pub_posts?category=Technology') }}" class="my-font hvr-grow">Technology</a>
                        @endif
                    </div>
                </li>
                <li class="li-style"> | </li>
                <li class="li-style">
                    <div class="m-t">
                        @if(!auth()->guest())
                            <a href="{{ url('/posts?category=Nature') }}" class="my-font hvr-grow">Nature</a>
                        @else
                            <a href="{{ url('/pub_posts?category=Nature') }}" class="my-font hvr-grow">Nature</a>
                        @endif
                    </div>
                </li>
                <li class="li-style"> | </li>
                <li class="li-style">
                    <div class="m-t">
                        @if(!auth()->guest())
                           <a href="{{ url('/posts?category=Politics') }}" class="my-font hvr-grow">Politics</a>
                        @else
                            <a href="{{ url('/pub_posts?category=Politics') }}" class="my-font hvr-grow">Politics</a>
                        @endif
                    </div>
                </li>
                <li class="li-style"> | </li>
                <li class="li-style">
                    <div class="m-t">
                        @if(!auth()->guest())
                        <a href="{{ url('/posts?category=Fashion') }}" class="my-font hvr-grow">Fashion</a>
                        @else
                           <a href="{{ url('/pub_posts?category=Fashion') }}" class="my-font hvr-grow">Fashion</a>
                        @endif
                    </div>
                </li>
                <li class="li-style"> | </li>
                <li class="li-style">
                    <div class="m-t">
                        @if(!auth()->guest())
                            <a href="{{ url('/posts?category=Others') }}" class="my-font hvr-grow">Others</a>
                        @else
                            <a href="{{ url('/pub_posts?category=Others') }}" class="my-font hvr-grow">Others</a>
                        @endif    
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-md-8 col-md-offset-2">
            @if($category)
                <h2 class="latest">Filtered by category: {{ $category }}</h2>
                <hr class="hrcss"/>
            @endif

            @if($tags)
                <h2 class="latest">Filtered by tags: {{ $tags }}</h2>
                <hr class="hrcss"/>
            @endif
            @if(!$category && !$tags)
                <h2 class="latest"><strong>Latest Blogs</strong></h2>
                <hr class="hrcss"/>
            @endif
        </div>
            
        <div id="blogs"></div>

@endsection
@section('scripts')
    <script type="text/javascript">
        var Url = {
            listBlogs: '{{ !auth()->guest() ? url('/listBlogs') : url('/pub_listBlogs')  }}',
            react: '{{ url('/react') }}',
            view: '{{ !auth()->guest() ? url('/view-blog') : url('/pub-view-blog')  }}',
            profile: '{{ !auth()->guest() ? url('/profile') : url('/pub_profile')  }}',
            posts: '{{ !auth()->guest() ? url('/posts') : url('/pub_posts')  }}'
        };

        var isGuest = (Url.listBlogs == '{{url('/listBlogs')}}' ? false : true);
        var category = '{{ $category }}';
        var tags = '{{ $tags }}';
        var token = '{{ csrf_token() }}';
    </script>
    <script src="{{ asset('js/plugins/slick/slick.min.js') }}"></script>
    
    <script src="{{ asset('js/blogs/index.js') }}"></script>
@stop