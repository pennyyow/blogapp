var FilteredBlogs = React.createClass({
	getInitialState() {
		return {
			blogs: [],
			max: 2,
			nothingToShow: false 
		}
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
	      success: function(r) {
	      	var nothingToShow = this.state.nothingToShow;
      		if(this.state.max > r.total) nothingToShow = true;

			this.setState({
				blogs: r.result,
				nothingToShow: nothingToShow
			});

	      	$(this.refs.spinner).addClass('hidden');
	      	if(r.result.length == 0) {
				$(this.refs.noResult).append(
					$('<h3/>')
					  .text('No results found')
					  .addClass('text-center')
				);
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
		return(
			<div>
				<If test={blogs.length > 0}>
					<div>
						{
							blogs.map( blog => {
								return(
									<div>
										<div className="ibox float-e-margins">
				                            <div className="ibox-content">
				                                <div className="row">
				                                    <div className="col-md-2 no-padding">
				                                   	<a href={ Url.view + '/' + blog._id}  className="overflow">
				                                      <img alt="image" className="img-responsive user-image" src={'img/company/' + blog.image} />
				                                    </a>
				                                    </div>
				                                    <div className="col-md-10">
				                                        <h3>
				                                            <a href={ Url.view + '/' + blog._id}  className="overflow">
				                                                {blog.title}
				                                            </a>
				                                        </h3>
				                                        <h4 className="overflow">{blog.description}</h4>
				                                    </div>
				                                </div>
				                            </div>
				                        </div>
									</div>
								);
							})
						}
						<If test={!this.state.nothingToShow}>
							<button className="btn btn-primary btn-block" onClick={this.showMore}>
								<i className="fa fa-arrow-down"></i> Show More Results
							</button>
						</If>
						<If test={this.state.nothingToShow}>
							<button className="btn btn-primary btn-block" disabled>
								<i className="fa fa-times"></i> No more results to show 
							</button>
						</If>
					</div>
				</If>
				<div ref="noResult">
					<div className="spiner-example" ref="spinner">
                        <div className="sk-spinner sk-spinner-cube-grid">
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                        </div>
                    </div>
				</div>
			</div>
		);
	}	
});

var FilteredTags = React.createClass({
	getInitialState() {
		return {
			blogs: [],
			max: 2,
			nothingToShow: false 
		}
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
			success: function(r) {
				var nothingToShow = this.state.nothingToShow;
	      		if(this.state.max > r.total) nothingToShow = true;

				this.setState({
					blogs: r.result,
					nothingToShow: nothingToShow
				});

				$(this.refs.spinner).addClass('hidden');
		      	if(r.result.length == 0) {
					$(this.refs.noResult).append(
						$('<h3/>')
						  .text('No results found')
						  .addClass('text-center')
					);
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
		return(
			<div>
				<If test={blogs.length > 0}>
					<div>
						{
							blogs.map( blog => {
								return(
									<div>
										<div className="ibox float-e-margins">
				                            <div className="ibox-content">
				                                <div className="row">
				                                    <div className="col-md-2 no-padding">
				                                    <a href={ Url.view + '/' + blog._id} className="overflow">
				                                      <img alt="image" className="img-responsive user-image" src={'img/company/' + blog.image} />
				                                    </a>
				                                    </div>
				                                    <div className="col-md-10">
				                                        <h3>
				                                            <a href={ Url.view + '/' + blog._id} className="overflow">
				                                                {blog.title}
				                                            </a>
				                                        </h3>
				                                        <h4 className="overflow">{blog.description}</h4>
				                                    </div>
				                                </div>
				                            </div>
				                        </div>
									</div>
								);
							})
						}
						<If test={!this.state.nothingToShow}>
							<button className="btn btn-primary btn-block" onClick={this.showMore}>
								<i className="fa fa-arrow-down"></i> Show More Results
							</button>
						</If>
						<If test={this.state.nothingToShow}>
							<button className="btn btn-primary btn-block" disabled>
								<i className="fa fa-times"></i> No more results to show 
							</button>
						</If>
					</div>
				</If>
				<div ref="noResult">
					<div className="spiner-example" ref="spinner">
                        <div className="sk-spinner sk-spinner-cube-grid">
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                        </div>
                    </div>
				</div>
			</div>
		);
	}
});

var FilteredUsers = React.createClass({
	getInitialState() {
		return {
			users: [],
			max: 2,
			nothingToShow: false 
		}
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
			success: function(r) {
				var nothingToShow = this.state.nothingToShow;
	      		if(this.state.max > r.total) nothingToShow = true;

				this.setState({
					users: r.result,
					nothingToShow: nothingToShow
				});

				$(this.refs.spinner).addClass('hidden');
		      	if(r.result.length == 0) {
					$(this.refs.noResult).append(
						$('<h3/>')
						  .text('No results found')
						  .addClass('text-center')
					);
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
		return(
			<div>
				<If test={users.length > 0}>
					<div>
						{
							users.map( user => {
								return(
									<div>
										<div className="ibox float-e-margins">
				                            <div className="ibox-content">
				                                <div className="row">
				                                    <div className="col-md-2 no-padding">
				                                    <a href={Url.profile + '/' + user._id}>
				                                      <img alt="image" className="img-responsive user-image" src={'img/avatar/' + user.image} />
				                                    </a>
				                                    </div>
				                                    <div className="col-md-10">
				                                        <h3>
				                                            <a href={Url.profile + '/' + user._id}>
				                                                {user.name}
				                                            </a>
				                                        </h3>
				                                        <h4>{user.email}</h4>
				                                    </div>
				                                </div>
				                            </div>
				                        </div>
									</div>
								)
							})
						}
						<If test={!this.state.nothingToShow}>
							<button className="btn btn-primary btn-block" onClick={this.showMore}>
								<i className="fa fa-arrow-down"></i> Show More Results
							</button>
						</If>
						<If test={this.state.nothingToShow}>
							<button className="btn btn-primary btn-block" disabled>
								<i className="fa fa-times"></i> No more results to show 
							</button>
						</If>
					</div>
				</If>
				<div ref="noResult">
					<div className="spiner-example" ref="spinner">
                        <div className="sk-spinner sk-spinner-cube-grid">
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                            <div className="sk-cube"></div>
                        </div>
                    </div>
				</div>
			</div>
		);
	}
});

$(function() {
	ReactDOM.unmountComponentAtNode($('#search-user').get(0));
	ReactDOM.render(
   		<FilteredUsers />,
    	$('#search-user').get(0)
	);

	$('#tab-user').on('click', function() {
		ReactDOM.unmountComponentAtNode($('#search-user').get(0));
		ReactDOM.render(
	   		<FilteredUsers />,
	    	$('#search-user').get(0)
		);
	});

	$('#tab-blog').on('click', function() {
		ReactDOM.unmountComponentAtNode($('#search-blog').get(0));
		ReactDOM.render(
	   		<FilteredBlogs />,
	    	$('#search-blog').get(0)
		);
	});

	$('#tab-tag').on('click', function() {
		ReactDOM.unmountComponentAtNode($('#search-tag').get(0));
		ReactDOM.render(
	   		<FilteredTags />,
	    	$('#search-tag').get(0)
		);
	});	
});