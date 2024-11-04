import { Outlet } from "react-router-dom"
import HeaderComponent from 'src/components/common/HeaderComponent';
import FooterComponent from 'src/components/common/FooterComponent';

const Layout = () => {
    return (
        <main>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />

        </main>
    )
}

export default Layout
