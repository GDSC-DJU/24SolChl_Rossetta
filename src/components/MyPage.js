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
import img from '../img/images.jpeg'



const MyPage = () =>{
  ChartJS.register(CategoryScale,RadialLinearScale, LinearScale, PointElement, LineElement,ArcElement,Filler, Title, Tooltip, Legend);

  //웩슬러 언어 그래프
  const [wchslerData1,setWechslerData1] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [100,60],
        backgroundColor: ['rgba(	173, 181, 189, 0.2)','rgba(	128, 0, 128, 0.2)'],
        borderColor: ['rgba(	173, 181, 189, 1)','rgba(	128, 0, 128, 1)'],
        borderWidth: 1,
      },
    ],
  })
  const [wchslerData2,setWechslerData2] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [40,120],
        backgroundColor: ['rgba(	173, 181, 189, 0.2)','rgba(0, 128, 47, 0.2)'],
        borderColor: ['rgba(	173, 181, 189, 1)','rgba(0, 128, 47, 1)'],
        borderWidth: 1,
      },
    ],
  })
  const [wchslerData3,setWechslerData3] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [80,80],
        backgroundColor: ['rgba(	173, 181, 189, 0.2)','rgba(15, 0, 128, 0.2)'],
        borderColor: ['rgba(	173, 181, 189, 1)','rgba(15, 0, 128, 1)'],
        borderWidth: 1,
      },
    ],
  })
  const [wchslerData4,setWechslerData4] = useState({
    datasets: [
      {
        // label: '# of Votes',
        data: [70,90],
        backgroundColor: ['rgba(	173, 181, 189, 0.2)','rgba(246, 1, 1, 0.26)'],
        borderColor: ['rgba(	173, 181, 189, 1)','rgba(246, 1, 1, 1)'],
        borderWidth: 1,
      },
    ],
  })

  const wchslerOptions = {
    responsive: true,
    cutout: '78%',
    plugins: {
      legend: {
        display:false,
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
                <Doughnut options={wchslerOptions} data={wchslerData1}/>
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData2}/>
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData3}/>
              </div>
              <div>
                <Doughnut options={wchslerOptions} data={wchslerData4}/>
              </div>
            </div>
            
            <div className="wchsler-data">
              <div className="first-color"></div>
              <div className="percentage"> 37.5%</div>
              <div className="name">언어 이해</div>
              <div className="data">60점</div>
            </div>
            <div className="wchsler-data">
              <div className="second-color"></div>
              <div className="percentage"> 75%</div>
              <div className="name">지각 추론 이해</div>
              <div className="data">120점</div>
            </div>
            <div className="wchsler-data">
              <div className="third-color"></div>
              <div className="percentage"> 50%</div>
              <div className="name">작업기억</div>
              <div className="data">80점</div>
            </div>
            <div className="wchsler-data">
              <div className="fourth-color"></div>
              <div className="percentage"> 56.25%</div>
              <div className="name">처리속도</div>
              <div className="data">90점</div>
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
              <div href="" className="list-columns">
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
              </div>  

              <div className="list-columns">
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
              </div>  

              <div className="list-columns">
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
              </div>  

              <div className="list-columns">
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
              </div>  

              <div className="list-columns">
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
              </div>  
              <div className="list-columns">
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
              </div> 
              <div className="list-columns">
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
              </div> 
              <div className="list-columns">
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
              </div> 
            </div>
          </div>
          
          
        </div>
      </div>
      <div className="child-info-container">
        <div className="child-info">
          <div className="child-info-ficture">
            <img src={img}/>
          </div>
          <div className="child-info-item-container">
            <div className="child-info-item">
              이름
            </div>
            <div className="child-info-item">
              나이
            </div>
          </div>

        </div>
        <div className="menu-container">
          <a>회원 정보 수정</a>
          <a>내가 그린 그림들</a>
          <a>공지사항</a>
        </div>
        <div className="sign-out">
          로그아웃
        </div>
      </div>
      
    
    </div>
  );
}
  
export default MyPage;