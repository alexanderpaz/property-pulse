import '@/assets/styles/global.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
};

export const metadata = {
    charSet: 'UTF-8',
    title: 'PropertyPulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
    return (
        <html lang="en">
        <body>
        <header>
            <Navbar />
        </header>
        <main>
            {children}
        </main>
        <Footer />
        </body>
        </html>

)}

export default MainLayout