@extends('layouts.master')

@section('content')
@section('styles')
    <link href="{{ asset('css/custom/posts.css') }}" rel="stylesheet">
    <link href="{{ asset('css/plugins/slick/slick.css') }}" rel="stylesheet">
    <link href="{{ asset('css/plugins/slick/slick-theme.css') }}" rel="stylesheet">
@stop
<title>BlogMoTo | Posts</title>

    <div class="wrapper wrapper-content">
        <div class="row animated fadeInRight">
            <div class="regular slider">
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic1" src="{{ asset('img/company/category8.jpeg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Adventure</a>
                                <div class="m-t">
                                    <a href="" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                    <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic1" value="Adventure">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic2" src="{{ asset('img/company/category7.jpeg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Sports</a>
                                <div class="m-t">
                                    <a href="#" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                    <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic2" value="Sports">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic3" src="{{ asset('img/company/category1.jpeg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Entertainment</a>
                                <div class="m-t">
                                    <a href="#" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                    <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic3" value="Entertainment">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic4" src="{{ asset('img/company/category4.jpeg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Education</a>
                                <div class="m-t">
                                    <a href="#" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                    <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic4" value="Education">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic5" src="{{ asset('img/company/category6.jpeg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Technology</a>
                                <div class="m-t">
                                    <a href="#" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                    <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic5" value="Technology">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic6" src="{{ asset('img/company/category3.jpeg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Nature</a>
                                <div class="m-t">
                                    <a href="#" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                    <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic6" value="Nature">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic7" src="{{ asset('img/company/category2.jpeg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Politics</a>
                                <div class="m-t">
                                    <a href="#" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                   <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic7" value="Politics">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic8" 
                                src="{{ asset('img/company/category5.jpeg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Fashion</a>
                                <div class="m-t">
                                    <a href="#" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                    <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic8" value="Fashion">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="ibox">
                        <div class="ibox-content product-box">
                            <div class="product-imitation">
                                <img alt="image" class="img-responsive" id="pic9" 
                                src="{{ asset('img/profile_big.jpg') }}">
                            </div>
                            <div class="product-desc">
                                <a href="#" class="product-name">Others</a>
                                <div class="m-t">
                                    <a href="#" class="btn btn-xs btn-outline btn-primary">
                                        <i class="fa fa-bars"></i> View All
                                    </a>
                                   <button type="button" class="btn btn-xs btn-outline btn-primary btn-category" data-image="pic9" value="Others">
                                        <i class="fa fa-plus"></i> Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="blogs"></div>
        </div>
    </div>

@endsection
@section('scripts')
    <script type="text/javascript">
        var Url = {
            listBlogs: '{{ !auth()->guest() ? url('/listBlogs') : url('/pub_listBlogs')  }}',
            react: '{{ url('/react') }}',
            view: '{{ !auth()->guest() ? url('/view-blog') : url('/pub-view-blog')  }}',
            profile: '{{ url('/profile') }}'
        };

        var isGuest = (Url.listBlogs == '{{url('/listBlogs')}}' ? false : true);

        var token = '{{ csrf_token() }}';
    </script>
    <script src="{{ asset('js/plugins/slick/slick.min.js') }}"></script>
    
    <script src="{{ asset('js/blogs/index.js') }}"></script>
@stop