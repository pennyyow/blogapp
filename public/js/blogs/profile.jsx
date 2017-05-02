var Blogs = React.createClass({
	getInitialState() {
		return {
			blogs: [],
			max: 2,
			nothingToShow: false 
		}
	},
	componentDidMount() {
		this.getAllBlogs(this.state.max);
	},
	getAllBlogs(max) {
		$.ajax({
      method: 'POST',    
      url: Url.listBlogsByUser,
      data: {
    		max: max,
        user: userProfile,
        '_token': token
      },
      success: function(r) {
      console.log('>>>>>>>>>>>>>.BLOGS: ' + JSON.stringify(r))
      	var nothingToShow = this.state.nothingToShow;
      	if(this.state.max > r.total) nothingToShow = true;

        this.setState({
        	blogs: r.blogs,
        	nothingToShow: nothingToShow
        });
      }.bind(this)
    });
	},
	showMore() {
		var max = this.state.max;
		max += 2;
		this.setState({
			max: max
		});
		this.getAllBlogs(max);
	},
	render() {
		return(
			<div>
				{
					this.state.blogs.map( blog => {
						return(
							<Blog blog={blog} getAllBlogs={(max) => this.getAllBlogs(max)} max={this.state.max} key={blog._id} />
						);
					})
				}

				<div>
					<If test={!this.state.nothingToShow}>
						<button className="btn btn-primary btn-block" onClick={this.showMore}>
							<i className="fa fa-arrow-down"></i> Show More Blogs
						</button>
					</If>
					<If test={this.state.nothingToShow}>
						<button className="btn btn-primary btn-block" disabled>
							<i className="fa fa-times"></i> No more blogs to show 
						</button>
					</If>
				</div>
			</div>
		);
	}
});

var Blog = React.createClass({
	getInitialState() {
		return {
			blog: this.props.blog
		}
	},
  componentDidMount() {
    $(this.refs.description).html(this.state.blog.description);
  },
	addReaction(reaction, blog) {
		$.ajax({
      method: 'POST',    
      url: Url.react,
      data: {
    		reaction: reaction,
    		blog: blog,
        '_token': token
      },
      success: function(r) {
      	this.setState({
      		blog: r
      	});
        $(this.refs.description).html(r.description);
      }.bind(this)
    });
	},
  deleteBlog() {
    var blog = this.state.blog;
    var $this = this;
    swal({
      title: "Are you sure?",
      text: "Your blog entitled \"" + blog.title +  "\" will be deleted.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel it!",
      closeOnConfirm: false },
    function (isConfirm) {
      if (isConfirm) {
        $.ajax({
          method: 'POST',    
          url: Url.deleteBlog,
          data: {
            blog: blog._id,
            '_token': token
          },
          success: function(r) {
            $this.props.getAllBlogs($this.props.max); 
          }
        });
        swal("Deleted!", "Your blog has been deleted.", "success");
      }
    });
  },
	render() {
		var blog = this.state.blog;
		var reaction = null; 
		var liked = 0;
		var disliked = 0;

		if(blog.reactions) {
			if(!isGuest) {
				reaction = $.grep(blog.reactions, function(reaction) {
					return reaction._id == user.id;
				})[0];
			}			

			$.each(blog.reactions, function(i, reaction) {
				if(reaction.reaction == 1) liked++;
				if(reaction.reaction == 2) disliked++;
			});
		}

		return(
			<div key={blog._id}>
        <div className="ibox float-e-margins blog-posts">
          <If test={!isGuest}>
            <div className="ibox-title blog-content">
                <div className="ibox-tools">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                        <i className="fa fa-chevron-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                          <a href={ Url.editBlog + '/' + blog._id }>
                            <i className="fa fa-edit"></i> Edit
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={ this.deleteBlog }>
                            <i className="fa fa-trash"></i> Delete
                          </a>
                        </li>
                    </ul>
                </div>
            </div>
          </If>
          <div className="ibox-content">
            <div className="row">
                <div className="col-md-4 no-padding">
                    <img alt="image" className="img-responsive" src={ '../img/company/' + blog.image} />
                </div>
                <div className="col-md-8">
                    <a href={ Url.view + '/' + blog._id} className="btn-link title-container">
                        <h1><strong>{ blog.title }</strong></h1>
                    </a>
                    <div ref="description" className="form-group description-container"></div>
                    <div className="form-group">
                        <a href={ Url.view + '/' + blog._id} type="button" 
                          className="btn btn-primary btn-outline">
                            Read more
                        </a>
                    </div>
                    <div className="form-group">
                        Posted by 
                        <a href={Url.profile + '/' + blog.user._id} className="btn-link">
                            <strong>
                                &nbsp; { blog.user.name } &nbsp;
                            </strong>
                        </a> 
                        <span className="text-muted">
                            <i className="fa fa-clock-o"></i> { blog.created_at }
                        </span>
                    </div>
                    <div>
                      {
                        (this.state.blog.tags ? this.state.blog.tags : []).map( tag => {
                          return(
                            <a key={tag} href="#" className="btn btn-white btn-xs btn-tag" type="button">
                              <i className="fa fa-tag"></i> {tag}
                            </a>
                          );
                        })
                      }
                    </div>
                </div>
            </div>
          </div>
          <div className="ibox-footer">
              <div className="pull-right">
                  <p>
                      <i className="fa fa-eye"></i> {blog.views ? blog.views : 0} Views
                      &nbsp;&nbsp;&nbsp;<i className="fa fa-thumbs-up"></i> {liked} Likes
                      &nbsp;&nbsp;&nbsp;<i className="fa fa-thumbs-down"></i> {disliked}  Dislikes
                      &nbsp;&nbsp;&nbsp;<i className="fa fa-comments"></i> {this.state.blog.comments ? this.state.blog.comments.length : 0 } Comments
                  </p>
              </div>
              <If test={!isGuest}>
                <div className="btn-group">
                    <button className={ reaction && reaction.reaction == 1 ? "btn btn-white btn-xs like-on" : "btn btn-white btn-xs"} 
                      onClick={() => this.addReaction(1, blog._id)}>
                      <i className="fa fa-thumbs-up"></i> Like
                    </button>
                    <button className={ reaction && reaction.reaction == 2 ? "btn btn-white btn-xs dislike-on" : "btn btn-white btn-xs"}
                      onClick={() => this.addReaction(2, blog._id)}>
                      <i className="fa fa-thumbs-down"></i> Dislike
                    </button>
                    <a href={ Url.view + '/' + blog._id + '#comment-section'} className="btn btn-white btn-xs">
                      <i className="fa fa-comments"></i> Comment
                    </a>
                    <button className="btn btn-white btn-xs">
                      <i className="fa fa-share"></i> Share
                    </button>
                </div>
              </If>
              <If test={isGuest}>
                <div className="btn-group">
                    <button className="btn btn-white btn-xs">
                      <i className="fa fa-share"></i> Share
                    </button>
                </div>
              </If>
          </div>
        </div>
			</div>
		);
	}
});

