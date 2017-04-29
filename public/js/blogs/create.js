$(function() {
	$('.summernote').summernote();

  $('#formImg').on('change', function() {
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
    
    $('#content').val($('.summernote').code()
      .replace(/(?:\n)/g, '<br>')
      .replace(/(?:")/g, '\'')
    );
    $('#description').val($('.description-textbox').code()
      .replace(/(?:\n)/g, '<br>')
    );

    var formData = $('form.create-form').serializeArray();
    formData.push({name: 'file', value: $('.thumbnail').attr('src') ? $('.thumbnail').attr('src') : null})
		
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
      url: Url.create,
      data: formData,
      success: function(r) {
        console.log('>>>>>>>>>>DATAL ' + r);
        window.location.href = Url.posts;
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

	var get = localStorage.getItem("storageName");
  $('#selectCategory').find('option').each(function(i,e){
      if($(e).val() == localStorage.getItem("storageName")){
          $('#selectCategory').prop('selectedIndex',i);
      }
  });
});