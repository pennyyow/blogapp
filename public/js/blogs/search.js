var FilteredBlogs = React.createClass({
	displayName: 'FilteredBlogs',

	getInitialState() {
		return {
			blogs: []
		};
	},
	componentDidMount() {
		$.ajax({
			method: 'POST',
			url: Url.filterBlogs,
			data: {
				keyword: keyword,
				'_token': token
			},
			success: function (r) {
				this.setState({
					blogs: r
				});
			}.bind(this)
		});
	},
	showId(id) {
		alert(id);
	},
	render() {
		var blogs = this.state.blogs;
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'All blogs'
			),
			blogs.map(blog => {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'p',
						null,
						'Title: ',
						blog.title
					),
					React.createElement(
						'p',
						null,
						'Description: ',
						blog.description
					),
					React.createElement(
						'p',
						null,
						'ID: ',
						blog._id
					),
					React.createElement(
						'button',
						{ type: 'button', onClick: () => this.showId(blog._id) },
						'Click me'
					)
				);
			})
		);
	}
});

var FilteredUsers = React.createClass({
	displayName: 'FilteredUsers',

	getInitialState() {
		return {
			users: []
		};
	},
	componentDidMount() {
		$.ajax({
			method: 'POST',
			url: Url.filterUsers,
			data: {
				keyword: keyword,
				'_token': token
			},
			success: function (r) {
				this.setState({
					users: r
				});
			}.bind(this)
		});
	},
	render() {
		var users = this.state.users;
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'All Users'
			),
			users.map(users => {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'p',
						null,
						'Name: ',
						users.name
					),
					React.createElement(
						'p',
						null,
						'Email: ',
						users.email
					)
				);
			})
		);
	}
});

var FilteredTags = React.createClass({
	displayName: 'FilteredTags',

	getInitialState() {
		return {
			blogs: []
		};
	},
	componentDidMount() {
		$.ajax({
			method: 'POST',
			'url': Url.filterTags,
			'data': {
				keyword: keyword,
				'_token': token
			},
			success: function (r) {
				this.setState({
					blogs: r
				});
			}.bind(this)
		});
	},
	render() {
		var blogs = this.state.blogs;
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'All Blogs'
			),
			blogs.map(blog => {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'p',
						null,
						'Title: ',
						blog.title
					),
					React.createElement(
						'p',
						null,
						'Description: ',
						blog.description
					),
					React.createElement(
						'p',
						null,
						'ID: ',
						blog._id
					)
				);
			})
		);
	}
});

$(function () {

	$('#btnSearchTags').on('click', function () {
		ReactDOM.unmountComponentAtNode($('#results').get(0));
		ReactDOM.render(React.createElement(FilteredTags, null), $('#results').get(0));
	});

	$('#btnSearchBlogs').on('click', function () {
		ReactDOM.unmountComponentAtNode($('#results').get(0));
		ReactDOM.render(React.createElement(FilteredBlogs, null), $('#results').get(0));
	});

	$('#btnSearchUsers').on('click', function () {
		ReactDOM.unmountComponentAtNode($('#results').get(0));
		ReactDOM.render(React.createElement(FilteredUsers, null), $('#results').get(0));
	});
});