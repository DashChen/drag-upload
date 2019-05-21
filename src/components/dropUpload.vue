<template>
    <div class="container" v-show="showDefault">
        <p class="row h2" v-show="showTitle">{{ titleText }}</p>
        <div class="row dropbox-upload my-3 p-3" :class="customCss">
            <div class="col-12 d-inline-flex">
                <div class="card mr-2" style="width:10rem" v-for="(file, index) in files" :key="index">
                    <div class="card-header">{{ fileInfo(file.file.type, file.file.size) }}</div>
                    <img class="card-img-top preview-img mx-auto" :src="file.img" alt="img">
                    <div class="card-body">
                        <span class="mt-0">{{ file.file.name }}</span>
                    </div>
                    <div class="card-footer bg-transparent border-top-0" v-show="showProgress">
                        <div class="progress mt-auto">
                            <div class="progress-bar progress-bar-striped"
                                 :style="{ width: file.uploadPercentage+'%' }"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <h4 class="lead text-black-50 col" :class="`text-${dragSpaceAlign}`">{{ dragSpacePrmopt }}</h4>
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-3" @click="showUpload">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <img class="upload-icon" :src="uploadIcon" alt="upload">
                        <input id="drag-drop-upload-input" type="file" multiple accept="*/*" style="display: none"
                               @change="upload">
                    </span>
                </div>
                <div class="form-control">
                    <span v-for="(file, index) in files" :key="index">
                        {{ file.file.name }}
                        <span v-show="files.length > 0 && index != (files.length -1)">,</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <button type="button" class="btn btn-success col" :class="btnWidthCss" v-show="showUploadBtn"
                    @click="uploadAll">
                <span v-html="uploadText"></span>
            </button>
        </div>
    </div>
</template>

<script>
    import cloudSvg from "./../assets/cloud-upload-2.svg"
    import pdfSvg from "./../assets/Adobe_PDF_icon.svg"
    import fileSvg from "./../assets/File_icon.svg"

    export default {
        props: {
            ele: {
                type: String,
                default: ".dropbox-upload",
                validator(x) {
                    return x.includes("#") || x.includes(".");
                }
            },
            customCss: {
                type: String,
                default: "",
            },
            uploadUrl: {
                type: String,
                default: "",
            },
            uploadIcon: {
                type: String,
                default: cloudSvg,
            },
            dragSpacePrmopt: {  //拖曳區的提示文字
                type: String,
                default: "檔案拖到這裡上傳",
            },
            dragSpaceAlign: {   //拖曳區提醒文字顯示位置
                type: String,
                default: "center",
                validator: function (value) {
                    return (value.indexOf("left") > -1) || (value.indexOf("center") > -1) || (value.indexOf("right") > -1);
                }
            },
            titleText: {        //要顯示的標題文字
                type: String,
                default: ""
            },
            uploadText: {       //要顯示的按鈕文字
                type: String,
                default: ""
            },
            btnWidthCss: {         //按鈕的特定Css
                type: String,
                default: ""
            }
        },
        data() {
            return {
                files: [],
                showProgress: true,
            }
        },
        mounted() {
            let dropbox = document.querySelector(this.ele);
            dropbox.addEventListener('dragenter', this.onDrag, false);
            dropbox.addEventListener('dragover', this.onDrag, false);
            dropbox.addEventListener('drop', this.onDrop, false);
            if (this.uploadText.length > 0) {
                this.showProgress = false;
            }
        },
        watch: {
            files: function (val) {
                if (val.length == 0 && this.showUploadBtn) {
                    this.showProgress = false;
                }
            }
        },
        computed: {
            showDefault: function () {
                return this.ele == ".dropbox-upload" ? true : false;
            },
            showTitle: function () {
                return this.titleText.length > 0;
            },
            showUploadBtn: function () {
                return this.uploadText.length > 0;
            },
            sendParent: function () {                   //要上傳父物件
                return this.ele == ".dropbox-upload" ? false : true;
            }
        },
        methods: {
            showUpload(e) {
                let tagName = e.target.tagName;
                if (tagName == "IMG") {                                    //代表找兄弟
                    e.target.nextSibling.click();
                } else {
                    if (e.target.getElementsByTagName("INPUT").length > 0) {
                        e.target.getElementsByTagName("INPUT")[0].click();
                    } else {
                        document.getElementById("drag-drop-upload-input").click();
                    }
                }
            },
            upload(e) {
                if (e.target.files.length > 0) {
                    for (let i = 0; i < e.target.files.length; i++) {
                        this.uploadFile(e.target.files[i], this.sendParent);
                    }
                }
            },
            uploadFile: function (file, sendParent = false) {

                if (sendParent) {
                    return this.$emit("files", file);
                }
                let img;

                if (file.type.includes("image")) {
                    img = window.URL.createObjectURL(file);
                } else if (file.type.includes("pdf")) {
                    img = pdfSvg;
                } else {
                    img = fileSvg;
                }

                var item = {
                    file: file,
                    img: img,
                    uploadPercentage: 0
                };
                this.files.push(item);

                if (this.showUploadBtn) {
                    return;
                }
                this.uploadFiles(item);

            },
            uploadFiles(item) {
                var fd = new FormData();
                fd.append('myFile', item.file);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', this.uploadUrl, true);
                xhr.upload.addEventListener('progress', function (e) {
                    item.uploadPercentage = Math.round((e.loaded * 100) / e.total);
                }, false);
                xhr.send(fd);
            },
            uploadAll() {
                if (this.files.length > 0) {
                    this.showProgress = true;
                    for (let i = 0; i < this.files.length; i++) {
                        this.uploadFiles(this.files[i]);
                    }
                }
            },
            onDrag: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },
            onDrop: function (e) {
                e.stopPropagation();
                e.preventDefault();
                var dt = e.dataTransfer;
                for (var i = 0; i !== dt.files.length; i++) {
                    this.uploadFile(dt.files[i], this.sendParent);
                }
            },
            fileInfo(mime, size) {
                let sizeText = "";
                if (size > 1024 * 1024) {
                    sizeText = (parseFloat(size) / (1024 * 1024)).toFixed(2) + "MB";
                } else {
                    sizeText = (parseFloat(size) / 1024).toFixed(2) + "KB";
                }
                return (mime.indexOf("image/") > -1 ? "圖片" : "檔案") + " " + sizeText;
            }
        },
    }
</script>

<style scoped>
    @import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";

    .dropbox-upload {
        border: .1rem dashed #007bff;
        min-height: 5rem;
    }

    .preview-img {
        width: 75%;
    }

    .upload-icon {
        width: 24px;
    }
</style>