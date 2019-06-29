function binarySearch(arr, target) {
  let startingPoint = 0;
  let endingPoint = arr.length - 1;

  let mid = Math.floor((startingPoint + endingPoint) / 2);

  // check if the value is at the middle of the array; if not, is it lower or higher?
  while (arr[mid] !== target && startingPoint < endingPoint) {
    if (target < arr[mid]) {
      endingPoint = mid - 1;
    } else {
      startingPoint = mid + 1;
    }

    mid = Math.floor((startingPoint + endingPoint) / 2);
  }

  let val = arr[mid];
  return val === target ? val : -1;
}

function assertEqual(result, expected){
  if(result === expected) {
    console.log("✅ Passed the test! ");
  } else {
    console.log(`❌ Failed test!`);
  }
  console.log("*".repeat(20));
}

assertEqual(binarySearch([4, 5, 8, 15, 23, 39, 51, 60], 5), 5);
assertEqual(binarySearch([10, 30], 30), 30);
assertEqual(binarySearch([1, 2, 3, 4, 5], 10), -1);
assertEqual(binarySearch([], 10), -1);
