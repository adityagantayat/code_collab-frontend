export const Footer = () => {
    return (
        <footer className="footer footer-center bg-base-300/60 backdrop-blur-md border-t border-base-content/10 text-base-content/70 py-6 px-4 mt-auto relative z-10">
            <aside className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-base-content/90 tracking-wide">🧑🏻‍💻 Code Collab</span>
                <span className="hidden sm:inline text-base-content/30">•</span>
                <p>Crafted for developers to connect, share & build together.</p>
                <span className="hidden sm:inline text-base-content/30">•</span>
                <p className="text-base-content/50">© {new Date().getFullYear()} Aditya Gantayat. All rights reserved.</p>
            </aside>
        </footer>
    );
};