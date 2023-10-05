// GitHub @HeyCrab3 | Gitee @是螃蟹a丶
// 格式化日期相关
const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
  
    if (isToday(date, now)) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    if (isYesterday(date, now)) {
      return '昨天 ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    if (isSameYear(date, now)) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const isToday = (date, now) => {
    return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };
  
  const isYesterday = (date, now) => {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
  };
  
  const isSameYear = (date, now) => {
    return date.getFullYear() === now.getFullYear();
  };

export { formatDate }