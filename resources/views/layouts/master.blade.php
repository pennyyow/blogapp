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

    <link href="css/custom/posts.css" rel="stylesheet">

    <link href="css/custom/profile.css" rel="stylesheet">

    <link href="css/custom/categories.css" rel="stylesheet">
</head>

<body class="gray-bg">
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
                            <a href="{{ url('/categories') }}">
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
@yield('content')

 <!-- Mainly scripts -->
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="js/inspinia.js"></script>
    <script src="js/plugins/pace/pace.min.js"></script>

</body>
</html>