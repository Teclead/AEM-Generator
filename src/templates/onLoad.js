(function (document, $) {
  'use strict';

  const onLoadContainer = '{{ONLOAD_CONTAINER}}';

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
   * @param {any} onLoadElement element of container array
   * @returns {HTMLElement[]} found elements by className
   */
  function getTargetElement(onLoadElement) {
    if (!onLoadElement.onLoadTarget) {
      return [];
    }

    const form = getDialogForm();
    const targetElement = $(form).find(`.${onLoadElement.onLoadTarget}`);

    return targetElement.get();
  }

  /**
   * @param {any[]} container array of jquery models
   */
  function onLoad(container) {
    container.forEach((onLoadElement) => {
      const onLoadFn = getFunction(onLoadElement.onLoad);
      onLoadFn({
        contentPath: getContentPath(),
        targetElement: getTargetElement(onLoadElement),
      });
    });
  }

  $(document).on('dialog-ready', function () {
    onLoad(onLoadContainer);
  });
})(document, Granite.$);
