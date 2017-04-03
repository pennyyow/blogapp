<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">

    <!-- Toastr style -->
    <link href="css/plugins/toastr/toastr.min.css" rel="stylesheet">

    <!-- Gritter -->
    <link href="js/plugins/gritter/jquery.gritter.css" rel="stylesheet">

    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    @yield('styles')
    <link href="css/custom/categories.css" rel="stylesheet">

    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/categories.js"></script>
</head>

<body class="gray-bg">
@if(!auth()->guest())
    <div class="row">
        <nav class="navbar navbar-fixed-top" role="navigation" style="margin-bottom: 0">
            <div class="container">
                <div class="navbar-header">
                    <a class="logo" href="posts">
                        BlogMoTo
                    </a>
                    <form role="search" class="app-search" action="search_results.html">
                        <div class="form-group">
                            <input type="text" placeholder="Search for something..." name="top-search" id="top-search" class="form-control app-search-input">
                            <a href=""><i class="fa fa-search"></i></a>
                        </div>
                    </form>
                </div>
                <div class="tooltip-demo">
                    <ul class="nav navbar-top-links navbar-right pull-right">
                        <li data-toggle="tooltip" data-placement="bottom" title="Home">
                            <a href="{{ url('/posts') }}">
                                <i class="fa fa-home icon"></i>
                            </a>
                        </li>
                        <li data-toggle="tooltip" data-placement="bottom" title="Profile">
                            <a href="{{ url('/profile') }}">
                                <i class="fa fa-user icon"></i>
                            </a>
                        </li>
                        <li class="dropdown" data-toggle="tooltip" data-placement="bottom" title="Notifications">
                            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#" aria-expanded="false">
                                <i class="fa fa-globe icon"></i>  <span class="label label-warning">16</span>
                            </a>
                            <ul class="dropdown-menu dropdown-messages">
                                <li class="text-center notifi-title">Notifications</li>
                                <li>
                                    <a href="#">
                                        <div class="dropdown-messages-box">
                                            <div class="pull-left">
                                                <img alt="image" class="img-responsive user-photo" src="img/a4.jpg">
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
                                                <img alt="image" class="img-responsive user-photo" src="img/a4.jpg">
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
                                                <img alt="image" class="img-responsive user-photo" src="img/a4.jpg">
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
                                                <img alt="image" class="img-responsive user-photo" src="img/a4.jpg">
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
                        <li data-toggle="tooltip" data-placement="bottom" title="Categories">
                            <a href="#categories" data-toggle="modal">
                                <i class="fa fa-th-large icon"></i>
                            </a>
                        </li>
                        <li data-toggle="tooltip" data-placement="bottom" title="Logout">
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
@else
    <div class="row">
        <nav class="navbar navbar-fixed-top" role="navigation" style="margin-bottom: 0">
            <div class="container">
                <div class="navbar-header">
                    <a class="logo" href="posts">
                        BlogMoTo
                    </a>
                    <form role="search" class="app-search" action="search_results.html">
                        <div class="form-group">
                            <input type="text" placeholder="Search for something..." name="top-search" id="top-search" class="form-control app-search-input">
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
                                            <img alt="image" class="img-responsive" id="pic1" value="img/company/category8.jpeg" src="img/company/category8.jpeg">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic2" src="img/company/category7.jpeg">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic3" src="img/company/category1.jpeg">
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
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic4" src="img/company/category4.jpeg">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic5" src="img/company/category6.jpeg">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic6" src="img/company/category3.jpeg">
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
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic7" src="img/company/category2.jpeg">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic8" src="img/company/category5.jpeg">
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
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation">
                                            <img alt="image" class="img-responsive" id="pic9" src="img/profile_big.jpg">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@yield('content')

 <!-- Mainly scripts -->
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="js/inspinia.js"></script>
    <script src="js/plugins/pace/pace.min.js"></script>

    <!-- TAGS INPUT -->
    <script src="css/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js"></script>

    <!-- SUMMERNOTE -->
    <script src="js/plugins/summernote/summernote.min.js"></script>
    <script src="js/categories.js"></script>

@yield('scripts')
</body>
</html>