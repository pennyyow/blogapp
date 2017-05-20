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
						var reaction = null;
						var liked = 0;
						var disliked = 0;

						if (blog.reactions) {
							if (!isGuest) {
								reaction = $.grep(blog.reactions, function (reaction) {
									return reaction._id == user.id;
								})[0];
							}

							$.each(blog.reactions, function (i, reaction) {
								if (reaction.reaction == 1) liked++;
								if (reaction.reaction == 2) disliked++;
							});
						}

						return React.createElement(
							'div',
							{ key: blog._id },
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
												'div',
												{ className: 'form-group' },
												'Posted by',
												React.createElement(
													'a',
													{ href: Url.profile + '/' + blog.user._id, className: 'btn-link' },
													React.createElement(
														'strong',
														null,
														'\xA0',
														blog.user.name,
														'\xA0'
													)
												),
												React.createElement(
													'span',
													{ className: 'text-muted' },
													React.createElement('i', { className: 'fa fa-clock-o' }),
													' ',
													blog.created_at
												)
											),
											React.createElement(
												'p',
												{ className: 'status-container' },
												React.createElement('i', { className: 'fa fa-eye' }),
												' ',
												blog.views ? blog.views : 0,
												' Views \xA0\xA0\xA0',
												React.createElement('i', { className: 'fa fa-thumbs-up' }),
												' ',
												liked,
												' Likes \xA0\xA0\xA0',
												React.createElement('i', { className: 'fa fa-thumbs-down' }),
												' ',
												disliked,
												'  Dislikes'
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
							{ key: blog._id },
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
												'div',
												{ className: 'form-group' },
												'Posted by',
												React.createElement(
													'a',
													{ href: Url.profile + '/' + blog.user._id, className: 'btn-link' },
													React.createElement(
														'strong',
														null,
														'\xA0',
														blog.user.name,
														'\xA0'
													)
												),
												React.createElement(
													'span',
													{ className: 'text-muted' },
													React.createElement('i', { className: 'fa fa-clock-o' }),
													' ',
													blog.created_at
												)
											),
											React.createElement(
												'div',
												null,
												(blog.tags ? blog.tags : []).map(tag => {
													return React.createElement(
														'a',
														{ key: tag, href: '#', className: 'btn btn-white btn-xs btn-tag', type: 'button' },
														React.createElement('i', { className: 'fa fa-tag' }),
														' ',
														tag
													);
												})
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
							{ key: user._id },
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