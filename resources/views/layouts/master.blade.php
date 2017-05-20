<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('font-awesome/css/font-awesome.css') }}" rel="stylesheet">
    <link href="{{ asset('css/plugins/toastr/toastr.min.css') }}" rel="stylesheet">
    <link href="{{ asset('js/plugins/gritter/jquery.gritter.css') }}" rel="stylesheet">
    <link href="{{ asset('css/animate.css') }}" rel="stylesheet">  

    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    @yield('styles')
    <link href="{{ asset('css/custom/master.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/categories.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/scroll-top.css') }}" rel="stylesheet">

    <script src="{{ asset('js/jquery-2.1.1.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <link href="{{ asset('css/hover-min.css') }}" rel="stylesheet" media="all">

    <!-- REACT COMPONENTS -->
    <script src="{{ asset('js/react/react.js') }}"></script>
    <script src="{{ asset('js/react/react-dom.js') }}"></script>
    <script src="{{ asset('js/react-components.js') }}"></script>
    <script type="text/javascript">
        var user = null;
    </script>

    <script src="http://momentjs.com/downloads/moment.min.js"></script>
    <script src="https://momentjs.com/downloads/moment-timezone-with-data.min.js"></script>
    <script>
        moment().format();
    </script>

</head>

<body class="gray-bg">
@if(!auth()->guest())
    <div class="row">
        <nav class="navbar navbar-fixed-top" role="navigation" style="margin-bottom: 0">
            <div class="container">
                <div class="navbar-header">
                    <a class="logo hvr-grow" href="{{ url('/posts') }}">
                        BlogMoTo
                    </a>
                    {!! Form::open(array('action' => array('BlogController@search'), 'role' => 'search', 'method' => 'GET', 'id' => 'createForm', 'class' => 'app-search')) !!}
                        <div class="form-group lining">
                            <input type="text" placeholder="Search for something..." name="search" id="top-search" class="form-control app-search-input">
                            <button id="top-search" class="btn btn-primary my-button"><i class="fa fa-search"></i></button>
                        </div>
                    {!! Form::close() !!}
                </div>
                <div class="tooltip-demo">
                    <ul class="nav navbar-top-links navbar-right pull-right">
                         <li data-toggle="tooltip" data-placement="bottom" title="Create Blog" class="hvr-grow">
                            <a href="{{ url('/create-blog') }}">
                                <i class="fa fa-plus icon"></i>
                            </a>
                        </li>
                        <li> | </li>
                        <li data-toggle="tooltip" data-placement="bottom" title="Home" class="hvr-grow">
                            <a href="{{ url('/posts') }}">
                                <i class="fa fa-home icon"></i>
                            </a>
                        </li>
                        <li data-toggle="tooltip" data-placement="bottom" title="Profile" class="hvr-grow">
                            <a href="{{ url('/profile/'.auth()->user()->_id) }}">
                                <i class="fa fa-user icon"></i>
                            </a>
                        </li>
                        <li class="dropdown hvr-grow" data-toggle="tooltip" data-placement="bottom" title="Notifications">
                            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#" aria-expanded="false">
                                <i class="fa fa-globe icon"></i>  <span class="label label-warning">16</span>
                            </a>
                            <ul class="dropdown-menu dropdown-messages">
                                <li class="text-center notifi-title">Notifications</li>
                                <li>
                                    <a href="#">
                                        <div class="dropdown-messages-box">
                                            <div class="pull-left">
                                                <img alt="image" class=" user-photo" src="img/a4.jpg">
                                            </div>
                                            <div class="media-body ">
                                                <small class="pull-right text-navy">5h ago</small>
                                                <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
                                                <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div class="dropdown-messages-box">
                                            <div class="pull-left">
                                                <img alt="image" class=" user-photo" src="img/a4.jpg">
                                            </div>
                                            <div class="media-body ">
                                                <small class="pull-right text-navy">5h ago</small>
                                                <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
                                                <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div class="dropdown-messages-box">
                                            <div class="pull-left">
                                                <img alt="image" class=" user-photo" src="img/a4.jpg">
                                            </div>
                                            <div class="media-body ">
                                                <small class="pull-right text-navy">5h ago</small>
                                                <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
                                                <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div class="dropdown-messages-box">
                                            <div class="pull-left">
                                                <img alt="image" class=" user-photo" src="img/a4.jpg">
                                            </div>
                                            <div class="media-body ">
                                                <small class="pull-right text-navy">5h ago</small>
                                                <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
                                                <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <div class="text-center link-block">
                                        <a href="mailbox.html">
                                            <strong>See All Notifications</strong>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li data-toggle="tooltip" data-placement="bottom" title="Categories" class="hvr-grow">
                            <a href="#categories" data-toggle="modal">
                                <i class="fa fa-th-large icon"></i>
                            </a>
                        </li>
                        <li> | </li>
                        <li data-toggle="tooltip" data-placement="bottom" title="Logout" class="hvr-grow">
                            <a href="{{ route('logout') }}"
                                onclick="event.preventDefault();
                                         document.getElementById('logout-form').submit();">
                                <i class="fa fa-sign-out icon"></i>
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                {{ csrf_field() }}
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div> 

    <script type="text/javascript">
        user = {
            id: '{{auth()->user()->_id}}',
            image: '{{auth()->user()->image}}'
        };
    </script>
