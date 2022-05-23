
var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  administrative_area_level_2: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};  
  
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('adr')), {
    types: ['address'],
    componentRestrictions: {country: 'PK'}
    //EDIT
  });

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  
  /*
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }
  */

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  var fetched_address = [];
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      fetched_address[addressType] = val;
    }
  }
  
  // Prefill
  var combined_address = "";
  
  if(typeof(fetched_address['street_number']) != "undefined") {
    combined_address = fetched_address['street_number'];
  }
  
  if(typeof(fetched_address['route']) != "undefined") {
    if(combined_address != "") {
      combined_address += " ";
    }
    
    combined_address += fetched_address['route'];
  }
  
  $('#adr').val(combined_address);
  $('#cty').val(fetched_address['administrative_area_level_2']);
  $('#stt').val(fetched_address['administrative_area_level_1']);
  $('#zip').val(fetched_address['postal_code']);
  $('#cnt').val(fetched_address['country']);
  $('#address-full-form').show();
  if (!valid()) {
				check = false;
			}
}

$(function() {
  
  
  var geolocate = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  };
  
  $('.container').on('focus', '#adr', function(e) {
    geolocate();
  });
  

  $('[data-show-fullform]').click(function (e) {
    e.preventDefault();
    
    var $target = $($(this).attr('href'));
    $target.show();
  });
});



