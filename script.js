$(document).ready(function(e) {
  let toBuy = [];
  let bought = [];

  $(document).on('click', '#btn', function(e) {
    e.preventDefault();
    let val = $("input[name=grocery-item]").val().trim();
    if (val === '') alert('Enter an item!');
    else {
      addItemToList(val);
      clearInput();
      displayItems();
    }
  });

  $(document).on('click', '.remove', function(e) {
    e.preventDefault();

    let $idx = $(this).attr("data-index");
    let val = toBuy.splice($idx, 1);
    bought.push(val);
    console.log(toBuy);
    console.log('*'.repeat(20));
    console.log(bought);

    displayItems();
  });

  function addItemToList(val) {
    toBuy.push(val);
    console.log(toBuy);
  }

  function clearInput() {
    $("input[name=grocery-item").val('');
  }

  function displayItems() {
    let $target = $("#list");
    $target.empty();

    // Show items left to do
    if ((toBuy.length > 0) || (bought.length > 0)) {

      toBuy.forEach((todo, index) => {
        let $el = $("<li>");
        $el.html(todo + " <button class='remove'  data-index='" + index + "'>x</button>");

        $target.append($el);
      });

      bought.forEach(doneTask => {
        let $el = $("<li>");
        $el.text(doneTask).addClass('bought');
        $target.append($el);
      });

    } else {
      $target.append('No items in the list. Add something!');
    }
  };

  displayItems();
});
