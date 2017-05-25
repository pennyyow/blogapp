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
				tags: tags ? tags : null,
				moment: moment,
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
						src: '../img/company/' + blog.image }),
					React.createElement(
						'div',
						{ className: 'panel panel-default' },
						React.createElement(
							'div',
							{ className: 'panel-body b-panel' },
							React.createElement(
								'span',
								{ className: 'text-muted blog-author' },
								React.createElement(
									'a',
									{ href: Url.profile + '/' + this.state.author._id, className: 'btn-link' },
									React.createElement('img', { alt: 'image', className: 'img-circ', src: '../img/avatar/' + this.state.author.image })
								),
								React.createElement(
									'a',
									{ href: Url.profile + '/' + this.state.author._id, className: 'btn-link' },
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
								' ',
								React.createElement('i', { className: 'fa fa-clock-o' }),
								' ',
								moment(blog.created_at).fromNow()
							),
							React.createElement(
								'h1',
								{ className: 'title-container', style: { padding: '8px' } },
								blog.title
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'ibox-content c-panel' },
					React.createElement('div', { className: 'text-center article-title' }),
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
										'a',
										{ key: tag, href: Url.posts + '?tags=' + tag, className: 'btn btn-white btn-xs btn-tag', type: 'button' },
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
				moment: moment,
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

				$.ajax({
					method: 'POST',
					url: Url.comment,
					data: {
						comment: content,
						moment: moment,
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
			href: 'http://008de834.ngrok.io/blogapp/public/pub-view-blog/' + blog._id,
			title: blog.title,
			picture: 'http://008de834.ngrok.io/blogapp/public/img/company/' + blog.image,
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
							' ',
							blog.views ? 'Views' : 'View',
							'\xA0\xA0\xA0',
							React.createElement('i', { className: 'fa fa-thumbs-up' }),
							'  ',
							liked,
							' ',
							liked == 1 || liked == 0 ? 'Like' : 'Likes',
							'\xA0\xA0\xA0',
							React.createElement('i', { className: 'fa fa-thumbs-down' }),
							' ',
							disliked,
							' ',
							disliked == 1 || disliked == 0 ? 'Dislike' : 'Dislikes',
							'\xA0\xA0\xA0',
							React.createElement('i', { className: 'fa fa-comments' }),
							' ',
							this.state.comments ? this.state.comments.length : 0,
							' ',
							this.state.comments.length == 1 || this.state.comments.length == 0 ? 'Comment' : 'Comments'
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
						return React.createElement(CommentBody, { comment: comment, blog: blog, getBlog: () => this.getBlog() });
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

var CommentBody = React.createClass({
	displayName: 'CommentBody',

	onKeyUp(e) {
		var content = $(this.refs.comment).code();
		if (e.key === 'Enter') {
			if (!e.nativeEvent.shiftKey) {
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
					success: function (r) {
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
		return React.createElement(
			'div',
			{ className: 'social-feed-box', key: comment.dateAdded.date },
			React.createElement(
				'div',
				{ className: 'social-footer' },
				React.createElement(
					'div',
					{ className: 'social-comment' },
					React.createElement(
						If,
						{ test: !isGuest && comment.user._id == user.id },
						React.createElement(
							'div',
							null,
							React.createElement(UpdateComment, { comment: comment, blog: this.props.blog, getBlog: () => this.getBlog() })
						)
					),
					React.createElement(
						'a',
						{ href: Url.profile + '/' + comment.user._id, className: 'pull-left' },
						React.createElement('img', { alt: 'image', src: '../img/avatar/' + comment.user.image })
					),
					React.createElement(
						'div',
						{ className: 'media-body' },
						React.createElement(
							'a',
							{ href: Url.profile + '/' + comment.user._id },
							comment.user.name
						),
						'\xA0\xA0',
						React.createElement(
							'small',
							{ className: 'text-muted' },
							moment(comment.dateAdded.date, "YYYYMMDD h:mm:ss").fromNow()
						),
						React.createElement(CommentContent, { content: comment.content }),
						React.createElement(
							If,
							{ test: !isGuest },
							React.createElement(
								'a',
								{ href: '#', onClick: this.showReplyBox, className: 'small' },
								'Reply'
							)
						)
					),
					(comment.subComments ? comment.subComments : []).map(subComment => {
						return React.createElement(
							'div',
							{ className: 'social-comment' },
							React.createElement(
								'a',
								{ href: Url.profile + '/' + subComment.user.id, className: 'pull-left' },
								React.createElement('img', { alt: 'image', src: '../img/avatar/' + subComment.user.image })
							),
							React.createElement(
								'div',
								{ className: 'media-body' },
								React.createElement(
									'a',
									{ href: Url.profile + '/' + subComment.user.id },
									subComment.user.name
								),
								'\xA0\xA0',
								React.createElement(
									'small',
									{ className: 'text-muted' },
									moment(subComment.dateAdded.date, "YYYYMMDD h:mm:ss").fromNow()
								),
								React.createElement(CommentContent, { content: subComment.content })
							)
						);
					}),
					React.createElement(
						'div',
						{ className: 'social-comment hidden', ref: 'replyBox' },
						React.createElement(
							'a',
							{ href: '', className: 'pull-left' },
							React.createElement('img', { alt: 'image', src: '../img/avatar/' + (user ? user.image : '') })
						),
						React.createElement(
							'div',
							{ className: 'media-body' },
							React.createElement('div', { className: 'form-control subcomment-textbox',
								onKeyUp: this.onKeyUp, ref: 'comment',
								'data-text': 'Write comment...', contentEditable: 'true' })
						)
					)
				)
			)
		);
	}
});

var UpdateComment = React.createClass({
	displayName: 'UpdateComment',

	getInitialState() {
		return {
			comment: this.props.comment,
			blog: this.props.blog
		};
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
			success: function (r) {
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
			success: function (r) {
				window.location.href = Url.viewBlog + '/' + blogId;
			}.bind(this)
		});
	},
	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'a',
				{ className: 'dropdown-toggle pull-right', href: '#', onClick: this.showModal },
				React.createElement('i', { className: 'fa fa-chevron-down' })
			),
			React.createElement(
				'div',
				{ ref: 'updateModal', className: 'modal fade', role: 'dialog' },
				React.createElement(
					'div',
					{ className: 'modal-dialog' },
					React.createElement(
						'div',
						{ className: 'modal-content' },
						React.createElement(
							'div',
							{ className: 'modal-header' },
							React.createElement(
								'button',
								{ type: 'button', className: 'close', 'data-dismiss': 'modal' },
								'\xD7'
							),
							React.createElement(
								'h4',
								{ className: 'modal-title' },
								'Update Comment'
							)
						),
						React.createElement(
							'div',
							{ className: 'modal-body' },
							React.createElement('div', { className: 'form-control comment-textbox',
								onKeyUp: this.onKeyUp, ref: 'comment',
								'data-text': 'Write comment...', contentEditable: 'true' })
						),
						React.createElement(
							'div',
							{ className: 'modal-footer text-left' },
							React.createElement(
								'button',
								{ type: 'button', className: 'btn btn-primary pull-left', 'data-dismiss': 'modal', onClick: this.updateComment },
								'Save Changes'
							),
							React.createElement(
								'button',
								{ type: 'button', className: 'btn btn-danger pull-left', 'data-dismiss': 'modal', onClick: this.deleteComment },
								'Delete Comment'
							),
							React.createElement(
								'button',
								{ type: 'button', className: 'btn btn-default pull-right', 'data-dismiss': 'modal' },
								'Close'
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