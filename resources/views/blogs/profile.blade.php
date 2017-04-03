@extends('layouts.master')

@section('content')
<title>BlogMoTo | Profile</title>

    <div class="wrapper wrapper-content">
        <div class="col-md-offset-1 col-md-10">
            <div class="row animated fadeInRight">
                <div class="col-md-4">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Profile Detail</h5>
                        </div>
                        <div>
                            <div class="ibox-content no-padding border-left-right">
                                <img alt="image" class="img-responsive" src="img/profile_big.jpg">
                            </div>
                            <div class="ibox-content profile-content">
                                <h4><strong>John Patrick Bagacina</strong></h4>
                                <p><i class="fa fa-map-marker"></i> Pateros, Metro Manila</p>
                                <h5>
                                    About me
                                </h5>
                                <p>
                                    Good looking person. Has many talents and skills. 
                                </p>
                                
                                <div class="user-button">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-primary btn-sm btn-block">
                                                <i class="fa fa-edit"></i> Edit Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Blogs</h5>
                        </div>
                        <div class="ibox-content">
                            <div class="ibox float-e-margins blog-posts">
                                <div class="ibox-title blog-content">
                                    <div class="ibox-tools">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                                            <i class="fa fa-chevron-down"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-user">
                                            <li><a href="#"><i class="fa fa-edit"></i> Edit</a>
                                            </li>
                                            <li><a href="#"><i class="fa fa-trash"></i> Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ibox-content">
                                    <div class="row">
                                        <div class="col-md-4 no-padding">
                                            <img alt="image" class="img-responsive" src="img/company/gal3.jpg">
                                        </div>
                                        <div class="col-md-8">
                                            <a href="#" class="btn-link">
                                                <h1><strong>Caleb | 1st Birthday</strong></h1>
                                            </a>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <div>
                                                Posted by 
                                                <a href="#" class="btn-link">
                                                    <strong>
                                                        John Patrick S. Bagacina
                                                    </strong>
                                                </a> 
                                                <span class="text-muted">
                                                    <i class="fa fa-clock-o"></i> 04 Jan 2017
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ibox-footer">
                                    <div class="pull-right">
                                        <p>
                                            <i class="fa fa-thumbs-up"></i> 100 Likes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-thumbs-down"></i> 80 Dislikes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-comments"></i> 50 Comments
                                        </p>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like
                                        </button>
                                        <button class="btn btn-white btn-xs dislike-on"><i class="fa fa-thumbs-down"></i> Dislike
                                        </button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
                                    </div>
                                </div>
                            </div>
                            <div class="ibox float-e-margins blog-posts">
                                <div class="ibox-title blog-content">
                                    <div class="ibox-tools">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                                            <i class="fa fa-chevron-down"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-user">
                                            <li><a href="#"><i class="fa fa-edit"></i> Edit</a>
                                            </li>
                                            <li><a href="#"><i class="fa fa-trash"></i> Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ibox-content">
                                    <div class="row">
                                        <div class="col-md-4 no-padding">
                                            <img alt="image" class="img-responsive" src="img/company/gal3.jpg">
                                        </div>
                                        <div class="col-md-8">
                                            <a href="#" class="btn-link">
                                                <h1><strong>Caleb | 1st Birthday</strong></h1>
                                            </a>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <div>
                                                Posted by 
                                                <a href="#" class="btn-link">
                                                    <strong>
                                                        John Patrick S. Bagacina
                                                    </strong>
                                                </a> 
                                                <span class="text-muted">
                                                    <i class="fa fa-clock-o"></i> 04 Jan 2017
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ibox-footer">
                                    <div class="pull-right">
                                        <p>
                                            <i class="fa fa-thumbs-up"></i> 100 Likes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-thumbs-down"></i> 80 Dislikes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-comments"></i> 50 Comments
                                        </p>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like
                                        </button>
                                        <button class="btn btn-white btn-xs dislike-on"><i class="fa fa-thumbs-down"></i> Dislike
                                        </button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
                                    </div>
                                </div>
                            </div>
                            <div class="ibox float-e-margins blog-posts">
                                <div class="ibox-title blog-content">
                                    <div class="ibox-tools">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                                            <i class="fa fa-chevron-down"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-user">
                                            <li><a href="#"><i class="fa fa-edit"></i> Edit</a>
                                            </li>
                                            <li><a href="#"><i class="fa fa-trash"></i> Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ibox-content">
                                    <div class="row">
                                        <div class="col-md-4 no-padding">
                                            <img alt="image" class="img-responsive" src="img/company/gal3.jpg">
                                        </div>
                                        <div class="col-md-8">
                                            <a href="#" class="btn-link">
                                                <h1><strong>Caleb | 1st Birthday</strong></h1>
                                            </a>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <p>
                                                The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.
                                            </p>
                                            <div>
                                                Posted by 
                                                <a href="#" class="btn-link">
                                                    <strong>
                                                        John Patrick S. Bagacina
                                                    </strong>
                                                </a> 
                                                <span class="text-muted">
                                                    <i class="fa fa-clock-o"></i> 04 Jan 2017
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ibox-footer">
                                    <div class="pull-right">
                                        <p>
                                            <i class="fa fa-thumbs-up"></i> 100 Likes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-thumbs-down"></i> 80 Dislikes
                                            &nbsp;&nbsp;&nbsp;<i class="fa fa-comments"></i> 50 Comments
                                        </p>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like
                                        </button>
                                        <button class="btn btn-white btn-xs dislike-on"><i class="fa fa-thumbs-down"></i> Dislike
                                        </button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
                                        <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
                                    </div>
                                </div>
                            </div>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection