### 管理资源

>webpack最出色的功能之一就是，除了javascript，还可以通过loader引入任何其他类型的文件。

也就是说loader主要是用来引入和转换各种类型文件的？（不知道这个说法是否准确）webpack默认可以引入js文件以及json格式的文件，其他类型的文件就要使用loader进行转换。

1. 引入`css`文件要使用`style-loader`以及`css-loader`。loader会处理代码中的相对路径，转换为最初输出的路径。
2. 引入`图片`、`字体`文件要使用`file-loader`。
3. 引入`数据`文件（比如csv，xml格式）使用`csv-loader`以及`xml-loader`。

### 管理输出

1. 动态输出打包文件的名字
2. 使用`html-webpack-plugin`生成`index.html`，取代手动维护index.html的任务
3. 使用`clean-webpack-plugin`清理`/dist`文件夹

### 开发

**这部分内容仅用于开发环境！！！也就是说，不要在生产环境中使用下面这些东西！！！**

1. source map：用于在原始代码文件中追踪警告和错误，使用`webpack中的devtool: inline-source-map`属性。
2. 在代码发生变化之后自动编译代码：

    - webpack's Watch Mode：在package.json文件中添加命令：`"watch":"webpack --watch"`
    - webpack-dev-server(*这个最常用*)：这个东西提供了一个简单的web服务器，并且能够做到实时重新加载，要使用`webpack-dev-server`这个插件
    - webpack-dev-middleware: 上面那个相当于一个自动的服务，使用中间件需要安装`webpack-dev-middleware`以及一个后端框架，guide中使用了`express`

### 模块热替换

HMR从下面几个方面加速开发过程：

1. 可以保存应用的状态而不像完整重载会导致状态丢失
2. 只更新改变的内容来节省开发时间
3. 修改css、src源文件更新速度可以媲美在浏览器中直接修改样式的速度

**这个技术不适用于生产环境，应当仅使用在开发环境中。**

1. 启用HMR

    需要两步：
    1. 更新`webpack-dev-server`的配置
    2. 使用webpack内置的HMR插件


continue...(看到这里：https://webpack.docschina.org/guides/hot-module-replacement/#%E9%80%9A%E8%BF%87-node-js-api)