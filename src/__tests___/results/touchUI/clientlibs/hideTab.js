(function(document, $){ 
    var hideTabIndex = [0,3]; // tabs to hide 
    /**
     * object where the properties are a reference to the hideTabIndex array 
     */
    var isHide = {"0":"function () { return location.href.includes('/de'); }","3":"function (params) {\n            console.log(params);\n            return params === null || params === void 0 ? void 0 : params.contentPath.includes('/it');\n        }"}; 
    var componentName = 'mytestcomponent'; // execute js only inside this component

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        var container = e.target;
        if(container._trackingFeature && container._trackingFeature.includes(componentName)) {
            execute()
        }

    });

    function execute(){
        var tabPaneNav =  document.getElementsByClassName("coral-TabPanel-navigation")[0];

        var firstDisplayedTabIdx = getDisplayedTabs(tabPaneNav)[0];
        var firstDisplayedTab = getTab(firstDisplayedTabIdx);
        var tabPaneId = getTabPaneId(firstDisplayedTab);

       
        hideTabs();

        if(firstDisplayedTabIdx === 0) return;
        else {
            setTabActive(firstDisplayedTab);
            activateTabPane(tabPaneId); 
        }    
    }

    function hideTabs() {
        hideTabIndex.forEach((hideTab) =>  {
            var tab = getTab(hideTab);
            var tabPaneId = getTabPaneId(tab);
            var hideFn = getFunction(isHide[hideTab]);
            if(hideFn({contentPath: getContentPath()})) {
                setTabHide(tab);
                deactivateTabPane(tabPaneId);
            }
        })
    }

    function getDialogForm(){
       return $(".coral-TabPanel-navigation").closest('form')[0]
    }

    function getContentPath(){
        var form = getDialogForm();
        return new URL(form.action).pathname
    }

    function getTab(index) {
        return $(".coral-TabPanel-navigation").children()[index];
    }

    function getTabPaneId(tab){
        return $(tab).attr("aria-controls");
    }

    function deactivateTabPane(id) {
        var pane = $('#' + id);
        $(pane).removeClass('is-active');
        $(pane).attr('aria-hidden', true);
    }

    function activateTabPane(id) {
        var pane = $('#' + id);
        $(pane).addClass('is-active');
        $(pane).attr('aria-hidden', false);
    }

    function setTabHide(tab){
        $(tab).removeClass('is-active');
        $(tab).addClass('hide');
        $(tab).attr('tabindex', -1);
        $(tab).attr('aria-selected', false);
    }

    function setTabActive(tab) {
        $(tab).addClass('is-active')
        $(tab).attr('tabindex', 0);
        $(tab).attr('aria-selected', true);
    }

    function getDisplayedTabs(nav) {
        return Object.keys(nav.children)
            .map((strNum) => parseInt(strNum))
            .filter((tab) => hideTabIndex.indexOf(tab) == -1)
    }

    function getFunction(str){
        return new Function("return " + str)();
    }


   
})(document, Granite.$)