import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { href: '/', label: 'Landing Page' },
  { href: '/journal', label: 'Home' },
  { href: '/history', label: 'Charts' },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-white border-b border-black/10">
        <div className="bg-pink-200 flex justify-between items-center max-w-screen-xl mx-auto p-4">
          <h1 className="text-xl">Dream-AI</h1>
          <UserButton />
        </div>
      </header>
      <nav className="bg-white border-b border-black/10">
        <ul className="flex space-x-4 justify-center">
          {links.map((link) => (
            <li className="hover:bg-pink-300 px-4 py-2" key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="max-w-screen-xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
