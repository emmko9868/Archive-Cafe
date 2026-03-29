'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { USER, RECORDS, CAFES } from '@/data/mockData';

// Montage iOS 색상 토큰
const M = {
  labelNormal: 'rgba(0,0,0,0.88)',
  labelAlternative: 'rgba(0,0,0,0.46)',
  labelAssistive: 'rgba(0,0,0,0.28)',
  lineNormal: 'rgba(0,0,0,0.08)',
  bgAlt: '#F2F2F7',
  primary: '#0000FF',
};

const TABS = ['내 기록', '저장한 카페'];

/**
 * MyPageView
 *
 * iOS ProfileView와 동일한 레이아웃.
 * 아바타·닉네임·기록/팔로잉/팔로워 row → 통계 row (alt bg) → SegmentedControl → 사진 그리드 or 저장 카페 목록.
 */
export function MyPageView() {
  const [activeTab, setActiveTab] = useState(0);
  const savedCafes = CAFES.filter((c) => USER.savedCafeIds.includes(c.id));

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100%', pb: 2 }}>
      {/* TopNavigation */}
      <Box
        sx={{
          px: 2,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${M.lineNormal}`,
          position: 'sticky',
          top: 0,
          bgcolor: '#FFFFFF',
          zIndex: 10,
        }}
      >
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: M.labelNormal }}>
          마이페이지
        </Typography>
        <SettingsOutlinedIcon sx={{ fontSize: 22, color: M.labelAlternative, cursor: 'pointer' }} />
      </Box>

      {/* ── 프로필 헤더 ── */}
      <Box sx={{ px: 2, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: M.primary,
            fontSize: '1.5rem',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {USER.nickname[0]}
        </Avatar>

        <Box sx={{ flex: 1, display: 'flex', gap: 3 }}>
          {[
            { label: '기록', value: RECORDS.length },
            { label: '팔로잉', value: USER.followingIds.length },
            { label: '팔로워', value: 24 },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Typography
                sx={{ fontSize: '1rem', fontWeight: 700, color: M.labelNormal, lineHeight: 1 }}
              >
                {stat.value}
              </Typography>
              <Typography sx={{ fontSize: '0.68rem', color: M.labelAlternative, mt: 0.375 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 닉네임 */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: M.labelNormal }}>
          {USER.nickname}
        </Typography>
      </Box>

      {/* ── 통계 row (alt bg) ── */}
      <Box
        sx={{
          mx: 2,
          mb: 2,
          bgcolor: M.bgAlt,
          borderRadius: '12px',
          display: 'flex',
        }}
      >
        {[
          { label: '방문한 카페', value: RECORDS.length },
          { label: '선호 음료', value: '말차라떼' },
          { label: '선호 테마', value: '한옥' },
        ].map((stat, i) => (
          <Box
            key={stat.label}
            sx={{
              flex: 1,
              py: 1.5,
              px: 0.5,
              textAlign: 'center',
              borderRight: i < 2 ? `1px solid ${M.lineNormal}` : 'none',
            }}
          >
            <Typography
              sx={{ fontSize: '1rem', fontWeight: 700, color: M.primary, lineHeight: 1, mb: 0.375 }}
            >
              {stat.value}
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: M.labelAlternative }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── SegmentedControl ── */}
      <Box sx={{ px: 2, mb: 0 }}>
        <Box
          sx={{
            display: 'flex',
            bgcolor: M.bgAlt,
            borderRadius: '10px',
            p: '3px',
          }}
        >
          {TABS.map((tab, i) => (
            <Box
              key={tab}
              onClick={() => setActiveTab(i)}
              sx={{
                flex: 1,
                textAlign: 'center',
                py: 0.75,
                borderRadius: '8px',
                bgcolor: activeTab === i ? '#FFFFFF' : 'transparent',
                boxShadow: activeTab === i ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.18s',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: activeTab === i ? 700 : 500,
                  color: activeTab === i ? M.labelNormal : M.labelAlternative,
                }}
              >
                {tab}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── 내 기록: 3열 사진 그리드 ── */}
      {activeTab === 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            mt: '2px',
          }}
        >
          {RECORDS.map((record) => (
            <Box
              key={record.id}
              component="img"
              src={record.photos[0]}
              alt=""
              sx={{
                width: '100%',
                aspectRatio: '1',
                objectFit: 'cover',
                display: 'block',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      )}

      {/* ── 저장한 카페 목록 ── */}
      {activeTab === 1 && (
        <Box sx={{ mt: 1 }}>
          {savedCafes.length === 0 ? (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.875rem', color: M.labelAssistive }}>
                저장한 카페가 없어요.
              </Typography>
            </Box>
          ) : (
            savedCafes.map((cafe) => (
              <Box
                key={cafe.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  borderBottom: `1px solid ${M.lineNormal}`,
                  cursor: 'pointer',
                }}
              >
                <Box
                  component="img"
                  src={cafe.photos[0]}
                  alt={cafe.name}
                  sx={{ width: 56, height: 56, borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: '0.875rem', fontWeight: 700, color: M.labelNormal, mb: 0.25 }}
                    noWrap
                  >
                    {cafe.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.375 }}>
                    <LocationOnIcon sx={{ fontSize: 12, color: M.labelAssistive }} />
                    <Typography noWrap sx={{ fontSize: '0.72rem', color: M.labelAlternative }}>
                      {cafe.address}
                    </Typography>
                  </Box>
                </Box>
                <ChevronRightIcon sx={{ fontSize: 18, color: M.labelAssistive, flexShrink: 0 }} />
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
}
