# drag-drop-upload(拖放傳)

- Vue components
- Drag the file to the specified area and upload to specified url
- Show progress bar
- Upload multiple files and upload them

## Installation
```
npm install
```

## Usage

#### Configuration

##### Props

| Property  | Type   | Default          | Description   |
|:----------|:-------|:-----------------|:--------------|
| ele       | String | .dropbox-upload  | if not use default, default module will not show|
| customCss | String |                  | default module box css|
| uploadUrl | String |                  | default module use upload url|
| uploadIcon| String | cloud icon       | default module upload icon|
| dragSpacePrmopt| String| 檔案拖到這裡上傳 | default module drag box prompt text |
| dragSpaceAlign| String| center        | default module drag box prompt text alignment |
| titleText| String|                    | default module title, if this's test length more than 0 will show this|
| uploadText| String|                   | default module upload button text,if this's test length more than 0 will show this|
| btnWidthCss| String|                  | default module upload button css|

##### $emit

| Property  | Description   |
|:----------|:--------------|
| files     | if ele of props is not equal default, it will emit to parent|

##### Example_1
```
<meta charset="utf-8">
<title>dragDropUpload demo</title>
<script src="https://unpkg.com/vue"></script>
<script src="./dragDropUpload.umd.js"></script>

<link rel="stylesheet" href="./dragDropUpload.css">

<div id="app">
    <drag-drop-upload
            title-text="公共工程編碼EXCEL匯入:"
            upload-url="http://localhost/icmc/index.php/api/getinfomation/test"
            upload-text="匯入"
            drag-space-prmopt="拖曳需要上傳的EXCEL於此..."
            drag-space-align="left"
    ></drag-drop-upload>
</div>

<script>
new Vue({
    el: "#app"
})
</script>
```
##### Example_2
```
<meta charset="utf-8">
<title>dragDropUpload demo</title>
<script src="https://unpkg.com/vue"></script>
<script src="./dragDropUpload.umd.js"></script>

<link rel="stylesheet" href="./dragDropUpload.css">

<div id="app">
    <div id="aaa"></div>
    <drag-drop-upload
            ele="#aaa"
            @files="getFile"
    ></drag-drop-upload>
</div>

<script>
new Vue({
    el: "#app",
    methods: {
        getFile(e){
            console.log(e);
        }
    }
})
</script>
```

### License
This project is licensed under the MIT License.

#### Keywords
Vue Upload responsive
