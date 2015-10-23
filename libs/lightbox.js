

var lightbox_map = {
    1 : "test image for level 1 & up",
    100 : "test image for level 100 & up",
    200 : "test image for level 200 & up"
};


$.featherlight.contentFilters.iframe = {
    process: function(url){
        return $('<iframe width="960" height="600" src="' + url + '"/>');
    }
};

$('#create-customer').featherlight('iframe', {
    afterClose: function() { console.log('closed'); }
});