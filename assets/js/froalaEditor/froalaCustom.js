let DashboardEditor,

	dashboard_note = {
	farola_editor: function () {
		// Initialize the Froala Editor
		DashboardEditor = new FroalaEditor('.note-froala', {
			placeholderText: '',
			autofocus: false,
			toolbarSticky: false,
			fontFamilySelection: true,
			toolbarButtons: ['undo', 'redo', 'fontFamily', 'bold', 'italic', 'insertFile', 'insertImage', 'insertVideo', 'quote', 'formatUL', 'formatOL', 'outdent', 'indent',]
		});
	},

	init: function () {
		dashboard_note.farola_editor();
	},
};

jQuery(document).ready(function () {
	dashboard_note.init();
});