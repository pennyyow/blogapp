$(function() {
  var imageChanged = false;
  $('#divAddImg')
    .removeClass('border-dash')
    .empty()
    .append(
      $('<img/>')
        .attr('src', '../img/avatar/'+image)
        .addClass('thumbnail img-responsive')
    );

  $('#formImg').on('change', function() {
    imageChanged = true;
    var formImg = $('#formImg').get(0);

    if(formImg.files && formImg.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#divAddImg')
          .removeClass('border-dash')
          .empty()
          .append(
            $('<img/>')
              .attr('src', e.target.result)
              .addClass('thumbnail img-responsive')
          );
      }

      reader.readAsDataURL(formImg.files[0]);
    }
  });

	$('#btn-create').on('click', function(e) {
    $('#btn-create').addClass('disabled');
    e.preventDefault();
    var descriptionContent = $('.description-textbox').code().replace(/(?:\n)/g, '<br>');
    $('#description').val(
       descriptionContent == '<div><br></div>' ? null : descriptionContent
    );
    $('#content').val($('.summernote').code()
      .replace(/(?:\n)/g, '<br>')
      .replace(/(?:")/g, '\'')
    );

    var formData = $('form.create-form').serializeArray();
    formData.push({name: 'file', value: imageChanged ? $('.thumbnail').attr('src') : null});
		
    $('.title').removeClass('has-error');
    $('.title-label').html('');
    $('.title-label').text('Title  ');
    $('.description').removeClass('has-error');
    $('.description-label').html('');
    $('.description-label').text('Description  ');
    $('.summernote-container').removeClass('has-error');
    $('.content-label').html('');
    $('.content-label').text('Content  ');
    
    $.ajax({
      method: 'POST',    
      url: Url.editBlogContents,
      data: formData,
      success: function(r) {
        console.log('>>>>>>>>>>DATAL ' + JSON.stringify(r));
        window.location.href = Url.profile + '/' + user.id;
      },
      error: function(r) {
        console.log('>>>>ERROR: ' + JSON.stringify(r))
        var errors = r.responseJSON.errors;

        if(errors.title) {
          $('.title').addClass('has-error');
          $('.title-label').append(
            $('<b />').attr({
            }).text(errors.title)
          );
        }

        if(errors.description) {
          $('.description').addClass('has-error');
          $('.description-label').append(
            $('<b />').attr({
            }).text(errors.description)
          );
        }

        if(errors.content) {
          $('.summernote-container').addClass('has-error');
          $('.content-label').append(
            $('<b />').attr({
            }).text(errors.content)
          );
        }

        $('#btn-create').removeClass('disabled');
        window.location.href = '#';
      }
    });
	});
});