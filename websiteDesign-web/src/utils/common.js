import dayjs from 'dayjs';

// 将时间戳转化为日期格式
export function formatDate(timestamp, format = 'YYYY-MM-DD') {
    return dayjs(timestamp).format(format);
}

// 打开新标签页
export function openNewTab(url) {
    window.open(url, '_blank');
};

const common = {
    formatDate,
    openNewTab,
};

export default common;
