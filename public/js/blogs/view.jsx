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
	            <img alt="image" className="img-responsive" src={'../img/avatar/' + blog.image} />
	        </div>
	        <div className="ibox-content">
	            
	            <div className="text-center article-title">
	                <h1>
	                   {blog.title}
	                </h1>
	                <span className="text-muted"> 
	                    By <a href="#" className="btn-link">
	                    	<If test={blog.user}>
	                        <strong> {this.state.author.firstName} {this.state.author.lastName} </strong>
	                    	</If>
	                    </a>
	                    <i className="fa fa-clock-o"></i> { blog.updated_at} 
	                </span>
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
	                        			<button className="btn btn-white btn-xs btn-tag" type="button">
			                            <i className="fa fa-tag"></i> {tag}
		                            </button>
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
		this.getBlog();
	},
	getBlog() {
		$.ajax({
      method: 'POST',    
      url: Url.getBlog,
      data: {
    		blog: blogId,
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
		if(e.key === 'Enter') {
			if(!e.nativeEvent.shiftKey) {
				$.ajax({
		      method: 'POST',    
		      url: Url.comment,
		      data: {
		    		comment: $(this.refs.comment).val(),
		    		blog: this.state.blog._id,
		        '_token': token
		      },
		      success: function(r) {
		      	$(this.refs.comment).val('');
		      	this.setState({
		      		blog: r,
      				comments: r.comments
		      	});
		      }.bind(this)
		    });
			}
		}
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
              		<i className="fa fa-eye"></i> {blog.views ? blog.views : 0} Views
                  &nbsp;&nbsp;&nbsp;<i className="fa fa-thumbs-up"></i> {liked} Likes
                  &nbsp;&nbsp;&nbsp;<i className="fa fa-thumbs-down"></i> {disliked}  Dislikes
                  &nbsp;&nbsp;&nbsp;<i className="fa fa-comments"></i> {this.state.comments ? this.state.comments.length : 0} Comments
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
	      <div className="row">
            <div className="col-lg-12">
                {
                	(this.state.comments ? this.state.comments : []).map( comment => {
	                		return(
	                			<div className="social-feed-box" key={comment.dateAdded.date}>
				                    <div className="social-avatar">
				                        <a href="" className="pull-left">
				                            <img alt="image" src={'../img/avatar/' + comment.user.image} />
				                        </a>
				                        <div className="media-body">
				                            <a href="#">
				                                {comment.user.firstName} {comment.user.lastName}
				                            </a>
				                            <small className="text-muted">Today 4:21 pm - 12.06.2014</small>
				                        </div>
				                    </div>
				                    <div className="social-body">
				                        <p>
				                            {comment.content}
				                        </p>
				                    </div>
				                </div>
	                		);
	                	})
                } 
                <If test={user}>
                	<div className="social-feed-box">
                    <div className="social-avatar comment-text">
                        <a href="" className="pull-left">
                            <img alt="image" src={'../img/avatar/' + (user ? user.image : '')} />
                        </a>
                        <div className="media-body">
                            <textarea className="form-control" onKeyUp={this.onKeyUp} 
                            	placeholder="Write comment..." rows="3" ref="comment"></textarea>
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

$(function() {
	ReactDOM.render(
      <Blog />,
      $('#blog').get(0)
    );
});