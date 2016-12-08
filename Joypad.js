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
	for (key in JOYPAD.KEYBOARD)
	{
		if ( JOYPAD.KEYBOARD[ key ] == event.which ) {
			if ( JOYPAD.keysDown.indexOf( event.which ) == -1 ) {
				JOYPAD.keysDown.push( JOYPAD.KEYBOARD[ key ] );
			}
			return;
		}
	}

	console.log( "Keyboard code", event.which, "is not supported" );
});

$( document ).keyup(function( event ) {
	for (key in JOYPAD.KEYBOARD)
	{
		if ( JOYPAD.KEYBOARD[ key ] == event.which ) {
			JOYPAD.keysDown.splice( key );
			return;
		}
	}

	console.log( "Keyboard code", event.which, "is not supported" );
});

JOYPAD.KEYBOARD = {
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
	Z : 90
}

JOYPAD.XBOX = {

}