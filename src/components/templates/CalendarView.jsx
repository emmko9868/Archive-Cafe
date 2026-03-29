'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { RECORDS, CAFES, TAGS } from '@/data/mockData';

// Montage iOS 색상 토큰
const M = {
  labelNormal: 'rgba(0,0,0,0.88)',
  labelAlternative: 'rgba(0,0,0,0.46)',
  labelAssistive: 'rgba(0,0,0,0.28)',
  lineNormal: 'rgba(0,0,0,0.08)',
  bgAlt: '#F2F2F7',
  primary: '#0000FF',
  statusNegative: '#FF3B30',
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * CalendarView
 *
 * iOS CalendarView와 동일한 레이아웃.
 * 통계 카드 2개 + 월별 캘린더 + 선택 날짜 기록 목록.
 * 기록 태그는 primaryNormal 텍스트(#해시태그 형식)로 표시.
 */
export function CalendarView() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // 0-indexed: March
  const [selectedDate, setSelectedDate] = useState('2026-03-29');

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const recordsByDate = {};
  RECORDS.forEach((r) => {
    if (!recordsByDate[r.visitDate]) recordsByDate[r.visitDate] = [];
    recordsByDate[r.visitDate].push(r);
  });

  const selectedRecords = recordsByDate[selectedDate] || [];

  const handlePrevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const thisMonthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const thisMonthCount = RECORDS.filter((r) => r.visitDate.startsWith(thisMonthKey)).length;

  const drinkCount = {};
  RECORDS.forEach((r) => { drinkCount[r.drinkType] = (drinkCount[r.drinkType] || 0) + 1; });
  const favDrink = Object.entries(drinkCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100%', pb: 2 }}>
      {/* TopNavigation */}
      <Box
        sx={{
          px: 2,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          borderBottom: `1px solid ${M.lineNormal}`,
          position: 'sticky',
          top: 0,
          bgcolor: '#FFFFFF',
          zIndex: 10,
        }}
      >
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: M.labelNormal }}>
          나의 카페 다이어리
        </Typography>
      </Box>

      {/* ── 통계 카드 row ── */}
      <Box sx={{ px: 2, pt: 2, display: 'flex', gap: 1.5, mb: 1.5 }}>
        <Box sx={{ flex: 1, bgcolor: M.bgAlt, borderRadius: '12px', p: 1.75 }}>
          <Box sx={{ color: M.primary, mb: 0.75 }}>
            <EventNoteIcon sx={{ fontSize: 22 }} />
          </Box>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: M.labelNormal, lineHeight: 1, mb: 0.375 }}>
            {thisMonthCount}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: M.labelAlternative }}>
            이달 방문
          </Typography>
        </Box>

        <Box sx={{ flex: 1, bgcolor: M.bgAlt, borderRadius: '12px', p: 1.75 }}>
          <Box sx={{ color: M.primary, mb: 0.75 }}>
            <LocalCafeIcon sx={{ fontSize: 22 }} />
          </Box>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: M.labelNormal, lineHeight: 1.2, mb: 0.375 }}>
            {favDrink}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: M.labelAlternative }}>
            즐겨찾기 음료
          </Typography>
        </Box>
      </Box>

      {/* ── 캘린더 ── */}
      <Box sx={{ px: 2 }}>
        {/* 월 네비게이션 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <IconButton size="small" onClick={handlePrevMonth} sx={{ color: M.labelAlternative }}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: M.labelNormal }}>
            {year}년 {month + 1}월
          </Typography>
          <IconButton size="small" onClick={handleNextMonth} sx={{ color: M.labelAlternative }}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* 요일 헤더 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 0.5 }}>
          {WEEKDAYS.map((d, i) => (
            <Typography
              key={d}
              align="center"
              sx={{
                fontSize: '0.72rem',
                fontWeight: 600,
                py: 0.5,
                color: i === 0 ? M.statusNegative : i === 6 ? M.primary : M.labelAlternative,
              }}
            >
              {d}
            </Typography>
          ))}
        </Box>

        {/* 날짜 그리드 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {cells.map((day, idx) => {
            if (!day) return <Box key={`e${idx}`} sx={{ py: 0.5 }} />;

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasRecord = !!recordsByDate[dateStr];
            const isSelected = dateStr === selectedDate;
            const dayOfWeek = (firstDay + day - 1) % 7;

            return (
              <Box
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5, cursor: 'pointer' }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: isSelected ? M.primary : 'transparent',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 700 : 400,
                      lineHeight: 1,
                      color: isSelected
                        ? '#FFFFFF'
                        : dayOfWeek === 0
                        ? M.statusNegative
                        : dayOfWeek === 6
                        ? M.primary
                        : M.labelNormal,
                    }}
                  >
                    {day}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    mt: '2px',
                    borderRadius: '50%',
                    bgcolor: hasRecord
                      ? isSelected ? 'rgba(255,255,255,0.6)' : M.primary
                      : 'transparent',
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── 선택 날짜 기록 ── */}
      <Box sx={{ mt: 2, mx: 2, pt: 2, borderTop: `1px solid ${M.lineNormal}` }}>
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: M.labelAlternative, mb: 1.25 }}>
          {selectedDate.replace(/-/g, '.')}
        </Typography>

        {selectedRecords.length === 0 ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.875rem', color: M.labelAssistive }}>
              이 날의 기록이 없어요.
            </Typography>
          </Box>
        ) : (
          selectedRecords.map((record) => {
            const cafe = CAFES.find((c) => c.id === record.cafeId);
            const recordTags = TAGS.filter((t) => record.tags.includes(t.id));

            return (
              <Box
                key={record.id}
                sx={{ display: 'flex', gap: 1.5, py: 1.5, borderBottom: `1px solid ${M.lineNormal}` }}
              >
                <Box
                  component="img"
                  src={record.photos[0]}
                  alt={cafe?.name}
                  sx={{ width: 48, height: 48, borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: M.labelNormal, mb: 0.25 }}>
                    {cafe?.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: M.labelAlternative, mb: 0.375 }}>
                    {record.drinkType}
                  </Typography>
                  {recordTags.length > 0 && (
                    <Typography sx={{ fontSize: '0.72rem', color: M.primary, fontWeight: 500 }}>
                      {recordTags.map((t) => `#${t.label}`).join(' ')}
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}
