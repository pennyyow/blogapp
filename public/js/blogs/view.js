var Blog = React.createClass({
	displayName: 'Blog',

	getInitialState() {
		return {
			blog: {},
			author: {},
			tags: []
		};
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
			success: function (r) {
				console.log('>>>>>>>>>>BLOG: ' + JSON.stringify(r));
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

		return React.createElement(
			If,
			{ test: blog != null },
			React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'ibox-content no-padding border-left-right' },
					React.createElement('img', { alt: 'image', className: 'img-responsive', src: '../img/avatar/' + blog.image })
				),
				React.createElement(
					'div',
					{ className: 'ibox-content' },
					React.createElement(
						'div',
						{ className: 'text-center article-title' },
						React.createElement(
							'h1',
							null,
							blog.title
						),
						React.createElement(
							'span',
							{ className: 'text-muted' },
							'By ',
							React.createElement(
								'a',
								{ href: '#', className: 'btn-link' },
								React.createElement(
									If,
									{ test: blog.user },
									React.createElement(
										'strong',
										null,
										' ',
										this.state.author.firstName,
										' ',
										this.state.author.lastName,
										' '
									)
								)
							),
							React.createElement('i', { className: 'fa fa-clock-o' }),
							' ',
							blog.updated_at
						)
					),
					React.createElement('div', { id: 'content', ref: 'content' }),
					React.createElement('hr', null),
					React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(
							'div',
							{ className: 'col-md-12' },
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'h5',
									null,
									'Tags:'
								),
								this.state.tags.map(tag => {
									return React.createElement(
										'button',
										{ className: 'btn btn-white btn-xs btn-tag', type: 'button' },
										React.createElement('i', { className: 'fa fa-tag' }),
										' ',
										tag
									);
								})
							)
						)
					),
					React.createElement('hr', null),
					React.createElement(Reactions, { blog: this.state.blog, test: 'test' })
				)
			)
		);
	}
});

var Reactions = React.createClass({
	displayName: 'Reactions',

	getInitialState() {
		return {
			blog: this.props.blog,
			comments: []
		};
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
			success: function (r) {
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
			success: function (r) {
				this.setState({
					blog: r,
					comments: r.comments
				});
			}.bind(this)
		});
	},
	onKeyUp(e) {
		if (e.key === 'Enter') {
			if (!e.nativeEvent.shiftKey) {
				$.ajax({
					method: 'POST',
					url: Url.comment,
					data: {
						comment: $(this.refs.comment).val(),
						blog: this.state.blog._id,
						'_token': token
					},
					success: function (r) {
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
			null,
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-md-12' },
					React.createElement(
						'div',
						{ className: 'pull-right status' },
						React.createElement(
							'p',
							null,
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
							'  Dislikes \xA0\xA0\xA0',
							React.createElement('i', { className: 'fa fa-comments' }),
							' ',
							this.state.comments ? this.state.comments.length : 0,
							' Comments'
						)
					),
					React.createElement(
						If,
						{ test: !isGuest },
						React.createElement(
							'div',
							{ className: 'btn-group' },
							React.createElement(
								'button',
								{ className: reaction && reaction.reaction == 1 ? "btn btn-white btn-xs like-on" : "btn btn-white btn-xs",
									onClick: () => this.addReaction(1, blog._id) },
								React.createElement('i', { className: 'fa fa-thumbs-up' }),
								' Like'
							),
							React.createElement(
								'button',
								{ className: reaction && reaction.reaction == 2 ? "btn btn-white btn-xs dislike-on" : "btn btn-white btn-xs",
									onClick: () => this.addReaction(2, blog._id) },
								React.createElement('i', { className: 'fa fa-thumbs-down' }),
								' Dislike'
							),
							React.createElement(
								'button',
								{ className: 'btn btn-white btn-xs' },
								React.createElement('i', { className: 'fa fa-comments' }),
								' Comment'
							),
							React.createElement(
								'button',
								{ className: 'btn btn-white btn-xs' },
								React.createElement('i', { className: 'fa fa-share' }),
								' Share'
							)
						)
					),
					React.createElement(
						If,
						{ test: isGuest },
						React.createElement(
							'div',
							{ className: 'btn-group' },
							React.createElement(
								'button',
								{ className: 'btn btn-white btn-xs' },
								React.createElement('i', { className: 'fa fa-share' }),
								' Share'
							)
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-lg-12' },
					(this.state.comments ? this.state.comments : []).map(comment => {
						return React.createElement(
							'div',
							{ className: 'social-feed-box', key: comment.dateAdded.date },
							React.createElement(
								'div',
								{ className: 'social-avatar' },
								React.createElement(
									'a',
									{ href: '', className: 'pull-left' },
									React.createElement('img', { alt: 'image', src: '../img/avatar/' + comment.user.image })
								),
								React.createElement(
									'div',
									{ className: 'media-body' },
									React.createElement(
										'a',
										{ href: '#' },
										comment.user.firstName,
										' ',
										comment.user.lastName
									),
									React.createElement(
										'small',
										{ className: 'text-muted' },
										'Today 4:21 pm - 12.06.2014'
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'social-body' },
								React.createElement(
									'p',
									null,
									comment.content
								)
							)
						);
					}),
					React.createElement(
						If,
						{ test: user },
						React.createElement(
							'div',
							{ className: 'social-feed-box' },
							React.createElement(
								'div',
								{ className: 'social-avatar comment-text' },
								React.createElement(
									'a',
									{ href: '', className: 'pull-left' },
									React.createElement('img', { alt: 'image', src: '../img/avatar/' + (user ? user.image : '') })
								),
								React.createElement(
									'div',
									{ className: 'media-body' },
									React.createElement('textarea', { className: 'form-control', onKeyUp: this.onKeyUp,
										placeholder: 'Write comment...', rows: '3', ref: 'comment' })
								)
							)
						)
					)
				)
			)
		);
	}
});

$(function () {
	ReactDOM.render(React.createElement(Blog, null), $('#blog').get(0));
});