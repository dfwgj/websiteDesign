<template>
    <div class="form-container mx-auto p-4 max-w-5xl">
        <!-- 标题部分 -->
        <div class="title-section bg-white rounded-lg p-4 mb-4">
            <h1 class="text-xl font-bold text-[#5295CD]">信息管理</h1> <!-- 字体大小调整为text-xl -->
        </div>

        <!-- 表单部分 -->
        <div
            class="scrollable-container border-2 border-[#5295CD] rounded-lg p-4 overflow-y-auto max-h-[500px] ml-10 mr-12">
            <form @submit.prevent="onSubmit" class="ml-5 mr-20">
                <div v-for="(fields, index) in fieldGroups" :key="index" class="input-row flex gap-4 mb-4">
                    <div v-for="field in fields" :key="field.key"
                        class="input-with-label flex items-center gap-2 w-full">
                        <span class="label text-sm ml-[10px]">{{ field.label }}：</span> <!-- 字体大小调整为text-sm -->
                        <input v-model="form[field.key]" type="text"
                            class="input-item flex-1 min-w-0 px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-[#5295CD] mr-[10px]">
                        <!-- 输入框高度通过py-1调整，字体大小调整为text-sm -->
                    </div>
                </div>
                <button type="submit"
                    class="w-[150px] bg-white text-sm text-[#5295CD] py-2 rounded-md border-2 border-[#5295CD] ml-[600px]">保存信息</button>
                <!-- 按钮字体大小调整为text-sm -->
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {

            },
            fieldGroups: [
                [{ label: '前端', key: '' }, { label: '后端', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }],
                [{ label: '', key: '' }, { label: '', key: '' }]
            ]
        };
    },
    methods: {
        onSubmit() {
            console.log('Form submitted:', this.form);
        }
    }
};
</script>

<style scoped>
.label {
    /* 固定宽度以便于对齐 */
    width: 150px;
    /* 根据实际情况调整 */
    display: inline-block;
    text-align: right;
    /* 文字右对齐，使得冒号对齐更美观 */
    padding-right: 10px;
    /* 给标签和输入框之间增加一些空间 */
}
</style>