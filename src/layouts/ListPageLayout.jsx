import { Button, Typography } from 'antd';
import styled from 'styled-components';
import { CloudDownloadOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Title } = Typography;

const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & * {
        align-self: center;
    }
`;

const ListExportButton = styled(Button)`
    display: flex;
    align-items: center;
    padding-left: 0;
    padding-right: 0;

    svg {
        font-size: 23px;
    }
`;
const Container = styled.div`
    width: 100%;
    max-width: ${({ size = 'full' }) =>
        ({
            full: '100%',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1400px',
        }[size])};
    margin: auto;
`;
const ListPageLayout = ({
    size = 'lg',
    title = '',
    addable = true,
    cardTitle = '',
    addText = '',
    exportText = '',
    handleAdd = () => {},
    handleExport = () => {},
    children,
}) => {
    return (
        <Container size={size}>
            <ListHeader>
                <Title level={2}>{title}</Title>
                {addable && (
                    <Button type="primary" size="large" onClick={handleAdd}>
                        <PlusCircleOutlined /> {addText}
                    </Button>
                )}
            </ListHeader>
            <ListExportButton type="link" onClick={handleExport}>
                <CloudDownloadOutlined /> {exportText}
            </ListExportButton>
            <Card title={cardTitle} bordered={false} className="mt-8">
                {children}
            </Card>
        </Container>
    );
};

export default ListPageLayout;
