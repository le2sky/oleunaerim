module.exports = async function mountainsGenerator() {
  const REGION_BASE = require('./region_base');
  const axios = require('axios');
  const fs = require('fs-extra');
  const path = require('path');
  require('dotenv').config();
  const targetPath = path.join(__dirname, '..', '..');
  const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
  const updatedAt = Date.now();
  let totalDataCount = 0;
  const resultMap = new Map();
  const uniquenessMap = new Map();
  const regionKeys = Object.keys(REGION_BASE);
  const getTargetPath = (region) => `${targetPath}/public/data/result/${region}.json`;
  const TARGET_DIR = `${targetPath}/public/data/result`;
  const LOCATION_PATH = `${targetPath}/public/data/result/location.json`;
  const RESULT_PATH = `${targetPath}/public/data/result/total_count.txt`;
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

  // 검색어, 카테고리 //
  const QUERY = '산';
  const CATEGORY_NAME = '여행 > 관광,명소 > 산';

  // ex) ['서울특별시 종로구', ...];
  const REGION = Object.entries(REGION_BASE).reduce((acc, [k, v]) => [...acc, ...v.map((u) => `${k} ${u}`)], []);

  const kakaoSearchAPI = ({ query, page = 1 }) =>
    axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
      params: {
        query,
        page,
      },
      timeout: 10000,
    });

  async function* asyncAPI(query, total_pages) {
    for (let i = 1; i <= total_pages; i++) {
      const { data } = await kakaoSearchAPI({ query, page: i });
      await sleep(300);
      yield data;
    }
  }

  const fetchRegionData = async () => {
    for (const region of REGION) {
      const query = `${region} ${QUERY}`;
      const regionKey = region.split(' ')[0];
      const targetRegionArray = resultMap.get(regionKey);

      const {
        data: { meta },
      } = await kakaoSearchAPI({ query });

      const { pageable_count, total_count } = meta;

      if (pageable_count * 15 < total_count) {
        throw new Error(`${region} 지역 정보는 더 상세한 검색이 필요합니다`);
      }

      for await (const { documents } of asyncAPI(query, pageable_count)) {
        documents.forEach((v) => {
          const isDuplicatePresent = uniquenessMap.has(v.id);
          if (isDuplicatePresent) return;
          uniquenessMap.set(v.id, true);

          const isCategoryMatch = v.category_name !== CATEGORY_NAME;
          if (isCategoryMatch) return;

          targetRegionArray.push(v);
        });
      }

      console.log(`${region} 지역 데이터를 성공적으로 생성 하였습니다.`);
    }
  };

  const writeRegionData = () => {
    for (const regionKey of regionKeys) {
      const regionResultArray = resultMap.get(regionKey);

      totalDataCount += regionResultArray.length;

      fs.writeFileSync(getTargetPath(regionKey), JSON.stringify(regionResultArray));
    }
  };

  const writeResult = () => {
    const endAt = new Date().getTime();
    fs.writeFileSync(RESULT_PATH, `totalDataCount : ${totalDataCount} time: ${(endAt - updatedAt) / 1000}`);
    fs.writeFileSync(LOCATION_PATH, JSON.stringify(REGION_BASE));
  };

  async function excute() {
    if (!fs.existsSync(TARGET_DIR)) {
      fs.mkdirSync(TARGET_DIR);
    }

    for (const regionKey of regionKeys) {
      resultMap.set(regionKey, []);
    }

    try {
      await fetchRegionData();

      writeRegionData();

      writeResult();
      console.log('모든 데이터를 성공적으로 생성 하였습니다');
    } catch (error) {
      console.warn('전체 데이터를 생성하는 중 문제가 발생 했습니다', error);
      fs.rmdirSync(TARGET_DIR, { recursive: true });
    }
  }

  excute();
};
