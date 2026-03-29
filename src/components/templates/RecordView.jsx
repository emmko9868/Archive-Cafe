'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import SearchIcon from '@mui/icons-material/Search';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { TAGS } from '@/data/mockData';

// iOS RecordView DrinkType enum 기준
const DRINK_TYPES = [
  '에스프레소',
  '라떼',
  '시그니처',
  '논커피',
  '디저트',
];

const PURPOSE_TAGS = TAGS.filter((t) => t.category === 'purpose');
const THEME_TAGS = TAGS.filter((t) => t.category === 'theme');

/**
 * RecordView
 *
 * iOS RecordView와 동일한 레이아웃.
 * 캡슐 검색 바 → 사진 그리드(4슬롯) → 음료 칩 → 태그 칩 → 방문 날짜 → 메모 → 공개 설정 → 저장하기.
 */
export function RecordView() {
  const [selectedDrink, setSelectedDrink] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [memo, setMemo] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const toggleTag = (id) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const allTagGroups = [
    { label: '목적별', tags: PURPOSE_TAGS },
    { label: '테마별', tags: THEME_TAGS },
  ];

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* TopNavigation */}
      <Box
        sx={{
          px: 2,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          position: 'sticky',
          top: 0,
          bgcolor: '#FFFFFF',
          zIndex: 10,
        }}
      >
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(0,0,0,0.87)' }}>
          카페 기록하기
        </Typography>
      </Box>

      <Box sx={{ flex: 1, pb: 2 }}>
        {/* ── 카페 검색 (캡슐형) ── */}
        <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#F5F5F7',
              borderRadius: '100px',
              px: 1.75,
              height: 46,
            }}
          >
            <SearchIcon sx={{ color: 'rgba(0,0,0,0.35)', fontSize: 20, mr: 1, flexShrink: 0 }} />
            <InputBase
              placeholder="어떤 카페를 방문했나요?"
              sx={{
                flex: 1,
                fontSize: '0.875rem',
                color: 'rgba(0,0,0,0.87)',
                '& input::placeholder': { color: 'rgba(0,0,0,0.35)' },
              }}
            />
          </Box>
        </Box>

        {/* ── 사진 그리드 (2×2, 4슬롯) ── */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  aspectRatio: '1',
                  bgcolor: '#F5F5F7',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(0,0,0,0.28)',
                  border: i === 0 ? '1px dashed rgba(0,0,0,0.18)' : 'none',
                }}
              >
                {i === 0 && (
                  <>
                    <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 22, mb: 0.25 }} />
                    <Typography sx={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.35)' }}>
                      추가
                    </Typography>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── 음료 종류 ── */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'rgba(0,0,0,0.55)',
              mb: 1,
            }}
          >
            어떤 음료를 마셨나요?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.875 }}>
            {DRINK_TYPES.map((drink) => (
              <Box
                key={drink}
                onClick={() => setSelectedDrink(drink === selectedDrink ? '' : drink)}
                sx={{
                  px: 1.75,
                  py: 0.625,
                  borderRadius: '100px',
                  bgcolor: selectedDrink === drink ? '#0000FF' : 'transparent',
                  border: '1px solid',
                  borderColor: selectedDrink === drink ? '#0000FF' : 'rgba(0,0,0,0.14)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: selectedDrink === drink ? 600 : 400,
                    color: selectedDrink === drink ? '#FFFFFF' : 'rgba(0,0,0,0.65)',
                    lineHeight: 1.4,
                  }}
                >
                  {drink}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── 태그 선택 ── */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'rgba(0,0,0,0.55)',
              mb: 1,
            }}
          >
            이 카페는 어떤 곳인가요?
          </Typography>
          {allTagGroups.map((group) => (
            <Box key={group.label} sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  color: 'rgba(0,0,0,0.38)',
                  mb: 0.75,
                }}
              >
                {group.label}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {group.tags.map((tag) => (
                  <Box
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '100px',
                      bgcolor: selectedTags.includes(tag.id) ? '#0000FF' : 'transparent',
                      border: '1px solid',
                      borderColor: selectedTags.includes(tag.id) ? '#0000FF' : 'rgba(0,0,0,0.14)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: selectedTags.includes(tag.id) ? 600 : 400,
                        color: selectedTags.includes(tag.id) ? '#FFFFFF' : 'rgba(0,0,0,0.65)',
                        lineHeight: 1.4,
                      }}
                    >
                      {tag.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ── 방문 날짜 (alt bg row) ── */}
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Box
            sx={{
              bgcolor: '#F5F5F7',
              borderRadius: '12px',
              px: 2,
              height: 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 18, color: '#0000FF' }} />
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(0,0,0,0.87)' }}>
                방문 날짜
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.875rem', color: 'rgba(0,0,0,0.46)' }}>
              2026. 03. 29
            </Typography>
          </Box>
        </Box>

        {/* ── 메모 ── */}
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Box
            sx={{
              bgcolor: '#F5F5F7',
              borderRadius: '12px',
              p: 1.5,
              minHeight: 80,
            }}
          >
            <InputBase
              multiline
              minRows={3}
              placeholder="한 줄 메모 (선택)"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              sx={{
                width: '100%',
                fontSize: '0.875rem',
                color: 'rgba(0,0,0,0.87)',
                '& textarea::placeholder': { color: 'rgba(0,0,0,0.35)' },
                alignItems: 'flex-start',
              }}
            />
          </Box>
        </Box>

        {/* ── 공개 설정 (alt bg row) ── */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Box
            sx={{
              bgcolor: '#F5F5F7',
              borderRadius: '12px',
              px: 2,
              height: 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(0,0,0,0.87)' }}>
              공개 설정
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  color: isPublic ? '#0000FF' : 'rgba(0,0,0,0.38)',
                  fontWeight: isPublic ? 600 : 400,
                }}
              >
                {isPublic ? '전체 공개' : '나만 보기'}
              </Typography>
              <Switch
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                size="small"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#0000FF' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#0000FF' },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── ActionArea: 저장하기 버튼 ── */}
      <Box
        sx={{
          px: 2,
          pb: 2,
          pt: 1,
          bgcolor: '#FFFFFF',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          flexShrink: 0,
        }}
      >
        <Box
          onClick={() => setSnackOpen(true)}
          sx={{
            height: 52,
            borderRadius: '12px',
            bgcolor: '#0000FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'opacity 0.15s',
            '&:active': { opacity: 0.85 },
          }}
        >
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>
            저장하기
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleOutlineIcon fontSize="small" />
            기록이 저장되었습니다
          </Box>
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
}
