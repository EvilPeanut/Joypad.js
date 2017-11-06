/**
 * @author Reece Aaron Lecrivain / http://reecenotes.com/
 */
var JOYPAD = {};

JOYPAD.options = {
	autoUpdate : true,
	pollFrequency : 1000 / 60
};

JOYPAD.keysDown = [];

JOYPAD.downEvents = {};
JOYPAD.holdEvents = {};
JOYPAD.upEvents = {};

JOYPAD.addInput = function ( options ) {
	if ( typeof options.input == "number" ) {
		options.input = [ options.input ];
	}

	for (index = 0; index < options.input.length; index++) {
		if ( options.onDown ) {
			JOYPAD.downEvents[ options.input[ index ] ] = options.onDown;
			if ( options.holdIsDownEvent ) JOYPAD.holdEvents[ options.input[ index ] ] = options.onDown;
		}
		if ( options.onHold ) JOYPAD.holdEvents[ options.input[ index ] ] = options.onHold;
		if ( options.onUp ) JOYPAD.upEvents[ options.input[ index ] ] = options.onUp;
	}
}

JOYPAD.isKeyDown = function ( keyType ) {
	return JOYPAD.keysDown.indexOf( keyType ) != -1;
}

//
// Event listeners
//
document.addEventListener("keydown", function(event) {
	if ( !JOYPAD.isKeyDown( event.which ) ) {
		if ( event.which in JOYPAD.downEvents ) {
			if ( JOYPAD.downEvents[ event.which ]( 1 ) ) {
				event.preventDefault();
				event.stopPropagation();
			}
		}
		JOYPAD.keysDown.push( event.which );
	} else {
		event.preventDefault();
		event.stopPropagation();
	}
}, false);

document.addEventListener("keyup", function(event) {
	JOYPAD.keysDown.splice( JOYPAD.keysDown.indexOf( event.which ), 1 );
	if ( event.which in JOYPAD.upEvents ) JOYPAD.upEvents[ event.which ]();
}, false);

window.addEventListener('blur', function() {
	for ( keyIndex in JOYPAD.keysDown ) {
    	var keyCode = JOYPAD.keysDown[ keyIndex ];
    	if ( keyCode in JOYPAD.upEvents ) JOYPAD.upEvents[ keyCode ]();
    }
	JOYPAD.keysDown = [];
});

//
// Update loop
//
JOYPAD.oldFrameTime = Date.now();
JOYPAD.deltaTime = 0;

JOYPAD.update = function () {
	JOYPAD.deltaTime = (Date.now() - JOYPAD.oldFrameTime) / 1000;
	JOYPAD.oldFrameTime = Date.now();

	//
	// Keyboard input
	//
	for ( keyIndex in JOYPAD.keysDown ) {
    	var keyCode = JOYPAD.keysDown[ keyIndex ];
    	if ( keyCode in JOYPAD.holdEvents ) JOYPAD.holdEvents[ keyCode ]( 1 );
    }

    //
	// Gamepad input
	//
    var gamepads = navigator.getGamepads();
	for (var i = 0; i < gamepads.length; i++) {
		var gamepad = gamepads[i];

		if (gamepad == undefined) {
			continue;
		}

		for (var buttonIndex = 0; buttonIndex < gamepad.buttons.length; buttonIndex++) {
			var button = gamepad.buttons[buttonIndex];
			var which = buttonIndex + 1000;

			if (button.pressed) {
				if ( !JOYPAD.isKeyDown( which ) ) {
					JOYPAD.keysDown.push( which );
					if ( which in JOYPAD.downEvents ) JOYPAD.downEvents[ which ]( 1 );
				} else {
					if ( which in JOYPAD.holdEvents ) JOYPAD.holdEvents[ which ]( 1 );
				}
			} else if ( JOYPAD.isKeyDown( which ) ) {
				JOYPAD.keysDown.splice( JOYPAD.keysDown.indexOf( which ), 1 );
				if ( which in JOYPAD.upEvents ) JOYPAD.upEvents[ which ]();
			}
		}

		for (var axesIndex = 0; axesIndex < gamepad.axes.length; axesIndex++) {
			var axe = gamepad.axes[axesIndex];
			var which = (axesIndex * 2) + 1017;
			var upperWhich = which + 1;

			if (axe < 0) {
				axe = Math.abs( axe );
				if ( !JOYPAD.isKeyDown( which ) ) {
					JOYPAD.keysDown.push( which );
					if ( which in JOYPAD.downEvents ) JOYPAD.downEvents[ which ]( axe );
				} else {
					if ( which in JOYPAD.holdEvents ) JOYPAD.holdEvents[ which ]( axe );
				}
				if ( JOYPAD.isKeyDown( upperWhich ) ) {
					JOYPAD.keysDown.splice( JOYPAD.keysDown.indexOf( upperWhich ), 1 );
					if ( upperWhich in JOYPAD.upEvents ) JOYPAD.upEvents[ upperWhich ]();
				}
			} else if (axe > 0) {
				if ( !JOYPAD.isKeyDown( upperWhich ) ) {
					JOYPAD.keysDown.push( upperWhich );
					if ( upperWhich in JOYPAD.downEvents ) JOYPAD.downEvents[ upperWhich ]( axe );
				} else {
					if ( upperWhich in JOYPAD.holdEvents ) JOYPAD.holdEvents[ upperWhich ]( axe );
				}
				if ( JOYPAD.isKeyDown( which ) ) {
					JOYPAD.keysDown.splice( JOYPAD.keysDown.indexOf( which ), 1 );
					if ( which in JOYPAD.upEvents ) JOYPAD.upEvents[ which ]();
				}
			} else if ( JOYPAD.isKeyDown( which ) ) {
				JOYPAD.keysDown.splice( JOYPAD.keysDown.indexOf( which ), 1 );
				if ( which in JOYPAD.upEvents ) JOYPAD.upEvents[ which ]();
			} else if ( JOYPAD.isKeyDown( upperWhich ) ) {
				JOYPAD.keysDown.splice( JOYPAD.keysDown.indexOf( upperWhich ), 1 );
				if ( upperWhich in JOYPAD.upEvents ) JOYPAD.upEvents[ upperWhich ]();
			}
		}
	}

    if ( JOYPAD.options.autoUpdate ) {
    	setTimeout( arguments.callee, JOYPAD.options.pollFrequency );
    }
}

