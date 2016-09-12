/**
 * Created by michaelbyrne on 9/10/16.
 */


$( "#twitter" ).hover(function() {
    $( "#twitter" ).hide( "slow", function() {
        alert( "Animation complete." );
    });
});