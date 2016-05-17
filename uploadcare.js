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
  function ensureWidget(version) {
    if (typeof uploadcare == 'undefined') $.getScript([
      'https://ucarecdn.com/widget/', version, '/uploadcare/uploadcare.min.js'
    ].join(''))
  }

  function createButton(context, opts) {
    return function() {
      var icon = opts.buttonIcon ? '<i class="fa fa-' + opts.buttonIcon + '" /> ' : '';

      return $.summernote.ui.button({
        contents: icon + opts.buttonLabel,
        tooltip: opts.tooltipText,
        click: function() {
          var dialog = uploadcare.openDialog({}, opts);

          context.invoke('editor.saveRange');
          dialog.done(done(context, opts));
        }
      }).render();
    };
  }

  function init(context) {
    var opts = $.extend({
      crop: '',
      version: '2.9.0',
      buttonLabel: 'Uploadcare',
      tooltipText: 'Upload files via Uploadcare'
    }, context.options.uploadcare);

    ensureWidget(opts.version);

    context.memo('button.uploadcare', createButton(context, opts));
  }

  function standardCallback(context, blob) {
    context.invoke('editor.insertNode', $(
      (blob.isImage
        ? [
          '<img src="',
          blob.cdnUrl + (blob.cdnUrlModifiers ? '' : '-/preview/'),
          '" alt="', blob.name, '" />'
        ]
        : ['<a href="', blob.cdnUrl, '">', blob.name, '</a>']
      ).join('')
    ).get(0));
  }

  function done(context, opts) {
    return function(data) {
      var isMultiple = opts.multiple;
      var uploads = isMultiple ? data.files() : [data];

      $.when.apply(null, uploads).done(function() {
        var blobs = [].slice.apply(arguments);
        var cb = opts.uploadCompleteCallback;

        context.invoke('editor.restoreRange');

        $.each(blobs, function(i, blob) {
          if ($.isFunction(cb)) {
            cb.call(context, blob);
          } else {
            standardCallback(context, blob);
          }
        });
      });
    }
  }

  $.extend($.summernote.plugins, {uploadcare: init});
}));
