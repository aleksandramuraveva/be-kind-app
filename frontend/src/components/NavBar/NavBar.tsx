import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/friends">Friends</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;