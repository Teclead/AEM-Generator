(function(document, $) {
  var onLoadContainer = [{"index":3,"onLoad":"function (_a) {\n            var contentPath = _a.contentPath;\n            console.log('Triggered On Load Event', contentPath);\n        }"}];

  $(document).on('dialog-ready', function() {
    onLoad(onLoadContainer);
  });

  function onLoad(container) {
    container.forEach((onLoadElement) => {
      var onLoadFn = getFunction(onLoadElement.onLoad);
      onLoadFn({ contentPath: getContentPath() });
    });
  }

  function getFunction(str) {
    return new Function('return ' + str)();
  }

  function getContentPath() {
    var form = getDialogForm();
    return new URL(form.action).pathname;
  }

  function getDialogForm() {
    return $('.coral-TabPanel-navigation').closest('form')[0];
  }
})(document, Granite.$);
