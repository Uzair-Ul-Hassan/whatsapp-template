import Link from "next/link";

import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm px-3">
      <div className="flex items-center justify-between p-2">
        <Link href="/" className="font-bold italic text-md max-sm:text-sm">
          WhatsApp Mock
        </Link>
        <nav className="flex items-center">
          <Button variant="link" asChild>
            <Link href="/">Templates</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/preview">Preview</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
