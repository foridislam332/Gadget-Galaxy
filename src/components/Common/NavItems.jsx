import MenuLink from "./MenuLink";

const NavItems = ({ department }) => {
    return (
        <>
            {
                department === 'women' && <>
                    <li>
                        <MenuLink to='/categories/Sale'>
                            Sale
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/ Eastern Wear'>
                            Eastern Wear
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Western Wear'>
                            Western Wear
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Active Were'>
                            Active Were
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Footwear'>
                            Footwear
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Accessories'>
                            Accessories
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Brands'>
                            Brands
                        </MenuLink>
                    </li>
                </>
            }
            {
                department === 'men' && <>
                    <li>
                        <MenuLink to='/categories/Sale'>
                            Sale
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Eastern Wear'>
                            Eastern Wear
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Western Wear'>
                            Western Wear
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Active Were'>
                            Active Were
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Footwear'>
                            Footwear
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Accessories'>
                            Accessories
                        </MenuLink>
                    </li>
                </>
            }
            {
                department === 'kids' && <>
                    <li>
                        <MenuLink to='/categories/Sale'>
                            Sale
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Boys'>
                            Boys
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Girls'>
                            Girls
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Newborn Kids'>
                            Newborn Kids
                        </MenuLink>
                    </li>
                    <li>
                        <MenuLink to='/categories/Accessories'>
                            Accessories
                        </MenuLink>
                    </li>
                </>
            }
        </>
    );
};

export default NavItems;