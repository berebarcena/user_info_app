$(function() {
  $('#search_input').keyup(
    $.debounce(300, function() {
      const searchQuery = $(this)
        .val()
        .toLowerCase();
      $('.suggestions').empty();
      if (searchQuery !== '') {
        $.get('/api/users/all', response => {
          const filteredData = response.filter(item => {
            const isMatch =
              item.firstname.toLowerCase().includes(searchQuery) ||
              item.lastname.toLowerCase().includes(searchQuery);
            return isMatch;
          });
          if (filteredData) {
            filteredData.forEach(user => {
              const $el = $(`<li>${user.firstname} ${user.lastname}</li>`);
              $('.suggestions').append($el);
              $el.click(function(evt) {
                const name = $(this).text();
                $('.suggestions').empty();
                $('#search_input').val(name);
              });
            });
          }
        });
      }
    })
  );
});
