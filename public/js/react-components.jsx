var FlashMsg = React.createClass({
  getDefaultProps() {
    return {
      flash: null
    };
  },
  getInitialState() {
    return {
      flash: this.props.flash
    }
  },
  show(flash) {
    this.setState({flash: flash});
  },
  render() {
    if(!this.props.flash)
      return (<div></div>);

    return (
      <div id={'flash' + this.props.flash.type} className={'errors alert alert-' + this.props.flash.type}>
        {this.props.flash.msg}
      </div>
    );
  }
});

var ErrorList = React.createClass({
  getDefaultProps() {
    return {
      errors: null,
      fields: []
    }
  },
  render() {
    if(this.props.errors == null)
      return (<div></div>);

    var errors;

    if(this.props.fields)
      errors = $.map(this.props.fields, (f => this.props.errors[f]).bind(this));
    else
      errors = $.map(this.props.errors, (v, k) => v);

    return (
      <div className="errors alert alert-danger">
        {errors.map(e => <p key={e}>{e}</p>)}
      </div>
    );
  }
});

var Paginator = React.createClass({
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
      pageClick: function(offset) {}
    }
  },
  render() {
    var max = this.props.max;
    var offset = this.props.offset;
    var total = this.props.total;

    var currentPage = parseInt(offset / max);
    var startPage = Math.max(0, currentPage - 5);
    var maxPages = parseInt(total / max);
    var remain = parseInt(total % max);

    if(remain == 0)
      maxPages = parseInt(total / max) - 1;

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
    return (
      <nav>
        <ul className="pagination">
          {pages.map(page => {
            return (
              [
                <If test={page == currentPage}>
                  <li className="active" key={page}>
                    <a href={this.props.url} onClick={paginator.pageClick.bind(this, page * max)}>
                      {page + 1}
                    </a>
                  </li>
                </If>,
                <If test={page != currentPage}>
                  <li key={page}>
                    <a href={this.props.url} onClick={paginator.pageClick.bind(this, page * max)}>
                      {page + 1}
                    </a>
                  </li>
                </If>
              ]
            );
          })}
        </ul>
      </nav>
    );
  }
});

var Required = React.createClass({
  render() {
    return (
      <span className="required">*</span>
    );
  }
});

var If = React.createClass({
  render() {
    if(!this.props.test)
      return null;
    else
      return this.props.children;
  }
});
