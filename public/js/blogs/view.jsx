var Blog = React.createClass({
	getInitialState() {
		return {
			blog: {},
			author: {},
			tags: []
		}
	},
	componentDidMount() {
		this.getBlog();
	},
	getBlog() {
		$.ajax({
      method: 'POST',    
      url: Url.getBlog,
      data: {
    		blog: blogId,
    		tags: (tags ? tags : null),
    		moment: moment,
        '_token': token
      },
      success: function(r) {
      	console.log('>>>>>>>>>>BLOG: ' + JSON.stringify(r))
      	this.setState({
      		blog: r,
      		author: r.user,
      		tags: r.tags
      	});

      	$(this.refs.content).html(r.content);
      }.bind(this)
    });
	},
	render() {
		var blog = this.state.blog;

		return(
			<If test={blog != null}>
				<div>
					<div className="ibox-content no-padding border-left-right">
	            <img alt="image" className="img-responsive" 
	            	src={'../img/company/' + blog.image} />
	            	<div className="panel panel-default">
					  <div className="panel-body b-panel">
					  	<span className="text-muted blog-author">
	                     	<a href={Url.profile + '/' + this.state.author._id} className="btn-link">
	                    		<img alt="image" className="img-circ" src={ '../img/avatar/' + this.state.author.image} />
	                    	</a>
	                    	<a href={Url.profile + '/' + this.state.author._id} className="btn-link">
		                    	<If test={blog.user}>
		                        <strong> {this.state.author.name} </strong>
		                    	</If>
		                    </a> <i className="fa fa-clock-o"></i> {moment(blog.created_at).fromNow()}
	                	</span>
					  	<h1 className="title-container" style={{padding: '8px'}}>
		                   {blog.title}
		                </h1>
		                 
					  </div>
					</div>
	        </div>
	        <div className="ibox-content c-panel">
	            
	            <div className="text-center article-title">
	                
	               
	            </div>
	            <div id="content" ref="content">
	            </div>
	            <hr/>
	            <div className="row">
	                <div className="col-md-12">
	                    <div className="form-group">
	                        <h5>{ (this.state.tags ? 'Tags: ' : 'No tags added') }</h5>
	                        {
	                        	(this.state.tags ? this.state.tags : []).map(tag => {
	                        		return(
	                        		 <a key={tag} href={ Url.posts + '?tags=' + tag} className="btn btn-white btn-xs btn-tag" type="button">
                              <i className="fa fa-tag"></i> {tag}
                            </a>
	                        		
	                        		);
	                        	})
	                        }
	                    </div>
	                </div>
	            </div>
	            <hr/>

	            <Reactions blog={this.state.blog} test='test' />
	        </div>
				</div>
			</If>
		);
	}
});