$(function() {
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var imageChanged = false;
  var $inputImage = $("#inputImage");
  if (window.FileReader) {
      $inputImage.change(function() {
        imageChanged = true;      
        var fileReader = new FileReader(),
                files = this.files,
                file;
        if (!files.length) {
            return;
        }

        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
            fileReader.readAsDataURL(file);
            fileReader.onload = function () {
                $('#profile-image-edit').attr('src', this.result);
            };
        } else {
            showMessage("Please choose an image file.");
        }
      });
  }

  $('#btnSave').click(function(e) {
    e.preventDefault();
    $('#btnSave').addClass('disabled');
    var formData = $('form#update-profile-form').serializeArray();
    formData.push({name: 'file', value: imageChanged ? $('#profile-image-edit').attr('src') : null});
    
    $.ajax({
      method: 'POST',    
      url: Url.updateProfile,
      data: formData,
      success: function(r) {
        console.log('USER: ' + JSON.stringify(r))
        window.location.href = Url.profile + '/' + user.id;
      },
      error: function(r) {
        //console.log('>>>JSON: ' + JSON.stringify(r))
        var errors = r.responseJSON.errors;

        if(errors.firstname) {
          $('.firstname').addClass('has-error');
          $('.firstname-label').removeClass('hidden');
          $('.firstname-label').text(errors.firstname);
        } else {
          $('.firstname').removeClass('has-error');
          $('.firstname-label').addClass('hidden');
          $('.firstname-label').text('');
        }

        if(errors.lastname) {
          $('.lastname').addClass('has-error');
          $('.lastname-label').removeClass('hidden');
          $('.lastname-label').text(errors.lastname);
        } else {
          $('.lastname').removeClass('has-error');
          $('.lastname-label').addClass('hidden');
          $('.lastname-label').text('');
        }

        if(errors.email) {
          $('.email').addClass('has-error');
          $('.email-label').removeClass('hidden');
          $('.email-label').text(errors.email);
        } else {
          $('.email').removeClass('has-error');
          $('.email-label').addClass('hidden');
          $('.email-label').text('');
        }

        $('#btnSave').removeClass('disabled');
      }
    });
  });

	ReactDOM.render(
      <Blogs />,
      $('#blogs').get(0)
    );
});