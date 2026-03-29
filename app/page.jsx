import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: 'CaféLog — 한국 감성 카페를 기록하다',
  description: '한국 카페를 기록하고 탐색하는 라이프스타일 앱',
};

const SCREENS = [
  { label: '피드', href: '/feed', desc: '나와 친구들의 카페 기록' },
  { label: '지도 탐색', href: '/map', desc: '목적·테마·음료별 카페 탐색' },
  { label: '기록하기', href: '/record', desc: '방문한 카페를 나만의 기록으로' },
  { label: '캘린더', href: '/calendar', desc: '날짜별로 돌아보는 카페 다이어리' },
  { label: '마이페이지', href: '/mypage', desc: '나의 기록과 저장한 카페' },
];

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: '#080808',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 8,
      }}
    >
      {/* 헤드라인 */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'var(--font-outfit, Outfit)',
            fontWeight: 900,
            fontSize: { xs: '3.5rem', sm: '5.5rem' },
            letterSpacing: '-0.04em',
            color: 'white',
            lineHeight: 1,
            mb: 2,
          }}
        >
          CaféLog
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.125rem' },
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.01em',
            mb: 1,
          }}
        >
          한국 감성 카페를 기록하고 탐색하다
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          iOS · Android · 繁體中文 / 한국어 / English
        </Typography>
      </Box>

      {/* 화면 목록 */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          mb: 8,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {SCREENS.map((screen, i) => (
          <Link
            key={screen.href}
            href={screen.href}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2.5,
                py: 2,
                borderBottom: i < SCREENS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background-color 0.15s',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'white',
                    mb: 0.25,
                  }}
                >
                  {screen.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {screen.desc}
                </Typography>
              </Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '1rem' }}>
                →
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>

      {/* CTA */}
      <Link href="/feed" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            px: 5,
            py: 1.5,
            border: '1px solid rgba(255,255,255,0.3)',
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.15s',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.04)',
            },
          }}
        >
          앱 둘러보기
        </Box>
      </Link>
    </Box>
  );
}
