
import { SiThemoviedatabase } from "react-icons/si";
import {Link} from 'react-router-dom'
import './footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="innerFooter">
                <h2 className='footerLogo'><SiThemoviedatabase /></h2>
                <div className="footerNav">
                    <ul>
                        <li>기본정보</li>
                        <li><Link to="">TMDB는</Link></li>
                        <li><Link to="">문의하기</Link></li>
                        <li><Link to="">API 문서</Link></li>
                        <li><Link to="">API for Business</Link></li>
                        <li><Link to="">시스템 상태</Link></li>
                    </ul>
                    <ul>
                        <li>참여하기</li>
                        <li><Link to="">기여 지첨서</Link></li>
                        <li><Link to="">새영화추가</Link></li>
                        <li><Link to="">새TV 프로그램 추가</Link></li>
                    </ul>
                    <ul>
                        <li>커뮤니티</li>
                        <li><Link to="">가이드라인</Link></li>
                        <li><Link to="">토론 내역</Link></li>
                        <li><Link to="">기여랭킹</Link></li>
                        <li><Link to="">토론지원</Link></li>
                    </ul>
                    <ul>
                        <li>법적사항</li>
                        <li><Link to="">서비스 이용약관</Link></li>
                        <li><Link to="">API 이용약관</Link></li>
                        <li><Link to="">개인정보약관</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;