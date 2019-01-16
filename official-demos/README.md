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

2. 通过Node.js API

第一步：当使用webpack dev server和Node.js API时，不要将dev server选项放在webpack配置对象中。而是，在创建选项时，将其作为第二个参数传递，例如：

```js
new WebpackDevServer(compiler, options);
```

第二步：想要启用HMR，还需要修改webpack配置对象，使其包含HMR入口起点。可以使用`webpack-dev-server`的`addDevServerEntrypoints`的方法来实现。

3. HMR修改样式表

借助`style-loader`的帮助。

### tree shaking

这个东西就是在生产环境下去掉未引入的代码。

任何导入的文件都会受到tree shaking的影响。这意味着，如果在项目中使用类似`css-loader`，并导入css文件，则需要将其添加到side effect列表中，以免在生产模式中无意将它删除。

将包含副作用的模块写入package.json中的sideEffects中：

```js
{
    "name": "your-project",
    "sideEffects": [
        "./src/some-side-effectful-file.js",
        "*.css"
    ]
}
```

压缩输出：

将`mode`设为`production`，自动开启`UglifyJsPlug。

**感觉这里说的不清楚啊，下一个demo练习里还要明确写明`UglifyJsPlug`，到底是怎么回事？！这个guide行不行啊？概念讲不清楚，配置讲的没逻辑。**

### 生产环境构建

开发环境和生产环境的构建目标差异很大。在开发环境中，我们需要 **具有强大的、具有实时重新加载（live reloading）或热模块替换（hot module replacement）能力的source map和localhost server。**而在生产环境中，我的目标则转向于 **关注更小的bundle，更轻量的source map，以及更优化的资源，以改善加载时间。**由于要遵循逻辑分离，我们通常为每个环境编写彼此独立的webpack配置。

使用`webpack-merge`将`webpack.config.js`分为`webpack.common.js`、`webpack.dev.js`以及`webpack.prod.js`三个文件。

1. 根据环境写不同的webpack配置文件
2. 进行代码压缩，注意选定的插件要具有tree shaking的功能
3. source map，在生产模式中，这个配置值和开发模式中用的不一样，避免在生产环境中使用`inline-`，`eval-`，因为这两个设置会增加bundle的大小，会降低整体性能。
4. 制定环境，使用webpack内置的`DefinePlugin`插件为所有的依赖定义这个变量。比如使用react这样的库，在添加此`DefinePlugin`插件后，可以看到bundle文件的大小显著下降。

另外，任何位于`/src`的本地代码都可以关联到`process.env.NODE_ENV`环境变量，所以可以用来检查一下是否有效，使用下面这种代码：

```js
// 在.js文件中使用下面的代码

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
```
5. 压缩css文件，见这里：https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production


### 代码分离

方法：

1. 入口文件：在入口处手动写明不同的要加载的文件

这种方法造成的问题是：

   1. 如果入口chunks之间包含重复的模块，那些重复模块都会被引入到各个bundle中。
   2. 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

2. 使用代码分离插件

`SplitChunks`能够将库代码分离到单独的一个`chunk`（要再看一下chunk的含义）中。这个插件不需要单独安装，使用时，在配置文件中使用下面的代码进行配置：

```js
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
```

3. 使用动态导入