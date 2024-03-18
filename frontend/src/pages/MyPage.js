import { useCallback, useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Radar, Doughnut, Bar } from 'react-chartjs-2';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/MyPage.css'
import axios from 'axios'
import Gallery from '../components/ModalGallery'
import styled from 'styled-components';
import { Cookies } from 'react-cookie';




const MyPage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  ChartJS.register(CategoryScale, RadialLinearScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Filler, Title, Tooltip, Legend);
  //웩슬러 정보
  const [wchslerInfo, setWchslerInfo] = useState({
    lang: 0,
    pr: 0,
    wm: 0,
    ps: 0,
    iq: 0
  })
  //아이 정보
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: 0
  })
  //학습 날짜
  const [pDate, setPDate] = useState(1);
  //학습 레벨
  const [level, setLevel] = useState(1);
  //학습 점수 종합 리스트
  const [practiceList, setPracticeList] = useState([]);
  //학습 점수 리스트
  const [scoreList, setScoreList] = useState([]);
  //chart 전환
  const [chartChange, setChartChange] = useState("날짜별 발음");




  //문장 반복말하기
  const pronunciationScore = () => {
    axios.get(`http://35.216.81.26:8000/pronunciation/info/score/${pDate}/${level}`, {
      headers: {
        "Content-Type": 'application/json',
        Authorization: cookies.get('token')
      }
    })
      .then((res) => {
        if (pDate === 1) {
          let score = [];
          let date = 0;
          let min = 0;
          let max = 0.0;
          let num = 0.0;
          let sum = 0.0;
          res.data.response.forEach((item, index) => {
            //
            num += 1;
            if (min > item.score || min == 0) {
              min = item.score;
            }
            if (max < item.data || max == 0) {
              max = item.score;
            }
            sum += item.score;
            if (item.date !== date || index + 1 == res.data.response.length) {
              if (date != 0) {
                score.push({
                  title: "문장 반복 말하기",
                  date: date,
                  max: Math.ceil(max * 20),
                  min: Math.ceil(min * 20),
                  avg: Math.ceil((sum * 20) / num)
                })
              }
              date = item.date;
              num = 0;
              min = 0.0;
              max = 0.0;
              sum = 0.0;
            }
          });
          setPracticeList(score);
        } else {
          setScoreList(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    axios.get(`http://35.216.81.26:8000/member/parents/info`, {
      headers: {
        "Content-Type": 'application/json',
        Authorization: cookies.get('token')
      }
    })
      .then((res) => {
        const date = new Date();
        const age = date.getFullYear() - res.data.response.birth.slice(0, 4) + 1;
        setUserInfo({
          name: res.data.response.name,
          age: age
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const patternScore = () => {
    axios.get(`http://35.216.81.26:8000/pattern/${level}/${pDate}`, {
      headers: {
        "Content-Type": 'application/json',
        Authorization: cookies.get('token')
      }
    })
      .then((res) => {
        if (pDate === 1) {
          let score = [];
          let date = 0;
          let min = 0;
          let max = 0.0;
          let num = 0.0;
          let sum = 0.0;
          res.data.response.forEach((item, index) => {
            //
            num += 1;
            if (min > item.time || min == 0) {
              min = item.time;
            }
            if (max < item.time || max == 0) {
              max = item.time;
            }
            sum += parseInt(item.time);
            if (item.date !== date || index + 1 == res.data.response.length) {
              if (date != 0) {
                score.push({
                  title: "패턴 그리기",
                  date: date.slice(0, 10),
                  max: max,
                  min: min,
                  avg: Math.ceil(sum / num)
                })
              }
              date = item.date;
              num = 0;
              min = 0.0;
              max = 0.0;
              sum = 0.0;
            }
          });
          setPracticeList(score);
        } else {
          setScoreList(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (chartChange === '날짜별 패턴' || chartChange === '패턴') {
      patternScore();
    } else {
      pronunciationScore();
    }
  }, [pDate, chartChange])
  useEffect(() => {
    setPDate(1);

    setTimeout(() => {
      if (chartChange === '날짜별 패턴' || chartChange === '패턴') {
        patternScore();
      } else {
        pronunciationScore();
      }
    }, 150)
  }, [level, chartChange])


  //웩슬러 정보 불러오기
  useEffect(() => {
    if(cookies.get('token') === undefined){
      navigate('/login');
    }
    axios.get(`http://35.216.81.26:8000/wechsler/info`, {
      headers: {
        "Content-Type": 'application/json',
        Authorization: cookies.get('token')
      }
    })
      .then((res) => {
        if (res.data.response !== undefined) {
          setWchslerInfo(res.data.response);

        }
      })
      .catch((err) => {
        console.log(err);
      })

  }, [])


  //웩슬러 언어 그래프
  const [wchslerData1, setWechslerData1] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [160 - wchslerInfo.lang, wchslerInfo.lang],
        backgroundColor: ['rgba(	173, 181, 189, 0.2)', 'rgba(	128, 0, 128, 0.2)'],
        borderColor: ['rgba(	173, 181, 189, 1)', 'rgba(	128, 0, 128, 1)'],
        borderWidth: 1,
      },
    ],
  })
  //웩슬러 지각추론 그래프
  const [wchslerData2, setWechslerData2] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [160 - wchslerInfo.pr, wchslerInfo.pr],
        backgroundColor: ['rgba(	173, 181, 189, 0.2)', 'rgba(0, 128, 47, 0.2)'],
        borderColor: ['rgba(	173, 181, 189, 1)', 'rgba(0, 128, 47, 1)'],
        borderWidth: 1,
      },
    ],
  })
  //웩슬러 작업기억 그래프
  const [wchslerData3, setWechslerData3] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [160 - wchslerInfo.wm, wchslerInfo.wm],
        backgroundColor: ['rgba(	173, 181, 189, 0.2)', 'rgba(15, 0, 128, 0.2)'],
        borderColor: ['rgba(	173, 181, 189, 1)', 'rgba(15, 0, 128, 1)'],
        borderWidth: 1,
      },
    ],
  })
  //웩슬러 처리속도 그래프
  const [wchslerData4, setWechslerData4] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [160 - wchslerInfo.ps, wchslerInfo.ps],
        backgroundColor: ['rgba(	173, 181, 189, 0.2)', 'rgba(246, 1, 1, 0.26)'],
        borderColor: ['rgba(	173, 181, 189, 1)', 'rgba(246, 1, 1, 1)'],
        borderWidth: 1,
      },
    ],
  })

  useEffect(() => {
    //언어 그래프 데이터 추가
    setWechslerData1({
      datasets: [
        {
          // label: '# of Votes',
          data: [160 - wchslerInfo.lang, wchslerInfo.lang],
          backgroundColor: ['rgba(	173, 181, 189, 0.2)', 'rgba(	128, 0, 128, 0.2)'],
          borderColor: ['rgba(	173, 181, 189, 1)', 'rgba(	128, 0, 128, 1)'],
          borderWidth: 1,
        },
      ],
    })
    //지각추론 데이터 추가
    setWechslerData2({
      datasets: [
        {
          // label: '# of Votes',
          data: [160 - wchslerInfo.ps, wchslerInfo.ps],
          backgroundColor: ['rgba(	173, 181, 189, 0.2)', 'rgba(0, 128, 47, 0.2)'],
          borderColor: ['rgba(	173, 181, 189, 1)', 'rgba(0, 128, 47, 1)'],
          borderWidth: 1,
        },
      ],
    })

    //작업기억 데이터 추가
    setWechslerData3({
      datasets: [
        {
          // label: '# of Votes',
          data: [160 - wchslerInfo.wm, wchslerInfo.wm],
          backgroundColor: ['rgba(	173, 181, 189, 0.2)', 'rgba(15, 0, 128, 0.2)'],
          borderColor: ['rgba(	173, 181, 189, 1)', 'rgba(15, 0, 128, 1)'],
          borderWidth: 1,
        },
      ],
    })
    //처리속도 데이터 추가
    setWechslerData4({
      datasets: [
        {
          // label: '# of Votes',
          data: [160 - wchslerInfo.ps, wchslerInfo.ps],
          backgroundColor: ['rgba(	173, 181, 189, 0.2)', 'rgba(246, 1, 1, 0.26)'],
          borderColor: ['rgba(	173, 181, 189, 1)', 'rgba(246, 1, 1, 1)'],
          borderWidth: 1,
        },
      ],
    })

  }, [wchslerInfo])

  const wchslerOptions = {
    responsive: true,
    cutout: '78%',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },

    },
  };

  //시험 점수 그래프
  const testOptions = {

    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    }, layout: {
      padding: {
        top: 10,
        bottom: 35
      }
    },
  };
  const [testData, setTestData] = useState({
    datasets: [
      {
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const list = [];
    practiceList.map((item) => {
      list.push({
        x: item.date,
        y: item.avg
      })
    })
    if (chartChange === '날짜별 발음') {
      setTestData({
        datasets: [
          {
            data: list.reverse(),
            borderColor: 'rgba(	128, 0, 128, 0.7)',
            backgroundColor: 'rgba(	128, 0, 128, 0.5)',
          },
        ],
      })
    } else {
      setTestData({
        datasets: [
          {
            data: list.reverse(),
            borderColor: 'rgba(0, 128, 47, 0.7)',
            backgroundColor: 'rgba(0, 128, 47, 0.5)',
          },
        ],
      })
    }

  }, [practiceList])



  // 점수 막대 그래프
  const [scoreData, setScoreData] = useState({
    labels: [],
    datasets: [
      {
        data: [],

      },
    ],
  });
  //패턴 그래프 데이터
  const [patternData, setPtternData] = useState({
    datasets: [
      {
        data: [],

      },
    ],
  });

  useEffect(() => {
    let labels = [];
    let data = [];

    if (chartChange === '발음') {

      scoreList.map((item) => {
        labels.push(item.sentence);
        data.push(item.score * 20);
      })
      setScoreData({
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: 'rgba(	128, 0, 128, 0.7)',
            backgroundColor: 'rgba(	128, 0, 128, 0.5)',
          },
        ],
      })
    } else {
      scoreList.map((item, index) => {
        labels.push(index + 1);
        data.push(item.time);
      })
      setPtternData({
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: 'rgba(0, 128, 47, 0.7)',
            backgroundColor: 'rgba(0, 128, 47, 0.5)',
          },
        ],
      })
    }

  }, [scoreList])


  // 간단한 모달 컴포넌트 스타일
  const Modal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: white;
