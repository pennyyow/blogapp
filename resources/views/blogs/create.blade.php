
{!! Form::open(array('action' => array('CheckController@store'), 'method' => 'POST', 'id' => 'form1', 'class' => 'form-vertical')) !!}
		<div class="col-md-12 form-group{{ $errors->has('blogName') ? ' has-error' : '' }}">
		<label for="blogName">Group Name</label>
		<input type="text" id="blogName" class="form-control" name="blogName" required placeholder="Blog Name">
		  @if($errors->has('blogName'))
		      <span class="help-block">
		          <strong class="danger">{{ $errors->first('blogName') }}</strong>
		      </span>
		  @endif
		</div>
		<div class="col-md-12">
		<input type="submit" value="Go" class = "btn btn-primary">
		</div>

{!! Form::close() !!}