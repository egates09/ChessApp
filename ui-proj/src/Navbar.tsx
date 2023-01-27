import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [activeItem, setActiveItem] = useState('home')

    const handleMenuClick = (name: string) => {
        setActiveItem(name);
    }
    return (
        <Menu inverted>
            <Menu.Item
                active={activeItem === 'home'}>
                <Link onClick={() => handleMenuClick('home')} to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item
                active={activeItem === 'games'}>
                <Link onClick={() => handleMenuClick('games')} to='/games'>Chess.com Games</Link>
            </Menu.Item>
        </Menu>
    )
}