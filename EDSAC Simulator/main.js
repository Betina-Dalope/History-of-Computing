$(document).ready(function() {
	$("#location-number").val("31");
	$("#paper-tape-reader").val("T56F\nZF\nTF\nO43F\nA34F\nA41F\nU34F\nS42F\nG33F\nZF\nP1F\nO56F\n*F\nHF\nEF\nLF\nLF\nOF\n!F\nWF\nOF\nRF\nLF\nDF\n&F");
	io.updateCounter();
	io.updateDisplays();

	memory = controlUnit.initialOrders;
});

var memory = {}; //map of location number : contents

var controlUnit = {
	counter: -2, // program counter, which instruction it reading
	accumulator: 0,
	continue: true,
	initialOrders: {
		0: null, //first character of instruction
		1: null, //address of current instruction
		2: 00101000000000000,
		3: null, //junk register
		4: 2,
		5: 10
	},
	start: function() {
		if (!io.instructionsLoaded)
			io.loadInstructions();
		this.execute();
		io.updateDisplays();
		
	},
	stop: function() {
		this.continue = false;
	},
	reset: function() {
		io.updateCounter();
		io.instructionsLoaded = false;
		memory = {};
		controlUnit.accumulator = 0;
		$("#teleprinter").html("");
		io.updateDisplays();
		memory = this.initialOrders;
	},
	clear: function() {
		$("#paper-tape-reader").val("");
		$("#location-number").val("");

	},
	singleEP: function() {
		if (!io.instructionsLoaded)
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
		if (instructions[opcode] !== undefined)
			return instructions[opcode](number, flag);
		else {
			console.log("STOP!", operation, memory[this.counter]);
			return true;
		}
	},
	execute: function() {
		var instructionSuccess = true;
		do {
			instructionSuccess = this.executeInstruction();
		} while (this.continue && instructionSuccess)
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
	multiplier: 0,
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
	},
	multiply: function(x1, x2, flag) {
		var decimalProduct = this.operationToDecimal(x1) * this.operationToDecimal(x2);
		var instructionProduct = this.decimalToOperation(decimalProduct, flag);
		return instructionProduct;
	}
}

/* instructions are set up like this
* opcode	location# (0 if emtpy)		F or D (short or long number) or K (end of instruction line)
*/

var io = {
	instructionsLoaded: false,
	loadInstructions: function() {
		console.log("load");
		var lines = $("#paper-tape-reader").val().replace(/ /g, "\r\n").split('\n');
		for(var i = 0; i < lines.length; i++){
			memory[controlUnit.counter + i] = lines[i];
		}
		this.instructionsLoaded = true;
	},
	print: function(number) {
		var $teleprinter = $("#teleprinter");
		var character = memory[number].slice(0, -1);
		switch (character) {
			case '*': $teleprinter.html(""); break;
			case '!': $teleprinter.append(" "); break;
			case '&': $teleprinter.append("<br/>"); break;
			default: $teleprinter.append(character);
		}		
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