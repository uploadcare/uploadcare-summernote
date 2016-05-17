/*
 * Uploadcare Summernote plugin (1.0.0)
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(window.jQuery);
  }
}(function($) {
  $.extend($.summernote.plugins, {
    uploadcare: function(context) {
      var opts = $.extend({
        crop: '',
        version: '2.8.2',
        buttonLabel: 'Uploadcare',
        tooltipText: 'Upload your files to Uploadcare'
      }, context.options.uploadcare);

      if (typeof uploadcare == 'undefined') $.getScript([
        'https://ucarecdn.com/widget/',
        opts.version,
        '/uploadcare/uploadcare.min.js'
      ].join(''))

      context.memo('button.uploadcare', function() {
        return $.summernote.ui.button({
          contents: opts.buttonLabel,
          tooltip: opts.tooltipText,
          click: function() {
            var dialog = uploadcare.openDialog({}, opts);

            context.invoke('editor.saveRange');
            dialog.done(done(context));
          }
        }).render();
      })
    }
  });

  function done(context) {
    return function(data) {
      var opts = context.options;
      var isMultiple = opts.multiple;
      var uploads = isMultiple ? data.files() : [data];

      $.when.apply(null, uploads).done(function(blob) {
        var cb = opts.uploadComleteCallback;

        context.invoke('editor.restoreRange');

        if ($.isFunction(cb)) {
          cb.call(context, blob);
        } else if (isMultiple || !blob.isImage) {
          context.invoke('editor.insertNode', $([
            '<a href="', blob.cdnUrl, '">', blob.name, '</a>'
          ].join('')).get(0));
        } else {
          context.invoke('editor.insertNode', $([
            '<img src="',
            blob.cdnUrl + (blob.cdnUrlModifiers ? '' : '-/preview/'),
            '" alt="', blob.name, '" />'
          ].join('')).get(0))
        }
      });
    }
  }
}));
