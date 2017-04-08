$(function() {
	$('.btn-category').on('click', function() {		
		var $this = $(this);

		localStorage.setItem("storageName", $this.val());
		localStorage.setItem("storageName2", $('#' + $this.data('image')).attr('src'));
		location.href="create-blog";
	});
});