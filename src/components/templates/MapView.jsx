'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavigationIcon from '@mui/icons-material/Navigation';
import { CAFES } from '@/data/mockData';

// Montage iOS 색상 토큰
const M = {
  labelNormal: 'rgba(0,0,0,0.88)',
  labelAlternative: 'rgba(0,0,0,0.46)',
  labelAssistive: 'rgba(0,0,0,0.28)',
  lineNormal: 'rgba(0,0,0,0.08)',
  bgAlt: '#F2F2F7',
  primary: '#0000FF',
};

const FILTER_CHIPS = [
  { id: 'all', label: '전체' },
  { id: 'p1', label: '작업·공부' },
  { id: 'p2', label: '데이트' },
  { id: 'p3', label: '혼자' },
  { id: 'th1', label: '한옥' },
  { id: 'th2', label: '루프탑' },
  { id: 'd1', label: '스페셜티' },
];

const PINS = [
  { id: 'c1', top: '30%', left: '24%' },
  { id: 'c2', top: '50%', left: '56%' },
  { id: 'c3', top: '20%', left: '62%' },
  { id: 'c4', top: '64%', left: '32%' },
  { id: 'c5', top: '42%', left: '74%' },
  { id: 'c6', top: '22%', left: '42%' },
];

/**
 * MapView
 *
 * iOS MapView와 동일한 레이아웃.
 * 지도 전체화면 + floating 검색 바·필터 칩·위치 버튼·바텀 시트.
 */
