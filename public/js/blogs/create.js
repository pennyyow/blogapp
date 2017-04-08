$(function() {
	$('.summernote').summernote();
	
	var $inputImg = $("#inputImg");
  if (window.FileReader) {
      $inputImg.change(function() {
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
                  $('#thumbnail').attr('src', this.result);
              };
          } else {
              showMessage("Please choose an image file.");
          }
      });
  }

	$('#btn-create').on('click', function(e) {
		$('#content').val($('.summernote').code());

		$(this).trigger('submit');
	});

	var get = localStorage.getItem("storageName");
  $('#selectCategory').find('option').each(function(i,e){
      if($(e).val() == localStorage.getItem("storageName")){
          $('#selectCategory').prop('selectedIndex',i);
      }

  });

  var getSrc = localStorage.getItem("storageName2");
  $("#thumbnail").attr("src", getSrc);
});