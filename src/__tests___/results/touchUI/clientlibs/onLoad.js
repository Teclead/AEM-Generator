(function (document, $) {
  'use strict';

  const onLoadContainer = [{"index":6,"isTab":false,"tabIndex":0,"onLoad":"function (_a) {\n            var contentPath = _a.contentPath, targetElement = _a.targetElement, sourceElement = _a.sourceElement;\n            console.log('Triggered On Load Event', {\n                contentPath: contentPath,\n                targetElement: targetElement,\n                sourceElement: sourceElement,\n            });\n        }","onLoadTarget":"testLoadClass"}];

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
   * @param {string} id the id of the tab pane
   * @returns {HTMLElement} the tab pane
   */
  function getTabPane(id) {
    return document.getElementById(id);
  }

  /**
   * @param {HTMLElement} tab the tab to get the pane
   * @returns {HTMLElement} the tab pane with the attribute `aria-controls`
   */
  function getTabPaneId(tab) {
    return $(tab).attr('aria-controls');
  }

  /**
   * @param {number} index index of the tab
   * @returns {HTMLElement} the tab by index
   */
  function getTab(index) {
    const form = getDialogForm();

    return $(form).find('.coral-TabPanel-navigation').children()[index];
  }

  /**
   * @param {string} paneId the id of the pane
   * @returns {HTMLElement} the tab pane fiels of the tab pane
   */
  function getTabPaneFieldsByPaneId(paneId) {
    return getTabPane(paneId).children[0];
  }

  /**
   * @returns {string} the content path of the form
   */
  function getContentPath() {
    const form = getDialogForm();

    return new URL(form.action).pathname;
  }

  /**
   * @param {any} field the field where the function is used
   * @returns {HTMLElement[]} the field(s) as HTMLElement
   */
  function getSourceElement(field) {
    return $(field).get();
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
      const index =
        onLoadElement.tabIndex || onLoadElement.tabIndex === 0
          ? onLoadElement.tabIndex
          : onLoadElement.index;
      const tab = getTab(index);
      const tabPaneId = getTabPaneId(tab);

      const isTab = onLoadElement.isTab;

      if (isTab) {
        if (tabIndex === onLoadElement.index) {
          tabIndex++;
        }
      }

      if (!isTab && tabPaneId) {
        const fields = $(getTabPaneFieldsByPaneId(tabPaneId));

        fields
          .children()
          .filter(function () {
            return $(this).attr('type') !== 'hidden';
          })
          .each((i, field) => {
            if (i === onLoadElement.index) {
              const onLoadFn = getFunction(onLoadElement.onLoad);

              onLoadFn({
                contentPath: getContentPath(),
                targetElement: getTargetElement(onLoadElement),
                sourceElement: getSourceElement(field),
              });
            }
          });
      }
    });
  }

  $(document).on('dialog-ready', function () {
    onLoad(onLoadContainer);
  });
})(document, Granite.$);
