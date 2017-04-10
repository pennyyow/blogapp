$(function() {
	$('.btn-category').on('click', function() {		
		var $this = $(this);

		localStorage.setItem("storageName", $this.val());
		location.href="create-blog";
	});
});