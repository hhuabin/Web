<template>
    <view>
         <view class="uni-textarea">
             <!-- 多行编辑器 -->
            <textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>
        </view>

        <view class="uni-title uni-common-pl">地区选择器</view>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    当前选择
                </view>
                <view class="uni-list-cell-db">
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <view class="uni-input">{{array[index]}}</view>
                    </picker>
                </view>
            </view>
        </view>

        <view class="uni-title uni-common-pl">时间选择器</view>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    当前选择
                </view>
                <view class="uni-list-cell-db">
                    <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
                        <view class="uni-input">{{time}}</view>
                    </picker>
                </view>
            </view>
        </view>

        <view class="uni-title uni-common-pl">日期选择器</view>
        <view class="uni-list">
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    当前选择
                </view>
                <view class="uni-list-cell-db">
                    <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                        <view class="uni-input">{{date}}</view>
                    </picker>
                </view>
            </view>
        </view>

        <button @click="get">获取选项信息</button>
    </view>
</template>

<script>
    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                title: 'picker',
                array: ['中国', '美国', '巴西', '日本'],
                index: 0,
                date: currentDate,
                time: '12:01'
            }
        },
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            }
        },
        onShareAppMessage () {

        },
        onShareTimeline() {

        },
        methods: {
            get: function () {
                // console.log(this);
                let country = this.array[this.index]

                console.log(country, this.date, this.time);
            },
            bindPickerChange: function(e) {
                console.log('picker发送选择改变，携带值为', e.target.value)
                this.index = e.target.value
            },
            bindDateChange: function(e) {
                this.date = e.target.value
            },
            bindTimeChange: function(e) {
                this.time = e.target.value
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = year + 2;
                }
                month = month > 9 ? month : '0' + month;;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}-${day}`;
            }
        }
    }
</script>

<style>
    .uni-input {
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }
</style>
