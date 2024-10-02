

// import Link from 'next/link';

// const NavBar = () => {
//   return (
//     <nav className="p-4">
//       <ul className="flex justify-center items-center space-x-4 relative">
//         <li className="relative group">
//           <Link href="/" className="text-white px-4 py-2 block relative z-10">
//             Home
//           </Link>
//           <span className="absolute left-0 top-0 w-full h-full bg-blue-500 transform -skew-x-12 group-hover:bg-blue-700 transition duration-300"></span>
//           <i className="absolute left-[-20px] bottom-[-20px] z-[-1] border-[20px] border-transparent border-r-blue-900 animate-edge"></i>
//           <i className="absolute right-[-20px] bottom-[-20px] z-[-1] border-[20px] border-transparent border-l-blue-900 animate-edge"></i>
//         </li>
//         <li className="relative group">
//           <Link href="/friends" className="text-white px-4 py-2 block relative z-10">
//             Friends
//           </Link>
//           <span className="absolute left-0 top-0 w-full h-full bg-blue-500 transform -skew-x-12 group-hover:bg-blue-700 transition duration-300"></span>
//           <i className="absolute left-[-20px] bottom-[-20px] z-[-1] border-[20px] border-transparent border-r-blue-900 animate-edge"></i>
//           <i className="absolute right-[-20px] bottom-[-20px] z-[-1] border-[20px] border-transparent border-l-blue-900 animate-edge"></i>
//         </li>
//         <li className="relative group">
//           <Link href="/profile" className="text-white px-4 py-2 block relative z-10">
//             Profile
//           </Link>
//           <span className="absolute left-0 top-0 w-full h-full bg-blue-500 transform -skew-x-12 group-hover:bg-blue-700 transition duration-300"></span>
//           <i className="absolute left-[-20px] bottom-[-20px] z-[-1] border-[20px] border-transparent border-r-blue-900 animate-edge"></i>
//           <i className="absolute right-[-20px] bottom-[-20px] z-[-1] border-[20px] border-transparent border-l-blue-900 animate-edge"></i>
//         </li>
//         <li className="absolute right-0">
//           <button className="border shadow-md text-white px-4 py-2 rounded hover:opacity-80 transition duration-300">
//             Logout
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;



import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="p-4">
      <ul className="tracking-widest font-light uppercase text-xl flex justify-center items-center space-x-16 relative">
        <li className="relative group ribbon">
          <Link href="/" className="text-white px-6 py-1 block relative z-10">
            Home
          </Link>
          <span className="absolute left-0 top-0 w-full h-full bg-blue-500 transform group-hover:bg-blue-600 transition duration-300"></span>
        </li>

        <li className="relative group ribbon ">
          <Link href="/friends" className="text-white px-6 py-1 block relative z-10">
            Friends
          </Link>
          <span className="absolute left-0 top-0 w-full h-full bg-blue-500 transform group-hover:bg-blue-600 transition duration-300"></span>
        </li>

        <li className="relative group ribbon">
          <Link href="/profile" className="text-white px-6 py-1 block relative z-10">
            Profile
          </Link>
          <span className="absolute left-0 top-0 w-full h-full bg-blue-500 transform group-hover:bg-blue-600 transition duration-300"></span>
        </li>

        <li className="absolute right-0">
          <button className="border shadow-md text-white px-4 py-2 rounded hover:opacity-80 transition duration-300 hover:-translate-y-1">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
