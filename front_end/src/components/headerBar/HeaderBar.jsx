import { Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo_64.png';
import './styles.scss'

const { Search } = Input

const HeaderBar = () =>{
    return(
        <div className="header-bar">
            <Link to="/" className="logo-item"><img src={Logo} alt="Online Learning" /> Online Learning</Link>
            <div className="tool">
                <Search placeholder="Enter your input..." className="search-box"/>
                <Button className="button" shape="round" type="primary">Đăng nhập</Button>
                <Button className="button" shape="round" type="primary">Đăng Ký</Button>
            </div>
        </div>
    )
}

export default HeaderBar