(function (document, $) {
  'use strict';

  const onLoadContainer = [{"index":6,"onLoad":"function (_a) {\n            var contentPath = _a.contentPath;\n            console.log('Triggered On Load Event', contentPath);\n        }"}];

  /**
   * @param {string} str function that should be retured
   * @returns {void} calls the function
   */
  function getFunction(str) {
    return new Function('return ' + str)();
  }

  /**
   * @returns {HTMLElement} the first found dialog form
   */
  function getDialogForm() {
    return $('.coral-TabPanel-navigation').closest('form')[0];
  }

  /**
   * @returns {string} the content path of the form
   */
  function getContentPath() {
    const form = getDialogForm();

    return new URL(form.action).pathname;
  }

  /**
   * @param {any[]} container array of jquery models
   */
  function onLoad(container) {
    container.forEach((onLoadElement) => {
      const onLoadFn = getFunction(onLoadElement.onLoad);
      onLoadFn({ contentPath: getContentPath() });
    });
  }

  $(document).on('dialog-ready', function () {
    onLoad(onLoadContainer);
  });
})(document, Granite.$);
