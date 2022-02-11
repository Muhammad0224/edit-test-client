import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Spinner} from "reactstrap";
import {BASE_PATH} from "./url";

const Home = () => {
    const [variants, setVariants] = useState([])
    const [variant, setVariant] = useState(1)
    const [lan,setLan]=useState('UZ')
    const [loading, setLoading]=useState(true)
    const history = useHistory()


    useEffect(() => {
        getVariants()
    }, [])

    const getVariants = async (lang='UZ') => {
        await axios.get(BASE_PATH + `variant/${lang}`)
            .then(res => {
                setVariants(res.data)
                setLoading(false)
            })
    }

    const changeLang = async (e) => {
        setLoading(true)
        setLan(e.target.value)
        await getVariants(e.target.value)
    }

    if (loading)
        return <Spinner/>

    return <div className={'bg-gray'}>
        <div className="container py-4">
            <div className="row gap-3 justify-content-center">
                <button
                    className={lan==='UZ'?'btn btn-info w-25 active':'btn btn-info w-25'}
                    value={'UZ'}
                    onClick={e => changeLang(e)}>UZ</button>
                <button
                    className={lan==='OZ'?'btn btn-info w-25 active':'btn btn-info w-25'}
                    value={'OZ'}
                    onClick={e => changeLang(e)}>УЗ</button>
                <button
                    className={lan==='RU'?'btn btn-info w-25 active':'btn btn-info w-25'}
                    value={'RU'}
                    onClick={e => changeLang(e)}>RU</button>
            </div>

            <div className="row justify-content-center gap-4 mt-5">
                <div className="col-md-9">
                    <select
                        className={'form-select'}
                        id={'select'}
                        onChange={(e) => {
                            setVariant(e.target.value)
                        }}>
                        {
                            variants.map(e => <option key={e.id} value={e.id}>{e.variantNumber}-bilet</option>)
                        }
                    </select>
                </div>
                <div className="col-md-1">
                    <button className={'btn btn-success'} onClick={() => {
                        localStorage.setItem('variant', variant)
                        history.push('/edit')
                    }}>Tekshirish
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default Home