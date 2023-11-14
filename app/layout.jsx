import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "BacardiClub",
    description: "Rummy Tourmanent Management",
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <head>
            <link rel="icon" href="assets/icons/card-joker.svg" />
        </head>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <header className='w-full'>
                    <Nav />
                </header>
                
                <main className='app flex-1'>
                    { children }
                </main>

                <footer className="mt-8 text-center text-xs text-white bg-black p-3">
                    Developed by {` `}
                    <a
                        href="http://josemolinaresume.com/"
                        target="_Blank"
                        className="text-yellow-700 underline"
                    >
                        Jose Molina
                    </a>
                    {` `}© 2023 Copyright. Beta V 0.1.
                </footer>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
