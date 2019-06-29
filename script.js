$(document).ready(function(e) {
  // initialize arrays
  let toBuy = [];
  let bought = [];

  // on-click listener to add item
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

  // on-click listener to remove item
  $(document).on('click', '.remove', function(e) {
    e.preventDefault();

    let $idx = $(this).attr("data-index");
    let val = toBuy.splice($idx, 1);  // remove item from `toBuy` array
    bought.push(val); // add the removed value to `bought` array
    displayItems();   // refresh display
  });

  // function to add item to list
  function addItemToList(val) {
    toBuy.push(val);
  }

  // clear textbox
  function clearInput() {
    $("input[name=grocery-item").val('');
  }

  // function to display items to screen
  function displayItems() {
    let $target = $("#list"); // create reference to list on HTML page
    $target.empty();  // empty out the list before appending

    // if either of the arrays have values, display them
    if ((toBuy.length > 0) || (bought.length > 0)) {

      // loop through array and append the item to screen
      toBuy.forEach((todo, index) => {
        let $el = $("<li>");
        $el.html("<button class='remove' data-index='" + index + "'>x</button>" + todo);
        $target.append($el);
      });

      bought.forEach(doneTask => {
        let $el = $("<li>");
        $el.text(doneTask).addClass('bought');
        $target.append($el);
      });

    } else {
      // if no items are found, display below message
      $target.append('No items in the list. Add something before you forget!');
    }
  };

  displayItems();
});
