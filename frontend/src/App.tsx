import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {IntlProvider} from 'react-intl'
import {BrowserRouter} from 'react-router-dom'
import {Sidebar} from "@components/layout/Sidebar.tsx";
import {Header} from "@components/layout/Header.tsx";
import {Main} from "@components/layout/Main.tsx";
import {defaultLocale, messages} from "@i18n";

const queryClient = new QueryClient()

function App() {
  return (
    <IntlProvider locale={defaultLocale} messages={messages[defaultLocale]}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div className='pisces-layout'>
            <Sidebar/>
            <Main/>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </IntlProvider>
  )
}

export default App
