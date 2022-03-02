// this file is only used in AEM repositories with a create React App config

const fs = require('fs');
const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootLevel = './../../../';
const package = require(`${rootLevel}package.json`);
const assetPath = package.tecleadConfig.assetPath;
const appsPath = package.tecleadConfig.appsFolder;

if (!assetPath) {
  throw Error('assetPath in tecleadConfig is not definied');
}

if (!appsPath) {
  throw Error('appsFolder in tecleadConfig is not definied');
}

console.info('Build Teclead AEM React in:', assetPath, appsPath);

const appsFolder = Path.resolve(__dirname, rootLevel, appsPath);
const components = fs.readdirSync(appsFolder);

// {appName: indexPath}
const appsEntry = {};

components.forEach((componentFolder) => {
  const folderPath = Path.resolve(appsFolder, componentFolder);
  const indexFilePath = Path.resolve(folderPath, 'index.tsx');
  const hasIndex = fs.existsSync(indexFilePath);

  if (hasIndex) {
    appsEntry[componentFolder] = indexFilePath;
  }
});

console.log('React Components to scan:', components);
console.log('AEM React Apps: ', appsEntry);

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      console.log(file);
      const curPath = Path.join(path, file);

      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  } else {
    console.warn('Folder does not exist =>', path);
  }
};

deleteFolderRecursive(Path.join(__dirname, `../../../${assetPath}/js`));
deleteFolderRecursive(Path.join(__dirname, `../../../${assetPath}/css`));

const overrideWebpackConfig = ({ webpackConfig }) => {
  webpackConfig.entry = appsEntry;
  webpackConfig.output.filename =
    '../' + assetPath + 'js/[name].[contenthash:8].js';
  webpackConfig.output.chunkFilename =
    '../' + assetPath + 'js/[name].[contenthash:8].chunk.js';
  webpackConfig.optimization.runtimeChunk = false;
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };

  const cssPlugin = new MiniCssExtractPlugin({
    filename: '../' + assetPath + 'css/[name].[contenthash:8].css',
    chunkFilename: '../' + assetPath + 'css/[name].[contenthash:8].chunk.css',
  });

  // overwrite manufest plugin
  webpackConfig.plugins[6].opts.generate = () => [];
  webpackConfig.plugins = [...webpackConfig.plugins, cssPlugin];

  return webpackConfig;
};

module.exports = {
  plugins: [
    {
      plugin: { overrideWebpackConfig },
    },
  ],
};
