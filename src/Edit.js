import {useEffect, useState} from "react";
import axios from "axios";
import {Alert, Spinner} from "reactstrap";
import {BASE_PATH} from "./url";

const Edit = () => {
    const [variant, setVariant] = useState(localStorage.getItem('variant'))
    const [tests, setTests] = useState([])
    const [activeTest, setActiveTest] = useState()
    const [loading, setLoading] = useState(true)
    const [alert, setAlert]=useState(false)

    const getTest = async () => {
        await axios.get(BASE_PATH + `test/variant/${variant}`)
            .then(res => {
                setTests(res.data)
                setActiveTest(res.data[0])
                setLoading(false)
            })
    }

    useEffect(() => {
        getTest()
    }, [])

    const save = async () => {
        let dto = {
            id: activeTest.id,
            text: activeTest.text,
            answers: [...activeTest.answers]
        }
        await axios.post(BASE_PATH + 'test/update', dto)
            .then(setAlert(true))
        await getTest()
    }

    if (loading)
        return <Spinner/>

    return <div className={'bg-gray pt-4'}>
        <h1 className={'text-danger text-center'}>{activeTest.variant.variantNumber}-bilet</h1>
        <div className="container py-3">
            <div className="d-flex justify-content-center gap-5 mb-3">
                {tests.map(e => <div key={e.id}
                    className={activeTest.id === e.id ? 'card-test active' : 'card-test'}
                    onClick={() => {
                        setActiveTest(e)
                        setAlert(false)
                    }}
                >
                    {e.testNumber}-savol
                </div>)}
            </div>

            <div className="row">
                <textarea
                    className={'form-control'}
                    cols="30"
                    rows="5"
                    value={activeTest.text}
                    onChange={(e) => setActiveTest({
                        ...activeTest,
                        text: e.target.value
                    })}
                />
            </div>
            <h4 className={'text-center my-3'}>Javoblar</h4>
            {activeTest.answers.map(e => <div key={e.id} className={'row my-2 align-items-center'} key={e.id}>
                <div className="col-md-1">
                    <input
                        type="checkbox"
                        checked={e.true}
                        className={'form-check-input'}
                        onChange={() => {
                            let a = [...activeTest.answers]
                            a.map(el => el.true = (el.id === e.id))
                            setActiveTest({
                                ...activeTest,
                                answers: a
                            })
                        }}
                    />
                </div>

                <div className="col-md-11">
                    <input
                        type="text"
                        value={e.text}
                        className={'form-control'}
                        onChange={ev => {
                            let a = [...activeTest.answers]
                            a.filter(el => e.id === el.id)[0].text = ev.target.value
                            setActiveTest({
                                ...activeTest,
                                answers: a
                            })
                        }}
                    />
                </div>

            </div>)}
            <div className="row w-25 justify-content-center my-3">
                <button className={'btn btn-success'} onClick={save}>Saqlash</button>
            </div>

            {alert && <Alert color={'success'}>Ma'lumot saqlandi</Alert>}
        </div>
    </div>
}

export default Edit