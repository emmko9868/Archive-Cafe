'use client';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GridViewIcon from '@mui/icons-material/GridView';
import ExploreIcon from '@mui/icons-material/Explore';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddIcon from '@mui/icons-material/Add';

/**
 * BottomNav 컴포넌트
 *
 * iOS CenterTabOverlay 스타일 하단 탭 내비게이션.
 * 4개 탭 + 중앙 원형 기록하기 버튼.
 * 탭 순서: 피드 | 지도 | [+] | 캘린더 | MY
 *
 * Example usage:
 * <BottomNav />
 */

const LEFT_TABS = [
  { label: '피드', value: '/feed', Icon: GridViewIcon },
  { label: '지도', value: '/map', Icon: ExploreIcon },
];

const RIGHT_TABS = [
  { label: '캘린더', value: '/calendar', Icon: EventNoteIcon },
  { label: 'MY', value: '/mypage', Icon: PersonOutlineIcon },
];

function TabItem({ label, value, Icon, pathname, router }) {
  const isActive = pathname === value;
  return (
    <Box
      onClick={() => router.push(value)}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        cursor: 'pointer',
        py: 0.75,
        color: isActive ? '#0000FF' : 'rgba(0,0,0,0.35)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <Icon sx={{ fontSize: 24 }} />
      <Typography
        sx={{
          fontSize: '0.6rem',
          fontWeight: isActive ? 700 : 500,
          lineHeight: 1,
          color: 'inherit',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box sx={{ position: 'relative', flexShrink: 0 }}>
      {/* 탭 바 */}
      <Box
        sx={{
          display: 'flex',
          height: 58,
          bgcolor: '#FFFFFF',
          borderTop: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        {LEFT_TABS.map((tab) => (
          <TabItem key={tab.value} {...tab} pathname={pathname} router={router} />
        ))}

        {/* 중앙 버튼 자리 (빈 공간) */}
        <Box sx={{ flex: 1 }} />

        {RIGHT_TABS.map((tab) => (
          <TabItem key={tab.value} {...tab} pathname={pathname} router={router} />
        ))}
      </Box>

      {/* 중앙 + 버튼 (탭 바 위로 떠 있음) */}
      <Box
        onClick={() => router.push('/record')}
        sx={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: '#0000FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,255,0.35)',
          zIndex: 10,
          WebkitTapHighlightColor: 'transparent',
          transition: 'transform 0.1s, box-shadow 0.1s',
          '&:active': {
            transform: 'translateX(-50%) scale(0.94)',
            boxShadow: '0 2px 8px rgba(0,0,255,0.25)',
          },
        }}
      >
        <AddIcon sx={{ color: '#FFFFFF', fontSize: 26 }} />
      </Box>
    </Box>
  );
}