var Reactions = React.createClass({
	getInitialState() {
		return {
			blog: this.props.blog,
			comments: []
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
		this.getBlog();
	},
	getBlog() {
		$.ajax({
	      method: 'POST',    
	      url: Url.getBlog,
	      data: {
	    		blog: blogId,
	    		moment: moment,
	        '_token': token
	      },
	      success: function(r) {
	      	this.setState({
	      		blog: r,
	      		comments: r.comments
	      	});
	      }.bind(this)
	    });
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
      		blog: r,
      		comments: r.comments
      	});
      }.bind(this)
    });
	},
	onKeyUp(e) {
		var content = $(this.refs.comment).code();
		if(e.key === 'Enter') {
			if(!e.nativeEvent.shiftKey) {
				$(this.refs.comment).html('');

				$.ajax({
			      method: 'POST',    
			      url: Url.comment,
			      data: {
			    		comment: content,
			    		moment: moment,
			    		blog: this.state.blog._id,
			        '_token': token
			      },
			      success: function(r) {
			      	this.getBlog();
			      }.bind(this)
			    });
			}
		}
	},
	share() {
		var blog = this.state.blog;

		FB.ui({
			  method: 'share',
			  display: 'popup',
			  href: 'http://008de834.ngrok.io/blogapp/public/pub-view-blog/' + blog._id,
			  title: blog.title,
			  picture: 'http://008de834.ngrok.io/blogapp/public/img/company/' + blog.image,  
			  caption: blog.description,
			  description: blog.description
		}, function(response){});
	},
	goTo() {
		$(".comment-textbox").focus();
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
			<div>
				<div className="row">
		          <div className="col-md-12">
		            <div className="pull-right status">
		              <p>
		              		<i className="fa fa-eye"></i> {blog.views ? blog.views : 0} {blog.views ? 'Views' : 'View'}

		                  &nbsp;&nbsp;&nbsp;<i className="fa fa-thumbs-up"></i>  {liked} {liked == 1 || liked == 0 ? 'Like' : 'Likes'}

		                  &nbsp;&nbsp;&nbsp;<i className="fa fa-thumbs-down"></i> {disliked} {disliked == 1 || disliked == 0 ? 'Dislike' : 'Dislikes'}

		                  &nbsp;&nbsp;&nbsp;<i className="fa fa-comments"></i> {this.state.comments ? this.state.comments.length : 0} {this.state.comments.length == 1 || this.state.comments.length == 0 ? 'Comment' : 'Comments'}
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
	                    <a href="#comment-textbox" className="btn btn-white btn-xs" onClick={this.goTo}>
	                      <i className="fa fa-comments"></i> Comment
	                    </a>
	                    <button className="btn btn-white btn-xs" onClick={this.share}>
	                      <i className="fa fa-share"> Share </i>
	                     </button>
	                </div>
	          		</If>
	              <If test={isGuest}>
	              	<div className="btn-group">
	            		<button className="btn btn-white btn-xs" onClick={this.share}>
	                      <i className="fa fa-share"> Share </i>
	                    </button>
	                </div>
	              </If>
	          </div>
	      </div>
	      <div className="row">
            <div className="col-lg-12">
                {
                	(this.state.comments ? this.state.comments : []).map( comment => {
	                		return(
	                			<CommentBody comment={comment} blog={blog} getBlog={() => this.getBlog()} />
	                		);
	                	})
                } 
                <If test={user}>
                	<div className="social-feed-box" id="comment-section">
		                <div className="social-avatar comment-text">
		                    <a href="" className="pull-left">
		                        <img alt="image" src={'../img/avatar/' + (user ? user.image : '')} />
		                    </a>
		                    <div className="media-body">
		                        <div className="form-control comment-textbox" 
		                        	onKeyUp={this.onKeyUp} ref="comment"
                                  	data-text="Write comment..." contentEditable="true"></div>
		                    </div>
		                </div>
                	</div>
                </If>
            </div>
        </div>
			</div>
		);
	}
});

