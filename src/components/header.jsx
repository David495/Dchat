import React, {useState} from 'react';
import { TextAlignStart, SquarePen } from 'lucide-react';
import HeaderStyle from '../components/header.module.css'
import {PanelLeftIcon} from 'lucide-react'
import Logo from '../images/logo_image.png'
const Header = () => {
  const [open, setopen] = useState(false);
  return (
    <>
    <header className={open ? HeaderStyle.aside_active : HeaderStyle.Sidebar}>
        <div className={HeaderStyle.navDiv}>
        <TextAlignStart onClick={()=> setopen(!open)}/>
            <h1>Dchat</h1>
       </div>
        <div>
     <SquarePen/>
      </div>
</header>
  <aside className={open ? HeaderStyle.aside_active : HeaderStyle.Sidebar}>
        <div className={HeaderStyle.aside_content}>
    <img src={Logo} alt="D_Chat_logo" className={HeaderStyle.logo}/>
      <PanelLeftIcon onClick={()=> setopen(!open)} className={HeaderStyle.panelIcon}/>
      </div>
  </aside>
    </>
  )
}

export default Header;