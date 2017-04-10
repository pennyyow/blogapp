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
		$('#content').val($('.summernote').code());
	});

	var get = localStorage.getItem("storageName");
  $('#selectCategory').find('option').each(function(i,e){
      if($(e).val() == localStorage.getItem("storageName")){
          $('#selectCategory').prop('selectedIndex',i);
      }
  });
});