@else
    <div class="row">
        <nav class="navbar navbar-fixed-top" role="navigation" style="margin-bottom: 0">
            <div class="container">
                <div class="navbar-header">
                    <a class="logo hvr-grow" href="posts">
                        BlogMoTo
                    </a>
                    <form method="GET" action="{{ url('/pubSearch') }}" id="createForm" class="app-search">
                        <div class="form-group">
                            <input type="text" placeholder="Search for something..." name="search" id="top-search" class="form-control app-search-input">
                            <a href=""><i class="fa fa-search"></i></a>
                        </div>
                    </form>
                </div>
                <div class="tooltip-demo">
                    <ul class="nav navbar-top-links navbar-right pull-right">
                        <li data-toggle="tooltip" data-placement="bottom" title="Home">
                            <a href="{{ url('/pub_posts') }}">
                                <i class="fa fa-home icon"></i>
                            </a>
                        </li>
                      
                        <li data-toggle="tooltip" data-placement="bottom" title="Categories">
                            <a href="#categories" data-toggle="modal">
                                <i class="fa fa-th-large icon"></i>
                            </a>
                        </li>
                        <li data-toggle="tooltip" data-placement="bottom" title="Login">
                            <a href="{{ url('/') }}">
                                <i class="fa fa-sign-in icon"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>  
@endif

<div id="categories" class="modal fade" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic1" src="{{ asset('img/company/category8.jpeg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Adventure') }}" class="product-name">Adventure</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Adventure') }}" class="btn btn-xs btn-outline btn-primary">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic2" src="{{ asset('img/company/category7.jpeg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Sports') }}" class="product-name">Sports</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Sports') }}" class="btn btn-xs btn-outline btn-primary">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic3" src="{{ asset('img/company/category1.jpeg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Entertainment') }}" class="product-name">Entertainment</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Entertainment') }}" class="btn btn-xs btn-outline btn-primary">
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
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic4" src="{{ asset('img/company/category4.jpeg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Education') }}" class="product-name">Education</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Education') }}" class="btn btn-xs btn-outline btn-primary">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic5" src="{{ asset('img/company/category6.jpeg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Technology') }}" class="product-name">Technology</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Technology') }}" class="btn btn-xs btn-outline btn-primary">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic6" src="{{ asset('img/company/category3.jpeg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Nature') }}" class="product-name">Nature</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Nature') }}" class="btn btn-xs btn-outline btn-primary">
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
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic7" src="{{ asset('img/company/category2.jpeg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Politics') }}" class="product-name">Politics</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Politics') }}" class="btn btn-xs btn-outline btn-primary">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic8" 
                                            src="{{ asset('img/company/category5.jpeg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Fashion') }}" class="product-name">Fashion</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Fashion') }}" class="btn btn-xs btn-outline btn-primary">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic9" 
                                            src="{{ asset('img/profile_big.jpg') }}">
                                        </div>
                                        <div class="product-desc">
                                            <a href="{{ url('/posts?category=Others') }}" class="product-name">Others</a>
                                            <div class="m-t">
                                                <a href="{{ url('/posts?category=Others') }}" class="btn btn-xs btn-outline btn-primary">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@yield('content')
<a href="javascript:" id="return-to-top" class="return-to-top"><i class="fa fa-chevron-up"></i></a>
@yield('styles')

    <script type="text/javascript">
        var createBlog = '{{ url('/create-blog') }}';
    </script>

    <!-- Mainly scripts -->
    <script src="{{ asset('js/plugins/metisMenu/jquery.metisMenu.js') }}"></script>
    <script src="{{ asset('js/plugins/slimscroll/jquery.slimscroll.min.js') }}"></script>

    <!-- Custom and plugin javascript -->
    <script src="{{ asset('js/inspinia.js') }}"></script>
    <script src="{{ asset('js/plugins/pace/pace.min.js') }}"></script>

    <!-- TAGS INPUT -->
    <script src="{{ asset('css/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js') }}"></script>

    <!-- SUMMERNOTE -->
    <script src="{{ asset('js/plugins/summernote/summernote.min.js') }}"></script>

    <script src="{{ asset('js/categories.js') }}"></script>

    <script src="{{ asset('js/blogs/scroll-top.js') }}"></script>

@yield('scripts')
</body>
</html>