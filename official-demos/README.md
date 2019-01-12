### 管理资源

>webpack最出色的功能之一就是，除了javascript，还可以通过loader引入任何其他类型的文件。

也就是说loader主要是用来引入和转换各种类型文件的？（不知道这个说法是否准确）webpack默认可以引入js文件以及json格式的文件，其他类型的文件就要使用loader进行转换。

1. 引入`css`文件要使用`style-loader`以及`css-loader`。loader会处理代码中的相对路径，转换为最初输出的路径。
2. 引入`图片`、`字体`文件要使用`file-loader`。
3. 引入`数据`文件（比如csv，xml格式）使用`csv-loader`以及`xml-loader`。