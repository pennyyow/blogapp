var FilteredBlogs = React.createClass({
	displayName: 'FilteredBlogs',

	getInitialState() {
		return {
			blogs: [],
			max: 2,
			nothingToShow: false
		};
	},
	componentDidMount() {
		this.getResults(this.state.max);
	},
	getResults(max) {
		$.ajax({
			method: 'POST',
			url: Url.filterBlogs,
			data: {
				max: max,
				keyword: keyword,
				'_token': token
			},
			success: function (r) {
				var nothingToShow = this.state.nothingToShow;
				if (this.state.max > r.total) nothingToShow = true;

				this.setState({
					blogs: r.result,
					nothingToShow: nothingToShow
				});

				$(this.refs.spinner).addClass('hidden');
				if (r.result.length == 0) {
					$(this.refs.noResult).append($('<h3/>').text('No results found').addClass('text-center'));
				}
			}.bind(this)
		});
	},
	showMore() {
		var max = this.state.max;
		max += 2;
		this.setState({
			max: max
		});
		this.getResults(max);
	},
	render() {
		var blogs = this.state.blogs;
		return React.createElement(
			'div',
			null,
			React.createElement(
				If,
				{ test: blogs.length > 0 },
				React.createElement(
					'div',
					null,
					blogs.map(blog => {
						return React.createElement(
							'div',
							null,
							React.createElement(
								'div',
								{ className: 'ibox float-e-margins' },
								React.createElement(
									'div',
									{ className: 'ibox-content' },
									React.createElement(
										'div',
										{ className: 'row' },
										React.createElement(
											'div',
											{ className: 'col-md-2 no-padding' },
											React.createElement(
												'a',
												{ href: Url.view + '/' + blog._id, className: 'overflow' },
												React.createElement('img', { alt: 'image', className: 'img-responsive user-image', src: 'img/company/' + blog.image })
											)
										),
										React.createElement(
											'div',
											{ className: 'col-md-10' },
											React.createElement(
												'h3',
												null,
												React.createElement(
													'a',
													{ href: Url.view + '/' + blog._id, className: 'overflow' },
													blog.title
												)
											),
											React.createElement(
												'h4',
												{ className: 'overflow' },
												blog.description
											)
										)
									)
								)
							)
						);
					}),
					React.createElement(
						If,
						{ test: !this.state.nothingToShow },
						React.createElement(
							'button',
							{ className: 'btn btn-primary btn-block', onClick: this.showMore },
							React.createElement('i', { className: 'fa fa-arrow-down' }),
							' Show More Results'
						)
					),
					React.createElement(
						If,
						{ test: this.state.nothingToShow },
						React.createElement(
							'button',
							{ className: 'btn btn-primary btn-block', disabled: true },
							React.createElement('i', { className: 'fa fa-times' }),
							' No more results to show'
						)
					)
				)
			),
			React.createElement(
				'div',
				{ ref: 'noResult' },
				React.createElement(
					'div',
					{ className: 'spiner-example', ref: 'spinner' },
					React.createElement(
						'div',
						{ className: 'sk-spinner sk-spinner-cube-grid' },
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' })
					)
				)
			)
		);
	}
});

var FilteredTags = React.createClass({
	displayName: 'FilteredTags',

	getInitialState() {
		return {
			blogs: [],
			max: 2,
			nothingToShow: false
		};
	},
	componentDidMount() {
		this.getResults(this.state.max);
	},
	getResults(max) {
		$.ajax({
			method: 'POST',
			'url': Url.filterTags,
			'data': {
				max: max,
				keyword: keyword,
				'_token': token
			},
			success: function (r) {
				var nothingToShow = this.state.nothingToShow;
				if (this.state.max > r.total) nothingToShow = true;

				this.setState({
					blogs: r.result,
					nothingToShow: nothingToShow
				});

				$(this.refs.spinner).addClass('hidden');
				if (r.result.length == 0) {
					$(this.refs.noResult).append($('<h3/>').text('No results found').addClass('text-center'));
				}
			}.bind(this)
		});
	},
	showMore() {
		var max = this.state.max;
		max += 2;
		this.setState({
			max: max
		});
		this.getResults(max);
	},
	render() {
		var blogs = this.state.blogs;
		return React.createElement(
			'div',
			null,
			React.createElement(
				If,
				{ test: blogs.length > 0 },
				React.createElement(
					'div',
					null,
					blogs.map(blog => {
						return React.createElement(
							'div',
							null,
							React.createElement(
								'div',
								{ className: 'ibox float-e-margins' },
								React.createElement(
									'div',
									{ className: 'ibox-content' },
									React.createElement(
										'div',
										{ className: 'row' },
										React.createElement(
											'div',
											{ className: 'col-md-2 no-padding' },
											React.createElement(
												'a',
												{ href: Url.view + '/' + blog._id, className: 'overflow' },
												React.createElement('img', { alt: 'image', className: 'img-responsive user-image', src: 'img/company/' + blog.image })
											)
										),
										React.createElement(
											'div',
											{ className: 'col-md-10' },
											React.createElement(
												'h3',
												null,
												React.createElement(
													'a',
													{ href: Url.view + '/' + blog._id, className: 'overflow' },
													blog.title
												)
											),
											React.createElement(
												'h4',
												{ className: 'overflow' },
												blog.description
											)
										)
									)
								)
							)
						);
					}),
					React.createElement(
						If,
						{ test: !this.state.nothingToShow },
						React.createElement(
							'button',
							{ className: 'btn btn-primary btn-block', onClick: this.showMore },
							React.createElement('i', { className: 'fa fa-arrow-down' }),
							' Show More Results'
						)
					),
					React.createElement(
						If,
						{ test: this.state.nothingToShow },
						React.createElement(
							'button',
							{ className: 'btn btn-primary btn-block', disabled: true },
							React.createElement('i', { className: 'fa fa-times' }),
							' No more results to show'
						)
					)
				)
			),
			React.createElement(
				'div',
				{ ref: 'noResult' },
				React.createElement(
					'div',
					{ className: 'spiner-example', ref: 'spinner' },
					React.createElement(
						'div',
						{ className: 'sk-spinner sk-spinner-cube-grid' },
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' })
					)
				)
			)
		);
	}
});

