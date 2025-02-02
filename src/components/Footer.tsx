import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <p className="text-lg font-bold"><span className="text-gray-200">neo</span><span className="text-gray-700">Freelance</span></p>
            <p className="text-sm text-muted-foreground">
              Connecting talents with opportunities
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="https://github.com/rapidosaas" target="_blank" className="hover:underline">
              GitHub
            </Link>
            <Link href="/tos" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}