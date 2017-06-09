// $(document).ready(function() {
// 	$("#location-number").val("0\n1\n2\n3");
// });

var memory = {}; //map of location number : contents

var controlUnit = {
	counter: -2, // program counter, which instruction it reading
	accumulator: 0,
	start: function() {
		if (!io.instrusctionsLoaded)
			io.loadInstructions();
		this.execute();
		io.updateDisplays();
		
	},
	stop: function() {
	},
	reset: function() {
		io.updateCounter();
		io.instructionsLoaded = false;
		controlUnit.accumulator = 0;
		io.updateDisplays();
	},
	clear: function() {

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
		var flag = operation.flag;

		this.counter++;

		return instructions[opcode](number, flag);
	},
	execute: function() {
		var instructionSuccess = true;
		do {
			instructionSuccess = this.executeInstruction();
		} while (!this.continue && instructionSuccess)
	},
	parseInstruction: function() {
		var currentInstruction = memory[this.counter]; 
		console.log(this.counter, currentInstruction);
		var number = currentInstruction.slice(1, -1);
		if (number == "")
			number = 0;

		return {
			opcode: currentInstruction.charAt(0),
			number: number,
			flag: currentInstruction.slice(-1)
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
	decimalToOperation: function(decimal, flag) {
		if (typeof decimal === "string" || decimal < 0)
			return decimal;

		var decimalString = decimal.toString();
		var opcodeDecimal = parseInt(decimalString.charAt(0));
		var opcode = reverseCharacterCodes[opcodeDecimal];
		var operation = opcode + decimalString.slice(1) + flag;

		return operation;
	},
	add: function(x1, x2, flag) {
		var decimalSum = this.operationToDecimal(x1) + this.operationToDecimal(x2);
		var instructionSum = this.decimalToOperation(decimalSum, flag);
		return instructionSum;
	},
	subtract: function(x1, x2, flag) {
		var decimalDifference = this.operationToDecimal(x1) - this.operationToDecimal(x2);
		var instructionDifference = this.decimalToOperation(decimalDifference, flag);
		return instructionDifference;		
	}
}

/* instructions are set up like this
* opcode	location# (0 if emtpy)		F or D (short or long number) or K (end of instruction line)
*/

var io = {
	instrusctionsLoaded: false,
	loadInstructions: function() {
		console.log("load", );
		var lines = $("#paper-tape-reader").val().replace(/ /g, "\r\n").split('\n');
		for(var i = 0; i < lines.length; i++){
			memory[controlUnit.counter + i] = lines[i];
		}
		this.instrusctionsLoaded = true;
	},
	print: function(number) {
		console.log(memory[number]);
		var character = memory[number].slice(0, -1);
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