function getListing(pathname) {
	getListing.pathname = (pathname[pathname.length-1] == "/") ? pathname : pathname + "/";
	$.get("admin.php", { dir:pathname, fileType:load.type, pageURL:load.url },
		function (data) {
			$("#list").html(data);
			$("li").each(function() { 
				var a = $($(this).children()[0]);
				var button = $($($(this).children()[1])).children();
				var pathname = a.html(); 
				a.click(function() { getListing(pathname); });
				button.click(function() { removePath(this, pathname); });
			});
		}
	);
}

function clickGetListing() {
	var pathname = $("#pathname").val();
	$("#list").children().remove();
	getListing(pathname);
}

//$(function() {
	//$("#load").click(clickGetListing());
//	getListing("");
//});

function removePath(e, pathname) {
	pathname = getListing.pathname + pathname;
	var button = e;
	$.post("admin.php", { dir:pathname },
		function(data) {
			if (data === "deleted") {
				$(button).parent().parent().remove();
				if ($("#list").html() == "") {
					$("#list").html("Nothing to display.");
				}
			} else {
				$($(button).parent().children()[0]).html(data);
			} 	
		});
}

