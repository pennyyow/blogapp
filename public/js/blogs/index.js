var Blogs = React.createClass({
  displayName: 'Blogs',

  getInitialState() {
    return {
      blogs: [],
      max: 2,
      nothingToShow: false
    };
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
        category: category ? category : null,
        moment: moment,
        tags: tags ? tags : null,
        '_token': token
      },
      success: function (r) {
        var nothingToShow = this.state.nothingToShow;
        if (this.state.max > r.total) nothingToShow = true;

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
    return React.createElement(
      'div',
      null,
      this.state.blogs.map(blog => {
        return React.createElement(Blog, { blog: blog, key: blog._id });
      }),
      React.createElement(
        'div',
        { className: 'col-md-8 col-md-offset-2' },
        React.createElement(
          If,
          { test: !this.state.nothingToShow },
          React.createElement(
            'button',
            { className: 'btn btn-primary btn-block', onClick: this.showMore },
            React.createElement('i', { className: 'fa fa-arrow-down' }),
            ' Show More Blogs'
          )
        ),
        React.createElement(
          If,
          { test: this.state.nothingToShow },
          React.createElement(
            'button',
            { className: 'btn btn-primary btn-block', disabled: true },
            React.createElement('i', { className: 'fa fa-times' }),
            ' No more blogs to show'
          )
        )
      )
    );
  }
});

var Blog = React.createClass({
  displayName: 'Blog',

  getInitialState() {
    return {
      blog: this.props.blog
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
      href: 'http://ca6c9074.ngrok.io/blogapp/public/pub-view-blog/' + blog._id,
      title: blog.title,
      picture: 'http://ca6c9074.ngrok.io/blogapp/public/img/company/' + blog.image,
      caption: blog.description,
      description: blog.description
    }, function (response) {});
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
      { key: blog._id },
      React.createElement(
        'div',
        { className: 'col-md-8 col-md-offset-2' },
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
                { className: 'col-md-4 no-padding' },
                React.createElement(
                  'a',
                  { href: Url.view + '/' + blog._id },
                  React.createElement('img', { alt: 'image', className: 'img-responsive', src: 'img/company/' + blog.image })
                )
              ),
              React.createElement(
                'div',
                { className: 'col-md-8' },
                React.createElement(
                  'a',
                  { href: Url.view + '/' + blog._id, className: 'btn-link title-container' },
                  React.createElement(
                    'h1',
                    null,
                    React.createElement(
                      'strong',
                      null,
                      blog.title
                    )
                  )
                ),
                React.createElement('div', { ref: 'description', className: 'form-group description-container' }),
                React.createElement(
                  'div',
                  { className: 'form-group' },
                  React.createElement(
                    'a',
                    { href: Url.profile + '/' + blog.user._id, className: 'btn-link' },
                    React.createElement(
                      'strong',
                      null,
                      '\xA0',
                      React.createElement('img', { alt: 'image', className: ' img-circle', src: 'img/avatar/' + blog.user.image }),
                      '\xA0 \xA0',
                      blog.user.name,
                      '\xA0'
                    )
                  ),
                  React.createElement(
                    'span',
                    { className: 'text-muted' },
                    React.createElement('i', { className: 'fa fa-clock-o' }),
                    ' ',
                    moment(blog.created_at, "YYYYMMDD h:mm:ss").fromNow()
                  )
                ),
                React.createElement(
                  'div',
                  null,
                  (blog.tags ? blog.tags : []).map(tag => {
                    return React.createElement(
                      'a',
                      { key: tag, href: Url.posts + '?tags=' + blog.tags, className: 'btn btn-white btn-xs btn-tag', type: 'button' },
                      React.createElement('i', { className: 'fa fa-tag' }),
                      ' ',
                      tag
                    );
                  })
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'ibox-footer' },
            React.createElement(
              'div',
              { className: 'pull-right' },
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
                this.state.blog.comments ? this.state.blog.comments.length : 0,
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
                  { href: Url.view + '/' + blog._id + '#comment-section', className: 'btn btn-white btn-xs' },
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
      )
    );
  }
});

$(function () {
  $(".regular").slick({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });

  ReactDOM.render(React.createElement(Blogs, null), $('#blogs').get(0));
});