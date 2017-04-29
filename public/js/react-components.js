var FlashMsg = React.createClass({
  displayName: 'FlashMsg',

  getDefaultProps() {
    return {
      flash: null
    };
  },
  getInitialState() {
    return {
      flash: this.props.flash
    };
  },
  show(flash) {
    this.setState({ flash: flash });
  },
  render() {
    if (!this.props.flash) return React.createElement('div', null);

    return React.createElement(
      'div',
      { id: 'flash' + this.props.flash.type, className: 'errors alert alert-' + this.props.flash.type },
      this.props.flash.msg
    );
  }
});

var ErrorList = React.createClass({
  displayName: 'ErrorList',

  getDefaultProps() {
    return {
      errors: null,
      fields: []
    };
  },
  render() {
    if (this.props.errors == null) return React.createElement('div', null);

    var errors;

    if (this.props.fields) errors = $.map(this.props.fields, (f => this.props.errors[f]).bind(this));else errors = $.map(this.props.errors, (v, k) => v);

    return React.createElement(
      'div',
      { className: 'errors alert alert-danger' },
      errors.map(e => React.createElement(
        'p',
        { key: e },
        e
      ))
    );
  }
});

var Paginator = React.createClass({
  displayName: 'Paginator',

  pageClick(offset) {
    this.props.pageClick(offset);
  },
  getDefaultProps() {
    return {
      max: 10,
      offset: 0,
      total: 0,
      maxSteps: 10,
      url: '',
      params: {},
      pageClick: function (offset) {}
    };
  },
  render() {
    var max = this.props.max;
    var offset = this.props.offset;
    var total = this.props.total;

    var currentPage = parseInt(offset / max);
    var startPage = Math.max(0, currentPage - 5);
    var maxPages = parseInt(total / max);
    var remain = parseInt(total % max);

    if (remain == 0) maxPages = parseInt(total / max) - 1;

    var prevPage = Math.max(0, currentPage - 1);
    var nextPage = Math.min(maxPages, currentPage + 1);

    var maxSteps = this.props.maxSteps;
    var steps = 0;

    var params = $.extend(this.props.params, {
      max: max,
      offset: offset,
      total: total
    });

    var pages = Array.range(startPage, Math.min(maxPages + 1, maxSteps));
    var paginator = this;
    return React.createElement(
      'nav',
      null,
      React.createElement(
        'ul',
        { className: 'pagination' },
        pages.map(page => {
          return [React.createElement(
            If,
            { test: page == currentPage },
            React.createElement(
              'li',
              { className: 'active', key: page },
              React.createElement(
                'a',
                { href: this.props.url, onClick: paginator.pageClick.bind(this, page * max) },
                page + 1
              )
            )
          ), React.createElement(
            If,
            { test: page != currentPage },
            React.createElement(
              'li',
              { key: page },
              React.createElement(
                'a',
                { href: this.props.url, onClick: paginator.pageClick.bind(this, page * max) },
                page + 1
              )
            )
          )];
        })
      )
    );
  }
});

var Required = React.createClass({
  displayName: 'Required',

  render() {
    return React.createElement(
      'span',
      { className: 'required' },
      '*'
    );
  }
});

var If = React.createClass({
  displayName: 'If',

  render() {
    if (!this.props.test) return null;else return this.props.children;
  }
});