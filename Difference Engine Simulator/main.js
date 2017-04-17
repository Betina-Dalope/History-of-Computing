function processInputs() {
  var inputs = $("#inputs :input").serializeArray();
  console.log(inputs);

  var row1 = {};
  for (var i = 1; i < inputs.length - 1; i++) {
    row1[inputs[i].name] = inputs[i].value;
  } 
  for (var i = 0; i < inputs[0].value; i++) {
    calculateNextRow(row1);
  }
}

function calculateNextRow(currentRow) {
  console.log("calculating row");
}
