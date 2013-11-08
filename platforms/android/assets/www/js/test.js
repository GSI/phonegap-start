jQuery(document).ready(function($) {
	$.support.cors = true;

 	$('#status').html('Fetching Doos ...');

	var activities=[];

	$.getJSON("http://corilla.net/en/activities.json", function(data) {
		var val = $("#slider-max").val();
		var max = $("#slider-max").attr("max");
		$.each(data.slice(0, max), function(idx, activity) {
			activities[idx] = '<li><a href="' + activity.url + '"><strong>' + activity.title + '</strong>, ' + activity.location + '<span class="ui-li-count">' + activity.subscriptions_count + '</span></a></li>';
			if ( idx < val ) {
				$("#doo").append(activities[idx]);
				// $('#doo').append('<li><a href="#">' + activity.b + ', <strong>' + activity.title + '</strong>, ' + activity.location + '</a></li>');
			}
		});
		$("#doo").listview('refresh'); 
	}).error( function() {
		$('#status').html("JSON request failed. Please verify internet-connection and firewall settings.");
	});


	$("#slider-max").on( 'slidestop', function() {
		var max = $(this).val();
		$("#status").html("Limiting to " + max + " Doos ...");
		$("#doo").html("");
		
		// TODO lower "max" if less than desired max are available
		$.each(activities.slice(0, max), function(idx, activity) {
			$("#status").html("Processing Doo Idx " + idx + " out of " + activities.length);
			$("#doo").append(activity);
		});
		$('#doo').listview('refresh'); 
	});

/*
	$("input[type='radio']").bind( "change", function(event, ui) {
		var swatch = $(this).val();
		//$("#app").data("theme", swatch).trigger("create");
		//$("#app").data("content-theme", swatch).trigger("create");
		$("#pagediv").buttonMarkup({ theme: swatch });
	});

	$.ajax({
		type       : "GET",
		url        : "http://corilla.net/en/activities.json",
		crossDomain: true,
		dataType   : 'jsonp',
		success    : function(response) { $('#status').html(JSON.stringify(response)); },
		error      : function() { $('#status').html("AJAX Fehler!"); }
	});
*/
});
