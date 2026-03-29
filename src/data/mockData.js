// CaféLog 목업 데이터

export const TAGS = [
  { id: 'p1', category: 'purpose', label: '작업·공부하기 좋은 카페' },
  { id: 'p2', category: 'purpose', label: '데이트 카페' },
  { id: 'p3', category: 'purpose', label: '혼자 가기 좋은 카페' },
  { id: 'p4', category: 'purpose', label: '이색 체험 카페' },
  { id: 'th1', category: 'theme', label: '한옥 카페' },
  { id: 'th2', category: 'theme', label: '루프탑 카페' },
  { id: 'th3', category: 'theme', label: '북카페' },
  { id: 'th4', category: 'theme', label: '갤러리 카페' },
  { id: 'th5', category: 'theme', label: '식물 카페' },
  { id: 'th6', category: 'theme', label: '애견 동반 카페' },
  { id: 'd1', category: 'drink', label: '스페셜티 커피' },
  { id: 'd2', category: 'drink', label: '시그니처 음료' },
  { id: 'd3', category: 'drink', label: '디저트 특화' },
  { id: 'd4', category: 'drink', label: '논커피' },
];

export const CAFES = [
  {
    id: 'c1',
    name: '테라로사 서울숲점',
    address: '서울 성동구 서울숲2길 32-14',
    coordinates: { lat: 37.544, lng: 127.044 },
    hours: '08:00 - 22:00',
    tags: ['p1', 'p3', 'd1'],
    photos: [
      'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    menus: [
      { id: 'm1', name: '에스프레소', price: 4500, category: '커피', source: 'external', recordId: null },
      { id: 'm2', name: '플랫화이트', price: 6500, category: '커피', source: 'external', recordId: null },
    ],
  },
  {
    id: 'c2',
    name: '풀발코니',
    address: '서울 마포구 와우산로29나길 10',
    coordinates: { lat: 37.551, lng: 126.924 },
    hours: '12:00 - 21:00',
    tags: ['p2', 'th2', 'd2'],
    photos: [
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    menus: [
      { id: 'm3', name: '시그니처 라떼', price: 7500, category: '커피', source: 'external', recordId: null },
      { id: 'm4', name: '레몬에이드', price: 7000, category: '음료', source: 'external', recordId: null },
    ],
  },
  {
    id: 'c3',
    name: '북촌한옥카페 마당',
    address: '서울 종로구 계동길 87',
    coordinates: { lat: 37.583, lng: 126.985 },
    hours: '10:00 - 20:00',
    tags: ['p2', 'th1', 'd4'],
    photos: [
      'https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    menus: [
      { id: 'm5', name: '오미자청', price: 8000, category: '전통음료', source: 'external', recordId: null },
      { id: 'm6', name: '식혜', price: 7000, category: '전통음료', source: 'external', recordId: null },
    ],
  },
  {
    id: 'c4',
    name: '카페 식물원',
    address: '서울 강서구 마곡동로 161',
    coordinates: { lat: 37.558, lng: 126.833 },
    hours: '09:00 - 21:00',
    tags: ['p1', 'p3', 'th5', 'd1'],
    photos: [
      'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    menus: [
      { id: 'm7', name: '아메리카노', price: 5500, category: '커피', source: 'external', recordId: null },
      { id: 'm8', name: '말차라떼', price: 7000, category: '음료', source: 'external', recordId: null },
    ],
  },
  {
    id: 'c5',
    name: '앤트러사이트 한남',
    address: '서울 용산구 독서당로 122',
    coordinates: { lat: 37.534, lng: 127.001 },
    hours: '09:00 - 22:00',
    tags: ['p1', 'th4', 'd1'],
    photos: [
      'https://images.pexels.com/photos/3394125/pexels-photo-3394125.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    menus: [
      { id: 'm9', name: '싱글 오리진 드립', price: 9000, category: '커피', source: 'external', recordId: null },
      { id: 'm10', name: '카푸치노', price: 6500, category: '커피', source: 'external', recordId: null },
    ],
  },
  {
    id: 'c6',
    name: '더 북 소사이어티',
    address: '서울 중구 동호로 249',
    coordinates: { lat: 37.558, lng: 126.991 },
    hours: '11:00 - 21:00',
    tags: ['p1', 'p3', 'th3', 'd4'],
    photos: [
      'https://images.pexels.com/photos/4349329/pexels-photo-4349329.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    menus: [
      { id: 'm11', name: '얼그레이', price: 6000, category: '차', source: 'external', recordId: null },
      { id: 'm12', name: '핫초코', price: 6500, category: '음료', source: 'external', recordId: null },
    ],
  },
];

export const USER = {
  id: 'u1',
  nickname: '카페로거',
  profileImage: '',
  followingIds: ['u2', 'u3'],
  savedCafeIds: ['c2', 'c5'],
};

export const RECORDS = [
  {
    id: 'r1',
    cafeId: 'c1',
    userId: 'u1',
    visitDate: '2026-03-29',
    drinkType: '플랫화이트',
    tags: ['p1', 'd1'],
    photos: [
      'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    memo: '작업하기 딱 좋은 분위기. 커피 퀄리티도 훌륭함.',
    isPublic: true,
  },
  {
    id: 'r2',
    cafeId: 'c2',
    userId: 'u1',
    visitDate: '2026-03-22',
    drinkType: '시그니처 라떼',
    tags: ['p2', 'th2'],
    photos: [
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    memo: '루프탑에서 보는 노을이 정말 예뻤다.',
    isPublic: true,
  },
  {
    id: 'r3',
    cafeId: 'c3',
    userId: 'u1',
    visitDate: '2026-03-15',
    drinkType: '오미자청',
    tags: ['th1', 'd4'],
    photos: [
      'https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    memo: '한옥 마당에서 마시는 전통차, 시간이 멈춘 것 같은 느낌.',
    isPublic: true,
  },
  {
    id: 'r4',
    cafeId: 'c4',
    userId: 'u1',
    visitDate: '2026-03-15',
    drinkType: '아메리카노',
    tags: ['p3', 'th5'],
    photos: [
      'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    memo: '식물들 사이에서 혼자 책 읽기 좋음.',
    isPublic: false,
  },
  {
    id: 'r5',
    cafeId: 'c5',
    userId: 'u1',
    visitDate: '2026-03-08',
    drinkType: '싱글 오리진 드립',
    tags: ['p1', 'th4', 'd1'],
    photos: [
      'https://images.pexels.com/photos/3394125/pexels-photo-3394125.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    memo: '인더스트리얼한 인테리어, 커피 맛은 깊고 묵직함.',
    isPublic: true,
  },
  {
    id: 'r6',
    cafeId: 'c6',
    userId: 'u1',
    visitDate: '2026-03-01',
    drinkType: '얼그레이',
    tags: ['p3', 'th3'],
    photos: [
      'https://images.pexels.com/photos/4349329/pexels-photo-4349329.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    memo: '책 냄새와 차 향이 어우러지는 공간.',
    isPublic: true,
  },
];
