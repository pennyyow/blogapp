var FilteredBlogs = React.createClass({
	getInitialState() {
		return {
			blogs: []
		}
	},
	componentDidMount() {
		$.ajax({
	      method: 'POST',    
	      url: Url.filterBlogs,
	      data: {
	    	keyword: keyword,
	        '_token': token
	      },
	      success: function(r) {
	      	this.setState({
	      		blogs: r
	      	});
	      }.bind(this)
	    });
	},
	showId(id) {
		alert(id)
	},
	render() {
		var blogs = this.state.blogs;
		return(
			<div>
				<h1>All blogs</h1>
				{
					blogs.map( blog => {
						return(
							<div>
								<p>Title: {blog.title}</p>
								<p>Description: {blog.description}</p>
								<p>ID: {blog._id}</p>
								<button type="button" onClick={() => this.showId(blog._id)}>
									Click me
								</button>
							</div>
						);
					})
				}
			</div>
		);
	}	
});

var FilteredUsers = React.createClass({
	getInitialState() {
		return {
			users: []
		}
	},
	componentDidMount() {
		$.ajax({
			method: 'POST',
			url: Url.filterUsers,
			data: {
				keyword: keyword,
				'_token': token
			},
			success: function(r) {
				this.setState({
					users: r
				});
			}.bind(this)
		});
	},	
	render() {
		var users = this.state.users;
		return(
			<div>
				<h1>All Users</h1>
				{
					users.map( users => {
						return(
							<div>
								<p>Name: {users.name}</p>
								<p>Email: {users.email}</p>
							</div>
						)
					})
				}
			</div>
		);
	}
});

var FilteredTags = React.createClass({
	getInitialState() {
		return {
			blogs: []
		}
	},
	componentDidMount() {
		$.ajax({
			method: 'POST',
			'url': Url.filterTags,
			'data': {
				keyword: keyword,
				'_token': token
			},
			success: function(r){
				this.setState({
					blogs: r
				});
			}.bind(this)
		});
	},
	render() {
		var blogs = this.state.blogs;
		return(
			<div>
				<h1>All Blogs</h1>
				{
					blogs.map( blog => {
						return(
							<div>
								<p>Title: {blog.title}</p>
								<p>Description: {blog.description}</p>
								<p>ID: {blog._id}</p>
							</div>
						)
					})
				}
			</div>
		);
	}
});

$(function() {



	$('#btnSearchTags').on('click', function() {
		ReactDOM.unmountComponentAtNode($('#results').get(0));
		ReactDOM.render(
	   		<FilteredTags />,
	    	$('#results').get(0)
		);
	});

	$('#btnSearchBlogs').on('click', function() {
		ReactDOM.unmountComponentAtNode($('#results').get(0));
		ReactDOM.render(
	   		<FilteredBlogs />,
	    	$('#results').get(0)
		);
	});

	$('#btnSearchUsers').on('click', function() {
		ReactDOM.unmountComponentAtNode($('#results').get(0));
		ReactDOM.render(
	   		<FilteredUsers />,
	    	$('#results').get(0)
		);
	});


	
});