JOYPAD.update();

//
// Enums
//
JOYPAD.KEYBOARD = {
	BACKSPACE : 8,
	TAB : 9,
	ENTER : 13,
	SHIFT : 16,
	CTRL : 17,
	ALT : 18,
	CAPSLOCK : 20,
	ESCAPE : 27,
	SPACE : 32,
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40,
	NUM0 : 48,
	NUM1 : 49,
	NUM2 : 50,
	NUM3 : 51,
	NUM4 : 52,
	NUM5 : 53,
	NUM6 : 54,
	NUM7 : 55,
	NUM8 : 56,
	NUM9 : 57,
	A : 65,
	B : 66,
	C : 67,
	D : 68,
	E : 69,
	F : 70,
	G : 71,
	H : 72,
	I : 73,
	J : 74,
	K : 75,
	L : 76,
	M : 77,
	N : 78,
	O : 79,
	P : 80,
	Q : 81,
	R : 82,
	S : 83,
	T : 84,
	U : 85,
	V : 86,
	W : 87,
	X : 88,
	Y : 89,
	Z : 90,
	LEFT_SYSTEM : 91,
	RIGHT_SYSTEM : 93,
	COLON : 186,
	EQUAL : 187,
	COMMA : 188,
	DASH : 189,
	PERIOD : 190,
	FORWARD_SLASH : 191,
	ACCENT : 192,
	OPEN_BRACKET : 219,
	BACK_SLASH : 220,
	CLOSE_BRACKET : 221,
	QUOTE : 222
}

JOYPAD.XBOX = {
	A : 1000,
	B : 1001,
	X : 1002,
	Y : 1003,
	LB : 1004,
	RB : 1005,
	LT : 1006,
	RT : 1007,
	BACK : 1008,
	START : 1009,
	LEFT_THUMB_BUTTON : 1010,
	RIGHT_THUMB_BUTTON : 1011,
	DPAD_UP : 1012,
	DPAD_DOWN : 1013,
	DPAD_LEFT : 1014,
	DPAD_RIGHT : 1015,
	SYSTEM : 1016,
	LEFT_THUMB_LEFT : 1017,
	LEFT_THUMB_RIGHT : 1018,
	LEFT_THUMB_UP : 1019,
	LEFT_THUMB_DOWN : 1020,
	RIGHT_THUMB_LEFT : 1021,
	RIGHT_THUMB_RIGHT : 1022,
	RIGHT_THUMB_UP : 1023,
	RIGHT_THUMB_DOWN : 1024
}