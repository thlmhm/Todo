import { Button, Form, Input } from 'antd';
import * as yup from 'yup';
import { yupSync } from '~/utils/yup';
const FormRegister = ({ navigator, showVerifyForm }) => {
    const [form] = Form.useForm();
    const schema = yup.object().shape({
        email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: yup.string().required('Vui lòng nhập mật khẩu!'),
        repassword: yup.string().required('Vui lòng nhập mật khẩu!'),
    });
    const handleSubmit = (values) => {
        // AntdSwal.fire("Thành công", "Email đã nhập là " + values.email, "success");
        if (values.password !== values.repassword) {
            console.log('sai');
        }
        console.log(values);
        // navigate()
    };
    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="w-100">
            <Form.Item label="Email" name="email" rules={[yupSync(schema)]}>
                <Input placeholder="Nhập địa chỉ email" size="large" />
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password" rules={[yupSync(schema)]}>
                <Input.Password placeholder="Nhập mật khẩu" size="large" />
            </Form.Item>
            <Form.Item label="Xác nhận mật khẩu" name="repassword" rules={[yupSync(schema)]}>
                <Input.Password placeholder="Nhập lại mật khẩu" size="large" />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="w-100 mt-2">
                Đăng ký
            </Button>
            <Button type="link" className="w-100 mt-4" onClick={navigator}>
                Thử đăng nhập lại
            </Button>
        </Form>
    );
};
export default FormRegister;
