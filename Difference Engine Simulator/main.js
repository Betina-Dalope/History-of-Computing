var currentRow = [];

function processInputs() {
  var inputs = $("#inputs :input").serializeArray();

  var row1 = [];
  for (var i = 1; i < inputs.length; i++) {

    var rawVal = inputs[i].value;
    var val = (rawVal == "" || rawVal == null || !rawVal ) ? 0 : parseInt(rawVal);
    row1.push(val);
  }

  currentRow = row1;
  for (var i = 0; i < inputs[0].value; i++) {
    calculateNextRow();
  }
}

function calculateNextRow() {
  console.log("calculating row", currentRow);
  
  var nextRow = [];
  currentRow.forEach(function(value, index) {
    if (index == currentRow.length - 1) nextRow.push(0);
    else nextRow.push(value + currentRow[index + 1])
  })

  currentRow = nextRow;
}