var FilteredUsers = React.createClass({
	displayName: 'FilteredUsers',

	getInitialState() {
		return {
			users: [],
			max: 2,
			nothingToShow: false
		};
	},
	componentDidMount() {
		this.getResults(this.state.max);
	},
	getResults(max) {
		$.ajax({
			method: 'POST',
			url: Url.filterUsers,
			data: {
				max: max,
				keyword: keyword,
				'_token': token
			},
			success: function (r) {
				var nothingToShow = this.state.nothingToShow;
				if (this.state.max > r.total) nothingToShow = true;

				this.setState({
					users: r.result,
					nothingToShow: nothingToShow
				});

				$(this.refs.spinner).addClass('hidden');
				if (r.result.length == 0) {
					$(this.refs.noResult).append($('<h3/>').text('No results found').addClass('text-center'));
				}
			}.bind(this)
		});
	},
	showMore() {
		var max = this.state.max;
		max += 2;
		this.setState({
			max: max
		});
		this.getResults(max);
	},
	render() {
		var users = this.state.users;
		return React.createElement(
			'div',
			null,
			React.createElement(
				If,
				{ test: users.length > 0 },
				React.createElement(
					'div',
					null,
					users.map(user => {
						return React.createElement(
							'div',
							null,
							React.createElement(
								'div',
								{ className: 'ibox float-e-margins' },
								React.createElement(
									'div',
									{ className: 'ibox-content' },
									React.createElement(
										'div',
										{ className: 'row' },
										React.createElement(
											'div',
											{ className: 'col-md-2 no-padding' },
											React.createElement(
												'a',
												{ href: Url.profile + '/' + user._id },
												React.createElement('img', { alt: 'image', className: 'img-responsive user-image', src: 'img/avatar/' + user.image })
											)
										),
										React.createElement(
											'div',
											{ className: 'col-md-10' },
											React.createElement(
												'h3',
												null,
												React.createElement(
													'a',
													{ href: Url.profile + '/' + user._id },
													user.name
												)
											),
											React.createElement(
												'h4',
												null,
												user.email
											)
										)
									)
								)
							)
						);
					}),
					React.createElement(
						If,
						{ test: !this.state.nothingToShow },
						React.createElement(
							'button',
							{ className: 'btn btn-primary btn-block', onClick: this.showMore },
							React.createElement('i', { className: 'fa fa-arrow-down' }),
							' Show More Results'
						)
					),
					React.createElement(
						If,
						{ test: this.state.nothingToShow },
						React.createElement(
							'button',
							{ className: 'btn btn-primary btn-block', disabled: true },
							React.createElement('i', { className: 'fa fa-times' }),
							' No more results to show'
						)
					)
				)
			),
			React.createElement(
				'div',
				{ ref: 'noResult' },
				React.createElement(
					'div',
					{ className: 'spiner-example', ref: 'spinner' },
					React.createElement(
						'div',
						{ className: 'sk-spinner sk-spinner-cube-grid' },
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' }),
						React.createElement('div', { className: 'sk-cube' })
					)
				)
			)
		);
	}
});

$(function () {
	ReactDOM.unmountComponentAtNode($('#search-user').get(0));
	ReactDOM.render(React.createElement(FilteredUsers, null), $('#search-user').get(0));

	$('#tab-user').on('click', function () {
		ReactDOM.unmountComponentAtNode($('#search-user').get(0));
		ReactDOM.render(React.createElement(FilteredUsers, null), $('#search-user').get(0));
	});

	$('#tab-blog').on('click', function () {
		ReactDOM.unmountComponentAtNode($('#search-blog').get(0));
		ReactDOM.render(React.createElement(FilteredBlogs, null), $('#search-blog').get(0));
	});

	$('#tab-tag').on('click', function () {
		ReactDOM.unmountComponentAtNode($('#search-tag').get(0));
		ReactDOM.render(React.createElement(FilteredTags, null), $('#search-tag').get(0));
	});
});