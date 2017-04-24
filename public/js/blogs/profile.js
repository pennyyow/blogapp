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
      url: Url.listBlogsByUser,
      data: {
        max: max,
        user: userProfile,
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
        return React.createElement(Blog, { blog: blog, getAllBlogs: max => this.getAllBlogs(max), max: this.state.max, key: blog._id });
      }),
      React.createElement(
        'div',
        null,
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
      }.bind(this)
    });
  },
  deleteBlog() {
    var blog = this.state.blog;
    var $this = this;
    swal({
      title: "Are you sure?",
      text: "You blog entitle \"" + blog.title + "\" will be deleted ",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel plx!",
      closeOnConfirm: false }, function (isConfirm) {
      if (isConfirm) {
        $.ajax({
          method: 'POST',
          url: Url.deleteBlog,
          data: {
            blog: blog._id,
            '_token': token
          },
          success: function (r) {
            $this.props.getAllBlogs($this.props.max);
          }
        });
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      }
    });
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
        { className: 'ibox float-e-margins blog-posts' },
        React.createElement(
          If,
          { test: !isGuest },
          React.createElement(
            'div',
            { className: 'ibox-title blog-content' },
            React.createElement(
              'div',
              { className: 'ibox-tools' },
              React.createElement(
                'a',
                { className: 'dropdown-toggle', 'data-toggle': 'dropdown', href: '#', 'aria-expanded': 'false' },
                React.createElement('i', { className: 'fa fa-chevron-down' })
              ),
              React.createElement(
                'ul',
                { className: 'dropdown-menu dropdown-user' },
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: Url.editBlog + '/' + blog._id },
                    React.createElement('i', { className: 'fa fa-edit' }),
                    ' Edit'
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', onClick: this.deleteBlog },
                    React.createElement('i', { className: 'fa fa-trash' }),
                    ' Delete'
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'ibox-content' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-md-4 no-padding' },
              React.createElement('img', { alt: 'image', className: 'img-responsive', src: '../img/company/' + blog.image })
            ),
            React.createElement(
              'div',
              { className: 'col-md-8' },
              React.createElement(
                'a',
                { href: Url.view + '/' + blog._id, className: 'btn-link' },
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
              React.createElement(
                'p',
                null,
                blog.description
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
                    '\xA0 ',
                    blog.user.name,
                    ' \xA0'
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
                blog.tags.map(tag => {
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
      )
    );
  }
});

$(function () {
  (function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  var $inputImage = $("#inputImage");
  if (window.FileReader) {
    $inputImage.change(function () {
      var fileReader = new FileReader(),
          files = this.files,
          file;
      if (!files.length) {
        return;
      }

      file = files[0];

      if (/^image\/\w+$/.test(file.type)) {
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
          $('#profile-image-edit').attr('src', this.result);
        };
      } else {
        showMessage("Please choose an image file.");
      }
    });
  }

  ReactDOM.render(React.createElement(Blogs, null), $('#blogs').get(0));
});