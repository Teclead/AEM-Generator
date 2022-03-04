(function (document, $) {
  'use strict';

  const onChangeContainer = '{{ONCHANGE_CONTAINER}}';

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
   * @param {string} str function that should be retured
   * @returns {void} calls the function
   */
  function getFunction(str) {
    return new Function('return ' + str)();
  }

  /**
   * @param {string} id the id of the tab pane
   * @returns {HTMLElement} the tab pane
   */
  function getTabPane(id) {
    return document.getElementById(id);
  }

  /**
   * @param {string} paneId the id of the pane
   * @returns {HTMLElement} the tab pane fiels of the tab pane
   */
  function getTabPaneFieldsByPaneId(paneId) {
    return getTabPane(paneId).children[0];
  }

  // const componentName = "'{{ONCHANGE_COMPONENT_NAME}}'";
  /**
   * @param {any[]} container array of jquery models
   */
  function onChange(container) {
    let tabIndex = 0;
    container.forEach((onChangeElement) => {
      const index =
        onChangeElement.tabIndex || onChangeElement.tabIndex === 0
          ? onChangeElement.tabIndex
          : onChangeElement.index;
      const tab = getTab(index);
      const tabPaneId = getTabPaneId(tab);

      const isField = onChangeElement.isField;

      if (!isField) {
        if (tabIndex === onChangeElement.index) {
          tabIndex++;
        }
      }

      if (isField && tabPaneId) {
        const targetElement = $(`.${onChangeElement.targetClassName}`);
        const fields = $(getTabPaneFieldsByPaneId(tabPaneId));

        fields
          .children()
          .filter(function () {
            return $(this).attr('type') !== 'hidden';
          })
          .each((i, field) => {
            if (i === onChangeElement.index) {
              const onChangeFn = getFunction(onChangeElement.onChange);
              const multifield = $(field).find('div.coral-Multifield');

              if (multifield.length) {
                onChangeFn({
                  contentPath: getContentPath(),
                  targetElement: targetElement.get(),
                });
              } else {
                $(field).change(function () {
                  onChangeFn({
                    contentPath: getContentPath(),
                    targetElement: targetElement.get(),
                  });
                });
              }
            }
          });
      }
    });
  }

  $(document).on('foundation-contentloaded', function () {
    onChange(onChangeContainer);
  });
})(document, Granite.$);
