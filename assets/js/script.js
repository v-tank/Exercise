$(document).ready(function(e) {
  // initialize arrays
  let toBuy, bought;

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
    bought.push(val[0]); // add the removed value to `bought` array
    syncLocalStorage(); // sync with localStorage
    displayItems();   // refresh display
  });

  // on-click listener to clear all items
  $(document).on('click', '#clear-data', function(e) {
    clearAll();
    syncLocalStorage();
    displayItems();
  });

  // function to add item to list
  function addItemToList(val) {
    toBuy.push(val);
    syncLocalStorage(); // sync with localStorage
  }

  // clear textbox
  function clearInput() {
    $("input[name=grocery-item").val('');
  }

  // function to display items to screen
  function displayItems() {
    let $target = $("#list tbody"); // create reference to list on HTML page
    $target.empty();  // empty out the list before appending

    // if either of the arrays have values, display them
    if ((toBuy.length > 0) || (bought.length > 0)) {
      $("#clear-data").show();

      // loop through array and append the item to screen in reverse order to add latest item to the top
      for (let index = toBuy.length - 1; index >= 0; index--) {
        $($target).append("<tr>\
          <td><button class='remove' data-index='" + index + "'>X</button></td> \
          <td style='text-align: left'>" + toBuy[index] + "</td> \
          </tr>");
      }

      bought.forEach(boughtItem => {
        $($target).append("<tr>\
          <td class='bought' colspan='2'>" + boughtItem + "</td> \
          </tr>");
      });

    } else {
      // hide clear button if no items are showing
      $("#clear-data").hide();

      // if no items are found, display below message
      $target.append('No items in the list. Add something before you forget!');
    }
  };

  // refresh localStorage to match user actions
  function syncLocalStorage() {
    localStorage.setItem("toBuy", JSON.stringify(toBuy));
    localStorage.setItem("bought", JSON.stringify(bought));
  }

  // fetch items from localStorage
  function fetchLocalStorage() {
    // if no items found (upon initial visit), set arrays to empty
    if (localStorage.getItem("toBuy") === null && localStorage.getItem("bought") === null) {
      toBuy = [];
      bought = [];
    } else {
      // else, parse the string and set equal to the arrays
      toBuy = JSON.parse(localStorage.getItem("toBuy"));
      bought = JSON.parse(localStorage.getItem("bought"));
    }
  }

  // empties data
  function clearAll() {
    toBuy = [];
    bought = [];
  }

  // check if items exist in localStorage upon page-load and display them
  fetchLocalStorage();
  displayItems();
});
