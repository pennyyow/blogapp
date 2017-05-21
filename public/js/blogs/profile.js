var Blogs = React.createClass({
  displayName: 'Blogs',

  getInitialState() {
    return {
      blogs: [],
      max: 6,
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
        moment: moment,
        tags: tags ? tags : null,
        '_token': token
      },
      success: function (r) {
        var nothingToShow = this.state.nothingToShow;
        if (this.state.max > r.total) nothingToShow = true;

        $(this.refs.spinner).addClass('hidden');

        this.setState({
          blogs: r.blogs,
          nothingToShow: nothingToShow
        });
      }.bind(this)
    });
  },
  showMore() {
    var max = this.state.max;
    max += 6;
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
      ),
      React.createElement(
        'div',
        { className: 'col-md-12 m-b-25' },
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

    var $this = this;
    $(this.refs.imgBlog).hover(function () {
      $($this.refs.imgLink).addClass('hover');
    }, function () {
      $($this.refs.imgLink).removeClass('hover');
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
          blog: r
        });
        $(this.refs.description).html(r.description);
      }.bind(this)
    });
  },
  deleteBlog() {
    var blog = this.state.blog;
    var $this = this;
    swal({
      title: "Are you sure?",
      text: "Your blog entitled \"" + blog.title + "\" will be deleted.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel it!",
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
        swal("Deleted!", "Your blog has been deleted.", "success");
      }
    });
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
      { key: blog._id, className: 'col-md-4 m-b-15' },
      React.createElement(
        'div',
        { className: 'ibox-content image-container no-padding border-left-right col-md-12' },
        React.createElement(
          'a',
          { href: Url.view + '/' + blog._id },
          React.createElement(
            If,
            { test: !isGuest },
            React.createElement(
              'div',
              { className: 'ibox-tools marg-r' },
              React.createElement(
                'a',
                { className: 'dropdown-toggle', 'data-toggle': 'dropdown', href: '#', 'aria-expanded': 'false' },
                React.createElement('i', { className: 'fa fa-chevron-down' })
              ),
              React.createElement(
                'ul',
                { className: 'dropdown-menu dropdown-user pull-right' },
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
          ),
          React.createElement('img', { alt: 'image', ref: 'imgBlog', className: 'img-responsive img-blog', src: '../img/company/' + blog.image })
        ),
        React.createElement(
          'a',
          { href: Url.view + '/' + blog._id, ref: 'imgLink', className: 'btn-link title-container' },
          React.createElement(
            'h1',
            { className: 'ellips' },
            React.createElement(
              'strong',
              null,
              blog.title
            )
          )
        ),
        React.createElement(
          'p',
          { className: 'text-center reactions' },
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
        'div',
        { className: 'ibox-content col-md-12 p-t-b-10' },
        React.createElement('div', { ref: 'description', className: 'form-group description-container ellips-two' }),
        React.createElement(
          'div',
          { className: 'form-group' },
          (blog.tags ? blog.tags : []).map(tag => {
            return React.createElement(
              'a',
              { key: tag, href: Url.posts + '?tags=' + tag, className: 'btn btn-white btn-xs btn-tag', type: 'button' },
              React.createElement('i', { className: 'fa fa-tag' }),
              ' ',
              tag
            );
          })
        ),
        React.createElement(
          'div',
          { className: 'form-group m-b-0' },
          React.createElement(
            'a',
            { href: Url.profile + '/' + blog.user._id, className: 'btn-link' },
            React.createElement(
              'strong',
              null,
              '\xA0',
              React.createElement('img', { alt: 'image', className: ' img-circle', src: '../img/avatar/' + blog.user.image }),
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
        )
      ),
      React.createElement(
        'div',
        { className: 'ibox-footer col-md-12 text-center' },
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
    );
  }
});

$(function () {

  var imageChanged = false;
  var $inputImage = $("#inputImage");
  if (window.FileReader) {
    $inputImage.change(function () {
      imageChanged = true;
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

  $('#btnSave').click(function (e) {
    e.preventDefault();
    $('#btnSave').addClass('disabled');
    var formData = $('form#update-profile-form').serializeArray();
    formData.push({ name: 'file', value: imageChanged ? $('#profile-image-edit').attr('src') : null });

    $.ajax({
      method: 'POST',
      url: Url.updateProfile,
      data: formData,
      success: function (r) {
        console.log('USER: ' + JSON.stringify(r));
        window.location.href = Url.profile + '/' + user.id;
      },
      error: function (r) {
        //console.log('>>>JSON: ' + JSON.stringify(r))
        var errors = r.responseJSON.errors;

        if (errors.firstname) {
          $('.firstname').addClass('has-error');
          $('.firstname-label').removeClass('hidden');
          $('.firstname-label').text(errors.firstname);
        } else {
          $('.firstname').removeClass('has-error');
          $('.firstname-label').addClass('hidden');
          $('.firstname-label').text('');
        }

        if (errors.lastname) {
          $('.lastname').addClass('has-error');
          $('.lastname-label').removeClass('hidden');
          $('.lastname-label').text(errors.lastname);
        } else {
          $('.lastname').removeClass('has-error');
          $('.lastname-label').addClass('hidden');
          $('.lastname-label').text('');
        }

        if (errors.email) {
          $('.email').addClass('has-error');
          $('.email-label').removeClass('hidden');
          $('.email-label').text(errors.email);
        } else {
          $('.email').removeClass('has-error');
          $('.email-label').addClass('hidden');
          $('.email-label').text('');
        }

        $('#btnSave').removeClass('disabled');
      }
    });
  });

  ReactDOM.render(React.createElement(Blogs, null), $('#blogs').get(0));
});