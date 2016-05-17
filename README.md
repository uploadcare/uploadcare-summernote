# uploadcare-summernote

This is [Uploadcare] plugin for [Summernote WYSIWYG] editor.
It will allow your users to upload files and images from local device, social networks,
cloud storages without any backend code that is usually required to handle uploads.

## Installation & configuration

1. Include plugin code on the page with Summernote:

    ```html
    // bootstrap and jquery
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css" rel="stylesheet">
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"></script>

    // summernote
    <link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.1/summernote.css" rel="stylesheet">
    <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.1/summernote.js"></script>

    // plugin
    <script src="./uploadcare.js"></script>
    ```

3. Add button for plugin in toolbar settings and provide any Uploadcare [widget settings] you may want:

    ```html
    <script type="text/javascript">
      $(function() {
        $('#summernote').summernote({
          // unfortunately you can only rewrite
          // all the toolbar contents, on the bright side
          // you can place uploadcare button wherever you want
          toolbar: [
            ['uploadcare', ['uploadcare']], // here, for example
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['media', 'link', 'hr', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
          ],
          uploadcare: {
            // button name (default is Uploadcare)
            buttonLabel: 'Image / file'
            // font-awesome icon name (you need to include font awesome on the page)
            buttonIcon: 'picture-o',
            // text which will be shown in button tooltip
            tooltipText: 'Upload files or video or something',

            // uploadcare widget options, see https://uploadcare.com/documentation/widget/#configuration
            publicKey: 'demopublickey', // set your API key
            crop: 'free',
            tabs: 'all',
            multiple: true
          }
        });
      });
    </script>
    ```

## Required setting

There is only one - your public API key. You can get that by creating an
account [Uploadcare]. You can use demo public key during dev stage, but note that
demo account files are removed every few hours.


## Useful settings

### Locale.
Set widget locale. Should be set as global variable:

```html
<script>
  UPLOADCARE_LOCALE = 'es';
</script>
```

### Crop.
You can enable custom crop in the widget. After a user selects a file she will
be able to crop it, according to your settings. Original file will be uploaded
to your project, but additional crop operations will be included in resulting
image URL.

Crop options is a string with one or more crop presets. Presets are divided by
commas. When more than one preset is defined, user can pick any of them on crop
step. Each preset consists of a size definition and optional keyword.

- "disabled" — crop is disabled. Can't be combined with other presets;
- "" or "free" — crop enabled and the user will be able to select any area on an image;
- "2:3" — user will be able to select an area with aspect ratio 2:3;
- "300x200" — same as previous, but if the selected area is bigger than 300x200, it will be scaled down to these dimensions;
- "300x200 upscale" — same as previous, but the selected area will be scaled even if it is smaller than the specified size;
- "300x200 minimum" — user will not be able to select an area smaller than 300x200. If uploaded image is smaller than 300x200 itself, it will be upscaled.

```html
<script type="text/javascript">
  $(function() {
    $('#summernote').summernote({
      ...
      uploadcare: {
        ...
        crop: '4:3, 3:4'
      }
    });
  });
</script>
```

### Tabs (Upload Sources)

The widget can upload files from disk, URLs, and many social sites.
Each upload source has its own tab in the widget dialog.

A full list of tabs supported in the latest widget version
(2.0.6) is provided below.

<table class="reference">
  <tr>
    <th>Code</th>
    <th>File Source</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>file</code></td>
    <td>Local disk</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>camera</code></td>
    <td>Local webcam</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>url</code></td>
    <td>Any URL</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>facebook</code></td>
    <td><a href="https://www.facebook.com/">Facebook</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>gdrive</code></td>
    <td><a href="https://drive.google.com/">Google Drive</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>dropbox</code></td>
    <td><a href="https://www.dropbox.com/">Dropbox</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>instagram</code></td>
    <td><a href="http://instagram.com/">Instagram</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>evernote</code></td>
    <td><a href="http://evernote.com/">Evernote</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>flickr</code></td>
    <td><a href="https://www.flickr.com/">Flickr</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>skydrive</code></td>
    <td><a href="https://onedrive.live.com/">OneDrive</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>box</code></td>
    <td><a href="https://www.box.com/">Box</a></td>
    <th>Off</th>
  </tr>
  <tr>
    <td><code>vk</code></td>
    <td><a href="http://vk.com/">VK</a></td>
    <th>Off</th>
  </tr>
  <tr>
    <td><code>Huddle</code></td>
    <td><a href="http://huddle.com/">Huddle</a></td>
    <th>Off</th>
  </tr>
</table>

The set can be reconfigured by
specifying the ones you need in a space-separated value.
Special value `all` can be used to enable all supported sources.

```html
<script type="text/javascript">
  $(function() {
    $('#summernote').summernote({
      ...
      uploadcare: {
        ...
        tabs: 'file url instagram flickr'
      }
    });
  });
</script>
```


## Other settings

All Uploadcare widget settings are too numerous to be listed here, please read
Uploadcare [widget documentation] to unleash full uploading power.

[Summernote WYSYWIG]: http://summernote.org/
[widget settings]: https://uploadcare.com/documentation/widget/#configuration
[widget documentation]: https://uploadcare.com/documentation/widget/
[Uploadcare]: https://uploadcare.com/?utm_source=github&utm_medium=description&utm_campaign=summernote
