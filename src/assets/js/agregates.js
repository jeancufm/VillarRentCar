$( document ).ready(function() {
  $('#LoginModal').on('show.bs.modal', function (e) {
    $('#login').show();
    $('#register').hide();
    $('#TitleLogin span').text('Iniciar sesión');
  });
  
});
