import { useCallback, useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line,Radar,Doughnut } from 'react-chartjs-2';
import '../styles/myPage.css'
// import { debounce } from 'lodash'



const MyPage = () =>{
  ChartJS.register(CategoryScale,RadialLinearScale, LinearScale, PointElement, LineElement,ArcElement,Filler, Title, Tooltip, Legend);

  //웩슬러 지능검사 그래프
  const [wchslerData,setWechslerData] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [60,100],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  })

  const wchslerOptions = {
    responsive: true,
    cutout: '78%',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      
    },
    // scales: {
    //   r: {
    //     // min: 0,
    //     // max: 100,
    //     ticks: {

    //       // stepSize: 2.5,
    //       // display: false,
    //     },
    //     grid: {
    //       // color: ,
    //     },
    //     //라벨 속성 지정.
    //     pointLabels: {
    //       font: {
    //         // size: 12,
    //         // weight: '700',
    //         // family: 'Pretendard',
    //       },
    //       // color: COLOR.BLACK,
    //     },
    //     angleLines: {
    //       display: false,
    //     },
        
    //   },
    // },
  };

  //시험 점수 그래프
  const testOptions = {
    
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },layout: {
      padding: 30
    },
  };
  // const [labels,setLabels] = useState(["2024-02-04","2024-02-05"]);
  const [testData,setTestData] = useState({
    datasets: [
      {
        label: '점수',
        data: [{x:"11:30",y: 1},{x:"11:32",y:2},{x:"11:34",y:40}],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  const chartRef = useRef();
  const chartRef2 = useRef();
  
  return (
    <div className='my-page-container'>
      
      <div className="training-info-container">
        <div className="graph-container">
          <div className="test-graph-data">
            <Line  ref={chartRef} options={testOptions} data={testData}/>
          </div>
          <div className="wchsler-graph-data">
            <div className="wchsler-graph">
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData}/>
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData}/>
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData}/>
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData}/>
              </div>
            </div>
            
            <div className="wchsler-data">

            </div>
            <div className="wchsler-data">

            </div>
            <div className="wchsler-data">

            </div>
            <div className="wchsler-data">

            </div>
            
            {/* // <Radar ref={chartRef2} options={wchslerOptions} data={wchslerData}/> */}
        </div>
        </div>
        <div className="list-container">
          <div className="list-top-container">
            <div>
              날짜별 학습
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
              <a href="" className="list-columns">
                <div className="list-columns-item">
                  반복 문장 말하기
                </div>
                <div className="list-columns-item">
                  80
                </div>
                <div className="list-columns-item">
                  30
                </div>
                <div className="list-columns-item">
                  55
                </div>
                <div className="list-columns-item">
                  2024-02-03
                </div>
              </a>  

              <a className="list-columns">
              <div className="list-columns-item">
                  반복 문장 말하기
                </div>
                <div className="list-columns-item">
                  80
                </div>
                <div className="list-columns-item">
                  30
                </div>
                <div className="list-columns-item">
                  55
                </div>
                <div className="list-columns-item">
                  2024-02-03
                </div>
              </a>  

              <a className="list-columns">
              <div className="list-columns-item">
                  반복 문장 말하기
                </div>
                <div className="list-columns-item">
                  80
                </div>
                <div className="list-columns-item">
                  30
                </div>
                <div className="list-columns-item">
                  55
                </div>
                <div className="list-columns-item">
                  2024-02-03
                </div>
              </a>  

              <a className="list-columns">
              <div className="list-columns-item">
                  반복 문장 말하기
                </div>
                <div className="list-columns-item">
                  80
                </div>
                <div className="list-columns-item">
                  30
                </div>
                <div className="list-columns-item">
                  55
                </div>
                <div className="list-columns-item">
                  2024-02-03
                </div>
              </a>  

              <a className="list-columns">
              <div className="list-columns-item">
                  반복 문장 말하기
                </div>
                <div className="list-columns-item">
                  80
                </div>
                <div className="list-columns-item">
                  30
                </div>
                <div className="list-columns-item">
                  55
                </div>
                <div className="list-columns-item">
                  2024-02-03
                </div>
              </a>  
              <a className="list-columns">
              <div className="list-columns-item">
                  반복 문장 말하기
                </div>
                <div className="list-columns-item">
                  80
                </div>
                <div className="list-columns-item">
                  30
                </div>
                <div className="list-columns-item">
                  55
                </div>
                <div className="list-columns-item">
                  2024-02-03
                </div>
              </a> 
              <a className="list-columns">
              <div className="list-columns-item">
                  반복 문장 말하기
                </div>
                <div className="list-columns-item">
                  80
                </div>
                <div className="list-columns-item">
                  30
                </div>
                <div className="list-columns-item">
                  55
                </div>
                <div className="list-columns-item">
                  2024-02-03
                </div>
              </a> 
              <a className="list-columns">
              <div className="list-columns-item">
                  반복 문장 말하기
                </div>
                <div className="list-columns-item">
                  80
                </div>
                <div className="list-columns-item">
                  30
                </div>
                <div className="list-columns-item">
                  55
                </div>
                <div className="list-columns-item">
                  2024-02-03
                </div>
              </a> 
            </div>
          </div>
          
          
        </div>
      </div>
      <div className="child-info-container">
        <div className="child-info">
          <div className="child-info-item">
            사진
          </div>
          <div className="child-info-item">
            이름
          </div>
          <div className="child-info-item">
            나이
          </div>
        </div>
        <div className="menu-container">
          <a>회원 정보 수정</a>
          <a>알림함</a>
          <a>공지사항</a>
        </div>
      </div>
      
    
    </div>
  );
}
  
export default MyPage;