padding: 20px;
z-index: 1000;
border-radius: 50px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
`;

  const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
z-index: 999;
`;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='my-page-container'>

      <div className="training-info-container">
        <div className="graph-container">
          <div className="test-graph-data" >
            <div className="test-graph-data-title">{chartChange + ' 학습'}</div>
            <Line style={{ display: `${chartChange !== '날짜별 발음' ? 'none' : ''}` }} options={testOptions} data={testData} />
            <Bar style={{ display: `${chartChange !== '발음' ? 'none' : ''}` }} options={testOptions} data={scoreData} />
            <Line style={{ display: `${chartChange !== '날짜별 패턴' ? 'none' : ''}` }} options={testOptions} data={testData} />
            <Line style={{ display: `${chartChange !== '패턴' ? 'none' : ''}` }} options={testOptions} data={patternData} />
          </div>
          <div className="wchsler-graph-data">
            <div className="wchsler-graph-title"><div>wchsler</div></div>
            <div className="wchsler-graph">
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData1} />
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData2} />
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData3} />
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData4} />
              </div>
            </div>

            <div className="wchsler-data">
              <div className="first-color"></div>
              <div className="percentage">{wchslerInfo.lang / 160 * 100}%</div>
              <div className="name">언어 이해</div>
              <div className="data">{wchslerInfo.lang}점</div>
            </div>
            <div className="wchsler-data">
              <div className="second-color"></div>
              <div className="percentage">{wchslerInfo.pr / 160 * 100}%</div>
              <div className="name">지각 추론 이해</div>
              <div className="data">{wchslerInfo.pr}점</div>
            </div>
            <div className="wchsler-data">
              <div className="third-color"></div>
              <div className="percentage">{wchslerInfo.wm / 160 * 100}%</div>
              <div className="name">작업기억</div>
              <div className="data">{wchslerInfo.wm}점</div>
            </div>
            <div className="wchsler-data">
              <div className="fourth-color"></div>
              <div className="percentage">{wchslerInfo.ps / 160 * 100}%</div>
              <div className="name">처리속도</div>
              <div className="data">{wchslerInfo.ps}점</div>
            </div>

          </div>
        </div>
        <div className="list-container">
          <div className="list-top-container">
            <div className="list-top-left">
              날짜별 {chartChange === '발음' || chartChange === '날짜별 발음' ? '발음' : '패턴'} 학습 리스트
            </div>
            <div className="list-top-right">
              <div onClick={() => { chartChange === '발음' || chartChange === '날짜별 발음' ? setChartChange("날짜별 발음") : setChartChange("날짜별 패턴") }}>
                전체 날짜 그래프 보기
              </div>
              <select onChange={(e) => setLevel(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <select onChange={(e) => setChartChange(e.target.value)}>
                <option value="날짜별 발음">발음 학습</option>
                <option value="날짜별 패턴">패턴 그리기</option>
              </select>
            </div>


          </div>
          <div className="list-second-container">
            <div className="list-title-columns">
              <div className="list-columns-item">
                학습
              </div>
              <div className="list-columns-item">
                최고 점수
              </div>
              <div className="list-columns-item">
                최저 점수
              </div>
              <div className="list-columns-item">
                평균 점수
              </div>
              <div className="list-columns-item">
                날짜
              </div>
            </div>
            <div className="list-item-continer">
              {
                practiceList.map((item, index) => {
                  return (
                    <div className="list-columns" onClick={() => { setPDate(item.date); item.title === "문장 반복 말하기" ? setChartChange("발음") : setChartChange("패턴") }}>
                      <div className="list-columns-item">
                        {item.title}
                      </div>
                      <div className="list-columns-item">
                        {item.max}
                      </div>
                      <div className="list-columns-item">
                        {item.min}
                      </div>
                      <div className="list-columns-item">
                        {item.avg}
                      </div>
                      <div className="list-columns-item">
                        {item.date}
                      </div>
                    </div>
                  )
                })
              }

            </div>
          </div>


        </div>
      </div>
      <div className="child-info-container">
        <div className="child-info-item-container">
          <div className="child-info-name">
            {userInfo.name}
          </div>
          <div className="child-info-age-ip">

          </div>

        </div>

        <div className="menu-container">
          <Link to={`./userInfo`}>
            <div>회원 정보 수정</div>
          </Link>
          <div onClick={openModalHandler} > 갤러리 </div>

        </div>
        {isModalOpen && (
          <>
            <Overlay onClick={closeModalHandler} />
            <Modal>
              <Gallery bool={false}/>
              <button className="btn-hover gallery" onClick={closeModalHandler}>닫기</button>
            </Modal>
          </>
        )}
      </div>


    </div>
  );
}

export default MyPage;