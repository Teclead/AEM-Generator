export enum CustomFilePath {
  ReactExternal = 'templates/reactExternal.template.html',
  React = 'templates/react.template.html',
  HideTab = 'templates/hideTab.html',
}
/**
 * Placeholders for scripts tags inside html templates 
 */
 export enum JavaScriptPlaceHolder {
  HideTabIndex =  '{{HIDE_TAB_INDEX}}',
  HideTabFunction = '{{HIDE_TAB_FUNCTION}}',
  HideTabComponentName = '{{HIDE_TAB_COMPONENT_NAME}}'
}