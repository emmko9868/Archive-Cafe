'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { RECORDS, CAFES, TAGS, USER } from '@/data/mockData';

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'p1', label: '작업·공부' },
  { id: 'p2', label: '데이트' },
  { id: 'p3', label: '혼자' },
  { id: 'th1', label: '한옥카페' },
  { id: 'th2', label: '루프탑카페' },
];

/**
 * FeedPostCard 컴포넌트
 *
 * iOS FeedView의 FeedPostCard와 동일한 구조.
 * 아바타·닉네임·날짜 → 4:3 사진 → 하트/북마크 → 카페명 → 메모 → #해시태그
 *
 * @param {object} record - Record 데이터 [Required]
 */
function FeedPostCard({ record }) {
  const cafe = CAFES.find((c) => c.id === record.cafeId);
  const recordTags = TAGS.filter((t) => record.tags.includes(t.id));
  const hashTags = recordTags.map((t) => `#${t.label}`).join(' ');

  return (
    <Box>
      {/* 유저 row */}
      <Box
        sx={{
          px: 2,
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            width: 34,
            height: 34,
            bgcolor: '#0000FF',
            fontSize: '0.8rem',
            fontWeight: 700,
            mr: 1.25,
          }}
        >
          {USER.nickname[0]}
        </Avatar>
        <Typography
          sx={{
            flex: 1,
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'rgba(0,0,0,0.87)',
          }}
        >
          {USER.nickname}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', color: 'rgba(0,0,0,0.38)' }}>
          {record.visitDate.replace(/-/g, '.')}
        </Typography>
      </Box>

      {/* 사진 — 4:3 비율 */}
      <Box
        component="img"
        src={record.photos[0]}
        alt={cafe?.name}
        sx={{
          width: '100%',
          aspectRatio: '4/3',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* 액션 row */}
      <Box sx={{ px: 1.5, pt: 1, pb: 0.25, display: 'flex', gap: 0.25 }}>
        <IconButton size="small" sx={{ p: 0.625, color: 'rgba(0,0,0,0.55)' }}>
          <FavoriteBorderIcon sx={{ fontSize: 22 }} />
        </IconButton>
        <IconButton size="small" sx={{ p: 0.625, color: 'rgba(0,0,0,0.55)' }}>
          <BookmarkBorderIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>

      {/* 카페명·메모·해시태그 */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'rgba(0,0,0,0.87)',
            mb: 0.5,
          }}
        >
          {cafe?.name}
        </Typography>
        {record.memo && (
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: 'rgba(0,0,0,0.54)',
              mb: 0.5,
              lineHeight: 1.55,
            }}
          >
            {record.memo}
          </Typography>
        )}
        {hashTags && (
          <Typography
            sx={{
              fontSize: '0.78rem',
              color: '#0000FF',
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {hashTags}
          </Typography>
        )}
      </Box>

      {/* 구분선 */}
      <Box sx={{ height: '1px', bgcolor: 'rgba(0,0,0,0.06)' }} />
    </Box>
  );
}

/**
 * FeedView
 *
 * iOS FeedView와 동일한 레이아웃.
 * TopNavigation + 필터 칩 (수평 스크롤) + FeedPostCard 목록.
 */
export function FeedView() {
  const [activeFilter, setActiveFilter] = useState('all');
  const publicRecords = RECORDS.filter((r) => r.isPublic);

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100%' }}>
      {/* TopNavigation */}
      <Box
        sx={{
          px: 2,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          position: 'sticky',
          top: 0,
          bgcolor: '#FFFFFF',
          zIndex: 10,
        }}
      >
        <Typography
          sx={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'rgba(0,0,0,0.87)',
          }}
        >
          피드
        </Typography>
        <IconButton size="small" sx={{ color: 'rgba(0,0,0,0.55)' }}>
          <NotificationsNoneIcon />
        </IconButton>
      </Box>

      {/* 필터 칩 — 수평 스크롤 */}
      <Box
        sx={{
          px: 2,
          py: 1.25,
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          bgcolor: '#FFFFFF',
          position: 'sticky',
          top: 52,
          zIndex: 9,
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {FILTERS.map((filter) => (
          <Box
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            sx={{
              flexShrink: 0,
              px: 1.75,
              py: 0.625,
              borderRadius: '100px',
              bgcolor: activeFilter === filter.id ? '#0000FF' : 'transparent',
              border: '1px solid',
              borderColor:
                activeFilter === filter.id ? '#0000FF' : 'rgba(0,0,0,0.14)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.78rem',
                fontWeight: activeFilter === filter.id ? 600 : 400,
                color:
                  activeFilter === filter.id ? '#FFFFFF' : 'rgba(0,0,0,0.65)',
                whiteSpace: 'nowrap',
                lineHeight: 1.4,
              }}
            >
              {filter.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 피드 카드 목록 */}
      {publicRecords.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography sx={{ color: 'rgba(0,0,0,0.38)', fontSize: '0.875rem' }}>
            아직 기록이 없어요. 첫 카페를 기록해보세요.
          </Typography>
        </Box>
      ) : (
        publicRecords.map((record) => (
          <FeedPostCard key={record.id} record={record} />
        ))
      )}
    </Box>
  );
}
