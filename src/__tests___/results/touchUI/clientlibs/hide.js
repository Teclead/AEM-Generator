(function (document, $) {
  'use strict';

  const hideContainer = [{"index":3,"isTab":true,"hide":"function (_a) {\n            var contentPath = _a.contentPath;\n            return contentPath.includes('/it');\n        }"},{"index":6,"tabIndex":0,"isTab":false,"hide":"function (_a) {\n            var contentPath = _a.contentPath;\n            return contentPath.includes('/de');\n        }"}]; // tabs to hide
  const componentName = "mytestcomponent"; // execute js only inside this component

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
    return $('.coral-TabPanel-navigation').children()[index];
  }

  /**
   * @param {string} str function that should be retured
   * @returns {void} calls the function
   */
  function getFunction(str) {
    return new Function('return ' + str)();
  }

  /**
   * @param {HTMLElement} element the element to hide
   */
  function setHide(element) {
    $(element).addClass('hide');
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
   * @param {string} id the tab pane id
   */
  function deactivateTabPane(id) {
    const pane = getTabPane(id);
    $(pane).removeClass('is-active');
    $(pane).attr('aria-hidden', true);
  }

  /**
   * @param {HTMLElement} element the tab which should be inactive
   */
  function setTabInactive(element) {
    $(element).attr('tabindex', -1);
    $(element).attr('aria-selected', false);
    $(element).removeClass('is-active');
  }

  /**
   * @param {any[]} container array of jquery models
   * @returns {number} index for first displayed tab
   */
  function hide(container) {
    let firstDisplayedTabIdx = 0;
    container.forEach((hidingElement) => {
      const index =
        hidingElement.tabIndex || hidingElement.tabIndex === 0
          ? hidingElement.tabIndex
          : hidingElement.index;
      const tab = getTab(index);
      const tabPaneId = getTabPaneId(tab);
      const hideFn = getFunction(hidingElement.hide);

      const isTab = hidingElement.isTab;
      const isField = !hidingElement.isTab;

      // hide dialog tab
      if (isTab && hideFn({ contentPath: getContentPath() })) {
        setTabInactive(tab);
        setHide(tab);
        deactivateTabPane(tabPaneId);

        // which tab is set to active
        if (firstDisplayedTabIdx === hidingElement.index) {
          firstDisplayedTabIdx++;
        }
      }

      // hide dialog field
      if (isField && hideFn({ contentPath: getContentPath() })) {
        const fields = $(getTabPaneFieldsByPaneId(tabPaneId));
        fields.children().each((i, field) => {
          if (i === hidingElement.index) {
            setHide(field);
          }
        });
      }
    });

    return firstDisplayedTabIdx;
  }

  /**
   * @param {string} id id of the tab pane that should be activated
   */
  function activateTabPane(id) {
    const pane = $('#' + id);
    $(pane).addClass('is-active');
    $(pane).attr('aria-hidden', false);
  }

  /**
   * @param {HTMLElement} element tab that should be activated
   */
  function setTabActive(element) {
    $(element).addClass('is-active');
    $(element).attr('tabindex', 0);
    $(element).attr('aria-selected', true);
  }

  /**
   * execute the hide function
   */
  function execute() {
    const firstDisplayedTabIdx = hide(hideContainer);
    const firstDisplayedTab = getTab(firstDisplayedTabIdx);
    const tabPaneId = getTabPaneId(firstDisplayedTab);
    setTabActive(firstDisplayedTab);
    activateTabPane(tabPaneId);
  }

  $(document).on('foundation-contentloaded', function (e) {
    const container = e.target;

    if (
      container._trackingFeature &&
      container._trackingFeature.includes(componentName)
    ) {
      execute();
    }
  });
})(document, Granite.$);
