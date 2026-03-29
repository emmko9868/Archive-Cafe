'use client';
import Box from '@mui/material/Box';
import { BottomNav } from '@/components/navigation/BottomNav';

/**
 * MobileShell 컴포넌트
 *
 * CaféLog 앱 화면용 모바일 프레임.
 * 데스크탑에서는 iPhone 15 Pro 스타일 목업 프레임으로 중앙 정렬.
 * 모바일에서는 100dvh 전체 화면.
 *
 * @param {node} children - 화면 콘텐츠 [Required]
 *
 * Example usage:
 * <MobileShell><FeedView /></MobileShell>
 */
export function MobileShell({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: { xs: 'background.paper', sm: '#0D0D0F' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: { xs: 'flex-start', sm: 'center' },
        py: { xs: 0, sm: 4 },
      }}
    >
      {/* 폰 프레임 + 버튼 컨테이너 */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>

        {/* iPhone 외곽 프레임 (데스크탑 전용) */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'absolute',
            inset: '-13px',
            borderRadius: '56px',
            border: '13px solid #2C2C2E',
            boxShadow: [
              'inset 0 0 0 1px rgba(255,255,255,0.07)',
              '0 0 0 1px rgba(0,0,0,0.9)',
              '0 40px 100px rgba(0,0,0,0.75)',
              '0 0 60px rgba(0,0,255,0.04)',
            ].join(', '),
            pointerEvents: 'none',
            zIndex: 30,
          }}
        />

        {/* 좌측 버튼: 무음 스위치 */}
        <Box sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute', left: -17, top: 104,
          width: 4, height: 28,
          bgcolor: '#232325', borderRadius: '2px 0 0 2px', zIndex: 31,
        }} />
        {/* 좌측 버튼: 볼륨 업 */}
        <Box sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute', left: -17, top: 144,
          width: 4, height: 62,
          bgcolor: '#232325', borderRadius: '2px 0 0 2px', zIndex: 31,
        }} />
        {/* 좌측 버튼: 볼륨 다운 */}
        <Box sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute', left: -17, top: 218,
          width: 4, height: 62,
          bgcolor: '#232325', borderRadius: '2px 0 0 2px', zIndex: 31,
        }} />
        {/* 우측 버튼: 전원 */}
        <Box sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute', right: -17, top: 154,
          width: 4, height: 92,
          bgcolor: '#232325', borderRadius: '0 2px 2px 0', zIndex: 31,
        }} />

        {/* 폰 스크린 */}
        <Box
          sx={{
            width: { xs: '100vw', sm: 393 },
            height: { xs: '100dvh', sm: 'min(852px, 88dvh)' },
            bgcolor: '#FFFFFF',
            borderRadius: { xs: 0, sm: '43px' },
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Dynamic Island (데스크탑 전용) */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
              pt: '12px',
              pb: '6px',
              flexShrink: 0,
              bgcolor: '#FFFFFF',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <Box
              sx={{
                width: 126,
                height: 34,
                bgcolor: '#000000',
                borderRadius: '20px',
              }}
            />
          </Box>

          {/* 스크롤 콘텐츠 영역 */}
          <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {children}
          </Box>

          {/* 하단 탭 바 */}
          <BottomNav />

          {/* Home Indicator (데스크탑 전용) */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              height: 20,
              bgcolor: '#FFFFFF',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 134,
                height: 5,
                bgcolor: 'rgba(0,0,0,0.18)',
                borderRadius: '3px',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