var CommentBody = React.createClass({
	onKeyUp(e) {
		var content = $(this.refs.comment).code();
		if(e.key === 'Enter') {
			if(!e.nativeEvent.shiftKey) {
				$(this.refs.comment).html('');

				$.ajax({
			      method: 'POST',    
			      url: Url.subComment,
			      data: {
			    		content: content,
			    		moment: moment,
			    		comment: this.props.comment._id,
			        '_token': token
			      },
			      success: function(r) {
			      	this.props.getBlog();
			      }.bind(this)
			    });
			}
		}
	},
	showReplyBox(e) {
		e.preventDefault();
		$(this.refs.replyBox).removeClass('hidden');
	},
	render() {
		var comment = this.props.comment;
		return(
			<div className="social-feed-box" key={comment.dateAdded.date}>
                <div className="social-footer">
                	<div className="social-comment">
	               		<If test={ !isGuest && comment.user._id == user.id }>
	               			<div>
	                			<UpdateComment comment={comment} blog={this.props.blog} getBlog={() => this.getBlog()} />
	                		</div>
	                	</If>
                        <a href={Url.profile + '/' + comment.user._id} className="pull-left">
                            <img alt="image" src={'../img/avatar/' + comment.user.image} />
                        </a>
                        <div className="media-body">
                            <a href={Url.profile + '/' + comment.user._id}>
                                {comment.user.name}
                            </a>
                            &nbsp;&nbsp;<small className="text-muted">{moment(comment.dateAdded.date, "YYYYMMDD h:mm:ss").fromNow()}</small>
                            <CommentContent content={comment.content} />
                            <If test={ !isGuest }>
                            	<a href="#" onClick={this.showReplyBox} className="small">Reply</a> 
                            </If>
                        </div>
                        {

		                	(comment.subComments ? comment.subComments : []).map( subComment => {
		                		return(
		                			<div className="social-comment">
		                                <a href={Url.profile + '/' + subComment.user.id} className="pull-left">
		                                    <img alt="image" src={'../img/avatar/' + subComment.user.image} />
		                                </a>
		                                <div className="media-body">
		                                    <a href={Url.profile + '/' + subComment.user.id}>
		                                    	{subComment.user.name}
				                            </a>
				                            &nbsp;&nbsp;<small className="text-muted">{moment(subComment.dateAdded.date, "YYYYMMDD h:mm:ss").fromNow()}</small>
		                                    <CommentContent content={subComment.content} />
		                                </div>
		                            </div>
		                		);
		                	})
		                }
                        <div className="social-comment hidden" ref="replyBox">
			                <a href="" className="pull-left">
			                    <img alt="image" src={'../img/avatar/' + (user ? user.image : '')} />
			                </a>
			                <div className="media-body">
			                    <div className="form-control subcomment-textbox" 
			                    	onKeyUp={this.onKeyUp} ref="comment"
			                      	data-text="Write comment..." contentEditable="true"></div>
			                </div>
			            </div>
                    </div>
                </div>
            </div>
		);
	}
});


var UpdateComment = React.createClass({
	getInitialState() {
		return {
			comment: this.props.comment,
			blog: this.props.blog
		}
	},
	componentDidMount() {
		$(this.refs.comment).html(this.props.comment.content);
	},
	showModal(e) {
		e.preventDefault();
		$(this.refs.updateModal).modal('show');
	},
	updateComment() {
		$.ajax({
	      method: 'POST',    
	      url: Url.updateComment,
	      data: {
	    		comment: this.state.comment._id,
	    		content: $(this.refs.comment).html(),
	        	'_token': token
	      },
	      success: function(r) {
	      	window.location.href = Url.viewBlog + '/' + blogId;
	      }.bind(this)
	    });
	},
	deleteComment() {
		$.ajax({
	      method: 'POST',    
	      url: Url.deleteComment,
	      data: {
	    		comment: this.state.comment._id,
	    		blog: this.state.blog._id,
	        	'_token': token
	      },
	      success: function(r) {
	      	window.location.href = Url.viewBlog + '/' + blogId;
	      }.bind(this)
	    });
	},
	render() {
		return(
			<div>
				<a className="dropdown-toggle pull-right" href="#" onClick={this.showModal}>
                    <i className="fa fa-chevron-down"></i>
                </a>
                <div ref="updateModal" className="modal fade" role="dialog">
				  <div className="modal-dialog">
				  	<div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">Update Comment</h4>
				      </div>
				      <div className="modal-body">
				        <div className="form-control comment-textbox" 
		                	onKeyUp={this.onKeyUp} ref="comment"
		                  	data-text="Write comment..." contentEditable="true"></div>
				      </div>
				      <div className="modal-footer text-left">
				      	<button type="button" className="btn btn-primary pull-left" data-dismiss="modal" onClick={this.updateComment}>Save Changes</button>
				      	<button type="button" className="btn btn-danger pull-left" data-dismiss="modal" onClick={this.deleteComment}>Delete Comment</button>
				        <button type="button" className="btn btn-default pull-right" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
});

var CommentContent = React.createClass({
	componentDidMount() {
		$(this.refs.content).html(this.props.content);
	},
	render() {
		return(
			<div ref="content"></div>
		);
	}
});

$(function() {
	ReactDOM.render(
      <Blog />,
      $('#blog').get(0)
    );
});