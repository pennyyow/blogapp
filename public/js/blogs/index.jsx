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
      url: Url.listBlogs,
      data: {
    		max: max,
        category: (category ? category : null),
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
							<Blog blog={blog} key={blog._id} />
						);
					})
				}

				<div className="col-md-8 col-md-offset-2">
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

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1352297461495712',
        xfbml      : true,
        version    : 'v2.0'
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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
  share() {
    var blog = this.state.blog;

    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'http://d09343f8.ngrok.io/blogapp/public/pub-view-blog/' + blog._id,
      title: blog.title,
      picture: 'http://d09343f8.ngrok.io/blogapp/public/img/company/' + blog.image,  
      caption: blog.description,
      description: blog.description
    }, function(response){});
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
				<div className="col-md-8 col-md-offset-2">
          <div className="ibox float-e-margins">
              <div className="ibox-content">
                  <div className="row">
                      <div className="col-md-4 no-padding">
                          <img alt="image" className="img-responsive" src={ 'img/company/' + blog.image} />
                      </div>
                      <div className="col-md-8">
                          <a href={ Url.view + '/' + blog._id} className="btn-link title-container">
                              <h1><strong>{ blog.title }</strong></h1>
                          </a>
                          <div ref="description" className="form-group description-container">
                          </div>
                          <div className="form-group">
                              <a href={ Url.view + '/' + blog._id} type="button" className="btn btn-primary btn-outline">
                                  Read more
                              </a>
                          </div>
                          <div className="form-group">
                              Posted by 
                              <a href={Url.profile + '/' + blog.user._id} className="btn-link">
                                  <strong>
                                      &nbsp;{ blog.user.name }&nbsp;
                                  </strong>
                              </a> 
                              <span className="text-muted">
                                  <i className="fa fa-clock-o"></i> { blog.created_at }
                              </span>
                          </div>
                          <div>
                          	{
                          		(blog.tags ? blog.tags : []).map( tag => {
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
                        <button className="btn btn-white btn-xs" onClick={this.share}>
                          <i className="fa fa-share"> Share </i>
                        </button>
                    </div>
              		</If>
                  <If test={isGuest}>
                      <button className="btn btn-white btn-xs" onClick={this.share}>
                        <i className="fa fa-share"> Share </i>
                      </button>
                  </If>
              </div>
          </div>
      	</div>
			</div>
		);
	}
});

$(function() {
  $(".regular").slick({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });

	ReactDOM.render(
    <Blogs />,
    $('#blogs').get(0)
  );
});
