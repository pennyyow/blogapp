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


    @yield('styles')
    <link href="{{ asset('css/custom/master.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/categories.css') }}" rel="stylesheet">

    <script src="{{ asset('js/jquery-2.1.1.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>

    <!-- REACT COMPONENTS -->
    <script src="{{ asset('js/react/react.js') }}"></script>
    <script src="{{ asset('js/react/react-dom.js') }}"></script>
    <script src="{{ asset('js/react-components.js') }}"></script>
    <script type="text/javascript">
        var user = null;
    </script>
    <link href="{{ asset('css/import/core.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom/badge.css') }}" rel="stylesheet">

</head>
<title>BlogMoTo | 500</title>
<body class="gray-bg">
	<div class="row">
        <nav class="navbar navbar-fixed-top" role="navigation" style="margin-bottom: 0">
            <div class="container">
                <div class="navbar-header">
                    <a class="logo" href="{{ url('/posts') }}">
                        BlogMoTo
                    </a>
                    {!! Form::open(array('action' => array('BlogController@search'), 'role' => 'search', 'method' => 'GET', 'id' => 'createForm', 'class' => 'app-search')) !!}
                        <div class="form-group">
                            <input type="text" placeholder="Search for something..." name="search" id="top-search" class="form-control app-search-input">
                            <a href=""><i class="fa fa-search"></i></a>
                        </div>
                    {!! Form::close() !!}
                </div>
			</div>
		</nav>
	</div>
	<div class="wrapper wrapper-content">
	    <div class="animated fadeInUp errory">
	    	<div class="col-md-6">
				500
			</div>
			<div class="col-md-6 disp2">
				Internal Server Error
			</div>
			<button type="button" onClick="goBack()" class="btn btn-default btn-des">
                Back Mo To
            </button>
		</div>
	</div>
    <!-- Custom and plugin javascript -->
    <script src="{{ asset('js/inspinia.js') }}"></script>
    <script src="{{ asset('js/plugins/pace/pace.min.js') }}"></script>


    <script>
        function goBack() {
            window.history.back();
        }
    </script>
@yield('scripts')

</body>
</html>
