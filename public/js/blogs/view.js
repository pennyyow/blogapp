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
					React.createElement('img', { alt: 'image', className: 'img-responsive',
						src: '../img/company/' + blog.image })
				),
				React.createElement(
					'div',
					{ className: 'ibox-content' },
					React.createElement(
						'div',
						{ className: 'text-center article-title' },
						React.createElement(
							'h1',
							{ className: 'title-container', style: { padding: '8px' } },
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
										this.state.author.name,
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
									this.state.tags ? 'Tags: ' : 'No tags added'
								),
								(this.state.tags ? this.state.tags : []).map(tag => {
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
		$(this.refs.description).html(this.state.blog.description);

		window.fbAsyncInit = function () {
			FB.init({
				appId: '1352297461495712',
				xfbml: true,
				version: 'v2.0'
			});
		};

		(function (d, s, id) {
			var js,
			    fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s);js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
			fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');
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
		var content = $(this.refs.comment).code();
		if (e.key === 'Enter') {
			if (!e.nativeEvent.shiftKey) {
				$(this.refs.comment).html('');
				console.log('>>>>>>>>>>>>>>>>COMENT: ' + $(this.refs.comment).code());
				$.ajax({
					method: 'POST',
					url: Url.comment,
					data: {
						comment: content,
						blog: this.state.blog._id,
						'_token': token
					},
					success: function (r) {
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
			href: 'http://d09343f8.ngrok.io/blogapp/public/pub-view-blog/' + blog._id,
			title: blog.title,
			picture: 'http://d09343f8.ngrok.io/blogapp/public/img/company/' + blog.image,
			caption: blog.description,
			description: blog.description
		}, function (response) {});
	},
	goTo() {
		$(".comment-textbox").focus();
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
								'a',
								{ href: '#comment-textbox', className: 'btn btn-white btn-xs', onClick: this.goTo },
								React.createElement('i', { className: 'fa fa-comments' }),
								' Comment'
							),
							React.createElement(
								'button',
								{ className: 'btn btn-white btn-xs', onClick: this.share },
								React.createElement(
									'i',
									{ className: 'fa fa-share' },
									' Share '
								)
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
								{ className: 'btn btn-white btn-xs', onClick: this.share },
								React.createElement(
									'i',
									{ className: 'fa fa-share' },
									' Share '
								)
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
										comment.user.name
									),
									React.createElement(
										'small',
										{ className: 'text-muted' },
										comment.dateAdded.date
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'social-body' },
								React.createElement(CommentContent, { content: comment.content })
							)
						);
					}),
					React.createElement(
						If,
						{ test: user },
						React.createElement(
							'div',
							{ className: 'social-feed-box', id: 'comment-section' },
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
									React.createElement('div', { className: 'form-control comment-textbox',
										onKeyUp: this.onKeyUp, ref: 'comment',
										'data-text': 'Write comment...', contentEditable: 'true' })
								)
							)
						)
					)
				)
			)
		);
	}
});

var CommentContent = React.createClass({
	displayName: 'CommentContent',

	componentDidMount() {
		$(this.refs.content).html(this.props.content);
	},
	render() {
		return React.createElement('div', { ref: 'content' });
	}
});

$(function () {
	ReactDOM.render(React.createElement(Blog, null), $('#blog').get(0));
});