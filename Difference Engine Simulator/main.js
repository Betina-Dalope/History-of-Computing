var currentRow = [];

function processInputs() {
  var inputs = $("#inputs :input").serializeArray();

  var row1 = [];
  for (var i = 1; i < inputs.length; i++) {

    var rawVal = inputs[i].value;
    var val = (rawVal == "" || rawVal == null || !rawVal ) ? 0 : parseInt(rawVal);
    row1.push(val);
  }

  $("#output").html("<br/>").append(row1.toString());

  currentRow = row1;
  for (var i = 0; i < inputs[0].value - 1; i++) {
    calculateNextRow();
  }
}

function calculateNextRow() {
  
  var nextRow = [];
  currentRow.forEach(function(value, index) {
    if (index == currentRow.length - 1) nextRow.push(value);
    else nextRow.push(value + currentRow[index + 1])
  })

  $("#output").append("<br/>").append(nextRow.toString());

  currentRow = nextRow;
}
