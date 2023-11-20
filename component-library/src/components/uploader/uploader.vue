<!-- vue2的图片上传参考组件。vue3使用需要重写 -->
<template>
    <!-- 上传图片组件 -->
    <div class="upload-image">
        <div class="title-box" v-if="title">
            <div class="title">{{title}}</div>
        </div>
        <!-- 一张图片 -->
        <div class="center-img" v-if="oneImg">
            <div class="image-box" v-if="base64img0">
                <img :src="base64img0" alt="">
                <div class="close" @click="deleteimg(0)">
                    <img src="../../image/close.png" alt="">
                </div>
            </div>
            <div class="image-box" v-else>
                <div class="photo-box">
                    <input type="file" accept="image/*" @change="toBase64(0, $event)">
                    <div class="camera" v-if="camera">
                        <img src="../../image/camera.png" alt="">
                    </div>
                    <div class="business" v-else>
                        <img src="../../image/business.png" alt="">
                    </div>
                    <div class="tip">{{imgTitle.title0}}</div>
                </div>
            </div>
        </div>
        <!-- 两张图片 -->
        <div class="two-img" v-else>
            <div class="image-box" v-if="base64img0">
                <img :src="base64img0" alt="">
                <div class="close" @click="deleteimg(0)">
                    <img src="../../image/close.png" alt="">
                </div>
            </div>
            <div class="image-box" v-else>
                <div class="photo-box">
                    <input type="file" accept="image/*" @change="toBase64(0, $event)">
                    <div class="camera">
                        <img src="../../image/idcard0.png" alt="">
                    </div>
                    <div class="tip">{{imgTitle.title0}}</div>
                </div>
            </div>

            <div class="image-box" v-if="base64img1">
                <img :src="base64img1" alt="">
                <div class="close" @click="deleteimg(1)">
                    <img src="../../image/close.png" alt="">
                </div>
            </div>
            <div class="image-box" v-else>
                <div class="photo-box">
                    <input type="file" accept="image/*" @change="toBase64(1, $event)">
                    <div class="camera">
                        <img src="../../image/idcard1.png" alt="">
                    </div>
                    <div class="tip">{{imgTitle.title1}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { uploadImg } from '../../api/index'
import { Toast, Uploader } from 'vant'
    export default {
        name: "singleImg",
        components: {
            [Uploader.name]: Uploader,
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            oneImg: {
                type: Boolean,
                default: true
            },
            camera: {
                type: Boolean,
                default: true
            },
            imgTitle: {
                type: Object,
                default: () => ({
                        title0: '',
                        title1: ''
                    })
            },
            events: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                base64img0: '',
                base64img1: '',
            }
        },
        methods: {
            // 选择图片 默认是两张图片的情况，type = 0是第一张图片， type=1是第二张图片
            toBase64(type, event) {
                //获取该input的所有元素、属性
                const file = event.currentTarget.files[0]
                console.log(Object.prototype.toString.call(file), 'filetype');      // 判断对象的具体
                console.log(file.type, file.size/1024+'k', file);

                if (!/\.(jpg|png|jpeg)$/i.test(file.name)) {
                    Toast('请选择图片!')
                    console.log("请选择图片!");
                    return
                } else if(file.size>5*1024*1024) {
                    Toast('照片不能超过5M')
                    console.log('照片不能超过5M');
                    return
                } else {
                    // 将图片转化成base64并显示
                    const imgFile = new FileReader();
                    imgFile.readAsDataURL(file);
                    // console.log(file);
                    imgFile.onload = () => {
                        // this.base64img0 = imgFile.result;     //base64数据
                        if(type == 0) {
                            this.base64img0 = imgFile.result
                            let formData = new FormData();
                            formData.append( "file", file);
                            uploadImg(formData)
                                .then(res => {
                                    console.log(res);
                                    this.$emit(this.events[0], 'src')
                                })
                        } else {
                            this.base64img1 = imgFile.result
                            this.$emit(this.events[1], 'src')
                        }
                    }
                }
            },
            // 删除图片
            deleteimg(type) {
                if(type == 0) {
                    this.base64img0 = ''
                    this.$emit(this.events[0], '')
                } else {
                    this.base64img1 = ''
                    this.$emit(this.events[1], '')
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .upload-image {
        width: 100%;
        padding: 0 15px;

        .title-box {
            box-sizing: border-box;
            margin-top: 12px;
            padding-bottom: 6px;
            color: #9B9B9B;
            font-size: 12px;
        }

        .center-img {
            width: 100%;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center; 

            .image-box {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                border-radius: 6px;
                background-color: #fff;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }

                .close {
                    width: 22px;
                    height: 22px;
                    position: absolute;
                    top: 0;
                    right: 0;
                }

                .photo-box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;

                    input {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                    }

                    .camera {
                        width: 45px;
                        height: 45px;
                        margin-bottom: 17px;
                    }

                    .business {
                        width: 129.5px;
                        height: 89;
                        margin-bottom: 4px;
                    }

                    .tip {
                        text-align: center;
                        color: #0F43FF;
                        font-size: 16px;
                    }
                }
            }


        }

        .two-img {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .image-box {
                width: 168.5px;
                height: 150px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                border-radius: 6px;
                background-color: #fff;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }

                .close {
                    width: 22px;
                    height: 22px;
                    position: absolute;
                    top: 0;
                    right: 0;
                }

                .photo-box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;

                    input {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                    }

                    .camera {
                        width: 93px;
                        height: 63px;
                        margin-bottom: 16px;
                    }

                    .tip {
                        text-align: center;
                        color: #0F43FF;
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>
