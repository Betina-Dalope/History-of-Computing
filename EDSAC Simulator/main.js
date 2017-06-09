$(document).ready(function() {
	$("#location-number").val("0\n1\n2\n3");
});

var memory = {}; //map of location number : contents

var controlUnit = {
	counter: -2, // program counter, which instruction it reading
	accumulator: 0,
	continue: true,
	start: function() {
		io.loadInstructions();
		this.execute();
		io.updateDisplays();
	},
	stop: function() {
		this.continue = false;
	},
	reset: function() {
		counter = -2;
	},
	singleEP: function() {
		if (Object.keys(memory).length === 0)
			io.loadInstructions();	
		this.executeInstruction();
		io.updateDisplays();
	},
	executeInstruction: function() {
		var operation = this.parseInstruction();
		var opcode = operation.opcode;
		var number = operation.number;
		instructions[opcode](number);

		this.counter++;
	},
	execute: function() {
		for (var instruction in io.input) {
			this.executeInstruction();
			if (!this.continue)
				break;
		}
	},
	parseInstruction: function() {
		var currentInstruction = memory[this.counter]; 
		console.log(currentInstruction);
		var number = currentInstruction.slice(1, -1);
		if (number == "")
			number = 0;

		return {
			opcode: currentInstruction.charAt(0),
			number: number
		};
	}
}

var alu = {
	operationToDecimal: function(operation) {
		if (typeof operation === "number")
			return operation;

		var opcode = operation.charAt(0);
		var opcodeDecimal = characterCodes[opcode];
		var decimal = operation.replace(new RegExp(opcode, "g"), opcodeDecimal);
		return parseInt(decimal);
	},
	decimalToOperation: function(decimal) {
		if (typeof decimal === "string")
			return decimal;

		var decimalString = decimal.toString();
		var opcodeDecimal = parseInt(decimalString.charAt(0));
		var opcode = reverseCharacterCodes[opcodeDecimal];
		var operation = opcode + decimalString.slice(1);

		return operation;
	},
	add: function(x1, x2) {
		console.log("add");
		// if (typeof x1 === "number" && typeof x2 === "number")
		// 	return x1 + x2;
		// console.log("add", this.operationToDecimal(x1), this.operationToDecimal(x2));
		var decimalSum = this.operationToDecimal(x1) + this.operationToDecimal(x2);
		var instructionSum = this.decimalToOperation(decimalSum);
		return instructionSum;
	}
}

/* instructions are set up like this
* opcode	location# (0 if emtpy)		F or D (short or long number) or K (end of instruction line)
*/

var io = {
	loadInstructions: function() {
		var lines = $("#paper-tape-reader").val().replace(/ /g, "\r\n").split('\n');
		for(var i = 0; i < lines.length; i++){
			memory[controlUnit.counter + i] = lines[i];
		}
	},
	print: function(number) {
		var character = memory[number].slice(0, -1);;
		$("#teleprinter").append(character);
	},
	updateDisplays: function() {
		$("#counter").html(controlUnit.counter);
		$("#accumulator").html(controlUnit.accumulator);
	},
	updateCounter: function() {
		var firstLine = $("#location-number").val().split('\n')[0];
		controlUnit.counter = parseInt(firstLine);
	}
}