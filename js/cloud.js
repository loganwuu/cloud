/*
    Defining our variables
    world and viewport are DOM elements,
    worldXAngle and worldYAngle are floats that hold the world rotations,
    d is an int that defines the distance of the world from the camera
*/
var world = document.getElementById( 'world' ),
    viewport = document.getElementById( 'viewport' ),
    worldXAngle = 0,
    worldYAngle = 0,
    d = 0;

/*
    Event listener to transform mouse position into angles
    from -180 to 180 degress, both vertically and horizontally
*/
window.addEventListener( 'mousemove', function( e ) {
    worldYAngle = -( .5 - ( e.clientX / window.innerWidth ) ) * 180;
    worldXAngle = ( .5 - ( e.clientY / window.innerHeight ) ) * 180;
    updateView();
} );

/*
    Changes the transform property of world to be
    translated in the Z axis by d pixels,
    rotated in the X axis by worldXAngle degrees and
    rotated in the Y axis by worldYAngle degrees.
*/
function updateView() {
    world.style.transform = 'translateZ( ' + d + 'px ) \
        rotateX( ' + worldXAngle + 'deg) \
        rotateY( ' + worldYAngle + 'deg)';
}


/*
    objects is an array of cloud bases
    layers is an array of cloud layers
*/
var objects = [],
    layers = [];

/*
    Clears the DOM of previous clouds bases
    and generates a new set of cloud bases
*/
function generate() {
    objects = [];
    layers = [];
    if ( world.hasChildNodes() ) {
        while ( world.childNodes.length >= 1 ) {
            world.removeChild( world.firstChild );
        }
    }
    for( var j = 0; j <; 5; j++ ) {
        objects.push( createCloud() );
    }
}

/*
    Creates a single cloud base: a div in world
    that is translated randomly into world space.
    Each axis goes from -256 to 256 pixels.
*/
function createCloud() {

    var div = document.createElement( 'div'  );
    div.className = 'cloudBase';
    var t = 'translateX( ' + random_x + 'px ) \
        translateY( ' + random_y + 'px ) \
        translateZ( ' + random_z + 'px )';
    div.style.transform = t;
    world.appendChild( div );

    for( var j = 0; j < 5 + Math.round( Math.random() * 10 ); j++ ) {
        var cloud = document.createElement( 'div' );
        cloud.className = 'cloudLayer';

        cloud.data = {
            x: random_x,
            y: random_y,
            z: random_z,
            a: random_a,
            s: random_s
        };
        var t = 'translateX( ' + random_x + 'px ) \
            translateY( ' + random_y + 'px ) \
            translateZ( ' + random_z + 'px ) \
            rotateZ( ' + random_a + 'deg ) \
            scale( ' + random_s + ' )';
        cloud.style.transform = t;

        div.appendChild( cloud );
        layers.push( cloud );
    }

    return div;
}

/*
    Creates a single cloud base and adds several cloud layers.
    Each cloud layer has random position ( x, y, z ), rotation (a)
    and rotation speed (s). layers[] keeps track of those divs.
*/


/*
    Iterate layers[], update the rotation and apply the
    inverse transformation currently applied to the world.
    Notice the order in which rotations are applied.
*/
function update (){

    for( var j = 0; j < layers.length; j++ ) {
        var layer = layers[ j ];
        layer.data.a += layer.data.speed;
        var t = 'translateX( ' + layer.data.x + 'px ) \
            translateY( ' + layer.data.y + 'px ) \
            translateZ( ' + layer.data.z + 'px ) \
            rotateY( ' + ( - worldYAngle ) + 'deg ) \
            rotateX( ' + ( - worldXAngle ) + 'deg ) \
            scale( ' + layer.data.s + ')';
        layer.style.transform = t;
    }

    requestAnimationFrame( update );

}
