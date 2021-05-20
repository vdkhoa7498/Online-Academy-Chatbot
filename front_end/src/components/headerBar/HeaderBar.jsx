import { Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import './styles.scss'

const { Search } = Input

const HeaderBar = () =>{
    return(
        <div className="header-bar">
            <Link to="/" className="logo-item">Online Learning</Link>
            <div className="tool">
                <Search placeholder="Enter your input..." className="search-box"/>
                <Button shape="round" type="primary">Login</Button>
            </div>
        </div>
    )
}

export default HeaderBar