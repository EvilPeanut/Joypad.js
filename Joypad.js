/**
 * @author Reece Aaron Lecrivain / http://reecenotes.com/
 */
var JOYPAD = {};

JOYPAD.keysDown = [];

JOYPAD.addInput = function () {

}

JOYPAD.mapInput = function () {

}

JOYPAD.isKeyDown = function ( keyType ) {
	return JOYPAD.keysDown.indexOf( keyType ) != -1;
}

$( document ).keydown(function( event ) {
	if ( !JOYPAD.isKeyDown( event.which ) ) {
		JOYPAD.keysDown.push( event.which );
	}
});

$( document ).keyup(function( event ) {
	JOYPAD.keysDown.splice( JOYPAD.keysDown.indexOf( event.which ), 1 );
});

$( window ).blur(function() {
	JOYPAD.keysDown = [];
});

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

}