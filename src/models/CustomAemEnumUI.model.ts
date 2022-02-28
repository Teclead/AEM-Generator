export enum CustomFilePath {
  ReactExternal = 'templates/reactExternal.template.html',
  React = 'templates/react.template.html',
  HideTab = 'templates/hide.js',
  OnLoad = 'templates/onLoad.js',
  OnChange = 'templates/onChange.js',
}
/**
 * Placeholders for scripts tags inside html templates
 */
export enum JavaScriptPlaceHolder {
  HideContainer = "'{{HIDE_CONTAINER}}'",
  HideComponentName = "'{{HIDE_COMPONENT_NAME}}'",
  OnLoadContainer = "'{{ONLOAD_CONTAINER}}'",
  OnLoadComponentName = "'{{ONLOAD_COMPONENT_NAME}}'",
  OnChangeContainer = "'{{ONCHANGE_CONTAINER}}'",
  OnChangeComponentName = "'{{ONCHANGE_COMPONENT_NAME}}'",
}
