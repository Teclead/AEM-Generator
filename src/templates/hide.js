(function(document, $) {
  var hideContainer = '{{HIDE_CONTAINER}}'; // tabs to hide
  var componentName = "'{{HIDE_COMPONENT_NAME}}'"; // execute js only inside this component

  // when dialog gets injected
  $(document).on('foundation-contentloaded', function(e) {
    var container = e.target;
    if (container._trackingFeature && container._trackingFeature.includes(componentName)) {
      execute();
    }
  });

  function execute() {
    var firstDisplayedTabIdx = hide(hideContainer);
    var firstDisplayedTab = getTab(firstDisplayedTabIdx);
    var tabPaneId = getTabPaneId(firstDisplayedTab);
    setTabActive(firstDisplayedTab);
    activateTabPane(tabPaneId);
  }

  /**
   * @param container JQueryModel[]
   * @return {number} index for first displayed tab
   */
  function hide(container) {
    var firstDisplayedTabIdx = 0;
    container.forEach((hidingElement) => {
      var index = hidingElement.tabIndex || hidingElement.tabIndex == 0 ? hidingElement.tabIndex : hidingElement.index;
      var tab = getTab(index);
      var tabPaneId = getTabPaneId(tab);
      var hideFn = getFunction(hidingElement.hide);

      var isTab = hidingElement.isTab;
      var isField = !hidingElement.isTab;

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
        var fields = $(getTabPaneFieldsByPaneId(tabPaneId));
        fields.children().each((index, field) => {
          if (index === hidingElement.index) {
            setHide(field);
          }
        });
      }
    });

    return firstDisplayedTabIdx;
  }

  function getDialogForm() {
    return $('.coral-TabPanel-navigation').closest('form')[0];
  }

  function getContentPath() {
    var form = getDialogForm();
    return new URL(form.action).pathname;
  }

  function getTab(index) {
    return $('.coral-TabPanel-navigation').children()[index];
  }

  function getFunction(str) {
    return new Function('return ' + str)();
  }

  function getTabPaneId(tab) {
    return $(tab).attr('aria-controls');
  }

  function getTabPane(id) {
    return document.getElementById(id);
  }

  function getTabPaneFieldsByPaneId(paneId) {
    return getTabPane(paneId).children[0];
  }

  function activateTabPane(id) {
    var pane = $('#' + id);
    $(pane).addClass('is-active');
    $(pane).attr('aria-hidden', false);
  }

  function setTabActive(element) {
    $(element).addClass('is-active');
    $(element).attr('tabindex', 0);
    $(element).attr('aria-selected', true);
  }

  function setTabInactive(element) {
    $(element).attr('tabindex', -1);
    $(element).attr('aria-selected', false);
    $(element).removeClass('is-active');
  }

  function setHide(element) {
    $(element).addClass('hide');
  }

  function deactivateTabPane(id) {
    var pane = getTabPane(id);
    $(pane).removeClass('is-active');
    $(pane).attr('aria-hidden', true);
  }
})(document, Granite.$);
