import Hm_Header from "./Hm_Header"
import { useState } from 'react'
import Hm_Content from './Hm_Content'

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

        </div>
    )
}

export default Hompage