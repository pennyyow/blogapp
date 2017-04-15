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
      }.bind(this)
    });
	},
  deleteBlog() {
    var blog = this.state.blog;
    var $this = this;
    swal({
      title: "Are you sure?",
      text: "You blog entitle \"" + blog.title +  "\" will be deleted ",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel plx!",
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
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
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
                    <img alt="image" className="img-responsive" src={ '../img/avatar/' + blog.image} />
                </div>
                <div className="col-md-8">
                    <a href={ Url.view + '/' + blog._id} className="btn-link">
                        <h1><strong>{ blog.title }</strong></h1>
                    </a>
                    <p>
                      { blog.description }
                    </p>
                    <div className="form-group">
                        Posted by 
                        <a href={Url.profile + '/' + blog.user._id} className="btn-link">
                            <strong>
                                &nbsp;{ blog.user.firstName } { blog.user.lastName }&nbsp;
                            </strong>
                        </a> 
                        <span className="text-muted">
                            <i className="fa fa-clock-o"></i> { blog.created_at }
                        </span>
                    </div>
                    <div>
                      {
                        blog.tags.map( tag => {
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
                    <button className="btn btn-white btn-xs">
                      <i className="fa fa-comments"></i> Comment</button>
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
  var $inputImage = $("#inputImage");
  if (window.FileReader) {
      $inputImage.change(function() {
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

	ReactDOM.render(
      <Blogs />,
      $('#blogs').get(0)
    );
});