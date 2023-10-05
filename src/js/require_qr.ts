// GitHub @HeyCrab3 | Gitee @是螃蟹a丶
import { Message, Modal } from '@arco-design/web-vue'
import Axios from 'axios'
const requireQrCode = async () => {
    try {
        const response = await Axios('/api/v2/user/get_qr_info');
        const data = response['data'];
        if (data['code'] !== 0) {
            Message.error(data['msg']);
        } else {
            return data['data']['qr_key'];
        }
    } catch (error) {
        Modal.error({
            title: '二维码获取失败，请稍后再试',
            content: '请加入官方QQ频道（仙舟通鉴）反馈，并附带以下错误信息：\n' + error
        });
        return false
    }
};    
const requireQrStatus = async(qr_key: string) => {
    try {
        const response = await Axios('/api/v2/user/qr_info?qr_key=' + qr_key);
        const data = response['data'];
        if (data['code'] !== 0) {
            Message.error(data['msg']);
        } else {
            return data['status'];
        }
    } catch (error) {
        Modal.error({
            title: '二维码获取失败，请稍后再试',
            content: '请加入官方QQ频道（仙舟通鉴）反馈，并附带以下错误信息：\n' + error
        });
        return false
    }
}
export { requireQrCode, requireQrStatus }