export function MapView() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCafeId, setSelectedCafeId] = useState('c1');

  const selectedCafe = CAFES.find((c) => c.id === selectedCafeId);

  return (
    <Box sx={{ position: 'relative', height: '100%', flex: 1, overflow: 'hidden' }}>

      {/* ── 지도 배경 ── */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: '#E8EAE6' }}>
        {/* 도로 (수평) */}
        <Box sx={{ position: 'absolute', top: '43%', left: 0, right: 0, height: 4, bgcolor: '#FFFFFF', opacity: 0.9 }} />
        <Box sx={{ position: 'absolute', top: '62%', left: 0, right: 0, height: 3, bgcolor: '#FFFFFF', opacity: 0.7 }} />
        <Box sx={{ position: 'absolute', top: '24%', left: 0, right: 0, height: 2, bgcolor: '#FFFFFF', opacity: 0.55 }} />
        {/* 도로 (수직) */}
        <Box sx={{ position: 'absolute', left: '38%', top: 0, bottom: 0, width: 4, bgcolor: '#FFFFFF', opacity: 0.9 }} />
        <Box sx={{ position: 'absolute', left: '62%', top: 0, bottom: 0, width: 3, bgcolor: '#FFFFFF', opacity: 0.7 }} />
        <Box sx={{ position: 'absolute', left: '18%', top: 0, bottom: 0, width: 2, bgcolor: '#FFFFFF', opacity: 0.55 }} />
        {/* 공원 */}
        <Box sx={{ position: 'absolute', top: '12%', left: '8%', width: '22%', height: '20%', bgcolor: '#C8DCC0', borderRadius: '6px' }} />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', width: '12%', height: '10%', bgcolor: '#C8DCC0', borderRadius: '4px' }} />
        {/* 한강 */}
        <Box sx={{ position: 'absolute', top: '45%', left: 0, width: '30%', height: '6%', bgcolor: '#B5CDE8', borderRadius: '0 6px 6px 0' }} />
        {/* 건물 블록 */}
        <Box sx={{ position: 'absolute', top: '8%', left: '44%', width: '14%', height: '10%', bgcolor: '#D8D8D2', borderRadius: '4px' }} />
        <Box sx={{ position: 'absolute', top: '28%', left: '8%', width: '22%', height: '12%', bgcolor: '#DDDDD7', borderRadius: '4px' }} />
        <Box sx={{ position: 'absolute', top: '16%', left: '68%', width: '24%', height: '18%', bgcolor: '#D8D8D2', borderRadius: '4px' }} />
        <Box sx={{ position: 'absolute', top: '68%', left: '12%', width: '18%', height: '12%', bgcolor: '#DDDDD7', borderRadius: '4px' }} />
        <Box sx={{ position: 'absolute', top: '70%', left: '66%', width: '26%', height: '14%', bgcolor: '#D8D8D2', borderRadius: '4px' }} />
        <Box sx={{ position: 'absolute', top: '34%', left: '44%', width: '10%', height: '7%', bgcolor: '#DDDDD7', borderRadius: '4px' }} />
      </Box>

      {/* ── 핀 마커 ── */}
      {PINS.map((pin) => {
        const cafe = CAFES.find((c) => c.id === pin.id);
        const isSelected = selectedCafeId === pin.id;
        return (
          <Box
            key={pin.id}
            onClick={() => setSelectedCafeId(pin.id)}
            sx={{
              position: 'absolute',
              top: pin.top,
              left: pin.left,
              transform: 'translate(-50%, -100%)',
              zIndex: 5,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {isSelected && (
              <Box
                sx={{
                  bgcolor: M.primary,
                  color: '#FFFFFF',
                  px: 1.25,
                  py: 0.375,
                  borderRadius: '6px',
                  mb: 0.25,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,255,0.35)',
                }}
              >
                {cafe?.name}
              </Box>
            )}
            <LocationOnIcon
              sx={{
                color: isSelected ? M.primary : 'rgba(0,0,0,0.4)',
                fontSize: isSelected ? 36 : 28,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            />
          </Box>
        );
      })}

      {/* ── 플로팅 검색 바 ── */}
      <Box sx={{ position: 'absolute', top: 12, left: 16, right: 16, zIndex: 10 }}>
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            height: 46,
          }}
        >
          <SearchIcon sx={{ color: M.labelAssistive, fontSize: 20, mr: 1, flexShrink: 0 }} />
          <InputBase
            placeholder="카페 이름 또는 지역으로 검색"
            sx={{
              flex: 1,
              fontSize: '0.875rem',
              color: M.labelNormal,
              '& input::placeholder': { color: M.labelAssistive },
            }}
          />
        </Box>
      </Box>

      {/* ── 플로팅 필터 칩 ── */}
      <Box
        sx={{
          position: 'absolute',
          top: 70,
          left: 0,
          right: 0,
          zIndex: 10,
          px: 2,
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {FILTER_CHIPS.map((chip) => (
          <Box
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            sx={{
              flexShrink: 0,
              px: 1.75,
              py: 0.625,
              borderRadius: '100px',
              bgcolor: activeFilter === chip.id ? M.primary : '#FFFFFF',
              boxShadow: '0 1px 5px rgba(0,0,0,0.14)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.78rem',
                fontWeight: activeFilter === chip.id ? 600 : 400,
                color: activeFilter === chip.id ? '#FFFFFF' : M.labelAlternative,
                whiteSpace: 'nowrap',
                lineHeight: 1.4,
              }}
            >
              {chip.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── 내 위치 버튼 ── */}
      <Box
        sx={{
          position: 'absolute',
          bottom: selectedCafe ? 208 : 24,
          right: 16,
          zIndex: 10,
          width: 44,
          height: 44,
          bgcolor: '#FFFFFF',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
          cursor: 'pointer',
          transition: 'bottom 0.3s',
        }}
      >
        <MyLocationIcon sx={{ color: M.primary, fontSize: 20 }} />
      </Box>

      {/* ── 바텀 시트: 선택된 카페 ── */}
      {selectedCafe && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            bgcolor: '#FFFFFF',
            borderRadius: '20px 20px 0 0',
            p: 2,
            boxShadow: '0 -4px 24px rgba(0,0,0,0.1)',
          }}
        >
          {/* 드래그 핸들 */}
          <Box
            sx={{
              width: 36,
              height: 4,
              bgcolor: M.lineNormal,
              borderRadius: 2,
              mx: 'auto',
              mb: 1.75,
            }}
          />

          <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <Box
              component="img"
              src={selectedCafe.photos[0]}
              alt={selectedCafe.name}
              sx={{ width: 72, height: 72, borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{ fontSize: '0.9rem', fontWeight: 700, color: M.labelNormal, mb: 0.5 }}
              >
                {selectedCafe.name}
              </Typography>
              <Typography noWrap sx={{ fontSize: '0.75rem', color: M.labelAlternative, mb: 0.25 }}>
                {selectedCafe.address}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: M.labelAlternative }}>
                {selectedCafe.hours}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              sx={{
                flex: 1,
                height: 44,
                borderRadius: '12px',
                border: `1px solid ${M.lineNormal}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                cursor: 'pointer',
              }}
            >
              <NavigationIcon sx={{ fontSize: 16, color: M.labelAlternative }} />
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: M.labelAlternative }}>
                길찾기
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                height: 44,
                borderRadius: '12px',
                bgcolor: M.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                저장하기
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
