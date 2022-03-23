(function (document, $) {
  'use strict';

  const onChangeContainer = [{"index":1,"tabIndex":0,"isTab":false,"multifields":[{"index":0,"isTab":false,"onChange":"function (_a) {\n                    var targetElement = _a.targetElement;\n                    console.log('Nested Multifield Change', targetElement);\n                }","onChangeTarget":"nested-custom-class"}],"onChange":"function (_a) {\n            var targetElement = _a.targetElement;\n            console.log('Multifield Target', targetElement);\n        }","onChangeTarget":"nested-custom-class"},{"index":6,"tabIndex":0,"isTab":false,"onChange":"function (_a) {\n            var contentPath = _a.contentPath, targetElement = _a.targetElement;\n            console.log('On Change Triggered', contentPath, targetElement);\n        }","onChangeTarget":"testChangeClass"},{"index":0,"tabIndex":2,"isTab":false,"multifields":[{"index":1,"isTab":false,"onChange":"function (_a) {\n            var contentPath = _a.contentPath, targetElement = _a.targetElement;\n            console.log('On Change Triggered', contentPath, targetElement);\n        }","onChangeTarget":"testChangeClass"}],"onChange":"undefined","onChangeTarget":""}];

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
   * @param {any} onChangeElement element of container array
   * @returns {HTMLElement[]} found elements by className
   */
  function getTargetElement(onChangeElement) {
    if (!onChangeElement.onChangeTarget) {
      return [];
    }

    const form = getDialogForm();
    const targetElement = $(form).find(`.${onChangeElement.onChangeTarget}`);

    return targetElement.get();
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

  /**
   * @param {any} multifield multifield jquery object
   * @param {any} onChangeElement element of container array
   */
  function handleNestedFields(multifield, onChangeElement) {
    const children = $(multifield).find('.coral-Form-fieldset').children();

    $(children).each((i, child) => {
      const fields = $(child).children();
      $(fields).each((index, field) => {
        onChangeElement.multifields.forEach((element) => {
          if (element.index === index) {
            $(field).change(function () {
              const onChangeFn = getFunction(element.onChange);
              onChangeFn({
                contentPath: getContentPath(),
                targetElement: getTargetElement(element),
              });
            });
          }
        });
      });
    });
  }

  /**
   * @param {any} multifield multifield jquery object
   * @param {any} onChangeElement element of container array
   */
  function handleMultiFieldOnChange(multifield, onChangeElement) {
    if (onChangeElement.multifields) {
      handleNestedFields(multifield, onChangeElement);
    }

    if (onChangeElement.onChange && onChangeElement.onChange !== 'undefined') {
      const onChangeFn = getFunction(onChangeElement.onChange);

      $(multifield).on('click', '.coral-Multifield-add', function () {
        onChangeFn({
          contentPath: getContentPath(),
          targetElement: getTargetElement(onChangeElement),
        });
      });

      $(multifield).on('click', '.coral-Multifield-remove', function () {
        onChangeFn({
          contentPath: getContentPath(),
          targetElement: getTargetElement(onChangeElement),
        });
      });
    }
  }

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

      const isTab = onChangeElement.isTab;

      if (isTab) {
        if (tabIndex === onChangeElement.index) {
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
            if (i === onChangeElement.index) {
              const multifield = $(field).find('div.coral-Multifield');

              if (multifield.length) {
                handleMultiFieldOnChange(multifield, onChangeElement);
              } else {
                $(field).change(function () {
                  const onChangeFn = getFunction(onChangeElement.onChange);
                  onChangeFn({
                    contentPath: getContentPath(),
                    targetElement: getTargetElement(onChangeElement),
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
