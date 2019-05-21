<template>
    <div id="app">
        <div id="aaa">

        </div>
        <drag-drop-upload
                ele="#aaa"
                @files="getFile"
                title-text="公共工程編碼EXCEL匯入:"
                upload-url="http://localhost/icmc/index.php/api/getinfomation/test"

                drag-space-prmopt="拖曳需要上傳的EXCEL於此..."
                drag-space-align="left"
        ></drag-drop-upload>
    </div>
</template>

<script>

    import DragDropUpload from './components/dropUpload'

    export default {
        name: 'app',
        components: {
            DragDropUpload
        },
        methods: {
            getFile(e) {
                console.log(e)
            }
        }
    }
</script>

<style>
 div#aaa {
     width: 400px;
     height: 400px;
     border: 1px solid red;
 }
</style>
