;(function($) {

  var initTracking = function() {
    if (typeof $.gaTrack === 'undefined') {
      return this;
    }

    window.addEventListener('error', function(err) {
      var lineAndColumnInfo = err.colno ? ' line:' + err.lineno + ', column:' + err.colno : ' line:' + err.lineno;

      $.gaTrack('JavaScript Error', err.message, lineAndColumnInfo + ' -> ' + navigator.userAgent);
    });

    $.error(function(message) {
      $.gaTrack('jQuery Error', message, navigator.userAgent);
    });

    $(document).ajaxError(function(event, request, settings) {
      $.gaTrack('jQuery Ajax Error', settings.url, JSON.stringify({
            result: event.result,
            status: request.status,
            statusText: request.statusText,
            crossDomain: settings.crossDomain,
            dataType: settings.dataType
        }));
    });
  };

  initTracking();

})(jQuery);