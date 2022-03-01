(function(document, $) {
  var onChangeContainer = '{{ONCHANGE_CONTAINER}}';
  var componentName = "'{{ONCHANGE_COMPONENT_NAME}}'";
  $(document).on('foundation-contentloaded', function() {
    onChange(onChangeContainer);
  });

  function onChange(container) {
    var tabIndex = 0;
    container.forEach((onChangeElement) => {
      var index =
        onChangeElement.tabIndex || onChangeElement.tabIndex === 0 ? onChangeElement.tabIndex : onChangeElement.index;
      var tab = getTab(index);
      var tabPaneId = getTabPaneId(tab);

      var isField = onChangeElement.isField;

      if (!isField) {
        if (tabIndex === onChangeElement.index) {
          tabIndex++;
        }
      }

      if (isField && tabPaneId) {
        var targetElement = $(`.${onChangeElement.targetClassName}`);
        var fields = $(getTabPaneFieldsByPaneId(tabPaneId));

        fields
          .children()
          .filter(function() {
            return $(this).attr('type') !== 'hidden';
          })
          .each((index, field) => {
            if (index === onChangeElement.index) {
              var onChangeFn = getFunction(onChangeElement.onChange);
              var multifield = $(field).find('div.coral-Multifield');

              if (multifield.length) {
                onChangeFn({ contentPath: getContentPath(), targetElement: targetElement.get() });
              } else {
                $(field).change(function() {
                  onChangeFn({ contentPath: getContentPath(), targetElement: targetElement.get() });
                });
              }
            }
          });
      }
    });
  }

  function getTab(index) {
    var form = getDialogForm();
    return $(form)
      .find('.coral-TabPanel-navigation')
      .children()[index];
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
