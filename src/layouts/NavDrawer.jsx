import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IcLogo, IcLogoSm } from '~/components/Icon';
import AuthContext from '~/context/AuthContext';

const NavSider = styled(Sider)`
    &&& {
        top: 0;
        z-index: 15;
        position: sticky;
        max-height: 100vh;
        overflow-y: auto;
    }
`;
const LogoWrapper = styled(Link)`
    display: block;
    padding-left: ${({ collapsed }) => (collapsed ? '25px' : '70px')};
    padding-top: 15px;
    padding-bottom: 5px;
    transition: padding-left 300ms;
    top: 0;
    z-index: 10;
    height: 60px;
    position: sticky;
    background-color: #001529;
`;
const routesAdmin = [
    { key: '1', label: 'Nhân viên', pathname: '/employees', icon: <UserOutlined /> },
    { key: '2', label: 'Khách hàng', pathname: '/customers', icon: <TeamOutlined /> },
];
const NavDrawer = () => {
    const { user } = useContext(AuthContext);
    const { pathname } = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [items, setItems] = useState([]);

    // useEffect(() => {
    //   const role = user?.role;

    //   if (!role) return;
    //   if (role === "ADMIN") {
    //     setRoutes(routesManager);
    //     setItems(itemsManager);
    //   }
    //   if (role === "USER") {
    //     setRoutes(routesDispatcher);
    //     setItems(itemsDispatcher);
    //   }
    // }, [user]);

    // let activeKey = "1";
    // if (pathname !== "/") {
    //   const existedRoute = routes.find((r) => r.pathname !== "/" && pathname.includes(r.pathname));
    //   activeKey = existedRoute?.key;
    // }
    let activeKey = '1';

    return (
        <NavSider
            collapsible
            collapsed={collapsed}
            width="240px"
            onCollapse={(value) => setCollapsed(value)}
            breakpoint="xl"
        >
            <LogoWrapper collapsed={collapsed} to="/">
                {collapsed && <IcLogoSm />}
                {!collapsed && <IcLogo />}
            </LogoWrapper>
            <Menu theme="dark" selectedKeys={[activeKey]} mode="inline" items={items} />;
        </NavSider>
    );
};

export default NavDrawer;
