import Hm_Header from "../component/HomePage/Hm_Header"
import { useState } from 'react'
import {Hm_Content,Hm_footer} from '../component/HomePage/Hm_Content'

const Hompage = () => {

    const [currentRobux] = useState(0);
    const [currentTotalRobux] = useState(0);

    return (
        <div>
            <Hm_Header />

            <div className="text-center my-4">
                <h4>Robux กลุ่มคงเหลือ ( Rate 6 ) : {currentRobux} R</h4>
                <h6>จำนวนขาย Robux ทั้งหมด : {currentTotalRobux} R</h6>
            </div>

            <Hm_Content />

            <Hm_footer />

        </div>
    )
}

export default Hompage