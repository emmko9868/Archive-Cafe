import ThemeRegistry from './providers';
import { outfit, pretendard } from './fonts';
import './globals.css';

export const metadata = {
  title: 'CaféLog',
  description: '한국 감성 카페를 기록하고 탐색하는 라이프스타일 앱',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={ `${outfit.variable} ${pretendard.variable}` }>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
